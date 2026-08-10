# E² Core Framework Reader

Public, mobile-friendly access to the E² Core Framework with two deliberately separate surfaces:

- Semantic Substrate Markdown is rendered for human readers.
- Context Layer ORMD is published without reinterpretation for AI systems.

The existing Context Layer Master Index drives the A–K navigation. `public/llms.txt`, `public/catalog.json`, individual files under `public/ormd/`, and `public/ormd-corpus.txt` provide progressively larger machine-readable entry points.

## Refresh the snapshot

From this directory:

```powershell
npm run sync:corpus
npm test
```

`scripts/sync-corpus.mjs` reads the adjacent Core Framework registry and source folders. It generates committed public assets so the hosted source remains self-contained. When the adjacent source is unavailable in a remote build, it uses the committed snapshot.

Generated human copies may rewrite local Markdown links to reader routes. Canonical source documents in `E2Core/` are never changed by the generator.
