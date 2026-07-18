import { faqs } from "@/lib/data";
import type { CaseStudy } from "@/lib/case-studies";
import type { ServicePage } from "@/lib/service-pages";
import { site } from "@/lib/site";

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const localBusinessId = `${site.url}/#localbusiness`;

export function buildJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        email: site.email,
        telephone: site.phoneE164,
        description: site.description,
        foundingDate: String(site.foundingYear),
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/icon.svg`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.locality,
          addressRegion: site.region,
          addressCountry: site.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phoneE164,
          email: site.email,
          contactType: "sales",
          availableLanguage: ["Portuguese"],
        },
        knowsAbout: [
          "Desenvolvimento de software",
          "Sistemas web",
          "Aplicativos mobile",
          "Inteligência artificial",
          "Integrações de APIs",
          "Consultoria tecnológica",
        ],
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": localBusinessId,
        name: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phoneE164,
        description: site.description,
        priceRange: "$$",
        image: `${site.url}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.locality,
          addressRegion: site.region,
          addressCountry: site.country,
        },
        areaServed: {
          "@type": "Country",
          name: "Brasil",
        },
        parentOrganization: { "@id": organizationId },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de Tecnologia",
          itemListElement: [
            "Desenvolvimento de Sistemas Web",
            "Aplicativos Mobile",
            "Integrações de APIs e Pagamentos",
            "Inteligência Artificial e Automação",
            "Consultoria Tecnológica",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              provider: { "@id": organizationId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": organizationId },
        inLanguage: "pt-BR",
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: `${site.name} — Desenvolvimento de Software Sob Medida`,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: "pt-BR",
        breadcrumb: { "@id": `${site.url}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: site.url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function buildServicePageJsonLd(page: ServicePage) {
  const pageUrl = `${site.url}/${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: page.metaTitle,
        description: page.metaDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: "pt-BR",
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.navLabel,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        name: page.navLabel,
        description: page.metaDescription,
        url: pageUrl,
        serviceType: page.navLabel,
        provider: { "@id": organizationId },
        areaServed: {
          "@type": "Country",
          name: "Brasil",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function buildCasesListJsonLd(cases: CaseStudy[]) {
  const pageUrl = `${site.url}/cases`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: "Cases de Sucesso | Nox Soluções em Tecnologia",
        description:
          "Projetos reais de software desenvolvidos pela Nox: sistemas web, SaaS, CRMs e soluções com inteligência artificial.",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: "pt-BR",
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cases",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}/#lista`,
        itemListElement: cases.map((caseStudy, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: caseStudy.title,
          url: `${pageUrl}/${caseStudy.slug}`,
        })),
      },
    ],
  };
}

export function buildCaseStudyJsonLd(caseStudy: CaseStudy) {
  const pageUrl = `${site.url}/cases/${caseStudy.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `Case ${caseStudy.title} | ${caseStudy.tagline}`,
        description: caseStudy.shortDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: "pt-BR",
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cases",
            item: `${site.url}/cases`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: caseStudy.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}/#article`,
        headline: `Case ${caseStudy.title}: ${caseStudy.tagline}`,
        description: caseStudy.shortDescription,
        image: `${site.url}${caseStudy.coverImage}`,
        datePublished: caseStudy.publishedAt,
        dateModified: caseStudy.publishedAt,
        inLanguage: "pt-BR",
        keywords: caseStudy.keywords.join(", "),
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        mainEntityOfPage: { "@id": `${pageUrl}/#webpage` },
        about: {
          "@type": "SoftwareApplication",
          name: caseStudy.title,
          description: caseStudy.shortDescription,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
        },
      },
    ],
  };
}
