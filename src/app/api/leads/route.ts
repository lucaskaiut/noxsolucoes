import { type NextRequest, NextResponse } from "next/server";
import { parseLeadPayload } from "@/modules/leads/lead-payload";

const MAX_BODY_BYTES = 4096;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const CMS_TIMEOUT_MS = 5_000;

const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const recent = (rateLimitMap.get(identifier) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) return false;
  recent.push(now);
  rateLimitMap.set(identifier, recent);
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of rateLimitMap) {
    if (timestamps.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) rateLimitMap.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS).unref();

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // sendBeacon pode omitir Origin em navegadores antigos
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/**
 * Recebe o registro de lead do navegador (clique no WhatsApp vindo de anúncio)
 * e repassa ao CMS com o token do servidor. Sempre responde rápido: falha no
 * CMS não pode atrapalhar a ida do visitante ao WhatsApp.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const payload = parseLeadPayload(parsed);
  if (!payload) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  const baseUrl = process.env.CMS_API_URL;
  const token = process.env.CMS_LEADS_TOKEN || process.env.CMS_API_TOKEN;
  if (!baseUrl || !token) {
    console.warn("[Leads] CMS_API_URL/CMS_LEADS_TOKEN não configurados; lead descartado");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  try {
    const response = await fetch(`${baseUrl}/api/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(CMS_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.warn(`[Leads] CMS respondeu ${response.status} para ${payload.ref}`);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch {
    console.warn(`[Leads] CMS indisponível para ${payload.ref}`);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true, ref: payload.ref }, { status: 202 });
}
