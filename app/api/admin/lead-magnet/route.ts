import { requireApiAuth } from "@/lib/auth";
import {
  getLeadMagnetLinkContent,
  saveLeadMagnetLinkContent,
  type LeadMagnetLinkContent,
} from "@/lib/leadMagnetLink";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireApiAuth();
  if (guard) return guard;
  return Response.json(await getLeadMagnetLinkContent());
}

export async function PUT(req: Request) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const current = await getLeadMagnetLinkContent();
  const body = (await req.json()) as Partial<LeadMagnetLinkContent>;

  await saveLeadMagnetLinkContent({
    ...current,
    title: body.title?.trim() || current.title,
    description: body.description ?? current.description,
    modalText: body.modalText ?? current.modalText,
    image: body.image?.trim() || current.image,
    cta: body.cta?.trim() || current.cta,
    eyebrow: body.eyebrow?.trim() || current.eyebrow,
    visible: body.visible ?? current.visible,
    sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : current.sortOrder,
  });

  return Response.json({ ok: true });
}
