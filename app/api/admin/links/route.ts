import { requireApiAuth } from "@/lib/auth";
import { createLink, listAllAdminLinks, type LinkInput } from "@/lib/links";

export const dynamic = "force-dynamic";

// Elenco completo (admin).
export async function GET() {
  const guard = await requireApiAuth();
  if (guard) return guard;
  return Response.json(await listAllAdminLinks());
}

// Crea un nuovo link.
export async function POST(req: Request) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const body = (await req.json()) as Partial<LinkInput>;
  if (!body.title || !body.title.trim()) {
    return Response.json({ error: "Il titolo è obbligatorio" }, { status: 400 });
  }

  const id = await createLink({
    title: body.title,
    description: body.description ?? "",
    link: body.link ?? "#",
    cta: body.cta ?? "Vai",
    visible: body.visible ?? true,
    imageKey: body.imageKey ?? null,
    imageUrl: body.imageUrl ?? null,
  });

  return Response.json({ ok: true, id }, { status: 201 });
}
