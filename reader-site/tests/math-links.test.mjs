import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";

marked.use(markedKatex({ throwOnError: false, strict: false, nonStandard: true }));

function renderCorpusMarkdown(markdown) {
  const withHeadingIds = markdown.replace(
    /^(#{1,6})\s+(.+?)\s*\{#([A-Za-z0-9_-]+)\}[ \t]*$/gm,
    (_whole, marks, heading, id) => `<h${marks.length} id="${id}">${marked.parseInline(heading, { async: false })}</h${marks.length}>`,
  );
  return marked.parse(withHeadingIds, { async: false });
}

test("renders formulas and keeps corpus cross-links resolvable", async () => {
  const [catalog, readerComponent, layout, packageJson] = await Promise.all([
    readFile(new URL("../public/catalog.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../app/CorpusReader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8").then(JSON.parse),
  ]);
  const docSlugs = new Set(catalog.docs.map((doc) => doc.slug));
  const markdownBySlug = new Map();
  for (const doc of catalog.docs) {
    markdownBySlug.set(doc.slug, await readFile(new URL(`../public/human/${doc.slug}.md`, import.meta.url), "utf8"));
  }

  let readerLinks = 0;
  const missingLocalAnchors = [];
  for (const [slug, markdown] of markdownBySlug) {
    const anchors = new Set([...markdown.matchAll(/\{#([A-Za-z0-9_-]+)\}/g)].map((match) => match[1]));
    for (const match of markdown.matchAll(/\]\(#([A-Za-z0-9_-]+)(?:\s+"[^"]*")?\)/g)) {
      if (!anchors.has(match[1])) missingLocalAnchors.push({ slug, fragment: match[1] });
    }
    for (const match of markdown.matchAll(/\]\(\/\?doc=([a-z0-9-]+)(?:#([A-Za-z0-9_-]+))?(?:\s+"[^"]*")?\)/g)) {
      readerLinks += 1;
      const targetSlug = match[1];
      assert.ok(docSlugs.has(targetSlug), `${slug} links to unknown corpus document ${targetSlug}`);
      if (match[2]) {
        const targetAnchors = new Set([...markdownBySlug.get(targetSlug).matchAll(/\{#([A-Za-z0-9_-]+)\}/g)].map((anchor) => anchor[1]));
        assert.ok(targetAnchors.has(match[2]), `${slug} links to missing ${targetSlug}#${match[2]}`);
      }
    }
  }

  const mathHtml = marked.parse("Inline $E^2$ and display $$L_{n+1}=C(L_n)$$");
  assert.match(mathHtml, /class="katex"/);
  assert.match(mathHtml, /class="katex-display"/);
  assert.doesNotMatch(mathHtml, /katex-error/);
  assert.deepEqual(missingLocalAnchors, [{ slug: "context-layer-master-index", fragment: "anchor" }]);
  assert.ok(readerLinks >= 20, `Expected active corpus cross-links, found ${readerLinks}`);
  assert.match(readerComponent, /markedKatex\(\{ throwOnError: false, strict: false, nonStandard: true \}\)/);
  assert.match(readerComponent, /\\}\[ \\t\]\*\$\/gm/);
  assert.match(readerComponent, /unpublished-reference/);
  assert.match(readerComponent, /scrollToDocumentAnchor/);
  assert.match(layout, /katex\/dist\/katex\.min\.css/);
  assert.ok(packageJson.dependencies.katex);
  assert.ok(packageJson.dependencies["marked-katex-extension"]);
});

test("renders compact corpus math and preserves Markdown blocks after explicit headings", async () => {
  const [mathDocument, masterIndex] = await Promise.all([
    readFile(new URL("../public/human/ct-translation-of-rps.md", import.meta.url), "utf8"),
    readFile(new URL("../public/human/context-layer-master-index.md", import.meta.url), "utf8"),
  ]);
  const mathHtml = renderCorpusMarkdown(mathDocument);
  const indexHtml = renderCorpusMarkdown(masterIndex);
  assert.match(mathHtml, /class="katex-display"/);
  assert.doesNotMatch(mathHtml, /\$\$\s*\\mathcal\{T\}/);
  assert.doesNotMatch(mathHtml, /\$\\text\{Ob\}/);
  assert.match(indexHtml, /<h2 id="cluster-map">Cluster Map<\/h2>\s*<table>/);
  assert.match(indexHtml, /<h2 id="cluster-a">[^<]*Foundational Axioms &amp; Core Ontology<\/h2>\s*<p><strong>Scope:<\/strong>/);
});

test("leaves no visible delimiter-shaped LaTeX in the published corpus", async () => {
  const catalog = JSON.parse(await readFile(new URL("../public/catalog.json", import.meta.url), "utf8"));
  const leaks = [];
  for (const doc of catalog.docs) {
    const markdown = await readFile(new URL(`../public/human/${doc.slug}.md`, import.meta.url), "utf8");
    const visibleHtml = renderCorpusMarkdown(markdown)
      .replace(/<pre\b[\s\S]*?<\/pre>/gi, "")
      .replace(/<code\b[\s\S]*?<\/code>/gi, "");
    const matches = visibleHtml.match(/\$\$[\s\S]*?\$\$|\$(?=[^$\n]*(?:\\[A-Za-z]+|[_^{}]))[^$\n]+\$/g) ?? [];
    if (matches.length) leaks.push({ slug: doc.slug, matches: matches.slice(0, 3) });
  }
  assert.deepEqual(leaks, []);
});

test("master-index document names open documents while cluster navigation stays local", async () => {
  const markdown = await readFile(
    new URL("../public/human/context-layer-master-index.md", import.meta.url),
    "utf8",
  );

  assert.match(markdown, /\[Relational Primitives\]\(\/?\?doc=relational-primitives/);
  assert.match(markdown, /\[E\^2 Equation\]\(\/?\?doc=e2-equation/);
  assert.match(markdown, /\[REMF\]\(\/?\?doc=remf/);
  assert.match(markdown, /\[Adversarial Occlusion & Mechanism Integrity V1\]\(\/?\?doc=adversarial-occlusion-and-mechanism-integrity-v1/);
  assert.match(markdown, /\[Context Layer Protocol \(CLP\)\]\(\/?\?doc=context-layer-protocol-clp/);
  assert.match(markdown, /\| \[A\]\(#cluster-a/);
  assert.match(markdown, /\[Cluster A\]\(#cluster-a\)/);
});
