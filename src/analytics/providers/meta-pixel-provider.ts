import type { AnalyticsPayload, AnalyticsProvider } from "../contracts/analytics-provider";
import { AnalyticsEvent } from "../events";
import { logger } from "../logger";
import { loadScript } from "./load-script";

interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const standardEvents: Partial<Record<string, string>> = {
  [AnalyticsEvent.PAGE_VIEW]: "PageView",
  [AnalyticsEvent.GENERATE_LEAD]: "Lead",
  [AnalyticsEvent.CONTACT]: "Contact",
  [AnalyticsEvent.CLICK_PHONE]: "Contact",
  [AnalyticsEvent.CLICK_EMAIL]: "Contact",
  [AnalyticsEvent.VIEW_SERVICE]: "ViewContent",
};

export class MetaPixelProvider implements AnalyticsProvider {
  readonly name = "MetaPixel";

  constructor(private readonly pixelId: string) {}

  init(): void {
    if (typeof window === "undefined" || window.fbq) return;
    const queue: unknown[] = [];
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as Fbq;
    fbq.queue = queue;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", this.pixelId);
  }

  track(event: string, payload?: AnalyticsPayload): void {
    if (typeof window === "undefined" || typeof window.fbq !== "function") {
      logger.warn(`${this.name}: fbq indisponível, evento "${event}" descartado`);
      return;
    }
    const standard = standardEvents[event];
    if (standard) {
      window.fbq("track", standard, payload ?? {});
    } else {
      window.fbq("trackCustom", event, payload ?? {});
    }
  }
}
