import { requireApiAuth } from "@/lib/auth";
import { r2Put } from "@/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Estensione per content-type. L'immagine arriva già ottimizzata dal client
// (canvas -> WebP); accettiamo comunque i formati comuni come fallback.
const EXT: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/avif": "avif",
};
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

export async function POST(req: Request) {
  const guard = await requireApiAuth();
  if (guard) return guard;

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Nessun file ricevuto" }, { status: 400 });
  }
  const ext = EXT[file.type];
  if (!ext) {
    return Response.json(
      { error: "Formato non supportato (usa JPG, PNG, WEBP, GIF, AVIF)" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "Immagine troppo grande (max 15 MB)" },
      { status: 400 }
    );
  }

  const key = `links/${crypto.randomUUID()}.${ext}`;
  await r2Put(key, await file.arrayBuffer(), file.type);

  return Response.json({ key, url: `/api/media/${key}` });
}
