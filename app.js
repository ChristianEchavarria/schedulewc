// Initialize Lucide Icons
lucide.createIcons();

// Cronograma del Mundial (importado desde data.js → window.WC_MATCHES)
// Las horas ya vienen ajustadas (formato 24h, hora final usada para turnos).
let scheduleData = (window.WC_MATCHES || []).map(m => ({
    date: m.date,
    time: m.time,
    team1: m.team1,
    team2: m.team2,
    group: m.group || '',
    stadium: m.stadium || '',
    isKnockout: !!m.isKnockout
}));

// (Legacy: bloque de texto crudo original — ya no se parsea, se conserva por referencia)
const _legacyRawData = `Jueves, 11 de junio 2026
15:00 - México vs Sudáfrica - Grupo A - Estadio Ciudad de México
22:00 - República de Corea vs Dinamarca/Macedonia/República Checa/Irlanda - Grupo A - Estadio Guadalajara

Viernes, 12 de junio 2026
15:00 - Canadá vs Italia/Nigeria/Gales/Bosnia - Grupo B - Estadio Toronto
21:00 - Estados Unidos vs Paraguay - Grupo D - Estadio Los Ángeles

Sábado, 13 de junio 2026
15:00 - Catar vs Suiza - Grupo B - Estadio Bahía de San Francisco
18:00 - Brasil vs Marruecos - Grupo C - Estadio Nueva York Nueva Jersey
21:00 - Haití vs Escocia - Grupo C - Estadio Boston
00:00 - Australia vs Turquía/Rumania/Eslovaquia/Kosovo - Grupo D - Estadio BC Place Vancouver

Domingo, 14 de junio 2026
13:00 - Alemania vs Curazao - Grupo E - Estadio Houston
16:00 - Países Bajos vs Japón – Grupo F - Estadio Dallas
19:00 - Costa de Marfil vs Ecuador – Grupo E - Estadio Filadelfia
22:00 - Ucrania/Suecia/Polonia/Albania vs Túnez - Grupo F - Estadio Monterrey

Lunes, 15 de junio 2026
12:00 - España vs Cabo Verde – Grupo H - Estadio Atlanta
15:00 - Bélgica vs Egipto – Grupo G - Estadio Seattle
18:00 - Arabia Saudí vs Uruguay – Grupo H - Estadio Miami
21:00 - Irán vs Nueva Zelanda – Grupo G - Estadio Los Ángeles

Martes, 16 de junio 2026
15:00 - Francia vs Senegal – Grupo I - Estadio Nueva York Nueva Jersey
18:00 - Irak/Bolivia/Surinam vs Noruega – Grupo I - Estadio Boston
21:00 - Argentina vs Argelia – Grupo J - Estadio Kansas City
00:00 - Austria vs Jordania – Grupo J - Estadio Bahía de San Francisco

Miércoles, 17 de junio 2026
13:00 - Portugal vs Jamaica/RD de Congo/Nueva Caledonia – Grupo K - Estadio Houston
16:00 - Inglaterra vs Croacia – Grupo L - Estadio Dallas
19:00 - Ghana vs Panamá – Grupo L - Estadio Toronto
22:00 - Uzbekistán vs Colombia – Grupo K - Estadio Ciudad de México

Jueves, 18 de junio 2026
12:00 - Dinamarca/Macedonia/República Checa/Irlanda vs Sudáfrica - Grupo A - Estadio Atlanta
15:00 - Suiza vs Italia/Irlanda/Gales/Bosnia – Grupo B - Estadio Los Ángeles
18:00 - Canadá vs Catar – Grupo B - Estadio BC Place Vancouver
21:00 - México vs República de Corea - Grupo A - Estadio Guadalajara

Viernes, 19 de junio 2026
15:00 - Estados Unidos vs Australia – Grupo D - Estadio Seattle
18:00 - Escocia vs Marruecos – Grupo C - Estadio Boston
21:00 - Brasil vs Haití – Grupo C - Estadio Filadelfia
00:00 - Turquía/Rumania/Eslovaquia/Kosovo vs Paraguay – Grupo D - Estadio Bahía de San Francisco

Sábado, 20 de junio 2026
13:00 - Países Bajos vs Ucrania/Suecia/Polonia/Albania – Grupo F - Estadio Houston
16:00 - Alemania vs Costa de Marfil – Grupo E - Estadio Toronto
22:00 - Ecuador vs Curazao – Grupo E - Estadio Kansas City
00:00 - Túnez vs Japón – Grupo F - Estadio Monterrey

Domingo, 21 de junio 2026
12:00 - España vs Arabia Saudí – Grupo H - Estadio Atlanta
15:00 - Bélgica vs Irán – Grupo G - Estadio Los Ángeles
18:00 - Uruguay vs Cabo Verde – Grupo H - Estadio Miami
21:00 - Nueva Zelanda vs Egipto – Grupo G - Estadio BC Place Vancouver

Lunes, 22 de junio 2026
13:00 - Argentina vs Austria – Grupo J - Estadio Dallas
17:00 - Francia vs Irak/Bolivia/Surinam – Grupo I - Estadio Filadelfia
20:00 - Noruega vs Senegal – Grupo I - Estadio Nueva York Nueva Jersey
23:00 - Jordania vs Argelia – Grupo J - Estadio Bahía de San Francisco Bay

Martes, 23 de junio 2026
13:00 - Portugal vs Uzbekistán – Grupo K - Estadio Houston
16:00 - Inglaterra vs Ghana – Grupo L - Estadio Boston
19:00 - Panamá vs Croacia – Grupo L - Estadio Toronto
22:00 - Colombia vs RD de Congo/Jamaica/Nueva Caledonia – Grupo K - Estadio Guadalajara

Miércoles, 24 de junio 2026
15:00 - Suiza vs Canadá – Grupo B - Estadio BC Place Vancouver
15:00 - Italia/Irlanda del Norte/Gales/Bosnia vs Catar – Grupo B - Estadio Seattle
18:00 - Brasil vs Escocia – Grupo C - Estadio Miami
18:00 - Marruecos vs Haití – Grupo C - Estadio Atlanta
21:00 - Dinamarca/Macedonia/República Checa/Irlanda vs México – Grupo A - Estadio Ciudad de México
21:00 - Sudáfrica vs República de Corea – Grupo A - Estadio Monterrey

Jueves, 25 de junio 2026
16:00 - Curazao vs Costa de Marfil – Grupo E - Estadio Filadelfia
16:00 - Ecuador vs Alemania – Grupo E - Estadio Nueva York Nueva Jersey
19:00 - Japón vs Ucrania/Suecia/Polonia/Albania – Grupo F - Estadio Dallas
19:00 - Túnez vs Países Bajos – Grupo F - Estadio Kansas City
22:00 - Turquía/Rumania/Eslovaquia/Kosovo vs Estados Unidos – Grupo D - Estadio Los Ángeles
22:00 - Paraguay vs Australia – Grupo D - Estadio Bahía de San Francisco

Viernes, 26 de junio 2026
15:00 - Noruega vs Francia – Grupo I - Estadio Boston
15:00 - Senegal vs Irak/Bolivia/Surinam – Grupo I - Estadio Toronto
20:00 - Cabo Verde vs Arabia Saudí – Grupo H - Estadio Houston
20:00 - Uruguay vs España – Grupo H - Estadio Guadalajara
23:00 - Egipto vs Irán – Grupo G - Estadio Seattle
23:00 - Nueva Zelanda vs Bélgica – Grupo G - Estadio BC Place Vancouver

Sábado, 27 de junio 2026
17:00 - Panamá vs Inglaterra – Grupo L - Estadio Nueva York Nueva Jersey
17:00 - Croacia vs Ghana – Grupo L - Estadio Filadelfia
19:30 - Colombia vs Portugal – Grupo K - Estadio Miami
19:30 - RD de Congo/Jamaica/Nueva Caledonia vs Uzbekistán – Grupo K - Estadio Atlanta
22:00 - Argelia vs Austria – Grupo J - Estadio Kansas City
22:00 - Jordania vs Argentina – Grupo J - Estadio Dallas

Domingo, 28 de junio 2026
Partido 73 – 2º Grupo A v 2º Grupo B - Estadio Los Ángeles

Lunes, 29 de junio 2026
Partido 74 – 1º Grupo E v 3º Grupo A/B/C/D/F - Estadio Boston
Partido 75 – 1º Grupo F v 2º Grupo C - Estadio Monterrey
Partido 76 – 1º Grupo E v 2º Grupo F - Estadio Houston

Martes, 30 de junio 2026
Partido 77 – 1º Grupo I v 3º Grupo C/D/F/G/H - Estadio Nueva York Nueva Jersey
Partido 78 – 2º Grupo E v 2º Grupo I - Estadio Dallas
Partido 79 – 1º Grupo A v 3º Grupo C/E/F/H/I - Estadio Ciudad de México

Miércoles, 1 de julio 2026
Partido 80 – 1º Grupo L v 3º Grupo E/H/I/J/K - Estadio Atlanta
Partido 81 – 1º Grupo D v 3º Grupo B/E/F/I/J - Estadio Bahía de San Francisco
Partido 82 – 1º Grupo G v 3º Grupo A/E/H/I/J - Estadio Seattle

Jueves, 2 de julio 2026
Partido 83 – 2º Grupo K v 2º Grupo L - Estadio Toronto
Partido 84 – 1º Grupo H v 2º Grupo J - Estadio Los Ángeles
Partido 85 – 1º Grupo B v 3º Grupo E/F/G/I/J - Estadio BC Place Vancouver

Viernes, 3 de julio 2026
Partido 86 – 1º Grupo J v 2º Grupo H - Estadio Miami
Partido 87 – 1º Grupo K v 3º Grupo D/E/I/J/L - Estadio Kansas City
Partido 88 – 2º Grupo D v 2º Grupo G - Estadio Dallas

Sábado, 4 de julio 2026
Partido 89 – Ganador Partido 74 v Ganador Partido 77 - Estadio Filadelfia
Partido 90 – Ganador Partido 73 v Ganador Partido 75 - Estadio Houston

Domingo, 5 de julio 2026
Partido 91 – Ganador Partido 76 v Ganador Partido 78 - Estadio Nueva York Nueva Jersey
Partido 92 – Ganador Partido 79 v Ganador Partido 80 - Estadio Ciudad de México

Lunes, 6 de julio 2026
Partido 93 – Ganador Partido 83 v Ganador Partido 84 - Estadio Dallas
Partido 94 – Ganador Partido 81 v Ganador Partido 82 - Estadio Seattle

Martes, 7 de julio 2026
Partido 95 – Ganador Partido 86 v Ganador Partido 88 - Estadio Atlanta
Partido 96 – Ganador Partido 85 v Ganador Partido 87 - Estadio BC Place Vancouver

Jueves, 9 de julio 2026
Partido 97 – Ganador Partido 89 v Ganador Partido 90 - Estadio Boston

Viernes, 10 de julio 2026
Partido 98 – Ganador Partido 93 v Ganador Partido 94 - Estadio Los Ángeles

Sábado, 11 de julio 2026
Partido 99 – Ganador Partido 91 v Ganador Partido 92 - Estadio Miami
Partido 100 – Ganador Partido 95 v Ganador Partido 96 - Estadio Kansas City

Martes, 14 de julio 2026
Partido 101 – Ganador Partido 97 v Ganador Partido 98 - Estadio Dallas

Miércoles, 15 de julio 2026
Partido 102 – Ganador Partido 99 v Ganador Partido 100 - Estadio Atlanta

Sábado, 18 de julio 2026
Partido 103 – Perdedor Partido 101 v Perdedor Partido 102 - Estadio Miami

Domingo, 19 de julio 2026
Partido 104 – Ganador Partido 101 v Ganador Partido 102 - Estadio Nueva York Nueva Jersey `;

