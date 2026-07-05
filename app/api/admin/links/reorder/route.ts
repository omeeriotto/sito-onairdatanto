import { requireApiAuth } from "@/lib/auth";
import { reorderLinks } from "@/lib/links";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const body = (await req.json()) as { ids?: unknown };
  const ids = Array.isArray(body.ids)
    ? body.ids.map((v) => Number(v)).filter((n) => Number.isInteger(n))
    : [];
  if (!ids.length) {
    return Response.json({ error: "Nessun ordine ricevuto" }, { status: 400 });
  }
  await reorderLinks(ids);
  return Response.json({ ok: true });
}
