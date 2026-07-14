"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Sortable from "sortablejs";
import type { AdminLinkItem } from "@/lib/types";
import { detectPlatform } from "@/lib/platforms";
import PlatformIcon from "@/components/PlatformIcon";

export default function LinkAdminList({
  initialLinks,
}: {
  initialLinks: AdminLinkItem[];
}) {
  const [links, setLinks] = useState<AdminLinkItem[]>(initialLinks);
  const [renderKey, setRenderKey] = useState(0);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const listRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef(links);

  useEffect(() => {
    linksRef.current = links;
  }, [links]);

  // Inizializza SortableJS (ri-creato a ogni remount della lista).
  const flash = useCallback((type: "ok" | "err", text: string) => {
    setMsg({ type, text });
    window.setTimeout(() => setMsg(null), 2600);
  }, []);

  const persistOrder = useCallback(
    async (ids: string[]) => {
      const res = await fetch("/api/admin/links/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) flash("err", "Errore nel salvataggio dell'ordine");
    },
    [flash]
  );

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const sortable = Sortable.create(el, {
      handle: ".drag-handle",
      animation: 150,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      onEnd: () => {
        const ids = Array.from(
          el.querySelectorAll<HTMLElement>(".link-row")
        ).map((row) => String(row.dataset.id));
        const map = new Map(linksRef.current.map((l) => [l.id, l]));
        const reordered = ids
          .map((id) => map.get(id))
          .filter((l): l is AdminLinkItem => Boolean(l));
        setLinks(reordered);
        setRenderKey((k) => k + 1); // remount: React diventa unica fonte dell'ordine
        void persistOrder(ids);
      },
    });
    return () => sortable.destroy();
  }, [persistOrder, renderKey]);

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= links.length) return;
    const next = [...links];
    [next[index], next[target]] = [next[target], next[index]];
    setLinks(next);
    setRenderKey((k) => k + 1);
    void persistOrder(next.map((l) => l.id));
  }

  async function toggle(id: string, current: boolean) {
    setLinks((ls) =>
      ls.map((l) => (l.id === id ? { ...l, visible: !current } : l))
    );
    const apiId = id === "lead-magnet" ? id : id.replace(/^link:/, "");
    const res = await fetch(`/api/admin/links/${apiId}/visibility`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !current }),
    });
    if (!res.ok) {
      flash("err", "Errore nel cambio di visibilità");
      setLinks((ls) =>
        ls.map((l) => (l.id === id ? { ...l, visible: current } : l))
      );
    }
  }

  async function remove(id: string) {
    if (id === "lead-magnet") {
      flash("err", "La guida gratuita non si elimina: puoi nasconderla.");
      return;
    }
    if (
      !window.confirm(
        "Eliminare definitivamente questo link? In alternativa puoi solo nasconderlo."
      )
    )
      return;
    const prev = links;
    setLinks((ls) => ls.filter((l) => l.id !== id));
    const apiId = id.replace(/^link:/, "");
    const res = await fetch(`/api/admin/links/${apiId}`, { method: "DELETE" });
    if (!res.ok) {
      flash("err", "Errore nell'eliminazione");
      setLinks(prev);
    } else {
      flash("ok", "Link eliminato");
    }
  }

  return (
    <div>
      <div className="admin-toolbar">
        <div className="left">
          <Link href="/admin/new" className="btn btn-primary">
            + Nuovo link
          </Link>
        </div>
      </div>

      {msg && (
        <div className={`notice ${msg.type === "ok" ? "notice-ok" : "notice-err"}`}>
          {msg.text}
        </div>
      )}

      {links.length === 0 ? (
        <div className="empty-state">
          Nessun link ancora. Crea il primo con “+ Nuovo link”.
        </div>
      ) : (
        <div className="link-list" ref={listRef} key={renderKey}>
          {links.map((link, index) => (
            <div
              className={`link-row ${link.visible ? "" : "is-hidden"}`}
              key={link.id}
              data-id={link.id}
            >
              <div className="drag-handle" title="Trascina per riordinare">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="9" cy="6" r="1.6" />
                  <circle cx="15" cy="6" r="1.6" />
                  <circle cx="9" cy="12" r="1.6" />
                  <circle cx="15" cy="12" r="1.6" />
                  <circle cx="9" cy="18" r="1.6" />
                  <circle cx="15" cy="18" r="1.6" />
                </svg>
              </div>

              <div className="reorder-mobile">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => move(index, -1)}
                  aria-label="Sposta su"
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => move(index, 1)}
                  aria-label="Sposta giù"
                  disabled={index === links.length - 1}
                >
                  ↓
                </button>
              </div>

              {link.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="thumb" src={link.image} alt={link.title} />
              ) : (
                <div
                  className="thumb thumb-fallback"
                  style={{
                    ["--pc" as string]:
                      link.kind === "lead-magnet"
                        ? "var(--accent)"
                        : detectPlatform(link.link).color,
                  }}
                >
                  {link.kind === "lead-magnet" ? (
                    <span style={{ fontSize: 22, fontWeight: 900 }}>↓</span>
                  ) : (
                    <PlatformIcon k={detectPlatform(link.link).key} size={26} />
                  )}
                </div>
              )}

              <div className="meta">
                <h3>
                  {link.title}
                  {link.kind === "lead-magnet" ? (
                    <span className="row-badge">Guida</span>
                  ) : null}
                </h3>
                <p className="url">{link.link}</p>
                <p className="row-stats">
                  {link.clickCount} click
                  {link.kind === "lead-magnet"
                    ? ` · ${link.downloadCount} download · ${link.sendCount ?? 0} invii`
                    : ""}
                </p>
              </div>

              <div className="actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => toggle(link.id, link.visible)}
                >
                  {link.visible ? "Nascondi" : "Mostra"}
                </button>
                <Link
                  href={
                    link.kind === "lead-magnet"
                      ? "/admin/edit/lead-magnet"
                      : `/admin/edit/${link.numericId}`
                  }
                  className="btn btn-ghost"
                >
                  Modifica
                </Link>
                {link.kind === "link" ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => remove(link.id)}
                  >
                    Elimina
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
