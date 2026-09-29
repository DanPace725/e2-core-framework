import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projectOrmdToHuman } from "./ormd-human.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const coreRoot = path.resolve(siteRoot, "..");
const registry = JSON.parse(await readFile(path.join(coreRoot, "core_registry.json"), "utf8"));
const primary = JSON.parse(await readFile(path.join(siteRoot, "scripts", "ormd-primary.json"), "utf8"));
const statePath = path.join(siteRoot, "scripts", "human-sync-state.json");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const records = new Map(registry.records.flatMap((record) =>
  record.context_layer.map((context) => [context.name, { record, context }])),
);
const state = process.argv.includes("--init")
  ? {}
  : JSON.parse(await readFile(statePath, "utf8"));
const updates = [];

for (const name of primary) {
  const pair = records.get(name);
  if (!pair || pair.record.semantic_substrate.length !== 1) {
    throw new Error(`Missing one-to-one source pair for ${name}`);
  }
  const sourcePath = path.join(coreRoot, ...pair.record.semantic_substrate[0].path.split("/"));
  const contextPath = path.join(coreRoot, ...pair.context.path.split("/"));
  const current = await readFile(sourcePath);
  const currentHash = sha256(current);
  if (process.argv.includes("--init")) {
    if (!pair.record.body_equivalent_after_frontmatter) {
      throw new Error(`Cannot initialize an intentionally different pair: ${name}`);
    }
    state[name] = currentHash;
    continue;
  }
  const projection = projectOrmdToHuman(await readFile(contextPath, "utf8"));
  const next = Buffer.from(projection, "utf8");
  const nextHash = sha256(next);
  if (currentHash !== state[name] && currentHash !== nextHash) {
    throw new Error(`Human document changed independently of ORMD; review before overwriting: ${sourcePath}`);
  }
  const sameBody = current.toString("utf8").replace(/\r\n/g, "\n").replace(/\n+$/, "")
    === projection.replace(/\n+$/, "");
  const changed = currentHash !== nextHash && !sameBody;
  updates.push({ name, sourcePath, next, nextHash: changed ? nextHash : currentHash, changed });
}

if (!process.argv.includes("--init")) {
  for (const { name, sourcePath, next, nextHash, changed } of updates) {
    if (changed) await writeFile(sourcePath, next);
    state[name] = nextHash;
  }
}
await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
console.log(`${process.argv.includes("--init") ? "Initialized" : "Synchronized"} ${primary.length} ORMD-primary human documents.`);
