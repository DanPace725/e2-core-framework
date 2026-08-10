import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const coreRoot = path.resolve(siteRoot, "..");
const publicRoot = path.join(siteRoot, "public");
const registryPath = path.join(coreRoot, "core_registry.json");
const contextRoot = path.join(coreRoot, "E2Core", "Context Layer");
const semanticIndexPath = path.join(coreRoot, "E2Core", "context layer index.md");
const contextIndexPath = path.join(contextRoot, "Context Layer Index.ormd");

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
  const headingPattern = /^## Cluster ([A-K])\s+[—-]\s+(.+?)(?:\s+\{#[^}]+\})?\s*$/gm;
  const matches = [...raw.matchAll(headingPattern)];

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const section = raw.slice(match.index, matches[i + 1]?.index ?? raw.length);
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
if (clusters.length !== 11) throw new Error(`Expected 11 clusters, found ${clusters.length}`);

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

const humanNameToSlug = new Map();
for (const item of items) {
  for (const source of item.record.semantic_substrate ?? []) {
    humanNameToSlug.set(source.name.toLowerCase(), item.slug);
  }
}
humanNameToSlug.set("context layer index.md", "context-layer-master-index");

function rewriteHumanLinks(markdown) {
  return markdown.replace(/\]\(([^)\s]+\.md)(?:#[^)\s]+)?(?:\s+"[^"]*")?\)/gi, (whole, href) => {
    const decoded = decodeURIComponent(href).replace(/\\/g, "/");
    const name = decoded.split("/").pop()?.toLowerCase();
    const target = name ? humanNameToSlug.get(name) : null;
    return target ? `](/?doc=${target})` : whole;
  });
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

await rm(path.join(publicRoot, "human"), { recursive: true, force: true });
await rm(path.join(publicRoot, "ormd"), { recursive: true, force: true });
await mkdir(path.join(publicRoot, "human"), { recursive: true });
await mkdir(path.join(publicRoot, "ormd"), { recursive: true });

const docs = [];
const corpusParts = [];

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

  humanText = rewriteHumanLinks(stripHumanEnvelope(humanText)).replace(/\r\n/g, "\n");
  await writeFile(path.join(publicRoot, "ormd", `${item.slug}.ormd`), ormdBytes);
  await writeFile(path.join(publicRoot, "human", `${item.slug}.md`), humanText, "utf8");

  const title = frontmatter.title || item.context.title || item.record.key;
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

const llmsLines = [
  "# E² Core Framework",
  "",
  "> Public navigation index for the E² Core Framework. ORMD is the AI-facing authority; Semantic Substrate Markdown is the human reading surface.",
  "",
  "## How to read this corpus",
  "",
  "1. Start with the Context Layer Master Index.",
  "2. Select the relevant A–K cluster and read only the ORMD documents needed for the task.",
  "3. Preserve each document's frame, confidence, lineage, and policy metadata.",
  "4. Do not treat the index, generated catalog, or human Markdown as a substitute for the paired ORMD authority.",
  "",
  "- [Context Layer Master Index (ORMD)](/ormd/context-layer-master-index.ormd)",
  "- [Machine-readable catalog](/catalog.json)",
  "- [Combined ORMD corpus](/ormd-corpus.txt)",
  "- [Human mobile reader](/)",
  "",
];

for (const cluster of catalogClusters) {
  llmsLines.push(`## Cluster ${cluster.id} — ${cluster.name}`, "", `Scope: ${cluster.scope}`, "");
  if (cluster.entryPoint) llmsLines.push(`Entry point: ${cluster.entryPoint}`, "");
  for (const slug of cluster.docs) {
    const doc = docs.find((candidate) => candidate.slug === slug);
    llmsLines.push(`- [${doc.title}](${doc.ormdUrl}) — frame: ${doc.frame ?? "unclassified"}; confidence: ${doc.confidence ?? "unrecorded"}`);
  }
  llmsLines.push("");
}

await writeFile(path.join(publicRoot, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
await writeFile(path.join(publicRoot, "llms.txt"), `${llmsLines.join("\n")}\n`, "utf8");
await writeFile(path.join(publicRoot, "ormd-corpus.txt"), `${corpusParts.join("\n\n")}\n`, "utf8");
await writeFile(path.join(publicRoot, "robots.txt"), "User-agent: *\nAllow: /\n\n# AI navigation index\nSitemap: /llms.txt\n", "utf8");

console.log(`Published ${docs.length} paired documents across ${catalogClusters.length} clusters (${catalog.counts.humanWords.toLocaleString()} human words).`);
