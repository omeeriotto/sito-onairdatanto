"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { detectPlatform } from "@/lib/platforms";
import PlatformIcon from "@/components/PlatformIcon";

const MAX_DIM = 1280;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("img load error"));
    };
    img.src = url;
  });
}

// Ottimizzazione automatica lato client: ridimensiona al lato lungo max e
// converte in WebP. Le GIF (potenzialmente animate) restano intatte.
async function optimizeImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file;
  try {
    const img = await loadImage(file);
    let { width, height } = img;
    if (width > MAX_DIM || height > MAX_DIM) {
      const r = Math.min(MAX_DIM / width, MAX_DIM / height);
      width = Math.round(width * r);
      height = Math.round(height * r);
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/webp", 0.82)
    );
    if (!blob) return file;
    return new File([blob], "image.webp", { type: "image/webp" });
  } catch {
    return file; // fallback: carica l'originale
  }
}

export interface EditorInitial {
  id: number;
  title: string;
  description: string;
  link: string;
  cta: string;
  visible: boolean;
  imageKey: string | null;
  imageUrl: string | null;
}

function ArrowIcon() {
  return (
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
  );
}

export default function LinkEditor({
  initial,
}: {
  initial?: EditorInitial | null;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [cta, setCta] = useState(initial?.cta ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [visible, setVisible] = useState(initial?.visible ?? true);

  const [imageKey, setImageKey] = useState<string | null>(
    initial?.imageKey ?? null
  );
  const [imageUrl, setImageUrl] = useState<string | null>(
    initial?.imageUrl ?? null
  );

  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const previewImage = imageKey
    ? `/api/media/${imageKey}`
    : imageUrl && imageUrl.trim()
      ? imageUrl.trim()
      : null;

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Trascina un file immagine (JPG, PNG, WEBP, GIF, AVIF)");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const optimized = await optimizeImage(file);
      const fd = new FormData();
      fd.append("file", optimized);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { key?: string; error?: string };
      if (!res.ok || !data.key) {
        setError(data.error || "Upload fallito");
      } else {
        setImageKey(data.key);
        setImageUrl(null);
      }
    } catch {
      setError("Errore durante l'upload");
    } finally {
      setUploading(false);
    }
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void uploadFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void uploadFile(file);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Il titolo è obbligatorio");
      return;
    }
    if (!link.trim()) {
      setError("Il link è obbligatorio");
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim(),
      description,
      link: link.trim(),
      cta: cta.trim() || "Vai",
      visible,
      imageKey,
      imageUrl: imageKey ? null : imageUrl?.trim() || null,
    };
    try {
      const res = await fetch(
        isEdit ? `/api/admin/links/${initial!.id}` : "/api/admin/links",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "Salvataggio fallito");
        setSaving(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Errore di rete");
      setSaving(false);
    }
  }

  return (
    <form className="editor-grid" onSubmit={onSubmit}>
      <div className="editor-card">
        {error && <div className="notice notice-err">{error}</div>}

        <div className="field">
          <label htmlFor="title">Titolo</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Es. Nuovo singolo"
          />
        </div>

        <div className="field">
          <label>Immagine</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onPickFile}
          />
          <div
            className={`image-drop ${previewImage ? "has-image" : ""} ${
              dragOver ? "drag-over" : ""
            }`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            {uploading ? (
              <span>Ottimizzazione e caricamento…</span>
            ) : previewImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewImage} alt="Anteprima" />
            ) : (
              <span>
                Trascina qui un&apos;immagine o clicca per selezionarla
                <br />
                <small style={{ opacity: 0.6 }}>
                  Viene ottimizzata e convertita in WebP in automatico
                </small>
              </span>
            )}
          </div>
          {previewImage && (
            <button
              type="button"
              className="btn btn-ghost"
              style={{ marginTop: 10 }}
              onClick={() => {
                setImageKey(null);
                setImageUrl(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
            >
              Rimuovi immagine
            </button>
          )}
          <div className="field" style={{ marginTop: 14, marginBottom: 0 }}>
            <label htmlFor="imgurl">…oppure incolla un URL immagine</label>
            <input
              id="imgurl"
              type="url"
              value={imageKey ? "" : imageUrl ?? ""}
              disabled={Boolean(imageKey)}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://…"
            />
            {imageKey && (
              <p className="hint">
                Rimuovi l&apos;immagine caricata per usare un URL esterno.
              </p>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="link">Link completo</label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://…"
          />
        </div>

        <div className="field">
          <label htmlFor="cta">Testo del bottone (CTA)</label>
          <input
            id="cta"
            type="text"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            placeholder="Vai"
          />
        </div>

        <div className="field">
          <label htmlFor="desc">Descrizione</label>
          <textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Una breve descrizione…"
          />
          <p className="hint">È consentito anche dell&apos;HTML semplice.</p>
        </div>

        <div className="field">
          <label>Visibilità</label>
          <div
            className={`toggle ${visible ? "on" : ""}`}
            onClick={() => setVisible((v) => !v)}
            role="switch"
            aria-checked={visible}
          >
            <span className="track">
              <span className="knob" />
            </span>
            <span>{visible ? "Visibile" : "Nascosto"}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Salvataggio…" : isEdit ? "Aggiorna link" : "Crea link"}
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

      {/* Anteprima live */}
      <div className="preview-wrap">
        <p className="preview-label">Anteprima live</p>
        <div className="preview-card">
          <div className="pc-img">
            {previewImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewImage} alt="" />
            ) : (
              <div
                className="ph"
                style={{ ["--pc" as string]: detectPlatform(link).color }}
              >
                <PlatformIcon k={detectPlatform(link).key} size={56} />
              </div>
            )}
          </div>
          <div className="pc-body">
            <h2>{title || "Titolo del link"}</h2>
            <div className="pc-desc">
              {description || "La descrizione apparirà qui…"}
            </div>
            <div className="pc-btn">
              <span>{cta.trim() || "Vai"}</span>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
