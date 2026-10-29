import assert from "node:assert/strict";
import { test } from "node:test";
import {
  appendRefToWhatsappHref,
  generateLeadRef,
  isLeadRef,
  parseAttribution,
} from "../../analytics/attribution.ts";
import { parseLeadPayload } from "./lead-payload.ts";

const now = new Date("2026-10-29T15:00:00.000Z");

test("parseAttribution captura GCLID e UTMs", () => {
  const attribution = parseAttribution(
    "?gclid=Cj0KCQjw-abc_123&utm_source=google&utm_campaign=nox+01&foo=bar",
    "/desenvolvimento-de-sistemas",
    now,
  );
  assert.deepEqual(attribution, {
    landing_path: "/desenvolvimento-de-sistemas",
    captured_at: "2026-10-29T15:00:00.000Z",
    gclid: "Cj0KCQjw-abc_123",
    utm_source: "google",
  });
});

test("parseAttribution ignora visitas sem click ID do Google", () => {
  assert.equal(parseAttribution("?utm_source=newsletter", "/", now), null);
  assert.equal(parseAttribution("", "/", now), null);
});

test("parseAttribution aceita gbraid/wbraid e descarta valores suspeitos", () => {
  const attribution = parseAttribution("?wbraid=abc123&utm_term=<script>", "/", now);
  assert.equal(attribution?.wbraid, "abc123");
  assert.equal(attribution?.utm_term, undefined);
});

test("generateLeadRef gera código legível no formato NX-XXXXXX", () => {
  const ref = generateLeadRef((size) => new Uint8Array(size).map((_, i) => i * 37));
  assert.equal(ref, "NX-27CHNT");
  for (let i = 0; i < 50; i++) assert.ok(isLeadRef(generateLeadRef()));
  assert.equal(isLeadRef("NX-0OI1AA"), false);
});

test("appendRefToWhatsappHref acrescenta o código ao texto da mensagem", () => {
  const href = `https://wa.me/5541988297008?text=${encodeURIComponent("Olá! Quero um sistema.")}`;
  const result = new URL(appendRefToWhatsappHref(href, "NX-ABC234"));
  assert.equal(result.searchParams.get("text"), "Olá! Quero um sistema. (código NX-ABC234)");
  assert.equal(appendRefToWhatsappHref(result.toString(), "NX-ABC234"), result.toString());
  assert.equal(
    new URL(appendRefToWhatsappHref("https://wa.me/5541988297008", "NX-ABC234")).searchParams.get("text"),
    "(código NX-ABC234)",
  );
});

test("parseLeadPayload aceita payload válido e descarta campos desconhecidos", () => {
  const payload = parseLeadPayload({
    ref: "NX-ABC234",
    channel: "whatsapp",
    consent: "granted",
    gclid: "Cj0KCQjw-abc_123",
    utm_source: "google",
    landing_path: "/desenvolvimento-de-sistemas",
    click_path: "/desenvolvimento-de-sistemas",
    captured_at: "2026-10-29T15:00:00.000Z",
    email: "alguem@example.com",
  });
  assert.deepEqual(payload, {
    ref: "NX-ABC234",
    channel: "whatsapp",
    consent: "granted",
    gclid: "Cj0KCQjw-abc_123",
    utm_source: "google",
    landing_path: "/desenvolvimento-de-sistemas",
    click_path: "/desenvolvimento-de-sistemas",
    captured_at: "2026-10-29T15:00:00.000Z",
  });
});

test("parseLeadPayload recusa código inválido, canal errado ou ausência de click ID", () => {
  const base = { ref: "NX-ABC234", channel: "whatsapp", gclid: "abc" };
  assert.ok(parseLeadPayload(base));
  assert.equal(parseLeadPayload({ ...base, ref: "qualquer" }), null);
  assert.equal(parseLeadPayload({ ...base, channel: "email" }), null);
  assert.equal(parseLeadPayload({ ...base, gclid: undefined }), null);
  assert.equal(parseLeadPayload(null), null);
  assert.equal(parseLeadPayload([base]), null);
  assert.equal(parseLeadPayload({ ...base, consent: "talvez" })?.consent, "unknown");
  assert.equal(parseLeadPayload({ ...base, landing_path: "https://evil.example" })?.landing_path, undefined);
});
