# E2 Core Framework

This repository is the working corpus for the E2 Core Framework. It is structured for three complementary editing paths:

- Pages CMS for mobile-first drafting inside `staged work/mobile drafts/`.
- Git and pull requests for reviewed changes.
- AI agents operating under the repository rules in `AGENTS.md`.

## Public reader and AI access

The public reader is available at <https://e2-core-framework.capulusirl.chatgpt.site/>. It uses the existing Context Layer Master Index to organize the corpus into clusters A–K.

- Humans read the Semantic Substrate in the mobile-friendly site.
- AI systems read the paired Context Layer ORMD as the machine-facing authority.
- `llms.txt` is the compact navigation entry point: <https://e2-core-framework.capulusirl.chatgpt.site/llms.txt>
- The neutral HTML AI mirror is at <https://danpace725.github.io/e2-core-framework/>; its single-page whole-corpus view is <https://danpace725.github.io/e2-core-framework/corpus.html>.
- The raw master ORMD index is at <https://e2-core-framework.capulusirl.chatgpt.site/ormd/context-layer-master-index.ormd>.
- A machine-readable pairing catalog is at <https://e2-core-framework.capulusirl.chatgpt.site/catalog.json>.
- The complete combined ORMD snapshot is at <https://e2-core-framework.capulusirl.chatgpt.site/ormd-corpus.txt>.

The site source and deterministic snapshot generator live in `reader-site/`. Run `npm run sync:corpus` there after changing the canonical corpus, then validate and publish the refreshed snapshot.

## Corpus map

| Path | Role |
| --- | --- |
| `E2Core/Context Layer/` | Active ORMD context documents. Preserve ORMD headers, CLP metadata, lineage, and explicit heading IDs. |
| `E2Core/Semantic Substrate/` | Active semantic-source counterparts. Do not assume every file is a disposable mirror. |
| `Synthesized Core/` | Syntheses with source provenance. |
| `staged work/` | Candidate material and integration reviews; not canonical merely because it is present. |
| `archive/` | Preserved history. Do not delete or rewrite casually. |
| `CORE_INDEX.md` and related reports | Generated orientation surfaces, not source authority. |

The detailed integration process lives in `AGENT_INTEGRATION_PROCESS.md`.

## Mobile editing with Pages CMS

The repository-root `.pages.yml` intentionally exposes three conservative surfaces:

1. **Mobile drafts** provides a friendly structured editor and stores new Markdown drafts under `staged work/mobile drafts/`.
2. **Existing staged documents** provides a raw editor for direct staged files without permitting creation, rename, or deletion.
3. **Published Semantic Substrate** provides a raw mobile editor for the human-facing Markdown without allowing file creation, rename, or deletion.

The active `.ormd` corpus is not exposed to the rich-text editor. Those files contain custom CLP frontmatter, 2,000+ explicit heading IDs, and other syntax that a WYSIWYG round trip could normalize. AI agents should edit ORMD through Git branches and pull requests under `AGENTS.md`.

To connect the repository:

1. Open the public GitHub repository.
2. Push this repository with `main` as the default branch.
3. Open the hosted Pages CMS at <https://app.pagescms.org/> and install its GitHub App for this repository.
4. Select a working branch in Pages CMS before editing. Use a short-lived branch and merge through a pull request for reviewed work.
5. Use **Validate Core repository** in Pages CMS, or wait for the pull-request validation check.

Pages CMS edits the repository files directly; it is an editing layer, not a separate content database or documentation renderer. Its configuration documentation is at <https://pagescms.org/docs/configuration/>.

## Agent workflow

Agents should begin with `AGENTS.md`, read source documents rather than generated summaries, and keep each change contained. The default integration flow is:

```text
mobile or staged draft
  -> integration review
  -> candidate source document
  -> Context Layer ORMD
  -> indexes and synthesis updates
```

Run the integrity check before handing off changes:

```powershell
python tools/normalize_generated_paths.py
python tools/validate_repository.py
```

The normalization step makes machine-local paths in generated root reports repository-relative. Historical inputs outside this repository are represented with `legacy://phase1/...` provenance URIs. Run the step after using the Phase 1 report generators.

## Repository status

The public reader is deployed and externally reachable. This repository is configured for GitHub and Pages CMS; install the Pages CMS GitHub App for the repository and select a working branch before editing on mobile.
