/**
 * Consentimento de cookies (LGPD) + Google Consent Mode v2.
 *
 * Sem escolha registrada, tudo começa negado: as tags do Google só enviam
 * pings sem cookies (modelagem de conversões) até o visitante aceitar.
 */

export type ConsentChoice = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "nox-consent-v1";

type GoogleConsentState = Record<
  "ad_storage" | "ad_user_data" | "ad_personalization" | "analytics_storage",
  ConsentChoice
>;

const listeners = new Set<(choice: ConsentChoice | null) => void>();

export function googleConsentState(choice: ConsentChoice | null): GoogleConsentState {
  const value = choice ?? "denied";
  return {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  };
}

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Armazenamento bloqueado: a escolha vale só para esta página.
  }
  window.gtag?.("consent", "update", googleConsentState(choice));
  for (const listener of listeners) listener(choice);
}

/** Apaga a escolha salva: as tags voltam a "negado" e o banner reaparece. */
export function resetConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Armazenamento bloqueado: não havia escolha persistida.
  }
  window.gtag?.("consent", "update", googleConsentState(null));
  for (const listener of listeners) listener(null);
}

export function onConsentChange(listener: (choice: ConsentChoice | null) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
