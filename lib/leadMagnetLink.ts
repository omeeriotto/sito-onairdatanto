import { d1First, d1Run } from "./d1";
import {
  INSTAGRAM_GUIDE_IMAGE_PATH,
  INSTAGRAM_GUIDE_TITLE,
} from "./leadMagnetContent";
import { getLinkStats } from "./linkEvents";
import type { AdminLinkItem } from "./types";

const KEY = "lead_magnet_link";
export const LEAD_MAGNET_ID = "lead-magnet";

export interface LeadMagnetLinkContent {
  title: string;
  description: string;
  modalText: string;
  image: string;
  cta: string;
  eyebrow: string;
  visible: boolean;
  sortOrder: number;
}

export const defaultLeadMagnetLink: LeadMagnetLinkContent = {
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

function mergeLeadMagnetLink(
  value: Partial<LeadMagnetLinkContent> | null
): LeadMagnetLinkContent {
  return {
    ...defaultLeadMagnetLink,
    ...(value ?? {}),
  };
}

async function ensureSiteContentTable(): Promise<void> {
  await d1Run(`
    CREATE TABLE IF NOT EXISTS site_content (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}

export async function getLeadMagnetLinkContent(): Promise<LeadMagnetLinkContent> {
  try {
    await ensureSiteContentTable();
    const row = await d1First<{ value: string }>(
      `SELECT value FROM site_content WHERE key = ?`,
      [KEY]
    );
    if (!row?.value) return defaultLeadMagnetLink;
    return mergeLeadMagnetLink(JSON.parse(row.value) as Partial<LeadMagnetLinkContent>);
  } catch {
    return defaultLeadMagnetLink;
  }
}

export async function saveLeadMagnetLinkContent(
  content: LeadMagnetLinkContent
): Promise<void> {
  await ensureSiteContentTable();
  await d1Run(
    `INSERT INTO site_content (key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET
       value = excluded.value,
       updated_at = datetime('now')`,
    [KEY, JSON.stringify(mergeLeadMagnetLink(content))]
  );
}

export async function setLeadMagnetVisibility(visible: boolean): Promise<void> {
  const current = await getLeadMagnetLinkContent();
  await saveLeadMagnetLinkContent({ ...current, visible });
}

export async function setLeadMagnetSortOrder(sortOrder: number): Promise<void> {
  const current = await getLeadMagnetLinkContent();
  await saveLeadMagnetLinkContent({ ...current, sortOrder });
}

export async function getLeadMagnetAdminItem(): Promise<AdminLinkItem> {
  const content = await getLeadMagnetLinkContent();
  const stats = await getLinkStats("lead-magnet", LEAD_MAGNET_ID);
  const downloads = await d1First<{ total: number }>(
    `SELECT COUNT(*) AS total FROM email_subscribers WHERE source = ?`,
    ["instagram-profile-guide"]
  ).catch(() => null);
  return {
    id: LEAD_MAGNET_ID,
    kind: "lead-magnet",
    title: content.title,
    description: content.description,
    image: content.image,
    link: "Apre il modulo guida gratuita",
    cta: content.cta,
    visible: content.visible,
    sortOrder: content.sortOrder,
    clickCount: stats.clickCount,
    downloadCount: Number(downloads?.total ?? stats.downloadCount),
  };
}
