import type { Metadata } from "next";
import Link from "next/link";
import "./privacy-policy.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali raccolti tramite il sito.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-wrap">
        <Link className="privacy-back" href="/">
          Torna alla home
        </Link>

        <header className="privacy-hero">
          <p>Informativa privacy</p>
          <h1>Privacy Policy</h1>
          <span>Ultimo aggiornamento: 8 luglio 2026</span>
        </header>

        <section>
          <h2>Titolare del trattamento</h2>
          <p>
            Il titolare del trattamento è Adriano Carlucci. Per qualsiasi
            richiesta relativa alla privacy puoi scrivere a{" "}
            <a href="mailto:info@adrianocarlucci.it">
              info@adrianocarlucci.it
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Dati raccolti</h2>
          <p>
            Tramite il form di contatto possono essere raccolti nome, indirizzo
            email, tipo di progetto, necessità selezionata e contenuto del
            messaggio. Gli stessi dati possono essere trattati anche quando
            invii una richiesta via email.
          </p>
        </section>

        <section>
          <h2>Finalità e base giuridica</h2>
          <p>
            I dati vengono usati esclusivamente per rispondere alla tua
            richiesta, organizzare un eventuale contatto e gestire successive
            comunicazioni professionali. La base giuridica è la tua richiesta di
            contatto e il consenso espresso nel form.
          </p>
        </section>

        <section>
          <h2>Conservazione</h2>
          <p>
            I dati sono conservati per il tempo necessario a gestire la richiesta
            e le eventuali comunicazioni successive, salvo obblighi di legge.
          </p>
        </section>

        <section>
          <h2>Cookie e profilazione</h2>
          <p>
            Il sito usa solo funzioni tecniche essenziali. Al momento non sono
            caricati strumenti di profilazione, pixel pubblicitari o analytics
            non essenziali.
          </p>
          <p>
            Se in futuro verranno attivati strumenti non essenziali, saranno
            caricati solo dopo il consenso dell&apos;utente. La preferenza espressa
            nel banner viene salvata nel browser per non mostrare l&apos;avviso a
            ogni visita.
          </p>
        </section>

        <section>
          <h2>Destinatari e link esterni</h2>
          <p>
            I dati non vengono venduti o ceduti a terzi per finalità di
            marketing. Il sito può contenere link verso servizi esterni come
            Instagram, LinkedIn, HAT o client email: visitando quei servizi si
            applicano le rispettive informative privacy.
          </p>
        </section>

        <section>
          <h2>Diritti dell&apos;utente</h2>
          <p>
            Puoi chiedere accesso, rettifica, cancellazione, limitazione e
            opposizione al trattamento dei dati scrivendo a{" "}
            <a href="mailto:info@adrianocarlucci.it">
              info@adrianocarlucci.it
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
