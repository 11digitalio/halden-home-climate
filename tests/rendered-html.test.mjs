import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the complete Halden concept", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Halden Home Climate/);
  assert.match(html, /Comfort, without the runaround/);
  assert.match(html, /What changed<br\/>at home/);
  assert.match(html, /Tell us what your home is doing/);
  assert.match(html, /Back to SiteHouse/);
  assert.match(html, /https:\/\/www\.sitehouse\.co\/#work/);
  assert.match(html, /noindex/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|LocalBusiness/);
});
