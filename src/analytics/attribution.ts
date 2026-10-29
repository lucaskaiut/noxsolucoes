/**
 * Atribuição de cliques pagos (Google Ads) para leads que chegam pelo WhatsApp.
 *
 * O WhatsApp não devolve o GCLID; por isso, quando a sessão veio de um anúncio,
 * o clique no WhatsApp ganha um código curto (ex.: NX-7K4P2Q) no texto da
 * mensagem e o mesmo código é registrado no CMS junto do GCLID. Ao qualificar a
 * conversa, o time comercial marca o lead pelo código e o CMS exporta a
 * conversão offline para o Google Ads.
 */

export const CLICK_ID_PARAMS = ["gclid", "gbraid", "wbraid"] as const;
export const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type ClickIdParam = (typeof CLICK_ID_PARAMS)[number];
type UtmParam = (typeof UTM_PARAMS)[number];

export type Attribution = Partial<Record<ClickIdParam | UtmParam, string>> & {
  landing_path: string;
  captured_at: string;
  lead_ref?: string;
};

const MAX_PARAM_LENGTH = 255;
const SAFE_VALUE = /^[\w.~%:/+=-]+$/;
const REF_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const REF_PATTERN = /^NX-[2-9A-HJ-NP-Z]{6}$/;

function cleanParam(value: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed || trimmed.length > MAX_PARAM_LENGTH || !SAFE_VALUE.test(trimmed)) {
    return undefined;
  }
  return trimmed;
}

/** Lê click IDs e UTMs da URL; retorna null se não houver click ID do Google. */
export function parseAttribution(
  search: string,
  landingPath: string,
  now: Date = new Date(),
): Attribution | null {
  const params = new URLSearchParams(search);
  const attribution: Attribution = {
    landing_path: landingPath.slice(0, MAX_PARAM_LENGTH),
    captured_at: now.toISOString(),
  };
  let hasClickId = false;
  for (const key of CLICK_ID_PARAMS) {
    const value = cleanParam(params.get(key));
    if (value) {
      attribution[key] = value;
      hasClickId = true;
    }
  }
  if (!hasClickId) return null;
  for (const key of UTM_PARAMS) {
    const value = cleanParam(params.get(key));
    if (value) attribution[key] = value;
  }
  return attribution;
}

export function hasClickId(attribution: Partial<Attribution> | null): boolean {
  return CLICK_ID_PARAMS.some((key) => Boolean(attribution?.[key]));
}

/** Código curto, sem caracteres ambíguos (0/O, 1/I), fácil de ler na conversa. */
export function generateLeadRef(
  random: (size: number) => Uint8Array = (size) =>
    crypto.getRandomValues(new Uint8Array(size)),
): string {
  const bytes = random(6);
  let code = "";
  for (const byte of bytes) code += REF_ALPHABET[byte % REF_ALPHABET.length];
  return `NX-${code}`;
}

export function isLeadRef(value: unknown): value is string {
  return typeof value === "string" && REF_PATTERN.test(value);
}

/** Acrescenta o código ao texto pré-preenchido do link wa.me. */
export function appendRefToWhatsappHref(href: string, ref: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  const text = url.searchParams.get("text") ?? "";
  if (text.includes(ref)) return href;
  const suffix = `(código ${ref})`;
  url.searchParams.set("text", text ? `${text} ${suffix}` : suffix);
  return url.toString();
}

const STORAGE_KEY = "nox-attribution";

/** Guarda a atribuição só na sessão: o contato costuma acontecer na mesma visita. */
export function storeAttribution(attribution: Attribution): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Armazenamento bloqueado: segue sem atribuição.
  }
}

export function loadAttribution(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== "object") return null;
    return hasClickId(parsed as Attribution) ? (parsed as Attribution) : null;
  } catch {
    return null;
  }
}
