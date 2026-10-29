import { getConsent, googleConsentState } from "../consent";
import { loadScript } from "./load-script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Inicializa o gtag uma única vez, compartilhado entre GA4 e Google Ads.
 * O default de consentimento precisa vir antes de qualquer "config".
 */
export function ensureGtag(tagId: string): (...args: unknown[]) => void {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("consent", "default", {
      ...googleConsentState(getConsent()),
      wait_for_update: 500,
    });
    // Sem cookies, o GCLID segue pelos links internos e os dados de anúncio são redigidos.
    window.gtag("set", "url_passthrough", true);
    window.gtag("set", "ads_data_redaction", true);
    window.gtag("js", new Date());
    // Um único gtag.js atende todos os IDs; os demais entram só via "config".
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${tagId}`);
  }
  return window.gtag;
}
