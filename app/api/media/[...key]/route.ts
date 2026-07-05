import { r2Get } from "@/lib/r2";

export const dynamic = "force-dynamic";

const TYPE_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};

// Serve un'immagine dal bucket R2 (via S3 API).
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;
  const objectKey = key.join("/");

  const object = await r2Get(objectKey);
  if (!object.ok || !object.body) {
    return new Response("Not found", { status: 404 });
  }

  const ext = objectKey.split(".").pop()?.toLowerCase() ?? "";
  const contentType =
    object.headers.get("content-type") ||
    TYPE_BY_EXT[ext] ||
    "application/octet-stream";

  const headers = new Headers();
  headers.set("Content-Type", contentType);
  const etag = object.headers.get("etag");
  if (etag) headers.set("etag", etag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
