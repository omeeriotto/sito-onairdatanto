@AGENTS.md

# Progetto: Sito OnAirDaTanto

Landing personale di Adriano Carlucci, con gestione link pubblici e pannello
admin. Vedi `README.md`, `design.md` e `site-memory.md` per i dettagli completi.

## Architettura
- Next.js 16 App Router + React 19, deploy su **Vercel**.
- Database: Cloudflare D1 `onairdatanto-db` (id `e69e069f-5f03-432a-bd91-d9849d7636ed`),
  letto via REST API in `lib/d1.ts`.
- Storage: Cloudflare R2 `omegariot-media`, via API S3 (aws4fetch) in `lib/r2.ts`.
- Account Cloudflare: omegariot.official@gmail.com (id `ceac462f6995b7201cdc86c35f4a2bf9`).
- Su Vercel NON ci sono i binding Cloudflare: tutto passa per HTTP/S3 con le env var.

## Env var (Vercel prod + .env.local in locale)
CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, CLOUDFLARE_API_TOKEN,
R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, SESSION_SECRET,
ADMIN_USERNAME, ADMIN_PASSWORD.
Per il lead magnet in `/link`: RESEND_API_KEY, RESEND_FROM_EMAIL,
RESEND_REPLY_TO_EMAIL, opzionale LEAD_MAGNET_PHOTO_URL.
Il mittente previsto e' `Adriano Carlucci <info@adrianocarlucci.it>`;
il dominio deve essere verificato in Resend prima dell'uso in produzione.

## Comandi
- `npm run dev` dev locale (usa `.env.local`, dati da D1/R2 remoti).
- `npm run build` / `npm start` build e start Next.
- `vercel deploy --prod` deploy (token in env, scope omega-riot).
- `npm run db:remote` per applicare lo schema al D1 remoto.
- `npx wrangler d1 execute onairdatanto-db --remote ...` per gestire i dati D1.

## Auth admin
- Sessione JWT HS256 (jose) in cookie httpOnly `ogr_session`. Secret e credenziali
  da `process.env` (`lib/auth.ts`).

## Note / gotcha
- Tutte le pagine che leggono D1 (`/link`, `/admin/*`) e tutte le API sono
  `export const dynamic = "force-dynamic"`.
- `/link` contiene il lead magnet Instagram: componente client
  `app/link/LeadMagnetBox.tsx`, API `app/api/lead-magnet/route.ts`, email in
  `lib/instagramGuideEmail.ts`, titolo in `lib/leadMagnetContent.ts`.
- `reorderLinks` usa multi-statement SQL con id inlinati (validati come interi)
  perché il REST D1 non bind-a bene più statement con parametri.
- Il database nuovo parte vuoto; non importare `db/seed.sql` finche resta un
  template senza dati iniziali.
- Il token Cloudflare in env è ampio: meglio sostituirlo con uno scoped solo D1+R2.
