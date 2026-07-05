import { createSession, verifyCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let username = "";
  let password = "";

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await req.json()) as { username?: string; password?: string };
    username = body.username ?? "";
    password = body.password ?? "";
  } else {
    const form = await req.formData();
    username = String(form.get("username") ?? "");
    password = String(form.get("password") ?? "");
  }

  if (!verifyCredentials(username, password)) {
    return Response.json(
      { error: "Credenziali non valide" },
      { status: 401 }
    );
  }

  await createSession();
  return Response.json({ ok: true });
}
