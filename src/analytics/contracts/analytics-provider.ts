export type AnalyticsPayload = Record<string, unknown>;

export interface AnalyticsProvider {
  readonly name: string;
  init?(): void;
  track(event: string, payload?: AnalyticsPayload): void;
}
