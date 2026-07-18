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
