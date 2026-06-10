/**
 * Horarios explícitos del equipo (fuente: "Horarios Mundial Deportivas Final").
 * Clave por persona → { 'YYYY-MM-DD': { t: textoTurno, c: categoria } }
 *   categoria: 'work' | 'off' | 'special' | 'split'
 *
 * OJO: CHRISTIAN y CRISTHIAN NO van aquí — mantienen su lógica ya definida
 * (10-7 / 8-5 alternando + festivos) en app.js / mailer.
 * "Duque" corresponde a la fila "Sebastian" del archivo (Sebastián Duque).
 *
 * Se carga tanto en navegador (window.STAFF_SCHEDULE) como en Node (module.exports).
 */
(function () {
    const DATES = [
        '2026-06-05', '2026-06-06', '2026-06-07', '2026-06-08', '2026-06-09', '2026-06-10',
        '2026-06-11', '2026-06-12', '2026-06-13', '2026-06-14', '2026-06-15', '2026-06-16',
        '2026-06-17', '2026-06-18', '2026-06-19', '2026-06-20', '2026-06-21', '2026-06-22',
        '2026-06-23', '2026-06-24', '2026-06-25', '2026-06-26', '2026-06-27', '2026-06-28',
        '2026-06-29', '2026-06-30', '2026-07-01', '2026-07-02', '2026-07-03', '2026-07-04',
        '2026-07-05', '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09', '2026-07-10',
        '2026-07-11', '2026-07-12', '2026-07-13', '2026-07-14', '2026-07-15', '2026-07-16',
        '2026-07-17', '2026-07-18', '2026-07-19', '2026-07-20'
    ];

    // Cada arreglo tiene 46 entradas alineadas a DATES. [texto, categoria]
    const RAW = {
        LAURA: [
            ['6 AM - 3 PM', 'work'], ['Descansa', 'off'], ['Trabaja', 'work'], ['Trabaja', 'work'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['7 AM - 1 PM', 'work'], ['7 AM - 1 PM', 'work'], ['7 AM - 3 PM', 'work'], ['7 AM - 1 PM', 'work'], ['7 AM - 1 PM', 'work'], ['7 AM - 3 PM', 'work'],
            ['7 AM - 1 PM', 'work'], ['7 AM - 1 PM', 'work'], ['7 AM - 3 PM', 'work'], ['7 AM - 3 PM', 'work'], ['7 AM - 1 PM', 'work'], ['7 AM - 3 PM', 'work'],
            ['7 AM - 1 PM', 'work'], ['7 AM - 1 PM', 'work'], ['8 AM - 2 PM', 'work'], ['7 AM - 3 PM', 'work'], ['8 AM - 5 PM', 'work'], ['DESCANSO', 'off'],
            ['7 AM - 3 PM', 'work'], ['DESCANSO', 'off'], ['7 AM - 1 PM', 'work'], ['8 AM - 5 PM', 'work'], ['DESCANSO', 'off'], ['7 AM - 3 PM', 'work'],
            ['7 AM - 4 PM', 'work'], ['7 AM - 1 PM', 'work'], ['6 AM - 3 PM', 'work'], ['6 AM - 3 PM', 'work'], ['6 AM - 3 PM', 'work'], ['DESCANSO', 'off'],
            ['8 AM-9 AM / 12 PM-5 PM', 'split'], ['Turno domingo normal', 'special'], ['DESCANSO', 'off'], ['6 AM - 3 PM', 'work'], ['6 AM - 3 PM', 'work'], ['6 AM - 3 PM', 'work'],
            ['7 AM - 4 PM', 'work'], ['8 AM-9 AM / 2 PM-7 PM', 'split'], ['DESCANSO', 'off'], ['DESCANSO', 'off']
        ],
        DANY: [
            ['9 AM - 6 PM', 'work'], ['Trabaja', 'work'], ['Descansa', 'off'], ['Descansa', 'off'], ['6 AM - 3 PM', 'work'], ['6 AM - 3 PM', 'work'],
            ['12 M - 6 PM', 'work'], ['12 M - 6 PM', 'work'], ['1 PM - 9 PM', 'work'], ['12 M - 6 PM', 'work'], ['12 M - 6 PM', 'work'], ['1 PM - 9 PM', 'work'],
            ['12 M - 6 PM', 'work'], ['12 M - 6 PM', 'work'], ['1 PM - 9 PM', 'work'], ['1 PM - 9 PM', 'work'], ['6 PM - 12 PM', 'work'], ['6 PM - 2 AM', 'work'],
            ['6 PM - 12 PM', 'work'], ['6 PM - 12 PM', 'work'], ['6 PM - 12 PM', 'work'], ['6 PM - 2 AM', 'work'], ['2 PM - 11 PM', 'work'], ['DESCANSO', 'off'],
            ['3 PM - 11 PM', 'work'], ['7 AM - 3 PM', 'work'], ['11 AM - 5 PM', 'work'], ['DESCANSO', 'off'], ['8 AM - 4 PM', 'work'], ['11 AM - 7 PM', 'work'],
            ['DESCANSO', 'off'], ['11 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['5 PM - 11 PM', 'work'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['9 AM - 6 PM', 'work'], ['9 AM - 6 PM', 'work'], ['9 AM - 6 PM', 'work'],
            ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['8 AM - 5 PM', 'work'], ['DESCANSO', 'off']
        ],
        PANCHA: [
            ['8 AM - 5 PM', 'work'], ['Descansa', 'off'], ['Descansa', 'off'], ['Descansa', 'off'], ['9 AM - 6 PM', 'work'], ['9 AM - 6 PM', 'work'],
            ['6 PM - 12 PM', 'work'], ['6 PM - 12 PM', 'work'], ['6 PM - 2 AM', 'work'], ['6 PM - 12 PM', 'work'], ['6 PM - 12 PM', 'work'], ['6 PM - 2 AM', 'work'],
            ['6 PM - 12 PM', 'work'], ['5 PM - 11 PM', 'work'], ['6 PM - 2 AM', 'work'], ['6 PM - 2 AM', 'work'], ['12 M - 6 PM', 'work'], ['1 PM - 9 PM', 'work'],
            ['12 M - 6 PM', 'work'], ['12 M - 6 PM', 'work'], ['12 M - 6 PM', 'work'], ['1 PM - 9 PM', 'work'], ['3 PM - 12 PM', 'work'], ['8 AM-9 AM / 1 PM-5 PM', 'split'],
            ['DESCANSO', 'off'], ['3 PM - 11 PM', 'work'], ['4 PM - 10 PM', 'work'], ['4 PM - 1 AM', 'work'], ['4 PM - 12 AM', 'work'], ['DESCANSO', 'off'],
            ['2 PM - 10 PM', 'work'], ['4 PM - 10 PM', 'work'], ['9 AM - 6 PM', 'work'], ['9 AM - 5 PM', 'work'], ['9 AM - 6 PM', 'work'], ['DESCANSO', 'off'],
            ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['TURNO FESTIVO NORMAL', 'special'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['TURNO NORMAL FESTIVO', 'special']
        ],
        // "Sebastian" en el archivo = Duque (Sebastián Duque)
        DUQUE: [
            ['8 AM - 5 PM', 'work'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['12 PM - 9 PM', 'work'], ['11 AM - 8 PM', 'work'], ['5 PM - 11 PM', 'work'], ['2 PM - 9 PM', 'work'], ['8 AM - 4 PM', 'work'], ['11 AM - 6 PM', 'work'],
            ['8 AM - 3 PM', 'work'], ['10 AM - 5 PM', 'work'], ['11 AM - 6 PM', 'work'], ['9 AM - 4 PM', 'work'], ['DESCANSO', 'off'], ['3 PM - 10 PM', 'work'],
            ['1 PM - 8 PM', 'work'], ['11 AM - 8 PM', 'work'], ['12 PM - 9 PM', 'work'], ['3 PM - 10 PM', 'work'], ['1 PM - 9 PM', 'work'], ['10 AM - 2 PM', 'work'],
            ['DESCANSO', 'off'], ['9 AM - 4 PM', 'work'], ['9 AM - 4 PM', 'work'], ['11 AM - 7 PM', 'work'], ['9 AM - 4 PM', 'work'], ['10 AM - 4 PM', 'work'],
            ['DESCANSO', 'off'], ['11 AM - 7 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'],
            ['1 PM - 8 PM', 'work'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['8 AM - 5 PM', 'work'], ['DESCANSO', 'off'], ['10 AM - 2 PM', 'work'], ['DESCANSO', 'off']
        ],
        EDWIN: [
            ['8 AM - 5 PM', 'work'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['11 AM - 5 PM', 'work'], ['9 AM - 4 PM', 'work'], ['9 AM - 4 PM', 'work'], ['9 AM - 4 PM', 'work'],
            ['9 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['9 AM - 4 PM', 'work'], ['DESCANSO', 'off'], ['8 AM - 3 PM', 'work'], ['9 AM - 4 PM', 'work'],
            ['9 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['12 M - 6 PM', 'work'], ['DESCANSO', 'off'],
            ['9 AM - 4 PM', 'work'], ['9 AM - 4 PM', 'work'], ['8 AM - 3 PM', 'work'], ['8 AM - 3 PM', 'work'], ['8 AM - 3 PM', 'work'], ['DESCANSO', 'off'],
            ['12 PM - 7 PM', 'work'], ['9 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'],
            ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['8 AM - 5 PM', 'work'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['DESCANSO', 'off']
        ],
        PABLO: [
            ['8 AM - 5 PM', 'work'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['11 AM - 5 PM', 'work'], ['9 AM - 4 PM', 'work'], ['12 PM - 8 PM', 'work'], ['4 PM - 11 PM', 'work'],
            ['2 PM - 9 PM', 'work'], ['1 PM - 8 PM', 'work'], ['3 PM - 10 PM', 'work'], ['4 PM - 11 PM', 'work'], ['1 PM - 8 PM', 'work'], ['DESCANSO', 'off'],
            ['8 AM - 3 PM', 'work'], ['11 AM - 8 PM', 'work'], ['12 PM - 9 PM', 'work'], ['10 AM - 5 PM', 'work'], ['1 PM - 9 PM', 'work'], ['DESCANSO', 'off'],
            ['1 PM - 8 PM', 'work'], ['1 PM - 8 PM', 'work'], ['1 PM - 8 PM', 'work'], ['2 PM - 10 PM', 'work'], ['2 PM - 9 PM', 'work'], ['10 AM - 4 PM', 'work'],
            ['DESCANSO', 'off'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'], ['8 AM - 4 PM', 'work'],
            ['1 PM - 8 PM', 'work'], ['DESCANSO', 'off'], ['DESCANSO', 'off'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'], ['8 AM - 5 PM', 'work'],
            ['8 AM - 5 PM', 'work'], ['12 PM - 5 PM', 'work'], ['DESCANSO', 'off'], ['DESCANSO', 'off']
        ]
    };

    const out = {};
    for (const p in RAW) {
        out[p] = {};
        RAW[p].forEach((e, i) => { out[p][DATES[i]] = { t: e[0], c: e[1] }; });
    }

    if (typeof window !== 'undefined') window.STAFF_SCHEDULE = out;
    if (typeof module !== 'undefined' && module.exports) module.exports = out;
})();
