"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "success" | "error" | "captcha";

export default function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const sender = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "").trim();
    const need = String(data.get("need") || "").trim();
    const message = String(data.get("message") || "").trim();
    const privacy = data.get("privacy");
    const captcha = String(data.get("captcha") || "").trim();
    const website = String(data.get("website") || "").trim();

    if (website) {
      setStatus("captcha");
      return;
    }

    if (!name || !sender || !project || !need || !message || !privacy || !captcha) {
      setStatus("error");
      return;
    }

    if (captcha !== "8") {
      setStatus("captcha");
      return;
    }

    const subject = `Richiesta consulenza - ${name}`;
    const body = [
      `Nome: ${name}`,
      `Email: ${sender}`,
      `Tipo di progetto: ${project}`,
      `Bisogno: ${need}`,
      "",
      message,
    ].join("\n");

    try {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="form-honeypot" aria-hidden="true">
        Sito web
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        Nome e cognome
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Tipo di progetto
        <select name="project" defaultValue="" required>
          <option value="" disabled>
            Seleziona
          </option>
          <option>Artista</option>
          <option>Band</option>
          <option>Label</option>
          <option>Agenzia</option>
          <option>Festival</option>
          <option>Scuola</option>
          <option>Contest</option>
          <option>Altro</option>
        </select>
      </label>
      <label>
        Di cosa hai bisogno
        <select name="need" defaultValue="" required>
          <option value="" disabled>
            Seleziona
          </option>
          <option>Consulenza</option>
          <option>Strategia lancio</option>
          <option>Formazione</option>
          <option>ADS</option>
          <option>Altro</option>
        </select>
      </label>
      <label>
        Messaggio
        <textarea name="message" rows={5} required />
      </label>
      <label className="captcha-field">
        Verifica anti-spam
        <span>Quanto fa 5 + 3?</span>
        <input
          name="captcha"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Risposta"
          required
        />
      </label>
      <label className="privacy-check">
        <input name="privacy" type="checkbox" required />
        <span>
          Ho letto la <a href="/privacy-policy">Privacy Policy</a>. Autorizzo
          il ricontatto per questa richiesta.
        </span>
      </label>
      <button className="btn-neo solid form-submit" type="submit">
        Invia richiesta
      </button>
      {status === "success" ? (
        <p className="form-message success">
          Grazie, ho ricevuto la tua richiesta. Ti risponderò il prima possibile.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="form-message error">
          Qualcosa non ha funzionato. Puoi scrivermi direttamente a {email}.
        </p>
      ) : null}
      {status === "captcha" ? (
        <p className="form-message error">
          Verifica anti-spam non superata. Controlla la risposta e riprova.
        </p>
      ) : null}
    </form>
  );
}
