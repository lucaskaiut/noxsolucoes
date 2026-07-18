import type { AnalyticsPayload, AnalyticsProvider } from "./contracts/analytics-provider";
import { AnalyticsEvent } from "./events";
import { logger } from "./logger";

interface QueuedEvent {
  event: AnalyticsEvent;
  payload?: AnalyticsPayload;
}

const DEBOUNCE_WINDOW_MS = 500;
const MAX_TRACKED_KEYS = 100;

const knownEvents = new Set<string>(Object.values(AnalyticsEvent));

function eventKey(event: string, payload?: AnalyticsPayload): string {
  try {
    return `${event}:${JSON.stringify(payload ?? {})}`;
  } catch {
    return event;
  }
}

export class AnalyticsManager {
  private readonly providers: AnalyticsProvider[] = [];
  private readonly queue: QueuedEvent[] = [];
  private readonly recentEvents = new Map<string, number>();
  private initialized = false;

  register(provider: AnalyticsProvider): void {
    this.providers.push(provider);
  }

  init(): void {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;
    for (const provider of this.providers) {
      try {
        provider.init?.();
      } catch (error) {
        logger.warn(`Falha ao inicializar provider "${provider.name}"`, error);
      }
    }
    for (const { event, payload } of this.queue.splice(0)) {
      this.dispatch(event, payload);
    }
  }

  track(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
    if (typeof window === "undefined") return;
    if (!this.isValid(event, payload)) return;
    if (this.isDebounced(event, payload)) return;
    if (!this.initialized) {
      this.queue.push({ event, payload });
      return;
    }
    this.dispatch(event, payload);
  }

  private dispatch(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
    for (const provider of this.providers) {
      logger.debug(provider.name, event, payload);
      try {
        provider.track(event, payload);
      } catch (error) {
        logger.warn(`Provider "${provider.name}" falhou no evento "${event}"`, error);
      }
    }
  }

  private isValid(event: string, payload?: AnalyticsPayload): boolean {
    if (!knownEvents.has(event)) {
      logger.warn(`Evento desconhecido descartado: "${event}"`);
      return false;
    }
    if (
      payload !== undefined &&
      (typeof payload !== "object" || payload === null || Array.isArray(payload))
    ) {
      logger.warn(`Payload inválido descartado no evento "${event}"`);
      return false;
    }
    return true;
  }

  private isDebounced(event: AnalyticsEvent, payload?: AnalyticsPayload): boolean {
    const key = eventKey(event, payload);
    const now = Date.now();
    const last = this.recentEvents.get(key);
    if (last !== undefined && now - last < DEBOUNCE_WINDOW_MS) return true;
    if (this.recentEvents.size >= MAX_TRACKED_KEYS) {
      for (const [staleKey, timestamp] of this.recentEvents) {
        if (now - timestamp >= DEBOUNCE_WINDOW_MS) this.recentEvents.delete(staleKey);
      }
    }
    this.recentEvents.set(key, now);
    return false;
  }
}
