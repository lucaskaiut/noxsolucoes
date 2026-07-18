import assert from "node:assert/strict";
import { test } from "node:test";
import type { SitemapConfig, SitemapRoutesProvider, SitemapUrl } from "./contracts.ts";
import { SitemapService, escapeXml } from "./sitemap-service.ts";

const config: SitemapConfig = {
  baseUrl: "https://example.com",
  defaultChangefreq: "monthly",
};

function providerOf(routes: SitemapUrl[]): SitemapRoutesProvider {
  return { getRoutes: () => Promise.resolve(routes) };
}

test("gera XML válido com urlset, loc, lastmod, changefreq e priority", async () => {
  const service = new SitemapService(
    [providerOf([{ url: "/", lastmod: "2026-07-18T12:00:00.000Z", priority: 1 }])],
    config,
  );
  const xml = await service.generate();

  assert.ok(xml.startsWith(`<?xml version="1.0" encoding="UTF-8"?>`));
  assert.ok(xml.includes(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`));
  assert.ok(xml.includes("<loc>https://example.com/</loc>"));
  assert.ok(xml.includes("<lastmod>2026-07-18T12:00:00.000Z</lastmod>"));
  assert.ok(xml.includes("<changefreq>monthly</changefreq>"));
  assert.ok(xml.includes("<priority>1.0</priority>"));
  assert.ok(xml.trimEnd().endsWith("</urlset>"));
});

test("gera urlset vazio quando nenhuma URL existir", async () => {
  const service = new SitemapService([providerOf([])], config);
  const xml = await service.generate();

  assert.ok(xml.includes("<urlset"));
  assert.ok(xml.includes("</urlset>"));
  assert.ok(!xml.includes("<url>"));
});

test("escapa caracteres especiais em URLs", async () => {
  const service = new SitemapService(
    [providerOf([{ url: "/busca?search=a&b=c" }])],
    config,
  );
  const xml = await service.generate();

  assert.ok(xml.includes("<loc>https://example.com/busca?search=a&amp;b=c</loc>"));
  assert.ok(!xml.includes("a&b=c"));
});

test("escapeXml converte todas as entidades reservadas", () => {
  assert.equal(escapeXml(`<a href="x">&'</a>`), "&lt;a href=&quot;x&quot;&gt;&amp;&apos;&lt;/a&gt;");
});

test("aplica defaults quando lastmod e changefreq são omitidos", async () => {
  const service = new SitemapService([providerOf([{ url: "/pagina" }])], config);
  const xml = await service.generate();

  assert.ok(xml.includes("<loc>https://example.com/pagina</loc>"));
  assert.match(xml, /<lastmod>\d{4}-\d{2}-\d{2}T[\d:.]+Z<\/lastmod>/);
  assert.ok(xml.includes("<changefreq>monthly</changefreq>"));
  assert.ok(!xml.includes("<priority>"));
});

test("agrega múltiplos providers e remove URLs duplicadas", async () => {
  const service = new SitemapService(
    [
      providerOf([{ url: "/", priority: 1 }, { url: "/a" }]),
      providerOf([{ url: "/a" }, { url: "/b" }]),
    ],
    config,
  );
  const xml = await service.generate();

  assert.equal(xml.match(/<loc>https:\/\/example\.com\/a<\/loc>/g)?.length, 1);
  assert.ok(xml.includes("<loc>https://example.com/b</loc>"));
});

test("mantém URLs absolutas e normaliza caminhos sem barra inicial", async () => {
  const service = new SitemapService(
    [providerOf([{ url: "https://blog.example.com/post" }, { url: "contato" }])],
    config,
  );
  const xml = await service.generate();

  assert.ok(xml.includes("<loc>https://blog.example.com/post</loc>"));
  assert.ok(xml.includes("<loc>https://example.com/contato</loc>"));
});

test("ignora provider com falha sem derrubar a geração", async () => {
  const failing: SitemapRoutesProvider = {
    getRoutes: () => Promise.reject(new Error("backend offline")),
  };
  const service = new SitemapService([failing, providerOf([{ url: "/" }])], config);
  const xml = await service.generate();

  assert.ok(xml.includes("<loc>https://example.com/</loc>"));
});
