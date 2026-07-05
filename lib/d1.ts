// Client per Cloudflare D1 via REST API (usato da Vercel, dove non esistono i
// binding nativi di Cloudflare). Tutte le query passano per l'endpoint /query.

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

function endpoint(): string {
  if (!ACCOUNT_ID || !DATABASE_ID || !API_TOKEN) {
    throw new Error(
      "Config D1 mancante: CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_D1_DATABASE_ID / CLOUDFLARE_API_TOKEN"
    );
  }
  return `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;
}

interface D1Result<T> {
  results: T[];
  success: boolean;
  meta: {
    last_row_id: number;
    changes: number;
    rows_read: number;
    rows_written: number;
  };
}

interface D1Response<T> {
  result: D1Result<T>[];
  success: boolean;
  errors: { code: number; message: string }[];
}

async function call<T>(sql: string, params: unknown[] = []): Promise<D1Result<T>[]> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    cache: "no-store",
  });

  const data = (await res.json()) as D1Response<T>;
  if (!res.ok || !data.success) {
    throw new Error(
      "D1 query fallita: " + JSON.stringify(data.errors ?? res.statusText)
    );
  }
  return data.result;
}

/** SELECT: ritorna le righe. */
export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const result = await call<T>(sql, params);
  return result[0]?.results ?? [];
}

/** Prima riga o null. */
export async function d1First<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await d1Query<T>(sql, params);
  return rows[0] ?? null;
}

/** INSERT/UPDATE/DELETE: ritorna i meta (last_row_id, changes). */
export async function d1Run(
  sql: string,
  params: unknown[] = []
): Promise<{ last_row_id: number; changes: number }> {
  const result = await call(sql, params);
  return {
    last_row_id: result[0]?.meta.last_row_id ?? 0,
    changes: result[0]?.meta.changes ?? 0,
  };
}

/** Esegue più statement in un'unica chiamata (senza parametri). */
export async function d1Exec(sql: string): Promise<void> {
  await call(sql, []);
}
