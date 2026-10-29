import type { AnalyticsPayload, AnalyticsProvider } from "../contracts/analytics-provider";
import { AnalyticsEvent } from "../events";
import { logger } from "../logger";
import { ensureGtag } from "./gtag";

export type ContactChannel = "whatsapp" | "phone" | "email";

const conversionEvents = new Set<string>([
  AnalyticsEvent.GENERATE_LEAD,
  AnalyticsEvent.CONTACT,
  AnalyticsEvent.CLICK_PHONE,
  AnalyticsEvent.CLICK_EMAIL,
]);

/**
 * Conversões do Google Ads por canal de contato. O canal vem do payload
 * (preenchido pelo AnalyticsTracker a partir do href), não do nome do evento:
 * o mesmo "generate_lead" pode apontar para WhatsApp ou e-mail.
 */
export class GoogleAdsProvider implements AnalyticsProvider {
  readonly name = "Google Ads";

  constructor(
    private readonly conversionId: string,
    private readonly labels: Partial<Record<ContactChannel, string>>,
  ) {}

  init(): void {
    if (typeof window === "undefined") return;
    ensureGtag(this.conversionId)("config", this.conversionId);
  }

  track(event: string, payload?: AnalyticsPayload): void {
    if (!conversionEvents.has(event)) return;
    const channel = payload?.channel as ContactChannel | undefined;
    const label = channel ? this.labels[channel] : undefined;
    if (!label) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      logger.warn(`${this.name}: gtag indisponível, conversão "${channel}" descartada`);
      return;
    }
    const ref = typeof payload?.lead_ref === "string" ? payload.lead_ref : undefined;
    window.gtag("event", "conversion", {
      send_to: `${this.conversionId}/${label}`,
      ...(ref ? { transaction_id: ref } : {}),
    });
  }
}
