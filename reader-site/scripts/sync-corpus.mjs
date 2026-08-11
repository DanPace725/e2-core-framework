import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const coreRoot = path.resolve(siteRoot, "..");
const publicRoot = path.join(siteRoot, "public");
const docsRoot = path.join(coreRoot, "docs");
const registryPath = path.join(coreRoot, "core_registry.json");
const contextRoot = path.join(coreRoot, "E2Core", "Context Layer");
const semanticIndexPath = path.join(coreRoot, "E2Core", "context layer index.md");
const contextIndexPath = path.join(contextRoot, "Context Layer Index.ormd");
const graphRelationsPath = path.join(siteRoot, "graph-relations.yml");
const publicSiteBase = "https://e2-core-framework.capulusirl.chatgpt.site";
const githubRawBase = "https://raw.githubusercontent.com/DanPace725/e2-core-framework/main/reader-site/public";
const githubPagesBase = "https://danpace725.github.io/e2-core-framework";

const exists = async (target) => {
  try {
    await readFile(target);
    return true;
  } catch {
    return false;
  }
};

if (!(await exists(registryPath))) {
  if (await exists(path.join(publicRoot, "catalog.json"))) {
    console.log("Core source is not adjacent; using the committed public corpus snapshot.");
    process.exit(0);
  }
  throw new Error(`Core registry not found at ${registryPath}`);
}

const registry = JSON.parse(await readFile(registryPath, "utf8"));
const indexText = await readFile(contextIndexPath, "utf8");

const slugify = (value) => value
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/e\^?2/g, "e2")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "") || "document";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, "");
  const match = normalized.match(/^<!--\s*ormd:[^>]+-->\s*\r?\n---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  if (!match) return {};
  try {
    return YAML.parse(match[1]) ?? {};
  } catch (error) {
    throw new Error(`Invalid ORMD frontmatter: ${error.message}`);
  }
}

function cleanInline(value = "") {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*+/g, "")
    .trim();
}

