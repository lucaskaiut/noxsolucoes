"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, AnalyticsEvent, type AnalyticsPayload } from "@/analytics";

interface TrackedLink {
  event: AnalyticsEvent;
  payload: AnalyticsPayload;
}

function resolveLinkEvent(anchor: HTMLAnchorElement): TrackedLink | null {
  const href = anchor.getAttribute("href") ?? "";
  const label = anchor.textContent?.trim().slice(0, 80) ?? "";
  if (href.startsWith("mailto:")) {
    return { event: AnalyticsEvent.CLICK_EMAIL, payload: { label } };
  }
  if (href.startsWith("tel:")) {
    return { event: AnalyticsEvent.CLICK_PHONE, payload: { label } };
  }
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) {
    return {
      event: AnalyticsEvent.GENERATE_LEAD,
      payload: { channel: "whatsapp", label },
    };
  }
  return null;
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    analytics.init();
  }, []);

  useEffect(() => {
    if (!pathname) return;
    analytics.track(AnalyticsEvent.PAGE_VIEW, { path: pathname });
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - window.innerHeight;
      if (scrollable <= 0 || window.scrollY / scrollable < 0.9) return;
      window.removeEventListener("scroll", onScroll);
      analytics.track(AnalyticsEvent.SCROLL_90, { path: pathname });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const tracked = resolveLinkEvent(anchor);
      if (!tracked) return;
      analytics.track(tracked.event, {
        ...tracked.payload,
        path: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
