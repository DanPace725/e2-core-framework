import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import YAML from "yaml";

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
  assert.match(html, />Graph<\/button>/);
  assert.match(html, /For AI assistants/);
  assert.match(html, /href="\/llms\.txt"/);
  assert.match(html, /href="\/ormd-corpus\.txt"/);
  assert.match(html, /href="\/catalog\.json"/);
  assert.match(html, /rel="alternate" type="text\/plain" href="\/llms\.txt"/);
  assert.match(html, /Opening the corpus/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("publishes complete paired human and AI catalogs", async () => {
  const catalog = JSON.parse(await readFile(new URL("../public/catalog.json", import.meta.url), "utf8"));
  assert.equal(catalog.entrySlug, "context-layer-master-index");
  assert.equal(catalog.counts.documents, 90);
  assert.equal(catalog.counts.clusters, 9);
  assert.equal(catalog.docs.length, 90);
  assert.equal(catalog.clusters.length, 9);
  assert.equal(catalog.docs.filter((doc) => doc.ormdUrl.endsWith(".ormd")).length, 90);
  assert.equal(catalog.docs.filter((doc) => doc.humanUrl.endsWith(".md")).length, 90);
  assert.ok(catalog.docs.every((doc) => doc.ormdSha256 && doc.humanSha256));
  assert.equal(catalog.docs.find((doc) => doc.slug === catalog.entrySlug)?.clusterId, null);
  assert.equal(catalog.docs.filter((doc) => doc.clusterId).length, 89);
  assert.deepEqual(catalog.clusters.map((cluster) => cluster.id), ["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
  assert.equal(catalog.docs.find((doc) => doc.slug === "boundary-dynamics")?.clusterId, "C");
  assert.equal(catalog.docs.find((doc) => doc.slug === "lawfulness-core-source")?.clusterId, "B");
  assert.equal(catalog.docs.find((doc) => doc.slug === "sign-mediated-flow-routing")?.clusterId, "E");
  assert.equal(catalog.docs.find((doc) => doc.slug === "self-as-coherence-field")?.clusterId, "G");
  assert.equal(catalog.docs.find((doc) => doc.slug === "e2-as-a-translation-architecture-for-human-remembrance")?.clusterId, "A");
});

test("publishes a typed E2 relationship graph", async () => {
  const [graph, docsGraph, relationSource, pagesConfig, graphComponent] = await Promise.all([
    readFile(new URL("../public/graph.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../../docs/graph.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../graph-relations.yml", import.meta.url), "utf8").then(YAML.parse),
    readFile(new URL("../../.pages.yml", import.meta.url), "utf8").then(YAML.parse),
    readFile(new URL("../app/CorpusGraph.tsx", import.meta.url), "utf8"),
  ]);
  const nodeIds = new Set(graph.nodes.map((node) => node.id));
  assert.equal(graph.schemaVersion, 1);
  assert.equal(graph.counts.nodes, 90);
  assert.equal(graph.nodes.length, 90);
  assert.equal(nodeIds.size, 90);
  assert.equal(graph.clusters.length, 9);
  assert.ok(graph.counts.explicitEdges >= 75);
  assert.ok(graph.counts.suggestedEdges > 0);
  assert.equal(graph.edges.length, graph.counts.edges);
  assert.ok(graph.edges.every((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)));
  assert.ok(graph.edges.every((edge) => edge.source !== edge.target));
  assert.ok(graph.edges.some((edge) => edge.type === "indexes" && edge.target === "aomi-ai-responses"));
  assert.ok(graph.edges.some((edge) => edge.source === "e2-as-a-translation-architecture-for-human-remembrance" && edge.target === "e2-entry-point" && edge.type === "contextualizes"));
  assert.ok(graph.edges.some((edge) => edge.certainty === "suggested" && edge.provenance === "exact-title-mention"));
  assert.deepEqual(docsGraph.counts, graph.counts);
  assert.equal(relationSource.schema_version, 1);
  assert.ok(relationSource.relations.length >= 40);
  assert.ok(pagesConfig.content.some((item) => item.name === "navigation"));
  assert.match(graphComponent, /addEventListener\("wheel", handleWheel, \{ passive: false \}\)/);
  assert.doesNotMatch(graphComponent, /onWheel=/);
  assert.match(graphComponent, /onPointerDown=\{\(event\) => beginNodeDrag\(event, node\.id\)\}/);
  assert.match(graphComponent, /Drag nodes to rearrange/);
  assert.match(graphComponent, /Reset nodes/);
});

test("publishes lightweight and full-corpus AI entry points", async () => {
  const [llms, rootLlms, corpus, robots, htmlIndex, htmlCorpus, htmlMaster, htmlDocs] = await Promise.all([
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../../llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/ormd-corpus.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../../docs/corpus.html", import.meta.url), "utf8"),
    readFile(new URL("../../docs/ormd/context-layer-master-index.html", import.meta.url), "utf8"),
    readdir(new URL("../../docs/ormd/", import.meta.url)),
  ]);
  assert.match(llms, /Context Layer Master Index \(ORMD\)/);
  assert.match(llms, /## Cluster I/);
  assert.match(llms, /Select the relevant A–I cluster/);
  assert.doesNotMatch(llms, /A–K cluster/);
  assert.doesNotMatch(llms, /## Cluster [JK]/);
  assert.match(llms, /ORMD is the AI-facing authority/);
  assert.match(llms, /https:\/\/raw\.githubusercontent\.com\/DanPace725\/e2-core-framework\/main\/reader-site\/public\/ormd\/context-layer-master-index\.ormd/);
  assert.match(llms, /HTML AI mirror: https:\/\/danpace725\.github\.io\/e2-core-framework\//);
  assert.match(llms, /Machine-readable relationship graph/);
  assert.match(llms, /E² as a Translation Architecture for Human Remembrance/);
  assert.doesNotMatch(llms, /\]\(\/ormd\//);
  assert.equal(rootLlms, llms);
  assert.match(corpus, /<!-- ormd:1\.0 -->/);
  assert.match(corpus, /BEGIN ORMD: Context Layer Index\.ormd/);
  assert.match(robots, /User-agent: Claude-User\nAllow: \//);
  assert.match(robots, /User-agent: Google-Extended\nAllow: \//);
  assert.doesNotMatch(robots, /^Sitemap:/m);
  assert.match(htmlIndex, /^<!doctype html>/);
  assert.match(htmlIndex, /Whole combined ORMD corpus/);
  assert.match(htmlIndex, /Machine-readable relationship graph/);
  assert.match(htmlIndex, /Cluster I/);
  assert.doesNotMatch(htmlIndex, /Cluster [JK]/);
  assert.match(htmlCorpus, /BEGIN ORMD: Context Layer Index\.ormd/);
  assert.match(htmlMaster, /&lt;!-- ormd:1\.0 --&gt;/);
  assert.equal(htmlDocs.filter((name) => name.endsWith(".html")).length, 90);
});

test("keeps ORMD metadata out of the human reading surface", async () => {
  const [humanIndex, humanLegacy, rawIndex] = await Promise.all([
    readFile(new URL("../public/human/context-layer-master-index.md", import.meta.url), "utf8"),
    readFile(new URL("../public/human/relational-primitives.md", import.meta.url), "utf8"),
    readFile(new URL("../public/ormd/context-layer-master-index.ormd", import.meta.url), "utf8"),
  ]);

  assert.match(humanIndex, /^# Context Layer Master Index/);
  assert.doesNotMatch(humanIndex, /<!--\s*ormd:1\.0\s*-->|^frame:\s*"meta\.index/m);
  assert.match(humanLegacy, /^# Relational Primitives/);
  assert.doesNotMatch(humanLegacy, /^Context Layer Protocol \(CLP\) ---|^lineage:/m);
  assert.match(rawIndex, /^<!-- ormd:1\.0 -->\r?\n---/);
  assert.match(rawIndex, /^frame:\s*"meta\.index\.context-layer"/m);
});
