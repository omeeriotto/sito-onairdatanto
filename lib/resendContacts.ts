import { getResendClient } from "./resend";

export interface LeadMagnetContactInput {
  name: string;
  email: string;
  source: string;
}

export interface ResendContactSyncResult {
  ok: boolean;
  contactId: string | null;
  error: string | null;
}

function splitName(name: string): { firstName: string | null; lastName: string | null } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: null, lastName: null };
  return {
    firstName: parts[0],
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : null,
  };
}

function errorMessage(error: unknown): string {
  if (!error) return "Errore sconosciuto";
  if (typeof error === "string") return error;
  if (typeof error === "object" && "message" in error) {
    return String((error as { message?: unknown }).message ?? "Errore Resend");
  }
  return "Errore Resend";
}

export async function syncLeadMagnetContact({
  name,
  email,
  source,
}: LeadMagnetContactInput): Promise<ResendContactSyncResult> {
  try {
    const resend = getResendClient();
    const { firstName, lastName } = splitName(name);
    const segmentId = process.env.RESEND_LEAD_MAGNET_SEGMENT_ID?.trim();
    const properties = {
      lead_magnet: source,
      last_downloaded_guide: source,
    };

    const payload = {
      email,
      unsubscribed: false,
      properties,
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
    };

    const created = await resend.contacts.create(payload);
    if (!created.error) {
      return { ok: true, contactId: created.data?.id ?? null, error: null };
    }

    const updated = await resend.contacts.update({
      email,
      firstName,
      lastName,
      unsubscribed: false,
      properties,
    });

    if (!updated.error) {
      return { ok: true, contactId: updated.data?.id ?? null, error: null };
    }

    return {
      ok: false,
      contactId: null,
      error: errorMessage(updated.error || created.error),
    };
  } catch (error) {
    return { ok: false, contactId: null, error: errorMessage(error) };
  }
}
