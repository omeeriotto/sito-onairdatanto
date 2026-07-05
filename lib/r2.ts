// Client per Cloudflare R2 via API S3-compatibile (aws4fetch), usato da Vercel.

import { AwsClient } from "aws4fetch";

const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const BUCKET = process.env.R2_BUCKET || "omegariot-media";

function client(): AwsClient {
  if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    throw new Error("Config R2 mancante: R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY");
  }
  return new AwsClient({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    service: "s3",
    region: "auto",
  });
}

function objectUrl(key: string): string {
  if (!ACCOUNT_ID) throw new Error("Config R2 mancante: CLOUDFLARE_ACCOUNT_ID");
  const endpoint = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;
  return `${endpoint}/${BUCKET}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export async function r2Put(
  key: string,
  body: ArrayBuffer | Uint8Array,
  contentType: string
): Promise<void> {
  // Uint8Array + Content-Length esplicito: senza, dentro il runtime del server
  // undici invia in chunked (Transfer-Encoding) e R2 risponde 411 Length Required
  // per i body oltre una certa dimensione.
  const bytes = body instanceof Uint8Array ? body : new Uint8Array(body);
  const res = await client().fetch(objectUrl(key), {
    method: "PUT",
    body: bytes as unknown as BodyInit,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(bytes.byteLength),
    },
  });
  if (!res.ok) {
    throw new Error(`R2 put fallita (${res.status})`);
  }
}

export async function r2Get(key: string): Promise<Response> {
  return client().fetch(objectUrl(key), { method: "GET" });
}

export async function r2Delete(key: string): Promise<void> {
  await client().fetch(objectUrl(key), { method: "DELETE" });
}
