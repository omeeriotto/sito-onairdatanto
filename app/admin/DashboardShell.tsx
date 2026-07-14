"use client";

import { useMemo, useState } from "react";
import LinkAdminList from "./LinkAdminList";
import HomeEditor from "./HomeEditor";
import type { AdminLinkItem } from "@/lib/types";
import type { HomeContent } from "@/lib/homeContent";
import type { LeadMagnetSubscriber } from "@/lib/leadMagnetSubscribers";

export default function DashboardShell({
  links,
  homeContent,
  subscribers,
}: {
  links: AdminLinkItem[];
  homeContent: HomeContent;
  subscribers: LeadMagnetSubscriber[];
}) {
  const [tab, setTab] = useState<"links" | "home" | "downloads">("links");
  const visibleLinks = useMemo(() => links.filter((link) => link.visible).length, [links]);

  return (
    <div className="admin-wrap dashboard-wrap">
      <div className="dashboard-hero">
        <div>
          <p className="page-sub">Dashboard interna</p>
          <h1 className="page-title">Gestione sito</h1>
        </div>
        <div className="stat-strip">
          <span><b>{links.length}</b> link</span>
          <span><b>{visibleLinks}</b> visibili</span>
          <span><b>{subscribers.length}</b> download</span>
        </div>
      </div>

      <div className="tabbar" role="tablist" aria-label="Sezioni dashboard">
        <button className={tab === "links" ? "active" : ""} type="button" onClick={() => setTab("links")}>
          Link
        </button>
        <button className={tab === "home" ? "active" : ""} type="button" onClick={() => setTab("home")}>
          Home
        </button>
        <button className={tab === "downloads" ? "active" : ""} type="button" onClick={() => setTab("downloads")}>
          Download
        </button>
      </div>

      {tab === "links" ? (
        <section className="dashboard-panel">
          <div className="panel-head">
            <div>
              <h2>Pagina link</h2>
              <p>Modifica, aggiungi, nascondi e riordina i link pubblici.</p>
            </div>
          </div>
          <LinkAdminList initialLinks={links} />
        </section>
      ) : null}

      {tab === "home" ? (
        <section className="dashboard-panel">
          <HomeEditor initialContent={homeContent} />
        </section>
      ) : null}

      {tab === "downloads" ? (
        <section className="dashboard-panel">
          <div className="panel-head">
            <div>
              <h2>Download guide</h2>
              <p>Nome, email, guida scaricata e data ultimo download.</p>
              <p className="panel-note">La sync Resend avviene quando viene inviata la guida.</p>
            </div>
            <a className="btn btn-primary" href="/api/admin/subscribers/export">
              Scarica CSV
            </a>
          </div>
          <div className="subscriber-table">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Guida</th>
                  <th>Resend</th>
                  <th>Ultimo download</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={5}>Nessun download registrato al momento.</td>
                  </tr>
                ) : (
                  subscribers.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name || "-"}</td>
                      <td>{row.email}</td>
                      <td>{row.source}</td>
                      <td>
                        {row.resend_synced_at ? (
                          <span className="sync-pill ok">Sincronizzato</span>
                        ) : row.resend_error ? (
                          <span className="sync-pill err" title={row.resend_error}>
                            Errore
                          </span>
                        ) : (
                          <span className="sync-pill muted">In attesa</span>
                        )}
                      </td>
                      <td>{row.updated_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