function parseClusters(raw) {
  const clusters = [];
  const headingPattern = /^## Cluster ([A-I])\s+[—-]\s+(.+?)(?:\s+\{#[^}]+\})?\s*$/gm;
  const matches = [...raw.matchAll(headingPattern)];

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const tailStart = match.index + match[0].length;
    const nextHeadingOffset = raw.slice(tailStart).search(/^##\s+/m);
    const sectionEnd = nextHeadingOffset === -1 ? raw.length : tailStart + nextHeadingOffset;
    const section = raw.slice(match.index, sectionEnd);
    const scope = section.match(/^\*\*Scope:\*\*\s*(.+)$/m)?.[1]?.trim() ?? "";
    const triggers = section.match(/^\*\*Trigger keywords:\*\*\s*(.+)$/m)?.[1]
      ?.split(",")
      .map(cleanInline)
      .filter(Boolean) ?? [];
    const entryPoint = cleanInline(section.match(/^\*\*Entry point:\*\*\s*(.+)$/m)?.[1] ?? "");
    const filenames = [...section.matchAll(/`([^`]+\.ormd)`/g)].map((item) => item[1]);

    clusters.push({
      id: match[1],
      name: match[2].trim(),
      scope,
      triggers,
      entryPoint,
      filenames: [...new Set(filenames)],
    });
  }
  return clusters;
}

const clusters = parseClusters(indexText);
if (clusters.length !== 9) throw new Error(`Expected 9 clusters, found ${clusters.length}`);

const clusterByFilename = new Map();
for (const cluster of clusters) {
  for (const filename of cluster.filenames) {
    if (!clusterByFilename.has(filename.toLowerCase())) clusterByFilename.set(filename.toLowerCase(), cluster.id);
  }
}

const contextRecords = registry.records.filter((record) => record.context_layer?.length);
const allContextItems = contextRecords.flatMap((record) =>
  record.context_layer.map((context) => ({ record, context })),
);

const slugCounts = new Map();
const items = allContextItems.map(({ record, context }) => {
  const isMasterIndex = context.name.toLowerCase() === "context layer index.ormd";
  const baseSlug = isMasterIndex
    ? "context-layer-master-index"
    : slugify(context.stem || context.name.replace(/\.ormd$/i, ""));
  const count = (slugCounts.get(baseSlug) ?? 0) + 1;
  slugCounts.set(baseSlug, count);
  const slug = count === 1 ? baseSlug : `${baseSlug}-${count}`;
  return {
    record,
    context,
    slug,
    clusterId: isMasterIndex ? null : (clusterByFilename.get(context.name.toLowerCase()) ?? null),
  };
});

const corpusNameToSlug = new Map();
const normalizedCorpusNameToSlug = new Map();

function decodeHref(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizedCorpusName(value) {
  const decoded = decodeHref(value).replace(/&/g, " and ").replace(/\\/g, "/");
  const name = decoded.split("/").pop() ?? decoded;
  const stem = name
    .replace(/\.(?:md|ormd)$/i, "")
    .replace(/[\s_-]*[0-9a-f]{32}$/i, "");
  return slugify(stem);
}

function registerCorpusName(name, slug) {
  corpusNameToSlug.set(name.toLowerCase(), slug);
  const normalized = normalizedCorpusName(name);
  const existing = normalizedCorpusNameToSlug.get(normalized);
  normalizedCorpusNameToSlug.set(normalized, existing && existing !== slug ? null : slug);
}

for (const item of items) {
  for (const source of item.record.semantic_substrate ?? []) registerCorpusName(source.name, item.slug);
  registerCorpusName(item.record.key, item.slug);
  registerCorpusName(item.context.name, item.slug);
  registerCorpusName(item.context.title, item.slug);
  registerCorpusName(item.slug, item.slug);
}
registerCorpusName("context layer index.md", "context-layer-master-index");

function resolveCorpusLabel(label) {
  const normalized = normalizedCorpusName(label);
  if (!normalized || normalized.length < 3) return null;

  const direct = normalizedCorpusNameToSlug.get(normalized);
  if (direct) return direct;

  const withoutArticle = normalized.replace(/^the-/, "");
  const matches = new Set();
  for (const [candidate, slug] of normalizedCorpusNameToSlug) {
    if (!slug) continue;
    const candidateWithoutArticle = candidate.replace(/^the-/, "");
    if (
      candidateWithoutArticle === withoutArticle
      || candidateWithoutArticle.startsWith(`${withoutArticle}-`)
      || withoutArticle.startsWith(`${candidateWithoutArticle}-`)
    ) {
      matches.add(slug);
    }
  }
  return matches.size === 1 ? [...matches][0] : null;
}

function rewriteIndexDocumentLinks(markdown) {
  return markdown.replace(
    /\[([^\]]+)\]\((#cluster-[a-i])(\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\)/gi,
    (whole, label, _cluster, title = "") => {
      const target = resolveCorpusLabel(label);
      return target ? `[${label}](/?doc=${target}${title})` : whole;
    },
  );
}

function rewriteHumanLinks(markdown) {
  let cursor = 0;
  let searchFrom = 0;
  let rewritten = "";

  while (searchFrom < markdown.length) {
    const destinationStart = markdown.indexOf("](", searchFrom);
    if (destinationStart === -1) break;

    let depth = 1;
    let escaped = false;
    let destinationEnd = destinationStart + 2;
    for (; destinationEnd < markdown.length; destinationEnd += 1) {
      const character = markdown[destinationEnd];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (character === "\\") {
        escaped = true;
        continue;
      }
      if (character === "(") depth += 1;
      else if (character === ")") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    if (depth !== 0) break;

    const rawDestination = markdown.slice(destinationStart + 2, destinationEnd).trim();
    const destinationMatch = rawDestination.match(/^(?:<([^>]+)>|(\S+))(\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?$/s);
    const href = destinationMatch?.[1] ?? destinationMatch?.[2];
    if (!href || !/\.(?:md|ormd)(?:#|$)/i.test(href)) {
      searchFrom = destinationEnd + 1;
      continue;
    }

    const hashIndex = href.indexOf("#");
    const fileHref = hashIndex === -1 ? href : href.slice(0, hashIndex);
    const fragment = hashIndex === -1 ? "" : href.slice(hashIndex);
    const decoded = decodeHref(fileHref).replace(/\\/g, "/");
    const name = decoded.split("/").pop()?.toLowerCase();
    const exactTarget = name ? corpusNameToSlug.get(name) : null;
    const target = exactTarget ?? normalizedCorpusNameToSlug.get(normalizedCorpusName(decoded));
    if (!target) {
      searchFrom = destinationEnd + 1;
      continue;
    }

    const title = destinationMatch?.[3] ?? "";
    rewritten += markdown.slice(cursor, destinationStart + 2);
    rewritten += `/?doc=${target}${fragment}${title}`;
    rewritten += ")";
    cursor = destinationEnd + 1;
    searchFrom = cursor;
  }

  return `${rewritten}${markdown.slice(cursor)}`;
}

function stripHumanEnvelope(markdown) {
  const withoutBom = markdown.replace(/^\uFEFF/, "");
  const canonicalEnvelope = withoutBom.match(
    /^<!--\s*ormd:[^>]+-->\s*\r?\n---\s*\r?\n[\s\S]*?\r?\n---(?:\s*\r?\n|$)/,
  );
  if (canonicalEnvelope) return withoutBom.slice(canonicalEnvelope[0].length).replace(/^\s+/, "");

  const legacyClpEnvelope = withoutBom.match(
    /^Context Layer Protocol \(CLP\) ---\s*\r?\n[\s\S]*?\r?\n---(?:\s*\r?\n|$)/,
  );
  if (legacyClpEnvelope) return withoutBom.slice(legacyClpEnvelope[0].length).replace(/^\s+/, "");

  return withoutBom;
}

function escapeHtml(value = "") {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderAiPage({ title, description, body, canonicalUrl }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index, follow">
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <title>${escapeHtml(title)} | E² Core Framework</title>
  <style>
    :root { color-scheme: light; font-family: ui-sans-serif, system-ui, sans-serif; background: #f7f4e9; color: #102f27; }
    body { margin: 0; }
    main { width: min(100% - 2rem, 72rem); margin: 0 auto; padding: 2.5rem 0 5rem; }
    h1, h2 { font-family: Georgia, serif; line-height: 1.12; }
    h1 { font-size: clamp(2rem, 7vw, 4rem); margin: 0 0 1rem; }
    h2 { margin-top: 2.5rem; }
    a { color: #075b4a; }
    .meta { color: #48655d; }
    .notice { padding: 1rem; border: 1px solid #b9c8bd; border-radius: .75rem; background: #fffdf5; }
    li { margin: .55rem 0; }
    pre { margin-top: 1.5rem; padding: 1rem; overflow-wrap: anywhere; white-space: pre-wrap; border: 1px solid #cbd4cc; border-radius: .75rem; background: #fffdf8; font: .92rem/1.55 ui-monospace, SFMono-Regular, Consolas, monospace; }
  </style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>
`;
}

await rm(path.join(publicRoot, "human"), { recursive: true, force: true });
await rm(path.join(publicRoot, "ormd"), { recursive: true, force: true });
await rm(path.join(docsRoot, "ormd"), { recursive: true, force: true });
await mkdir(path.join(publicRoot, "human"), { recursive: true });
await mkdir(path.join(publicRoot, "ormd"), { recursive: true });
await mkdir(path.join(docsRoot, "ormd"), { recursive: true });

const docs = [];
const corpusParts = [];
const humanTextBySlug = new Map();

for (const item of items) {
  const contextPath = path.join(coreRoot, ...item.context.path.split("/"));
  const ormdBytes = await readFile(contextPath);
  const ormdText = ormdBytes.toString("utf8");
  const frontmatter = parseFrontmatter(ormdText);
  const semanticSources = item.record.semantic_substrate ?? [];
  let humanText;

  if (item.slug === "context-layer-master-index") {
    humanText = await readFile(semanticIndexPath, "utf8");
  } else if (semanticSources.length === 1) {
    humanText = await readFile(path.join(coreRoot, ...semanticSources[0].path.split("/")), "utf8");
  } else if (semanticSources.length > 1) {
    const parts = [];
    for (const source of semanticSources) {
      const sourceText = await readFile(path.join(coreRoot, ...source.path.split("/")), "utf8");
      parts.push(`<!-- Semantic Substrate source: ${source.name} -->\n\n${sourceText.trim()}`);
    }
    humanText = parts.join("\n\n---\n\n");
  } else {
    throw new Error(`No human Semantic Substrate source for ${item.context.name}`);
  }

  const title = frontmatter.title || item.context.title || item.record.key;
  humanText = stripHumanEnvelope(humanText);
  if (item.slug === "context-layer-master-index") humanText = rewriteIndexDocumentLinks(humanText);
  humanText = rewriteHumanLinks(humanText).replace(/\r\n/g, "\n");
  humanTextBySlug.set(item.slug, humanText);
  await writeFile(path.join(publicRoot, "ormd", `${item.slug}.ormd`), ormdBytes);
  await writeFile(path.join(publicRoot, "human", `${item.slug}.md`), humanText, "utf8");
  await writeFile(
    path.join(docsRoot, "ormd", `${item.slug}.html`),
    renderAiPage({
      title,
      description: `AI-readable ORMD authority document: ${title}`,
      canonicalUrl: `${githubPagesBase}/ormd/${item.slug}.html`,
      body: [
        '<p><a href="../">← E² AI index</a> · <a href="../corpus.html">Whole ORMD corpus</a></p>',
        `<h1>${escapeHtml(title)}</h1>`,
        `<p class="notice">This page is an HTML transport mirror. The ORMD below is the AI-facing authority and is preserved verbatim from <a href="${githubRawBase}/ormd/${item.slug}.ormd">the canonical repository snapshot</a>.</p>`,
        `<pre>${escapeHtml(ormdText)}</pre>`,
      ].join("\n"),
    }),
    "utf8",
  );

  const wordCount = humanText.trim().split(/\s+/).filter(Boolean).length;
  docs.push({
    slug: item.slug,
    title,
    clusterId: item.clusterId,
    frame: frontmatter.frame ?? item.context.frame ?? null,
    confidence: frontmatter.resolution?.confidence ?? item.context.confidence ?? null,
    status: item.record.status,
    relationship: item.record.relationship,
    wordCount,
    humanUrl: `/human/${item.slug}.md`,
    ormdUrl: `/ormd/${item.slug}.ormd`,
    humanSources: semanticSources.map((source) => source.name),
    ormdSource: item.context.name,
    humanSha256: sha256(Buffer.from(humanText, "utf8")),
    ormdSha256: sha256(ormdBytes),
  });

  corpusParts.push([
    `<!-- BEGIN ORMD: ${item.context.name} -->`,
    ormdText.trimEnd(),
    `<!-- END ORMD: ${item.context.name} -->`,
  ].join("\n"));
}

docs.sort((a, b) => {
  if (a.slug === "context-layer-master-index") return -1;
  if (b.slug === "context-layer-master-index") return 1;
  const clusterOrder = (a.clusterId ?? "Z").localeCompare(b.clusterId ?? "Z");
  return clusterOrder || a.title.localeCompare(b.title);
});

const catalogClusters = clusters.map(({ filenames, ...cluster }) => ({
  ...cluster,
  docs: docs.filter((doc) => doc.clusterId === cluster.id).map((doc) => doc.slug),
}));

const uncategorized = docs.filter((doc) => doc.slug !== "context-layer-master-index" && !doc.clusterId);
if (uncategorized.length) {
  throw new Error(`Unclustered ORMD documents: ${uncategorized.map((doc) => doc.ormdSource).join(", ")}`);
}

const catalog = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  title: "E² Core Framework",
  description: "Human-readable Semantic Substrate with paired AI-facing ORMD authority.",
  authority: {
    human: "Semantic Substrate Markdown",
    ai: "Context Layer ORMD",
    navigation: "Context Layer Master Index",
  },
  entrySlug: "context-layer-master-index",
  counts: {
    documents: docs.length,
    clusters: catalogClusters.length,
    humanWords: docs.reduce((sum, doc) => sum + doc.wordCount, 0),
  },
  clusters: catalogClusters,
  docs,
};