function parseRawData(text) {
    const lines = text.split('\n');
    let currentDate = '';
    let parsedData = [];

    const timeRegex = /^(\d{2}:\d{2})\s*-\s*(.+?)\s*vs\s*([^-]+)/;
    const matchRegex = /Partido \d+ – (.+) v (.+) -/;

    // Fallback regex if it doesn't match the standard group stage pattern, like knockout stages
    const alternativeKnockoutRegex = /Partido \d+ – (.+) v (.+) -/;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Is it a date header?
        if (line.match(/^[a-záéíóúñ]+, \d+ de [a-záéíóúñ]+ 2026/i)) {
            currentDate = line;
            continue;
        }

        let timeStr = '';
        let team1 = '';
        let team2 = '';

        const match = line.match(timeRegex);
        if (match) {
            timeStr = match[1];
            team1 = match[2].trim();
            team2 = match[3].trim();
        } else if (line.includes('Partido')) {
            // It's a knockout match. Some lines don't have times.
            // Let's assume standard times for these for now if none provided, or map them as best effort.
            const koMatch = line.match(matchRegex);
            if (koMatch) {
                timeStr = '16:00'; // Defaulting to 16:00 (15:00 adjusted) if no time is provided in the text for KO stages
                team1 = koMatch[1].trim();
                team2 = koMatch[2].trim();
            }
        }

        if (timeStr && team1 && team2) {
            // USER INSTRUCTION: "las horas que aquí se presentan están 1h adelantada [...] en realidad es a las 14:00"
            let [h, m] = timeStr.split(':').map(Number);
            h = h - 1;
            if (h < 0) h += 24;

            let finalTimeStr = h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0');

            parsedData.push({
                date: currentDate,
                time: finalTimeStr,
                team1: team1,
                team2: team2,
                rawLine: line
            });
        }
    }
    return parsedData;
}

// (parseRawData se mantiene definido por referencia pero ya no se usa)

// Configuration
const TOP_TEAMS = ['Argentina', 'Brasil', 'Francia', 'Inglaterra', 'España', 'Alemania', 'Portugal', 'Italia', 'Colombia', 'México'];
const CRITICAL_TEAM = 'Ecuador';

// Avatares del equipo de operación
const PERSON_AVATARS = {
    'DANY': 'personal/dany.jpg',
    'PANCHA': 'personal/Pancha.jpg',
    'LAURA': 'personal/Laura.png'
};

// Personas de la rotación de Gestores (3 turnos)
const ROTATION_PEOPLE = ['DANY', 'PANCHA', 'LAURA'];

// Roles disponibles (3 gestores + 2 analistas + 1 admin)
// Gestores y Analistas son grupos independientes: no se mezclan ni se ven entre sí.
const ROLES = [
    { id: 'DANY', name: 'DANY', type: 'Gestor', avatar: PERSON_AVATARS.DANY, isOperator: true },
    { id: 'PANCHA', name: 'PANCHA', type: 'Gestor', avatar: PERSON_AVATARS.PANCHA, isOperator: true },
    { id: 'LAURA', name: 'LAURA', type: 'Gestor', avatar: PERSON_AVATARS.LAURA, isOperator: true },
    { id: 'CHRISTIAN', name: 'Christian E', type: 'Analista', avatar: 'personal/christian.png', isOperator: true, isAnalyst: true },
    { id: 'CRISTHIAN', name: 'Cristhian B', type: 'Analista', avatar: 'personal/cristhian.png', isOperator: true, isAnalyst: true },
    // Nuevos integrantes — horario pendiente de definir (pending: true)
    { id: 'PABLO', name: 'Pablo', type: 'Analista', avatar: 'personal/Pablo.jpg', isOperator: true, isAnalyst: true },
    { id: 'DUQUE', name: 'Duque', type: 'Analista', avatar: 'personal/Duque.jpg', isOperator: true, isAnalyst: true },
    { id: 'EDWIN', name: 'Edwin', type: 'Líder', avatar: 'personal/Edwin.jpg', isOperator: false, isLeader: true },
    { id: 'ADMIN', name: 'Administrador', type: 'Coordinación', avatar: null, isOperator: false }
];

// ─────────────────────────────────────────────────────────────────────
// Analistas: Christian E y Cristhian B (grupo aparte de los Gestores)
// Solo se comparan entre ellos dos; los gestores no ven esta información.
// Dos turnos fijos: 10:00-19:00 ("10-7") y 08:00-17:00 ("8-5"), solo Lun-Vie.
// El que no tiene 10-7 ese día hace 8-5. Las semanas alternan dos patrones:
//   Patrón A (semanas impares, arranca la del 11-jun-2026):
//       10-7 → Lun=Christian, Mar=Cristhian, Mié=Christian, Jue=Christian, Vie=Cristhian
//   Patrón B (semanas pares):
//       10-7 → Lun=Christian, Mar=Cristhian, Mié=Cristhian, Jue=Christian, Vie=Cristhian
// ─────────────────────────────────────────────────────────────────────
const ANALYST_PEOPLE = {
    CHRISTIAN: { id: 'CHRISTIAN', name: 'Christian E', initials: 'CE', avatar: 'personal/christian.png' },
    CRISTHIAN: { id: 'CRISTHIAN', name: 'Cristhian B', initials: 'CB', avatar: 'personal/cristhian.png' }
};

