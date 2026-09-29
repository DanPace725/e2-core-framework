import assert from "node:assert/strict";
import test from "node:test";

async function worker() {
  const url = new URL("../dist/server/index.js", import.meta.url);
  url.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(url.href)).default;
}

test("public corpus routes read the GitHub Core snapshot ahead of packaged assets", async () => {
  const originalFetch = globalThis.fetch;
  const requested = [];
  globalThis.fetch = async (url) => {
    requested.push(String(url));
    return new Response("fresh ORMD", { status: 200 });
  };
  try {
    const app = await worker();
    const response = await app.fetch(
      new Request("https://reader.example/ormd/attentional-access-and-formation-core-source.ormd"),
      { ASSETS: { fetch: () => { throw new Error("packaged asset used"); } } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "fresh ORMD");
    assert.equal(response.headers.get("x-e2-corpus-source"), "github-main");
    assert.deepEqual(requested, [
      "https://raw.githubusercontent.com/DanPace725/e2-core-framework/main/reader-site/public/ormd/attentional-access-and-formation-core-source.ormd",
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
