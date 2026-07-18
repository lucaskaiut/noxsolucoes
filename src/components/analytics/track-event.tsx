"use client";

import { useEffect } from "react";
import { analytics, type AnalyticsEvent, type AnalyticsPayload } from "@/analytics";

interface TrackEventProps {
  event: AnalyticsEvent;
  payload?: AnalyticsPayload;
}

export function TrackEvent({ event, payload }: TrackEventProps) {
  useEffect(() => {
    analytics.track(event, payload);
  }, [event, payload]);

  return null;
}