// Festivos: descanso para AMBOS analistas (no se asigna turno). Clave = yyyy-mm-dd.
const ANALYST_HOLIDAYS = {
    '2026-06-08': 'Corpus Christi',
    '2026-06-15': 'Sagrado Corazón de Jesús',
    '2026-06-29': 'San Pedro y San Pablo',
    '2026-07-13': 'Día de Nuestra Señora del Rosario de Chiquinquirá',
    '2026-07-20': 'Día de la Independencia de Colombia'
};

function getAnalystShifts(dateObj) {
    if (!dateObj) return null;
    const dow = dateObj.getDay(); // 0=Dom .. 6=Sáb
    if (dow === 0 || dow === 6) return null; // Solo Lunes a Viernes

    // Festivo → descanso para ambos
    const holidayName = ANALYST_HOLIDAYS[ymd(dateObj)];
    if (holidayName) return { holiday: true, name: holidayName };

    // Semana base = la del arranque del Mundial (11-jun-2026, jueves → lunes 8-jun)
    const base = startOfWeek(new Date(2026, 5, 11));
    const ws = startOfWeek(dateObj);
    const weekIdx = Math.round((ws - base) / (7 * 24 * 3600 * 1000));
    const patternA = (weekIdx % 2 === 0);

    // Quién tiene 10-7 según el día (1=Lun .. 5=Vie); el otro hace 8-5.
    const mapA = { 1: 'CHRISTIAN', 2: 'CRISTHIAN', 3: 'CHRISTIAN', 4: 'CHRISTIAN', 5: 'CRISTHIAN' };
    const mapB = { 1: 'CHRISTIAN', 2: 'CRISTHIAN', 3: 'CRISTHIAN', 4: 'CHRISTIAN', 5: 'CRISTHIAN' };
    const who107 = (patternA ? mapA : mapB)[dow];
    const who85 = who107 === 'CHRISTIAN' ? 'CRISTHIAN' : 'CHRISTIAN';

    return [
        { person: who107, range: '10:00 - 19:00', code: '10-7' },
        { person: who85, range: '08:00 - 17:00', code: '8-5' }
    ];
}

// ─────────────────────────────────────────────────────────────────────
// Horario unificado del equipo. Christian/Cristhian → lógica definida;
// resto → window.STAFF_SCHEDULE (archivo). El Admin puede sobrescribir
// cualquier celda (se guarda en localStorage 'staffScheduleOverrides').
// ─────────────────────────────────────────────────────────────────────
const STAFF_LIST = [
    { id: 'LAURA', name: 'Laura', role: 'Gestor', photo: 'personal/Laura.png' },
    { id: 'DANY', name: 'Dany', role: 'Gestor', photo: 'personal/dany.jpg' },
    { id: 'PANCHA', name: 'Pancha', role: 'Gestor', photo: 'personal/Pancha.jpg' },
    { id: 'CHRISTIAN', name: 'Christian E', role: 'Analista', photo: 'personal/christian.png' },
    { id: 'CRISTHIAN', name: 'Cristhian B', role: 'Analista', photo: 'personal/cristhian.png' },
    { id: 'PABLO', name: 'Pablo', role: 'Analista', photo: 'personal/Pablo.jpg' },
    { id: 'DUQUE', name: 'Duque', role: 'Analista', photo: 'personal/Duque.jpg' },
    { id: 'EDWIN', name: 'Edwin', role: 'Líder', photo: 'personal/Edwin.jpg' }
];
const STAFF_BY_ID = Object.fromEntries(STAFF_LIST.map(p => [p.id, p]));

let scheduleOverrides = JSON.parse(localStorage.getItem('staffScheduleOverrides') || '{}');

window.updatePersonSchedule = function (personId, ymdKey, value) {
    if (!scheduleOverrides[personId]) scheduleOverrides[personId] = {};
    if (value && value.trim()) scheduleOverrides[personId][ymdKey] = value.trim();
    else delete scheduleOverrides[personId][ymdKey];
    localStorage.setItem('staffScheduleOverrides', JSON.stringify(scheduleOverrides));
    runAnalysis(scheduleData);
};

function getPersonSchedule(personId, dateObj) {
    if (!dateObj) return null;
    const key = ymd(dateObj);
    const ov = (scheduleOverrides[personId] || {})[key];
    if (ov !== undefined) {
        return { label: ov, off: /^(descanso|descansa)$/i.test(ov), override: true };
    }
    if (personId === 'CHRISTIAN' || personId === 'CRISTHIAN') {
        const s = getAnalystShifts(dateObj);
        if (!s) return { off: true, label: 'Descanso' };
        if (s.holiday) return { holiday: true, name: s.name, label: 'Festivo' };
        const e = s.find(x => x.person === personId);
        return e ? { label: e.range, code: e.code } : { off: true, label: 'Descanso' };
    }
    const sched = (window.STAFF_SCHEDULE || {})[personId];
    if (!sched || !sched[key]) return null;
    const day = sched[key];
    if (day.c === 'off') return { off: true, label: day.t };
    return { label: day.t, special: day.c === 'special', split: day.c === 'split' };
}

let currentRole = null;

function getRole(id) {
    return ROLES.find(r => r.id === id) || null;
}

function isOperatorRole() {
    return currentRole && getRole(currentRole)?.isOperator;
}

function isAnalystRole() {
    return currentRole && getRole(currentRole)?.isAnalyst;
}

// Helper Functions

let rawAssignments = JSON.parse(localStorage.getItem('peakDaysShiftAssignments')) || {};
// Migration to objects if necessary
Object.keys(rawAssignments).forEach(d => {
    Object.keys(rawAssignments[d]).forEach(sId => {
        if (typeof rawAssignments[d][sId] === 'string') {
            rawAssignments[d][sId] = { person: rawAssignments[d][sId] };
        }
    });
});
// (Duque volvió al sistema como Analista, por lo que ya no se remueve)
const _REMOVED_PEOPLE = [];
Object.keys(rawAssignments).forEach(d => {
    Object.keys(rawAssignments[d]).forEach(sId => {
        const entry = rawAssignments[d][sId];
        if (entry && _REMOVED_PEOPLE.includes(entry.person)) {
            delete entry.person;
        }
    });
});
localStorage.setItem('peakDaysShiftAssignments', JSON.stringify(rawAssignments));
window.shiftAssignments = rawAssignments;

// Si el rol guardado pertenece a alguien removido, forzar re-login
if (_REMOVED_PEOPLE.includes(localStorage.getItem('currentRole'))) {
    localStorage.removeItem('currentRole');
}

window.updateShiftAssignment = function (date, shiftIndex, field, value) {
    if (!window.shiftAssignments[date]) window.shiftAssignments[date] = {};
    if (!window.shiftAssignments[date][shiftIndex]) window.shiftAssignments[date][shiftIndex] = {};

    let oldVal = window.shiftAssignments[date][shiftIndex][field];
    window.shiftAssignments[date][shiftIndex][field] = value;

    let valid = true;



    // Validate Rest Rules
    if (valid && window.currentReport) {
        for (let i = 0; i < window.currentReport.length - 1; i++) {
            let today = window.currentReport[i];
            let tomorrow = window.currentReport[i + 1];

            let getP = (day, sId) => {
                let overrides = window.shiftAssignments[day.date] || {};
                let p = overrides[sId]?.person;
                if (p) return p;
                let sObj = day.shifts.find(x => x.id === sId);
                return sObj ? sObj.autoPerson : null;
            };

            let todayS3 = getP(today, 3);
            let tomorrowS1 = getP(tomorrow, 1);

            if (todayS3 && todayS3 === tomorrowS1) {
                alert(`Asignación no permitida: ${todayS3} cierra tarde el ${today.date.split(',')[0]} y no puede abrir el turno 1. \nSe requiere descanso funcional.`);
                valid = false;
                break;
            }
        }
    }

    if (!valid) {
        if (oldVal === undefined) {
            delete window.shiftAssignments[date][shiftIndex][field];
        } else {
            window.shiftAssignments[date][shiftIndex][field] = oldVal;
        }
    } else {
        localStorage.setItem('peakDaysShiftAssignments', JSON.stringify(window.shiftAssignments));
    }

    runAnalysis(scheduleData);
};

// Helper to auto-format time inputs in 24h military format (HH:MM)
window.formatTimeInput = function (input) {
    let val = input.value.replace(/[^\d]/g, ''); // Only digits
    if (val.length >= 3) {
        val = val.substring(0, 2) + ':' + val.substring(2, 4);
    }
    if (val.length > 5) val = val.substring(0, 5);
    input.value = val;
};

function getMatchImportance(team1, team2) {
    if (team1.includes(CRITICAL_TEAM) || team2.includes(CRITICAL_TEAM)) return 'CRÍTICO';
    if (TOP_TEAMS.some(t => team1.includes(t)) || TOP_TEAMS.some(t => team2.includes(t))) return 'ALTO';
    return 'MEDIO';
}

