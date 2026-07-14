import { requireApiAuth } from "@/lib/auth";
import { getHomeContent, saveHomeContent, type HomeContent } from "@/lib/homeContent";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireApiAuth();
  if (guard) return guard;
  return Response.json(await getHomeContent());
}

export async function PUT(req: Request) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const body = (await req.json()) as HomeContent;
  if (!body.heroTitle?.trim()) {
    return Response.json({ error: "Il titolo hero è obbligatorio" }, { status: 400 });
  }

  await saveHomeContent(body);
  return Response.json({ ok: true });
}
