const RAW_CORPUS_ROOT = "https://raw.githubusercontent.com/DanPace725/e2-core-framework/main/reader-site/public";
const CORPUS_PATH = /^\/(?:catalog\.json|graph\.json|llms\.txt|ormd-corpus\.txt|human\/[a-z0-9-]+\.md|ormd\/[a-z0-9-]+\.ormd)$/;
const AI_DOCUMENT_PATH = /^\/ai\/([a-z0-9-]+)$/;
const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function fetchPublishedCorpus(request: Request): Promise<Response | null> {
  const pathname = new URL(request.url).pathname;
  if (pathname !== "/ai" && !AI_DOCUMENT_PATH.test(pathname) && !CORPUS_PATH.test(pathname)) return null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405 });
  }
  if (pathname === "/ai" || AI_DOCUMENT_PATH.test(pathname)) return fetchAiMirror(pathname, request.method);

  try {
    const upstream = await fetch(`${RAW_CORPUS_ROOT}${pathname}`, {
      headers: { accept: "*/*" },
    });
    if (!upstream.ok) {
      return new Response("Published corpus is temporarily unavailable", { status: 502 });
    }
    const contentType = pathname.endsWith(".json")
      ? "application/json; charset=utf-8"
      : "text/plain; charset=utf-8";
    return new Response(request.method === "HEAD" ? null : upstream.body, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=30",
        "x-e2-corpus-source": "github-main",
      },
    });
  } catch {
    return new Response("Published corpus is temporarily unavailable", { status: 502 });
  }
}

async function fetchAiMirror(pathname: string, method: string): Promise<Response> {
  try {
    let title = "AI index";
    let body = "";
    if (pathname === "/ai") {
      const response = await fetch(`${RAW_CORPUS_ROOT}/catalog.json`);
      if (!response.ok) throw new Error("Catalog unavailable");
      const catalog = await response.json() as { docs: Array<{ slug: string; title: string }> };
      body = `<h1>E² Core Framework — AI index</h1><p>Read the ORMD authority for each document. <a href="/llms.txt">Plain-text index</a></p><ul>${catalog.docs.map((doc) => `<li><a href="/ai/${encodeURIComponent(doc.slug)}">${escapeHtml(doc.title)}</a></li>`).join("")}</ul>`;
    } else {
      const slug = pathname.match(AI_DOCUMENT_PATH)?.[1];
      if (!slug) return new Response("Not found", { status: 404 });
      const response = await fetch(`${RAW_CORPUS_ROOT}/ormd/${slug}.ormd`);
      if (!response.ok) throw new Error("ORMD unavailable");
      const ormd = await response.text();
      title = slug;
      body = `<p><a href="/ai">AI index</a> · <a href="/ormd/${slug}.ormd">Raw ORMD</a></p><pre>${escapeHtml(ormd)}</pre>`;
    }
    return new Response(method === "HEAD" ? null : `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | E² Core Framework</title><style>body{font:1rem/1.6 system-ui,sans-serif;max-width:72rem;margin:2rem auto;padding:0 1rem;color:#102f27}pre{white-space:pre-wrap;overflow-wrap:anywhere}a{color:#075b4a}</style></head><body><main>${body}</main></body></html>`, {
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=30", "x-e2-corpus-source": "github-main" },
    });
  } catch {
    return new Response("Published corpus is temporarily unavailable", { status: 502 });
  }
}
