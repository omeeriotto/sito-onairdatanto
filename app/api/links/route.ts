import { listPublicLinks } from "@/lib/links";

export const dynamic = "force-dynamic";

// GET pubblico: tutti i link visibili, ordinati. (compatibile con la vecchia idea WP)
export async function GET() {
  const links = await listPublicLinks().catch(() => []);
  return Response.json(links, {
    headers: { "Cache-Control": "no-store" },
  });
}
