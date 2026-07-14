import { NextResponse } from "next/server";
import { getLink } from "@/lib/links";
import { recordLinkEvent } from "@/lib/linkEvents";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) {
    return NextResponse.redirect(new URL("/link", _req.url));
  }

  const link = await getLink(id).catch(() => null);
  if (!link?.visible) {
    return NextResponse.redirect(new URL("/link", _req.url));
  }

  await recordLinkEvent("link", String(id), "click");
  return NextResponse.redirect(link.link);
}

