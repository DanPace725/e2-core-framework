# CCS / CRS — Reconciliation Review

**Status:** staged integration review. This is a review-only pass: no active, archived, generated, or Synthesized Core file was edited.
**Date:** 2026-09-29
**Plan references:** `E2Core/E2Core Consolidation Plan - 2026-09-29.md` §1 (rules 1–4), §3 B ("Collective Cognitive Substrate + Collective Relational Substrate"), §4 steps 2–4, §5 (first bullet)
**User note:** `E2Core/9.29.26 Consolidation Pass.md`, line 11: "Fold Collective Cognitive Substrate into Collective Relational Substrate as a subtype of CRS"
**Corpus boundary:** `Phase 1/Core Framework`. Two out-of-boundary files are cited as provenance evidence only (§1 rows 11–12).
**Method:** Both representations were read in full. Human and ORMD bodies were normalized by stripping ORMD link syntax `[x](#id "rel")`, heading IDs `{#id}`, blank lines, and rules, then compared line by line with `diff` and `difflib`. Inbound references were found with ripgrep by filename stem, reader slug, and title.

---

## 0. Findings at a glance

1. **The June ORMD merges kept everything.** `Collective Cognitive Substrate.ormd` has every section and sentence of both CCS human files. `Collective Relational Substrate.ormd` has every section and sentence of both CRS human files. The only differences are formatting and two meaning-preserving rewordings (§2.3). Nothing is missing from the ORMD and nothing contradicts it.
2. **Each pair of human predecessors is really one text in two copies.** `CCS.md` differs from `Collective Cognitive Substrate.md` only in its date (2/19/26 vs 2/23/26), code fences, and blank lines. `CRS.md` and `The Collective Relational Substrate.md` differ only in dates (2/20 vs 2/19), a duplicated H1, code fences, and a closing quote that lost its line breaks. Both duplicates can be archived now with no loss of content.
3. **The reader currently shows the CRS text twice.** The registry maps both CRS human files to one composite record, and `sync-corpus.mjs` concatenates them. As a result `reader-site/public/human/collective-relational-substrate.md` contains the full paper twice: the `<!-- Semantic Substrate source: -->` markers are at lines 1 and 481, and "Relational Consciousness Scale" appears at lines 389 and 878. Archiving one CRS human file fixes this.
4. **The June merge dropped lineage metadata.** It replaced the conceptual parents with archive paths only. The explicit CCS→CRS edge (`parents: ["urn:doc:cognition-as-substrate", "urn:doc:crs-core-compression"]` in the archived 2/19 CRS ORMD) no longer appears in any active file. That edge is the load-bearing lineage for the subtype relation.
5. **One archived "parent" is not a parent.** `archive/20260612_step_1_2_merges/Context Layer/Collective Cognitive Substrate.ormd` is a mojibake copy of the merged output: it carries the merge `origin` URN and lists itself as a parent. The real pre-merge 2/23 ORMD (confidence 0.92) exists only outside the Core boundary, at `Phase 1/Context Layer/Collective Cognitive Substrate.ormd`.
6. **CCS is written as a component (cross-section) of CRS, not as a sibling.** The CRS text says C_cog "is the domain the *Cognition as Substrate* document analyzed". The out-of-boundary CRS Core Compression names CCS "a facet or cross-section of something larger". Most of CCS is still unique in wording and detail: the literacy analysis, the feedback-loop diagram, two failure modes, the formal metric expressions, the recursive-trap exit, and the component integration map. It must be carried over before the CCS pair can be archived.
7. **The texts disagree on MMPS quadrants.** CCS maps the Soft Singularity as a slide from Quadrant I "toward Quadrant II" and calls III "burnout". CRS maps it I → IV → III and calls III "Toxic Coherence". This disagreement must be preserved, not resolved.
8. **The CRS text already leans toward "relational = cognitive" in three places** (§4.4). A subtype fold should add a scope limit rather than amplify this.

---

## 1. Source table

Sizes are bytes. "Registry" is the generated `core_registry.json` status, used for orientation only.

