import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { projectOrmdToHuman } from "../scripts/ormd-human.mjs";

async function activeOrmdCount() {
  const names = await readdir(new URL("../../E2Core/Context Layer/", import.meta.url));
  return names.filter((name) => name.endsWith(".ormd")).length;
}

test("active human documents are exact ORMD projections", async () => {
  const coreRoot = fileURLToPath(new URL("../../", import.meta.url));
  const registry = JSON.parse(await readFile(path.join(coreRoot, "core_registry.json"), "utf8"));
  const pairs = registry.records.filter((record) => record.semantic_substrate?.length === 1 && record.context_layer?.length === 1);
  const primary = JSON.parse(await readFile(path.join(coreRoot, "reader-site", "scripts", "ormd-primary.json"), "utf8"));
  assert.equal(pairs.length, primary.length);
  for (const pair of pairs) {
    const human = await readFile(path.join(coreRoot, ...pair.semantic_substrate[0].path.split("/")), "utf8");
    const ormd = await readFile(path.join(coreRoot, ...pair.context_layer[0].path.split("/")), "utf8");
    assert.equal(human, projectOrmdToHuman(ormd), pair.key);
  }
  const humanIndex = await readFile(path.join(coreRoot, "E2Core", "Context Layer Master Index.md"), "utf8");
  const ormdIndex = await readFile(path.join(coreRoot, "E2Core", "Context Layer", "Context Layer Master Index.ormd"), "utf8");
  assert.equal(humanIndex, projectOrmdToHuman(ormdIndex));
});

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
  const [catalog, readerComponent, activeCount, ormdPrimary] = await Promise.all([
    readFile(new URL("../public/catalog.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../app/CorpusReader.tsx", import.meta.url), "utf8"),
    activeOrmdCount(),
    readFile(new URL("../scripts/ormd-primary.json", import.meta.url), "utf8").then(JSON.parse),
  ]);
  assert.equal(catalog.entrySlug, "context-layer-master-index");
  assert.equal(catalog.counts.documents, activeCount);
  assert.equal(catalog.counts.clusters, 9);
  assert.equal(catalog.docs.length, activeCount);
  assert.equal(catalog.clusters.length, 9);
  assert.equal(catalog.docs.filter((doc) => doc.ormdUrl.endsWith(".ormd")).length, activeCount);
  assert.equal(catalog.docs.filter((doc) => doc.humanUrl.endsWith(".md")).length, activeCount);
  assert.ok(catalog.docs.every((doc) => doc.ormdSha256 && doc.humanSha256));
  assert.equal(catalog.docs.filter((doc) => doc.humanSourceMode === "ormd-projection").length, ormdPrimary.length + 1);
  assert.ok(catalog.docs.every((doc) => doc.humanSourceMode === "ormd-projection"));
  assert.equal(catalog.docs.find((doc) => doc.slug === "original-e2-work")?.humanSourceMode, "ormd-projection");
  assert.equal(catalog.docs.find((doc) => doc.slug === "relational-primitives")?.humanSourceMode, "ormd-projection");
  assert.equal(catalog.docs.find((doc) => doc.slug === catalog.entrySlug)?.clusterId, null);
  assert.equal(catalog.docs.filter((doc) => doc.clusterId).length, activeCount - 1);
  assert.ok(catalog.docs.every((doc) => !["remf", "universal-emergence-pattern", "relational-emergence-meta-architecture-rema"].includes(doc.slug)));
  assert.equal(catalog.docs.find((doc) => doc.slug === "attentional-access-and-formation-core-source")?.clusterId, "C");
  assert.equal(catalog.docs.find((doc) => doc.slug === "constraint-fluctuation-attention-resolution-core-source")?.clusterId, "C");
  assert.ok(catalog.docs.every((doc) => !["afd-first-principles", "cfa", "cfar"].includes(doc.slug)));
  assert.deepEqual(catalog.clusters.map((cluster) => cluster.id), ["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
  assert.equal(catalog.docs.find((doc) => doc.slug === "boundary-dynamics")?.clusterId, "C");
  assert.equal(catalog.docs.find((doc) => doc.slug === "lawfulness-core-source")?.clusterId, "B");
  assert.equal(catalog.docs.find((doc) => doc.slug === "sign-mediated-flow-routing")?.clusterId, "E");
  assert.equal(catalog.docs.find((doc) => doc.slug === "self-as-coherence-field")?.clusterId, "G");
  assert.equal(catalog.docs.find((doc) => doc.slug === "e2-as-a-translation-architecture-for-human-remembrance")?.clusterId, "A");
  assert.match(readerComponent, /download=\{`\$\{selectedDoc\.slug\}\.md`\}/);
  assert.match(readerComponent, />Download \.md<\/a>/);
});