function calculateShiftsAndClosing(matches, date, dayIndex) {
    // Determine the first match and last match to determine spans
    let sortedMatches = [...matches].sort((a, b) => a.time.localeCompare(b.time));

    // Sort logic hack for '00:00' which means midnight (end of day).
    sortedMatches.sort((a, b) => {
        let hA = parseInt(a.time.split(':')[0]);
        let hB = parseInt(b.time.split(':')[0]);
        if (hA < 5) hA += 24;
        if (hB < 5) hB += 24;
        return hA - hB;
    });

    if (sortedMatches.length === 0) {
        return {
            closingTime: "00:00 h",
            shifts: []
        };
    }

    let lastMatch = sortedMatches[sortedMatches.length - 1];

    // CLOSING TIME: 4 hours after the START of the latest match
    let lastMatchH = parseInt(lastMatch.time.split(':')[0]);
    if (lastMatchH < 5) lastMatchH += 24;
    let closingHour = lastMatchH + 4;

    let shifts = [];

    // Turno 1 always starts at 06:00
    let start1 = 6;
    let end1 = 15; // 9 hours

    // Turno 3 ends at closingHour (minimum 15:00)
    let end3 = Math.max(closingHour, 15);
    let start3 = end3 - 9; // 9 hours

    // Turno 2 spans cleanly in the middle
    let start2 = Math.floor((start1 + start3) / 2);
    let end2 = start2 + 9; // 9 hours

    let getMatchesForShift = (sStart, sEnd) => {
        return sortedMatches.filter(m => {
            let mH = parseInt(m.time.split(':')[0]);
            if (mH < 5) mH += 24;
            let mEnd = mH + 2;
            return (mH >= sStart && mH < sEnd) || (mEnd > sStart && mEnd <= sEnd);
        });
    };

    let t1Matches = getMatchesForShift(start1, end1);
    let t2Matches = getMatchesForShift(start2, end2);
    let t3Matches = getMatchesForShift(start3, end3);

    let fHour = (h) => (h % 24).toString().padStart(2, '0') + ':00';

    // Auto-rotated persons based on dayIndex
    const people = ['DANY', 'PANCHA', 'LAURA'];
    let autoP1 = people[(dayIndex) % 3];
    let autoP2 = people[(dayIndex + 1) % 3];
    let autoP3 = people[(dayIndex + 2) % 3];

    // Manual overrides
    let dateAssignments = window.shiftAssignments[date] || {};
    let p1 = dateAssignments[1]?.person || autoP1;
    let p2 = dateAssignments[2]?.person || autoP2;
    let p3 = dateAssignments[3]?.person || autoP3;

    let getCustomTime = (sId, type, defTime) => {
        return dateAssignments[sId]?.[type] || defTime;
    };

    shifts.push({
        id: 1,
        label: "Turno 1 - Apertura",
        timeRange: `${getCustomTime(1, 'start', fHour(start1))} - ${getCustomTime(1, 'end', fHour(end1))}`,
        importance: getDayImportance(t1Matches),
        person: p1,
        autoPerson: autoP1,
        defaultStart: fHour(start1),
        defaultEnd: fHour(end1),
        curStart: getCustomTime(1, 'start', fHour(start1)),
        curEnd: getCustomTime(1, 'end', fHour(end1))
    });

    shifts.push({
        id: 2,
        label: "Turno 2 - Intermedio",
        timeRange: `${getCustomTime(2, 'start', fHour(start2))} - ${getCustomTime(2, 'end', fHour(end2))}`,
        importance: getDayImportance(t2Matches),
        person: p2,
        autoPerson: autoP2,
        defaultStart: fHour(start2),
        defaultEnd: fHour(end2),
        curStart: getCustomTime(2, 'start', fHour(start2)),
        curEnd: getCustomTime(2, 'end', fHour(end2))
    });

    shifts.push({
        id: 3,
        label: "Turno 3 - Cierre",
        timeRange: `${getCustomTime(3, 'start', fHour(start3))} - ${getCustomTime(3, 'end', fHour(end3))}`,
        importance: getDayImportance(t3Matches),
        person: p3,
        autoPerson: autoP3,
        defaultStart: fHour(start3),
        defaultEnd: fHour(end3),
        curStart: getCustomTime(3, 'start', fHour(start3)),
        curEnd: getCustomTime(3, 'end', fHour(end3))
    });

    // Format closing time string dynamically based on the end of the 3rd shift
    let finalCloseHstr = getCustomTime(3, 'end', fHour(end3));
    let finalCloseH = parseInt(finalCloseHstr.split(':')[0]);
    let closingTimeStr;

    // We need to determine if it crosses midnight relative to standard times
    if (finalCloseH < 5) {
        closingTimeStr = `${finalCloseHstr} h <small style="color:var(--gray-64)">[+1 día]</small>`;
    } else {
        closingTimeStr = `${finalCloseHstr} h`;
    }

    return {
        closingTime: closingTimeStr,
        shifts: shifts
    };
}

function getDayImportance(matches) {
    if (matches.length === 0) return 'BAJO'; // Explicitly return BAJO for shifts without matches
    let maxLevel = 'MEDIO';
    let levels = { 'MEDIO': 1, 'ALTO': 2, 'CRÍTICO': 3 };

    matches.forEach(m => {
        let imp = getMatchImportance(m.team1, m.team2);
        if (levels[imp] > levels[maxLevel]) {
            maxLevel = imp;
        }
    });

    return maxLevel;
}

function processSchedule(data) {
    const grouped = {};
    const dateKeys = [];
    data.forEach(match => {
        if (!grouped[match.date]) {
            grouped[match.date] = [];
            dateKeys.push(match.date);
        }
        grouped[match.date].push(match);
    });

    const report = [];
    let dayIndex = 0;

    for (let i = 0; i < dateKeys.length; i++) {
        let date = dateKeys[i];
        let matches = grouped[date];
        let importance = getDayImportance(matches);
        let shiftData = calculateShiftsAndClosing(matches, date, dayIndex);

        matches.sort((a, b) => {
            let hA = parseInt(a.time.split(':')[0]);
            let hB = parseInt(b.time.split(':')[0]);
            if (hA < 5) hA += 24;
            if (hB < 5) hB += 24;
            return hA - hB;
        });

        report.push({
            date: date,
            matches: matches,
            importance: importance,
            closing: shiftData.closingTime,
            shifts: shiftData.shifts
        });

        dayIndex++;
    }

    window.currentReport = report;
    return report;
}

// =====================================================================
// Date parsing & view mode (calendar Día / Semana / Mes / Todo)
// =====================================================================

const SPANISH_MONTHS = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
};

const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const MONTH_SHORT = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const WEEKDAY_LONG = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const WEEKDAY_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']; // Monday first

function parseSpanishDate(text) {
    // e.g. "Jueves, 11 de junio 2026"
    const m = text.match(/,\s*(\d+)\s+de\s+([a-záéíóúñ]+)\s+(\d{4})/i);
    if (!m) return null;
    const day = parseInt(m[1], 10);
    const month = SPANISH_MONTHS[m[2].toLowerCase()];
    const year = parseInt(m[3], 10);
    if (month === undefined || isNaN(day) || isNaN(year)) return null;
    return new Date(year, month, day);
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}

function startOfWeek(d) {
    // Monday-based week
    const day = d.getDay(); // 0=Sun ... 6=Sat
    const diff = (day === 0 ? -6 : 1 - day);
    const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    r.setDate(r.getDate() + diff);
    return r;
}

function endOfWeek(d) {
    const s = startOfWeek(d);
    s.setDate(s.getDate() + 6);
    return s;
}

