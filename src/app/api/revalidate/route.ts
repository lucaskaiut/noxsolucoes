import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const VALID_TAGS = new Set([
  "blog-posts",
  "blog-categories",
  "blog-sitemap",
]);

function isValidTag(tag: string): boolean {
  if (VALID_TAGS.has(tag)) return true;
  if (/^blog-post-[\w-]+$/.test(tag)) return true;
  return false;
}

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) ?? [];

  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(identifier, recent);
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of rateLimitMap) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, valid);
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref();

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");

  return handleRevalidate(request, secret, tag);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let secret: string | null = null;
  let tag: string | null = null;

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const body = await request.json();
      secret = body.secret ?? null;
      tag = body.tag ?? body.slug ? `blog-post-${body.slug}` : null;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 },
      );
    }
  } else {
    const { searchParams } = new URL(request.url);
    secret = searchParams.get("secret");
    tag = searchParams.get("tag");
  }

  return handleRevalidate(request, secret, tag);
}

function handleRevalidate(
  request: NextRequest,
  secret: string | null,
  tag: string | null,
): NextResponse {
  const expectedSecret = process.env.REVALIDATION_SECRET;

  if (!expectedSecret) {
    console.warn("[Revalidate] REVALIDATION_SECRET not configured");
    return NextResponse.json(
      { ok: false, error: "Server not configured" },
      { status: 500 },
    );
  }

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, error: "Invalid secret" },
      { status: 401 },
    );
  }

  if (!tag) {
    return NextResponse.json(
      { ok: false, error: 'Missing "tag" parameter' },
      { status: 400 },
    );
  }

  if (!isValidTag(tag)) {
    return NextResponse.json(
      { ok: false, error: `Invalid tag: "${tag}"` },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 },
    );
  }

  revalidateTag(tag, "max");

  console.log(`[Revalidate] Tag "${tag}" invalidated`);

  return NextResponse.json({
    ok: true,
    tag,
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
