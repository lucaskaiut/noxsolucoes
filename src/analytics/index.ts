import { AnalyticsManager } from "./analytics-manager";
import { analyticsConfig } from "./config";
import { AnalyticsEvent } from "./events";
import { ClarityProvider } from "./providers/clarity-provider";
import { Ga4Provider } from "./providers/ga4-provider";
import { GoogleAdsProvider } from "./providers/google-ads-provider";
import { LinkedInProvider } from "./providers/linkedin-provider";
import { MetaPixelProvider } from "./providers/meta-pixel-provider";

function createAnalytics(): AnalyticsManager {
  const manager = new AnalyticsManager();
  const { ga4, googleAds, metaPixel, linkedIn, clarity } = analyticsConfig;

  if (ga4.enabled && ga4.measurementId) {
    manager.register(new Ga4Provider(ga4.measurementId));
  }

  if (googleAds.enabled && googleAds.conversionId) {
    manager.register(new GoogleAdsProvider(googleAds.conversionId, googleAds.labels));
  }

  if (metaPixel.enabled && metaPixel.pixelId) {
    manager.register(new MetaPixelProvider(metaPixel.pixelId));
  }

  if (linkedIn.enabled && linkedIn.partnerId) {
    const conversionIds: Partial<Record<string, number>> = {};
    const leadConversionId = Number(linkedIn.leadConversionId);
    if (Number.isFinite(leadConversionId) && leadConversionId > 0) {
      conversionIds[AnalyticsEvent.GENERATE_LEAD] = leadConversionId;
    }
    manager.register(new LinkedInProvider(linkedIn.partnerId, conversionIds));
  }

  if (clarity.enabled && clarity.projectId) {
    manager.register(new ClarityProvider(clarity.projectId));
  }

  return manager;
}

export const analytics = createAnalytics();

/** Banner de cookies só aparece quando há alguma tag de terceiros ativa. */
export const hasTrackingProviders = analytics.providerCount > 0;

export { AnalyticsEvent } from "./events";
export type { AnalyticsPayload, AnalyticsProvider } from "./contracts/analytics-provider";
