import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const readerRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const coreRoot = path.resolve(readerRoot, "..");
const registry = JSON.parse(await readFile(path.join(coreRoot, "core_registry.json"), "utf8"));
const reviewed = new Set(JSON.parse(await readFile(path.join(readerRoot, "scripts/ormd-primary.json"), "utf8")));

const pairs = registry.records.filter((record) => record.status === "paired_exact_stem");
const pending = pairs.filter((record) => !reviewed.has(record.context_layer?.[0]?.name));
const encodeSegment = (segment) => encodeURIComponent(segment).replace(/[()]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
const asLink = (source) => `../${source.path.split("/").map(encodeSegment).join("/")}`;
const escapeLabel = (value) => value.replaceAll("[", "\\[").replaceAll("]", "\\]");

for (const record of pending) {
  if (record.semantic_substrate?.length !== 1 || record.context_layer?.length !== 1) {
    throw new Error(`Expected one human and one ORMD document for ${record.key}`);
  }
}

const lines = [
  "# Human Markdown / ORMD review queue",
  "",
  `**${pending.length} pairs pending review** out of ${pairs.length} exact-stem pairs. The other ${pairs.length - pending.length} pairs are listed in [the reviewed ORMD set](scripts/ormd-primary.json).`,
  "",
  "These human Markdown files remain the source for the human reader until each pair is reviewed. Compare substantive claims, scope, and later revisions in both files; do not replace a human file solely because the ORMD has metadata or link annotations. After reconciliation, add the ORMD filename to `scripts/ormd-primary.json` and run `npm run sync:human` and `npm test` from `reader-site`.",
  "",
  "Regenerate this queue with `node scripts/write-review-queue.mjs` from `reader-site`. The queue is derived from `core_registry.json` and `scripts/ormd-primary.json`; the reviewed-set manifest, rather than this generated list, controls publication behavior.",
  "",
  ...pending.map((record) => {
    const human = record.semantic_substrate[0];
    const ormd = record.context_layer[0];
    const title = escapeLabel(human.title || record.key);
    return `- **${title}** — [human Markdown](${asLink(human)}) · [ORMD](${asLink(ormd)})`;
  }),
  "",
];

await writeFile(path.join(readerRoot, "ORMD_HUMAN_REVIEW_QUEUE.md"), lines.join("\n"), "utf8");
console.log(`Wrote ${pending.length} pending pairs to ORMD_HUMAN_REVIEW_QUEUE.md`);
