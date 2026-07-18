import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { caseStudies } from "@/lib/case-studies";
import { buildCasesListJsonLd } from "@/lib/schema";
import { links, site } from "@/lib/site";

const pageTitle = "Cases de Sucesso | Projetos Reais de Software";
const pageDescription =
  "Conheça projetos reais desenvolvidos pela Nox Soluções em Tecnologia: plataformas SaaS, CRMs com IA, sistemas de RH, gestão escolar e mais. Veja o desafio, a solução e os resultados de cada case.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "cases de sucesso",
    "projetos de software",
    "portfólio software house",
    "desenvolvimento de sistemas",
    "cases de tecnologia",
    site.name,
  ],
  alternates: {
    canonical: "/cases",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${site.url}/cases`,
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function CasesPage() {
  const jsonLd = buildCasesListJsonLd(caseStudies);

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
          aria-labelledby="cases-heading"
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
                  Cases
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                Cases de sucesso
              </p>
              <h1
                id="cases-heading"
                className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              >
                Projetos reais que geram resultado todos os dias
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Cada case abaixo é um sistema em produção desenvolvido pela{" "}
                {site.name}: o problema que o cliente enfrentava, a solução que
                construímos e os resultados alcançados. Do agendamento com IA no
                WhatsApp à gestão escolar sem papel.
              </p>
            </div>
          </Container>
        </section>

        <section aria-label="Lista de cases" className="pb-20 sm:pb-28">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((caseStudy) => (
                <article
                  key={caseStudy.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-900/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-900/10"
                >
                  <Link
                    href={`/cases/${caseStudy.slug}`}
                    aria-label={`Ver case ${caseStudy.title}`}
                    className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <Image
                      src={caseStudy.coverImage}
                      alt={`Tela do sistema ${caseStudy.title}`}
                      width={960}
                      height={456}
                      className="aspect-video w-full object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                      {caseStudy.category}
                    </span>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900">
                      {caseStudy.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {caseStudy.shortDescription}
                    </p>
                    <ul
                      className="mt-4 flex flex-wrap gap-2 pt-1"
                      aria-label="Tecnologias utilizadas"
                    >
                      {caseStudy.technologies.slice(0, 5).map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full bg-ice-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/cases/${caseStudy.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                    >
                      Ver case
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 rounded-2xl bg-white p-8 text-center shadow-md shadow-slate-900/5 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Seu projeto pode ser o próximo case
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                Conte o que você precisa construir e receba uma proposta sob
                medida, sem compromisso.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink
                  href={links.email}
                  data-analytics-event="generate_lead"
                  data-analytics-payload={JSON.stringify({ source: "cases_list" })}
                >
                  Solicitar orçamento
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
