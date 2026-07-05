import { readFile } from "node:fs/promises";
import path from "node:path";
import { getResendClient, resendFrom, resendReplyTo } from "@/lib/resend";
import {
  INSTAGRAM_GUIDE_TITLE,
  renderInstagramGuideEmail,
  renderInstagramGuideText,
} from "@/lib/instagramGuideEmail";
import { INSTAGRAM_GUIDE_IMAGE_PATH } from "@/lib/leadMagnetContent";
import { saveLeadMagnetSubscriber } from "@/lib/leadMagnetSubscribers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GUIDE_IMAGE_CONTENT_ID = "instagram-guide-cover";

async function getGuideImage(request: Request) {
  const publicUrl = process.env.LEAD_MAGNET_PHOTO_URL;

  if (publicUrl) {
    return { url: publicUrl, attachments: [] };
  }

  try {
    const imagePath = path.join(
      process.cwd(),
      "public",
      INSTAGRAM_GUIDE_IMAGE_PATH
    );
    const content = await readFile(imagePath);

    return {
      url: `cid:${GUIDE_IMAGE_CONTENT_ID}`,
      attachments: [
        {
          filename: "guida-instagram-adriano-email.jpg",
          content,
          contentType: "image/jpeg",
          contentId: GUIDE_IMAGE_CONTENT_ID,
        },
      ],
    };
  } catch {
    return {
      url: new URL(INSTAGRAM_GUIDE_IMAGE_PATH, request.url).toString(),
      attachments: [],
    };
  }
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as {
    email?: string;
  } | null;

  const email = payload?.email?.trim().toLowerCase() ?? "";

  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, message: "Inserisci un indirizzo email valido." },
      { status: 400 }
    );
  }

  const stored = await saveLeadMagnetSubscriber(email);

  try {
    const resend = getResendClient();
    const guideImage = await getGuideImage(request);
    const { data, error } = await resend.emails.send({
      from: resendFrom,
      to: email,
      replyTo: resendReplyTo,
      subject: INSTAGRAM_GUIDE_TITLE,
      html: renderInstagramGuideEmail(guideImage.url),
      text: renderInstagramGuideText(),
      attachments: guideImage.attachments,
    });

    if (error) {
      return Response.json(
        { ok: false, message: "Invio email non riuscito.", error },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, id: data?.id, stored });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message:
          "Servizio email non configurato. Controlla RESEND_API_KEY e mittente.",
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      },
      { status: 500 }
    );
  }
}