function ymd(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function fromYmd(s) {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
}

// View state
let currentView = 'day';
let anchorDate = null; // set after parsing match dates
let personFilter = 'all'; // 'all' | 'DANY' | 'PANCHA' | 'LAURA'

// Pre-compute Date objects on parsed schedule entries (read-only convenience)
scheduleData.forEach(e => { e._date = parseSpanishDate(e.date); });

// Min/max bounds from data
const allParsedDates = scheduleData.map(e => e._date).filter(Boolean).sort((a, b) => a - b);
const minDate = allParsedDates.length ? allParsedDates[0] : new Date(2026, 5, 11);
const maxDate = allParsedDates.length ? allParsedDates[allParsedDates.length - 1] : new Date(2026, 6, 19);
anchorDate = new Date(minDate);

function clampDate(d) {
    if (d < minDate) return new Date(minDate);
    if (d > maxDate) return new Date(maxDate);
    return d;
}

function formatDateLabelForView() {
    if (currentView === 'all') return 'Todo el calendario';
    if (currentView === 'month') {
        return `${MONTH_NAMES[anchorDate.getMonth()]} ${anchorDate.getFullYear()}`;
    }
    if (currentView === 'week') {
        const s = startOfWeek(anchorDate);
        const e = endOfWeek(anchorDate);
        if (s.getMonth() === e.getMonth()) {
            return `${s.getDate()} – ${e.getDate()} ${MONTH_SHORT[s.getMonth()]} ${s.getFullYear()}`;
        }
        return `${s.getDate()} ${MONTH_SHORT[s.getMonth()]} – ${e.getDate()} ${MONTH_SHORT[e.getMonth()]} ${s.getFullYear()}`;
    }
    // day
    return `${WEEKDAY_LONG[anchorDate.getDay()]}, ${anchorDate.getDate()} ${MONTH_SHORT[anchorDate.getMonth()]} ${anchorDate.getFullYear()}`;
}

function applyViewFilter(report) {
    if (currentView === 'all') return report;
    return report.filter(day => {
        const d = parseSpanishDate(day.date);
        if (!d) return false;
        if (currentView === 'day') return isSameDay(d, anchorDate);
        if (currentView === 'week') {
            const s = startOfWeek(anchorDate);
            const e = endOfWeek(anchorDate);
            return d >= s && d <= e;
        }
        if (currentView === 'month') {
            return d.getMonth() === anchorDate.getMonth() && d.getFullYear() === anchorDate.getFullYear();
        }
        return true;
    });
}

// Rendering
const scheduleContainer = document.getElementById('scheduleContainer');

function renderSchedule(report) {
    scheduleContainer.innerHTML = '';

    if (report.length === 0) {
        scheduleContainer.innerHTML = `
            <div class="empty-state">
                <i data-lucide="inbox"></i>
                <h3>No hay partidos en esta fecha/filtro</h3>
                <p>Intenta cambiar los parámetros de búsqueda o subir un nuevo calendario.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    report.forEach(day => {
        let badgeClass = 'badge-medium';
        if (day.importance === 'CRÍTICO') badgeClass = 'badge-critical';
        if (day.importance === 'ALTO') badgeClass = 'badge-high';

        let dayBlock = document.createElement('div');
        dayBlock.className = 'day-block';

        // Matches HTML
        let matchesHtml = day.matches.map(m => {
            let mImp = getMatchImportance(m.team1, m.team2);
            let mClass = '';
            if (mImp === 'CRÍTICO') mClass = 'is-ecuador';
            else if (mImp === 'ALTO') mClass = 'is-high';
            if (m.isKnockout) mClass += ' is-knockout';

            const badgeA = (window.resolveTeamBadge && window.resolveTeamBadge(m.team1)) || window.WC_FALLBACK_BADGE;
            const badgeB = (window.resolveTeamBadge && window.resolveTeamBadge(m.team2)) || window.WC_FALLBACK_BADGE;

            const groupTag = m.group ? `<span class="match-group">${m.group}</span>` : '';
            const stadiumTag = m.stadium ? `<span class="match-stadium" title="${m.stadium}"><i data-lucide="map-pin"></i>${m.stadium.replace(/^Estadio\s+/, '')}</span>` : '';

            return `
                <div class="match-card ${mClass}">
                    <div class="match-top">
                        <div class="match-time">${m.time}</div>
                        ${groupTag}
                    </div>
                    <div class="match-teams">
                        <div class="team-side">
                            <img class="team-badge" src="${badgeA}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
                            <div class="team" title="${m.team1}">${m.team1}</div>
                        </div>
                        <div class="vs">VS</div>
                        <div class="team-side team-side-right">
                            <img class="team-badge" src="${badgeB}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
                            <div class="team" title="${m.team2}">${m.team2}</div>
                        </div>
                    </div>
                    ${stadiumTag ? `<div class="match-bottom">${stadiumTag}</div>` : ''}
                </div>
            `;
        }).join('');

        // Equipo · turnos del día (horarios reales). Visibilidad por rol:
        //   Admin / Edwin (Líder) → todo el equipo · Gestores → solo gestores · Analistas → nada (ven su tarjeta personal).
        const dDate = parseSpanishDate(day.date);
        const isAdmin = currentRole === 'ADMIN';
        let teamIds = [];
        if (isAdmin || (getRole(currentRole) || {}).isLeader) teamIds = STAFF_LIST.map(p => p.id);
        else if (ROTATION_PEOPLE.includes(currentRole)) teamIds = ['LAURA', 'DANY', 'PANCHA'];

        let shiftsHtml = teamIds.length ? `
            <div class="shifts-container">
                <div class="shifts-title"><i data-lucide="users"></i> Equipo · turnos del día${isAdmin ? ' · <em style="font-style:normal;font-size:0.85rem;color:var(--accent-blue)">editable</em>' : ' · <em style="font-style:normal;font-size:0.85rem;color:var(--text-muted)">solo lectura</em>'}</div>
                <div class="team-day-list">
                    ${teamIds.map(pid => {
            const p = STAFF_BY_ID[pid];
            const s = getPersonSchedule(pid, dDate);
            const key = dDate ? ymd(dDate) : '';
            const mine = pid === currentRole;
            let chipCls = 'tds-work', text = s ? s.label : '—';
            if (!s) chipCls = 'tds-none';
            else if (s.holiday) { chipCls = 'tds-holiday'; text = 'Festivo · ' + (s.name || ''); }
            else if (s.off) { chipCls = 'tds-off'; }
            else if (s.special) { chipCls = 'tds-special'; }
            const editVal = (s ? (s.holiday ? text : s.label) : '').replace(/"/g, '&quot;');
            const control = isAdmin
                ? `<input type="text" class="tds-input" value="${editVal}" placeholder="—" onchange="window.updatePersonSchedule('${pid}','${key}', this.value)">`
                : `<span class="tds-chip ${chipCls}">${text}</span>`;
            return `
                            <div class="team-day-row${mine ? ' tds-mine' : ''}">
                                <span class="tds-person"><img src="${p.photo}" alt="" onerror="this.style.display='none'"><span class="tds-pname">${p.name}<small>${p.role}</small></span></span>
                                ${control}
                            </div>`;
        }).join('')}
                </div>
            </div>
        ` : '';

        dayBlock.innerHTML = `
            <div class="day-header">
                <div class="day-date">
                    <span class="date-badge">${day.date.split(',')[0]} ${day.date.split('de')[0].split(' ')[1]}</span>
                    <span style="color: var(--gray-64)">${day.date}</span>
                </div>
                <div class="day-summary">
                    <span class="badge ${badgeClass}">Día ${day.importance}</span>
                    <div class="closing-time">
                        <i data-lucide="clock"></i>
                        Cierre: ${day.closing}
                    </div>
                </div>
            </div>
            <div class="day-content">
                ${shiftsHtml}
                <div class="match-list" style="margin-top: 1.5rem;">
                    ${matchesHtml}
                </div>
            </div>
        `;
        scheduleContainer.appendChild(dayBlock);
    });

    lucide.createIcons();
}

function updateStats(report) {
    const totalDays = report.length;
    let peakDays = 0;
    let ecMatches = 0;

    report.forEach(day => {
        if (day.importance === 'CRÍTICO' || day.importance === 'ALTO') peakDays++;
        day.matches.forEach(m => {
            if (m.team1.includes('Ecuador') || m.team2.includes('Ecuador')) ecMatches++;
        });
    });

    // Animate numbers simple
    document.getElementById('stat-total-days').innerText = totalDays;
    document.getElementById('stat-peak-days').innerText = peakDays;
    document.getElementById('stat-ec-matches').innerText = ecMatches;
}

function renderMonthGrid(report) {
    scheduleContainer.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'month-calendar';

    const title = document.createElement('div');
    title.className = 'month-title';
    title.textContent = `${MONTH_NAMES[anchorDate.getMonth()]} ${anchorDate.getFullYear()}`;
    wrap.appendChild(title);

    // Weekday header (Monday-first)
    const weekRow = document.createElement('div');
    weekRow.className = 'weekday-row';
    WEEKDAY_SHORT.forEach(w => {
        const c = document.createElement('div');
        c.className = 'weekday-cell';
        c.textContent = w;
        weekRow.appendChild(c);
    });
    wrap.appendChild(weekRow);

    // Index report days by yyyy-mm-dd
    const byDate = {};
    report.forEach(day => {
        const d = parseSpanishDate(day.date);
        if (d) byDate[ymd(d)] = day;
    });

    const year = anchorDate.getFullYear();
    const month = anchorDate.getMonth();
    const first = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Leading empty cells (Monday-first)
    const firstWeekday = first.getDay(); // 0=Sun..6=Sat
    const offset = (firstWeekday === 0 ? 6 : firstWeekday - 1);

    const grid = document.createElement('div');
    grid.className = 'month-grid';

    for (let i = 0; i < offset; i++) {
        const cell = document.createElement('div');
        cell.className = 'month-day empty';
        grid.appendChild(cell);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= lastDay; d++) {
        const date = new Date(year, month, d);
        const key = ymd(date);
        const day = byDate[key];

        const cell = document.createElement('div');
        cell.className = 'month-day';

        if (!day) {
            cell.classList.add('no-matches');
        } else {
            if (day.importance === 'CRÍTICO') cell.classList.add('has-critical');
            else if (day.importance === 'ALTO') cell.classList.add('has-high');
            else cell.classList.add('has-medium');
        }

        if (isSameDay(date, today)) cell.classList.add('today');

        const num = document.createElement('div');
        num.className = 'month-day-number';
        num.textContent = d;
        cell.appendChild(num);

        if (day) {
            const count = document.createElement('div');
            count.className = 'month-day-count';
            count.textContent = day.matches.length;
            cell.appendChild(count);

            const pills = document.createElement('div');
            pills.className = 'month-day-pills';
            const pill = document.createElement('span');
            pill.className = 'month-pill';
            pill.textContent = day.importance;
            pills.appendChild(pill);
            cell.appendChild(pills);

            cell.addEventListener('click', () => {
                anchorDate = clampDate(date);
                currentView = 'day';
                syncViewButtons();
                syncDateControls();
                runAnalysis(scheduleData);
            });
        }

        grid.appendChild(cell);
    }

    wrap.appendChild(grid);
    scheduleContainer.appendChild(wrap);

    lucide.createIcons();
}

function runAnalysis(data) {
    const currentFilter = document.getElementById('importanceFilter').value;
    const currentSearch = document.getElementById('searchInput').value.toLowerCase();

    // Filter Data before processing
    let filteredData = data.filter(m => {
        let stringContent = `${m.date} ${m.team1} ${m.team2}`.toLowerCase();
        return stringContent.includes(currentSearch);
    });

    let processed = processSchedule(filteredData);

    // Filter by Importance Level (applied on the grouping)
    if (currentFilter !== 'all') {
        processed = processed.filter(day => day.importance === currentFilter);
    }

    // Filter by Person (only show days where that person has any shift).
    // Solo aplica a la rotación clásica; los roles de refuerzo no filtran el calendario.
    if (personFilter !== 'all' && ROTATION_PEOPLE.includes(personFilter)) {
        processed = processed.filter(day =>
            (day.shifts || []).some(s => s.person === personFilter)
        );
    }

    // Apply calendar view filter
    if (currentView === 'month') {
        const monthReport = applyViewFilter(processed);
        renderMonthGrid(monthReport);
    } else {
        const viewReport = applyViewFilter(processed);
        renderSchedule(viewReport);
    }

    // Stats reflect full loaded data; also restore window.currentReport for validation
    let globalProcessed = processSchedule(data);
    updateStats(globalProcessed);

    // Personal section (operators only) — usa el report global filtrado por vista
    renderPersonalSection(globalProcessed);

    syncDateControls();
}

// =====================================================================
// Calendar controls wiring
// =====================================================================

function syncViewButtons() {
    document.querySelectorAll('.view-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.view === currentView);
    });
}

function syncDateControls() {
    const label = document.getElementById('currentDateLabel');
    const picker = document.getElementById('datePicker');
    const prev = document.getElementById('prevDate');
    const next = document.getElementById('nextDate');

    if (label) label.textContent = formatDateLabelForView();

    if (picker) {
        picker.min = ymd(minDate);
        picker.max = ymd(maxDate);
        picker.value = ymd(anchorDate);
        picker.disabled = (currentView === 'all');
    }

    const allMode = currentView === 'all';
    const setArrow = (el) => {
        if (!el) return;
        el.disabled = allMode;
        el.style.opacity = allMode ? '0.4' : '1';
        el.style.pointerEvents = allMode ? 'none' : 'auto';
    };
    setArrow(prev);
    setArrow(next);

    // Navegación espejo dentro de la tarjeta del analista
    const pLabel = document.getElementById('personalDateLabel');
    if (pLabel) pLabel.textContent = formatDateLabelForView();
    setArrow(document.getElementById('personalPrevDate'));
    setArrow(document.getElementById('personalNextDate'));
}

function shiftAnchor(direction) {
    const d = new Date(anchorDate);
    if (currentView === 'day') {
        d.setDate(d.getDate() + direction);
    } else if (currentView === 'week') {
        d.setDate(d.getDate() + direction * 7);
    } else if (currentView === 'month') {
        d.setMonth(d.getMonth() + direction);
    }
    anchorDate = clampDate(d);
}

// View toggle buttons
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentView = btn.dataset.view;
        syncViewButtons();
        runAnalysis(scheduleData);
    });
});

// Date navigation
document.getElementById('prevDate').addEventListener('click', () => {
    shiftAnchor(-1);
    runAnalysis(scheduleData);
});
document.getElementById('nextDate').addEventListener('click', () => {
    shiftAnchor(1);
    runAnalysis(scheduleData);
});
document.getElementById('datePicker').addEventListener('change', (e) => {
    if (!e.target.value) return;
    anchorDate = clampDate(fromYmd(e.target.value));
    runAnalysis(scheduleData);
});
document.getElementById('firstMatchBtn').addEventListener('click', () => {
    anchorDate = new Date(minDate);
    runAnalysis(scheduleData);
});

// Navegación de fecha dentro de la tarjeta del analista (espeja el calendario principal)
const personalPrev = document.getElementById('personalPrevDate');
const personalNext = document.getElementById('personalNextDate');
if (personalPrev) personalPrev.addEventListener('click', () => { shiftAnchor(-1); runAnalysis(scheduleData); });
if (personalNext) personalNext.addEventListener('click', () => { shiftAnchor(1); runAnalysis(scheduleData); });

// Initial Run
syncViewButtons();
runAnalysis(scheduleData);

// Listeners
document.getElementById('searchInput').addEventListener('input', () => runAnalysis(scheduleData));
document.getElementById('importanceFilter').addEventListener('change', () => runAnalysis(scheduleData));

// Excel Export Logic
const downloadBtn = document.getElementById('downloadBtn');
const downloadNavBtn = document.getElementById('downloadNavBtn');

async function exportToExcel() {
    if (!window.ExcelJS) {
        alert('Cargando librería de Excel, por favor intenta en unos segundos...');
        return;
    }

    // Add loading state
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i data-lucide="loader"></i> Exportando...';
    lucide.createIcons();
    downloadBtn.style.opacity = '0.7';
    downloadBtn.style.pointerEvents = 'none';

    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Clasificación Mundial 2026');

        // Define columns
        worksheet.columns = [
            { header: 'Fecha', key: 'date', width: 22 },
            { header: 'Nivel Día', key: 'dayLevel', width: 14 },
            { header: 'Cierre Operación', key: 'closing', width: 18 },
            { header: 'Turno', key: 'shift', width: 25 },
            { header: 'Horario Turno', key: 'shiftTime', width: 18 },
            { header: 'Nivel Turno', key: 'shiftLevel', width: 14 },
            { header: 'Persona Asignada', key: 'person', width: 16 },
            { header: 'Hora Partido', key: 'matchTime', width: 14 },
            { header: 'Partido', key: 'match', width: 38 },
            { header: 'Nivel Partido', key: 'matchLevel', width: 14 }
        ];

        // Style the header
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11, name: 'Arial' };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF16697A' } // Virtualsoft accent blue
        };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
        headerRow.height = 25;

        // AutoFilter on the entire header row
        worksheet.autoFilter = 'A1:J1';

        const fullReport = processSchedule(scheduleData);

        fullReport.forEach(day => {
            let dayDateText = day.date.split(',')[0] + ' ' + day.date.split('de')[0].split(' ')[1] || day.date;

            day.matches.forEach(match => {
                let mH = parseInt(match.time.split(':')[0]);
                if (mH < 5) mH += 24;
                let matchEndH = mH + 2;

                // Find assigned shift
                let assignedShift = null;
                if (day.shifts) {
                    assignedShift = day.shifts.find(s => {
                        let sStart = parseInt(s.curStart.split(':')[0]);
                        if (sStart < 5) sStart += 24;
                        let sEnd = parseInt(s.curEnd.split(':')[0]);
                        if (sEnd < sStart) sEnd += 24;
                        if (sEnd < 5) sEnd += 24; // If it's something like 02:00
                        return (mH >= sStart && mH < sEnd) || (matchEndH > sStart && matchEndH <= sEnd);
                    });
                }

                let matchImp = getMatchImportance(match.team1, match.team2);
                let closingClean = day.closing.replace(/<[^>]*>?/gm, ''); // Remove HTML tags from closing

                const row = worksheet.addRow({
                    date: dayDateText,
                    dayLevel: day.importance,
                    closing: closingClean,
                    shift: assignedShift ? assignedShift.label : 'N/A',
                    shiftTime: assignedShift ? assignedShift.timeRange : 'N/A',
                    shiftLevel: assignedShift ? assignedShift.importance : 'N/A',
                    person: assignedShift ? assignedShift.person : 'N/A',
                    matchTime: match.time,
                    match: `${match.team1} vs ${match.team2}`,
                    matchLevel: matchImp
                });

                // Alignment and borders for the row
                row.alignment = { vertical: 'middle', horizontal: 'center' };
                row.eachCell({ includeEmpty: true }, (cell) => {
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'FFCCCCCC' } },
                        left: { style: 'thin', color: { argb: 'FFCCCCCC' } },
                        bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
                        right: { style: 'thin', color: { argb: 'FFCCCCCC' } }
                    };

                    // Add dynamic coloring based on importance value
                    let val = cell.value;
                    if (val === 'CRÍTICO') {
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEBEB' } };
                        cell.font = { color: { argb: 'FFFF4D4D' }, bold: true };
                    } else if (val === 'ALTO') {
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } };
                        cell.font = { color: { argb: 'FFFFA600' }, bold: true };
                    } else if (val === 'MEDIO') {
                        cell.font = { color: { argb: 'FF16697A' } };
                    }
                });
            });
        });

        // ── Hoja 2: Analistas (Christian E vs Cristhian B) ──
        // Solo se incluye para analistas o admin; los gestores no ven esta información.
        if (isAnalystRole() || currentRole === 'ADMIN') {
        const wsR = workbook.addWorksheet('Analistas');
        wsR.columns = [
            { header: 'Fecha', key: 'date', width: 28 },
            { header: 'Día', key: 'dow', width: 12 },
            { header: 'Christian E', key: 'christian', width: 18 },
            { header: 'Cristhian B', key: 'cristhian', width: 18 }
        ];
        const headerR = wsR.getRow(1);
        headerR.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11, name: 'Arial' };
        headerR.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF16697A' } };
        headerR.alignment = { vertical: 'middle', horizontal: 'center' };
        headerR.height = 25;

        fullReport.forEach(day => {
            const d = parseSpanishDate(day.date);
            const reinf = getAnalystShifts(d);
            if (!reinf) return;
            const isHoliday = !!reinf.holiday;
            const rangeOf = (id) => isHoliday
                ? `DESCANSO · ${reinf.name}`
                : reinf.find(s => s.person === id).range;
            const row = wsR.addRow({
                date: day.date,
                dow: WEEKDAY_LONG[d.getDay()],
                christian: rangeOf('CHRISTIAN'),
                cristhian: rangeOf('CRISTHIAN')
            });
            row.alignment = { vertical: 'middle', horizontal: 'center' };
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: 'thin', color: { argb: 'FFCCCCCC' } },
                    left: { style: 'thin', color: { argb: 'FFCCCCCC' } },
                    bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
                    right: { style: 'thin', color: { argb: 'FFCCCCCC' } }
                };
                if (cell.value === '10:00 - 19:00') {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEDE7FF' } };
                    cell.font = { color: { argb: 'FF6A4DD0' }, bold: true };
                } else if (cell.value === '08:00 - 17:00') {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE3F2FD' } };
                    cell.font = { color: { argb: 'FF16697A' }, bold: true };
                }
            });
        });
        }

        // Generate Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Clasificacion_Mundial_2026.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);

    } catch (e) {
        console.error(e);
        alert('Hubo un error generando el Excel.');
    } finally {
        // Restore button state
        downloadBtn.innerHTML = originalText;
        lucide.createIcons();
        downloadBtn.style.opacity = '1';
        downloadBtn.style.pointerEvents = 'auto';
    }
}

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    exportToExcel();
});

downloadNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    exportToExcel();
});

// Sidebar rail toggle (icons always visible; brand button toggles labels)
const sidebarEl = document.getElementById('sidebar');
const sidebarBrandBtn = document.getElementById('sidebarBrand');

sidebarBrandBtn.addEventListener('click', () => {
    sidebarEl.classList.toggle('collapsed');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !sidebarEl.classList.contains('collapsed')) {
        sidebarEl.classList.add('collapsed');
    }
});

// =====================================================================
// Login / Roles / Sección personal
// =====================================================================

const ADMIN_PASSWORD = 'Pabletoescobar2026*';

function renderLoginGrid() {
    const grid = document.getElementById('loginGrid');
    if (!grid) return;
    grid.innerHTML = ROLES.map(r => {
        const initials = (ANALYST_PEOPLE[r.id] || {}).initials || '';
        const visual = r.avatar
            ? `<img src="${r.avatar}" class="login-avatar" alt="${r.name}" onerror="this.style.display='none'">`
            : r.isAnalyst
                ? `<span class="login-initials">${initials}</span>`
                : `<span class="login-admin-icon"><i data-lucide="shield"></i></span>`;
        const lockHint = r.isOperator ? '' : '<span class="login-card-lock"><i data-lucide="lock"></i></span>';
        return `
            <button class="login-card ${r.isOperator ? '' : 'login-card-admin'}" data-role="${r.id}" type="button">
                ${lockHint}
                ${visual}
                <span class="login-card-name">${r.name}</span>
                <span class="login-card-type">${r.type}</span>
            </button>
        `;
    }).join('');
    lucide.createIcons();
    grid.querySelectorAll('.login-card').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.role === 'ADMIN') {
                showAdminPasswordPrompt();
            } else {
                selectRole(btn.dataset.role);
            }
        });
    });
}

function showAdminPasswordPrompt() {
    document.getElementById('loginGrid').hidden = true;
    document.getElementById('loginPassword').hidden = false;
    document.getElementById('loginPasswordError').hidden = true;
    const input = document.getElementById('loginPasswordInput');
    input.value = '';
    setTimeout(() => input.focus(), 80);
}

function backToLoginGrid() {
    document.getElementById('loginPassword').hidden = true;
    document.getElementById('loginGrid').hidden = false;
    document.getElementById('loginPasswordInput').value = '';
    document.getElementById('loginPasswordError').hidden = true;
}

function submitAdminPassword() {
    const input = document.getElementById('loginPasswordInput');
    const errEl = document.getElementById('loginPasswordError');
    const panel = document.getElementById('loginPassword');
    if (input.value === ADMIN_PASSWORD) {
        backToLoginGrid();
        selectRole('ADMIN');
    } else {
        errEl.textContent = 'Contraseña incorrecta';
        errEl.hidden = false;
        input.value = '';
        input.focus();
        panel.classList.remove('shake');
        // re-trigger animation
        void panel.offsetWidth;
        panel.classList.add('shake');
    }
}

function showLogin() {
    backToLoginGrid();
    const overlay = document.getElementById('loginOverlay');
    if (overlay) overlay.classList.add('active');
}

function hideLogin() {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) overlay.classList.remove('active');
}

function selectRole(roleId) {
    const r = getRole(roleId);
    if (!r) return;
    currentRole = roleId;
    localStorage.setItem('currentRole', roleId);
    updateRolePill();
    hideLogin();
    // Gestor: auto-fija su filtro de persona. Analista y admin: filtro libre ('all').
    const personSelect = document.getElementById('personFilter');
    if (personSelect) {
        if (r.isOperator && !r.isAnalyst) {
            personSelect.value = r.id;
            personFilter = r.id;
        } else {
            personSelect.value = 'all';
            personFilter = 'all';
        }
    }
    runAnalysis(scheduleData);
}

function updateRolePill() {
    const r = getRole(currentRole);
    const pillName = document.getElementById('rolePillName');
    const pillType = document.getElementById('rolePillType');
    const pillAvatar = document.getElementById('rolePillAvatar');
    if (!pillName || !pillType || !pillAvatar) return;

    if (!r) {
        pillName.textContent = 'Iniciar sesión';
        pillType.textContent = 'Sin sesión';
        pillAvatar.innerHTML = '<i data-lucide="user"></i>';
        lucide.createIcons();
        return;
    }
    pillName.textContent = r.name;
    pillType.textContent = r.type;
    if (r.avatar) {
        pillAvatar.innerHTML = `<img src="${r.avatar}" alt="${r.name}" onerror="this.parentNode.innerHTML='<i data-lucide=&quot;user&quot;></i>';">`;
    } else {
        pillAvatar.innerHTML = '<i data-lucide="shield"></i>';
        lucide.createIcons();
    }
}

function formatShortDay(dateStr) {
    const d = parseSpanishDate(dateStr);
    if (!d) return dateStr;
    return `${WEEKDAY_LONG[d.getDay()].slice(0, 3)} ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`;
}

function renderAnalystComparison(r, fullReport) {
    // Vista comparativa SOLO entre los dos analistas (Christian E vs Cristhian B).
    const avatarEl = document.getElementById('personalAvatar');
    if (avatarEl) { avatarEl.style.display = ''; avatarEl.src = r.avatar; }
    document.getElementById('personalName').textContent = `Hola, ${r.name}`;

    const viewReport = applyViewFilter(fullReport);
    const rows = [];
    viewReport.forEach(day => {
        const shifts = getAnalystShifts(parseSpanishDate(day.date));
        if (!shifts) return;
        if (shifts.holiday) {
            rows.push({ day, holiday: shifts.name });
        } else {
            rows.push({
                day,
                CHRISTIAN: shifts.find(s => s.person === 'CHRISTIAN'),
                CRISTHIAN: shifts.find(s => s.person === 'CRISTHIAN')
            });
        }
    });

    const workRows = rows.filter(x => !x.holiday);
    const holidayCount = rows.length - workRows.length;
    const tally = (id) => ({
        late: workRows.filter(x => x[id].code === '10-7').length,
        early: workRows.filter(x => x[id].code === '8-5').length
    });
    const tC = tally('CHRISTIAN'), tB = tally('CRISTHIAN');

    document.getElementById('personalStats').innerHTML = `
        <div class="ps-stat"><span class="ps-stat-num">${workRows.length}</span><span class="ps-stat-lbl">días hábiles</span></div>
        <div class="ps-stat"><span class="ps-stat-num">${holidayCount}</span><span class="ps-stat-lbl">festivos</span></div>
        <div class="ps-stat"><span class="ps-stat-num">${tC.late}·${tC.early}</span><span class="ps-stat-lbl">Christian 10-7·8-5</span></div>
        <div class="ps-stat"><span class="ps-stat-num">${tB.late}·${tB.early}</span><span class="ps-stat-lbl">Cristhian 10-7·8-5</span></div>
    `;

    const breakdownEl = document.getElementById('personalBreakdown');
    if (rows.length === 0) {
        breakdownEl.innerHTML = `
            <div class="pb-empty">
                <i data-lucide="coffee"></i>
                <div><strong>Sin turnos en esta vista.</strong><br>
                Cambia a Semana, Mes o Todo para ver más.</div>
            </div>`;
        lucide.createIcons();
        return;
    }

    const cell = (entry, isMe) => {
        const cls = entry.code === '10-7' ? 'reinf-late' : 'reinf-early';
        return `<td class="cmp-cell ${cls}${isMe ? ' cmp-mine' : ''}">
            <span class="reinf-range">${entry.range}</span>
            <span class="reinf-badge reinf-badge-${entry.code === '10-7' ? 'late' : 'early'}">${entry.code}</span>
        </td>`;
    };

    const head = `
        <tr>
            <th class="cmp-day-head">Día</th>
            <th class="${r.id === 'CHRISTIAN' ? 'cmp-mine-head' : ''}">
                <img src="${ANALYST_PEOPLE.CHRISTIAN.avatar}" class="cmp-avatar" alt="" onerror="this.style.display='none'"> Christian E
            </th>
            <th class="${r.id === 'CRISTHIAN' ? 'cmp-mine-head' : ''}">
                <img src="${ANALYST_PEOPLE.CRISTHIAN.avatar}" class="cmp-avatar" alt="" onerror="this.style.display='none'"> Cristhian B
            </th>
        </tr>`;

    const body = rows.map(x => {
        if (x.holiday) {
            return `
        <tr class="cmp-holiday-row">
            <td class="cmp-day">${formatShortDay(x.day.date)}</td>
            <td class="cmp-holiday" colspan="2"><i data-lucide="palmtree"></i> Festivo · ${x.holiday} — Descanso</td>
        </tr>`;
        }
        return `
        <tr>
            <td class="cmp-day">${formatShortDay(x.day.date)}</td>
            ${cell(x.CHRISTIAN, r.id === 'CHRISTIAN')}
            ${cell(x.CRISTHIAN, r.id === 'CRISTHIAN')}
        </tr>`;
    }).join('');

    breakdownEl.innerHTML = `<div class="analyst-compare-wrap"><table class="analyst-compare">${head}${body}</table></div>`;
    lucide.createIcons();
}

function dateInView(d) {
    if (!d) return false;
    if (currentView === 'all') return true;
    if (currentView === 'day') return isSameDay(d, anchorDate);
    if (currentView === 'week') { const s = startOfWeek(anchorDate), e = endOfWeek(anchorDate); return d >= s && d <= e; }
    if (currentView === 'month') return d.getMonth() === anchorDate.getMonth() && d.getFullYear() === anchorDate.getFullYear();
    return true;
}

// Calendario propio de una persona (gestores, Pablo, Duque, Edwin)
function renderOwnSchedule(r) {
    const avatarEl = document.getElementById('personalAvatar');
    if (avatarEl) { avatarEl.style.display = ''; avatarEl.src = r.avatar; }
    document.getElementById('personalName').textContent = `Hola, ${r.name}`;

    const sched = (window.STAFF_SCHEDULE || {})[r.id] || {};
    const items = Object.keys(sched).map(k => fromYmd(k)).filter(dateInView).sort((a, b) => a - b)
        .map(d => ({ d, s: getPersonSchedule(r.id, d) }));

    const work = items.filter(x => x.s && !x.s.off && !x.s.holiday);
    const rest = items.filter(x => x.s && (x.s.off || x.s.holiday));

    document.getElementById('personalStats').innerHTML = `
        <div class="ps-stat"><span class="ps-stat-num">${work.length}</span><span class="ps-stat-lbl">turnos</span></div>
        <div class="ps-stat"><span class="ps-stat-num">${rest.length}</span><span class="ps-stat-lbl">descansos</span></div>
    `;

    const breakdownEl = document.getElementById('personalBreakdown');
    if (items.length === 0) {
        breakdownEl.innerHTML = `
            <div class="pb-empty"><i data-lucide="coffee"></i>
            <div><strong>Sin días en esta vista.</strong><br>Cambia a Semana, Mes o Todo para ver más.</div></div>`;
        lucide.createIcons();
        return;
    }

    const rows = items.map(({ d, s }) => {
        let val;
        if (!s) val = `<span style="color:#9CA3AF;">—</span>`;
        else if (s.holiday) val = `<span class="tds-chip tds-holiday">Festivo · ${s.name || ''}</span>`;
        else if (s.off) val = `<span class="tds-chip tds-off">Descanso</span>`;
        else val = `<span class="tds-chip tds-work">${s.label}</span>`;
        const lbl = `${WEEKDAY_LONG[d.getDay()].slice(0, 3)} ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`;
        return `<tr><td class="cmp-day">${lbl}</td><td style="text-align:right;">${val}</td></tr>`;
    }).join('');

    breakdownEl.innerHTML = `<div class="analyst-compare-wrap"><table class="analyst-compare">
        <tr><th class="cmp-day-head">Día</th><th>Horario</th></tr>${rows}</table></div>`;
    lucide.createIcons();
}

function renderPersonalSection(fullReport) {
    const card = document.getElementById('personalCard');
    if (!card) return;
    const r = getRole(currentRole);
    if (!r || (!r.isOperator && !r.isLeader)) {
        card.hidden = true;
        return;
    }
    card.hidden = false;

    // Christian / Cristhian → comparativa de pareja (lógica ya definida)
    if (r.id === 'CHRISTIAN' || r.id === 'CRISTHIAN') {
        renderAnalystComparison(r, fullReport);
        return;
    }
    // Gestores, Pablo, Duque y Edwin → su propio calendario
    renderOwnSchedule(r);
}

// Person filter listener
document.getElementById('personFilter').addEventListener('change', (e) => {
    personFilter = e.target.value;
    runAnalysis(scheduleData);
});

// Role pill = botón de cambio de sesión
document.getElementById('rolePill').addEventListener('click', showLogin);

// Login: contraseña admin
document.getElementById('loginBack').addEventListener('click', backToLoginGrid);
document.getElementById('loginPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    submitAdminPassword();
});

// Inicialización del rol
renderLoginGrid();
const savedRole = localStorage.getItem('currentRole');
if (savedRole && getRole(savedRole)) {
    currentRole = savedRole;
    updateRolePill();
    const r = getRole(currentRole);
    if (r.isOperator && !r.isAnalyst) {
        const personSelect = document.getElementById('personFilter');
        if (personSelect) {
            personSelect.value = r.id;
            personFilter = r.id;
        }
    }
    runAnalysis(scheduleData);
} else {
    updateRolePill();
    showLogin();
}
