"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LeadMagnetLinkContent } from "@/lib/leadMagnetLink";

export default function LeadMagnetEditor({
  initial,
}: {
  initial: LeadMagnetLinkContent;
}) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof LeadMagnetLinkContent>(
    key: K,
    value: LeadMagnetLinkContent[K]
  ) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaving(true);
    const res = await fetch("/api/admin/lead-magnet", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Salvataggio non riuscito");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="editor-grid" onSubmit={onSubmit}>
      <div className="editor-card">
        {error ? <div className="notice notice-err">{error}</div> : null}

        <div className="field">
          <label htmlFor="guide-eyebrow">Etichetta</label>
          <input
            id="guide-eyebrow"
            type="text"
            value={content.eyebrow}
            onChange={(event) => update("eyebrow", event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="guide-title">Titolo</label>
          <input
            id="guide-title"
            type="text"
            value={content.title}
            onChange={(event) => update("title", event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="guide-description">Descrizione nella card</label>
          <textarea
            id="guide-description"
            value={content.description}
            onChange={(event) => update("description", event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="guide-modal">Testo nel modulo</label>
          <textarea
            id="guide-modal"
            value={content.modalText}
            onChange={(event) => update("modalText", event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="guide-image">Immagine</label>
          <input
            id="guide-image"
            type="text"
            value={content.image}
            onChange={(event) => update("image", event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="guide-cta">CTA</label>
          <input
            id="guide-cta"
            type="text"
            value={content.cta}
            onChange={(event) => update("cta", event.target.value)}
          />
        </div>

        <div className="field">
          <label>Visibilità</label>
          <div
            className={`toggle ${content.visible ? "on" : ""}`}
            onClick={() => update("visible", !content.visible)}
            role="switch"
            aria-checked={content.visible}
          >
            <span className="track">
              <span className="knob" />
            </span>
            <span>{content.visible ? "Visibile" : "Nascosta"}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Salvataggio..." : "Aggiorna guida"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.push("/admin")}
          >
            Annulla
          </button>
        </div>
      </div>

      <div className="preview-wrap">
        <p className="preview-label">Anteprima</p>
        <div className="preview-card">
          <div className="pc-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.image} alt="" />
          </div>
          <div className="pc-body">
            <h2>{content.title}</h2>
            <p className="pc-desc">{content.description}</p>
            <div className="pc-btn">{content.cta}</div>
          </div>
        </div>
      </div>
    </form>
  );
}
