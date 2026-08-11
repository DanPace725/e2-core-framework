"use client";

import { marked } from "marked";
import Link from "next/link";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import type { GraphData } from "./CorpusGraph";

const CorpusGraph = lazy(() => import("./CorpusGraph").then((module) => ({ default: module.CorpusGraph })));

type CoreDoc = {
  slug: string;
  title: string;
  clusterId: string | null;
  frame: string | null;
  confidence: number | null;
  wordCount: number;
  humanUrl: string;
  ormdUrl: string;
  humanSources: string[];
};

type Cluster = {
  id: string;
  name: string;
  scope: string;
  triggers: string[];
  entryPoint: string;
  docs: string[];
};

type Catalog = {
  title: string;
  description: string;
  entrySlug: string;
  counts: { documents: number; clusters: number; humanWords: number };
  clusters: Cluster[];
  docs: CoreDoc[];
};

function sanitizeMarkdown(markdown: string) {
  const displayMarkdown = markdown.replace(/\s*\{#[A-Za-z0-9_-]+\}\s*$/gm, "");
  const rendered = marked.parse(displayMarkdown, { async: false }) as string;
  const parsed = new DOMParser().parseFromString(rendered, "text/html");

  parsed.querySelectorAll("script, iframe, object, embed, form, input, button, style").forEach((node) => node.remove());
  parsed.querySelectorAll("*").forEach((node) => {
    for (const attribute of [...node.attributes]) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();
      if (name.startsWith("on") || name === "srcdoc" || ((name === "href" || name === "src") && value.startsWith("javascript:"))) {
        node.removeAttribute(attribute.name);
      }
    }
  });

  return parsed.body.innerHTML;
}

function formatWords(words: number) {
  return new Intl.NumberFormat("en-US", { notation: words > 9999 ? "compact" : "standard" }).format(words);
}

export function CorpusReader() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [graph, setGraph] = useState<GraphData | null>(null);
  const [view, setView] = useState<"reader" | "graph">("reader");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [article, setArticle] = useState("");
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [graphError, setGraphError] = useState("");

  const selectDoc = useCallback((slug: string, push = true) => {
    if (slug === selectedSlug) {
      setDrawerOpen(false);
      setView("reader");
      if (push) {
        const url = new URL(window.location.href);
        url.searchParams.set("doc", slug);
        url.searchParams.delete("view");
        window.history.pushState({ slug }, "", url);
      }
      return;
    }
    setLoading(true);
    setError("");
    setSelectedSlug(slug);
    setDrawerOpen(false);
    if (push) {
      const url = new URL(window.location.href);
      url.searchParams.set("doc", slug);
      url.searchParams.delete("view");
      window.history.pushState({ slug }, "", url);
    }
    setView("reader");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedSlug]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/catalog.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
        return response.json() as Promise<Catalog>;
      })
      .then((nextCatalog) => {
        setCatalog(nextCatalog);
        const requested = new URLSearchParams(window.location.search).get("doc");
        setView(new URLSearchParams(window.location.search).get("view") === "graph" ? "graph" : "reader");
        const initial = requested && nextCatalog.docs.some((doc) => doc.slug === requested)
          ? requested
          : nextCatalog.entrySlug;
        setSelectedSlug(initial);
      })
      .catch((reason) => {
        if (reason.name !== "AbortError") setError(reason.message);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const onPopState = () => {
      if (!catalog) return;
      const requested = new URLSearchParams(window.location.search).get("doc");
      setView(new URLSearchParams(window.location.search).get("view") === "graph" ? "graph" : "reader");
      setLoading(true);
      setError("");
      setSelectedSlug(requested && catalog.docs.some((doc) => doc.slug === requested) ? requested : catalog.entrySlug);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [catalog]);

  useEffect(() => {
    if (view !== "graph" || graph) return;
    const controller = new AbortController();
    fetch("/graph.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Graph request failed (${response.status})`);
        return response.json() as Promise<GraphData>;
      })
      .then(setGraph)
      .catch((reason) => {
        if (reason.name !== "AbortError") setGraphError(reason.message);
      });
    return () => controller.abort();
  }, [graph, view]);

  const docMap = useMemo(() => new Map(catalog?.docs.map((doc) => [doc.slug, doc]) ?? []), [catalog]);
  const selectedDoc = docMap.get(selectedSlug);

  useEffect(() => {
    if (!selectedDoc) return;
    const controller = new AbortController();
    fetch(selectedDoc.humanUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Document request failed (${response.status})`);
        return response.text();
      })
      .then((markdown) => {
        setArticle(sanitizeMarkdown(markdown));
        setLoading(false);
      })
      .catch((reason) => {
        if (reason.name !== "AbortError") {
          setError(reason.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [selectedDoc]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredClusters = useMemo(() => {
    if (!catalog) return [];
    if (!normalizedQuery) return catalog.clusters;
    return catalog.clusters
      .map((cluster) => ({
        ...cluster,
        docs: cluster.docs.filter((slug) => {
          const doc = docMap.get(slug);
          return `${doc?.title ?? ""} ${doc?.frame ?? ""} ${cluster.name} ${cluster.triggers.join(" ")}`
            .toLowerCase()
            .includes(normalizedQuery);
        }),
      }))
      .filter((cluster) => cluster.docs.length > 0 || `${cluster.name} ${cluster.scope}`.toLowerCase().includes(normalizedQuery));
  }, [catalog, docMap, normalizedQuery]);

  const selectedIndex = catalog?.docs.findIndex((doc) => doc.slug === selectedSlug) ?? -1;
  const previousDoc = selectedIndex > 0 ? catalog?.docs[selectedIndex - 1] : undefined;
  const nextDoc = selectedIndex >= 0 && selectedIndex < (catalog?.docs.length ?? 0) - 1
    ? catalog?.docs[selectedIndex + 1]
    : undefined;

  const switchView = useCallback((nextView: "reader" | "graph") => {
    setView(nextView);
    const url = new URL(window.location.href);
    if (nextView === "graph") url.searchParams.set("view", "graph");
    else url.searchParams.delete("view");
    window.history.pushState({ view: nextView }, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectGraphDoc = useCallback((slug: string) => {
    setSelectedSlug(slug);
    const url = new URL(window.location.href);
    url.searchParams.set("view", "graph");
    url.searchParams.set("doc", slug);
    window.history.replaceState({ view: "graph", slug }, "", url);
  }, []);

  return (
    <div className={`reader-shell ${view === "graph" ? "graph-active" : ""}`}>
      <header className="site-header">
        {view === "reader" ? (
          <button className="menu-button" type="button" onClick={() => setDrawerOpen(true)} aria-label="Open corpus navigation">
            <span aria-hidden="true">☰</span>
          </button>
        ) : null}
        <Link className="brand" href="/?doc=context-layer-master-index" aria-label="E squared Core Framework home">
          <span className="brand-mark">E²</span>
          <span>Core Framework</span>
        </Link>
        <nav className="view-switcher" aria-label="Corpus view">
          <button type="button" className={view === "reader" ? "active" : ""} onClick={() => switchView("reader")}>Read</button>
          <button type="button" className={view === "graph" ? "active" : ""} onClick={() => switchView("graph")}>Graph</button>
        </nav>
        <nav className="utility-links" aria-label="Machine-readable resources">
          <a href="/llms.txt">AI index</a>
          <a href="/ormd-corpus.txt">ORMD corpus</a>
        </nav>
      </header>

      {view === "reader" ? <aside className={`sidebar ${drawerOpen ? "sidebar-open" : ""}`} aria-label="Corpus navigation">
        <div className="sidebar-top">
          <div>
            <p className="eyebrow">Semantic Substrate</p>
            <p className="sidebar-summary">{catalog ? `${catalog.counts.documents} documents · ${catalog.counts.clusters} clusters` : "Loading corpus…"}</p>
          </div>
          <button className="close-button" type="button" onClick={() => setDrawerOpen(false)} aria-label="Close navigation">×</button>
        </div>

        <label className="search-label" htmlFor="corpus-search">Search the framework</label>
        <input
          id="corpus-search"
          className="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Concept, title, or frame"
        />

        {catalog && (
          <button
            className={`index-link ${selectedSlug === catalog.entrySlug ? "active" : ""}`}
            type="button"
            onClick={() => selectDoc(catalog.entrySlug)}
          >
            <span>Start here</span>
            <strong>Context Layer Master Index</strong>
          </button>
        )}

        <div className="cluster-list">
          {filteredClusters.map((cluster) => (
            <details key={cluster.id} open={!normalizedQuery || cluster.docs.includes(selectedSlug)}>
              <summary>
                <span className="cluster-letter">{cluster.id}</span>
                <span>{cluster.name}</span>
                <small>{cluster.docs.length}</small>
              </summary>
              <div className="cluster-docs">
                {cluster.docs.map((slug) => {
                  const doc = docMap.get(slug);
                  if (!doc) return null;
                  return (
                    <button key={slug} className={slug === selectedSlug ? "active" : ""} type="button" onClick={() => selectDoc(slug)}>
                      {doc.title}
                    </button>
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      </aside> : null}

      {view === "reader" && drawerOpen ? <button className="drawer-scrim" type="button" aria-label="Close navigation" onClick={() => setDrawerOpen(false)} /> : null}

      {view === "graph" ? (
        <main className="graph-content">
          {graphError ? <div className="error-panel" role="alert"><strong>The graph could not load.</strong><span>{graphError}</span></div> : null}
          {!graph && !graphError ? <div className="loading-panel">Mapping the corpus…</div> : null}
          {graph ? (
            <Suspense fallback={<div className="loading-panel">Opening the graph…</div>}>
              <CorpusGraph
                graph={graph}
                selectedId={selectedSlug || graph.nodes[0]?.id || "context-layer-master-index"}
                onSelect={selectGraphDoc}
                onOpenDocument={selectDoc}
              />
            </Suspense>
          ) : null}
        </main>
      ) : <main className="content">
        <aside className="ai-navigation-note" aria-labelledby="ai-navigation-heading">
          <strong id="ai-navigation-heading">For AI assistants</strong>
          <span>
            If you reached this human reader, start with <a href="/llms.txt">/llms.txt</a>.
            Use <a href="/ormd-corpus.txt">/ormd-corpus.txt</a> for the complete ORMD corpus in one file,
            or <a href="/catalog.json">/catalog.json</a> to map clusters and individual documents.
            If your fetcher rejects plain text, use the <a href="https://danpace725.github.io/e2-core-framework/">HTML AI mirror</a>.
          </span>
        </aside>

        {error && <div className="error-panel" role="alert"><strong>The reader could not load this page.</strong><span>{error}</span></div>}
        {!error && !selectedDoc && <div className="loading-panel">Opening the corpus…</div>}
        {selectedDoc && (
          <>
            <section className="document-heading">
              <div className="document-kicker">
                <span>{selectedDoc.clusterId ? `Cluster ${selectedDoc.clusterId}` : "Framework index"}</span>
                {selectedDoc.frame && <span>{selectedDoc.frame}</span>}
              </div>
              <h1>{selectedDoc.title}</h1>
              <div className="document-meta">
                <span>{formatWords(selectedDoc.wordCount)} words</span>
                {selectedDoc.confidence !== null && <span>{Math.round(selectedDoc.confidence * 100)}% recorded confidence</span>}
                <span>{selectedDoc.humanSources.length > 1 ? `${selectedDoc.humanSources.length} Semantic sources` : "Semantic Substrate"}</span>
              </div>
              <div className="document-actions">
                <a className="primary-action" href={selectedDoc.ormdUrl}>ORMD for AI</a>
                <a href={selectedDoc.humanUrl}>Raw Markdown</a>
                <a href="/catalog.json">JSON catalog</a>
              </div>
            </section>

            <div className="authority-note">
              <strong>Reading contract</strong>
              <span>This page displays the human-facing Semantic Substrate. The paired ORMD is the machine-facing authority.</span>
            </div>

            {loading ? (
              <div className="loading-panel">Loading document…</div>
            ) : (
              <article className="markdown-body" dangerouslySetInnerHTML={{ __html: article }} />
            )}

            <nav className="document-pagination" aria-label="Adjacent documents">
              {previousDoc ? <button type="button" onClick={() => selectDoc(previousDoc.slug)}><span>Previous</span>{previousDoc.title}</button> : <span />}
              {nextDoc && <button className="next" type="button" onClick={() => selectDoc(nextDoc.slug)}><span>Next</span>{nextDoc.title}</button>}
            </nav>
          </>
        )}
      </main>}
    </div>
  );
}
