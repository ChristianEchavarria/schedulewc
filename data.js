// Mundial 2026 — cronograma y escudos
// Fuente: luxury-calendar (worldCupData.js + worldCupBadges.js)
// Las horas ya están ajustadas (formato 24h, hora final que se usa para turnos)
// Knockout (TBD): se les asigna 15:00 como hora de referencia para el cálculo de turnos.

window.WC_MATCHES = [
  // ─────────── Fase de Grupos ───────────
  { date: "Jueves, 11 de junio 2026", time: "14:00", team1: "México", team2: "Sudáfrica", group: "Grupo A", stadium: "Estadio Ciudad de México" },
  { date: "Jueves, 11 de junio 2026", time: "21:00", team1: "República de Corea", team2: "Rep. Checa", group: "Grupo A", stadium: "Estadio Guadalajara" },

  { date: "Viernes, 12 de junio 2026", time: "14:00", team1: "Canadá", team2: "Bosnia", group: "Grupo B", stadium: "Estadio Toronto" },
  { date: "Viernes, 12 de junio 2026", time: "20:00", team1: "Estados Unidos", team2: "Paraguay", group: "Grupo D", stadium: "Estadio Los Ángeles" },

  { date: "Sábado, 13 de junio 2026", time: "14:00", team1: "Catar", team2: "Suiza", group: "Grupo B", stadium: "Estadio Bahía de San Francisco" },
  { date: "Sábado, 13 de junio 2026", time: "17:00", team1: "Brasil", team2: "Marruecos", group: "Grupo C", stadium: "Estadio Nueva York Nueva Jersey" },
  { date: "Sábado, 13 de junio 2026", time: "20:00", team1: "Haití", team2: "Escocia", group: "Grupo C", stadium: "Estadio Boston" },
  { date: "Sábado, 13 de junio 2026", time: "23:00", team1: "Australia", team2: "Turquía", group: "Grupo D", stadium: "Estadio BC Place Vancouver" },

  { date: "Domingo, 14 de junio 2026", time: "12:00", team1: "Alemania", team2: "Curazao", group: "Grupo E", stadium: "Estadio Houston" },
  { date: "Domingo, 14 de junio 2026", time: "15:00", team1: "Países Bajos", team2: "Japón", group: "Grupo F", stadium: "Estadio Dallas" },
  { date: "Domingo, 14 de junio 2026", time: "18:00", team1: "Costa de Marfil", team2: "Ecuador", group: "Grupo E", stadium: "Estadio Filadelfia" },
  { date: "Domingo, 14 de junio 2026", time: "21:00", team1: "Suecia", team2: "Túnez", group: "Grupo F", stadium: "Estadio Monterrey" },

  { date: "Lunes, 15 de junio 2026", time: "11:00", team1: "España", team2: "Cabo Verde", group: "Grupo H", stadium: "Estadio Atlanta" },
  { date: "Lunes, 15 de junio 2026", time: "14:00", team1: "Bélgica", team2: "Egipto", group: "Grupo G", stadium: "Estadio Seattle" },
  { date: "Lunes, 15 de junio 2026", time: "17:00", team1: "Arabia Saudí", team2: "Uruguay", group: "Grupo H", stadium: "Estadio Miami" },
  { date: "Lunes, 15 de junio 2026", time: "20:00", team1: "Irán", team2: "Nueva Zelanda", group: "Grupo G", stadium: "Estadio Los Ángeles" },

  { date: "Martes, 16 de junio 2026", time: "14:00", team1: "Francia", team2: "Senegal", group: "Grupo I", stadium: "Estadio Nueva York Nueva Jersey" },
  { date: "Martes, 16 de junio 2026", time: "17:00", team1: "Irak", team2: "Noruega", group: "Grupo I", stadium: "Estadio Boston" },
  { date: "Martes, 16 de junio 2026", time: "20:00", team1: "Argentina", team2: "Argelia", group: "Grupo J", stadium: "Estadio Kansas City" },
  { date: "Martes, 16 de junio 2026", time: "23:00", team1: "Austria", team2: "Jordania", group: "Grupo J", stadium: "Estadio Bahía de San Francisco" },

  { date: "Miércoles, 17 de junio 2026", time: "12:00", team1: "Portugal", team2: "RD Congo", group: "Grupo K", stadium: "Estadio Houston" },
  { date: "Miércoles, 17 de junio 2026", time: "15:00", team1: "Inglaterra", team2: "Croacia", group: "Grupo L", stadium: "Estadio Dallas" },
  { date: "Miércoles, 17 de junio 2026", time: "18:00", team1: "Ghana", team2: "Panamá", group: "Grupo L", stadium: "Estadio Toronto" },
  { date: "Miércoles, 17 de junio 2026", time: "21:00", team1: "Uzbekistán", team2: "Colombia", group: "Grupo K", stadium: "Estadio Ciudad de México" },

  { date: "Jueves, 18 de junio 2026", time: "11:00", team1: "Rep. Checa", team2: "Sudáfrica", group: "Grupo A", stadium: "Estadio Atlanta" },
  { date: "Jueves, 18 de junio 2026", time: "14:00", team1: "Suiza", team2: "Bosnia", group: "Grupo B", stadium: "Estadio Los Ángeles" },
  { date: "Jueves, 18 de junio 2026", time: "17:00", team1: "Canadá", team2: "Catar", group: "Grupo B", stadium: "Estadio BC Place Vancouver" },
  { date: "Jueves, 18 de junio 2026", time: "20:00", team1: "México", team2: "República de Corea", group: "Grupo A", stadium: "Estadio Guadalajara" },

  { date: "Viernes, 19 de junio 2026", time: "14:00", team1: "Estados Unidos", team2: "Australia", group: "Grupo D", stadium: "Estadio Seattle" },
  { date: "Viernes, 19 de junio 2026", time: "17:00", team1: "Escocia", team2: "Marruecos", group: "Grupo C", stadium: "Estadio Boston" },
  { date: "Viernes, 19 de junio 2026", time: "20:00", team1: "Brasil", team2: "Haití", group: "Grupo C", stadium: "Estadio Filadelfia" },
  { date: "Viernes, 19 de junio 2026", time: "23:00", team1: "Turquía", team2: "Paraguay", group: "Grupo D", stadium: "Estadio Bahía de San Francisco" },

  { date: "Sábado, 20 de junio 2026", time: "12:00", team1: "Países Bajos", team2: "Suecia", group: "Grupo F", stadium: "Estadio Houston" },
  { date: "Sábado, 20 de junio 2026", time: "15:00", team1: "Alemania", team2: "Costa de Marfil", group: "Grupo E", stadium: "Estadio Toronto" },
  { date: "Sábado, 20 de junio 2026", time: "21:00", team1: "Ecuador", team2: "Curazao", group: "Grupo E", stadium: "Estadio Kansas City" },
  { date: "Sábado, 20 de junio 2026", time: "23:00", team1: "Túnez", team2: "Japón", group: "Grupo F", stadium: "Estadio Monterrey" },

  { date: "Domingo, 21 de junio 2026", time: "11:00", team1: "España", team2: "Arabia Saudí", group: "Grupo H", stadium: "Estadio Atlanta" },
  { date: "Domingo, 21 de junio 2026", time: "14:00", team1: "Bélgica", team2: "Irán", group: "Grupo G", stadium: "Estadio Los Ángeles" },
  { date: "Domingo, 21 de junio 2026", time: "17:00", team1: "Uruguay", team2: "Cabo Verde", group: "Grupo H", stadium: "Estadio Miami" },
  { date: "Domingo, 21 de junio 2026", time: "20:00", team1: "Nueva Zelanda", team2: "Egipto", group: "Grupo G", stadium: "Estadio BC Place Vancouver" },

  { date: "Lunes, 22 de junio 2026", time: "12:00", team1: "Argentina", team2: "Austria", group: "Grupo J", stadium: "Estadio Dallas" },
  { date: "Lunes, 22 de junio 2026", time: "16:00", team1: "Francia", team2: "Irak", group: "Grupo I", stadium: "Estadio Filadelfia" },
  { date: "Lunes, 22 de junio 2026", time: "19:00", team1: "Noruega", team2: "Senegal", group: "Grupo I", stadium: "Estadio Nueva York Nueva Jersey" },
  { date: "Lunes, 22 de junio 2026", time: "22:00", team1: "Jordania", team2: "Argelia", group: "Grupo J", stadium: "Estadio Bahía de San Francisco" },

  { date: "Martes, 23 de junio 2026", time: "12:00", team1: "Portugal", team2: "Uzbekistán", group: "Grupo K", stadium: "Estadio Houston" },
  { date: "Martes, 23 de junio 2026", time: "15:00", team1: "Inglaterra", team2: "Ghana", group: "Grupo L", stadium: "Estadio Boston" },
  { date: "Martes, 23 de junio 2026", time: "18:00", team1: "Panamá", team2: "Croacia", group: "Grupo L", stadium: "Estadio Toronto" },
  { date: "Martes, 23 de junio 2026", time: "21:00", team1: "Colombia", team2: "RD Congo", group: "Grupo K", stadium: "Estadio Guadalajara" },

  { date: "Miércoles, 24 de junio 2026", time: "14:00", team1: "Suiza", team2: "Canadá", group: "Grupo B", stadium: "Estadio BC Place Vancouver" },
  { date: "Miércoles, 24 de junio 2026", time: "14:00", team1: "Bosnia", team2: "Catar", group: "Grupo B", stadium: "Estadio Seattle" },
  { date: "Miércoles, 24 de junio 2026", time: "17:00", team1: "Brasil", team2: "Escocia", group: "Grupo C", stadium: "Estadio Miami" },
  { date: "Miércoles, 24 de junio 2026", time: "17:00", team1: "Marruecos", team2: "Haití", group: "Grupo C", stadium: "Estadio Atlanta" },
  { date: "Miércoles, 24 de junio 2026", time: "20:00", team1: "Rep. Checa", team2: "México", group: "Grupo A", stadium: "Estadio Ciudad de México" },
  { date: "Miércoles, 24 de junio 2026", time: "20:00", team1: "Sudáfrica", team2: "República de Corea", group: "Grupo A", stadium: "Estadio Monterrey" },

  { date: "Jueves, 25 de junio 2026", time: "15:00", team1: "Curazao", team2: "Costa de Marfil", group: "Grupo E", stadium: "Estadio Filadelfia" },
  { date: "Jueves, 25 de junio 2026", time: "15:00", team1: "Ecuador", team2: "Alemania", group: "Grupo E", stadium: "Estadio Nueva York Nueva Jersey" },
  { date: "Jueves, 25 de junio 2026", time: "18:00", team1: "Japón", team2: "Suecia", group: "Grupo F", stadium: "Estadio Dallas" },
  { date: "Jueves, 25 de junio 2026", time: "18:00", team1: "Túnez", team2: "Países Bajos", group: "Grupo F", stadium: "Estadio Kansas City" },
  { date: "Jueves, 25 de junio 2026", time: "21:00", team1: "Turquía", team2: "Estados Unidos", group: "Grupo D", stadium: "Estadio Los Ángeles" },
  { date: "Jueves, 25 de junio 2026", time: "21:00", team1: "Paraguay", team2: "Australia", group: "Grupo D", stadium: "Estadio Bahía de San Francisco" },

  { date: "Viernes, 26 de junio 2026", time: "14:00", team1: "Noruega", team2: "Francia", group: "Grupo I", stadium: "Estadio Boston" },
  { date: "Viernes, 26 de junio 2026", time: "14:00", team1: "Senegal", team2: "Irak", group: "Grupo I", stadium: "Estadio Toronto" },
  { date: "Viernes, 26 de junio 2026", time: "19:00", team1: "Cabo Verde", team2: "Arabia Saudí", group: "Grupo H", stadium: "Estadio Houston" },
  { date: "Viernes, 26 de junio 2026", time: "19:00", team1: "Uruguay", team2: "España", group: "Grupo H", stadium: "Estadio Guadalajara" },
  { date: "Viernes, 26 de junio 2026", time: "22:00", team1: "Egipto", team2: "Irán", group: "Grupo G", stadium: "Estadio Seattle" },
  { date: "Viernes, 26 de junio 2026", time: "22:00", team1: "Nueva Zelanda", team2: "Bélgica", group: "Grupo G", stadium: "Estadio BC Place Vancouver" },

  { date: "Sábado, 27 de junio 2026", time: "16:00", team1: "Panamá", team2: "Inglaterra", group: "Grupo L", stadium: "Estadio Nueva York Nueva Jersey" },
  { date: "Sábado, 27 de junio 2026", time: "16:00", team1: "Croacia", team2: "Ghana", group: "Grupo L", stadium: "Estadio Filadelfia" },
  { date: "Sábado, 27 de junio 2026", time: "18:30", team1: "Colombia", team2: "Portugal", group: "Grupo K", stadium: "Estadio Miami" },
  { date: "Sábado, 27 de junio 2026", time: "18:30", team1: "RD Congo", team2: "Uzbekistán", group: "Grupo K", stadium: "Estadio Atlanta" },
  { date: "Sábado, 27 de junio 2026", time: "21:00", team1: "Argelia", team2: "Austria", group: "Grupo J", stadium: "Estadio Kansas City" },
  { date: "Sábado, 27 de junio 2026", time: "21:00", team1: "Jordania", team2: "Argentina", group: "Grupo J", stadium: "Estadio Dallas" },

  // ─────────── Dieciseisavos / Octavos / Cuartos / Semis / Final ───────────
  { date: "Domingo, 28 de junio 2026", time: "14:00", team1: "Sudáfrica", team2: "Canadá", group: "Partido 73", stadium: "Estadio Los Ángeles", isKnockout: true },

  { date: "Lunes, 29 de junio 2026", time: "12:00", team1: "Brasil", team2: "Japón", group: "Partido 74", stadium: "Estadio Boston", isKnockout: true },
  { date: "Lunes, 29 de junio 2026", time: "20:00", team1: "Países Bajos", team2: "Marruecos", group: "Partido 75", stadium: "Estadio Monterrey", isKnockout: true },
  { date: "Lunes, 29 de junio 2026", time: "15:30", team1: "Alemania", team2: "Paraguay", group: "Partido 76", stadium: "Estadio Houston", isKnockout: true },

  { date: "Martes, 30 de junio 2026", time: "12:00", team1: "Costa de Marfil", team2: "Noruega", group: "Partido 77", stadium: "Estadio Nueva York Nueva Jersey", isKnockout: true },
  { date: "Martes, 30 de junio 2026", time: "16:00", team1: "Francia", team2: "Suecia", group: "Partido 78", stadium: "Estadio Dallas", isKnockout: true },
  { date: "Martes, 30 de junio 2026", time: "20:00", team1: "México", team2: "Ecuador", group: "Partido 79", stadium: "Estadio Ciudad de México", isKnockout: true },

  { date: "Miércoles, 1 de julio 2026", time: "19:00", team1: "Estados Unidos", team2: "Bosnia", group: "Partido 80", stadium: "Estadio Atlanta", isKnockout: true },
  { date: "Miércoles, 1 de julio 2026", time: "11:00", team1: "Inglaterra", team2: "RD Congo", group: "Partido 81", stadium: "Estadio Bahía de San Francisco", isKnockout: true },
  { date: "Miércoles, 1 de julio 2026", time: "15:00", team1: "Bélgica", team2: "Senegal", group: "Partido 82", stadium: "Estadio Seattle", isKnockout: true },

  { date: "Jueves, 2 de julio 2026", time: "14:00", team1: "España", team2: "Austria", group: "Partido 83", stadium: "Estadio Toronto", isKnockout: true },
  { date: "Jueves, 2 de julio 2026", time: "18:00", team1: "Portugal", team2: "Croacia", group: "Partido 84", stadium: "Estadio Los Ángeles", isKnockout: true },
  { date: "Jueves, 2 de julio 2026", time: "22:00", team1: "Suiza", team2: "Argelia", group: "Partido 85", stadium: "Estadio BC Place Vancouver", isKnockout: true },

  { date: "Viernes, 3 de julio 2026", time: "13:00", team1: "Australia", team2: "Egipto", group: "Partido 86", stadium: "Estadio Miami", isKnockout: true },
  { date: "Viernes, 3 de julio 2026", time: "17:00", team1: "Argentina", team2: "Cabo Verde", group: "Partido 87", stadium: "Estadio Kansas City", isKnockout: true },
  { date: "Viernes, 3 de julio 2026", time: "20:30", team1: "A definir", team2: "A definir", group: "Partido 88", stadium: "Estadio Dallas", isKnockout: true },

  { date: "Sábado, 4 de julio 2026", time: "15:00", team1: "Ganador Partido 74", team2: "Ganador Partido 77", group: "Partido 89", stadium: "Estadio Filadelfia", isKnockout: true },
  { date: "Sábado, 4 de julio 2026", time: "15:00", team1: "Ganador Partido 73", team2: "Ganador Partido 75", group: "Partido 90", stadium: "Estadio Houston", isKnockout: true },

  { date: "Domingo, 5 de julio 2026", time: "15:00", team1: "Ganador Partido 76", team2: "Ganador Partido 78", group: "Partido 91", stadium: "Estadio Nueva York Nueva Jersey", isKnockout: true },
  { date: "Domingo, 5 de julio 2026", time: "15:00", team1: "Ganador Partido 79", team2: "Ganador Partido 80", group: "Partido 92", stadium: "Estadio Ciudad de México", isKnockout: true },

  { date: "Lunes, 6 de julio 2026", time: "15:00", team1: "Ganador Partido 83", team2: "Ganador Partido 84", group: "Partido 93", stadium: "Estadio Dallas", isKnockout: true },
  { date: "Lunes, 6 de julio 2026", time: "15:00", team1: "Ganador Partido 81", team2: "Ganador Partido 82", group: "Partido 94", stadium: "Estadio Seattle", isKnockout: true },

  { date: "Martes, 7 de julio 2026", time: "15:00", team1: "Ganador Partido 86", team2: "Ganador Partido 88", group: "Partido 95", stadium: "Estadio Atlanta", isKnockout: true },
  { date: "Martes, 7 de julio 2026", time: "15:00", team1: "Ganador Partido 85", team2: "Ganador Partido 87", group: "Partido 96", stadium: "Estadio BC Place Vancouver", isKnockout: true },

  { date: "Jueves, 9 de julio 2026", time: "15:00", team1: "Ganador Partido 89", team2: "Ganador Partido 90", group: "Cuartos", stadium: "Estadio Boston", isKnockout: true },

  { date: "Viernes, 10 de julio 2026", time: "15:00", team1: "Ganador Partido 93", team2: "Ganador Partido 94", group: "Cuartos", stadium: "Estadio Los Ángeles", isKnockout: true },

  { date: "Sábado, 11 de julio 2026", time: "15:00", team1: "Ganador Partido 91", team2: "Ganador Partido 92", group: "Cuartos", stadium: "Estadio Miami", isKnockout: true },
  { date: "Sábado, 11 de julio 2026", time: "15:00", team1: "Ganador Partido 95", team2: "Ganador Partido 96", group: "Cuartos", stadium: "Estadio Kansas City", isKnockout: true },

  { date: "Martes, 14 de julio 2026", time: "15:00", team1: "Ganador Partido 97", team2: "Ganador Partido 98", group: "Semifinal", stadium: "Estadio Dallas", isKnockout: true },

  { date: "Miércoles, 15 de julio 2026", time: "15:00", team1: "Ganador Partido 99", team2: "Ganador Partido 100", group: "Semifinal", stadium: "Estadio Atlanta", isKnockout: true },

  { date: "Sábado, 18 de julio 2026", time: "15:00", team1: "Perdedor Partido 101", team2: "Perdedor Partido 102", group: "3er Puesto", stadium: "Estadio Miami", isKnockout: true },

  { date: "Domingo, 19 de julio 2026", time: "15:00", team1: "Ganador Partido 101", team2: "Ganador Partido 102", group: "Final", stadium: "Estadio Nueva York Nueva Jersey", isKnockout: true }
];

