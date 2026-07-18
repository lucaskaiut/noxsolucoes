import type { AnalyticsProvider } from "../contracts/analytics-provider";
import { logger } from "../logger";
import { loadScript } from "./load-script";

interface Lintrk {
  (...args: unknown[]): void;
  q: unknown[];
}

declare global {
  interface Window {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    lintrk?: Lintrk;
  }
}

export class LinkedInProvider implements AnalyticsProvider {
  readonly name = "LinkedIn";

  constructor(
    private readonly partnerId: string,
    private readonly conversionIds: Partial<Record<string, number>> = {},
  ) {}

  init(): void {
    if (typeof window === "undefined" || window.lintrk) return;
    window._linkedin_partner_id = this.partnerId;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids ?? [];
    window._linkedin_data_partner_ids.push(this.partnerId);
    const queue: unknown[] = [];
    const lintrk = function (...args: unknown[]) {
      lintrk.q.push(args);
    } as Lintrk;
    lintrk.q = queue;
    window.lintrk = lintrk;
    loadScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }

  track(event: string): void {
    const conversionId = this.conversionIds[event];
    if (conversionId === undefined) return;
    if (typeof window === "undefined" || typeof window.lintrk !== "function") {
      logger.warn(`${this.name}: lintrk indisponível, evento "${event}" descartado`);
      return;
    }
    window.lintrk("track", { conversion_id: conversionId });
  }
}
