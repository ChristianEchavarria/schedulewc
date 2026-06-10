# Recordatorios por correo · Mundial 2026

Envío automático de correos (EmailJS) con los turnos y partidos:
- **Diario** — todos los días a las **06:00 Colombia**: turno + partidos de HOY de cada persona.
- **Semanal** — cada **lunes 06:00 Colombia**: turnos de la semana + partidos de la semana.

El cron corre en **GitHub Actions** (no necesita que la web esté abierta). La fuente de
partidos es `../data.js`, así no se duplican datos.

## Puesta en marcha

1. **Sube este proyecto a un repositorio de GitHub** (privado recomendado, porque los
   correos van como secreto pero igual conviene privacidad).

2. En GitHub → **Settings → Secrets and variables → Actions → New repository secret**, crea:

   | Secret | Valor |
   |---|---|
   | `EMAILJS_PRIVATE_KEY` | Clave **privada** de EmailJS (Account → General/API Keys → Private Key) |
   | `RECIPIENTS_JSON` | JSON con los correos, p. ej. `{"DANY":"...","PANCHA":"...","LAURA":"...","CHRISTIAN":"...","CRISTHIAN":"..."}` (ver `recipients.sample.json`) |

3. En EmailJS → **Account → Security**: activa **"Allow EmailJS API for non-browser
   applications"** (necesario para enviar desde el servidor con la clave privada).

4. Los workflows quedan activos automáticamente:
   - `.github/workflows/daily-email.yml`
   - `.github/workflows/weekly-email.yml`

## Probar manualmente

En GitHub → pestaña **Actions** → elige el workflow → **Run workflow**:
- `dry_run = 1` → no envía, solo muestra en el log a quién enviaría.
- `send_date = 2026-06-15` → simula esa fecha (útil para ver un festivo o una semana concreta).

### Probar en local
```bash
# Windows PowerShell
$env:DRY_RUN="1"
$env:RECIPIENTS_JSON='{"DANY":"d@x.com","CHRISTIAN":"c@x.com"}'
$env:SEND_DATE="2026-06-15"
node mailer/send-emails.js daily
node mailer/send-emails.js weekly
```
Para enviar de verdad en local: define `EMAILJS_PRIVATE_KEY` y quita `DRY_RUN`.

## Notas
- Los **analistas** (Christian/Cristhian) tienen horario determinista (10-7 / 8-5, festivos
  incluidos). Los **gestores** (Dany/Laura/Pancha) usan la rotación automática diaria.
- ⚠️ Los cambios **manuales** de turno que un admin haga en la web se guardan en el navegador
  (localStorage) y **no** los ve este cron: los correos de gestores reflejan la rotación
  automática. Si se necesita reflejar overrides, habría que persistirlos (p. ej. Firestore).
- Las horas del cron de GitHub Actions pueden retrasarse algunos minutos en momentos de alta carga.
