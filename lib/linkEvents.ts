import { d1First, d1Query, d1Run } from "./d1";
import type { LinkStats } from "./types";

async function ensureLinkEventsTable(): Promise<void> {
  await d1Run(`
    CREATE TABLE IF NOT EXISTS link_events (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      item_type   TEXT    NOT NULL,
      item_id     TEXT    NOT NULL,
      event       TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);
  await d1Run(
    `CREATE INDEX IF NOT EXISTS idx_link_events_item
       ON link_events (item_type, item_id, event)`
  ).catch(() => undefined);
}

export async function recordLinkEvent(
  itemType: "link" | "lead-magnet",
  itemId: string,
  event: "click" | "download" | "send"
): Promise<void> {
  try {
    await ensureLinkEventsTable();
    await d1Run(
      `INSERT INTO link_events (item_type, item_id, event) VALUES (?, ?, ?)`,
      [itemType, itemId, event]
    );
  } catch {
    /* best-effort analytics */
  }
}

export async function getLinkStats(
  itemType: "link" | "lead-magnet",
  itemId: string
): Promise<LinkStats> {
  try {
    await ensureLinkEventsTable();
    const row = await d1First<{ clicks: number; downloads: number; sends: number }>(
      `SELECT
         SUM(CASE WHEN event = 'click' THEN 1 ELSE 0 END) AS clicks,
         SUM(CASE WHEN event = 'download' THEN 1 ELSE 0 END) AS downloads,
         SUM(CASE WHEN event = 'send' THEN 1 ELSE 0 END) AS sends
       FROM link_events
       WHERE item_type = ? AND item_id = ?`,
      [itemType, itemId]
    );
    return {
      clickCount: Number(row?.clicks ?? 0),
      downloadCount: Number(row?.downloads ?? 0),
      sendCount: Number(row?.sends ?? 0),
    };
  } catch {
    return { clickCount: 0, downloadCount: 0 };
  }
}

export async function getLinkStatsMap(
  itemType: "link" | "lead-magnet"
): Promise<Map<string, LinkStats>> {
  try {
    await ensureLinkEventsTable();
    const rows = await d1Query<{
      item_id: string;
      clicks: number;
      downloads: number;
      sends: number;
    }>(
      `SELECT item_id,
              SUM(CASE WHEN event = 'click' THEN 1 ELSE 0 END) AS clicks,
              SUM(CASE WHEN event = 'download' THEN 1 ELSE 0 END) AS downloads,
              SUM(CASE WHEN event = 'send' THEN 1 ELSE 0 END) AS sends
         FROM link_events
        WHERE item_type = ?
        GROUP BY item_id`,
      [itemType]
    );
    return new Map(
      rows.map((row) => [
        row.item_id,
        {
          clickCount: Number(row.clicks ?? 0),
          downloadCount: Number(row.downloads ?? 0),
          sendCount: Number(row.sends ?? 0),
        },
      ])
    );
  } catch {
    return new Map();
  }
}
