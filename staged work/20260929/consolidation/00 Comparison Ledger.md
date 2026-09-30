# 00 Comparison Ledger

**Status:** staged review record (plan §4 step 1, "Freeze a comparison ledger"). Inventory only: this ledger makes no disposition, merge, promotion, or archive decision.
**Plan:** `E2Core/E2Core Consolidation Plan - 2026-09-29.md`
**Snapshot:** active filesystem on 2026-09-29, including the user's uncommitted work. Generated surfaces (`CORE_REGISTRY.md`, `core_registry.json`, `docs/catalog.json`) were used for orientation. Every claim below was checked against file bodies, ORMD frontmatter, or directory listings.
**Moving target:** while this ledger was being written, the lead session archived the Tension pair to `archive/20260929_tension_ti/` and edited the TI, RIF, EDF, Context Layer Index, `context layer index.md`, and CHANGELOG files (git status at the end of this pass). Rows B6 and B10, and the counts in §1 and §3, describe the state **before** that change: 92 `.md`, 86 `.ormd`, and 81 exact-stem pairs. Re-count after each accepted package.

## Method and legend

- **Words**: whitespace-delimited word count. ORMD frontmatter is excluded, while headings and link annotations are counted. Counts are rough and meant for budgeting.
- **Pair status**
  - `pair`: human `.md` and `.ormd` share an exact stem.
  - `composite`: several human files feed one merged ORMD. The registry marks these `paired_composite_or_alias` / `lineage_preserving_merge`.
  - `renamed`: one human file maps to an ORMD with a different stem (`renamed_conversion`).
  - `human-only`: a Semantic-only file with no active ORMD.
  - `staged`, `SC`, and `archive` mark non-active files.
- **Reader status** comes from `reader-site/scripts/ormd-primary.json` (19 reviewed ORMD files), `E2Core/ORMD_HUMAN_REVIEW_QUEUE.md` (62 pending exact-stem pairs), and `reader-site/scripts/sync-corpus.mjs` / `docs/catalog.json`.
  - `R-ORMD`: reviewed. The human reader page is a projection of the ORMD.
  - `R-pending`: an exact-stem pair in the review queue. The human page is the preserved Semantic Substrate file.
  - `R-composite`: a composite or renamed pair. The human page is the Semantic Substrate file, or several files concatenated. These pairs are **not listed in the review queue**, which covers only exact-stem pairs.
  - `unpublished`: the reader does not publish the file (Semantic-only, staged, SC, or archive).
