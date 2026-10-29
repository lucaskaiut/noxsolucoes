"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, AnalyticsEvent, type AnalyticsPayload } from "@/analytics";
import {
  appendRefToWhatsappHref,
  generateLeadRef,
  loadAttribution,
  parseAttribution,
  storeAttribution,
} from "@/analytics/attribution";
import { getConsent } from "@/analytics/consent";

interface TrackedLink {
  event: AnalyticsEvent;
  payload: AnalyticsPayload;
}

function channelFromHref(href: string): string | undefined {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) return "whatsapp";
  return undefined;
}

/**
 * Sessão vinda de anúncio: põe um código na mensagem do WhatsApp e registra o
 * lead (código + GCLID) para a conversão offline. Sem clique pago, não faz nada.
 */
function registerWhatsappLead(anchor: HTMLAnchorElement, path: string): string | undefined {
  const attribution = loadAttribution();
  if (!attribution) return undefined;
  // Um código por sessão: cliques repetidos atualizam o mesmo lead no CMS.
  const ref = attribution.lead_ref ?? generateLeadRef();
  if (!attribution.lead_ref) storeAttribution({ ...attribution, lead_ref: ref });
  anchor.dataset.originalHref ??= anchor.href;
  anchor.href = appendRefToWhatsappHref(anchor.dataset.originalHref, ref);
  const body = JSON.stringify({
    ...attribution,
    ref,
    channel: "whatsapp",
    click_path: path,
    consent: getConsent() ?? "unknown",
  });
  const blob = new Blob([body], { type: "application/json" });
  if (!navigator.sendBeacon?.("/api/leads", blob)) {
    void fetch("/api/leads", {
      method: "POST",
      body,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => undefined);
  }
  return ref;
}

function resolveExplicitEvent(anchor: HTMLAnchorElement): TrackedLink | null {
  const event = anchor.getAttribute("data-analytics-event");
  if (!event) return null;
  let payload: AnalyticsPayload = {};
  const rawPayload = anchor.getAttribute("data-analytics-payload");
  if (rawPayload) {
    try {
      const parsed: unknown = JSON.parse(rawPayload);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        payload = parsed as AnalyticsPayload;
      }
    } catch {
      payload = {};
    }
  }
  return { event: event as AnalyticsEvent, payload };
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
    const attribution = parseAttribution(window.location.search, pathname);
    if (attribution) storeAttribution(attribution);
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
      const tracked = resolveExplicitEvent(anchor) ?? resolveLinkEvent(anchor);
      if (!tracked) return;
      const path = window.location.pathname;
      const payload: AnalyticsPayload = { ...tracked.payload, path };
      payload.channel ??= channelFromHref(anchor.getAttribute("href") ?? "");
      if (payload.channel === "whatsapp") {
        const ref = registerWhatsappLead(anchor, path);
        if (ref) payload.lead_ref = ref;
      }
      analytics.track(tracked.event, payload);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
