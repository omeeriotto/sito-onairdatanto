import { requireApiAuth } from "@/lib/auth";
import { listLeadMagnetSubscribers } from "@/lib/leadMagnetSubscribers";

export const dynamic = "force-dynamic";

function csvCell(value: string | number | null): string {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const rows = await listLeadMagnetSubscribers();
  const csv = [
    [
      "Nome",
      "Email",
      "Guida scaricata",
      "Resend contact ID",
      "Sync Resend",
      "Errore Resend",
      "Prima iscrizione",
      "Ultimo download",
    ]
      .map(csvCell)
      .join(","),
    ...rows.map((row) =>
      [
        row.name,
        row.email,
        row.source,
        row.resend_contact_id,
        row.resend_synced_at,
        row.resend_error,
        row.created_at,
        row.updated_at,
      ]
        .map(csvCell)
        .join(",")
    ),
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="download-guide.csv"',
    },
  });
}
