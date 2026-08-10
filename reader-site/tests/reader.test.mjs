import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the E2 corpus reader shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>E² Core Framework<\/title>/i);
  assert.match(html, /Core Framework/);
  assert.match(html, /AI index/);
  assert.match(html, /Opening the corpus/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("publishes complete paired human and AI catalogs", async () => {
  const catalog = JSON.parse(await readFile(new URL("../public/catalog.json", import.meta.url), "utf8"));
  assert.equal(catalog.entrySlug, "context-layer-master-index");
  assert.equal(catalog.counts.documents, 89);
  assert.equal(catalog.counts.clusters, 11);
  assert.equal(catalog.docs.length, 89);
  assert.equal(catalog.clusters.length, 11);
  assert.equal(catalog.docs.filter((doc) => doc.ormdUrl.endsWith(".ormd")).length, 89);
  assert.equal(catalog.docs.filter((doc) => doc.humanUrl.endsWith(".md")).length, 89);
  assert.ok(catalog.docs.every((doc) => doc.ormdSha256 && doc.humanSha256));
});

test("publishes lightweight and full-corpus AI entry points", async () => {
  const [llms, corpus] = await Promise.all([
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/ormd-corpus.txt", import.meta.url), "utf8"),
  ]);
  assert.match(llms, /Context Layer Master Index \(ORMD\)/);
  assert.match(llms, /## Cluster K/);
  assert.match(llms, /ORMD is the AI-facing authority/);
  assert.match(corpus, /<!-- ormd:1\.0 -->/);
  assert.match(corpus, /BEGIN ORMD: Context Layer Index\.ormd/);
});
