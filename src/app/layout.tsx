import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title =
  "Nox Soluções em Tecnologia | Desenvolvimento de Software Sob Medida";
const description =
  "Software house especializada em sistemas web (ERP, CRM, SaaS), aplicativos mobile, integrações de APIs e inteligência artificial. Desenvolvimento sob medida para empresas que querem crescer.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "desenvolvimento de software",
    "software house",
    "sistemas web sob medida",
    "desenvolvimento de aplicativos",
    "plataforma SaaS",
    "ERP sob medida",
    "CRM sob medida",
    "inteligência artificial para empresas",
    "integração de APIs",
    "consultoria tecnológica",
    "Nox Soluções em Tecnologia",
    "Curitiba",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: "https://placehold.co/1200x630/eaf0f8/7c3aed/png?text=Nox+Solu%C3%A7%C3%B5es+em+Tecnologia",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      "https://placehold.co/1200x630/eaf0f8/7c3aed/png?text=Nox+Solu%C3%A7%C3%B5es+em+Tecnologia",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f8fc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ice-50 font-sans text-slate-600">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
