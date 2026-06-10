/**
 * Mailer del Mundial 2026 — recordatorios por EmailJS (API REST, server-side)
 * ---------------------------------------------------------------------------
 * Uso:
 *    node mailer/send-emails.js daily      # turnos + partidos de HOY
 *    node mailer/send-emails.js weekly     # turnos + partidos de la SEMANA (lunes)
 *
 * Variables de entorno:
 *    EMAILJS_PRIVATE_KEY   (obligatoria) clave privada de EmailJS (accessToken)
 *    RECIPIENTS_JSON       (obligatoria) JSON { "DANY":"a@x", "CHRISTIAN":"b@x", ... }
 *    SEND_DATE=YYYY-MM-DD  (opcional)    fuerza la "fecha de hoy" para pruebas
 *    DRY_RUN=1             (opcional)    no envía, solo imprime lo que haría
 *
 * Hora real de envío la decide el cron (GitHub Actions): 06:00 Colombia = 11:00 UTC.
 * La fuente de partidos es ../data.js (misma que la web), para no duplicar datos.
 */

'use strict';

const path = require('path');

// ── Cargar partidos desde data.js (define window.WC_MATCHES / WC_BADGES / resolveTeamBadge) ──
global.window = {};
require(path.join(__dirname, '..', 'data.js'));
const MATCHES = global.window.WC_MATCHES || [];
const resolveTeamBadge = global.window.resolveTeamBadge || (() => null);

// ── Config EmailJS (público; la clave privada va por env) ──
const EMAILJS = {
    publicKey: 'yxW9hjR6OlVMHRPox',
    serviceId: 'service_71q6ods',
    templateDaily: 'template_di5bkbi',
    templateWeekly: 'template_bvoykw7',
    privateKey: process.env.EMAILJS_PRIVATE_KEY || ''
};

const PHOTO_BASE = 'https://turnos-wc26.web.app/personal/';
const ICON_BASE = 'https://turnos-wc26.web.app/email-icons/';

// ── Personas ──
const PEOPLE = {
    DANY: { name: 'DANY', role: 'Gestor', kind: 'gestor', photo: 'dany.jpg' },
    PANCHA: { name: 'PANCHA', role: 'Gestor', kind: 'gestor', photo: 'Pancha.jpg' },
    LAURA: { name: 'LAURA', role: 'Gestor', kind: 'gestor', photo: 'Laura.png' },
    CHRISTIAN: { name: 'Christian E', role: 'Analista', kind: 'analyst', photo: 'christian.png' },
    CRISTHIAN: { name: 'Cristhian B', role: 'Analista', kind: 'analyst', photo: 'cristhian.png' }
};
const ROTATION_PEOPLE = ['DANY', 'PANCHA', 'LAURA'];

// Festivos: descanso para ambos analistas
const ANALYST_HOLIDAYS = {
    '2026-06-08': 'Corpus Christi',
    '2026-06-15': 'Sagrado Corazón de Jesús',
    '2026-06-29': 'San Pedro y San Pablo',
    '2026-07-13': 'Día de Nuestra Señora del Rosario de Chiquinquirá',
    '2026-07-20': 'Día de la Independencia de Colombia'
};

