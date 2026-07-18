import type { AnalyticsProvider } from "../contracts/analytics-provider";
import { AnalyticsEvent } from "../events";
import { logger } from "../logger";
import { loadScript } from "./load-script";

interface Clarity {
  (...args: unknown[]): void;
  q?: unknown[];
}

declare global {
  interface Window {
    clarity?: Clarity;
  }
}

const nativeEvents = new Set<string>([AnalyticsEvent.PAGE_VIEW, AnalyticsEvent.SCROLL_90]);

export class ClarityProvider implements AnalyticsProvider {
  readonly name = "Clarity";

  constructor(private readonly projectId: string) {}

  init(): void {
    if (typeof window === "undefined" || window.clarity) return;
    const clarity = function (...args: unknown[]) {
      (clarity.q = clarity.q ?? []).push(args);
    } as Clarity;
    window.clarity = clarity;
    loadScript(`https://www.clarity.ms/tag/${this.projectId}`);
  }

  track(event: string): void {
    if (nativeEvents.has(event)) return;
    if (typeof window === "undefined" || typeof window.clarity !== "function") {
      logger.warn(`${this.name}: clarity indisponível, evento "${event}" descartado`);
      return;
    }
    window.clarity("event", event);
  }
}
