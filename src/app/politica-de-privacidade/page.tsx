import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ConsentPreferencesButton } from "@/components/analytics/consent-preferences-button";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

const pageTitle = "Política de Privacidade";
const pageDescription = `Como a ${site.name} trata dados pessoais e cookies no site, conforme a LGPD (Lei nº 13.709/2018).`;
const updatedAt = "30 de outubro de 2026";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${site.url}/politica-de-privacidade`,
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
  },
};

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const emailLink = (
    <a
      href={`mailto:${site.email}`}
      className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
    >
      {site.email}
    </a>
  );

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <article className="pt-32 pb-20 sm:pt-40 sm:pb-28">
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
                <li aria-current="page" className="text-slate-900">
                  {pageTitle}
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {pageTitle}
              </h1>
              <p className="mt-4 text-sm text-slate-500">Atualizada em {updatedAt}.</p>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Esta política explica quais dados pessoais a {site.name} trata quando
                você visita este site ou fala com a gente, para que servem e quais são
                os seus direitos pela Lei Geral de Proteção de Dados (LGPD, Lei nº
                13.709/2018).
              </p>

              <PolicySection title="1. Quem é o controlador">
                <p>
                  {site.name}, com sede em {site.locality}/{site.region}. Para qualquer
                  assunto sobre dados pessoais, fale com a gente pelo e-mail {emailLink}.
                </p>
              </PolicySection>

              <PolicySection title="2. Dados que tratamos">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-slate-900">Navegação e cookies:</strong> páginas
                    visitadas, origem da visita, dispositivo, navegador e região
                    aproximada, coletados pelo Google Analytics e pela tag do Google Ads.
                    Cookies de medição e de anúncios só são gravados se você aceitar no
                    banner.
                  </li>
                  <li>
                    <strong className="text-slate-900">Origem de anúncio:</strong> quando
                    você chega por um anúncio do Google e clica para falar no WhatsApp,
                    registramos o identificador do clique (GCLID ou similar), os
                    parâmetros da campanha, a página de entrada e um código de
                    atendimento (ex.: NX-7K4P2Q) que vai no texto da mensagem. Esse
                    registro não inclui nome, telefone ou o conteúdo da conversa.
                  </li>
                  <li>
                    <strong className="text-slate-900">Contato:</strong> nome, telefone,
                    e-mail, empresa e o que você nos contar sobre o seu projeto, quando
                    você nos procura pelo WhatsApp, e-mail ou telefone.
                  </li>
                </ul>
              </PolicySection>

              <PolicySection title="3. Para que usamos e com qual base legal">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Responder ao seu contato e preparar propostas: procedimentos
                    preliminares a contrato, a seu pedido (art. 7º, V).
                  </li>
                  <li>
                    Medir o desempenho do site e dos anúncios com cookies:
                    consentimento (art. 7º, I), que pode ser retirado a qualquer momento.
                  </li>
                  <li>
                    Saber quais anúncios geraram contatos e informar ao Google Ads,
                    de forma agregada, quais cliques viraram oportunidades: legítimo
                    interesse (art. 7º, IX), limitado ao identificador do clique e ao
                    código de atendimento.
                  </li>
                </ul>
              </PolicySection>

              <PolicySection title="4. Cookies e como mudar sua escolha">
                <p>
                  Até você decidir, as ferramentas do Google funcionam no modo de
                  consentimento negado: não gravam cookies e enviam apenas sinais
                  anônimos, sem identificadores. Sua escolha fica salva neste navegador
                  e pode ser alterada aqui:
                </p>
                <div className="pt-2">
                  <ConsentPreferencesButton />
                </div>
              </PolicySection>

              <PolicySection title="5. Com quem compartilhamos">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Google (Analytics, Ads e avaliações do Perfil da Empresa), para medição e anúncios.</li>
                  <li>WhatsApp/Meta, quando você escolhe conversar por lá.</li>
                  <li>Provedores de hospedagem e infraestrutura do site e dos nossos sistemas internos.</li>
                </ul>
                <p>
                  Alguns desses fornecedores podem processar dados fora do Brasil, com
                  as salvaguardas previstas na LGPD. Não vendemos dados pessoais.
                </p>
              </PolicySection>

              <PolicySection title="6. Por quanto tempo guardamos">
                <p>
                  Os registros de origem de anúncio ficam guardados enquanto forem úteis
                  para medir as campanhas e são apagados quando deixam de ser. Os dados
                  de contato ficam guardados enquanto durar a conversa comercial ou o
                  contrato e, depois disso, só pelo prazo exigido por lei.
                </p>
              </PolicySection>

              <PolicySection title="7. Seus direitos">
                <p>
                  Você pode pedir confirmação de tratamento, acesso, correção,
                  anonimização, portabilidade, eliminação, informação sobre
                  compartilhamento e revogação do consentimento (art. 18 da LGPD),
                  escrevendo para {emailLink}. Também pode reclamar à Autoridade
                  Nacional de Proteção de Dados (ANPD).
                </p>
              </PolicySection>

              <PolicySection title="8. Alterações">
                <p>
                  Podemos atualizar esta política quando mudarmos ferramentas ou
                  práticas. A data no topo indica a versão em vigor.
                </p>
              </PolicySection>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
