"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { LeadMagnetLinkContent } from "@/lib/leadMagnetLink";
import {
  INSTAGRAM_GUIDE_IMAGE_PATH,
  INSTAGRAM_GUIDE_TITLE,
} from "@/lib/leadMagnetContent";

type SubmitState = "idle" | "loading" | "success" | "error";

const fallbackContent: LeadMagnetLinkContent = {
  title: INSTAGRAM_GUIDE_TITLE,
  description:
    "Una guida gratuita per migliorare bio, Reel, storie, link in bio, contenuti pinnati e ordine del profilo.",
  modalText:
    "Una guida rapida per guardare il tuo profilo Instagram con più lucidità: bio, Reel, storie, link in bio, contenuti pinnati e ordine generale del profilo.",
  image: INSTAGRAM_GUIDE_IMAGE_PATH,
  cta: "Ottieni la guida gratis",
  eyebrow: "Guida gratuita",
  visible: true,
  sortOrder: 0,
};

export default function LeadMagnetBox({
  content = fallbackContent,
}: {
  content?: LeadMagnetLinkContent;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const res = await fetch("/api/lead-magnet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = (await res.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!res.ok) {
      setState("error");
      setMessage(
        data?.message ||
          "Qualcosa non ha funzionato. Scrivimi direttamente via email."
      );
      return;
    }

    setState("success");
    setMessage("Perfetto: controlla la tua casella email, la guida è partita.");
    setEmail("");
  }

  return (
    <>
      <section className="lead-card" aria-label="Guida gratuita Instagram">
        <div className="lead-card-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.image}
            alt="Adriano Carlucci con la guida gratuita Instagram"
          />
        </div>
        <div className="lead-card-copy">
          <p className="lead-eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>
        <button
          className="lead-card-button"
          type="button"
          onClick={() => {
            void fetch("/api/lead-magnet/click", { method: "POST" });
            setOpen(true);
          }}
        >
          <span>{content.cta}</span>
        </button>
      </section>

      {open
        ? createPortal(
            <div className="lead-modal" role="dialog" aria-modal="true">
              <div className="lead-modal-inner">
                <button
                  className="lead-modal-close"
                  type="button"
                  aria-label="Chiudi"
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>
                <div className="lead-book" aria-hidden="true">
                  <div className="book-shadow" />
                  <div className="book-cover">
                    <span>Guida gratuita</span>
                    <strong>7 consigli Instagram</strong>
                    <small>per artisti, band e progetti musicali</small>
                  </div>
                  <div className="book-pages" />
                </div>

                <div className="lead-modal-copy">
                  <p className="lead-eyebrow">Gratis via email</p>
                  <h2>{content.title}</h2>
                  <p>{content.modalText}</p>
                  <form className="lead-form" onSubmit={handleSubmit}>
                    <label>
                      Inserisci la tua email
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="nome@email.it"
                      />
                    </label>
                    <button type="submit" disabled={state === "loading"}>
                      {state === "loading" ? "Invio in corso..." : content.cta}
                    </button>
                  </form>
                  {message ? (
                    <p className={`lead-message ${state === "error" ? "is-error" : ""}`}>
                      {message}
                    </p>
                  ) : null}
                  <small>
                    Userò questa mail solo per inviarti consigli pratici su social e
                    digital marketing musicale. Niente spam.
                  </small>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
