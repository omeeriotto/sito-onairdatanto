import { requireApiAuth } from "@/lib/auth";
import { deleteLink, getLink, updateLink, type LinkInput } from "@/lib/links";

export const dynamic = "force-dynamic";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const id = Number((await params).id);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "ID non valido" }, { status: 400 });
  }
  const existing = await getLink(id);
  if (!existing) {
    return Response.json({ error: "Link non trovato" }, { status: 404 });
  }

  const body = (await req.json()) as Partial<LinkInput>;
  await updateLink(id, {
    title: body.title ?? existing.title,
    description: body.description ?? existing.description,
    link: body.link ?? existing.link,
    cta: body.cta ?? existing.cta,
    visible: body.visible ?? existing.visible,
    imageKey: body.imageKey ?? null,
    imageUrl: body.imageUrl ?? null,
  });

  return Response.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const id = Number((await params).id);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "ID non valido" }, { status: 400 });
  }
  await deleteLink(id);
  return Response.json({ ok: true });
}
