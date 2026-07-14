import ContactForm from "./ContactForm";
import ProjectSlider from "./ProjectSlider";
import { getHomeContent } from "@/lib/homeContent";
import "./home.css";

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

export default async function Home() {
  const content = await getHomeContent();
  const CALL_HREF = `mailto:${content.email}?subject=Call%20gratuita%20-%20progetto%20musicale`;

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
              {content.heroEyebrow}
            </p>
            <h1>{content.heroTitle}</h1>
            <p className="lead">{content.heroLead}</p>
            <div className="cta-row">
              <a className="btn-neo solid" href={CALL_HREF}>
                {content.heroPrimaryCta} <Arrow />
              </a>
              <a className="btn-neo outline" href="#risultati">
                {content.heroSecondaryCta} <Arrow />
              </a>
            </div>
            <div className="hero-socials" aria-label="Profili esterni">
              <a href={content.hat} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/hatmusic.png" alt="" width={22} height={22} />
                HAT <ExternalArrow />
              </a>
              <a href={content.instagram} target="_blank" rel="noopener noreferrer">
                Instagram <ExternalArrow />
              </a>
              <a href={content.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ExternalArrow />
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Profilo e risultati rapidi">
            <div className="hero-portrait-cluster">
              <div className="hero-tag-cloud" aria-label="Competenze principali">
                {content.heroTags.map((tag) => (
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
              {content.heroStats.map((stat) => (
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
          {[...content.keywords, ...content.keywords].map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </div>
      </div>

      <section className="section split-section" id="chi-sono">
        <div className="wrap split-grid">
          <div>
            <p className="kicker">{content.aboutKicker}</p>
            <h2>{content.aboutTitle}</h2>
          </div>
          <div className="body">
            {content.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="wrap role-grid">
          {content.roles.map((role) => (
            <p className="role-card" key={role}>
              {role}
            </p>
          ))}
        </div>
      </section>

      <section className="section" id="servizi">
        <div className="wrap section-head">
          <p className="kicker">{content.servicesKicker}</p>
          <h2>{content.servicesTitle}</h2>
          <p>{content.servicesIntro}</p>
        </div>

        <div className="wrap service-grid">
          {content.services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {(service.points ?? []).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="wrap service-note">
          <p>{content.serviceNote}</p>
          <a className="btn-neo solid" href="#contatti">
            Raccontami il tuo progetto <Arrow />
          </a>
        </div>
      </section>

      <section className="section results-section" id="risultati">
        <div className="wrap section-head">
          <p className="kicker">{content.resultsKicker}</p>
          <h2>{content.resultsTitle}</h2>
          <p>{content.resultsIntro}</p>
        </div>

        <div className="project-ticker" aria-hidden="true">
          <div className="project-track">
            {[...content.cases, ...content.cases].map((item, index) => (
              <span key={`${item.title}-${index}`}>{item.title}</span>
            ))}
          </div>
        </div>

        <ProjectSlider cases={content.cases} />
      </section>

      <section className="section method-section" id="metodo">
        <div className="wrap section-head">
          <p className="kicker">{content.methodKicker}</p>
          <h2>{content.methodTitle}</h2>
          <p>{content.methodIntro}</p>
        </div>

        <div className="wrap method-grid">
          {content.method.map((step, index) => (
            <article className="method-step" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="wrap method-quote">
          <p>{content.methodQuote}</p>
        </div>
      </section>

      {content.extraSections
        .filter((section) => section.visible)
        .map((section) => (
          <section className="section split-section" key={section.title}>
            <div className="wrap split-grid">
              <div>
                <p className="kicker">{section.eyebrow}</p>
                <h2>{section.title}</h2>
              </div>
              <div className="body">
                <p>{section.text}</p>
                {section.ctaLabel && section.ctaHref ? (
                  <a className="btn-neo solid" href={section.ctaHref}>
                    {section.ctaLabel} <Arrow />
                  </a>
                ) : null}
              </div>
            </div>
          </section>
        ))}

      <section className="section anti-section">
        <div className="wrap anti-box">
          <p className="kicker">{content.antiKicker}</p>
          <h2>{content.antiTitle}</h2>
          <p>{content.antiText}</p>
          <a className="btn-neo solid" href="#contatti">
            Se vuoi lavorare con metodo, partiamo da una call <Arrow />
          </a>
        </div>
      </section>

      <section className="section contact-section" id="contatti">
        <div className="wrap contact-grid">
          <div className="contact-copy">
            <p className="kicker">{content.contactKicker}</p>
            <h2>{content.contactTitle}</h2>
            <p>{content.contactText}</p>
            <a className="btn-neo solid" href={CALL_HREF}>
              Prenota una call gratuita <Arrow />
            </a>
            <div className="contact-links">
              <a href={`mailto:${content.email}`}>{content.email}</a>
              <a href={content.instagram} target="_blank" rel="noopener noreferrer">
                @onairda.tanto <ExternalArrow />
              </a>
              <a href={content.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ExternalArrow />
              </a>
              <a href={content.hat} target="_blank" rel="noopener noreferrer">
                HAT <ExternalArrow />
              </a>
            </div>
          </div>
          <ContactForm email={content.email} />
        </div>
      </section>

      <footer className="home-footer">
        <div className="wrap footer-row">
          <p>Adriano Carlucci</p>
          <div>
            <a href={content.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={content.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={content.hat} target="_blank" rel="noopener noreferrer">
              HAT
            </a>
            <a href={`mailto:${content.email}`}>Email</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
