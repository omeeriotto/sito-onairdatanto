import { d1Run } from "./d1";

const SOURCE = "instagram-profile-guide";

export async function saveLeadMagnetSubscriber(email: string): Promise<boolean> {
  try {
    await d1Run(`
      CREATE TABLE IF NOT EXISTS email_subscribers (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        email       TEXT    NOT NULL UNIQUE,
        source      TEXT    NOT NULL DEFAULT '${SOURCE}',
        created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
        updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
      )
    `);

    await d1Run(
      `INSERT INTO email_subscribers (email, source)
       VALUES (?, ?)
       ON CONFLICT(email) DO UPDATE SET
         source = excluded.source,
         updated_at = datetime('now')`,
      [email, SOURCE]
    );

    return true;
  } catch {
    return false;
  }
}
