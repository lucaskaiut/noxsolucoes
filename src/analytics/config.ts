function flag(value: string | undefined): boolean {
  return value === "true" || value === "1";
}

export const analyticsConfig = {
  debug: flag(process.env.NEXT_PUBLIC_ANALYTICS_DEBUG),
  ga4: {
    enabled: flag(process.env.NEXT_PUBLIC_ANALYTICS_GA4),
    measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "",
  },
  googleAds: {
    enabled: flag(process.env.NEXT_PUBLIC_ANALYTICS_GOOGLE_ADS),
    conversionId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
    labels: {
      whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP ?? "",
      phone: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE ?? "",
      email: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_EMAIL ?? "",
    },
  },
  metaPixel: {
    enabled: flag(process.env.NEXT_PUBLIC_ANALYTICS_META_PIXEL),
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
  linkedIn: {
    enabled: flag(process.env.NEXT_PUBLIC_ANALYTICS_LINKEDIN),
    partnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "",
    leadConversionId: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID_LEAD ?? "",
  },
  clarity: {
    enabled: flag(process.env.NEXT_PUBLIC_ANALYTICS_CLARITY),
    projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "",
  },
} as const;
