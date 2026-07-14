"use client";

import { useState } from "react";
import type { ExtraSection, HomeContent, TextItem } from "@/lib/homeContent";

function lines(value: string[]): string {
  return value.join("\n");
}

function fromLines(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function emptyItem(): TextItem {
  return { title: "Nuova voce", text: "", points: [] };
}

function emptySection(): ExtraSection {
  return {
    eyebrow: "Nuova sezione",
    title: "Titolo sezione",
    text: "",
    ctaLabel: "",
    ctaHref: "",
    visible: true,
  };
}

export default function HomeEditor({ initialContent }: { initialContent: HomeContent }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  function setField<K extends keyof HomeContent>(key: K, value: HomeContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  function updateItem(
    collection: "services" | "cases" | "method",
    index: number,
    value: TextItem
  ) {
    const next = [...content[collection]];
    next[index] = value;
    setField(collection, next);
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setMessage({ type: "err", text: data.error ?? "Salvataggio non riuscito" });
      return;
    }
    setMessage({ type: "ok", text: "Home aggiornata" });
  }

  return (
    <div className="home-editor">
      <div className="panel-head">
        <div>
          <h2>Home</h2>
          <p>Modifica testi, liste e sezioni extra della pagina iniziale.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={save} disabled={saving}>
          {saving ? "Salvo..." : "Salva home"}
        </button>
      </div>

      {message ? (
        <div className={`notice ${message.type === "ok" ? "notice-ok" : "notice-err"}`}>
          {message.text}
        </div>
      ) : null}

      <div className="dashboard-grid two">
        <div className="editor-card">
          <h3>Hero</h3>
          <div className="field">
            <label>Etichetta</label>
            <input value={content.heroEyebrow} onChange={(e) => setField("heroEyebrow", e.target.value)} />
          </div>
          <div className="field">
            <label>Titolo principale</label>
            <textarea value={content.heroTitle} onChange={(e) => setField("heroTitle", e.target.value)} />
          </div>
          <div className="field">
            <label>Testo introduttivo</label>
            <textarea value={content.heroLead} onChange={(e) => setField("heroLead", e.target.value)} />
          </div>
          <div className="field">
            <label>Statistiche hero, una per riga</label>
            <textarea value={lines(content.heroStats)} onChange={(e) => setField("heroStats", fromLines(e.target.value))} />
          </div>
        </div>

        <div className="editor-card">
          <h3>Chi sono</h3>
          <div className="field">
            <label>Titolo sezione</label>
            <input value={content.aboutTitle} onChange={(e) => setField("aboutTitle", e.target.value)} />
          </div>
          <div className="field">
            <label>Paragrafi, uno per riga</label>
            <textarea value={lines(content.aboutParagraphs)} onChange={(e) => setField("aboutParagraphs", fromLines(e.target.value))} />
          </div>
          <div className="field">
            <label>Ruoli/card, uno per riga</label>
            <textarea value={lines(content.roles)} onChange={(e) => setField("roles", fromLines(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="editor-card">
        <div className="panel-head compact">
          <h3>Servizi</h3>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => setField("services", [...content.services, emptyItem()])}
          >
            + Aggiungi servizio
          </button>
        </div>
        <div className="field">
          <label>Introduzione servizi</label>
          <textarea value={content.servicesIntro} onChange={(e) => setField("servicesIntro", e.target.value)} />
        </div>
        {content.services.map((service, index) => (
          <div className="mini-editor" key={`${service.title}-${index}`}>
            <input
              value={service.title}
              onChange={(e) => updateItem("services", index, { ...service, title: e.target.value })}
              aria-label="Titolo servizio"
            />
            <textarea
              value={service.text ?? ""}
              onChange={(e) => updateItem("services", index, { ...service, text: e.target.value })}
              aria-label="Descrizione servizio"
            />
            <textarea
              value={lines(service.points ?? [])}
              onChange={(e) => updateItem("services", index, { ...service, points: fromLines(e.target.value) })}
              aria-label="Punti servizio"
            />
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => setField("services", content.services.filter((_, i) => i !== index))}
            >
              Elimina
            </button>
          </div>
        ))}
      </div>

      <div className="editor-card">
        <div className="panel-head compact">
          <h3>Risultati e case study</h3>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => setField("cases", [...content.cases, emptyItem()])}
          >
            + Aggiungi case
          </button>
        </div>
        <div className="dashboard-grid two">
          <div className="field">
            <label>Titolo sezione</label>
            <input value={content.resultsTitle} onChange={(e) => setField("resultsTitle", e.target.value)} />
          </div>
          <div className="field">
            <label>Introduzione</label>
            <textarea value={content.resultsIntro} onChange={(e) => setField("resultsIntro", e.target.value)} />
          </div>
        </div>
        {content.cases.map((item, index) => (
          <div className="mini-editor case-editor" key={`${item.title}-${index}`}>
            <input
              value={item.title}
              onChange={(e) => updateItem("cases", index, { ...item, title: e.target.value })}
              aria-label="Titolo case study"
            />
            <textarea
              value={item.text ?? ""}
              onChange={(e) => updateItem("cases", index, { ...item, text: e.target.value })}
              aria-label="Descrizione case study"
            />
            <textarea
              value={lines(item.numbers ?? [])}
              onChange={(e) => updateItem("cases", index, { ...item, numbers: fromLines(e.target.value) })}
              aria-label="Numeri case study"
            />
            <input
              value={item.imageSrc ?? ""}
              onChange={(e) => updateItem("cases", index, { ...item, imageSrc: e.target.value })}
              aria-label="Immagine case study"
              placeholder="/progetti/esempio.jpg"
            />
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => setField("cases", content.cases.filter((_, i) => i !== index))}
            >
              Elimina
            </button>
          </div>
        ))}
      </div>

      <div className="editor-card">
        <div className="panel-head compact">
          <h3>Metodo</h3>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => setField("method", [...content.method, emptyItem()])}
          >
            + Aggiungi step
          </button>
        </div>
        <div className="dashboard-grid two">
          <div className="field">
            <label>Titolo sezione</label>
            <input value={content.methodTitle} onChange={(e) => setField("methodTitle", e.target.value)} />
          </div>
          <div className="field">
            <label>Introduzione</label>
            <textarea value={content.methodIntro} onChange={(e) => setField("methodIntro", e.target.value)} />
          </div>
        </div>
        {content.method.map((step, index) => (
          <div className="mini-editor slim" key={`${step.title}-${index}`}>
            <input
              value={step.title}
              onChange={(e) => updateItem("method", index, { ...step, title: e.target.value })}
              aria-label="Titolo step metodo"
            />
            <textarea
              value={step.text ?? ""}
              onChange={(e) => updateItem("method", index, { ...step, text: e.target.value })}
              aria-label="Testo step metodo"
            />
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => setField("method", content.method.filter((_, i) => i !== index))}
            >
              Elimina
            </button>
          </div>
        ))}
        <div className="field">
          <label>Citazione metodo</label>
          <textarea value={content.methodQuote} onChange={(e) => setField("methodQuote", e.target.value)} />
        </div>
      </div>

      <div className="dashboard-grid two">
        <div className="editor-card">
          <h3>Scelte chiare</h3>
          <div className="field">
            <label>Titolo</label>
            <input value={content.antiTitle} onChange={(e) => setField("antiTitle", e.target.value)} />
          </div>
          <div className="field">
            <label>Testo</label>
            <textarea value={content.antiText} onChange={(e) => setField("antiText", e.target.value)} />
          </div>
        </div>
        <div className="editor-card">
          <h3>Contatti</h3>
          <div className="field">
            <label>Titolo</label>
            <input value={content.contactTitle} onChange={(e) => setField("contactTitle", e.target.value)} />
          </div>
          <div className="field">
            <label>Testo</label>
            <textarea value={content.contactText} onChange={(e) => setField("contactText", e.target.value)} />
          </div>
          <div className="field">
            <label>Email contatto</label>
            <input value={content.email} onChange={(e) => setField("email", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="editor-card">
        <div className="panel-head compact">
          <h3>Sezioni extra</h3>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => setField("extraSections", [...content.extraSections, emptySection()])}
          >
            + Aggiungi sezione
          </button>
        </div>
        {content.extraSections.length === 0 ? (
          <p className="muted">Nessuna sezione extra aggiunta.</p>
        ) : null}
        {content.extraSections.map((section, index) => (
          <div className="mini-editor" key={`${section.title}-${index}`}>
            <input
              value={section.eyebrow}
              onChange={(e) => {
                const next = [...content.extraSections];
                next[index] = { ...section, eyebrow: e.target.value };
                setField("extraSections", next);
              }}
              aria-label="Etichetta sezione"
            />
            <input
              value={section.title}
              onChange={(e) => {
                const next = [...content.extraSections];
                next[index] = { ...section, title: e.target.value };
                setField("extraSections", next);
              }}
              aria-label="Titolo sezione"
            />
            <textarea
              value={section.text}
              onChange={(e) => {
                const next = [...content.extraSections];
                next[index] = { ...section, text: e.target.value };
                setField("extraSections", next);
              }}
              aria-label="Testo sezione"
            />
            <button
              className="btn btn-danger"
              type="button"
              onClick={() =>
                setField(
                  "extraSections",
                  content.extraSections.filter((_, i) => i !== index)
                )
              }
            >
              Elimina
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