// ── Utilidades de fecha (espejo de la web) ──
const SPANISH_MONTHS = { enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5, julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11 };
const MONTH_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MONTH_SHORT = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const WEEKDAY_LONG = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function parseSpanishDate(text) {
    const m = (text || '').match(/,\s*(\d+)\s+de\s+([a-záéíóúñ]+)\s+(\d{4})/i);
    if (!m) return null;
    const day = parseInt(m[1], 10);
    const month = SPANISH_MONTHS[m[2].toLowerCase()];
    const year = parseInt(m[3], 10);
    if (month === undefined || isNaN(day) || isNaN(year)) return null;
    return new Date(year, month, day);
}
function ymd(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function startOfWeek(d) {
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    r.setDate(r.getDate() + diff);
    return r;
}
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function isSameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function fullSpanishDate(d) { return `${WEEKDAY_LONG[d.getDay()]}, ${d.getDate()} de ${MONTH_LONG[d.getMonth()]} ${d.getFullYear()}`; }
function shortDay(d) { return `${WEEKDAY_LONG[d.getDay()].slice(0, 3)} ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`; }
function weekRangeLabel(s, e) {
    if (s.getMonth() === e.getMonth()) return `${s.getDate()} – ${e.getDate()} ${MONTH_SHORT[s.getMonth()]} ${s.getFullYear()}`;
    return `${s.getDate()} ${MONTH_SHORT[s.getMonth()]} – ${e.getDate()} ${MONTH_SHORT[e.getMonth()]} ${s.getFullYear()}`;
}

// ── Partidos agrupados por fecha (en orden cronológico de data.js) ──
const dayOrder = [];
const matchesByDate = {};
MATCHES.forEach(m => {
    if (!matchesByDate[m.date]) { matchesByDate[m.date] = []; dayOrder.push(m.date); }
    matchesByDate[m.date].push(m);
});
const dateObjByKey = {}; // 'YYYY-MM-DD' -> { dateStr, dateObj, dayIndex }
dayOrder.forEach((dateStr, idx) => {
    const dObj = parseSpanishDate(dateStr);
    if (dObj) dateObjByKey[ymd(dObj)] = { dateStr, dateObj: dObj, dayIndex: idx };
});
const allDateObjs = Object.values(dateObjByKey).map(x => x.dateObj).sort((a, b) => a - b);
const TOURNAMENT_START = allDateObjs[0];
const TOURNAMENT_END = allDateObjs[allDateObjs.length - 1];

function sortMatches(list) {
    return [...list].sort((a, b) => {
        let hA = parseInt(a.time.split(':')[0]); let hB = parseInt(b.time.split(':')[0]);
        if (hA < 5) hA += 24; if (hB < 5) hB += 24;
        return hA - hB;
    });
}

// ── Turnos de ANALISTAS (10-7 / 8-5, alterna patrón A/B por semana) ──
function getAnalystShifts(dateObj) {
    if (!dateObj) return null;
    const dow = dateObj.getDay();
    if (dow === 0 || dow === 6) return null; // solo Lun-Vie
    const holiday = ANALYST_HOLIDAYS[ymd(dateObj)];
    if (holiday) return { holiday: true, name: holiday };
    const base = startOfWeek(new Date(2026, 5, 11));
    const ws = startOfWeek(dateObj);
    const weekIdx = Math.round((ws - base) / (7 * 24 * 3600 * 1000));
    const patternA = (weekIdx % 2 === 0);
    const mapA = { 1: 'CHRISTIAN', 2: 'CRISTHIAN', 3: 'CHRISTIAN', 4: 'CHRISTIAN', 5: 'CRISTHIAN' };
    const mapB = { 1: 'CHRISTIAN', 2: 'CRISTHIAN', 3: 'CRISTHIAN', 4: 'CHRISTIAN', 5: 'CRISTHIAN' };
    const who107 = (patternA ? mapA : mapB)[dow];
    const who85 = who107 === 'CHRISTIAN' ? 'CRISTHIAN' : 'CHRISTIAN';
    return [
        { person: who107, range: '10:00 — 19:00', code: '10-7' },
        { person: who85, range: '08:00 — 17:00', code: '8-5' }
    ];
}
function analystEntryFor(personId, dateObj) {
    const s = getAnalystShifts(dateObj);
    if (!s) return null;            // fin de semana
    if (s.holiday) return { holiday: true, name: s.name };
    return s.find(x => x.person === personId) || null;
}

// ── Turnos de GESTORES (rotación automática por día, igual que la web) ──
function fHour(h) { return String(((h % 24) + 24) % 24).padStart(2, '0') + ':00'; }
function computeGestorShifts(dayMatches, dayIndex) {
    const sorted = sortMatches(dayMatches);
    let start1 = 6, end1 = 15, end3 = 15;
    if (sorted.length) {
        let last = sorted[sorted.length - 1];
        let lh = parseInt(last.time.split(':')[0]); if (lh < 5) lh += 24;
        end3 = Math.max(lh + 4, 15);
    }
    const start3 = end3 - 9;
    const start2 = Math.floor((start1 + start3) / 2), end2 = start2 + 9;
    const auto = [ROTATION_PEOPLE[dayIndex % 3], ROTATION_PEOPLE[(dayIndex + 1) % 3], ROTATION_PEOPLE[(dayIndex + 2) % 3]];
    return [
        { id: 1, label: 'Turno 1 · Apertura', range: `${fHour(start1)} — ${fHour(end1)}`, person: auto[0] },
        { id: 2, label: 'Turno 2 · Intermedio', range: `${fHour(start2)} — ${fHour(end2)}`, person: auto[1] },
        { id: 3, label: 'Turno 3 · Cierre', range: `${fHour(start3)} — ${fHour(end3)}`, person: auto[2] }
    ];
}
function gestorEntryFor(personId, dateKey) {
    const info = dateObjByKey[dateKey];
    if (!info) return null;                       // sin partidos ese día → sin turno
    const shifts = computeGestorShifts(matchesByDate[info.dateStr], info.dayIndex);
    return shifts.find(s => s.person === personId) || null;
}

// ══════════════════ Generadores de HTML (estilo idéntico al preview) ══════════════════
function shiftBlock(personId, kind, dateObj, dateKey) {
    if (kind === 'analyst') {
        const e = analystEntryFor(personId, dateObj);
        if (!e) return `<div style="font-size:14px; color:#6B7280;">Hoy no tienes turno asignado (fin de semana).</div>`;
        if (e.holiday) {
            return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
              <td style="background:#FEF7EC; border:1px solid #F6E0BE; border-left:4px solid #D97706; border-radius:10px; padding:16px 18px;">
                <div style="font-family:'Bebas Neue','Arial Narrow',Arial,sans-serif; font-size:30px; letter-spacing:1px; color:#D97706; line-height:1.1; margin:2px 0;"><img src="${ICON_BASE}rest.svg" width="24" height="24" style="vertical-align:-4px; margin-right:6px;" alt=""> DESCANSO</div>
                <span style="display:inline-block; background:#D97706; color:#fff; font-size:12px; font-weight:700; padding:3px 10px; border-radius:999px;">Festivo · ${e.name}</span>
              </td></tr></table>`;
        }
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="background:#F2F8F9; border:1px solid #D7E9ED; border-left:4px solid #16697A; border-radius:10px; padding:16px 18px;">
            <div style="font-size:13px; color:#6B7280; letter-spacing:0.5px;">Horario asignado</div>
            <div style="font-family:'Bebas Neue','Arial Narrow',Arial,sans-serif; font-size:34px; letter-spacing:1px; color:#16697A; line-height:1.1; margin:2px 0;">${e.range}</div>
            <span style="display:inline-block; background:#16697A; color:#fff; font-size:12px; font-weight:700; padding:3px 10px; border-radius:999px;">Turno ${e.code}</span>
          </td></tr></table>`;
    }
    // gestor
    const e = gestorEntryFor(personId, dateKey);
    if (!e) return `<div style="font-size:14px; color:#6B7280;">Hoy no hay operación asignada.</div>`;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="background:#F2F8F9; border:1px solid #D7E9ED; border-left:4px solid #16697A; border-radius:10px; padding:16px 18px;">
        <div style="font-size:13px; color:#6B7280; letter-spacing:0.5px;">${e.label}</div>
        <div style="font-family:'Bebas Neue','Arial Narrow',Arial,sans-serif; font-size:34px; letter-spacing:1px; color:#16697A; line-height:1.1; margin:2px 0;">${e.range}</div>
      </td></tr></table>`;
}

function matchRowHtml(m) {
    const bA = resolveTeamBadge(m.team1), bB = resolveTeamBadge(m.team2);
    const imgA = bA ? `<img src="${bA}" width="22" height="22" style="vertical-align:middle;">` : '';
    const imgB = bB ? `<img src="${bB}" width="22" height="22" style="vertical-align:middle;">` : '';
    const meta = (m.group || m.stadium)
        ? `<div style="font-size:11px; color:#9CA3AF; margin-top:6px;">${[m.group, m.stadium].filter(Boolean).join(' · ')}</div>` : '';
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;"><tr>
      <td style="background:#FFFFFF; border:1px solid #E4E7EB; border-radius:10px; padding:12px 14px;">
        <table role="presentation" width="100%"><tr>
          <td style="font-family:'Bebas Neue','Arial Narrow',Arial,sans-serif; font-size:20px; color:#16697A; width:64px;">${m.time}</td>
          <td style="text-align:right;">${imgA} <span style="font-size:14px; font-weight:500; color:#1F2937;">${m.team1}</span>
            <span style="color:#9CA3AF; font-size:12px;"> vs </span>
            <span style="font-size:14px; font-weight:500; color:#1F2937;">${m.team2}</span> ${imgB}</td>
        </tr></table>${meta}
      </td></tr></table>`;
}
function matchesBlock(list) {
    if (!list || !list.length) return `<div style="font-size:14px; color:#6B7280;">Sin partidos programados.</div>`;
    return sortMatches(list).map(matchRowHtml).join('');
}

function weekScheduleBlock(personId, kind, weekStart) {
    let rows = '';
    if (kind === 'analyst') {
        for (let i = 0; i < 5; i++) { // Lun..Vie
            const d = addDays(weekStart, i);
            const e = analystEntryFor(personId, d);
            let val;
            if (!e) val = `<span style="color:#9CA3AF; font-size:13px;">—</span>`;
            else if (e.holiday) val = `<span style="color:#D97706; font-weight:600; font-size:13px;"><img src="${ICON_BASE}rest.svg" width="14" height="14" style="vertical-align:-2px; margin-right:3px;" alt="">Festivo · Descanso</span>`;
            else val = `<span style="font-family:'Bebas Neue','Arial Narrow',Arial,sans-serif; font-size:18px; color:#16697A;">${e.range}</span> <span style="font-size:11px; color:#6A4DD0;">(${e.code})</span>`;
            rows += `<tr><td style="padding:11px 14px; border-top:1px solid #E4E7EB; font-size:14px; color:#1F2937;">${shortDay(d)}</td><td style="padding:11px 14px; border-top:1px solid #E4E7EB; text-align:right;">${val}</td></tr>`;
        }
    } else {
        for (let i = 0; i < 7; i++) {
            const d = addDays(weekStart, i);
            const key = ymd(d);
            const e = gestorEntryFor(personId, key);
            if (!e) continue; // sin operación ese día
            rows += `<tr><td style="padding:11px 14px; border-top:1px solid #E4E7EB; font-size:14px; color:#1F2937;">${shortDay(d)} <span style="color:#9CA3AF; font-size:11px;">${e.label.replace('Turno ', 'T').split(' · ')[0]}</span></td><td style="padding:11px 14px; border-top:1px solid #E4E7EB; text-align:right;"><span style="font-family:'Bebas Neue','Arial Narrow',Arial,sans-serif; font-size:18px; color:#16697A;">${e.range}</span></td></tr>`;
        }
    }
    if (!rows) rows = `<tr><td colspan="2" style="padding:14px; text-align:center; color:#9CA3AF;">Sin turnos esta semana.</td></tr>`;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E4E7EB; border-radius:10px; overflow:hidden;">
      <tr style="background:#F1F3F6;"><td style="padding:9px 14px; font-size:12px; font-weight:700; color:#4B5563; letter-spacing:0.5px;">DÍA</td><td style="padding:9px 14px; font-size:12px; font-weight:700; color:#4B5563; letter-spacing:0.5px; text-align:right;">HORARIO</td></tr>
      ${rows}</table>`;
}

function weekMatchesBlock(weekStart, weekEnd) {
    let html = '', count = 0;
    dayOrder.forEach(dateStr => {
        const d = parseSpanishDate(dateStr);
        if (!d || d < weekStart || d > weekEnd) return;
        const list = sortMatches(matchesByDate[dateStr]);
        count += list.length;
        html += `<div style="font-family:'Bebas Neue','Arial Narrow',Arial,sans-serif; font-size:14px; color:#489FB5; letter-spacing:1px; margin:14px 0 6px;">${shortDay(d).toUpperCase()}</div>`;
        html += list.map(m => `<div style="font-size:13px; color:#1F2937; padding:5px 0; border-bottom:1px solid #F1F3F6;"><strong style="color:#16697A;">${m.time}</strong> · ${m.team1} vs ${m.team2}${m.group ? ` <span style="color:#9CA3AF;">— ${m.group}</span>` : ''}</div>`).join('');
    });
    if (!count) html = `<div style="font-size:14px; color:#6B7280;">Sin partidos esta semana.</div>`;
    return { html, count };
}

// ══════════════════ Envío vía API REST de EmailJS ══════════════════
async function sendEmail(templateId, params) {
    if (process.env.DRY_RUN === '1') {
        console.log(`[DRY_RUN] -> ${templateId} a ${params.to_email} (${params.person_name})`);
        return { ok: true, dry: true };
    }
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service_id: EMAILJS.serviceId,
            template_id: templateId,
            user_id: EMAILJS.publicKey,
            accessToken: EMAILJS.privateKey,
            template_params: params
        })
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`EmailJS ${res.status}: ${text}`);
    return { ok: true, body: text };
}

// ══════════════════ Orquestación ══════════════════
function getRecipients() {
    let map = {};
    try { map = JSON.parse(process.env.RECIPIENTS_JSON || '{}'); }
    catch (e) { throw new Error('RECIPIENTS_JSON no es JSON válido'); }
    return map;
}
function today() {
    if (process.env.SEND_DATE) {
        const [y, m, d] = process.env.SEND_DATE.split('-').map(Number);
        return new Date(y, m - 1, d);
    }
    // Fecha actual en zona Colombia (America/Bogota)
    const str = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
}
function inTournament(d) { return d >= TOURNAMENT_START && d <= TOURNAMENT_END; }

// Filtro opcional: enviar solo a ciertas personas (ej. ONLY_PERSON="CHRISTIAN" o "DANY,LAURA")
const ONLY = (process.env.ONLY_PERSON || '').toUpperCase().split(',').map(s => s.trim()).filter(Boolean);
function skipByFilter(id) { return ONLY.length > 0 && !ONLY.includes(id); }

async function runDaily() {
    const d = today();
    if (!inTournament(d)) { console.log(`Fuera del rango del Mundial (${ymd(d)}). No se envía.`); return; }
    const recipients = getRecipients();
    const dateKey = ymd(d);
    const info = dateObjByKey[dateKey];
    const dayMatches = info ? matchesByDate[info.dateStr] : [];
    const greeting = info ? info.dateStr : fullSpanishDate(d);

    let sent = 0;
    for (const [id, person] of Object.entries(PEOPLE)) {
        if (skipByFilter(id)) continue;
        const to = recipients[id];
        if (!to) { console.warn(`Sin correo para ${id}, se omite.`); continue; }

        // ¿Tiene jornada hoy?
        if (person.kind === 'analyst') {
            if (!getAnalystShifts(d)) continue; // fin de semana → no enviar
        } else {
            if (!info) continue; // gestor sin partidos hoy → sin operación
        }

        const params = {
            to_email: to,
            person_name: person.name,
            person_photo: PHOTO_BASE + person.photo,
            role_label: person.role,
            greeting_date: greeting,
            matches_count: `${dayMatches.length} ${dayMatches.length === 1 ? 'partido' : 'partidos'}`,
            shift_block: shiftBlock(id, person.kind, d, dateKey),
            matches_block: matchesBlock(dayMatches)
        };
        await sendEmail(EMAILJS.templateDaily, params);
        sent++;
        console.log(`✓ Daily → ${person.name} <${to}>`);
    }
    console.log(`Listo. ${sent} correos diarios (${ymd(d)}).`);
}

async function runWeekly() {
    const d = today();
    const weekStart = startOfWeek(d);
    const weekEnd = addDays(weekStart, 6);
    // Solo si la semana intersecta el Mundial
    if (weekEnd < TOURNAMENT_START || weekStart > TOURNAMENT_END) { console.log('Semana fuera del Mundial. No se envía.'); return; }
    const recipients = getRecipients();
    const wm = weekMatchesBlock(weekStart, weekEnd);
    const range = weekRangeLabel(weekStart, weekEnd);

    let sent = 0;
    for (const [id, person] of Object.entries(PEOPLE)) {
        if (skipByFilter(id)) continue;
        const to = recipients[id];
        if (!to) { console.warn(`Sin correo para ${id}, se omite.`); continue; }
        const params = {
            to_email: to,
            person_name: person.name,
            person_photo: PHOTO_BASE + person.photo,
            role_label: person.role,
            week_range: range,
            week_matches_count: `${wm.count} ${wm.count === 1 ? 'partido' : 'partidos'}`,
            week_schedule_block: weekScheduleBlock(id, person.kind, weekStart),
            week_matches_block: wm.html
        };
        await sendEmail(EMAILJS.templateWeekly, params);
        sent++;
        console.log(`✓ Weekly → ${person.name} <${to}>`);
    }
    console.log(`Listo. ${sent} correos semanales (${range}).`);
}

(async () => {
    const mode = (process.argv[2] || '').toLowerCase();
    if (!EMAILJS.privateKey && process.env.DRY_RUN !== '1') {
        console.error('Falta EMAILJS_PRIVATE_KEY.'); process.exit(1);
    }
    try {
        if (mode === 'daily') await runDaily();
        else if (mode === 'weekly') await runWeekly();
        else { console.error('Uso: node send-emails.js <daily|weekly>'); process.exit(1); }
    } catch (e) {
        console.error('Error en el envío:', e.message); process.exit(1);
    }
})();
