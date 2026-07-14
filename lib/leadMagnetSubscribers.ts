import { d1Query, d1Run } from "./d1";
import { syncLeadMagnetContact } from "./resendContacts";

const SOURCE = "instagram-profile-guide";

export interface LeadMagnetSubscriber {
  id: number;
  name: string | null;
  email: string;
  source: string;
  resend_contact_id: string | null;
  resend_synced_at: string | null;
  resend_error: string | null;
  created_at: string;
  updated_at: string;
}

async function ensureSubscribersTable(): Promise<void> {
  await d1Run(`
    CREATE TABLE IF NOT EXISTS email_subscribers (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT,
      email       TEXT    NOT NULL UNIQUE,
      source      TEXT    NOT NULL DEFAULT '${SOURCE}',
      resend_contact_id TEXT,
      resend_synced_at  TEXT,
      resend_error      TEXT,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);
  await d1Run(`ALTER TABLE email_subscribers ADD COLUMN name TEXT`).catch(
    () => undefined
  );
  await d1Run(
    `ALTER TABLE email_subscribers ADD COLUMN resend_contact_id TEXT`
  ).catch(() => undefined);
  await d1Run(
    `ALTER TABLE email_subscribers ADD COLUMN resend_synced_at TEXT`
  ).catch(() => undefined);
  await d1Run(`ALTER TABLE email_subscribers ADD COLUMN resend_error TEXT`).catch(
    () => undefined
  );
}

export async function saveLeadMagnetSubscriber(
  email: string,
  name = "",
  source = SOURCE
): Promise<boolean> {
  try {
    await ensureSubscribersTable();

    await d1Run(
      `INSERT INTO email_subscribers (name, email, source)
       VALUES (?, ?, ?)
       ON CONFLICT(email) DO UPDATE SET
         name = CASE
           WHEN excluded.name IS NOT NULL AND excluded.name != '' THEN excluded.name
           ELSE email_subscribers.name
         END,
         source = excluded.source,
         updated_at = datetime('now')`,
      [name.trim() || null, email, source]
    );

    const resendSync = await syncLeadMagnetContact({ name, email, source });
    await d1Run(
      `UPDATE email_subscribers
          SET resend_contact_id = COALESCE(?, resend_contact_id),
              resend_synced_at = CASE WHEN ? THEN datetime('now') ELSE resend_synced_at END,
              resend_error = ?,
              updated_at = datetime('now')
        WHERE email = ?`,
      [
        resendSync.contactId,
        resendSync.ok ? 1 : 0,
        resendSync.ok ? null : resendSync.error,
        email,
      ]
    );

    return true;
  } catch {
    return false;
  }
}

export async function listLeadMagnetSubscribers(): Promise<
  LeadMagnetSubscriber[]
> {
  await ensureSubscribersTable();
  return d1Query<LeadMagnetSubscriber>(
    `SELECT id, name, email, source, resend_contact_id, resend_synced_at,
            resend_error, created_at, updated_at
       FROM email_subscribers
      ORDER BY updated_at DESC, id DESC`
  );
}