| # | Path | Representation | Lineage / dating | Role now |
|---|---|---|---|---|
| 1 | `E2Core/Semantic Substrate/CCS.md` | Human MD, 44,390 B. Title "Cognition as *Substrate*". | Dated "2/19/26" (L2). Body = the archived `CCS.ormd` body. | Registry: `semantic_substrate_only` / `unpaired_active_source`. Earlier duplicate of #2. One of the plan's Semantic-only sources. |
| 2 | `E2Core/Semantic Substrate/Collective Cognitive Substrate.md` | Human MD, 44,436 B. Title "Cognition as *Substrate*". | Dated "2/23/26" (L2). Footer "*E² Framework · Cognition as Substrate · v1.0 · 2026 · Daniel Pace*". | Registry: `paired_exact_stem` with #5. It is on `E2Core/ORMD_HUMAN_REVIEW_QUEUE.md` L15 (pending) and is the reader's human counterpart for CCS. |
| 3 | `E2Core/Semantic Substrate/CRS.md` | Human MD, 53,690 B. H1 "The Collective Relational Substrate". | "2/20/26" (L2). "*E² Framework · CRS Specification · v0.1 · February 20 2026*". Its body matches #6 and the archived `CRS.ormd`. | Registry: `paired_composite_or_alias` (key `collective-relational-substrate`), set in `Phase 1/phase1_core_reconcile.py` `COMPOSITE_RELATIONS`. Cited by path in several staged reviews. |
| 4 | `E2Core/Semantic Substrate/The Collective Relational Substrate.md` | Human MD, 53,731 B. The H1 appears twice (L1 and L5). | "2/19/26" (L3). "*… v0.1 · February 2026*". The closing quote is run together: "say its name.The second…". | The same composite record as #3. The reader concatenates it with #3. It is not on the review queue, which lists exact-stem pairs only. |
| 5 | `E2Core/Context Layer/Collective Cognitive Substrate.ormd` | ORMD, 53,813 B. `title: "Collective Cognitive Substrate"`, `frame: "cognitive.ecology.synthesis"`, `confidence: 0.90`. | `origin: urn:ormd:e2core-merge:2026-06-12:collective-cognitive-substrate`. Parents: the two 20260612 archive paths (#7, #8). `conversion.method: lineage_preserving_merge`. | The merged canonical CCS ORMD. The context layer index lists it with confidence **0.92** (L241, L396), which differs from the frontmatter. It is in Cluster G and is the middle step of the Cluster G entry path. |
| 6 | `E2Core/Context Layer/Collective Relational Substrate.ormd` | ORMD, 69,492 B. `title: "Collective Relational Substrate"`, `frame: "civilization.relational_substrate"`, `confidence: 0.90`. | `origin: urn:ormd:e2core-merge:2026-06-12:collective-relational-substrate`. Parents: the archived `CRS.ormd` (#9) and `The Collective Relational Substrate.ormd` (#10). Body dated "2/20/26". | The merged canonical CRS ORMD. The index lists it with confidence **0.85** (L262, L454), which differs from the frontmatter. It is in Cluster H. |
| 7 | `archive/20260612_step_1_2_merges/Context Layer/CCS.ormd` | Pre-merge ORMD, 56,719 B. `title: "Cognition as Substrate"`, `date: 2026-02-19`, confidence 0.90. | `origin: urn:e2:synthesis:cognition-as-substrate`. Parents: `urn:e2:framework:{cfar,mrie,avia,signal-bias,tceo,mmps,bill-of-rights}`. | Genuine parent of #5 (the 2/19 body). |
| 8 | `archive/20260612_step_1_2_merges/Context Layer/Collective Cognitive Substrate.ormd` | ORMD with a BOM and mojibake (e.g. "EÂ² Framework Â· …"). | Its `origin` is the **merge** URN, and `parents:` lists **itself**. | **Not a pre-merge parent.** It is a damaged copy of #5. The lineage defect is recorded in §6(d)/(e). |
| 9 | `archive/20260612_step_1_2_merges/Context Layer/CRS.ormd` | Pre-merge ORMD, 68,749 B. `frame: "civilization.relational_substrate"`, confidence **0.85**. | `origin: urn:crs:spec:v0.1` (2026-02-20), `parents: []`. Keywords include "Collective Cognition". | Genuine parent of #6. Its body equals #6's body. |
| 10 | `archive/20260612_step_1_2_merges/Context Layer/The Collective Relational Substrate.ormd` | Pre-merge ORMD, 61,298 B. `frame: "civilizational.ontology"`, confidence **0.85**. | `origin: urn:crs:v0.1` (2026-02-19). **`parents: ["urn:doc:cognition-as-substrate", "urn:doc:crs-core-compression"]`** | Genuine parent of #6, but a **lossy** conversion: it lacks §2 "P5 · Epistemic/Informational" and "P6 · Meta-Relational". Its lineage is the only in-boundary record of the CCS→CRS parent edge. |
| 11 | `Phase 1/Context Layer/Collective Cognitive Substrate.ormd` *(outside boundary)* | Pre-merge ORMD, 53,141 B. Title "Cognition as Substrate", confidence **0.92**. | `origin: urn:ormd:e2:synthesis:2026-02-23`. Parents: `urn:cb:e2-framework-v0.9`, `urn:cb:relational-ontology-core`. | The true 2/23 source of #5's heading-ID scheme. It explains the index's 0.92. Evidence only. |
| 12 | `Phase 1/Context Layer/CRS_core_compression.ormd` (and `Phase 1/Semantic Substrate/CRS_core_compression.md`) *(outside boundary)* | ORMD. "The Collective Relational Substrate — Core Compression", 2/19/26, confidence 0.85. | `origin: internal://crs/core-compression`. | Cited by CRS §0 as "the CRS Core Compression". Its Level 3 contains the **only explicit statement** of the subtype relation (§4.1). Evidence only; it is not Core authority. |
| 13 | `Synthesized Core/Collective_Cognitive_Substrate_synthesized.ormd` | Synthesis summary, confidence 0.95. | Parents `urn:cb:CCS.ormd`, `urn:cb:Collective Cognitive Substrate.ormd`. | A summary of the CCS body. It has no unique claims. |
| 14 | `Synthesized Core/CRS_synthesized.ormd` | Synthesis summary, confidence 0.95. | Parents `urn:cb:The Collective Relational Substrate.ormd`, `urn:cb:CRS.ormd`. | A summary of the CRS body. It has no unique claims, and it overstates evidence: it says CRS was "[validated](#e2-framework …)" and that it "integrates decades of research". |
| 15 | `E2Core/ORMD_HUMAN_REVIEW_QUEUE.md` | Generated queue (from `reader-site/scripts/write-review-queue.mjs`). | — | L15 lists only the CCS exact-stem pair. The CRS composite is outside the queue's scope. |
| 16 | `reader-site/scripts/ormd-primary.json` | Reviewed-pair manifest. | — | Contains neither CCS nor CRS, so the reader serves the preserved human Markdown for both. `sync-human.mjs` requires exactly one human source per ORMD-primary pair, so the CRS pair cannot become ORMD-primary until #3 or #4 is archived. |
| 17 | `Synthesized Core/relational substrate analysis Repo Summary.ormd`, `Synthesized Core/Family as a Relational Field_summary.ormd` | Syntheses. | — | Mention CRS as "the central entity of the framework" (L32) or refer out to a B6 synthesis. They have no CCS/CRS-specific claims at risk. |

---

## 2. Claim-retention matrix

Legend: **yes** = retained (verbatim or with meaning-preserving edits); **partial** = the core claim is retained but specific content is missing; **missing** = absent; **contradicted** = the destination says something incompatible.

### 2.1 Human duplicates → their sibling human file

| Predecessor | Differences from sibling | Substantive loss if archived |
|---|---|---|
| `CCS.md` → `Collective Cognitive Substrate.md` | L2 date `2/19/26` vs `2/23/26`. `S = ⟨ E, R, C, X, Σ ⟩` is indented rather than fenced. It has 21 fewer blank lines, and "> " continuation lines are missing after two quotes. | **None.** Only the 2/19/26 dating is lost; it should go into lineage (§6(d)). |
| `The Collective Relational Substrate.md` → `CRS.md` | Header `2/19/26` vs `2/20/26`. Duplicate H1 (L1 and L5). Subtitle "February 2026" vs "February 20 2026". Three formulas are fenced rather than indented. The §13 quote is run together ("say its name.The second … itself.Everything"). The file has no trailing newline. | **None.** Only the 2/19/26 dating is lost; it should go into lineage. The run-together quote is a defect, not content. |

### 2.2 CCS human (`Collective Cognitive Substrate.md`, 2/23) → `Collective Cognitive Substrate.ormd`

After normalization the only differences are **bold** removed from "substrate" (§1) and **bold** added to "**S**" and "**Global Closure Operator**" (§4). The ORMD also omits the `---` rule before §6, §9 and §11 (cosmetic).

| Human section | ORMD anchor | Retained |
|---|---|---|
| Title block, "2/23/26", "v1.0", subtitle | `#title`, `#e2-framework` | yes |
| §1 The Central Claim (substrate thesis; "structural, not metaphorical"; the six-criteria test; "It can be poisoned without knowing it"; epigraph; "What follows is the altitude") | `#central-claim`, `#substrate-definition` | yes |
| §2 Mapping through the RPs (P1–P6 incl. ⚠️ deficit markers; "Three of six primitives in deficit") | `#relational-primitives`, `#p1`–`#p6` | yes |
| §3 Feedback Architecture (ASCII loop diagram; evaluator-standard selection; Zone 2/Zone 3) | `#feedback-architecture`, `#feedback-loop` | yes (diagram verbatim) |
| §4 Formal Substrate Specification (STRUCTURAL CLAIM; `S = ⟨E,R,C,X,Σ⟩`; four lenses; GCO; AVIA; lossy quotienting) | `#formal-substrate`, `#relational-entity`, `#emergence` | yes |
| §5 Degradation Signatures F-01–F-06 | `#degradation-signatures`, `#f-01`–`#f-06` | yes |
| §6 Diagnostic Framework (SH-1–SH-6 with formulas; regime classification) | `#sec-6`, `#core-health-metrics`, `#sh-1`–`#sh-6`, `#regime-classification` | yes |
| §7 The Literacy Intersection | `#sec-7` | yes |
| §8 Constraint Specification (R·C_eff ≤ R_max; C-1–C-6; thermometer/newspaper paragraph) | `#sec-8`, `#c-1`–`#c-6` | yes |
| §9 Collective Rights Extension (Rights I–VI; "floor, not the ceiling") | `#section-9`, `#collective-right-1`–`6` | yes |
| §10 Recursive Trap and Its Exit | `#section-10` | yes |
| §11 Component Integration Map (RP, GCO, CFAR, MRIE, AVIA, SBF, TC/EO, MMPS, RBoR, MPDC) | `#section-11`, `#rp` … `#mpdc` | yes |
| §12 Closing + footer | `#section-12` | yes |

### 2.3 CRS human (`CRS.md` 2/20; `The Collective Relational Substrate.md` 2/19) → `Collective Relational Substrate.ormd`

After normalization, the differences from `CRS.md` are:

- the italics on *Cognition as Substrate* are dropped (§0, §1 C_cog);
- ψ: "brings a system from Quadrant II back toward Quadrant I" becomes "brings a system back from Quadrant II toward Quadrant I";
- §11: "The browser-based simulation" becomes "The Emergence Engine browser-based simulation";
- `C-n.` punctuation becomes `C-n:`, and list spacing changes.

The two rewordings already appear in the archived `CRS.ormd`, so they are inherited lineage, not merge edits.

| Human section | ORMD anchor | Retained |
|---|---|---|
| Title block (2/20, v0.1, subtitle, "Written from inside…") | `#crs-main` | yes. The 2/19 dating of #4 is not recorded. |
| §0 Positional Statement | `#positional-statement` | yes |
| §1 What the CRS Is: Ontological Claim; The CRS Is Not (I₁+…+Iₙ ≠ C; field not network; process not object); Components (C_cog, C_body, C_eco) | `#what-is-crs`, `#ontological-claim`, `#crs-is-not`, `#crs-components` | yes |
| §2 The CRS as Relational Entity, P1–P6 with counter-modes | `#crs-entity`, `#p1-ontological` … `#p6-meta` | yes |
| §3 Substrate's Physics (S tuple; GCO = Y(λf. λx. f(f(x))); dM/dt; Quadrants I–IV; Soft Singularity trajectory; ψ/φ/λ morphisms) | `#substrate-physics`, `#signal-dynamics`, `#gco-scale`, `#metabolic-dynamics`, `#transition-morphisms` | yes (formulas indented, not fenced) |
| §4 Coherence Conditions (six conditions + regime classification) | `#coherence-conditions` … `#regime-classification` | yes |
| §5 Failure Modes F-01–F-08 | `#failure-modes`, `#f-01`–`#f-08` | yes |
| §6 Rights Architecture (Foundation; six collective rights) | `#rights-architecture`, `#rights-foundation`, `#collective-rights` | yes |
| §7 Justice as Coherence Restoration (six invariants; Modes 1–3) | `#justice-restoration`, `#justice-invariants`, `#justice-modes` | yes |
| §8 Design Constraints for AI Nodes (C-1–C-6; Stewardship Architecture rings) | `#ai-constraints`, `#dev-constraints`, `#c1-diversity` … `#c6-topology`, `#stewardship-arch` | yes |
| §9 Care Architecture (four care modes; Care = Presence × Restraint; resonance stewardship) | `#care-architecture` … `#resonance-stewardship` | yes |
| §10 Inter-Node Translation (RNT 5 steps; "RCS (Relational Consciousness Scale)" R1–R5) | `#section-10` | yes. See §5 for naming. |
| §11 Empirical Grounding (Emergence Engine; E² Agent; U metric) | `#section-11`, `#emergence-engine`, `#e2-agent`, `#u-metric` | yes |
| §12 What This Document Cannot See | `#section-12` | yes |
| §13 The First Act + footer | `#section-13` | yes (quote on three lines, as in `CRS.md`) |
| Appendix A (29 + 19 files; 48 total) | `#appendix-a`, `#crs-core-docs`, `#integrated-docs`, `#total-files` | yes |

### 2.4 Frontmatter and lineage retention in the merged ORMDs

| Pre-merge metadata | In merged ORMD? |
|---|---|
| CCS 2/19 `CCS.ormd`: `date: 2026-02-19`; parents `urn:e2:framework:cfar, mrie, avia, signal-bias, tceo, mmps, bill-of-rights`; keywords "collective cognition", "AI feedback loops", "structural integrity" | **missing.** Replaced by archive paths and generic keywords ("consolidation", "merged canonical", …). |
| CCS 2/23 original (out-of-boundary #11): origin `urn:ormd:e2:synthesis:2026-02-23`; parents `urn:cb:e2-framework-v0.9`, `urn:cb:relational-ontology-core`; confidence 0.92 | **missing.** The listed parent #8 is a post-merge copy. |
| CRS 2/20 `CRS.ormd`: origin `urn:crs:spec:v0.1`; confidence **0.85**; keywords "CRS", "Field Theory", "Collective Cognition" | **partial.** Frame retained. Confidence raised to 0.90 with no recorded rationale. Keywords missing. |
| CRS 2/19 `The Collective Relational Substrate.ormd`: parents `urn:doc:cognition-as-substrate`, `urn:doc:crs-core-compression`; frame `civilizational.ontology` | **missing.** The CCS→CRS lineage edge was lost. |

### 2.5 Cross-document: each CCS claim → present in the CRS ORMD?

This is the relevant matrix if the CCS pair is folded into CRS and archived.

| CCS section / claim (human `Collective Cognitive Substrate.md` lines) | In `Collective Relational Substrate.ormd`? |
|---|---|
| §1 substrate thesis, irreducible to nodes (L12) | **partial.** CRS §1 `#crs-is-not` makes the same non-additivity claim for CRS. "It is a thing with health. It can get sick. It can be poisoned without knowing it." (L14) is missing. |
| §1 shaping by "AI development, platform economics, and linguistic drift… not coordinated, not malicious, and not locally noticeable" (L16) | **partial.** Compare CRS §13: "shaped, at speed, by forces that do not include substrate health in their objective functions". |
| §1 epigraph "The thinking environment is becoming built environment…" (L18) | **missing** |
| §1 "This document is the synthesis that was missing… What follows is the altitude." (L21) | **missing.** CRS §0 says only that it "named the phenomenon". |
| §2 P1: "Its boundaries are the edges of mutual intelligibility"; "particles" (L30) | **missing.** CRS P1 is about persistence and dissolution. |
| §2 P2: linguistic drift, habit formation, AVIA (L33) | **partial.** CRS P2 has the AVIA stages and CFA. |
| §2 P3: "The bidirectionality of AI is the key structural difference from prior technologies." (L36) | **partial.** CRS P3 has topology and curvature. Bidirectionality appears only in Collective Right III. |
| §2 P4 "This is the deficit axis… The constraint that exists is cosmetic, not structural" (L39) | **partial.** CRS P4 counter-mode covers constraint violation, not the "deficit axis" verdict. |
| §2 P5 "Almost nothing, from inside the substrate… You cannot build a better telescope for seeing the air you are breathing." (L42) | **partial.** CRS P5 keeps MPDC and TC/EO. The telescope line is missing. |
| §2 P6 cognitive signatures / "distributed cognitive twins" (L45) | **partial.** CRS P6 covers GCO displacement; "cognitive twins" is missing. |
| §2 verdict "Three of six primitives in deficit… a substrate in structural decline" (L47) | **missing** |
| §3 feedback loop diagram, printing-press contrast, evaluator-standard selection, dialect formation (L53–75) | **missing** (only dialect calcification appears, in CRS F-01) |
| §3 "loop compresses from centuries… to months"; `R · C_eff > R_max`; Zone 2/Zone 3 (L77) | **yes.** CRS P5 is near-verbatim. "Centuries to months" is missing. |
| §4 STRUCTURAL CLAIM; S tuple; four lenses; GCO "non-metaphorical" (L83–98) | **yes.** CRS §3 `#signal-dynamics`, `#gco-scale`. The CRS entity set E adds "AI systems". |
| §4 AVIA "civilization as collective abstraction"; developmental pathway "maintained or quietly replaced" (L102–104) | **partial.** CRS P2 and F-02. |
| §4 lossy quotienting; "it looks like health until it doesn't" (L106–108) | **yes** (near-verbatim, CRS §3) |
| F-01 Dialect Calcification (L116) | **partial.** "Dialect calcification is spectral collapse" and the degrees-of-freedom sentence are missing. |
| F-02 Cognitive Offloading Without Return; MMPS "η drops below… λ_eff… Quadrant II or III, starvation or burnout" (L119–120) | **partial / contradicted.** CRS F-02 "Developmental Bypass" keeps the pathway claim. The quadrant labels conflict with CRS §3, where III is "Toxic Coherence" and IV is "Overload/Burnout". |
| F-03 P6 Asymmetry and GCO Displacement; "This is not manipulation. It is topology drift." (L122–123) | **partial.** CRS F-03 and F-06. The quoted line is missing. |
| F-04 Access Stratification with Compounding Advantage (L125–126) | **missing** |
| F-05 The Invisible Ceiling Problem (L128–129) | **missing** |
| F-06 The Soft Singularity: "collective slide from Quadrant I… toward Quadrant II (starvation/collapse)" (L131–132) | **contradicted (trajectory).** CRS §3: "Quadrant I → IV → (bypass of II…) → sustained high-efficiency Quadrant III with externalized closure." CRS F-03 attributes it as "MRIE's 'Soft Singularity'". |
| §6 intro: E² Agent scoring "extends… to civilizational scale" (L138) | **missing** |
| SH-1 Spectral Richness `Φ_spectral` + tracking proxies (L142–143) | **partial.** CRS "Spectral Richness" has a different definition, no symbol, and no proxies. |
| SH-2 Constraint Integrity `C_eff / C_required`, threshold 1.0 (L145–146) | **partial.** CRS "CFA Balance" uses CBI/FCI/AFI. The ratio and threshold are missing. |
| SH-3 Closure Locality `GCO_internal / GCO_total` + AI-mediation proxy (L148–149) | **partial.** CRS "Closure Locality" gives a different proxy ("ratio of internally generated to externally scaffolded meaning structures"). |
| SH-4 Observability Index `O(R, C_eff)`, logistic form, proxies (L151–152) | **partial.** CRS "Temporal Integrity" (Δt_avail) is qualitative. |
| SH-5 Meaning Metabolism (L154–155) | **yes.** CRS adds the proxy "population's capacity for independent complex reasoning". |
| SH-6 P6 Symmetry `P6_human / P6_external` (L157–158) | **yes** (near-verbatim, without the symbol) |
| Regime classification (L162–168) | **yes.** CCS's specific "addresses F-01 at the cost of F-04" becomes "addresses some failure modes". |
| §7 The Literacy Intersection: scissor pattern; "reading and writing become class markers"; Latin analogy; AI as both contributor and remedy; MMPS ψ/φ/λ suppressed (L172–182) | **missing** (entire section) |
| §8 intro: CFAR fluctuation-dominant diagnosis; Resolution-Responsibility Law `R · C_eff ≤ R_max` (L188–190) | **partial.** CRS "Temporal Integrity" gives the RR Law qualitatively; the inequality is missing. |
| C-1 Developmental Friction Floors ("educational and formative contexts"; "physical exercise requirements in a world of elevators") (L194–198) | **partial.** CRS C-2 "Developmental Pathway Maintenance". The educational scope and elevator analogy are missing. |
| C-2 Signal Diversity Mandates (L200–204) | **partial.** CRS C-1 "Spectral Diversity Preservation". |
| C-3 Temporal Decompression Zones ("selective decompression"; C_eff < 1; CFAR buffers B / guardrails G) (L206–210) | **partial.** CRS C-3 "Temporal Pacing". The C_eff < 1, B, and G mechanisms are missing. |
| C-4 P6 Symmetry Requirements (L212–216) | **yes** |
| C-5 Substrate Health Instrumentation (L218–222) | **yes.** "Currently no one is looking." is missing. |
| C-6 Topology Transparency (L224–228) | **partial.** "(Ω_topo)" and "Applied to the substrate: require that the causal pathways… be inspectable" are missing. |
| Output- vs developmental-level constraint paragraph (L232) | **yes** (CRS §8, verbatim) |
| §9 foundation: individual RBoR rights listed by primitive; "novel territory without clean precedent in either ethics or law" (L238–242) | **partial.** CRS §6 Foundation adds measurable-violation and RP-Lang points. The rights-by-primitive list and the "novel territory" line are missing. |
| Rights I–VI full text (L244–282) | **partial.** CRS abbreviates them. Missing: I, the gaslighting analogy and "no single actor intends"; III, "engineered Truman Show"; IV, the "This is a P4 violation…" sentence; V, "most fundamental and most violated right" and the Gödelian-boundary sentences; VI, the final clause on "a product maintained by external optimization pressures". |
| "floor, not the ceiling" paragraph (L286) | **partial.** The first two sentences are kept. |
| §10 Recursive Trap: "no one has named it… because the substrate whose health would need to be protected is the same substrate that would need to produce that framework" (L294); quote "The drift becomes invisible…" (L296); "This document is that naming." (L309) | **missing** |
| §10 exit: local models as "P6 mirrors, relational curvature detectors…" (L301) | **partial.** CRS C-4 has the MRIE local-model prescription. The six-function list is missing. |
| §10 TC/EO design principles (8 items) (L305) | **missing** |
| §11 Component Integration Map (L313–345) | **missing.** CRS §0 lists acronyms only. |
| §12 Closing: "The substrate is not fine. It is not collapsing. It is drifting…" (L357); "first act of care" triplet (L359) | **partial.** The triplet is in CRS §13; the drift line is missing. |

**Summary:** of the 45 CCS rows above, CRS retains 10 in full, 20 in part, 13 are missing, and 2 are contradicted or incompatible (F-02 quadrant labels, F-06 trajectory).

---

## 3. Unique material at risk of loss

### 3.1 If only the duplicate human files (`CCS.md`, `The Collective Relational Substrate.md`) are archived

No substantive loss. The only losses are:
- the dating provenance ("2/19/26" for CCS; "2/19/26" and "February 2026" for CRS), which belongs in lineage;
- the 2/19 run-together quote, which is a defect.

### 3.2 If the CCS pair (`Collective Cognitive Substrate.md` + `.ormd`) is archived without a fold

Everything marked missing, partial, or contradicted in §2.5 is lost from active Core. The load-bearing items are:

1. **§7 The Literacy Intersection** (the whole section). It is the only literacy/class-marker analysis in the CCS/CRS family.
2. **§3 feedback-loop diagram**, the printing-press contrast, and the "evaluators whose standards of goodness are themselves being shaped" mechanism.
3. **F-04 Access Stratification** and **F-05 The Invisible Ceiling Problem.**
4. **The formal metric expressions** SH-1 `Φ_spectral`, SH-2 `C_eff / C_required` (threshold 1.0), SH-3 `GCO_internal / GCO_total`, SH-4 `O(R, C_eff)`, SH-6 `P6_human / P6_external`, with their tracking proxies. These are metric *specifications*: CRS §13 itself says such metrics "exist as specifications but not as deployed systems". The status must stay intact.
5. **Constraint mechanisms**: developmental friction floors in "educational and formative contexts"; selective decompression with `C_eff < 1`; CFAR buffers (B) and guardrails (G); Ω_topo.
6. **The §2 cognitive P-mapping** (edges of mutual intelligibility; "particles"; "deficit axis"; "Three of six primitives in deficit").
7. **The full rights wording** (§2.5 rights row).
8. **§10 Recursive Trap and Its Exit**: the self-reference argument, the six-function list for local models, the eight TC/EO design principles, and "This document is that naming."
9. **§11 Component Integration Map**: the per-component attribution of what each framework contributes.
10. **The competing MMPS account** (F-02 quadrant labels; the F-06 I → II trajectory). This is a recorded disagreement, not an error to discard.

### 3.3 Lineage and metadata at risk (independent of which bodies survive)

- The CCS→CRS lineage edge `urn:doc:cognition-as-substrate` / `urn:doc:crs-core-compression`, from archive #10.
- The CCS conceptual parents `urn:e2:framework:*` (#7) and `urn:cb:e2-framework-v0.9`, `urn:cb:relational-ontology-core` (#11).
- The pre-merge confidences: CRS 0.85, CCS 0.92 (2/23) and 0.90 (2/19).

### 3.4 Out-of-boundary evidence (not at risk from archiving, but not in Core)

- `Phase 1/Context Layer/CRS_core_compression.ormd`. Level 3 states: "The Collective Cognitive Substrate (CCS) — language, culture, shared meaning, collective sense-making — is a facet or cross-section of something larger: the **Collective Relational Substrate**."
- `Phase 1/Context Layer/Collective Cognitive Substrate.ormd`, the true 2/23 pre-merge CCS ORMD.

---

## 4. CCS as a CRS subtype

### 4.1 What the sources actually say about the relation

- CRS §0: "The *Cognition as Substrate* synthesis named the phenomenon. The CRS Core Compression mapped how the components relate. This document treats the phenomenon itself as the subject."
- CRS §1 Components: "The CRS subsumes and integrates: **C_cog** (collective cognition): … This is the domain the *Cognition as Substrate* document analyzed." It lists C_body and C_eco alongside.
- CRS Core Compression (out of boundary), Level 3: CCS "is a facet or cross-section of something larger: the Collective Relational Substrate."
- Archived CRS 2/19 ORMD lineage: `parents: ["urn:doc:cognition-as-substrate", "urn:doc:crs-core-compression"]`.

**Relation type.** The source language is mereological: "subsumes and integrates", "component", "facet or cross-section". It is not taxonomic. The user's word "subtype" fits if it is read as a **restriction of the CRS to its C_cog component**, meaning the same substrate viewed through one layer. It should not be read as "a kind of CRS", which would imply CCS is a separate instance of the CRS kind. The recommended wording below uses "subtype (restriction to C_cog)" so the user's term survives without changing the source relation. There is a precedent for a genuinely taxonomic specialization of CRS: `reader-site/graph-relations.yml` L166–169 has `family-as-a-relational-field` `specializes` `collective-relational-substrate` ("Family is treated as a domain-specific relational field"). CCS differs from that case because it is a *layer* of the whole field, not a *domain* instance.

### 4.2 Differentiating conditions (drawn from source text, not added)

A claim is CCS-specific when it depends on one or more of:

| # | Condition | Source basis |
|---|---|---|
| D1 | **Layer:** the object is C_cog, meaning "perception, reasoning, narrative construction, collective memory, and shared sense-making" and "the linguistic and symbolic layers" | CRS §1 Components; CCS §2 P1 |
| D2 | **Boundary and constituents:** "Its 'particles' are concepts, frames, closure patterns, and the heuristics by which people navigate uncertainty. Its boundaries are the edges of mutual intelligibility." | CCS §2 P1 (no CRS counterpart) |
| D3 | **Developmental maintenance:** capacity renews through AVIA's stages, which "are developmental" and must be "exercised, not bypassed" | CCS §4, F-02, C-1; CRS P2, F-02, C-2 |
| D4 | **Closure locus:** the central risk is whether sense-making closes "within human cognitive systems versus external computational systems" | CCS SH-3, SH-6, F-03, Right VI; CRS Closure Locality, P6 Symmetry |
| D5 | **Shaping loop:** a "closed feedback loop between the shaping system and the substrate being shaped", which is bidirectional and learns from responses | CCS §3, P3 (CRS has no diagram) |

### 4.3 Cognitive-specific claims (hold these at subtype level)

- CCS F-01 to F-06, including Access Stratification ("the resource in question is cognitive reach itself") and the Invisible Ceiling.
- SH-1 to SH-6 and their proxies (linguistic diversity indices, attribution accuracy in public discourse, the fraction of reasoning that "require[s] AI mediation").
- §7 Literacy: "The cognitive structures that depend on extended reading… appear to be developmental pathways for certain kinds of thinking." The source hedges with "appear to be" and "may close"; keep the hedges.
- C-1 to C-3 (friction floors, signal diversity, decompression zones).
- Collective Rights I to VI in their CCS wording. Every one is stated about "collective cognition" or "cognitive environment".

The following CRS-level material has no CCS counterpart and is not cognitive: C_body and C_eco; §7 Justice invariants and Modes 1–3; §9 care modes; §8 Stewardship Architecture rings; §11 Emergence Engine (the r/K ecological strategies); F-08 Coherence Paradox.

### 4.4 Guard: where the current CRS text already implies "relational substrate = cognitive"

These are recorded, not resolved. The fold should surface them in a scope note (drafted in §6(a)) and should not repeat them.

1. **CRS §1 Ontological Claim:** "The CRS is what the primitives describe when the system in question is the total relational field of human (and now human-plus-AI) collective cognition." This conflicts in scope with C_body and C_eco in the same section, and with §12: "The substrate is not primarily linguistic; the linguistic layer is merely the layer most accessible to the tools producing this analysis."
2. **CRS §1 definition:** "…that occurs among cognitive agents at civilizational scale". The CRS is scoped to *cognitive agents* as nodes. That is not the same as the claim that the field is cognition.
3. **CRS §6 rights and §8 constraints are CCS text carried up to CRS scale.** Right I: "reshape the ontological character of collective cognition". Right IV: "None include 'maintaining the coherence of collective cognition' as a variable". C-6: "through which AI shapes cognition". The source does not state whether these apply to C_body or C_eco.

**Evidence against generalizing:**
- The primitives "describe a proton, a cell, a mind, an institution, a civilization" (CRS §1), so relational-entity status does not entail cognition.
- The corpus uses "relational substrates" generically. EDF: "Emergent properties of computationally irreducible relational substrates can be externally conditioned but cannot be externally determined." (`E2Core/Semantic Substrate/Emergence_Determination_Foreclosure.md` L19, L194)
- The Family specialization of CRS is relational but is not framed as cognitive.
- The *Cognition as Substrate* claim "Collective human cognition satisfies all six criteria" is a claim about one system. It does not say that all six-criteria systems are cognitive.

### 4.5 Recorded variances between CCS and CRS (preserve; do not reconcile)

| Item | CCS | CRS | Status |
|---|---|---|---|
| Failure-mode labels | F-01 Dialect Calcification; F-02 Cognitive Offloading Without Return; F-03 P6 Asymmetry and GCO Displacement; F-04 Access Stratification…; F-05 Invisible Ceiling; F-06 Soft Singularity | F-01 Dialect Calcification; F-02 Developmental Bypass; F-03 Asymmetric P6 Capture; F-04 Epistemic Monoculture; F-05 Observability Collapse; F-06 Closure Authority Transfer; F-07 Meaning Metabolism Collapse; F-08 Coherence Paradox at Scale | **Label collision.** The same labels name different items from F-02 onward. |
| Constraint labels | C-1 Developmental Friction Floors; C-2 Signal Diversity Mandates; C-3 Temporal Decompression Zones | C-1 Spectral Diversity Preservation; C-2 Developmental Pathway Maintenance; C-3 Temporal Pacing | **Label collision.** C-1 and C-2 are swapped in substance. C-4 to C-6 share names but differ in wording. |
| MMPS quadrant III | F-02: "Quadrant II or III, starvation or burnout" (III = burnout) | §3: "Quadrant III (Toxic Coherence)", "Quadrant IV (Overload/Burnout)" | **Contradicted labeling** |
| Soft Singularity trajectory | F-06: "a collective slide from Quadrant I (integration flow) toward Quadrant II (starvation/collapse)" | §3: "Quadrant I → IV → (bypass of II, which would at least make the problem visible) → sustained high-efficiency Quadrant III with externalized closure" | **Contradicted trajectory** |
| Soft Singularity attribution | Derived from convenience topology plus MMPS (F-06; §6 regime) | F-03: "MRIE's 'Soft Singularity'" | Differing attribution |
| Health metrics | Six SH metrics with symbolic ratios | Six "coherence conditions", mostly without symbols; "CFA Balance" and "Temporal Integrity" replace SH-2 and SH-4 | Partial overlap |
| Frame / cluster | `cognitive.ecology.synthesis`; Cluster G | `civilization.relational_substrate`; Cluster H | Navigation consequence (§6(e)) |
| Confidence | 0.90 in frontmatter; 0.92 in the index and the original 2/23 file | 0.90 in frontmatter; 0.85 in the index and both pre-merge files | Unrecorded change |

---

## 5. Naming record: "RCS" / "Relational Consciousness Scale" in the CRS family (plan §4 step 2)

This section records only. It does not resolve the collision.

### 5.1 Occurrences in active files

| Path | Line | Exact text | What it claims to measure |
|---|---|---|---|
| `E2Core/Semantic Substrate/CRS.md` | 387 | "The RCS (Relational Consciousness Scale) provides a developmental map for nodes:" | A **developmental map for nodes**, i.e. individual agents in the substrate |
| same | 389–393 | "**R1 (Relational Awareness):** Recognizes that relationships shape experience. Emerging theory of mind." / "**R2 (Relational Navigation):** Can adapt behavior based on relational context. Emotional co-regulation." / "**R3 (Relational Synthesis):** Integrates multiple perspectives. Metacognitive flexibility." / "**R4 (Relational Bridging):** Translates between mismatched norms without destabilization. Navigates ambiguity." / "**R5 (Relational Field Anchor):** Becomes a coherence field others can orient around. Holds paradox gently, models attunement, guides others into resonance without force." | Five ordinal levels of relational capacity, described with developmental-psychology terms (theory of mind, co-regulation, metacognitive flexibility). The section never defines "consciousness". |
| same | 395 | "At the substrate level, the distribution of nodes across this developmental scale significantly influences the substrate's coherence conditions. A substrate with insufficient R4/R5 nodes lacks the bridging capacity to maintain coherence across normality differentials. Current AI-mediated communication tends to bypass rather than develop this capacity, which is a developmental pathway (P2) concern." | A substrate-level derived claim: the **population distribution** over R-levels influences coherence. No instrument, scoring procedure, threshold, or evidence is given. |
| same | 473 | Appendix A, "Additional Documents Integrated…": "… MMPSMetabolic_Meaning.pdf · **RCS_.pdf** · RNT.pdf · …" | Source file `RCS_.pdf`; its expansion is not recorded. `RRO__E__Ontological_Systems_Interface_OSI_Model.pdf` is listed separately. |
| `E2Core/Semantic Substrate/The Collective Relational Substrate.md` | 396, 398–402, 404, 481 | Identical to `CRS.md` L387, 389–393, 395, 473 | Same |
| `E2Core/Context Layer/Collective Relational Substrate.ormd` | 409 | "The [RCS (Relational Consciousness Scale)](#rcs \"epistemic:measures\") provides a developmental map for nodes:" | As above, and ORMD-typed as `epistemic:measures`. The target `#rcs` is **not declared** in the file (dangling anchor). |
| same | 411–415 | R1–R5 as above, each typed `(#rN "ontological:defines")`. `#r1`–`#r5` are also undeclared. | Same |
| same | 417 | Substrate-level paragraph as above, linking "influences" to `#coherence-conditions` ("geometric:causes") | Same |
| same | 433 | §11 E² Agent: "…and that those dynamics exhibit the [developmental trajectory](#rcs \"epistemic:measures\") that the framework predicts." | An **implicit ORMD-only link** that ties the E² Agent's "clear developmental progression across sessions" (quantum-hardware runs) to the RCS anchor. The prose does not say this; only the ORMD annotation does. |
| same | 493 | Appendix A: "[RCS_.pdf](#appendix-a \"ontological:composes\")" | Source file |

### 5.2 Occurrences in archived, generated, and index surfaces (for completeness)

- `archive/20260612_step_1_2_merges/Context Layer/CRS.ormd` L396, L402, L480, identical to the active ORMD.
- `archive/20260612_step_1_2_merges/Context Layer/The Collective Relational Substrate.ormd` L387: "The [RCS](#rcs \"epistemic:measures\") (Relational Consciousness Scale) provides a developmental map for nodes:". L393 types R5 as `"geometric:precedes"`, not `ontological:defines`. L469 is the Appendix entry.
- Generated reader copies: `reader-site/public/human/collective-relational-substrate.md` L389 and **L878** (duplicated via concatenation); `reader-site/public/ormd/collective-relational-substrate.ormd` L409; `reader-site/public/ormd-corpus.txt` L3161; plus `reader-site/dist/**` and `docs/**`.
- **Generated acronym index conflation:** `E2_FRAMEWORK_ACRONYMS.md` L157 gives "| RCS | Relational Capacity Scale | 8 | …" and counts `Collective Relational Substrate.ormd (2)` and `CRS.md (2)` under the *Capacity* expansion. The generated surface therefore already reads the later usage as the older term. Record this for the OSI package and fix it through the generator, not by hand.
- `E2Core/context layer index.md` / `Context Layer Index.ormd` L233: the Cluster G trigger keyword `RCS` sits beside `OSI model` and `Empathy Transformer`, so it most plausibly means the Capacity scale. The keyword itself is ambiguous.
- Synthesized Core: no RCS mention in `CRS_synthesized.ormd` or `Collective_Cognitive_Substrate_synthesized.ormd`.
- The CCS family: no RCS mention anywhere.

### 5.3 The older usage, recorded for comparison only

`E2Core/Semantic Substrate/Ontological Systems Interface (OSI) Model.md` is dated "4/22/25" (L3). "Relational Capacity Scale (RCS)" appears at L71 and L75. The core claim at L83 reads: "RCS maps how well someone can maintain **coherence in relationship** with others across differences in "normal," intensity, or worldview. It’s not about intelligence or morality—it's about **relational range and flexibility**." The ORMD twin is `E2Core/Context Layer/Ontological Systems Interface (OSI) Model.ormd` (L88, L92, L100; keyword "Relational Capacity Scale").

| Level | OSI Relational Capacity Scale (4/22/25) | CRS "Relational Consciousness Scale" (2/19–20/26) |
|---|---|---|
| R1 | Local Coherence | Relational Awareness |
| R2 | Contextual Adapter | Relational Navigation |
| R3 | Relational Synthesizer | Relational Synthesis |
| R4 | Meta-Relational Integrator ("Acts as translator between mismatched norms"; "Navigates ambiguity without destabilization") | Relational Bridging ("Translates between mismatched norms without destabilization. Navigates ambiguity.") |
| R5 | Relational Field Anchor ("Becomes a coherence field others can orient around." / "Holds paradox gently, models attunement." / "Guides others into resonance without force.") | Relational Field Anchor (the same three phrases, run together) |

**Observations (unresolved):**
- R5 is textually identical and R4 overlaps closely. This suggests the later scale reworks the older level set, possibly through the `RCS_.pdf` source. That is not established.
- The older scale disclaims intelligence and morality and targets "relational range and flexibility".
- The later scale adds developmental-psychology descriptors and the word "Consciousness" without defining it, and it adds a population-distribution claim at substrate level.
- Neither version gives an instrument or measurement procedure.
- For the §5 plan question on consciousness limits: the active `Self as Coherence Field` pair holds subjective experience "separately unresolved", and the 2026-09-28 archive README treats the REMA/RCF "consciousness ladder" as historical (`archive/20260928_emergence_synthesis_reconciliation/README.md`). That is context for the OSI package. It is not a finding about this scale.

**Pending, belonging to the OSI package and not to this fold:** per plan §3 B and §4 step 2, the CRS §10 line should eventually spell the term out ("the Relational Consciousness Scale") rather than use "RCS". The `#rcs` anchors, and the §11 E² Agent link to `#rcs`, need a decision there. If the lead edits CRS for the fold, **leave §10 and the L433 link unchanged** so the naming decision stays in one package.

---

## 6. Recommendation

### 6.1 Disposition (Integration Process status vocabulary)

| File | Recommended status | Timing |
|---|---|---|
| `E2Core/Semantic Substrate/CCS.md` | **reject / archive** (superseded duplicate human predecessor) | Stage 1, ready now after lineage note (d) |
| `E2Core/Semantic Substrate/The Collective Relational Substrate.md` | **reject / archive** (superseded duplicate human predecessor) | Stage 1, ready now after lineage note (d) |
| `E2Core/Semantic Substrate/Collective Cognitive Substrate.md` + `E2Core/Context Layer/Collective Cognitive Substrate.ormd` | **integrate into existing source** (CRS), as the C_cog subtype, retained verbatim in a Part II; then archive | Stage 2, only after checklist (a)–(d) is complete and reviewed |
| `E2Core/Semantic Substrate/CRS.md` + `E2Core/Context Layer/Collective Relational Substrate.ormd` | **retained destination** (surviving pair) | — |

**Why a verbatim Part II rather than a selective merge:**
- §2.5 shows that only 10 of 45 CCS rows are fully present in CRS.
- The CCS numbering (F-, C-, SH-) collides with CRS numbering.
- Two CCS claims contradict CRS.

A selective merge would force rewording or resolving these. A verbatim, re-anchored Part II satisfies plan §1 rule 4 ("A merger may retain distinct registers or subtypes rather than flattening them") and follows the user's instruction to fold CCS in "as a subtype of CRS".

**Why `CRS.md` survives rather than `The Collective Relational Substrate.md`:**
- Its body is the one the ORMD reproduces (2/20; three-line quote).
- It has no duplicated H1.
- Staged reviews already cite it by path (e.g. `staged work/20260925/Outbound Release Process v0.2.md` L120; `staged work/20260914/claude_trust_continuity_preregistration_v0_1.md` L248).
- The registry composite relation keeps it paired automatically, because the list is filtered to existing names.

The stem mismatch (`CRS` vs `Collective Relational Substrate`) belongs to the deferred filename migration (plan §3 D4).

**Lower-risk alternative, if the user prefers not to double the CRS document:** keep the CCS pair active and add reciprocal subtype declarations. In that case apply only (a1) and the lineage parts of (d) to CRS, add a mirror sentence to CCS §1, and archive only the Stage 1 duplicates. The user's pass note asks for the fold, so this review recommends the fold. The alternative is listed because it avoids the Cluster G navigation change (§6(e) Q2).

### 6.2 Retained destination

- **Human:** `E2Core/Semantic Substrate/CRS.md`
- **ORMD:** `E2Core/Context Layer/Collective Relational Substrate.ormd`
- **Archive folder**, following the `archive/20260929_tension_ti/` precedent in the working tree: `archive/20260929_ccs_crs/{Semantic Substrate,Context Layer}/`, plus a `README.md` modeled on `archive/20260928_emergence_synthesis_reconciliation/README.md`.

---

## ARCHIVE-READINESS CHECKLIST

### (a) Text to add to the surviving pair before archiving the CCS pair

The additions are listed in insertion order. Each block has an ORMD form and a human form. The human form is the same text without link and ID syntax.

#### (a1) New subsection in CRS §1

**Target:** immediately after the paragraph beginning "The field is shaped by and shapes:" and before the `---` rule that precedes "## § 2 · The CRS as Relational Entity".
- ORMD: after L82, before L84.
- `CRS.md`: after L52, before L54.

**ORMD form:**

```markdown
### The Cognitive Subtype: Collective Cognitive Substrate (CCS) {#ccs-subtype}

> Consolidation note (2026-09-29): the former active *Cognition as Substrate* pair (Collective Cognitive Substrate) is folded into this document as a subtype. Its text is retained verbatim in [Part II](#cognition-as-substrate "meta:corresponds_to"). This subsection states the relation and its limits. It adds no new claim about the CRS.

The *Cognition as Substrate* synthesis (CCS) treats collective human cognition as "a relational field with its own coherence conditions, constraint requirements, emergent properties, and failure modes." Within this document, CCS is the CRS examined through [C_cog](#crs-components "ontological:composes"), "the domain the *Cognition as Substrate* document analyzed." The CRS Core Compression that preceded both texts names the relation directly: the Collective Cognitive Substrate "is a facet or cross-section of something larger: the Collective Relational Substrate."

CCS is therefore a subtype in the sense of a restriction: the same substrate viewed through one of its components, not a second substrate beside it. A claim is CCS-specific when it depends on one or more of these conditions:

1. **Layer.** Its object is C_cog: "perception, reasoning, narrative construction, collective memory, and shared sense-making," with their linguistic and symbolic layers. CCS gives the boundary as "the edges of mutual intelligibility."
2. **Constituents.** Its "particles" are "concepts, frames, closure patterns, and the heuristics by which people navigate uncertainty." Embodied practice (C_body) and material and resource flows (C_eco) are outside this subtype.
3. **Developmental maintenance.** Its capacity renews through the AVIA stages (perception → pattern recognition → conceptualization → symbolization → meta-abstraction), which must be exercised rather than bypassed.
4. **Closure locus.** Its most acute risk concerns where collective sense-making closes: within human cognitive loops, or in external computational systems (closure locality; P6 symmetry).
5. **Shaping loop.** It is being reshaped through a closed, bidirectional feedback loop with AI systems that update on its responses.

Part II's degradation signatures (F-01–F-06), health metrics (SH-1–SH-6), literacy analysis, and constraint set (C-1–C-6) are stated for this subtype. Their labels are local to Part II and do not name the same items as § 4, § 5, and § 8 of this document. See [Recorded variances](#ccs-variances "epistemic:limits").

**Scope limit.** Satisfying the six primitives makes a system a relational entity; it does not make it cognitive. The primitives also describe "a proton, a cell." This document holds that "the substrate is not primarily linguistic" ([§ 12](#section-12 "epistemic:limits")), and C_body and C_eco are not cognition. Two tensions in this document remain open, and the fold does not resolve them:

- The Ontological Claim describes the CRS as "the total relational field of human (and now human-plus-AI) collective cognition," while the component list and § 12 include non-cognitive layers.
- Collective Rights I and IV (§ 6) and the constraints of § 8 are phrased in terms of collective cognition. The source does not say whether or how they apply to C_body and C_eco.

#### Recorded variances between the CRS text and Part II {#ccs-variances}

| Item | CRS (this document) | Part II (CCS) |
|---|---|---|
| Failure-mode labels | F-01–F-08 (§ 5) | F-01–F-06. From F-02 on, the same label names a different item. |
| Constraint labels | C-1 Spectral Diversity Preservation; C-2 Developmental Pathway Maintenance; C-3 Temporal Pacing | C-1 Developmental Friction Floors; C-2 Signal Diversity Mandates; C-3 Temporal Decompression Zones |
| MMPS Quadrant III | "Toxic Coherence"; Quadrant IV "Overload/Burnout" (§ 3) | F-02: "Quadrant II or III, starvation or burnout" |
| Soft Singularity trajectory | "Quadrant I → IV → (bypass of II…) → sustained high-efficiency Quadrant III with externalized closure" (§ 3) | F-06: "a collective slide from Quadrant I (integration flow) toward Quadrant II (starvation/collapse)" |
| Soft Singularity attribution | F-03: "MRIE's 'Soft Singularity'" | F-06 and § 6: convenience-dominated topology drift, mapped through MMPS |
| Health metrics | Six coherence conditions (§ 4), mostly qualitative | SH-1–SH-6 with symbolic ratios. These are specifications, not deployed measurements. |

These differences are preserved as recorded. They have not been reconciled.
```

**Human form for `CRS.md`:** the same text with these changes:
- The heading is `### The Cognitive Subtype: Collective Cognitive Substrate (CCS)`, with no `{#…}`.
- Every `[text](#… "…")` becomes plain `text`. "Part II" and "Recorded variances" stay as plain words.
- The sub-heading is `#### Recorded variances between the CRS text and Part II`.

#### (a2) Part II: the verbatim CCS text

**Target:** after the CRS footer line "*A partial self-model. Necessarily incomplete. A starting point.*" and before "## Appendix A · Source Documents".
- ORMD: after L483, before L485.
- `CRS.md`: after L461, before L465.

Insert a `---` rule, then the following.

**ORMD header block:**

```markdown
## Part II · Collective Cognitive Substrate — *Cognition as Substrate* (retained text) {#cognition-as-substrate}

> Retained verbatim from `Collective Cognitive Substrate.ormd` (active 2026-06-12 to 2026-09-29; body dated 2/23/26; an earlier variant dated 2/19/26 survives in the archived `CCS.md`). The only changes are heading levels and heading IDs. Every ID in this part is prefixed `ccs-`, so it cannot collide with, or silently satisfy, links in the CRS text above. Wording, claim strength, hedges, and internal cross-references are unchanged. Section numbers (§ 1–§ 12) and the labels F-01–F-06, SH-1–SH-6, and C-1–C-6 are local to this part. The relation to the CRS and the recorded variances are stated in [The Cognitive Subtype](#ccs-subtype "meta:corresponds_to").
```

The heading ID `{#cognition-as-substrate}` is chosen on purpose. The CRS ORMD already links to `#cognition-as-substrate` at L44 (§0) and L74 (§1 C_cog), and that target is currently undeclared. Declaring it here resolves both links without editing those lines.

**Body, mechanical transform (ORMD):** take `E2Core/Context Layer/Collective Cognitive Substrate.ormd` **L31–L386**, from `# Cognition as *Substrate* {#title}` through `*E² Framework · Cognition as Substrate · v1.0 · 2026 · Daniel Pace*`. Leave out L1–30 (frontmatter, merge note, `## Canonical Body`). Then apply, within the transplanted block only:

1. Change L31 `# Cognition as *Substrate* {#title}` to `**Cognition as *Substrate*** {#ccs-title}`, so it is not a heading.
2. Change `## § ` to `### § ` (12 headings).
3. Change `### ` to `#### ` (subsections, C-1–C-6, Collective Rights I–VI).
4. Prefix every declared ID: `{#X}` → `{#ccs-X}`. There are 60 IDs, including `#title`, `#p1`–`#p6`, `#f-01`–`#f-06`, `#sh-1`–`#sh-6`, `#c-1`–`#c-6`, `#gco`, `#mrie`, `#avia`, `#cfar`, `#mmps`, `#mpdc`, `#rbor`, `#rp`, `#sbf`, `#tceo`, `#section-9`–`#section-12`, `#sec-6`–`#sec-8`, and `#regime-classification`.
5. Prefix every in-block link target: `](#X ` → `](#ccs-X `. Do this whether or not X is declared. Otherwise CCS links such as `#gco`, `#mrie`, `#p1` would bind to, or clash with, CRS targets.
6. **The prefixing is required.** Without it these IDs collide exactly with CRS: `#f-01`–`#f-06`, `#regime-classification`, `#section-10`, `#section-11`, `#section-12`. In addition, the CRS text's currently undeclared targets (`#p1`, `#p2`, `#gco`, `#mrie`, `#avia`, `#cfar`, `#mmps`, `#mpdc`, `#rbor`, `#sbf`, `#tceo`) would silently resolve to CCS subsections.

**Human form for `CRS.md`:**
- Header: `## Part II · Collective Cognitive Substrate — *Cognition as Substrate* (retained text)`, followed by the same blockquote with links removed.
- Body: `E2Core/Semantic Substrate/Collective Cognitive Substrate.md` **L1–L366**. Apply steps 1–3 only; the human file has no IDs or links. Step 1 becomes: L1 `# Cognition as *Substrate*` → `**Cognition as *Substrate***`.

**Check after pasting:** normalized-diff Part II against the CCS source, using this review's method (strip links, IDs, blank lines, and rules; ignore heading-level markers). The diff must be empty.

#### (a3) Visible "see also" hooks (optional; no claim change)

No text change is needed in the ORMD, because (a2) resolves the existing `#cognition-as-substrate` links. In `CRS.md`, the reader will see the plain phrase "the *Cognition as Substrate* synthesis" (L14) and "the *Cognition as Substrate* document" (L44). The lead may append " (Part II)" after each. This is optional.

### (b) Files to archive

| Stage | Source | Destination |
|---|---|---|
| 1 (ready now) | `E2Core/Semantic Substrate/CCS.md` | `archive/20260929_ccs_crs/Semantic Substrate/CCS.md` |
| 1 (ready now) | `E2Core/Semantic Substrate/The Collective Relational Substrate.md` | `archive/20260929_ccs_crs/Semantic Substrate/The Collective Relational Substrate.md` |
| 2 (after a, c, d) | `E2Core/Semantic Substrate/Collective Cognitive Substrate.md` | `archive/20260929_ccs_crs/Semantic Substrate/Collective Cognitive Substrate.md` |
| 2 (after a, c, d) | `E2Core/Context Layer/Collective Cognitive Substrate.ormd` | `archive/20260929_ccs_crs/Context Layer/Collective Cognitive Substrate.ormd` |
| 2 (lead's option; precedent: 20260928 archived dependent summaries) | `Synthesized Core/Collective_Cognitive_Substrate_synthesized.ormd` | `archive/20260929_ccs_crs/Synthesized Core/Collective_Cognitive_Substrate_synthesized.ormd` |
| — | `archive/20260929_ccs_crs/README.md` (new) | Record: what was retained where (Part II, verbatim); that the duplicates carried only dating; that the 20260612 `Collective Cognitive Substrate.ormd` is a post-merge copy; the out-of-boundary originals (§1 rows 11–12). |

Do **not** move `CRS.md`, `Collective Relational Substrate.ormd`, `CRS_synthesized.ormd`, or anything already under `archive/20260612_step_1_2_merges/`.

### (c) Inbound references in active files

Line numbers are as read on 2026-09-29. `E2Core/context layer index.md` and `Context Layer Index.ormd` show as modified in the working tree, so re-grep before editing.

**Hand-maintained; must be edited:**

| # | File | Location | Current text | Needed after Stage 2 |
|---|---|---|---|---|
| 1 | `reader-site/graph-relations.yml` | L158–161 | `source: collective-cognitive-substrate` → `target: the-intelligence-field-framework`, `type: extends` | **Build-breaking.** `sync-corpus.mjs` throws "Graph relationship has unknown source" once the slug disappears. Change `source` to `collective-relational-substrate` and keep the note, or remove the edge. Check that the new pair is not a duplicate id. |
| 2 | `E2Core/context layer index.md` | L235 (Cluster G entry point) | "[Self as Coherence Field] → [Collective Cognitive Substrate] → [Relational Volition]" | Replace the middle step. Candidate: "Collective Relational Substrate (Part II: cognitive subtype)". Placement is decided in (e) Q2. |
| 3 | same | L241 (Cluster G table) | "\| Collective Cognitive Substrate \| `Collective Cognitive Substrate.ormd` \| cognitive.ecology.synthesis \| 0.92 \| Merged canonical from CCS + Collective Cognitive Substrate; … \|" | Remove, or point it to `Collective Relational Substrate.ormd` Part II (see (e) Q2). |
| 4 | same | L262 (Cluster H table) | "… \| 0.85 \| Merged canonical from CRS + The Collective Relational Substrate; civilization as relational field \|" | Add "; includes CCS as cognitive subtype (Part II, 2026-09-29)". Confidence 0.85 vs frontmatter 0.90 is (e) Q4. |
| 5 | same | L396 (master table) | "\| Collective Cognitive Substrate \| `Collective Cognitive Substrate.ormd` \| G \| 0.92 \|" | Remove |
| 6 | same | L20, L26, L382 (document counts, "86 active") | "86 active Context Layer documents" | Decrement by 1 for the CCS ORMD, recounting after any concurrent packages. |
| 7 | `E2Core/Context Layer/Context Layer Index.ormd` | Same lines as #2–#6 (the body is identical) | Same | Same edits, kept identical to #2–#6 |
| 8 | `E2Core/Context Layer/Collective Relational Substrate.ormd` + `E2Core/Semantic Substrate/CRS.md` | §0 (ORMD L44 / MD L14); §1 C_cog (L74 / L44) | Links to the dangling `#cognition-as-substrate` | Resolved by (a2). No text edit needed. The optional human hook is (a3). |
| 9 | `Phase 1/phase1_core_reconcile.py` (outside Core; registry generator) | L70–76 `COMPOSITE_RELATIONS[0].semantic_names` | `["CRS.md", "The Collective Relational Substrate.md"]` | Optional tidy: remove the archived name. It does not break anything, because missing names are filtered. |

**Generated surfaces; regenerate, never hand-edit:**
- `CORE_INDEX.md` L136, `CORE_REGISTRY.md` L33 and L36, `CORE_SUMMARY.md`
- `core_manifest.json`, `core_registry.json`, `core_summary.json`
- `E2_FRAMEWORK_ACRONYMS.md`, `e2_framework_acronyms.json`
- root `llms.txt` L134–149, `reader-site/public/**`, `docs/**`

Regenerate them with `python tools/normalize_generated_paths.py`, the registry generator, and `npm run build` / `npm test` from `reader-site`. `E2Core/ORMD_HUMAN_REVIEW_QUEUE.md` L15 should be regenerated with `node scripts/write-review-queue.mjs`. That script writes `reader-site/ORMD_HUMAN_REVIEW_QUEUE.md`; the `E2Core/` copy is untracked, so the lead should decide which location is kept.

**Leave as-is (historical, staged, or concept-only):**
- `E2Core/E2Core Consolidation Plan.ormd` L50–51 (June record)
- `E2Core/9.29.26 Consolidation Pass.md` L11
- `AGENT_INTEGRATION_PROCESS.md` L241 ("candidate CRS metric/property"; the concept survives)
- Staged path citations: `staged work/Relational Viscosity - Integration Review.md` L28–29; `staged work/Relational Viscosity, Volition, and Interface Substrate - Integration Review.md` L47–50; `staged work/20260923/Attention - Access, Terrain, and Closure - Integration Review.md` L347; `staged work/20260910-conceptual-development/*`; `staged work/20260922-framework-resolution/corpus-snapshot.json`; `staged work/20260612/Maintenance Window - Integration Review.md` L68; `staged work/20260914/*`; `staged work/20260925/*`
- `Synthesized Core/relational substrate analysis Repo Summary.ormd` (CRS concept only)

### (d) Lineage frontmatter for the surviving ORMD (`Collective Relational Substrate.ormd`)

Replace the `lineage:` block (L8–14) with the block below. Keep `origin` unchanged. The Stage 2 archive paths assume folder `20260929_ccs_crs`. Do not change `title`, `frame`, `policy`, or `resolution`; see (e) Q4.

```yaml
lineage:
  origin: { uri: "urn:ormd:e2core-merge:2026-06-12:collective-relational-substrate", ts: "2026-06-12T00:00:00Z" }
  parents:
    - "local://archive/20260612_step_1_2_merges/Context%20Layer/CRS.ormd"
    - "local://archive/20260612_step_1_2_merges/Context%20Layer/The%20Collective%20Relational%20Substrate.ormd"
    - "urn:doc:crs-core-compression"
    - "urn:doc:cognition-as-substrate"
    - "local://archive/20260612_step_1_2_merges/Context%20Layer/CCS.ormd"
    - "urn:ormd:e2:synthesis:2026-02-23"
    - "local://archive/20260929_ccs_crs/Context%20Layer/Collective%20Cognitive%20Substrate.ormd"
    - "local://archive/20260929_ccs_crs/Semantic%20Substrate/Collective%20Cognitive%20Substrate.md"
    - "local://archive/20260929_ccs_crs/Semantic%20Substrate/CCS.md"
    - "local://archive/20260929_ccs_crs/Semantic%20Substrate/The%20Collective%20Relational%20Substrate.md"
  transforms:
    - { fn: "e2core_consolidation_plan@1.2-merge", ts: "2026-06-12T00:00:00Z" }
    - { fn: "e2core_consolidation_2026-09-29@ccs-subtype-fold", ts: "2026-09-29T00:00:00Z" }
```

Add to `semantics.keywords`, keeping the existing entries: `"Collective Cognitive Substrate"`, `"CCS"`, `"Cognition as Substrate"`, `"collective cognition"`, `"cognitive subtype"`.

Append to `conversion.note`, or add a `conversion.fold_note:` key if the lead prefers not to touch `note`:

```yaml
  fold_note: "2026-09-29: Collective Cognitive Substrate folded in as the C_cog subtype (Part II, verbatim; heading IDs prefixed ccs-). Duplicate human predecessors CCS.md (2/19/26) and The Collective Relational Substrate.md (2/19/26) archived; they differed only in dating and formatting. The 2026-06-12 archive file 'Collective Cognitive Substrate.ormd' is a post-merge copy (mojibake; self-listed parent), not the 2026-02-23 original; that original (origin urn:ormd:e2:synthesis:2026-02-23, confidence 0.92) is outside the Core boundary at Phase 1/Context Layer/Collective Cognitive Substrate.ormd. Pre-merge CRS confidence was 0.85."
```

**If Stage 1 runs alone,** add only the two `20260929_ccs_crs/Semantic%20Substrate/…` duplicate parents plus `urn:doc:crs-core-compression` and `urn:doc:cognition-as-substrate`. For the CCS side, add `local://archive/20260929_ccs_crs/Semantic%20Substrate/CCS.md` to `Collective Cognitive Substrate.ormd` `parents`.

The human `CRS.md` has no frontmatter. Its lineage is carried by the ORMD and the archive README.

### (e) Open questions and blockers

**Blocking Stage 2 (the CCS pair) until settled:**

1. **(a1)–(a2) must be in place and verified** by the empty normalized diff, in both `CRS.md` and the ORMD, before any CCS file moves (plan §1 rule 1; §4 step 4).
2. **Cluster placement.** CCS sits in Cluster G ("Consciousness, Cognition & Identity") and is the middle step of G's entry path. CRS sits in Cluster H. Folding removes G's only "cognition as collective substrate" file. Options:
   - (i) G's table row and entry path point to `Collective Relational Substrate.ormd` Part II, so one file is listed in two clusters (the table's per-file convention should be checked);
   - (ii) G's entry path is re-chosen (for example, Self as Coherence Field → The Intelligence Field Framework → Relational Volition), with a cross-link to H.
   This is a navigation decision for the lead or user. Edit (c) #2–#7 only after it is made.
3. **`reader-site/graph-relations.yml` L158** must be changed in the same commit that archives the CCS ORMD, or the reader build fails.

**Not blocking; carry forward:**

4. **Confidence.**
   - CRS: pre-merge 0.85 (both parents); merged 0.90 without a recorded rationale; index 0.85.
   - CCS: 2/23 original 0.92; merged 0.90; index 0.92.
   - Recommendation: do not change the frontmatter silently. Record the discrepancy and let the lead or user choose. A lower value (0.85) would match the pre-merge CRS evidence.
5. **The MMPS quadrant contradiction** (§4.5) is preserved in the variances table. Resolving it needs a separate MMPS source check against `MMPSMetabolic_Meaning` (not located in Core during this pass).
6. **Evidence-strength claims should not be carried as established when the pair is edited.**
   - CCS §2: primitives "proven complete and minimal through formal axiom".
   - CRS §1: primitives "confirmed as mapping to" GR/QFT/QM/category theory.
   - CRS §11: the E² Agent "validates the theoretical claim".
   - `CRS_synthesized.ormd`: "validated", "decades of research".
   These should be flagged for the claim-strength review. This fold does not change them.
7. **Out-of-boundary originals.** Should `Phase 1/Context Layer/CRS_core_compression.ormd` (the only explicit "facet or cross-section" statement) and the true 2/23 CCS ORMD be copied into `archive/20260929_ccs_crs/` as provenance? Importing out-of-boundary files is not covered by the archiving authorization in the progress log, so this needs user direction. Until then, lineage cites them by URN.
8. **RCS naming** (§5) belongs to the OSI + RPs + communication package. Leave CRS §10 and the ORMD L433 `#rcs` link untouched here.
9. **Visible titles** belong to the plan §3 D title pass, not this package: the human H1 "Cognition as *Substrate*" vs ORMD title "Collective Cognitive Substrate", and the CRS H1 vs ORMD title. The same goes for "TC/EO" → "EOTC" inside Part II, which the terminology pass should apply uniformly. Part II should be transplanted verbatim first.
10. **The reader pairing after Stage 1.** The CRS composite then has one human source, so it becomes eligible for `ormd-primary.json`. `sync-human.mjs` would then overwrite `CRS.md` with an ORMD projection, so do not add CRS to `ormd-primary.json` until the human and ORMD Part II texts are confirmed equivalent through the projection.
11. **The Synthesized Core CCS summary** (`Collective_Cognitive_Substrate_synthesized.ormd`): archive it as a dependent summary (the 20260928 precedent), or keep it as a synthesis of Part II. This is the lead's choice.

---

*Review produced 2026-09-29 as a staged, review-only artifact. No active, archived, generated, Synthesized Core, or progress-log file was modified.*
