import { requireApiAuth } from "@/lib/auth";
import { setVisibility } from "@/lib/links";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const id = Number((await params).id);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "ID non valido" }, { status: 400 });
  }
  const body = (await req.json()) as { visible?: boolean };
  await setVisibility(id, Boolean(body.visible));
  return Response.json({ ok: true });
}
