import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackEvent } from "@/components/analytics/track-event";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { AnalyticsEvent } from "@/analytics";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { buildCaseStudyJsonLd } from "@/lib/schema";
import { links, site } from "@/lib/site";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {};
  }

  const title = `Case ${caseStudy.title} | ${caseStudy.tagline}`;

  return {
    title,
    description: caseStudy.shortDescription,
    keywords: caseStudy.keywords,
    alternates: {
      canonical: `/cases/${caseStudy.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: `${site.url}/cases/${caseStudy.slug}`,
      siteName: site.name,
      title,
      description: caseStudy.shortDescription,
      publishedTime: caseStudy.publishedAt,
      images: [
        {
          url: caseStudy.coverImage,
          width: 1918,
          height: 912,
          alt: `Tela do sistema ${caseStudy.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: caseStudy.shortDescription,
      images: [caseStudy.coverImage],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const jsonLd = buildCaseStudyJsonLd(caseStudy);
  const leadPayload = JSON.stringify({ source: "case", caseSlug: caseStudy.slug });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TrackEvent
        event={AnalyticsEvent.VIEW_CASE}
        payload={{ slug: caseStudy.slug, title: caseStudy.title }}
      />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <section
          aria-labelledby="case-heading"
          className="pt-32 pb-12 sm:pt-40 sm:pb-16"
        >
          <Container>
            <nav aria-label="Trilha de navegação" className="text-sm">
              <ol className="flex items-center gap-2 text-slate-500">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                  >
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/cases"
                    className="transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                  >
                    Cases
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-slate-700">
                  {caseStudy.title}
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                {caseStudy.category}
              </p>
              <h1
                id="case-heading"
                className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              >
                {caseStudy.title}
              </h1>
              <p className="mt-3 text-xl font-semibold text-brand-600">
                {caseStudy.tagline}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                {caseStudy.shortDescription}
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl bg-white p-2 shadow-xl shadow-slate-900/10">
              <Image
                src={caseStudy.coverImage}
                alt={`Tela do sistema ${caseStudy.title}`}
                width={1918}
                height={912}
                preload
                fetchPriority="high"
                className="w-full rounded-xl object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </Container>
        </section>

        <section aria-labelledby="sobre-heading" className="pb-16 sm:pb-20">
          <Container>
            <div className="max-w-3xl">
              <h2
                id="sobre-heading"
                className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                O que é o {caseStudy.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                {caseStudy.description}
              </p>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="desafio-heading"
          className="bg-ice-100 py-16 sm:py-20"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2
                  id="desafio-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                >
                  O desafio
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  {caseStudy.challenge}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  A solução da Nox
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section aria-labelledby="stack-case-heading" className="py-16 sm:py-20">
          <Container>
            <h2
              id="stack-case-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Tecnologias utilizadas
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {caseStudy.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/5"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section
          aria-labelledby="resultados-heading"
          className="bg-ice-100 py-16 sm:py-20"
        >
          <Container>
            <h2
              id="resultados-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Resultados entregues
            </h2>
            <ul className="mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
              {caseStudy.results.map((result) => (
                <li
                  key={result}
                  className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm shadow-slate-900/5"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span className="text-sm leading-relaxed text-slate-600">
                    {result}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section aria-labelledby="case-cta-heading" className="py-20 sm:py-28">
          <Container>
            <div className="rounded-2xl bg-white p-8 text-center shadow-md shadow-slate-900/5 sm:p-12">
              <h2
                id="case-cta-heading"
                className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                Vamos construir algo semelhante?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                Conte o desafio do seu negócio e receba uma proposta de solução
                sob medida, como o {caseStudy.title}.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink
                  href={links.email}
                  data-analytics-event="generate_lead"
                  data-analytics-payload={leadPayload}
                >
                  Solicitar orçamento
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href={links.whatsapp}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="contact"
                  data-analytics-payload={leadPayload}
                >
                  <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
                  Falar no WhatsApp
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
