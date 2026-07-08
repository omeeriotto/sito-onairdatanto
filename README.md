# Sito OnAirDaTanto

Landing personale di Adriano Carlucci, consulente social e digital marketing
per artisti, band, label e realtà musicali. Include una pagina link pubblica e
un pannello admin per gestire link in stile linktree.

## Stack

- Next.js 16 (App Router) + React 19
- Deploy su Vercel
- Database: Cloudflare D1 (`onairdatanto-db`), letto/scritto via REST API
- Storage immagini: Cloudflare R2 (`omegariot-media`), via API S3 (aws4fetch)
- Auth admin: sessione firmata (JWT HS256 via `jose`) in cookie httpOnly

Le pagine girano su Vercel; i dati e le immagini restano su Cloudflare e si
raggiungono via HTTP (D1 REST) e S3 (R2). Niente binding nativi Cloudflare.

## Pagine

- `/` landing personale di Adriano Carlucci
- `/link` pagina pubblica con tutti i link visibili (design dark "neo-brutalist")
  e box lead magnet per la guida Instagram gratuita
- `/admin` pannello (protetto): lista con drag&drop, mostra/nascondi, modifica,
  elimina, crea nuovo link con anteprima live e upload immagine
- `/admin/login` accesso

## Variabili d'ambiente

In locale `.env.local`, in produzione le Environment Variables del progetto Vercel:

```
CLOUDFLARE_ACCOUNT_ID=ceac462f6995b7201cdc86c35f4a2bf9
CLOUDFLARE_D1_DATABASE_ID=e69e069f-5f03-432a-bd91-d9849d7636ed
CLOUDFLARE_API_TOKEN=...        # token con D1:Edit (e R2 se serve)
R2_ACCESS_KEY_ID=...            # credenziali S3 del bucket R2
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=omegariot-media       # cambiare se si crea un bucket dedicato
SESSION_SECRET=...              # random, firma la sessione
ADMIN_USERNAME=...
ADMIN_PASSWORD=...              # cambiala
RESEND_API_KEY=...              # token Resend server-side
RESEND_FROM_EMAIL=...           # es: Adriano Carlucci <info@adrianocarlucci.it>
RESEND_REPLY_TO_EMAIL=info@adrianocarlucci.it
LEAD_MAGNET_PHOTO_URL=...       # opzionale, URL pubblico foto nella mail
```

Nota: `RESEND_FROM_EMAIL` deve usare un dominio verificato su Resend in
produzione. Per questo progetto il mittente previsto e'
`Adriano Carlucci <info@adrianocarlucci.it>`.

## Sviluppo locale

```bash
npm install
npm run dev      # http://localhost:3000 (usa .env.local, legge D1/R2 remoti)
```

## Database

Schema in `db/schema.sql` (già applicato al D1 remoto). Il nuovo database parte
vuoto: `db/seed.sql` è intenzionalmente senza dati iniziali.
La tabella `email_subscribers` viene usata per la lista email del lead magnet
Instagram; la rotta API la crea anche automaticamente se D1 è configurato.

Per ri-applicare lo schema o gestire i dati da CLI serve `wrangler` autenticato
sull'account Cloudflare:

```bash
npm run db:remote
npx wrangler d1 execute onairdatanto-db --remote --command="SELECT * FROM links"
```

## Lead magnet Instagram

Il box in alto su `/link` apre una modale fullscreen con una mini landing e un
libretto creato in CSS. L'iscrizione chiama `/api/lead-magnet`, salva l'email su
D1 quando disponibile e invia subito la guida tramite Resend.

Il testo editoriale della guida è in `content/instagram-profile-guide.md`.
La foto viene inviata come immagine inline allegata alla mail. In alternativa si
può impostare `LEAD_MAGNET_PHOTO_URL` con un URL pubblico dell'immagine.

## Deploy su Vercel

```bash
vercel deploy --prod
```

Per aggiornare una env var di produzione:

```bash
vercel env rm  NOME production
vercel env add NOME production
vercel deploy --prod
```

Per puntare la produzione al nuovo D1 vuoto:

```bash
vercel env rm CLOUDFLARE_D1_DATABASE_ID production
vercel env add CLOUDFLARE_D1_DATABASE_ID production
# valore: e69e069f-5f03-432a-bd91-d9849d7636ed
```
