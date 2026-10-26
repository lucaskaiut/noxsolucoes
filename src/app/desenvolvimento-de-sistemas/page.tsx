import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import {
  ArrowRightIcon,
  CheckIcon,
  Icon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { caseStudies } from "@/lib/case-studies";
import { technologies } from "@/lib/data";
import { buildServiceLandingJsonLd } from "@/lib/schema";
import { links, site } from "@/lib/site";
import { systemDevelopmentLanding } from "@/lib/system-development-landing";

const content = systemDevelopmentLanding;

const whatsappPayload = JSON.stringify({
  source: "landing_sistemas_sob_medida",
  channel: "whatsapp",
});

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  keywords: [...content.keywords],
  alternates: {
    canonical: content.path,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${site.url}${content.path}`,
    siteName: site.name,
    title: content.metaTitle,
    description: content.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: content.metaTitle,
    description: content.metaDescription,
  },
};

export default function SystemDevelopmentPage() {
  const highlightedCases = content.credibility.caseSlugs.flatMap((slug) => {
    const caseStudy = caseStudies.find((item) => item.slug === slug);
    return caseStudy ? [caseStudy] : [];
  });

  const jsonLd = buildServiceLandingJsonLd({
    path: content.path,
    name: content.metaTitle,
    description: content.metaDescription,
    breadcrumbLabel: "Desenvolvimento de Sistemas",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header variant="campaign" />
      <main id="conteudo" className="flex-1">
        <section
          id="inicio"
          aria-labelledby="hero-heading"
          className="pt-32 pb-16 sm:pt-36 sm:pb-20"
        >
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-700 shadow-sm shadow-slate-900/5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                {content.hero.eyebrow}
              </p>

              <h1
                id="hero-heading"
                className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              >
                {content.hero.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                {content.hero.subtitle}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="generate_lead"
                  data-analytics-payload={whatsappPayload}
                  className="w-full sm:w-auto"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {content.hero.ctaLabel}
                </ButtonLink>
              </div>

              <p className="mt-6 text-sm text-slate-500">
                {content.hero.note}
              </p>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="problemas-heading"
          className="bg-ice-100 py-16 sm:py-20"
        >
          <Container>
            <SectionHeading
              id="problemas-heading"
              eyebrow="Problemas comuns"
              title="Sua operação ainda depende de controles manuais?"
              description="Situações comuns em empresas que cresceram com planilhas e processos improvisados — e como um sistema sob medida pode ajudar."
            />

            <ol className="mx-auto mt-12 max-w-4xl divide-y divide-ice-200 rounded-2xl bg-white px-6 shadow-sm shadow-slate-900/5 sm:px-8">
              {content.problems.map((problem, index) => (
                <li
                  key={problem.title}
                  className="grid gap-3 py-6 sm:grid-cols-[auto_1fr] sm:gap-5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-700"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {problem.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {problem.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section
          aria-labelledby="solucoes-heading"
          className="py-16 sm:py-20"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                id="solucoes-heading"
                eyebrow="Soluções"
                title="O que podemos desenvolver"
                description="Serviços que podem ser combinados conforme a necessidade da sua operação."
                align="left"
              />

              <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {content.solutions.map((solution) => (
                  <li key={solution.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                      <Icon name={solution.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {solution.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {solution.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="processo-heading"
          className="bg-ice-100 py-16 sm:py-20"
        >
          <Container>
            <SectionHeading
              id="processo-heading"
              eyebrow="Como funciona"
              title="Um processo claro para chegar à solução"
              description="Do primeiro contato ao desenvolvimento, cada etapa é alinhada com a sua empresa."
            />

            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-900/5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white"
                    >
                      {index + 1}
                    </span>
                    <h3 className="text-base font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-600">
              Escopo, requisitos e condições comerciais são definidos em
              proposta antes do início do desenvolvimento.
            </p>
          </Container>
        </section>

        <section
          aria-labelledby="experiencia-heading"
          className="py-16 sm:py-20"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <SectionHeading
                  id="experiencia-heading"
                  eyebrow={content.credibility.eyebrow}
                  title={content.credibility.title}
                  description={content.credibility.description}
                  align="left"
                />

                <ul className="mt-8 space-y-4">
                  {highlightedCases.map((caseStudy) => (
                    <li key={caseStudy.slug}>
                      <Link
                        href={`/cases/${caseStudy.slug}`}
                        className="group block rounded-2xl border border-ice-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition-colors hover:border-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                      >
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                          {caseStudy.category}
                        </span>
                        <h3 className="mt-1 text-base font-semibold text-slate-900">
                          {caseStudy.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                          {caseStudy.shortDescription}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                          Ver case
                          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/cases"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                >
                  Ver todos os cases
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-2xl bg-ice-100 p-7">
                <h3 className="text-lg font-semibold text-slate-900">
                  {content.credibility.principlesTitle}
                </h3>
                <ul className="mt-5 space-y-3">
                  {content.credibility.principles.map((principle) => (
                    <li key={principle} className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span className="text-sm leading-relaxed text-slate-600">
                        {principle}
                      </span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-lg font-semibold text-slate-900">
                  {content.credibility.technologiesTitle}
                </h3>
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label="Tecnologias utilizadas pela Nox"
                >
                  {technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm shadow-slate-900/5"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section aria-labelledby="cta-heading" className="py-16 sm:py-20">
          <Container>
            <div className="rounded-3xl bg-slate-900 px-6 py-14 text-center shadow-xl shadow-slate-900/20 sm:px-16 sm:py-16">
              <h2
                id="cta-heading"
                className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {content.finalCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {content.finalCta.description}
              </p>

              <div className="mt-8 flex justify-center">
                <ButtonLink
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="generate_lead"
                  data-analytics-payload={whatsappPayload}
                  className="w-full sm:w-auto"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {content.finalCta.buttonLabel}
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