const graphSource = YAML.parse(await readFile(graphRelationsPath, "utf8")) ?? {};
if (graphSource.schema_version !== 1 || !Array.isArray(graphSource.relations)) {
  throw new Error("graph-relations.yml must use schema_version 1 and contain a relations list");
}

const docBySlug = new Map(docs.map((doc) => [doc.slug, doc]));
const graphEdges = [];
const explicitPairs = new Set();

function addGraphEdge(edge) {
  if (!docBySlug.has(edge.source)) throw new Error(`Graph relationship has unknown source: ${edge.source}`);
  if (!docBySlug.has(edge.target)) throw new Error(`Graph relationship has unknown target: ${edge.target}`);
  if (edge.source === edge.target) throw new Error(`Graph relationship cannot point to itself: ${edge.source}`);
  const id = `${edge.source}--${edge.type}--${edge.target}`;
  if (graphEdges.some((candidate) => candidate.id === id)) throw new Error(`Duplicate graph relationship: ${id}`);
  graphEdges.push({ id, ...edge });
  if (edge.certainty === "explicit") {
    explicitPairs.add([edge.source, edge.target].sort().join("::"));
  }
}

for (const relation of graphSource.relations) {
  addGraphEdge({
    source: relation.source,
    target: relation.target,
    type: relation.type,
    certainty: "explicit",
    provenance: "curated-navigation-ledger",
    note: relation.note ?? "Curated navigation relationship.",
  });
}

