import { renderInstagramGuideEmail } from "@/lib/instagramGuideEmail";
import { INSTAGRAM_GUIDE_IMAGE_PATH } from "@/lib/leadMagnetContent";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const photoUrl = new URL(INSTAGRAM_GUIDE_IMAGE_PATH, request.url).toString();

  return new Response(renderInstagramGuideEmail(photoUrl), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
