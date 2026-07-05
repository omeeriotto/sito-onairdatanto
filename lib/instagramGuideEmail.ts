import { INSTAGRAM_GUIDE_TITLE } from "./leadMagnetContent";

export { INSTAGRAM_GUIDE_TITLE };

const intro = [
  "Ciao!",
  "Grazie per esserti iscrittə alla mailing list!",
  "Ho preparato questa piccola e semplice guida gratuita per aiutarti a guardare il tuo profilo Instagram con più lucidità e capire quali aspetti puoi migliorare da subito, senza farti prendere dall'ansia dei numeri o dalla pressione di dover pubblicare a caso.",
  "Se sei un artista, una band o hai un progetto musicale, la tua presenza social non dovrebbe servire solo a fare views e follower, ma a far capire chi sei, cosa comunichi e perché una persona dovrebbe iniziare a seguirti davvero.",
];

const sections = [
  {
    title: "1. Mantieni una bio pulita e comprensibile",
    text: [
      "La bio è una delle prime cose che una persona vede quando arriva sul tuo profilo. Deve far capire subito chi sei e cosa fai.",
      "Evita frasi troppo confuse, citazioni criptiche o troppe informazioni messe insieme. Meglio una bio semplice, chiara e diretta.",
      "Dovrebbero essere chiari: il tuo nome o nome progetto, che tipo di musica fai, cosa stai promuovendo in questo momento e dove le persone possono ascoltarti, vederti live o scoprire di più.",
    ],
  },
  {
    title: "2. Non esagerare con le storie se hai ancora poco seguito",
    text: [
      "Le storie sono utili per costruire rapporto con i tuoi fan, ma non sempre sono il contenuto più importante su cui puntare, soprattutto se hai ancora una community piccola.",
      "Usale per mostrare momenti veri del tuo percorso, ricordare un'uscita, condividere contenuti dei fan, far vedere il dietro le quinte e creare un rapporto diretto con chi già ti segue.",
      "Per raggiungere persone nuove, invece, è spesso più utile concentrarsi su Reel, contenuti video e post pensati per essere scoperti (soprattutto caroselli!).",
    ],
  },
  {
    title: "3. Usa i Reel di prova nel modo giusto",
    text: [
      "I Reel di prova possono essere molto utili, ma non vanno usati come un modo per pubblicare senza strategia.",
      "Usali per testare idee, format, hook, performance, teaser o contenuti diversi prima di capire cosa può funzionare meglio sul tuo profilo.",
      "Non giudicare tutto solo dai numeri: osserva se l'idea è chiara, se ti rappresenta e se il messaggio arriva.",
    ],
  },
  {
    title: "4. Organizza bene i link",
    text: [
      "Il link in bio non deve essere casuale. Se hai più cose da mostrare, puoi usare un link per ognuna, ma senza esagerare!",
      "Quando stai promuovendo qualcosa di specifico, però, può essere utile usare un link diretto: biglietti, merch, pre-save, videoclip o form di iscrizione.",
      "Meno passaggi ci sono, più è facile che qualcuno clicchi davvero.",
    ],
  },
  {
    title: "5. Pinna in alto i Reel migliori",
    text: [
      "La sezione dei Reel in evidenza sul profilo è una piccola vetrina.",
      "Non devi fissare solo i video che hanno fatto più numeri: spesso ha più senso scegliere quelli che ti rappresentano meglio.",
      "Una buona idea è pinnare un paio di performance forti o un contenuto più narrativo o personale.",
    ],
  },
  {
    title: "6. Usa le storie in evidenza per creare ordine",
    text: [
      "Le storie in evidenza non dovrebbero essere un archivio disordinato.",
      "Usale come sezioni chiare del tuo profilo: Live, Fan, Merch, Reaction, Studio, Press, Video, Backstage.",
      "Servono a dare contesto e a far capire che il progetto è vivo.",
    ],
  },
  {
    title: "7. Non pensare solo ai numeri",
    text: [
      "È facile farsi condizionare da views, like, follower e statistiche. Ma i numeri non sono l'unica cosa che conta.",
      "Chiediti se stai comunicando davvero chi sei, se il profilo fa capire che progetto hai e se stai dando alle persone un motivo per seguirti.",
      "I risultati arrivano con il tempo, con il metodo e con la continuità. Non serve pubblicare mille contenuti a caso: serve capire cosa vuoi comunicare e migliorare passo dopo passo.",
    ],
  },
];

