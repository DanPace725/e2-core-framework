# E² Core Framework Reader

Public, mobile-friendly access to the E² Core Framework with two reading surfaces:

- Context Layer ORMD is published unchanged for AI systems.
- Human Markdown is projected from ORMD for the reviewed pairs in `scripts/ormd-primary.json`. Existing Semantic Substrate Markdown remains the human source for the other pairs pending review.

The Context Layer Master Index drives the A–I navigation. `public/llms.txt`, `public/catalog.json`, individual files under `public/ormd/`, and `public/ormd-corpus.txt` provide progressively larger machine-readable entry points.

## Publication flow

The Core Framework repository is the publication source. After an active Core change is pushed to `main`, `.github/workflows/publish-reader-corpus.yml` validates the source, updates the reviewed human Markdown from ORMD, builds every reader and AI asset, and commits the generated snapshot. The hosted Sites worker reads those public assets from that repository, so a content update does not require another Sites deployment. Expect a short delay while the workflow and GitHub's raw-file cache update.

The human sync guards against independent edits to a generated Markdown counterpart. If it reports a conflict, review that pair before publishing. For new documents, update `core_registry.json` and the Context Layer Master Index so the corpus build can include them. The older differing pairs remain human-authored until reviewed individually; they are not silently replaced by ORMD.

The [human/ORMD review queue](ORMD_HUMAN_REVIEW_QUEUE.md) links both files for every pending exact-stem pair. Refresh it with `node scripts/write-review-queue.mjs` after registry or reviewed-set changes.

## Refresh locally

From this directory:

```powershell
npm run sync:human
npm test
```

`scripts/sync-corpus.mjs` reads the adjacent Core Framework registry and source folders. It generates committed public assets for the Core repository. A standalone Sites build has no adjacent Core and packages only the reader application; its corpus routes fetch the published Core snapshot.

Generated human copies may rewrite local Markdown links to reader routes. Canonical source documents in `E2Core/` are never changed by the generator.
