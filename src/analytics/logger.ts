import { analyticsConfig } from "./config";

export const logger = {
  debug(provider: string, event: string, payload?: unknown): void {
    if (!analyticsConfig.debug) return;
    console.info(`[Analytics] Provider: ${provider} | Event: ${event}`, payload ?? {});
  },
  warn(message: string, error?: unknown): void {
    if (!analyticsConfig.debug) return;
    console.warn(`[Analytics] ${message}`, error ?? "");
  },
};
