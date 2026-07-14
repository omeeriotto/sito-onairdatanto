import { LEAD_MAGNET_ID } from "@/lib/leadMagnetLink";
import { recordLinkEvent } from "@/lib/linkEvents";

export const dynamic = "force-dynamic";

export async function POST() {
  await recordLinkEvent("lead-magnet", LEAD_MAGNET_ID, "click");
  return Response.json({ ok: true });
}
