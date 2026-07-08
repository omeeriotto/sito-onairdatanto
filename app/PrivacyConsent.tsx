"use client";

import { useEffect, useState } from "react";

type ConsentChoice = "accepted" | "rejected";

const STORAGE_KEY = "onairdatanto_privacy_consent_v1";

export default function PrivacyConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null | "loading">("loading");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedChoice = window.localStorage.getItem(STORAGE_KEY);
      if (savedChoice === "accepted" || savedChoice === "rejected") {
        setChoice(savedChoice);
        return;
      }

      setChoice(null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveChoice(nextChoice: ConsentChoice) {
    window.localStorage.setItem(STORAGE_KEY, nextChoice);
    setChoice(nextChoice);
  }

  if (choice !== null) {
    return null;
  }

  return (
    <div className="privacy-consent" role="dialog" aria-modal="false" aria-labelledby="privacy-consent-title">
      <div className="privacy-consent__copy">
        <p className="privacy-consent__eyebrow">Privacy</p>
        <h2 id="privacy-consent-title">Preferenze privacy</h2>
        <p>
          Usiamo solo funzioni tecniche essenziali. Eventuali analytics o
          strumenti di profilazione saranno attivati solo con il tuo consenso.
        </p>
        <a href="/privacy-policy">Leggi la Privacy Policy</a>
      </div>
      <div className="privacy-consent__actions" aria-label="Scelte privacy">
        <button type="button" className="privacy-consent__secondary" onClick={() => saveChoice("rejected")}>
          Rifiuta
        </button>
        <button type="button" className="privacy-consent__primary" onClick={() => saveChoice("accepted")}>
          Accetta
        </button>
      </div>
    </div>
  );
}
