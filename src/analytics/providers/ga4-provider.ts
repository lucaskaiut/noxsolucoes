import type { AnalyticsPayload, AnalyticsProvider } from "../contracts/analytics-provider";
import { logger } from "../logger";
import { loadScript } from "./load-script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export class Ga4Provider implements AnalyticsProvider {
  readonly name = "GA4";

  constructor(private readonly measurementId: string) {}

  init(): void {
    if (typeof window === "undefined" || window.gtag) return;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", this.measurementId, { send_page_view: false });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`);
  }

  track(event: string, payload?: AnalyticsPayload): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      logger.warn(`${this.name}: gtag indisponível, evento "${event}" descartado`);
      return;
    }
    window.gtag("event", event, payload ?? {});
  }
}
