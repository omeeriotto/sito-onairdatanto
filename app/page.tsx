import ContactForm from "./ContactForm";
import ProjectSlider from "./ProjectSlider";
import "./home.css";

const EMAIL = "adriano.carlucci28@gmail.com";
const INSTAGRAM = "https://www.instagram.com/onairda.tanto/";
const LINKEDIN = "https://www.linkedin.com/in/adriano-carlucci-aa800a140/";
const HAT = "https://hatmusic.it/profile/@omega.r-2au9uuk6";
const CALL_HREF =
  "mailto:adriano.carlucci28@gmail.com?subject=Call%20gratuita%20-%20progetto%20musicale";

const keywords = [
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
];

const heroStats = [
  "200K+ follower raggiunti su TikTok con un progetto seguito",
  "10M+ views su un singolo contenuto",
  "40+ date live supportate da un progetto fondato",
  "Docente per Arezzo Wave Contest",
];

const heroTags = [
  "Strategia social",
  "Marketing musicale",
  "Formazione",
  "Artist development",
];

const roles = [
  "Co-founder di Grime Spitterz",
  "Co-founder di Much Much Bass",
  "Consulente social per progetti Red&Blue Music Relations",
  "Docente per Arezzo Wave Contest",
];

const services = [
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
];

const cases = [
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
];

