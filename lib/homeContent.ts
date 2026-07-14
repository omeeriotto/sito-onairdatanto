import { d1First, d1Run } from "./d1";

export interface TextItem {
  title: string;
  text?: string;
  role?: string;
  note?: string;
  imageSrc?: string;
  imageAlt?: string;
  points?: string[];
  numbers?: string[];
}

export interface ExtraSection {
  eyebrow: string;
  title: string;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
  visible: boolean;
}

export interface HomeContent {
  email: string;
  instagram: string;
  linkedin: string;
  hat: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  keywords: string[];
  heroStats: string[];
  heroTags: string[];
  aboutKicker: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  roles: string[];
  servicesKicker: string;
  servicesTitle: string;
  servicesIntro: string;
  services: TextItem[];
  serviceNote: string;
  resultsKicker: string;
  resultsTitle: string;
  resultsIntro: string;
  cases: TextItem[];
  methodKicker: string;
  methodTitle: string;
  methodIntro: string;
  method: TextItem[];
  methodQuote: string;
  antiKicker: string;
  antiTitle: string;
  antiText: string;
  contactKicker: string;
  contactTitle: string;
  contactText: string;
  extraSections: ExtraSection[];
}

export const defaultHomeContent: HomeContent = {
  email: "info@adrianocarlucci.it",
  instagram: "https://www.instagram.com/onairda.tanto/",
  linkedin: "https://www.linkedin.com/in/adriano-carlucci-aa800a140/",
  hat: "https://hatmusic.it/profile/@omega.r-2au9uuk6",
  heroEyebrow: "Social & Digital Marketing per la musica",
  heroTitle:
    "Trasformo i contenuti social in opportunità reali per artisti e band.",
  heroLead:
    "Aiuto artisti, label e agenzie musicali a capire cosa comunicare, come farlo e come costruire una presenza social che abbia senso: per la community, per le uscite e per il percorso artistico.",
  heroPrimaryCta: "Prenota una call gratuita",
  heroSecondaryCta: "Guarda i risultati",
  keywords: [
    "Strategia Social",
    "Marketing Musicale",
    "TikTok",
    "Instagram",
    "Lanci Discografici",
    "Formazione",
    "Community",
    "ADS",
    "Contenuti",
    "Artist Development",
    "Label",
    "Band",
  ],
  heroStats: [
    "200K+ follower raggiunti su TikTok con un progetto seguito",
    "10M+ views su un singolo contenuto",
    "40+ date live supportate da un progetto fondato",
    "Docente per Arezzo Wave Contest",
  ],
  heroTags: [
    "Strategia social",
    "Marketing musicale",
    "Formazione",
    "Artist development",
  ],
  aboutKicker: "Chi sono",
  aboutTitle: "Non faccio contenuti a caso. Costruisco direzioni.",
  aboutParagraphs: [
    "Sono Adriano Carlucci, consulente social e digital marketing per artistə, band e progetti musicali. Lavoro con artisti indipendenti, label, agenzie e realtà musicali aiutandoli a trasformare idee, uscite e identità artistiche in una comunicazione più chiara, concreta e sostenibile.",
    "Il mio lavoro parte sempre da una domanda: cosa vuole davvero comunicare questo progetto?",
    "Da lì costruisco strategie, contenuti, percorsi di consulenza e attività pratiche per rendere i social uno strumento utile, non solo un posto dove pubblicare.",
  ],
  roles: [
    "Co-founder di Grime Spitterz",
    "Co-founder di Much Much Bass",
    "Consulente social per progetti Red&Blue Music Relations",
    "Docente per Arezzo Wave Contest",
  ],
  servicesKicker: "Servizi",
  servicesTitle: "Come posso aiutarti",
  servicesIntro:
    "Non parto da pacchetti preconfezionati. Parto dal progetto, dagli obiettivi e da quello che ha davvero senso comunicare.",
  services: [
    {
      title: "Consulenze social per artisti e label",
      text: "Call singole, pacchetti a ore e percorsi continuativi per capire cosa pubblicare, come raccontarsi e come usare Instagram, TikTok e gli altri canali in modo più strategico.",
      points: [
        "Audit profili social",
        "Posizionamento e tono di voce",
        "Idee contenuto",
        "Ottimizzazione pubblicazioni",
        "Lettura dati e insight",
      ],
    },
    {
      title: "Strategie marketing per uscite musicali",
      text: "Supporto per lanci di singoli, EP, album e progetti speciali, con una direzione chiara per contenuti, timing, piattaforme e comunicazione.",
      points: [
        "Strategia pre-release",
        "Contenuti per lancio",
        "Coordinamento Instagram, TikTok, YouTube Shorts",
        "Campagne ADS",
        "Attività organiche e community",
      ],
    },
    {
      title: "Formazione per artisti, band e realtà musicali",
      text: "Lezioni e workshop pratici per artisti, scuole, contest, festival e team che vogliono capire come usare davvero i social nel percorso musicale.",
      points: [
        "Social media strategy",
        "Marketing digitale per artisti",
        "Laboratori pratici",
        "Analisi casi reali",
        "Metodo applicabile subito",
      ],
    },
  ],
  serviceNote:
    "Lavoro con call singole, pacchetti da 10/20/30 ore e consulenze continuative da 3, 6 o 12 mesi. Prezzi e percorsi vengono definiti in base al progetto.",
  resultsKicker: "Risultati e case study",
  resultsTitle: "Numeri concreti, letti dentro percorsi reali.",
  resultsIntro:
    "Sono highlight di autorevolezza, non promesse automatiche: ogni progetto richiede contesto, identità e lavoro.",
  cases: [
    {
      title: "The Kollege",
      role: "Consulenza social media strategy - Marzo/Settembre 2025",
      text: "Un percorso di consulenza costruito attorno ad autenticità, TikTok-first approach, contenuti spontanei e integrazione cross-platform.",
      note: "Numeri relativi al periodo di consulenza.",
      imageSrc: "/progetti/the-kollege.jpg",
      imageAlt: "The Kollege",
      numbers: [
        "Instagram: +1.180% follower",
        "TikTok: +472% follower",
        "Spotify: +195% follower",
        "Video TikTok oltre 10M views",
      ],
    },
    {
      title: "Grime Spitterz",
      role: "Co-founder",
      text: "Un progetto nato dal basso e cresciuto attraverso community, contenuti social, live e identità musicale forte.",
      imageSrc: "/progetti/grime-spitterz.jpg",
      imageAlt: "Grime Spitterz",
      numbers: [
        "Video social virali con oltre 500K views",
        "Strategia social che ha portato 40+ live in 18 mesi",
        "Apertura a Black Sun Empire",
      ],
    },
    {
      title: "Much Much Bass",
      role: "Co-founder e social media",
      text: "Label e progetto musicale dove seguo principalmente la parte social e comunicativa, lavorando sulla crescita del brand e sulla valorizzazione delle release.",
      imageSrc: "/progetti/much-much-bass.jpg",
      imageAlt: "Much Much Bass",
      numbers: [
        "1 release oltre 100K streaming complessivi",
        "1 release oltre 200K streaming complessivi",
        "Strategia social per uscite e identità label",
      ],
    },
    {
      title: "Sissy Castrogiovanni",
      role: "Supporto consulenziale su progetto artistico",
      text: "Supporto alla comunicazione social di un progetto con forte identità artistica e potenziale internazionale.",
      imageSrc: "/progetti/sissy-castrogiovanni.jpg",
      imageAlt: "Sissy Castrogiovanni",
      numbers: [
        "Video virali sui social",
        "Supporto per crescita in Asia",
        "Strategia contenuti per identità artistica",
      ],
    },
    {
      title: "Arezzo Wave Contest",
      role: "Docente",
      text: "Lezione di 4 ore su Social Media Strategy e Marketing Digitale per artisti e band, con approccio pratico e casi reali.",
      imageSrc: "/progetti/arezzo-wave.jpg",
      imageAlt: "Arezzo Wave Contest",
      numbers: [
        "4 ore di formazione",
        "Focus su social strategy, contenuti e marketing musicale",
        "Percorso pensato per artisti e band",
      ],
    },
  ],
  methodKicker: "Metodo",
  methodTitle: "Il metodo: meno formule, più direzione",
  methodIntro:
    "Ogni progetto ha una voce diversa. Il mio lavoro è aiutarti a renderla riconoscibile anche sui social.",
  method: [
    {
      title: "Analisi",
      text: "Capisco chi sei, cosa stai comunicando ora, quali canali usi e dove si perde il messaggio.",
    },
    {
      title: "Direzione",
      text: "Definiamo posizionamento, contenuti, tono di voce, obiettivi e priorità.",
    },
    {
      title: "Contenuti",
      text: "Costruiamo idee e format sostenibili, coerenti con il progetto e adatti alle piattaforme.",
    },
    {
      title: "Ottimizzazione",
      text: "Leggiamo i dati, capiamo cosa funziona e miglioriamo la strategia nel tempo.",
    },
  ],
  methodQuote:
    "La viralità può arrivare. Ma il punto non è inseguirla: è farsi trovare pronti quando succede.",
  antiKicker: "Scelte chiare",
  antiTitle: "Non prometto risultati immediati.",
  antiText:
    "Non lavoro con chi cerca formule magiche, pacchetti copia-incolla o scorciatoie. Lavoro con progetti che vogliono costruire qualcosa: identità, costanza, contenuti migliori e una comunicazione più consapevole.",
  contactKicker: "Contatti",
  contactTitle: "Raccontami il tuo progetto",
  contactText:
    "Che tu sia un artista, una band, una label o una realtà musicale che vuole organizzare una lezione o un workshop, possiamo partire da una call gratuita.",
  extraSections: [],
};

function mergeHomeContent(value: Partial<HomeContent> | null): HomeContent {
  return {
    ...defaultHomeContent,
    ...(value ?? {}),
    extraSections: value?.extraSections ?? defaultHomeContent.extraSections,
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const row = await d1First<{ value: string }>(
      `SELECT value FROM site_content WHERE key = ?`,
      ["home"]
    );
    if (!row?.value) return defaultHomeContent;
    return mergeHomeContent(JSON.parse(row.value) as Partial<HomeContent>);
  } catch {
    return defaultHomeContent;
  }
}

export async function saveHomeContent(content: HomeContent): Promise<void> {
  await d1Run(`
    CREATE TABLE IF NOT EXISTS site_content (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await d1Run(
    `INSERT INTO site_content (key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET
       value = excluded.value,
       updated_at = datetime('now')`,
    ["home", JSON.stringify(mergeHomeContent(content))]
  );
}
