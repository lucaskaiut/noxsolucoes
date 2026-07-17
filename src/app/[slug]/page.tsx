import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  Icon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { buildServicePageJsonLd } from "@/lib/schema";
import { getServicePage, servicePages } from "@/lib/service-pages";
import { links, site } from "@/lib/site";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: `${site.url}/${page.slug}`,
      siteName: site.name,
      title: page.metaTitle,
      description: page.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    notFound();
  }

  const jsonLd = buildServicePageJsonLd(page);

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
      <Header />
      <main id="conteudo" className="flex-1">
        <section
          aria-labelledby="service-heading"
          className="pt-32 pb-16 sm:pt-40 sm:pb-20"
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
                <li aria-current="page" className="font-medium text-slate-700">
                  {page.navLabel}
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Icon name={page.icon} className="h-6 w-6" />
              </div>
              <h1
                id="service-heading"
                className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              >
                {page.headline}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                {page.subheadline}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={links.email}>
                  Solicitar orçamento
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href={links.whatsapp}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
                  Falar no WhatsApp
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <section aria-label="Sobre o serviço" className="pb-16 sm:pb-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-5">
                {page.intro.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-md shadow-slate-900/5">
                <h2 className="text-lg font-semibold text-slate-900">
                  O que entregamos
                </h2>
                <ul className="mt-5 space-y-3">
                  {page.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span className="text-sm leading-relaxed text-slate-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="beneficios-heading"
          className="bg-ice-100 py-16 sm:py-20"
        >
          <Container>
            <h2
              id="beneficios-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Por que fazer com a Nox
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {page.benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-2xl bg-white p-7 shadow-sm shadow-slate-900/5"
                >
                  <h3 className="text-base font-semibold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section aria-labelledby="stack-heading" className="py-16 sm:py-20">
          <Container>
            <h2
              id="stack-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Tecnologias que utilizamos
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {page.technologies.map((technology) => (
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
          aria-labelledby="faq-servico-heading"
          className="bg-ice-100 py-16 sm:py-20"
        >
          <Container>
            <h2
              id="faq-servico-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Perguntas frequentes
            </h2>
            <div className="mt-8 max-w-3xl space-y-3">
              {page.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl bg-white shadow-sm shadow-slate-900/5 open:shadow-md open:shadow-slate-900/10"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDownIcon className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
