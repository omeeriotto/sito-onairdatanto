import type { Metadata } from "next";
import Link from "next/link";
import { listPublicLinks } from "@/lib/links";
import { detectPlatform } from "@/lib/platforms";
import PlatformIcon from "@/components/PlatformIcon";
import LeadMagnetBox from "./LeadMagnetBox";
import RevealOnScroll from "./RevealOnScroll";
import "./link.css";

export const dynamic = "force-dynamic";

const HAT_URL = "https://hatmusic.it/profile/@omega.r-2au9uuk6";

export const metadata: Metadata = {
  title: "Link",
  description:
    "Tutti i link ufficiali di Adriano Carlucci: consulenze, social e contatti.",
};

function ArrowIcon() {
  return (
    <div className="arrow-icon">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </div>
  );
}

export default async function LinksPage() {
  const links = await listPublicLinks().catch(() => []);

  return (
    <main className="links-page">
      <header className="links-header">
        <div className="lh-brand">
          <h1 className="wordmark">
            ADRIANO <span>CARLUCCI</span>
          </h1>
          <p className="tagline">Social & Digital Marketing per la musica</p>
        </div>
        <nav className="social-row" aria-label="Social Adriano Carlucci">
          <a
            href="https://www.instagram.com/onairda.tanto/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 128 128">
              <path d="M83,23a22,22,0,0,1,22,22V83a22,22,0,0,1-22,22H45A22,22,0,0,1,23,83V45A22,22,0,0,1,45,23H83m0-8H45A30.09,30.09,0,0,0,15,45V83a30.09,30.09,0,0,0,30,30H83a30.09,30.09,0,0,0,30-30V45A30.09,30.09,0,0,0,83,15Z" />
              <path d="M90.14,32a5.73,5.73,0,1,0,5.73,5.73A5.73,5.73,0,0,0,90.14,32Z" />
              <path d="M64.27,46.47A17.68,17.68,0,1,1,46.6,64.14,17.7,17.7,0,0,1,64.27,46.47m0-8A25.68,25.68,0,1,0,90,64.14,25.68,25.68,0,0,0,64.27,38.47Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/adriano-carlucci-aa800a140/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.3 8.1h4.4V23H.3V8.1zM8.1 8.1h4.2v2.04h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.22 2.9 5.22 6.67V23h-4.4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.96V23H7.5V8.1h.6z" />
            </svg>
          </a>
          <a
            href="mailto:info@adrianocarlucci.it"
            aria-label="Email"
          >
            <svg viewBox="0 0 32 32">
              <path d="M4 7h24v18H4V7zm2 3.2v12.6h20V10.2l-9.35 7.02a1.08 1.08 0 0 1-1.3 0L6 10.2zm1.78-1.2L16 15.16 24.22 9H7.78z" />
            </svg>
          </a>
          <a
            href={HAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="HAT"
            className="hat-social-link"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/hatmusic.png" alt="" width={30} height={30} />
          </a>
        </nav>
      </header>

      <LeadMagnetBox />

      {links.length === 0 ? (
        <p className="links-empty">Nessun link disponibile al momento.</p>
      ) : (
        <div id="links-container">
          {links.map((item) => {
            const platform = detectPlatform(item.link);
            return (
            <div className="fade-up" key={item.id}>
              <a
                className="card-link"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="image-container">
                  <div className="image-wrapper">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title} />
                    ) : (
                      <div
                        className="image-fallback"
                        data-platform={platform.key}
                        style={{ ["--pc" as string]: platform.color }}
                      >
                        <PlatformIcon k={platform.key} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="content-container">
                  <h2>{item.title}</h2>
                  <div
                    className="description-container"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <div className="neo-button">
                    <span className="cta-text">{item.cta}</span>
                    <ArrowIcon />
                  </div>
                </div>
              </a>
            </div>
            );
          })}
        </div>
      )}

      <footer className="links-footer">
        <Link href="/">← Torna alla home</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </footer>

      <RevealOnScroll />
    </main>
  );
}
