# Sitemap

Geração dinâmica do `/sitemap.xml` via Route Handler (`src/app/sitemap.xml/route.ts`).

## Por que Route Handler e não `app/sitemap.ts`?

O file convention nativo do Next.js não permite controlar `Cache-Control` nem testar
unitariamente a serialização/escaping do XML. Com Route Handler (dinâmico por padrão
desde o Next 15), o XML é gerado no servidor a cada request e cacheado na CDN via
`s-maxage=3600, stale-while-revalidate=86400`.

## Arquitetura

```
contracts.ts               SitemapUrl, SitemapRoutesProvider, SitemapConfig
config.ts                  sitemapConfig (baseUrl vem de src/lib/site.ts)
static-routes-provider.ts  rotas estáticas (home + páginas de serviço)
sitemap-service.ts         agrega providers, dedupe, escaping e gera o XML
index.ts                   composition root (createSitemapService)
```

O `SitemapService` nunca precisa mudar para novas fontes de URLs (Open/Closed).

## Como adicionar um novo provider

1. Implemente o contrato:

```typescript
import type { SitemapRoutesProvider, SitemapUrl } from "./contracts";

export class BackendRoutesProvider implements SitemapRoutesProvider {
  async getRoutes(): Promise<SitemapUrl[]> {
    const response = await fetch("https://api.exemplo.com/api/sitemap");
    const routes: { path: string; updatedAt: string }[] = await response.json();
    return routes.map((route) => ({
      url: route.path,
      lastmod: route.updatedAt,
      changefreq: "weekly",
      priority: 0.7,
    }));
  }
}
```

2. Registre no `createSitemapService` em `index.ts`:

```typescript
return new SitemapService(
  [new StaticRoutesProvider(), new BackendRoutesProvider()],
  sitemapConfig,
);
```

Nada mais muda. O mesmo vale para `CmsRoutesProvider`, `BlogRoutesProvider`, etc.

Observações:

- `url` pode ser caminho relativo (`/post`) ou URL absoluta (`https://blog.exemplo.com/post`).
- URLs duplicadas entre providers são removidas (o primeiro registro vence).
- Provider que lançar erro é ignorado com `console.warn` — o sitemap nunca quebra
  por falha de uma fonte externa.

## Testes

```bash
npm test
```

Cobrem geração do XML, urlset vazio, escaping de entidades, defaults, dedupe,
URLs absolutas e resiliência a falha de provider (`sitemap-service.test.ts`,
rodando no test runner nativo do Node — sem dependências).
