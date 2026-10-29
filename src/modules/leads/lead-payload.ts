import { CLICK_ID_PARAMS, UTM_PARAMS, isLeadRef } from "../../analytics/attribution.ts";

export interface LeadPayload {
  ref: string;
  channel: "whatsapp";
  consent: "granted" | "denied" | "unknown";
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_path?: string;
  click_path?: string;
  captured_at?: string;
}

const MAX_LENGTH = 255;
const SAFE_VALUE = /^[\w.~%:/+=-]+$/;
const PATH = /^\/[\w\-./]*$/;
const CONSENT_VALUES = new Set(["granted", "denied", "unknown"]);

function optional(value: unknown, pattern: RegExp): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_LENGTH || !pattern.test(trimmed)) return undefined;
  return trimmed;
}

/**
 * Normaliza o corpo vindo do navegador. Campos desconhecidos são descartados;
 * sem código válido ou sem click ID do Google, o lead não é registrado.
 */
export function parseLeadPayload(input: unknown): LeadPayload | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const body = input as Record<string, unknown>;
  if (!isLeadRef(body.ref) || body.channel !== "whatsapp") return null;

  const payload: LeadPayload = {
    ref: body.ref,
    channel: "whatsapp",
    consent: CONSENT_VALUES.has(body.consent as string)
      ? (body.consent as LeadPayload["consent"])
      : "unknown",
  };
  for (const key of [...CLICK_ID_PARAMS, ...UTM_PARAMS]) {
    const value = optional(body[key], SAFE_VALUE);
    if (value) payload[key] = value;
  }
  if (!CLICK_ID_PARAMS.some((key) => payload[key])) return null;

  const landing = optional(body.landing_path, PATH);
  if (landing) payload.landing_path = landing;
  const click = optional(body.click_path, PATH);
  if (click) payload.click_path = click;
  if (typeof body.captured_at === "string" && !Number.isNaN(Date.parse(body.captured_at))) {
    payload.captured_at = new Date(body.captured_at).toISOString();
  }
  return payload;
}
