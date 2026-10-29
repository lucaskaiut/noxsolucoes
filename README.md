# Nox Soluções em Tecnologia — Site Institucional

Landing page institucional da **Nox Soluções em Tecnologia**, software house especializada em desenvolvimento de sistemas web, aplicativos mobile, integrações e inteligência artificial.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- ESLint 9

## Executando o projeto

### Pré-requisitos

- Node.js 20+
- npm

### Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Produção

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx        # Layout raiz, metadata global (SEO) e fontes
│   ├── page.tsx          # Landing page (composição das seções)
│   ├── globals.css       # Design tokens (Tailwind 4 @theme) e animações
│   ├── icon.svg          # Favicon
│   ├── robots.ts         # robots.txt gerado
│   └── sitemap.ts        # sitemap.xml gerado
├── components/
│   ├── layout/           # Header (client) e Footer
│   ├── sections/         # Hero, Serviços, Diferenciais, Processo,
│   │                     # Tecnologias, Projetos, Depoimentos, FAQ, CTA final
│   ├── seo/              # Componente JSON-LD
│   └── ui/               # Container, ButtonLink, SectionHeading, ícones SVG
└── lib/
    ├── site.ts           # Dados da empresa, links e navegação
    ├── data.ts           # Conteúdo tipado das seções
    └── schema.ts         # Grafo Schema.org (JSON-LD)

public/
├── llms.txt              # Resumo estruturado para IAs/LLMs
└── llms-full.txt         # Versão detalhada para indexação por IA
```

## SEO e otimização para IA

- Metadata completa: title, description, keywords, Open Graph, Twitter Cards e canonical
- Dados estruturados JSON-LD: `Organization`, `ProfessionalService`/`LocalBusiness`, `WebSite`, `WebPage`, `BreadcrumbList` e `FAQPage`
- `robots.txt` e `sitemap.xml` gerados pelo App Router
- `llms.txt` e `llms-full.txt` para compreensão por modelos de IA
- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`) com `h1` único
- Página 100% estática (SSG) para máxima performance

## Landing page de campanha

A rota `/desenvolvimento-de-sistemas` é uma landing page de conversão para campanhas de Google Ads focada em desenvolvimento de sistemas sob medida. Ela usa o mesmo layout, tokens e componentes do site, com uma variante simplificada do cabeçalho (`<Header variant="campaign" />`).

- Conteúdo: `src/lib/system-development-landing.ts`
- Conversão: botões de WhatsApp (`links.whatsapp`), com o evento `generate_lead` disparado no clique.
- Não há formulário próprio na página. O contato acontece diretamente pelo WhatsApp.
- A rota entra automaticamente no `sitemap.xml` por meio da lista `serviceLinks` em `src/lib/service-pages.ts`.

### Google Ads e atribuição de leads

- **Conversões por canal** (`src/analytics/providers/google-ads-provider.ts`): cliques em
  WhatsApp, `tel:` e `mailto:` disparam a conversão do Google Ads correspondente. O canal é
  derivado do `href` pelo `AnalyticsTracker`, então funciona em qualquer página/botão.
  Variáveis: `NEXT_PUBLIC_ANALYTICS_GOOGLE_ADS`, `NEXT_PUBLIC_GOOGLE_ADS_ID` e
  `NEXT_PUBLIC_GOOGLE_ADS_LABEL_{WHATSAPP,PHONE,EMAIL}` (valores reais em `.env`).
- **Consent Mode v2** (`src/analytics/consent.ts`, `providers/gtag.ts`): tudo começa
  `denied`; o banner (`components/analytics/consent-banner.tsx`) só aparece quando há algum
  provider ativo e grava a escolha em `localStorage`. GA4 e Google Ads compartilham um único
  `gtag.js`. Com consentimento negado, `url_passthrough`/`ads_data_redaction` mantêm a
  medição modelada sem cookies.
- **Lead com GCLID** (`src/analytics/attribution.ts`, `src/app/api/leads/route.ts`): se a
  sessão chegou com `gclid`/`gbraid`/`wbraid`, o clique no WhatsApp acrescenta um código
  (`código NX-7K4P2Q`) ao texto da mensagem e registra o lead no CMS
  (`POST {CMS_API_URL}/api/leads`, token `CMS_LEADS_TOKEN` com `lead.create`, ou
  `CMS_API_TOKEN`). Visitas orgânicas não são afetadas. Falha no CMS nunca bloqueia a ida ao
  WhatsApp. No CMS, o lead é marcado como qualificado pelo código e exportado em CSV para o
  upload de conversões offline do Google Ads.

**Pendente (LGPD):** o site não tem página de Política de Privacidade. Recomenda-se publicá-la
(cookies, Google Ads, registro do código de atendimento) e linká-la no banner.

## Acessibilidade

- Navegação por teclado com estados de foco visíveis
- Link "pular para o conteúdo"
- `aria-label`/`aria-labelledby` nas seções e controles
- FAQ com `<details>/<summary>` nativos (sem JavaScript)
- Suporte a `prefers-reduced-motion`

## Como adicionar um novo case

Todo o conteúdo de cases vive em `src/lib/case-studies.ts`. Para publicar um novo case:

1. Adicione a imagem de capa em `public/images/` (screenshot 1918×912 ou proporção próxima).
2. Adicione um novo objeto `CaseStudy` ao array `caseStudies` em `src/lib/case-studies.ts`, preenchendo slug, título, tagline, categoria, descrições, desafio, solução, resultados, tecnologias, keywords e `publishedAt`.

Opcional: preencha `gallery` (`[{ src, caption }]`, imagens 1920×1200) para exibir a seção "Telas do sistema" na página do case.

Nada mais é necessário. Automaticamente o novo case:

- aparece na **listagem** `/cases` e ganha página própria em `/cases/<slug>` (via `generateStaticParams`);
- entra no **sitemap** `/sitemap.xml` (o `CasesRoutesProvider` em `src/seo/sitemap/` lê o array);
- gera **metadata** completa (title, description, keywords, canonical, Open Graph, Twitter) e **JSON-LD** `TechArticle` com breadcrumb (via `generateMetadata` e `buildCaseStudyJsonLd`);
- dispara os **eventos de analytics**: `view_case` ao abrir a página, `generate_lead` no CTA de orçamento e `contact` no botão de WhatsApp (motor em `src/analytics/`);
- é **indexável** por buscadores e LLMs (SSG + dados estruturados). Opcional: citar o case em `public/llms.txt`.

Para exibir o card também na home (seção Projetos), adicione `slug` ao item correspondente em `cases` de `src/lib/data.ts`.

## Deploy

O projeto está pronto para deploy na [Vercel](https://vercel.com): basta importar o repositório. Nenhuma variável de ambiente é necessária.

## Contato

- E-mail: [contato@noxtecnologias.com.br](mailto:contato@noxtecnologias.com.br)
- WhatsApp: (41) 98829-7008
