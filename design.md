# Design del sito

## Obiettivo

Landing page personale per presentare Adriano Carlucci come consulente social e
digital marketing verticale sul mondo musica. La pagina deve spiegare chi è,
cosa fa, con quali risultati lavora e portare l'utente a prenotare una call
gratuita.

## Mood

Social / creator style, con energia musicale. Il sito non deve sembrare
un'agenzia tradizionale: deve sembrare il sito personale di un consulente che
lavora davvero dentro la musica, conosce i social e porta casi concreti.

## Palette

- Fondo chiaro: `#f3f5ec`
- Superficie calda: `#fffdf1`
- Nero/grigio testo: `#11150d`
- Testo secondario: `rgba(17, 21, 13, 0.72)`
- Accento verde acido: `#85f71e`
- Verde soft da highlight: `#dfffa3`

La palette ora parte dal verde chiaro della guida gratuita, completato da
nero/grigio per testo e CTA. Il sito deve risultare più luminoso: il nero resta
un accento forte, non il fondo dominante.

## Tipografia

- Display: `SequelSansBlack`
- Corpo: `SequelSansBook`
- Fallback: `system-ui, sans-serif`

I titoli sono grandi, uppercase e molto leggibili. Il corpo mantiene linee
ampie e concrete, con tono diretto in prima persona.

## Struttura homepage

- Navbar: Adriano Carlucci, anchor Chi sono / Servizi / Risultati / Metodo /
  Contatti, CTA Prenota una call.
- Hero: eyebrow, headline forte, testo di posizionamento, CTA primaria e
  secondaria, link HAT/Instagram/LinkedIn, foto profilo rotonda stile Instagram
  Stories, highlight numerici.
- Marquee: keyword social/music marketing.
- Chi sono: posizionamento, domanda guida e ruoli/collaborazioni.
- Servizi: tre card principali per consulenza, lanci musicali e formazione.
- Risultati: ticker/banner scorrevole con nomi dei progetti e slider case
  study automatico che mostra un progetto alla volta; spazio foto a sinistra e
  informazioni a destra.
- Metodo: quattro step, analisi / direzione / contenuti / ottimizzazione.
- Anti-promessa: qualifica contro formule magiche e scorciatoie.
- Contatti: CTA, recap social e form con mailto assistito.
- Pagina `/link`: box lead magnet in alto con modale fullscreen, mini landing e
  mockup libretto CSS; link HAT con logo.

## Asset

- Foto profilo home: `/media/adriano-story-profile.jpg`.
- Logo HAT: `/media/hatmusic.png`.
- Immagine guida/email/link card: `/media/guida-instagram-adriano-email.jpg`.

## UX

La landing è one-page, pensata prima per mobile. Le sezioni devono essere
scansionabili, con CTA ripetute ma non invadenti. I risultati sono presentati
come autorevolezza e non come promesse garantite.

## Componenti dinamici

Il database D1 `onairdatanto-db` resta disponibile per la pagina `/link`, per il
pannello admin e per la lista email `email_subscribers`. La landing principale è
statica, mentre il form contatti usa un componente client che prepara una
richiesta via email.
