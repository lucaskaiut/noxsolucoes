import type { AnalyticsPayload, AnalyticsProvider } from "../contracts/analytics-provider";
import { logger } from "../logger";
import { ensureGtag } from "./gtag";

export class Ga4Provider implements AnalyticsProvider {
  readonly name = "GA4";

  constructor(private readonly measurementId: string) {}

  init(): void {
    if (typeof window === "undefined") return;
    ensureGtag(this.measurementId)("config", this.measurementId, { send_page_view: false });
  }

  track(event: string, payload?: AnalyticsPayload): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      logger.warn(`${this.name}: gtag indisponível, evento "${event}" descartado`);
      return;
    }
    window.gtag("event", event, payload ?? {});
  }
}
