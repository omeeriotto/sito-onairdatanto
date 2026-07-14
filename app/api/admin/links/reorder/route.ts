import { requireApiAuth } from "@/lib/auth";
import { reorderAdminLinks } from "@/lib/links";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const body = (await req.json()) as { ids?: unknown };
  const ids = Array.isArray(body.ids)
    ? body.ids.map((v) => String(v)).filter(Boolean)
    : [];
  if (!ids.length) {
    return Response.json({ error: "Nessun ordine ricevuto" }, { status: 400 });
  }
  await reorderAdminLinks(ids);
  return Response.json({ ok: true });
}
