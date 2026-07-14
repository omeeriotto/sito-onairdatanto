import { d1Query, d1Run } from "./d1";
import { INSTAGRAM_GUIDE_TITLE } from "./instagramGuideEmail";
import { getResendClient } from "./resend";
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

function resendStatusError(status: unknown): string | null {
  const value = String(status ?? "");
  if (["bounced", "failed", "suppressed", "complained", "canceled"].includes(value)) {
    return `Resend: ${value}`;
  }
  return null;
}

function propertyString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "value" in value) {
    return String((value as { value?: unknown }).value ?? "");
  }
  return "";
}

function errorMessage(error: unknown): string {
  if (!error) return "Errore sconosciuto";
  if (typeof error === "string") return error;
  if (typeof error === "object" && "message" in error) {
    return String((error as { message?: unknown }).message ?? "Errore Resend");
  }
  return "Errore Resend";
}

export async function getResendGuideReadStatus(): Promise<{
  readable: boolean;
  error: string | null;
}> {
  try {
    const resend = getResendClient();
    const emails = await resend.emails.list({ limit: 1 });
    if (!emails.error) return { readable: true, error: null };
    const contacts = await resend.contacts.list({ limit: 1 });
    if (!contacts.error) return { readable: true, error: null };
    return {
      readable: false,
      error: errorMessage(contacts.error || emails.error),
    };
  } catch (error) {
    return { readable: false, error: errorMessage(error) };
  }
}

export async function listResendGuideSubscribers(): Promise<LeadMagnetSubscriber[]> {
  try {
    const resend = getResendClient();
    const response = await resend.emails.list({ limit: 100 });
    const emails = response.data?.data ?? [];

    return emails
      .filter((email) => email.subject === INSTAGRAM_GUIDE_TITLE)
      .flatMap((email, index) =>
        email.to.map((recipient, recipientIndex) => ({
          id: -1 * (index + 1) * 100 - recipientIndex,
          name: null,
          email: recipient.toLowerCase(),
          source: "instagram-profile-guide",
          resend_contact_id: email.id,
          resend_synced_at: email.created_at,
          resend_error: resendStatusError(email.last_event),
          created_at: email.created_at,
          updated_at: email.created_at,
        }))
      );
  } catch {
    return [];
  }
}

async function listResendGuideContacts(): Promise<LeadMagnetSubscriber[]> {
  try {
    const resend = getResendClient();
    const segmentId = process.env.RESEND_LEAD_MAGNET_SEGMENT_ID?.trim();
    const response = await resend.contacts.list({
      limit: 100,
      ...(segmentId ? { segmentId } : {}),
    });
    const contacts = response.data?.data ?? [];
    const detailed = await Promise.all(
      contacts.map(async (contact) => {
        const detail = await resend.contacts.get({ email: contact.email }).catch(() => null);
        return { contact, detail: detail?.data ?? null };
      })
    );

    return detailed
      .filter(({ detail }) => {
        if (segmentId) return true;
        const properties = detail?.properties ?? {};
        return (
          propertyString(properties.lead_magnet) === SOURCE ||
          propertyString(properties.last_downloaded_guide) === SOURCE
        );
      })
      .map(({ contact, detail }, index) => ({
        id: -10000 - index,
        name: [contact.first_name, contact.last_name].filter(Boolean).join(" ") || null,
        email: contact.email.toLowerCase(),
        source: SOURCE,
        resend_contact_id: contact.id,
        resend_synced_at: contact.created_at,
        resend_error: null,
        created_at: detail?.created_at ?? contact.created_at,
        updated_at: detail?.created_at ?? contact.created_at,
      }));
  } catch {
    return [];
  }
}

async function listResendGuideRows(): Promise<LeadMagnetSubscriber[]> {
  return mergeSubscribers(
    await listResendGuideSubscribers(),
    await listResendGuideContacts()
  );
}

export async function countResendGuideSends(): Promise<number> {
  return (await listResendGuideRows()).length;
}

function mergeSubscribers(
  databaseRows: LeadMagnetSubscriber[],
  resendRows: LeadMagnetSubscriber[]
): LeadMagnetSubscriber[] {
  const seen = new Set<string>();
  const merged: LeadMagnetSubscriber[] = [];

  for (const row of [...databaseRows, ...resendRows]) {
    const key = row.email.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(row);
  }

  return merged.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime() ||
      b.id - a.id
  );
}

export async function saveLeadMagnetSubscriber(
  email: string,
  name = "",
  source = SOURCE
): Promise<boolean> {
  const resendSync = await syncLeadMagnetContact({ name, email, source });

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
  const resendRows = await listResendGuideRows();
  try {
    await ensureSubscribersTable();
    const databaseRows = await d1Query<LeadMagnetSubscriber>(
      `SELECT id, name, email, source, resend_contact_id, resend_synced_at,
              resend_error, created_at, updated_at
         FROM email_subscribers
        ORDER BY updated_at DESC, id DESC`
    );
    return mergeSubscribers(databaseRows, resendRows);
  } catch {
    return resendRows;
  }
}