test("publishes a typed E2 relationship graph", async () => {
  const [graph, docsGraph, relationSource, pagesConfig, graphComponent, activeCount] = await Promise.all([
    readFile(new URL("../public/graph.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../../docs/graph.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../graph-relations.yml", import.meta.url), "utf8").then(YAML.parse),
    readFile(new URL("../../.pages.yml", import.meta.url), "utf8").then(YAML.parse),
    readFile(new URL("../app/CorpusGraph.tsx", import.meta.url), "utf8"),
    activeOrmdCount(),
  ]);
  const nodeIds = new Set(graph.nodes.map((node) => node.id));
  assert.equal(graph.schemaVersion, 1);
  assert.equal(graph.counts.nodes, activeCount);
  assert.equal(graph.nodes.length, activeCount);
  assert.equal(nodeIds.size, activeCount);
  assert.equal(graph.clusters.length, 9);
  assert.ok(graph.counts.explicitEdges >= relationSource.relations.length);
  assert.ok(graph.counts.suggestedEdges > 0);
  assert.equal(graph.edges.length, graph.counts.edges);
  assert.ok(graph.edges.every((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)));
  assert.ok(graph.edges.every((edge) => edge.source !== edge.target));
  assert.ok(graph.edges.some((edge) => edge.type === "indexes" && edge.target === "adversarial-occlusion-and-mechanism-integrity-v1"));
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
  const [llms, rootLlms, corpus, robots, htmlIndex, htmlCorpus, htmlMaster, htmlDocs, activeCount] = await Promise.all([
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../../llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/ormd-corpus.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../../docs/corpus.html", import.meta.url), "utf8"),
    readFile(new URL("../../docs/ormd/context-layer-master-index.html", import.meta.url), "utf8"),
    readdir(new URL("../../docs/ormd/", import.meta.url)),
    activeOrmdCount(),
  ]);
  assert.match(llms, /Context Layer Master Index \(ORMD\)/);
  assert.match(llms, /## Cluster I/);
  assert.match(llms, /Select the relevant A–I cluster/);
  assert.doesNotMatch(llms, /A–K cluster/);
  assert.doesNotMatch(llms, /## Cluster [JK]/);
  assert.match(llms, /ORMD is the AI-facing authority/);
  assert.match(llms, /https:\/\/e2-core-framework\.capulusirl\.chatgpt\.site\/ormd\/context-layer-master-index\.ormd/);
  assert.match(llms, /HTML AI mirror: https:\/\/e2-core-framework\.capulusirl\.chatgpt\.site\/ai/);
  assert.match(llms, /Machine-readable relationship graph/);
  assert.match(llms, /E² as a Translation Architecture for Human Remembrance/);
  assert.doesNotMatch(llms, /\]\(\/ormd\//);
  assert.equal(rootLlms.replace(/\r\n/g, "\n"), llms.replace(/\r\n/g, "\n"));
  assert.match(corpus, /<!-- ormd:1\.0 -->/);
  assert.match(corpus, /BEGIN ORMD: Context Layer Master Index\.ormd/);
  assert.match(robots, /User-agent: Claude-User\r?\nAllow: \//);
  assert.match(robots, /User-agent: Google-Extended\r?\nAllow: \//);
  assert.doesNotMatch(robots, /^Sitemap:/m);
  assert.match(htmlIndex, /^<!doctype html>/);
  assert.match(htmlIndex, /Whole combined ORMD corpus/);
  assert.match(htmlIndex, /Machine-readable relationship graph/);
  assert.match(htmlIndex, /Cluster I/);
  assert.doesNotMatch(htmlIndex, /Cluster [JK]/);
  assert.match(htmlCorpus, /BEGIN ORMD: Context Layer Master Index\.ormd/);
  assert.match(htmlMaster, /&lt;!-- ormd:1\.0 --&gt;/);
  assert.equal(htmlDocs.filter((name) => name.endsWith(".html")).length, activeCount);
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