- **Similarity**: the word-sequence similarity ratio (difflib) between two bodies, after stripping ORMD frontmatter, `{#id}` anchors, and link targets. It is used only to show which ancestor a surviving human file matches.
- **Inbound references**: a search of active text files (E2Core, Synthesized Core, staged work, Rightness, root docs, and reader-site source; `archive/`, `node_modules`, and build output excluded). A hit is a link to the filename stem in any of these forms: `stem.md`/`.ormd`, its URL-encoded form, or `[[stem`. Own-pair hits are excluded. The categories are:
  - `nav`: CLI = `Context Layer/Context Layer Index.ormd`, cli.md = `E2Core/context layer index.md` (the reader's human index), queue = `ORMD_HUMAN_REVIEW_QUEUE.md`, CHANGELOG = `E2Core/CHANGELOG.md`.
  - `snap`: staged JSON/HTML/PY inventories (`20260910-conceptual-development/{inventory,evidence}.json`, `build_evidence.py`, `20260922-framework-resolution/corpus-snapshot.json`, `20260925/e2-development-timeline.html`).
  - `gen`: generated registry and site files (CORE_*, JSON, `docs/`, `llms.txt`). These regenerate and need no hand edits.
  - Title-only mentions are noted only where they matter.
- Abbreviations: `SS/` = `E2Core/Semantic Substrate/`, `CL/` = `E2Core/Context Layer/`, `SC/` = `Synthesized Core/`, `sw/` = `staged work/`, `A/` = `archive/`.

## 1. The five current Semantic-only sources

The folders hold 92 `.md` and 86 `.ormd` files. `Context Layer Index.ormd` is navigation, which leaves 85 content ORMDs. There are 81 exact-stem pairs. Eleven Semantic Substrate stems lack an exact-stem ORMD. The registry maps six of those into four composite or renamed records: `CRS.md` and `The Collective Relational Substrate.md`; the two MRIE files; `Relational Perfection A Framework for Emergent Int.md`; and `Relational Derivation Chain - E2 to RCP, MPDC, and AFD.md`. The remaining five match the registry's `semantic_substrate_only` records.

| # | Semantic-only file | Words | Absorbed into an active ORMD by lineage? | Archived ORMD twin | Body match | Reader | Plan row |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `SS/CCS.md` | 6,180 | Yes. `CL/Collective Cognitive Substrate.ormd` lists `A/20260612_step_1_2_merges/Context Layer/CCS.ormd` as a parent | `A/20260612_step_1_2_merges/Context Layer/CCS.ormd` | 1.00 vs the archived CCS.ormd; **1.00 vs `SS/Collective Cognitive Substrate.md`** (near duplicate, 6,180 vs 6,186 words) | unpublished | §3 B (CCS+CRS) |
| 2 | `SS/Communication as Complexity Reduction.md` | 410 | Yes. `CL/Communication as Coherence.ormd` lists the archived CaCR ORMD as a parent | `A/20260612_step_1_2_merges/Context Layer/Communication as Complexity Reduction.ormd` | 0.90 vs the archived twin | unpublished | §3 B (OSI+RPs+communication) |
| 3 | `SS/Power.md` | 1,694 | Yes. `CL/Power as Relational Field Coherence.ormd` lists `A/20260612_step_2_1_dialogues/Context Layer/Power.ormd` | The same file exists byte-identical in two archives: `A/20260612_step_1_2_merges/...` and `A/20260612_step_2_1_dialogues/...` | 0.97 vs the archived dialogue `Power.ormd` | unpublished | §2 row 1 only; no §3 package |
| 4 | `SS/Relational Ontology Derived from First Principles.md` | 3,667 | **No active ORMD cites it.** The June plan intended "V3 ⊃ earlier paper → archive as parent". The active `CL/Relational Primitives.ormd` cites the pass_3a RP and RP V3 archives, not this paper | `A/20260612_step_1_2_merges/Context Layer/Relational Ontology Derived from First Principles.ormd` (3,757 words) | 0.98 vs the archived twin; 0.15 vs the archived RP V3 | unpublished | §2 row 1; relevant to §3 B (OSI+RPs; RP derivations). `CL/CT translation of RPs.ormd` cites `urn:cb:relational-ontology-paper` |
| 5 | `SS/Our essence exists in the space between us.md` | 12 (a dated one-line aphorism, "7/27/23") | No. The June plan §1.1 asked to "rescue it into the Context Layer"; that was not done | None in the repo. `SC/Our essence exists in the space between us_summary.ormd` cites `urn:cb:Our essence exists in the space between us.ormd`, which exists only outside the repo in `Phase 1/Context Layer/` | n/a | unpublished | None. Adjacent to §3 B Essence/Declaration (title phrase recurs in Constitution Draft 2, Family, Ethical Principles, Resonance Map, and Nexes posts) |

## 2. Package ledgers

### A1. `E^2 Entry Point` (Extract, then archive)

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/E^2 Entry Point.md` | 711 | pair | R-pending | Regenerated after June condensation: 0.96 vs the active ORMD. **Begins with ORMD frontmatter debris** (`Context Layer Protocol (CLP) ---`, `frame:`, `lineage:` lines) |
| `CL/E^2 Entry Point.ormd` | 657 | pair | R-pending | Parents: `A/20260612_pass_3a_core_ontology/Context Layer/E^2 Entry Point.ormd` (condenses) and `.../E^2 Primer Compression.ormd` (integrates). conf 0.92 |
| `A/20260612_pass_3a_core_ontology/{Semantic Substrate,Context Layer}/E^2 Entry Point.{md,ormd}` | 5,124 / 5,410 | archive | unpublished | June predecessor, about 7x longer |
| `A/20260612_pass_3a_core_ontology/{…}/E^2 Primer Compression.{md,ormd}` | 1,117 / 1,180 | archive | unpublished | Integrated parent. **Identical in words (1.00) to `sw/20260929/EST/E^2 Primer Compression 1fb1…d796.md`** |
| `A/20260612_pass_3a_core_ontology/{…}/Initial Axioms.{md,ormd}` | 562 / 589 | archive | unpublished | Parent of `CL/E^2 Axioms.ormd`, which also cites the archived Entry Point (canonicalizes) |
| Comparison surfaces: `CL/Context Layer Index.ormd` (6,214), `E2Core/context layer index.md` (6,271), `SS`/`CL E^2 Axioms` (532/480), `SS`/`CL Relational Primitives` (1,142/1,086) | — | pair / meta | R-pending; the index is published as `context-layer-master-index` | — |
| SC: `SC/E2_Essence_of_Existence_synthesized.ormd` (2,436), with parents including Entry Point, Primer Compression, Essence, and Original E^2 work; `SC/Initial Axioms_summary.ormd` (437) | — | SC | unpublished | — |

**Inbound references to the Entry Point pair.** nav: CLI, cli.md, queue. Active Core links: `CL/E^2 Axioms.ormd` and `SS/E^2 Axioms.md`, `CL/E² as a Translation Architecture…ormd` (lineage parent: `extends_orientation`), `CL/Original E^2 work.ormd`. Staged: `sw/E² as a Translation Architecture… - Integration Review.md` and `sw/20260922-framework-resolution/Source Ledger.md`. SC: `E2_Essence_of_Existence_synthesized`. snap 4, gen 14. The Translation Architecture ORMD's `lineage.parents` names `local://semantic-substrate/E%5E2%20Entry%20Point.md`, so archiving needs a lineage-path note.
**Plan destination (§3 A):** "Retain any unique invitation or framing in an identified entry surface before archiving the superseded active pair." The plan leaves the entry surface unnamed; the candidates it names for comparison are the index, axioms, and primitives. Acceptance: the entry path stays navigable.

### A2. `AOMI AI responses` (Extract, then archive)

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/AOMI AI responses.md` | 1,313 | pair | R-pending | **Still holds the raw dialogue** (opens "Claude:"): 0.93 vs the archived dialogue, 0.06 vs the active ORMD. The human reader therefore publishes the pre-rewrite dialogue |
| `CL/AOMI AI responses.ormd` | 385 | pair | R-pending | Title "AOMI: Dialogue-Derived Doctrine Notes". Parent: `A/20260612_step_2_1_dialogues/Context Layer/AOMI AI responses.ormd`. conf 0.92 |
| `A/20260612_step_2_1_dialogues/Context Layer/AOMI AI responses.ormd` | 1,384 | archive | unpublished | Dialogue original |
| `A/20260612_step_2_1_dialogues/STEP_2_1_TRACKING.md` | 213 | archive | unpublished | The June tracking record |
| `SC/AOMI_synthesized.ormd` | 904 | SC | unpublished | Parents: AOMI AI responses, AOMI V1, and `AOMI Adversarial Occlusion and Mechanism Integrity.ormd` (the last exists only outside the repo, in `Phase 1/Context Layer/`) |
| Candidate "named AOMI destination": `SS`/`CL Adversarial Occlusion and Mechanism Integrity V1` | 2,873 / 3,101 | pair | R-pending | `parents: []`, conf 0.95. The CLI names it the Cluster F entry point |

**Inbound references to the AOMI AI responses pair.** nav: CLI, cli.md, queue. Active Core: `E2Core/notes.md` (June cleanup notes). SC: `AOMI_synthesized`. snap 3, gen 11. No SS or CL body links. The AOMI V1 pair, by contrast, has 10 staged review links (20260612, 20260807, 20260910, 20260914).
**Plan destination (§3 A):** "Retain unique mechanism or historical lessons in a named AOMI destination." The destination is not named. Raw dialogue stays in lineage.

### B1. Cognitive Signature Capture + MRIE

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/Cognitive Signature Capture An Unnamed Threat.md` | 531 | pair | R-pending | 0.86 vs the ORMD |
| `CL/Cognitive Signature Capture An Unnamed Threat.ormd` | 652 | pair | R-pending | `parents: []`, conf 0.85 |
| `SS/Meta-Relational Identity Exposure (MRIE).md` | 1,294 | composite (1 of 2) | R-composite | 0.98 vs `A/20260612_step_1_2_merges/Context Layer/Meta-Relational Identity Exposure (MRIE).ormd` (1,325) |
| `SS/Meta-relational Identity exposure (MRIE) Synthesis.md` | 848 | composite (2 of 2) | R-composite | 0.98 vs `A/20260612_step_1_2_merges/Context Layer/Meta-relational Identity exposure (MRIE) Synthesis.ormd` (876) |
| `CL/MRIE - Unified Synthesis.ormd` | 2,241 | composite target | R-composite (the human page concatenates both SS files, 2,162 words) | Parents: the two step_1_2 MRIE ORMDs. **CSC is not a parent.** conf 0.90 |
| `SC/MRIE_synthesized.ormd` | 1,388 | SC | unpublished | Parents: **CSC**, MRIE, MRIE Synthesis |

**Inbound references.** CSC pair: nav CLI, cli.md, queue; SC `MRIE_synthesized`; snap 3, gen 10; no Core body links. MRIE SS files: `E2Core/E2Core Consolidation Plan.ormd`, `sw/20260612/Maintenance Window - Integration Review.md` (MRIE.md only), and SC. The CL MRIE ORMD has nav only (CLI, cli.md; not in the queue), with no body links.
**Plan destination (§3 B):** "Test whether capture is a mechanism, threat pattern, or case within MRIE; retain its distinctive adversarial and consent claims." The implied destination is the MRIE node; the successor is not otherwise named.

### B2. Collective Cognitive Substrate + Collective Relational Substrate

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/CCS.md` | 6,180 | **human-only** (Semantic-only #1) | unpublished | See §1 |
| `SS/Collective Cognitive Substrate.md` | 6,186 | pair | R-pending (queue title "Cognition as *Substrate*") | 0.97 vs the archived twin; 1.00 vs the active ORMD |
| `CL/Collective Cognitive Substrate.ormd` | 6,483 | pair, but a merged ORMD | R-pending | `lineage_preserving_merge`. Parents: `A/20260612_step_1_2_merges/Context Layer/CCS.ormd` (6,529) and `.../Collective Cognitive Substrate.ormd` (6,486) |
| `SS/CRS.md` | 7,282 | composite (1 of 2) | R-composite | 1.00 vs `A/…step_1_2_merges/Context Layer/CRS.ormd` (7,691); **1.00 vs `SS/The Collective Relational Substrate.md`** |
| `SS/The Collective Relational Substrate.md` | 7,289 | composite (2 of 2) | R-composite | 0.96 vs `A/…step_1_2_merges/…/The Collective Relational Substrate.ormd` (7,164); 0.99 vs the active ORMD |
| `CL/Collective Relational Substrate.ormd` | 7,721 | composite target | R-composite (the human page concatenates both SS files, 14,587 words, near-duplicate text) | Parents: the step_1_2 `CRS.ormd` and `The Collective Relational Substrate.ormd`. conf 0.90 |
| `SC/Collective_Cognitive_Substrate_synthesized.ormd` (931), `SC/CRS_synthesized.ormd` (1,306) | — | SC | unpublished | Parents: the CCS pair and the CRS pair respectively |

**Inbound references.**
- CCS pair: nav CLI, cli.md, queue; `E2Core Consolidation Plan.ormd`; `sw/20260923/Attention - Access, Terrain, and Closure - Integration Review.md`; 20260910 conceptual-development md; SC; snap 5, gen 11.
- `SS/CCS.md`: links only from the June plan, the CCS ORMD (as lineage source), the 20260923 Attention review, and SC.
- CRS: `CL/Collective Relational Substrate.ormd` has nav CLI and cli.md; staged `sw/Relational Viscosity - Integration Review.md`, `sw/Relational Viscosity, Volition, and Interface Substrate - Integration Review.md`, `sw/20260914/claude_trust_continuity_preregistration_v0_1.md`, and `sw/20260925/Outbound Release Process{ - Integration Review, v0.2}.md`; SC `CRS_synthesized`.
- `SS/CRS.md` is linked from 10 staged md files: Relational Viscosity ×3, Maintenance Window, Self-Report Substrate, conceptual-development ×2, claude_trust_continuity, and Outbound Release ×2.

The **Relational Consciousness Scale ("RCS")** appears in `SS/CRS.md`, `SS/The Collective Relational Substrate.md`, and `CL/Collective Relational Substrate.ormd` (CRS.md line 387: "The RCS (Relational Consciousness Scale)").
**Plan destination (§3 B):** "Assess CCS as a CRS subtype with explicit differentiating conditions … Reconcile the remaining active human predecessors with the already merged ORMDs." The implied destination is the Collective Relational Substrate node.

### B3. Translation Architecture + E² Resolution + `What This Work Is For`

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/E² as a Translation Architecture for Human Remembrance.md` | 2,172 | pair (bodies equal) | **R-ORMD** (the only reviewed pair among the plan rows) | Header "Status: integrated core orientation"; source basis is the E2Core-root file plus the staged review |
| `CL/E² as a Translation Architecture for Human Remembrance.ormd` | 2,172 | pair | R-ORMD | Parents: `local://semantic-substrate/` E^2 Entry Point.md (extends_orientation), E^2 Axioms.md, EUP.md, and Communication as Coherence.md (bridges_translation_practice) |
| `E2Core/E² as a Translation Architecture for Human Remembrance.md` | 2,009 | E2Core-root source (tracked; not in the registry) | unpublished | The pre-integration source text; differs from the SS pair |
| `sw/E² as a Translation Architecture for Human Remembrance - Integration Review.md` | 959 | staged | unpublished | The integration review that promoted it |
| `sw/20260922-framework-resolution/E2 - A Resolution Through the Relational Primitives.md` | 4,270 | staged | unpublished | With `Source Ledger.md` (1,476) and `corpus-snapshot.json` in the same folder |
| `E2Core/What This Work Is For.md` | 1,950 | E2Core-root working draft (untracked) | unpublished | **1.00 vs `sw/20260910-conceptual-development/what-this-work-is-for.md` (1,955)**, a staged predecessor the plan does not mention. The E2Core copy has an empty H1 (`# `) |

**Inbound references.**
- Translation pair: nav CLI, cli.md. It is not in the queue because it is already reviewed. `CL/E^2 Entry Point.ormd` and `SS/E^2 Entry Point.md` link to it. Reader: `reader-site/scripts/ormd-primary.json` and `human-sync-state.json` (a hash is pinned); `reader-site/tests/reader.test.mjs` mentions the title.
- Staged links to the Translation pair: the Integration Review, `E² Relational Charter - Candidate Source.md` and `- Source Family Audit and Concordance.md`, the Resolution file and Source Ledger, and conceptual-development. snap 5, gen 11.
- The Resolution file is linked only from the plan and its Source Ledger. `What This Work Is For` is linked only from the plan; its title is mentioned in `SS`/`CL The Essence of Existence`, which are title hits for "Essence".

**Plan destination (§3 B):** undecided. The plan lists the options: "a shared orientation, cross-references, or a carefully scoped merger". An integration review comes before any staged content enters Core. The Resolution file remains staged and noncanonical. `What This Work Is For` is a working draft with no source authority.

### B4. `The Essence of Existence` + `Declaration of Interdependence`

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/The Essence of Existence.md` | **16,234** | pair | R-pending | **This is the pre-condensation "NexEs Manifesto v2.0" text** (line 3 heading "# The NexEs Manifesto v2.0: The Revolution You Can't Kill"). 0.99 vs the archived outlier. The reader publishes this long text |
| `CL/The Essence of Existence.ormd` | 854 | pair | R-pending | Parent: `A/20260612_step_2_3_outliers/Context Layer/The Essence of Existence.ormd` (condenses, 17,158 words). Origin `urn:ormd:e2:nexes-manifesto`. No NexEs Manifesto heading; "NexEs" appears in keywords and body |
| `SS/Declaration of Interdependence.md` | 339 | pair | R-pending | 0.97 vs the ORMD |
| `CL/Declaration of Interdependence.ormd` | 354 | pair | R-pending | `parents: []`, conf 1.0. The CLI names it the Cluster H entry point |
| Adjacent: `SS`/`CL Essence of Existence Constitution - Draft 2` | 1,778 / 1,853 | pair | R-pending | Parent `urn:ormd:essence-constitution-v1` |
| Adjacent: `SS/Our essence exists in the space between us.md` | 12 | human-only (#5) | unpublished | See §1 |
| SC: `E2_Essence_of_Existence_synthesized` (2,436), `Declaration of Interdependence_summary` (325), `Constitutions_synthesized` (691; parent `Constitutions.ormd`, which is out of repo) | — | SC | unpublished | — |
| Context: `sw/20260929/nexes/` (13 md, 4 png; see F) | — | staged | unpublished | — |

**Inbound references.**
- Essence pair: nav CLI, cli.md, queue; `sw/20260922-framework-resolution/Source Ledger.md`; SC; snap 3, gen 11. The Essence ORMD links out to Relational Primitives, E^2 Equation, and `SS/Relational Derivation Chain…md`.
- Essence title mentions: `What This Work Is For.md`, `SS/Family as a Relational Field.md`, and six Nexes files (Afd1, AFD3, Axioms 1 and 2, Compilation, The Relational Crisis).
- Declaration pair: nav CLI, cli.md, queue; `CL/Original E^2 work.ormd`; staged `E² Relational Charter` ×2 and the Translation Integration Review; SC. snap 3, gen 9.

**Plan destination (§3 B):** a potential manifesto/declaration merge; the "merged document's visible title" is to be chosen after comparison. Nexes serves only as context.

### B5. OSI + Relational Primitives + communication family

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/Ontological Systems Interface (OSI) Model.md` | 3,541 | pair | R-pending | Contains "Relational Capacity Scale (RCS)" (lines 71, 75) and "Relational Normality Transformer (RNT)" (lines 178 onward). 0.90 vs the ORMD |
| `CL/Ontological Systems Interface (OSI) Model.ormd` | 3,373 | pair | R-pending | `parents: []`, origin 2025-04-22, conf 0.90. Keywords include "Relational Capacity Scale" and "RNT" |
| `SS/Relational Primitives.md` | 1,142 | pair | R-pending | — |
| `CL/Relational Primitives.ormd` | 1,086 | pair | R-pending | Parents: `A/20260612_pass_3a_core_ontology/Context Layer/Relational Primitives.ormd` (canonicalizes), `.../Relational Primitives V3.ormd` (integrates), and `A/20260928_emergence_synthesis_reconciliation/Context Layer/Universal Emergence Pattern.ormd` |
| `SS/Communication as Coherence.md` | 1,359 | pair, but a merged ORMD | R-pending | 0.84 vs the archived CaC ORMD; 0.85 vs the active ORMD |
| `CL/Communication as Coherence.ormd` | 1,877 | pair | R-pending | `lineage_preserving_merge`. Parents: `A/20260612_step_1_2_merges/Context Layer/Communication as Coherence.ormd` (1,866) and `.../Communication as Complexity Reduction.ormd` (426) |
| `SS/Communication as Complexity Reduction.md` | 410 | human-only (#2) | unpublished | See §1 |
| `SS/Relational Ontology Derived from First Principles.md` | 3,667 | human-only (#4) | unpublished | See §1; the "earlier relational-ontology paper" of plan §2 |
| Archive RP ancestors: `A/20260612_pass_3a_core_ontology/{SS,CL}/Relational Primitives.{md,ormd}` (578/606), `…/Relational Primitives V3.{md,ormd}` (5,815/6,164). `Relational Primitives V3.ormd` is **byte-identical** in `A/20260612_step_1_2_merges/` | — | archive | unpublished | — |
| Possibly adjacent (not named in plan): `SS`/`CL Context Layer Protocol (CLP)` (1,406/1,582), `SS`/`CL Exposure Protocol` (762/805) | — | pair | R-pending | — |
| SC: `Ontological Systems Interface (OSI) Model_summary` (448), `Communication_Coherence_synthesized` (659; parents CaC and CaCR), `Relational_Primitives_synthesized` (1,251; parents Relational Ontology, RP V3, RP) | — | SC | unpublished | — |

**Inbound references.**
- OSI pair: nav CLI, cli.md, queue; `CL/Original E^2 work.ormd`; SC; snap 3, gen 11. Title mention in `SS/Power.md`.
- Communication as Coherence pair: nav CLI, cli.md, queue; `CL/E² as a Translation Architecture….ormd` (lineage parent); `CL/Original E^2 work.ormd`; June plan; staged Translation Integration Review, Source Ledger, conceptual-development; SC. gen 13.
- Relational Primitives pair: the most-linked row. nav CLI, cli.md, queue, CHANGELOG. Core links: `CL`/`SS E^2 Axioms`, `CL`/`SS E^2 Entry Point`, `CL`/`SS Global Closure Operator`, `CL/Original E^2 work`, `CL/Relational Derivation Chain .ormd`, and `CL/The Essence of Existence.ormd`. Staged: 10 md files: the 20260807 SCF review, conceptual-development ×2, the Resolution file and Source Ledger, the 20260923 Attention review, 20260925 Outbound Fit and Project Chronology, the 20260928 CST draft, and the Rightness review. The title is mentioned in about 78 files. gen 17.

**Plan destination (§3 B):** "Extract only distinct interface/communication mechanisms before archiving OSI." The receiving document is not named. RNT and RCS are reviewed as named OSI sections; the Communication human predecessors are reconciled against the June merge.

### B6. `Tension` + `Tensional Intelligence`

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/Tension.md` | 502 | pair | R-pending | H1 "Tension", dated 4/29/25. 0.95 vs the ORMD; 0.08 vs Tensional Intelligence |
| `CL/Tension.ormd` | 566 | pair | R-pending | **Title field: "Synthesis: Tensional Intelligence and the Praxis of Paradox"**, which differs from the human heading. `parents: []`, conf 0.92 |
| `SS/Tensional Intelligence A Theoretical Foundation.md` | 1,269 | pair | R-pending | — |
| `CL/Tensional Intelligence A Theoretical Foundation.ormd` | 1,330 | pair | R-pending | `parents: []`, conf 0.85 |
| `SC/Tensional_Intelligence_synthesized.ormd` | 673 | SC | unpublished | Parents: TI and Tension |

**Inbound references.** Tension pair: nav CLI, cli.md, queue; `E2Core/9.29.26 Consolidation Pass.md` (a `[Tension.md](http://Tension.md)` auto-link); `E2Core/notes.md`; SC; snap 3, gen 12. TI pair: nav CLI, cli.md, queue; `sw/20260807/Self as Coherence Field - Integration Review.md`; conceptual-development md; SC. Title mentioned in `SS`/`CL Original E^2 work`. gen 10. No archive ancestors were found.
**Plan destination (§3 B):** undecided ("prerequisite concept, a narrower claim, or genuinely duplicative"). Definitional and operational differences are retained.

### B7. `The Intelligence Field Framework` + REMA / Self as Coherence Field

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/The Intelligence Field Framework.md` | 587 | pair | R-pending | — |
| `CL/The Intelligence Field Framework.ormd` | 618 | pair | R-pending | `parents: []`, origin 2025-04-28, conf 0.85 |
| `SS/Self as Coherence Field.md` | 4,065 | pair | R-pending | Carries the provisional capacity profile (CHANGELOG 2026-09-28) |
| `CL/Self as Coherence Field.ormd` | 4,087 | pair | R-pending | Parents: `urn:cb:e2-framework`, `urn:cb:relational-primitives`, `urn:cb:mpdc`, `A/20260928_…/Context Layer/Relational Emergence Meta-Architecture (REMA).ormd`, and `A/20260928_…/Semantic Substrate/Relational Consciousness Framework.md` |
| `A/20260928_emergence_synthesis_reconciliation/`: REMA.ormd (973), REMF.{md,ormd} (1,162/1,368), Rema v2.md (2,526), Relational Consciousness Framework.md (997), Universal Emergence Pattern.{md,ormd} (2,250/443), three SC summaries (499–589), README.md (242) | — | archive | unpublished | REMA.ormd parents: `A/20260612_step_1_2_merges/Context Layer/Rema v2.ormd` and `A/20260612_pass_1_promotion_recovery/Context Layer/Relational Consciousness Framework.ormd` |
| Earlier June archives: `A/20260612_step_1_2_merges/Context Layer/{REMF.ormd (1,368), Rema v2.ormd (2,746)}`, `A/20260612_pass_1_promotion_recovery/Context Layer/Relational Consciousness Framework.ormd` (1,052) | — | archive | unpublished | REMF.ormd also appears in 20260928 (same word count, different hash) |
| `sw/20260928/Emergence and REMA - Integration Review.md` | 366 | staged | unpublished | The September 28 review |
| `SC/The Intelligence Field Framework_summary.ormd` | 433 | SC | unpublished | — |

**Inbound references.** IFF pair: nav CLI, cli.md, queue; SC summary; snap 3, gen 10. Title mentioned in the Tensional Intelligence pair. No Core body links. The SCF pair is linked from CHANGELOG and 11 staged md files (20260807 ×5, conceptual-development ×2, 20260914, Source Ledger, 20260924 Return Channel, Rightness review).
**Plan destination (§3 B):** "Retain useful distinctions without restoring the archived consciousness ladder, qualia mechanism, or unsupported universal claims." Self as Coherence Field is the implied receiving node. The plan does not name an IFF successor.

### B8. RP derivations

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/Derivation deep dive.md` | 7,069 | pair | R-pending | — |
| `CL/Derivation deep dive.ormd` | 7,499 | pair | R-pending | Title "Derivation Deep Dive: Categorical and Relational Physics". `parents: []`, conf 0.85 |
| `SS/CT translation of RPs.md` | 1,006 | pair | R-pending | — |
| `CL/CT translation of RPs.ormd` | 1,042 | pair | R-pending | Parents: `urn:cb:relational-ontology-paper`, conf 0.95. The CLI names it the Cluster B entry point |
| `SS/RP Lambda Calc Translation.md` | 537 | pair | R-pending | — |
| `CL/RP Lambda Calc Translation.ormd` | 560 | pair | R-pending | Parents: `urn:cb:relational-physics-core`, conf 0.98 |
| `SS`/`CL Relational Primitives` | 1,142 / 1,086 | pair | R-pending | See B5 |
| `SS/Relational Ontology Derived from First Principles.md` | 3,667 | human-only (#4) | unpublished | The likely target of CT's `urn:cb:relational-ontology-paper` |
| SC: `RP_Formal_Translations_synthesized` (822; parents CT and Lambda), `Derivation deep dive_summary` (570), `Relational_Primitives_synthesized` (1,251) | — | SC | unpublished | — |

**Inbound references.**
- Derivation deep dive pair: nav CLI, cli.md, queue; SC; snap 3, gen 8. No body links.
- CT pair: nav; `CL/Relational Primitives.ormd` and `SS/Relational Primitives.md`; `E2Core Consolidation Plan.ormd`; `Rightness/20260911/RaDRCD - Mathematical and Structural Assessment.md`; conceptual-development md; SC. gen 9.
- Lambda pair: nav; `CL`/`SS Relational Primitives`; SC. gen 11.

Archiving CT or Lambda requires editing the Relational Primitives pair's links.
**Plan destination (§3 B):** "One coherent derivation document … archive superseded CT and lambda translation files after mapping any distinct assumptions and proof status." The destination document is not named.

### B9. Resonance architecture family

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS`/`CL Resonance Architecture 4 17 25` | 2,219 / 2,327 | pair | R-pending | `parents: []`, conf 0.90 |
| `SS`/`CL The Resonance Framework An Ontological Map 4 24 25` | 820 / 907 | pair | R-pending | `parents: []`, conf 0.85 |
| `SS`/`CL The Architecture of Resonant Systems 4 26 25` | 920 / 943 | pair | R-pending | `parents: []`, conf 0.92 |
| `SC/Resonance_Architecture_synthesized.ormd` | 1,255 | SC | unpublished | Parents: all three. This is the "prior synthesis attempt" |

**Inbound references.** Each pair has nav CLI, cli.md, queue; SC; snap 3; gen 10. The Ontological Map is also linked from conceptual-development md. Titles are mentioned in `SS`/`CL Original E^2 work`. No Core body links. No archive ancestors were found.
**Plan destination (§3 B):** undecided ("which facets can combine and which remain useful as distinct historical perspectives").

### B10. RIF + EDF

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS`/`CL Relational Irreducibility Framework (RIF)` | 648 / 702 | pair | R-pending | `parents: []`, origin 2025-09-24, conf 0.90 |
| `SS`/`CL Emergence_Determination_Foreclosure` | 2,897 / 2,921 | pair | R-pending | `parents: []`. Deterministic conversion 2026-05-13; origin is the SS file |
| `SC/Relational Irreducibility Framework (RIF)_summary.ormd` | 547 | SC | unpublished | No SC file exists for EDF |

**Inbound references.** RIF pair: nav plus SC only (gen 10). EDF pair: `CL/Lawfulness - Core Source.ormd` and `SS/Lawfulness - Core Source.md` (Lawfulness also cites `urn:cb:edf` as a parent), 18 staged md files (20260612 ×5, 20260807 ×9, Relational Viscosity ×3, Rightness review), gen 13. Body similarity between RIF and EDF is 0.04.
**Plan destination (§3 B):** undecided ("share a claim, or merely address adjacent constraints"). Failure conditions stay distinct if needed.

### B11. Relational Perfection family + Cyclical Integrity

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/Relational Perfection A Manifesto.md` | 476 | pair | R-pending | — |
| `CL/Relational Perfection A Manifesto.ormd` | 510 | pair | R-pending | `parents: []`, conf 1.0 |
| `SS/Relational Perfection A Framework for Emergent Int.md` | 1,030 | renamed (truncated export stem) | R-composite | 1.00 vs the ORMD |
| `CL/Relational Perfection_framework.ormd` | 1,058 | renamed target | R-composite (slug `relational-perfection-framework`; not in the queue) | `parents: []`, conf 0.95 |
| `SS`/`CL The Cyclical Integrity framework` | 1,596 / 1,657 | pair | R-pending | `parents: []`, conf 0.90 |
| SC: `Relational_Perfection_synthesized` (771; parents Manifesto and Framework), `The Cyclical Integrity framework_summary` (513) | — | SC | unpublished | — |

**Inbound references.**
- Manifesto pair: nav; staged `E² Relational Charter` ×2; SC; gen 8.
- Framework SS: staged `E² Relational Charter` ×2, the Rightness review, and SC. The framework ORMD has nav CLI and cli.md only.
- Cyclical pair: nav; `sw/20260612/20260612 Staged Batch - Integration Synthesis.md`; SC; gen 8.
- Title mentions in `Rightness/20260910/Can rightness be derived.md`.

**Plan destination (§3 B):** "Produce a merged destination only where the argument can support it." Genre and claim-strength differences are retained.

### C1. `E^2 Equation` (reframe)

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/E^2 Equation.md` | 412 | pair | R-pending | **Pre-rewrite whiteboard-analysis text**: 0.97 vs the archived dialogue, 0.14 vs the active ORMD. The reader publishes this version |
| `CL/E^2 Equation.ormd` | 334 | pair | R-pending | Title "E^2 Equation: Recursive Composition and the Global Closure Operator". Parent: `A/20260612_step_2_1_dialogues/Context Layer/E^2 Equation.ormd` (438). **conf 0.98** |
| `A/20260612_step_2_1_dialogues/STEP_2_1_TRACKING.md` | 213 | archive | unpublished | Records the June third-person rewrite |
| Related: `SS`/`CL Global Closure Operator` (843/784); archive `A/20260612_pass_3b_3c_mechanism_ethics/{SS,CL}/{Global Closure Operator, GCO logic}` | — | pair / archive | R-pending | GCO ORMD parents: the archived GCO (canonicalizes) and GCO logic (integrates) |
| SC: `E2_Essence_of_Existence_synthesized` (parent `E^2_Equation.ormd`), `Global_Closure_Operator_synthesized` (883) | — | SC | unpublished | — |

**Inbound references.** Heavily linked. Core: `CL`/`SS E^2 Axioms`, `CL`/`SS E^2 Entry Point`, `CL`/`SS Global Closure Operator`, `CL`/`SS Relational Primitives`, `CL/Original E^2 work`, `CL/Relational Derivation Chain .ormd`, `CL/The Essence of Existence.ormd`. Staged: the Resolution file, Source Ledger, conceptual-development. SC: E2_Essence synthesized. gen 17.
**Plan destination (§3 C):** reframe in place as a separate package. The work marks scope and historical role and separates formal fixed-point claims from interpretive aspiration. The plan says not to inherit the 0.98 confidence silently.

### C2. `resolution_synthesis` (standalone theory)

| File | Words | Pair | Reader | Lineage / ancestry |
| --- | --- | --- | --- | --- |
| `SS/resolution_synthesis.md` | 1,797 | pair | R-pending | — |
| `CL/resolution_synthesis.ormd` | 1,814 | pair | R-pending | Title "Resolution: Synthesis Notes". `parents: []`; deterministic conversion 2026-05-13 |
| Related staged: `sw/20260922-framework-resolution/` (see B3) | — | staged | unpublished | — |

**Inbound references.** **Two active ORMDs cite it in `lineage.parents`:** `CL/Embedded Universality Principle (EUP).ormd` (`resolution_synthesis.ormd`) and `CL/Intervention Stewardship - Core Source.ormd` (`local://semantic-substrate/resolution_synthesis.md`). `SS/Intervention Stewardship - Core Source.md` also links to it. Staged: 16 md files (20260612 ×7, 20260807 SCF review, conceptual-development ×2, the Resolution file, Source Ledger, 20260923 Attention review, 20260924 Return Channel, 20260928 AAF pass). The CLI names it in the Cluster C entry path. gen 14.
**Plan destination (§3 C):** a standalone theory document developed from the notes. "Resolution Invariant" is a provisional handle only. A scoped draft is needed "before any replacement of current notes".

### C3 / E. Eidosemantic Systems Theory (`sw/20260929/EST/`, 18 files)

The files are all staged and unpublished, and no active Core file links into the folder. `SS/Original E^2 work.md` line 25 links to a Notion-export path for "Eidosemantic Systems Theory" (`Original%20E%5E2%20work/Eidosemantic%20Systems%20Theory%201fb1….md`). `CL/Original E^2 work.ormd` line 63 names `Eidosemantic Systems Theory.ormd`, which is not in the repo. The table follows the plan §3 E groups. The plan lists `Conversations 1f71…` in both the first and fourth groups.

| File (export ID truncated) | Words | Link role (verified) | Plan group |
| --- | --- | --- | --- |
| `Eidosemantic Systems Theory 1fb1…51db.md` | 14 | Hub. Links to Primer, Meta syntax, Conversations (1fb1), Compressions, and E^2 Primer Compression | Intro (link hub) |
| `Initial Conversation on EST 1fb1…505c.md` | 526 | Content | Original articulation |
| `5 19 25 PLFN Conversation 1f81…3c38.md` | 2,446 | Content | Original articulation |
| `Conversations 1f71…3423.md` | 2,561 | Content plus a link to the 5.19.25 PLFN Conversation | Original articulation / AI conversations |
| `Meta syntax 1f71…1aec.md` | 10 | Hub. Links to Initial Conversation, PLFN, and TACITRA | Original articulation |
| `PLFN 1f71…5d07.md` | 7 | Hub. Links to Conversations (1f71) and PLFN Draft2 | Original articulation |
| `PLFN Draft2 1f81…fe8e.md` | 797 | Content | Working specification |
| `TACITRA 1fb1…7960.md` | 977 | Content | Working specification |
| `Primer 1fc1…c51c.md` | 1,076 | Content | Teaching/notation |
| `E^2 Primer Compression 1fb1…d796.md` | 1,117 | Content. **Word-identical to the archived Entry Point parent `A/20260612_pass_3a_core_ontology/Semantic Substrate/E^2 Primer Compression.md`** | Teaching/notation |
| `Infinity^3 1fb1…4c6f.md` | 1,618 | Content | Teaching/notation |
| `ECN Translation Key (v0 3) - Claude 4 1fc1…2b54.md` | 197 | Content | Teaching/notation |
| `Paradox Engine on EST 1fb1…fcbae.md` | 1,824 | Content | AI conversations |
| `Gemini 2 5 "Book Idea E Squared Framework" 1fb1…b3ad.md` | 2,721 | Content | AI conversations |
| `Claude 4 On EST 1fb1…f43d.md` | 601 | Content | AI conversations |
| `Claude 4 "Unpacking Eidosemantic Systems Theory" 1fb1…8668.md` | 584 | Content | AI conversations |
| `Compressions 1fb1…50bb.md` | 28 | Hub. Links to Infinity^3, Gemini, Claude Unpacking, and the ECN Key | AI conversations |
| `Conversations 1fb1…bdb.md` | 11 | Hub. Links to Paradox Engine and Claude 4 On EST | AI conversations |

The total is about 17,100 words, with 5 pure link hubs (the EST hub, Meta syntax, PLFN, Compressions, and Conversations 1fb1) and 13 content files. `Conversations 1f71…` has content and one link.
**Plan destination (§3 C, E):** a source ledger, claim map, versioned symbol table, and contained integration review. The folder stays an intake, and "No staged file becomes canonical merely because it is in the EST folder." A standalone source/ORMD pair is only "considered" after review.

### F. Nexes blog (`sw/20260929/nexes/`)

| File | Words | Role (verified from links) |
| --- | --- | --- |
| `Nexes 2291…ec78.md` | 19 | Top hub. Links to The Journey, The Relational Crisis, Nexes (…cb2), Drafts, the Compilation, and Fast Fashion |
| `Nexes 2291…1cb2.md` | 1,907 | Post/content |
| `The Journey 2291…1199851.md` | 1,401 | Post |
| `The Relational Crisis 2291…6594.md` | 1,079 | Post |
| `The Durable Heresy of Fast Fashion 3791…968d.md` | 1,934 | Post. Embeds 4 PNGs: `ChatGPT_Image_Jun_8_2026_08_56_19_AM.png` and `_-_visual_selection{,_(1),_(2)}.png` |
| `Compilation of Nexus Posts 2291…0f4e2b.md` | 5,482 | Compilation (spelled "Nexus"); links to itself |
| `Drafts 2291…17cbd.md` | 9 | Hub. Links to Axioms 1, Axioms 2, Afd1, AFD2, and AFD3 |
| `Axioms 1 …e555.md` / `Axioms 2 …6d19.md` | 522 / 1,320 | Drafts |
| `Afd1 …04fc.md` / `AFD2 …05df.md` / `AFD3 …36ae.md` | 1,379 / 1,312 / 1,804 | Drafts |

The total is about 18,170 words. No active Core file links to any Nexes file. "Essence of Existence" is mentioned in Afd1, AFD3, Axioms 1 and 2, the Compilation, and The Relational Crisis. "Our essence exists in the space between us" is mentioned in the Compilation, Nexes (…cb2), and The Journey.
**Plan destination (§3 F):** a contextual ledger only. The material stays staged unless a separate integration review finds a specific contribution. The whole blog is not folded into the manifesto merge.

## 3. Discrepancies: plan §2 (and related §3 statements) vs disposition on disk

| Plan statement | Found on disk | Source of evidence |
| --- | --- | --- |
| §2 r1: merged or successor ORMD plus June archives exist for "CCS, CRS, MRIE, Power, Communication, REMF/REMA, and Relational Primitives V3" | Confirmed for CCS, CRS, MRIE, Power, and Communication. For RP V3, the active `CL/Relational Primitives.ormd` cites the `20260612_pass_3a_core_ontology` RP and RP V3 archives. **The archived `Relational Ontology Derived from First Principles.ormd` (step_1_2) is cited by no active ORMD**, so the June "earlier paper → archive as parent" link is missing | `CL/Relational Primitives.ormd` lineage; grep over CL |
| §2 r1: human predecessors "still exist for CCS, CRS, MRIE, Power, Communication, and the earlier relational-ontology paper" | Confirmed. The case splits by registry status: `CCS.md`, `Power.md`, `Communication as Complexity Reduction.md`, and `Relational Ontology…md` are Semantic-only and unpublished; the CRS and MRIE human files are composite and published by concatenation. The June merges reused one source's filename (Collective Cognitive Substrate, Communication as Coherence, Power as RFC), so their surviving same-stem human file registers as an ordinary pair in the review queue | `core_registry.json`; `docs/catalog.json` |
| §2 r1 (implicit): June archives are distinct | `Relational Primitives V3.ormd` is byte-identical in `20260612_pass_3a_core_ontology` and `20260612_step_1_2_merges`. `Power.ormd` is byte-identical in `20260612_step_1_2_merges` and `20260612_step_2_1_dialogues`. `REMF.ormd` exists in both step_1_2 and 20260928 (same length, different hash) | sha256 over `archive/` |
| §2 r3: tracking record covers E^2 Equation, Power, and AOMI | Confirmed, and it also covers `Universal Emergence Pattern E² Integration and Ext.ormd`. The tracking note names the Power successor `Power Through the E2 Lens.ormd`. **No such file exists**; the active successor is `Power as Relational Field Coherence.ormd` | `A/20260612_step_2_1_dialogues/STEP_2_1_TRACKING.md` |
| §2 r3: "The active ORMD Equation and AOMI texts cite those parents" | Confirmed. However, **the active human files `SS/AOMI AI responses.md` and `SS/E^2 Equation.md` still hold the pre-rewrite dialogue text** (0.93 / 0.97 vs the archived dialogues; 0.06 / 0.14 vs the active ORMD). The reader publishes these human versions | similarity check; `docs/catalog.json` humanSourceMode |
| §2 r4: Entry Point cites June parents; outlier archives exist; "Active successors still exist" | Confirmed. The human side diverges: **`SS/The Essence of Existence.md` (16,234 words) and `SS/Relational Derivation Chain - E2 to RCP, MPDC, and AFD.md` (12,447) are the pre-condensation texts** (0.99 / 0.93 vs the archived outliers), while their ORMD successors are 854 and 823 words. `SS/E^2 Entry Point.md` was regenerated (0.96) but opens with stray ORMD frontmatter lines | similarity check; file heads |
| §2 r4: link-hub outliers archived | The June originals are archived, but `SS`/`CL Implementations` and `SS`/`CL Original E^2 work` remain active pairs (expanded registries, `expands_index`) | CL lineage |
| §2 r5: Context Layer index reports 86 active documents and nine clusters | The heading says "86 active Context Layer documents | 9 topical navigation clusters". **The cluster-map doc counts sum to 85** (7+8+13+8+22+7+5+12+3). The folder holds 86 `.ormd` files including the index itself | `CL/Context Layer Index.ormd` lines 20, 60–70 |
| §2 r5: "Several active ORMD files now have explicit archived parents" | Confirmed, but most §3 package ORMDs still have `parents: []`: OSI, Tension, TI, IFF, Derivation deep dive, all three Resonance docs, RIF, EDF, both Relational Perfection ORMDs, Cyclical Integrity, Declaration, CSC, AOMI V1, and resolution_synthesis | ORMD frontmatter |
| §2 r6: "the reader tracks unreviewed human/ORMD pairs" | Confirmed: 62 pending of 81 exact-stem pairs, 19 reviewed. The queue **omits the 4 composite/renamed pairs** (CRS, MRIE, Relational Perfection_framework, Relational Derivation Chain), which have no review tracking. `write-review-queue.mjs` writes `reader-site/ORMD_HUMAN_REVIEW_QUEUE.md`, **but the file on disk is `E2Core/ORMD_HUMAN_REVIEW_QUEUE.md`** (untracked). Its relative links (`../E2Core/…`, `scripts/ormd-primary.json`) resolve from `reader-site/`, not from `E2Core/` | script source; `git status` |
| §2 r2: truncated AVIA and Ontological Transformation names no longer active | Confirmed for SS and CL. The truncated names survive in Synthesized Core: `SC/Adaptation via Informational Abstraction (AVIA) A _summary.ormd` and `SC/From Essential Relationships to Ontological Transf_summary.ormd`. One active CL filename carries a trailing space: `Relational Derivation Chain .ormd` | directory listings |
| §1/§4 "five current Semantic-only sources" | Confirmed as CCS, Communication as Complexity Reduction, Power, Relational Ontology Derived from First Principles, and Our essence exists in the space between us. Four have archived ORMD twins; three are absorbed by lineage into merged ORMDs. "Our essence" has no ORMD in the repo; the June plan's step 1 "rescue" was not done | §1 above |
| §3 B (B3): Resolution staged "September 22" (plan gives no path) | Location note: the file is at `staged work/20260922-framework-resolution/`, next to `Source Ledger.md` and `corpus-snapshot.json`. There is no `staged work/20260922/` folder | directory listing |
| §3 B (B3): `What This Work Is For` treated as a single working draft | A near-identical staged predecessor exists: `sw/20260910-conceptual-development/what-this-work-is-for.md` (1.00). The E2Core copy is untracked and has an empty H1 | similarity check; `git status` |
| §3 B (B4): "The Essence file already contains a 'NexEs Manifesto' heading" | True of the **human** file only (`SS/The Essence of Existence.md` line 3). The active ORMD has no such heading; "NexEs" appears in its origin URN, keywords, and body | grep |
| §3 B (B1): June MRIE merge did not include CSC | Confirmed for the ORMD. However, `SC/MRIE_synthesized.ormd` does list CSC as a parent | SC frontmatter |
| §3 B (B6): `Tension` | The ORMD `title:` is "Synthesis: Tensional Intelligence and the Praxis of Paradox" while the human H1 is "Tension". This is relevant to the §3 D title map | frontmatter / H1 |
| §3 E: EST is a new intake | `EST/E^2 Primer Compression…md` is word-identical to the archived Entry Point parent `A/20260612_pass_3a_core_ontology/Semantic Substrate/E^2 Primer Compression.md`. That file already has Core lineage via `CL/E^2 Entry Point.ormd` | similarity check |
| SC parents (A2, B4, §1 #5) | Several Synthesized Core parents exist only outside this repo, in `Phase 1/Context Layer/`: `AOMI Adversarial Occlusion and Mechanism Integrity.ormd`, `Constitutions.ormd`, `Essence of Existence E^2.ormd`, and `Our essence exists in the space between us.ormd` | `ls "Phase 1/Context Layer"` |

## 4. Reference hot spots for later archiving

Before archiving, these inbound links need updates or lineage notes:
- `CL/E² as a Translation Architecture….ormd` lists `SS/E^2 Entry Point.md` and `SS/Communication as Coherence.md` as `local://semantic-substrate/` lineage parents. It also appears in `reader-site/scripts/ormd-primary.json` and `human-sync-state.json`.
- `CL/Embedded Universality Principle (EUP).ormd` and `CL/Intervention Stewardship - Core Source.ormd` list `resolution_synthesis` as a lineage parent.
- `CL/Lawfulness - Core Source.ormd` cites `urn:cb:edf` and links EDF.
- `CL`/`SS Relational Primitives` link to CT translation and RP Lambda.
- The `CL`/`SS E^2 Axioms`, `Global Closure Operator`, `Original E^2 work`, `Relational Derivation Chain .ormd`, and `The Essence of Existence.ormd` files link to both E^2 Equation and Relational Primitives.
- `CL/Original E^2 work.ormd` links OSI, Declaration, Constitution Draft 2, and Communication as Coherence.
- Every active pair appears in both navigation surfaces (`CL/Context Layer Index.ormd` and `E2Core/context layer index.md`, which the reader publishes as the master index). Every exact-stem pair except Translation also appears in the review queue.
