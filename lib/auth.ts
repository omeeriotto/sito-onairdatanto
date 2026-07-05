import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "ogr_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 giorni

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET mancante");
  return s;
}

function key(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

/** Confronto a tempo (quasi) costante per evitare timing attack banali. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function verifyCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";
  return u !== "" && p !== "" && safeEqual(username, u) && safeEqual(password, p);
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(process.env.ADMIN_USERNAME ?? "admin")
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key(secret()));

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/** True se la richiesta corrente è autenticata come admin. */
export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, key(secret()));
    return true;
  } catch {
    return false;
  }
}

/** Per le pagine server: reindirizza al login se non autenticato. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

/** Per le API: restituisce una Response 401 se non autenticato, altrimenti null. */
export async function requireApiAuth(): Promise<Response | null> {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Non autorizzato" }, { status: 401 });
  }
  return null;
}
