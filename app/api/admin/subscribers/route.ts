import { requireApiAuth } from "@/lib/auth";
import { listLeadMagnetSubscribers } from "@/lib/leadMagnetSubscribers";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireApiAuth();
  if (guard) return guard;
  return Response.json(await listLeadMagnetSubscribers());
}