const method = [
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
];

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="home">
      <nav className="home-nav" aria-label="Navigazione principale">
        <a className="logo" href="#top" aria-label="Adriano Carlucci">
          Adriano <b>Carlucci</b>
        </a>
        <div className="nav-links">
          <a href="#chi-sono">Chi sono</a>
          <a href="#servizi">Servizi</a>
          <a href="#risultati">Risultati</a>
          <a href="#metodo" className="hide-md">
            Metodo
          </a>
          <a href="#contatti" className="nav-cta">
            Prenota una call
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dot" />
              Social & Digital Marketing per la musica
            </p>
            <h1>Trasformo i contenuti social in opportunità reali per artisti e band.</h1>
            <p className="lead">
              Aiuto artisti, label e agenzie musicali a capire cosa comunicare,
              come farlo e come costruire una presenza social che abbia senso:
              per la community, per le uscite e per il percorso artistico.
            </p>
            <div className="cta-row">
              <a className="btn-neo solid" href={CALL_HREF}>
                Prenota una call gratuita <Arrow />
              </a>
              <a className="btn-neo outline" href="#risultati">
                Guarda i risultati <Arrow />
              </a>
            </div>
            <div className="hero-socials" aria-label="Profili esterni">
              <a href={HAT} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/hatmusic.png" alt="" width={22} height={22} />
                HAT <ExternalArrow />
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                Instagram <ExternalArrow />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn <ExternalArrow />
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Profilo e risultati rapidi">
            <div className="hero-portrait-cluster">
              <div className="hero-tag-cloud" aria-label="Competenze principali">
                {heroTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="portrait-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/adriano-story-profile.jpg"
                  alt="Adriano Carlucci"
                  width={720}
                  height={720}
                />
              </div>
            </div>
            <div className="stat-grid">
              {heroStats.map((stat) => (
                <p className="stat-card" key={stat}>
                  {stat}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[...keywords, ...keywords].map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </div>
      </div>

      <section className="section split-section" id="chi-sono">
        <div className="wrap split-grid">
          <div>
            <p className="kicker">Chi sono</p>
            <h2>Non faccio contenuti a caso. Costruisco direzioni.</h2>
          </div>
          <div className="body">
            <p>
              Sono <b>Adriano Carlucci</b>, consulente social e digital marketing
              per artistə, band e progetti musicali. Lavoro con artisti
              indipendenti, label, agenzie e realtà musicali aiutandoli a
              trasformare idee, uscite e identità artistiche in una comunicazione
              più chiara, concreta e sostenibile.
            </p>
            <p>
              Il mio lavoro parte sempre da una domanda: <b>cosa vuole davvero
              comunicare questo progetto?</b>
            </p>
            <p>
              Da lì costruisco strategie, contenuti, percorsi di consulenza e
              attività pratiche per rendere i social uno strumento utile, non
              solo un posto dove pubblicare.
            </p>
          </div>
        </div>

        <div className="wrap role-grid">
          {roles.map((role) => (
            <p className="role-card" key={role}>
              {role}
            </p>
          ))}
        </div>
      </section>

      <section className="section" id="servizi">
        <div className="wrap section-head">
          <p className="kicker">Servizi</p>
          <h2>Come posso aiutarti</h2>
          <p>
            Non parto da pacchetti preconfezionati. Parto dal progetto, dagli
            obiettivi e da quello che ha davvero senso comunicare.
          </p>
        </div>

        <div className="wrap service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="wrap service-note">
          <p>
            Lavoro con call singole, pacchetti da 10/20/30 ore e consulenze
            continuative da 3, 6 o 12 mesi. Prezzi e percorsi vengono definiti
            in base al progetto.
          </p>
          <a className="btn-neo solid" href="#contatti">
            Raccontami il tuo progetto <Arrow />
          </a>
        </div>
      </section>

      <section className="section results-section" id="risultati">
        <div className="wrap section-head">
          <p className="kicker">Risultati e case study</p>
          <h2>Numeri concreti, letti dentro percorsi reali.</h2>
          <p>
            Sono highlight di autorevolezza, non promesse automatiche: ogni
            progetto richiede contesto, identità e lavoro.
          </p>
        </div>

        <div className="project-ticker" aria-hidden="true">
          <div className="project-track">
            {[...cases, ...cases].map((item, index) => (
              <span key={`${item.title}-${index}`}>{item.title}</span>
            ))}
          </div>
        </div>

        <ProjectSlider cases={cases} />
      </section>

      <section className="section method-section" id="metodo">
        <div className="wrap section-head">
          <p className="kicker">Metodo</p>
          <h2>Il metodo: meno formule, più direzione</h2>
          <p>
            Ogni progetto ha una voce diversa. Il mio lavoro è aiutarti a
            renderla riconoscibile anche sui social.
          </p>
        </div>

        <div className="wrap method-grid">
          {method.map((step, index) => (
            <article className="method-step" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="wrap method-quote">
          <p>
            La viralità può arrivare. Ma il punto non è inseguirla: è farsi
            trovare pronti quando succede.
          </p>
        </div>
      </section>

      <section className="section anti-section">
        <div className="wrap anti-box">
          <p className="kicker">Scelte chiare</p>
          <h2>Non prometto risultati immediati.</h2>
          <p>
            Non lavoro con chi cerca formule magiche, pacchetti copia-incolla o
            scorciatoie. Lavoro con progetti che vogliono costruire qualcosa:
            identità, costanza, contenuti migliori e una comunicazione più
            consapevole.
          </p>
          <a className="btn-neo solid" href="#contatti">
            Se vuoi lavorare con metodo, partiamo da una call <Arrow />
          </a>
        </div>
      </section>

      <section className="section contact-section" id="contatti">
        <div className="wrap contact-grid">
          <div className="contact-copy">
            <p className="kicker">Contatti</p>
            <h2>Raccontami il tuo progetto</h2>
            <p>
              Che tu sia un artista, una band, una label o una realtà musicale
              che vuole organizzare una lezione o un workshop, possiamo partire
              da una call gratuita.
            </p>
            <a className="btn-neo solid" href={CALL_HREF}>
              Prenota una call gratuita <Arrow />
            </a>
            <div className="contact-links">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                @onairda.tanto <ExternalArrow />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn <ExternalArrow />
              </a>
              <a href={HAT} target="_blank" rel="noopener noreferrer">
                HAT <ExternalArrow />
              </a>
            </div>
          </div>
          <ContactForm email={EMAIL} />
        </div>
      </section>

      <footer className="home-footer">
        <div className="wrap footer-row">
          <p>Adriano Carlucci</p>
          <div>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={HAT} target="_blank" rel="noopener noreferrer">
              HAT
            </a>
            <a href={`mailto:${EMAIL}`}>Email</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