// ─────────── Escudos por selección (TheSportsDB) ───────────
window.WC_BADGES = {
  'México': 'https://r2.thesportsdb.com/images/media/team/badge/3rmosi1748525208.png',
  'Sudáfrica': 'https://r2.thesportsdb.com/images/media/team/badge/xjz9j91553368824.png',
  'República de Corea': 'https://r2.thesportsdb.com/images/media/team/badge/a8nqfs1589564916.png',
  'Canadá': 'https://r2.thesportsdb.com/images/media/team/badge/2t631f1595154867.png',
  'Catar': 'https://r2.thesportsdb.com/images/media/team/badge/rs3ir31642708685.png',
  'Suiza': 'https://r2.thesportsdb.com/images/media/team/badge/mb7yqe1717365808.png',
  'Brasil': 'https://r2.thesportsdb.com/images/media/team/badge/jl6dip1726167280.png',
  'Marruecos': 'https://r2.thesportsdb.com/images/media/team/badge/hbmwkj1731791275.png',
  'Haití': 'https://r2.thesportsdb.com/images/media/team/badge/gml8wx1598135302.png',
  'Escocia': 'https://r2.thesportsdb.com/images/media/team/badge/3691i11552945146.png',
  'Estados Unidos': 'https://r2.thesportsdb.com/images/media/team/badge/21f0oi1597948195.png',
  'Paraguay': 'https://r2.thesportsdb.com/images/media/team/badge/khgav41553419195.png',
  'Australia': 'https://r2.thesportsdb.com/images/media/team/badge/lark6k1661780848.png',
  'Alemania': 'https://r2.thesportsdb.com/images/media/team/badge/1xysi51726167152.png',
  'Curazao': 'https://r2.thesportsdb.com/images/media/team/badge/itygvb1600955363.png',
  'Costa de Marfil': 'https://r2.thesportsdb.com/images/media/team/badge/rwxuuu1455465643.png',
  'Ecuador': 'https://r2.thesportsdb.com/images/media/team/badge/47wv2y1591989301.png',
  'Países Bajos': 'https://r2.thesportsdb.com/images/media/team/badge/1p0hr41593787110.png',
  'Japón': 'https://r2.thesportsdb.com/images/media/team/badge/ffsyxz1591989843.png',
  'Túnez': 'https://r2.thesportsdb.com/images/media/team/badge/7r89rg1526727277.png',
  'Bélgica': 'https://r2.thesportsdb.com/images/media/team/badge/8xlvxv1592062265.png',
  'Egipto': 'https://r2.thesportsdb.com/images/media/team/badge/uheyzo1742102234.png',
  'Irán': 'https://r2.thesportsdb.com/images/media/team/badge/uttpvw1455465617.png',
  'Nueva Zelanda': 'https://r2.thesportsdb.com/images/media/team/badge/91xpk81742982935.png',
  'España': 'https://r2.thesportsdb.com/images/media/team/badge/ncgqyr1726166942.png',
  'Cabo Verde': 'https://r2.thesportsdb.com/images/media/team/badge/5jn0o71593280376.png',
  'Arabia Saudí': 'https://r2.thesportsdb.com/images/media/team/badge/24xwpq1594125742.png',
  'Uruguay': 'https://r2.thesportsdb.com/images/media/team/badge/6vjbr11726167756.png',
  'Francia': 'https://r2.thesportsdb.com/images/media/team/badge/p3n0z51726166851.png',
  'Senegal': 'https://r2.thesportsdb.com/images/media/team/badge/wh8dya1526727459.png',
  'Noruega': 'https://r2.thesportsdb.com/images/media/team/badge/gyfn811591973155.png',
  'Argentina': 'https://r2.thesportsdb.com/images/media/team/badge/3zplhu1726167477.png',
  'Argelia': 'https://r2.thesportsdb.com/images/media/team/badge/rrwpry1455460218.png',
  'Austria': 'https://r2.thesportsdb.com/images/media/team/badge/874p631628721400.png',
  'Jordania': 'https://r2.thesportsdb.com/images/media/team/badge/59fo2s1742100034.png',
  'Portugal': 'https://r2.thesportsdb.com/images/media/team/badge/swqvpy1455466083.png',
  'Colombia': 'https://r2.thesportsdb.com/images/media/team/badge/4ymyku1691180081.png',
  'Uzbekistán': 'https://r2.thesportsdb.com/images/media/team/badge/u5bgze1597943605.png',
  'Inglaterra': 'https://r2.thesportsdb.com/images/media/team/badge/vf5ttc1726166739.png',
  'Croacia': 'https://r2.thesportsdb.com/images/media/team/badge/vvtsyu1455465317.png',
  'Ghana': 'https://r2.thesportsdb.com/images/media/team/badge/j589xw1751526124.png',
  'Panamá': 'https://r2.thesportsdb.com/images/media/team/badge/asp2ck1715849700.png',
  'Turquía': 'https://r2.thesportsdb.com/images/media/team/badge/70c4oo1591982459.png',
  'Suecia': 'https://r2.thesportsdb.com/images/media/team/badge/h5adzg1591981772.png',
  'Irak': 'https://r2.thesportsdb.com/images/media/team/badge/aqidfn1742100110.png',
  'Rep. Checa': 'https://r2.thesportsdb.com/images/media/team/badge/1o0cx31654205806.png',
  'Bosnia': 'https://r2.thesportsdb.com/images/media/team/badge/wtqqst1455463120.png',
  'RD Congo': 'https://r2.thesportsdb.com/images/media/team/badge/s85jjw1728749022.png',
  'RD de Congo': 'https://r2.thesportsdb.com/images/media/team/badge/s85jjw1728749022.png'
};

// Fallback (trofeo del Mundial) para placeholders KO sin equipo definido
window.WC_FALLBACK_BADGE = 'https://r2.thesportsdb.com/images/media/league/badge/e7er5g1696521789.png';

// Normaliza para hacer matching tolerante a acentos/mayúsculas
(function () {
  function _norm(s) {
    return (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s.]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  const cache = new Map();
  for (const [k, v] of Object.entries(window.WC_BADGES)) cache.set(_norm(k), v);

  window.resolveTeamBadge = function (name) {
    if (!name) return null;
    const n = _norm(name);
    if (cache.has(n)) return cache.get(n);
    for (const [k, v] of cache) {
      if (k.length >= 4 && (n.includes(k) || k.includes(n))) return v;
    }
    return null;
  };
})();
