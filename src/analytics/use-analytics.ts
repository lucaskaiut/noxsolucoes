"use client";

import type { AnalyticsManager } from "./analytics-manager";
import { analytics } from "./index";

export function useAnalytics(): AnalyticsManager {
  return analytics;
}
