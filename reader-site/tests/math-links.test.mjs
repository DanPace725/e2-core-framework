import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";

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

  marked.use(markedKatex({ throwOnError: false, strict: false }));
  const mathHtml = marked.parse("Inline $E^2$ and display $$L_{n+1}=C(L_n)$$");
  assert.match(mathHtml, /class="katex"/);
  assert.doesNotMatch(mathHtml, /katex-error/);
  assert.deepEqual(missingLocalAnchors, [{ slug: "context-layer-master-index", fragment: "anchor" }]);
  assert.ok(readerLinks >= 20, `Expected active corpus cross-links, found ${readerLinks}`);
  assert.match(readerComponent, /markedKatex\(\{ throwOnError: false, strict: false \}\)/);
  assert.match(readerComponent, /unpublished-reference/);
  assert.match(readerComponent, /scrollToDocumentAnchor/);
  assert.match(layout, /katex\/dist\/katex\.min\.css/);
  assert.ok(packageJson.dependencies.katex);
  assert.ok(packageJson.dependencies["marked-katex-extension"]);
});
