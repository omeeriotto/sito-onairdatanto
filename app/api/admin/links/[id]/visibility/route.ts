import { requireApiAuth } from "@/lib/auth";
import { setLeadMagnetVisibility } from "@/lib/leadMagnetLink";
import { setVisibility } from "@/lib/links";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const rawId = (await params).id;
  const body = (await req.json()) as { visible?: boolean };
  if (rawId === "lead-magnet") {
    await setLeadMagnetVisibility(Boolean(body.visible));
    return Response.json({ ok: true });
  }

  const id = Number(rawId);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "ID non valido" }, { status: 400 });
  }
  await setVisibility(id, Boolean(body.visible));
  return Response.json({ ok: true });
}