function graphTitleKey(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/\([^)]*\)/g, " ")
    .toLocaleLowerCase()
    .replace(/\bthe\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const graphEntryAliases = new Map([
  ["aomi ai responses", "aomi-ai-responses"],
]);

for (const cluster of catalogClusters) {
  const entries = cluster.entryPoint.split(/\s*→\s*/).filter(Boolean);
  for (const entry of entries) {
    const entryKey = graphTitleKey(entry);
    const aliasedTarget = graphEntryAliases.get(entryKey);
    const target = aliasedTarget ? docBySlug.get(aliasedTarget) : docs.find((doc) => {
      const titleKey = graphTitleKey(doc.title);
      return titleKey === entryKey || titleKey.startsWith(`${entryKey} `) || entryKey.startsWith(`${titleKey} `);
    });
    if (!target) continue;
    addGraphEdge({
      source: "context-layer-master-index",
      target: target.slug,
      type: "indexes",
      certainty: "explicit",
      provenance: "context-layer-master-index",
      note: `Entry point for Cluster ${cluster.id}.`,
    });
  }
}

const eligibleMentionTargets = docs.filter((doc) => {
  if (doc.slug === "context-layer-master-index") return false;
  const words = doc.title.match(/[A-Za-z0-9]+/g) ?? [];
  return words.length >= 3 || doc.title.length >= 22;
});

for (const source of docs) {
  if (source.slug === "context-layer-master-index") continue;
  const sourceText = humanTextBySlug.get(source.slug)?.toLocaleLowerCase() ?? "";
  const suggestions = [];
  for (const target of eligibleMentionTargets) {
    if (target.slug === source.slug) continue;
    const pair = [source.slug, target.slug].sort().join("::");
    if (explicitPairs.has(pair)) continue;
    const needle = target.title.toLocaleLowerCase();
    const occurrences = sourceText.split(needle).length - 1;
    if (occurrences > 0) suggestions.push({ target, occurrences, score: occurrences * 100 + needle.length });
  }
  suggestions.sort((a, b) => b.score - a.score || a.target.title.localeCompare(b.target.title));
  for (const suggestion of suggestions.slice(0, 3)) {
    addGraphEdge({
      source: source.slug,
      target: suggestion.target.slug,
      type: "references",
      certainty: "suggested",
      provenance: "exact-title-mention",
      note: `Generated from ${suggestion.occurrences} exact title mention${suggestion.occurrences === 1 ? "" : "s"}; review before treating as framework structure.`,
    });
  }
}

const graph = {
  schemaVersion: 1,
  generatedAt: catalog.generatedAt,
  title: "E² Core Framework relationship graph",
  description: "Navigation graph for the public corpus. Curated edges are orientation metadata, while suggested edges come from exact title mentions and are not framework authority.",
  authority: {
    nodeContent: "Paired Context Layer ORMD",
    humanReading: "Semantic Substrate Markdown",
    relationships: "Navigation metadata only; consult the linked documents for authority",
  },
  counts: {
    nodes: docs.length,
    edges: graphEdges.length,
    explicitEdges: graphEdges.filter((edge) => edge.certainty === "explicit").length,
    suggestedEdges: graphEdges.filter((edge) => edge.certainty === "suggested").length,
  },
  clusters: catalogClusters.map(({ id, name, scope }) => ({ id, name, scope })),
  nodes: docs.map((doc) => ({
    id: doc.slug,
    title: doc.title,
    clusterId: doc.clusterId,
    frame: doc.frame,
    confidence: doc.confidence,
    status: doc.status,
    relationship: doc.relationship,
    wordCount: doc.wordCount,
    readerUrl: `/?doc=${doc.slug}`,
    ormdUrl: doc.ormdUrl,
  })),
  edges: graphEdges,
};

const llmsLines = [
  "# E² Core Framework",
  "",
  "> Public navigation index for the E² Core Framework. ORMD is the AI-facing authority; Semantic Substrate Markdown is the human reading surface.",
  "",
  `Canonical AI mirror: ${githubRawBase}/llms.txt`,
  `HTML AI mirror: ${githubPagesBase}/`,
  `Whole-corpus HTML mirror: ${githubPagesBase}/corpus.html`,
  `Source repository: https://github.com/DanPace725/e2-core-framework`,
  "",
  "## How to read this corpus",
  "",
  "1. Start with the Context Layer Master Index.",
  "2. Select the relevant A–I cluster and read only the ORMD documents needed for the task.",
  "3. Preserve each document's frame, confidence, lineage, and policy metadata.",
  "4. Do not treat the index, generated catalog, or human Markdown as a substitute for the paired ORMD authority.",
  "",
  `- [Context Layer Master Index (ORMD)](${githubRawBase}/ormd/context-layer-master-index.ormd)`,
  `- [Machine-readable catalog](${githubRawBase}/catalog.json)`,
  `- [Machine-readable relationship graph](${githubRawBase}/graph.json)`,
  `- [Combined ORMD corpus](${githubRawBase}/ormd-corpus.txt)`,
  `- [Human mobile reader](${publicSiteBase}/)`,
  "",
];

for (const cluster of catalogClusters) {
  llmsLines.push(`## Cluster ${cluster.id} — ${cluster.name}`, "", `Scope: ${cluster.scope}`, "");
  if (cluster.entryPoint) llmsLines.push(`Entry point: ${cluster.entryPoint}`, "");
  for (const slug of cluster.docs) {
    const doc = docs.find((candidate) => candidate.slug === slug);
    llmsLines.push(`- [${doc.title}](${githubRawBase}${doc.ormdUrl}) — frame: ${doc.frame ?? "unclassified"}; confidence: ${doc.confidence ?? "unrecorded"}`);
  }
  llmsLines.push("");
}

const llmsText = `${llmsLines.join("\n")}\n`;
const corpusText = `${corpusParts.join("\n\n")}\n`;
const catalogText = `${JSON.stringify(catalog, null, 2)}\n`;
const graphText = `${JSON.stringify(graph, null, 2)}\n`;
const htmlIndexSections = catalogClusters.map((cluster) => {
  const links = cluster.docs.map((slug) => {
    const doc = docs.find((candidate) => candidate.slug === slug);
    return `<li><a href="ormd/${doc.slug}.html">${escapeHtml(doc.title)}</a> <span class="meta">— frame: ${escapeHtml(doc.frame ?? "unclassified")}; confidence: ${escapeHtml(doc.confidence ?? "unrecorded")}</span></li>`;
  }).join("\n");
  return `<section id="cluster-${cluster.id.toLowerCase()}">
<h2>Cluster ${cluster.id} — ${escapeHtml(cluster.name)}</h2>
<p>${escapeHtml(cluster.scope)}</p>
<ul>${links}</ul>
</section>`;
}).join("\n");
const htmlIndex = renderAiPage({
  title: "AI index",
  description: "HTML navigation index for the E² Core Framework ORMD corpus.",
  canonicalUrl: `${githubPagesBase}/`,
  body: [
    "<h1>E² Core Framework — AI index</h1>",
    '<p class="notice">ORMD is the AI-facing authority. This is a standard HTML mirror for clients that cannot fetch raw text. Start with the master index, then follow only the cluster documents needed for the task.</p>',
    '<ol><li>Preserve each document’s frame, confidence, lineage, and policy metadata.</li><li>Do not substitute the generated catalog or human Markdown for paired ORMD authority.</li></ol>',
    '<ul><li><a href="ormd/context-layer-master-index.html">Context Layer Master Index</a></li><li><a href="corpus.html">Whole combined ORMD corpus in one HTML page</a></li><li><a href="catalog.json">Machine-readable catalog</a></li><li><a href="graph.json">Machine-readable relationship graph</a></li><li><a href="llms.txt">Plain-text AI index</a></li><li><a href="https://e2-core-framework.capulusirl.chatgpt.site/">Human mobile reader</a></li></ul>',
    htmlIndexSections,
  ].join("\n"),
});
const htmlCorpus = renderAiPage({
  title: "Combined ORMD corpus",
  description: "The complete E² Core Framework ORMD corpus in a single HTML document for AI clients.",
  canonicalUrl: `${githubPagesBase}/corpus.html`,
  body: [
    '<p><a href="./">← E² AI index</a></p>',
    "<h1>Combined ORMD corpus</h1>",
    '<p class="notice">This page contains the complete generated ORMD snapshot in one standard HTML document. ORMD remains the AI-facing authority.</p>',
    `<pre>${escapeHtml(corpusText)}</pre>`,
  ].join("\n"),
});

await writeFile(path.join(publicRoot, "llms.txt"), llmsText, "utf8");
await writeFile(path.join(coreRoot, "llms.txt"), llmsText, "utf8");
await writeFile(path.join(publicRoot, "catalog.json"), catalogText, "utf8");
await writeFile(path.join(publicRoot, "graph.json"), graphText, "utf8");
await writeFile(path.join(publicRoot, "ormd-corpus.txt"), corpusText, "utf8");
await writeFile(path.join(docsRoot, "index.html"), htmlIndex, "utf8");
await writeFile(path.join(docsRoot, "corpus.html"), htmlCorpus, "utf8");
await writeFile(path.join(docsRoot, "catalog.json"), catalogText, "utf8");
await writeFile(path.join(docsRoot, "graph.json"), graphText, "utf8");
await writeFile(path.join(docsRoot, "llms.txt"), llmsText, "utf8");
await writeFile(path.join(docsRoot, ".nojekyll"), "", "utf8");
await writeFile(path.join(docsRoot, "robots.txt"), "User-agent: *\nAllow: /\n", "utf8");
await writeFile(
  path.join(publicRoot, "robots.txt"),
  [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: ClaudeBot",
    "Allow: /",
    "",
    "User-agent: Claude-User",
    "Allow: /",
    "",
    "User-agent: Claude-SearchBot",
    "Allow: /",
    "",
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: Google-Extended",
    "Allow: /",
    "",
  ].join("\n"),
  "utf8",
);

console.log(`Published ${docs.length} paired documents across ${catalogClusters.length} clusters (${catalog.counts.humanWords.toLocaleString()} human words).`);
