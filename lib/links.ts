import { d1Query, d1First, d1Run, d1Exec } from "./d1";
import { getLeadMagnetAdminItem, setLeadMagnetSortOrder } from "./leadMagnetLink";
import { getLinkStatsMap } from "./linkEvents";
import { r2Delete } from "./r2";
import type { AdminLinkItem, Link, LinkRow } from "./types";

/** Risolve l'immagine: R2 (servita da /api/media) oppure URL esterno. */
function resolveImage(row: LinkRow): string | null {
  if (row.image_key) return `/api/media/${row.image_key}`;
  if (row.image_url) return row.image_url;
  return null;
}

function toLink(row: LinkRow): Link {
  return {
    id: row.id,
    adminId: `link:${row.id}`,
    kind: "link",
    title: row.title,
    description: row.description,
    image: resolveImage(row),
    link: row.link,
    cta: row.cta,
    visible: row.visible === 1,
    sortOrder: row.sort_order,
  };
}

function toAdminLink(row: LinkRow, stats: { clickCount: number; downloadCount: number }): AdminLinkItem {
  return {
    id: `link:${row.id}`,
    numericId: row.id,
    kind: "link",
    title: row.title,
    description: row.description,
    image: resolveImage(row),
    link: row.link,
    cta: row.cta,
    visible: row.visible === 1,
    sortOrder: row.sort_order,
    clickCount: stats.clickCount,
    downloadCount: stats.downloadCount,
  };
}

/** Tutti i link visibili, ordinati: per la pagina pubblica /link. */
export async function listPublicLinks(): Promise<Link[]> {
  const rows = await d1Query<LinkRow>(
    `SELECT * FROM links WHERE visible = 1 ORDER BY sort_order ASC, id ASC`
  );
  return rows.map(toLink);
}

/** Tutti i link (anche nascosti): per il pannello admin. */
export async function listAllLinks(): Promise<Link[]> {
  const rows = await d1Query<LinkRow>(
    `SELECT * FROM links ORDER BY sort_order ASC, id ASC`
  );
  return rows.map(toLink);
}

/** Link dashboard: link normali + guida gratuita come elemento gestibile. */
export async function listAllAdminLinks(): Promise<AdminLinkItem[]> {
  const rows = await d1Query<LinkRow>(
    `SELECT * FROM links ORDER BY sort_order ASC, id ASC`
  );
  const stats = await getLinkStatsMap("link");
  const regular = rows.map((row) =>
    toAdminLink(row, stats.get(String(row.id)) ?? { clickCount: 0, downloadCount: 0 })
  );
  const leadMagnet = await getLeadMagnetAdminItem();
  return [...regular, leadMagnet].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id)
  );
}

export async function getLink(id: number): Promise<Link | null> {
  const row = await d1First<LinkRow>(`SELECT * FROM links WHERE id = ?`, [id]);
  return row ? toLink(row) : null;
}

/** Riga grezza (con image_key/image_url separati): per l'editor admin. */
export async function getLinkRaw(id: number): Promise<LinkRow | null> {
  return await d1First<LinkRow>(`SELECT * FROM links WHERE id = ?`, [id]);
}

export interface LinkInput {
  title: string;
  description: string;
  link: string;
  cta: string;
  visible: boolean;
  imageKey?: string | null;
  imageUrl?: string | null;
}

function normalizeUrl(url: string): string {
  const v = (url || "").trim();
  if (!v) return "#";
  if (!/^https?:\/\//i.test(v)) return "https://" + v.replace(/^\/+/, "");
  return v;
}

export async function createLink(input: LinkInput): Promise<number> {
  const next = await d1First<{ next: number }>(
    `SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM links`
  );
  const order = next?.next ?? 1;
  const res = await d1Run(
    `INSERT INTO links (title, description, image_key, image_url, link, cta, visible, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title.trim() || "Senza titolo",
      input.description ?? "",
      input.imageKey ?? null,
      input.imageUrl ?? null,
      normalizeUrl(input.link),
      (input.cta || "").trim() || "Vai",
      input.visible ? 1 : 0,
      order,
    ]
  );
  return res.last_row_id;
}

export async function updateLink(id: number, input: LinkInput): Promise<void> {
  await d1Run(
    `UPDATE links
       SET title = ?, description = ?, image_key = ?, image_url = ?,
           link = ?, cta = ?, visible = ?, updated_at = datetime('now')
     WHERE id = ?`,
    [
      input.title.trim() || "Senza titolo",
      input.description ?? "",
      input.imageKey ?? null,
      input.imageUrl ?? null,
      normalizeUrl(input.link),
      (input.cta || "").trim() || "Vai",
      input.visible ? 1 : 0,
      id,
    ]
  );
}

export async function deleteLink(id: number): Promise<void> {
  const row = await d1First<{ image_key: string | null }>(
    `SELECT image_key FROM links WHERE id = ?`,
    [id]
  );
  await d1Run(`DELETE FROM links WHERE id = ?`, [id]);
  if (row?.image_key) {
    try {
      await r2Delete(row.image_key);
    } catch {
      /* best-effort */
    }
  }
}

export async function setVisibility(id: number, visible: boolean): Promise<void> {
  await d1Run(
    `UPDATE links SET visible = ?, updated_at = datetime('now') WHERE id = ?`,
    [visible ? 1 : 0, id]
  );
}

/** Riordina i link: l'array `ids` è nell'ordine desiderato. */
export async function reorderLinks(ids: number[]): Promise<void> {
  const clean = ids.map((n) => Number(n)).filter((n) => Number.isInteger(n));
  if (!clean.length) return;
  const sql = clean
    .map(
      (id, index) =>
        `UPDATE links SET sort_order = ${index + 1}, updated_at = datetime('now') WHERE id = ${id};`
    )
    .join("\n");
  await d1Exec(sql);
}

/** Riordina link normali e guida gratuita nello stesso elenco admin/pubblico. */
export async function reorderAdminLinks(ids: string[]): Promise<void> {
  if (!ids.length) return;
  const updates: string[] = [];
  let leadOrder: number | null = null;

  ids.forEach((rawId, index) => {
    const order = index + 1;
    if (rawId === "lead-magnet") {
      leadOrder = order;
      return;
    }
    const numeric = Number(rawId.replace(/^link:/, ""));
    if (Number.isInteger(numeric)) {
      updates.push(
        `UPDATE links SET sort_order = ${order}, updated_at = datetime('now') WHERE id = ${numeric};`
      );
    }
  });

  if (updates.length) await d1Exec(updates.join("\n"));
  if (leadOrder !== null) await setLeadMagnetSortOrder(leadOrder);
}