const outro = [
  "Spero che questa guida ti sia stata utile e ti abbia dato qualche spunto pratico per guardare il tuo profilo con una prospettiva diversa.",
  "Non prenderla come una lista di regole, ma più come una base da cui partire per rendere la tua presenza social più chiara, ordinata e coerente con il tuo progetto.",
  "Se l'hai trovata utile, mi farebbe davvero piacere se condividessi una schermata di questa mail nelle tue storie taggandomi.",
  "Ps: Piccolo consiglio extra: mantieni un'immagine coerente su tutte le piattaforme social: da Instagram a TikTok, passando per Spotify e Apple Music, essere riconoscibile aiuta a rafforzare la tua presenza!",
  "Ps: Userò questa mail solo per mandarti consigli pratici, spunti e contenuti utili legati alla comunicazione social e digital marketing per artisti, band e progetti musicali. Niente spam, promesso.",
  "A presto,",
  "Adriano",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderInstagramGuideEmail(photoUrl?: string): string {
  const photo = photoUrl
    ? `<img src="${escapeHtml(photoUrl)}" alt="Adriano Carlucci con la guida Instagram" style="width:100%;max-width:520px;border-radius:14px;margin:0 0 24px;display:block;" />`
    : "";

  return `<!doctype html>
<html lang="it">
  <body style="margin:0;background:#0c0c10;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;">La guida gratuita per migliorare subito il tuo profilo Instagram.</div>
    <main style="max-width:640px;margin:0 auto;padding:28px 18px 42px;">
      <section style="background:#111118;border:1px solid rgba(133,247,30,.35);border-radius:18px;padding:28px;">
        ${photo}
        <p style="color:#85f71e;text-transform:uppercase;letter-spacing:.08em;font-size:12px;margin:0 0 12px;">Guida gratuita</p>
        <h1 style="font-size:32px;line-height:1.05;margin:0 0 22px;text-transform:uppercase;">${escapeHtml(INSTAGRAM_GUIDE_TITLE)}</h1>
        ${intro.map((p) => `<p style="line-height:1.62;color:#e8e8e8;margin:0 0 16px;">${escapeHtml(p)}</p>`).join("")}
        <h2 style="font-size:24px;line-height:1.15;margin:30px 0 18px;color:#85f71e;">Migliora la tua presenza social in 7 mosse</h2>
        ${sections
          .map(
            (section) => `
              <article style="border-top:1px solid rgba(255,255,255,.14);padding-top:20px;margin-top:20px;">
                <h3 style="font-size:19px;line-height:1.22;margin:0 0 12px;color:#ffffff;">${escapeHtml(section.title)}</h3>
                ${section.text.map((p) => `<p style="line-height:1.62;color:#dedede;margin:0 0 13px;">${escapeHtml(p)}</p>`).join("")}
              </article>
            `
          )
          .join("")}
        <div style="border-top:1px solid rgba(133,247,30,.35);margin-top:28px;padding-top:22px;">
          ${outro.map((p) => `<p style="line-height:1.62;color:#e8e8e8;margin:0 0 16px;">${escapeHtml(p)}</p>`).join("")}
        </div>
      </section>
    </main>
  </body>
</html>`;
}

export function renderInstagramGuideText(): string {
  return [
    INSTAGRAM_GUIDE_TITLE,
    "",
    ...intro,
    "",
    "Migliora la tua presenza social in 7 mosse",
    "",
    ...sections.flatMap((section) => [section.title, ...section.text, ""]),
    ...outro,
  ].join("\n");
}
