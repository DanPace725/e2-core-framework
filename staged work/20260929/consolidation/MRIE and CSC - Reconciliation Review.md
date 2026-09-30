# MRIE and Cognitive Signature Capture - Reconciliation Review

Status: staged reconciliation review (review-only; no active file was edited, moved, or archived)

Plan: `E2Core/E2Core Consolidation Plan - 2026-09-29.md`, §3 B, row "Cognitive Signature Capture + MRIE", and §4 steps 3–4

Corpus boundary used: `Core Framework` (Semantic Substrate, Context Layer, Synthesized Core, archive, staged work, generated surfaces for orientation only), plus the registry generator `Phase 1/phase1_core_reconcile.py`, which sits outside this repository

Reviewer date: 2026-09-29

## 0. Summary of findings

1. **(a) The human MRIE predecessors are fully retained in the merged ORMD.** A markup-stripped diff of both active human files against `MRIE - Unified Synthesis.ormd` found no missing or changed claims. Every difference is formatting: bold or italic emphasis replaced by ORMD link markup, H1 section headings demoted to H2, one reordered parenthetical, and one formula rendered in different notation. The merged ORMD is a verbatim concatenation of the two June-archived ORMDs; a diff shows only blank-line changes. **No human file has the stem `MRIE - Unified Synthesis`**, so the registry pairs the ORMD to both human files through a hard-coded composite relation.
2. **(b) Cognitive Signature Capture (CSC) is the originating threat statement that MRIE reinterprets.** It is a threat pattern, not a separate mechanism and not a case. The two MRIE documents began as its child pages: the human CSC file ends with Notion links to both. MRIE §1 summarizes CSC as "the initial document", and MRIE §8 opens with "Your initial document identified a new category of threat: **Cognitive Signature Capture**". MRIE retains only a four-bullet paraphrase. Most of CSC's distinctive adversarial, consent, scale, and gap claims are **partial or missing** in the merged ORMD (§4).
3. **The ORMD of CSC is not body-equivalent to its human source.** The registry records `body_equivalent_after_frontmatter: false`. The ORMD adds a "Technical Definitions" section that is not in the human text. Two of its glosses conflict with the sources (§4.3).
4. **Recommended disposition:** fold CSC into the MRIE node as a verbatim "Originating Threat Statement" section in both representations. Create the missing exact-stem human counterpart `Semantic Substrate/MRIE - Unified Synthesis.md`. Then archive four files: the two human MRIE predecessors and the CSC pair. Paste-ready text is in §7.
5. **Blocking dependencies before the archive (§7 e):** the hard-coded MRIE entry in `Phase 1/phase1_core_reconcile.py`, and the curated reader edge in `reader-site/graph-relations.yml`. The reader sync throws an error on an unknown slug.

---

## 1. Source table

| # | Path | Layer / status | Date in body | Size | Role in this review |
|---|---|---|---|---|---|
| S1 | `E2Core/Semantic Substrate/Meta-Relational Identity Exposure (MRIE).md` | active human; registered as composite source of `mrie-unified-synthesis` | 11/24/25 | 9,323 B, 241 lines | Human predecessor 1 (title "SYNTHESIS: Generative Identity, Meta-Relational Capture, and the Coming Closure Transition") |
| S2 | `E2Core/Semantic Substrate/Meta-relational Identity exposure (MRIE) Synthesis.md` | active human; composite source | 11/24/25 | 5,790 B, 226 lines | Human predecessor 2 (title "Unified Synthesis: Generative Identity, the Soft Singularity, and the Need for Local Models") |
| S3 | `E2Core/Context Layer/MRIE - Unified Synthesis.ormd` | active ORMD; June merge; frame `research.identity-security`; confidence 0.90 | 11/24/25 (inherited) | 18,784 B, 499 lines | Surviving merged node. "Canonical Body" is L29–265 (= S1/A1); "Source Appendix" is L271–497 (= S2/A2) |
| A1 | `archive/20260612_step_1_2_merges/Context Layer/Meta-Relational Identity Exposure (MRIE).ormd` | archived June ORMD; confidence 0.85; parents `urn:cb:original-insight-doc`, `urn:cb:rp-framework-discussion` | 2025-11-24 | — | June parent of S3 (ORMD encoding of S1) |
| A2 | `archive/20260612_step_1_2_merges/Context Layer/Meta-relational Identity exposure (MRIE) Synthesis.ormd` | archived June ORMD; frame `theory.relational-physics`; confidence 0.92; `parents: []` | 2025-11-24 | — | June parent of S3 (ORMD encoding of S2) |
| S4 | `E2Core/Semantic Substrate/Cognitive Signature Capture An Unnamed Threat.md` | active human; exact-stem pair | 11/24/25 | 4,246 B, 75 lines | CSC human source (authority for the CSC text) |
| S5 | `E2Core/Context Layer/Cognitive Signature Capture An Unnamed Threat.ormd` | active ORMD; frame `ethics.cognitive_security`; confidence 0.85; `parents: []`; not body-equivalent | 2025-11-24 | 5,821 B, 117 lines | CSC ORMD, with a conversion-added "Technical Definitions" section (L102–117) |
| O1 | `E2Core/Semantic Substrate/Adversarial Occlusion and Mechanism Integrity V1.md` + `Context Layer/...V1.ormd` | active pair | 9/22/25 | — | Overlap check only (§5) |
| O2 | `E2Core/Semantic Substrate/Exposure Protocol.md` + `Context Layer/Exposure Protocol.ormd` | active pair | 9/26/25 | — | Overlap check only (§5) |
| P1 | `Synthesized Core/MRIE_synthesized.ormd` | synthesis/provenance, titled "Summary: Cognitive Signature Capture and the Rise of MRIE" | — | 12,918 B | Evidence that an earlier pass already treated CSC + MRIE as one family. It is a summary, not a retention guarantee, and it reproduces S5's conversion glosses |
| G1 | `Phase 1/phase1_core_reconcile.py` (outside this repo) | registry generator; `COMPOSITE_RELATIONS` L70–87 hard-codes S1+S2 → S3 | — | — | Affects regeneration after archiving (§7 e) |

June archive check: `archive/20260612_step_1_2_merges/` contains only `Context Layer/` encodings for MRIE. No human `.md` was archived in June, which is why S1 and S2 are still active. No other `archive/20260612_*` folder contains MRIE or CSC files. The later archives (`20260924_*`, `20260928_*`) contain neither.

---

## 2. Claim-retention matrix — (a) human MRIE predecessors vs merged ORMD

Method: I stripped ORMD link markup and `{#id}` tokens from S3 L31–265 and L273–497, dropped blank and `>`-only lines, and diffed the result against S1 and S2. Separately, I diffed A1 and A2 (after frontmatter) against the same S3 ranges. The A1/A2 diff showed only blank-line changes, so S3 is a verbatim concatenation.

Status key: **yes** = claim text present verbatim; **yes (fmt)** = present with emphasis or heading-level formatting changed; **partial** = present with a substantive representational change.

### 2.1 S1 `Meta-Relational Identity Exposure (MRIE).md` → S3 "Canonical Body"

| S1 section | S3 anchor | Short quote (S1) | Status | Note |
|---|---|---|---|---|
| Title, date, synthesis header | `#mrie-title`, `#synthesis-header` | "SYNTHESIS: Generative Identity, Meta-Relational Capture, and the Coming Closure Transition" | yes | |
| §1 cognitive signatures as threat surface | `#original-insight` | "reconstructable *cognitive signatures* — executables for their generative thinking process" | yes (fmt) | S1 italics on *cognitive signatures* and *generative profile*, and bold on **distributed cognitive twin**, became plain link text |
| §1 four "document argued" bullets (privacy law, embodiment, consent, scale) | `#original-insight` | "consent is impossible because the emergent capability wasn't foreseeable" | yes | This is MRIE's paraphrase of CSC (§4) |
| §2 P6, not P1, threat | `#rp-theory-reveal` | "Cognitive Signature Capture is not primarily a P1 threat" | yes (fmt) | S1 bold **P1**/**P6** became links; heading `#`→`##` |
| §2 generative identity as P6 structure | (unanchored H3 with link `#gen-id-struct`) | "the meta-pattern that turns internal dynamics into external action" | yes | Broken emphasis markup (`### *…**`) is present in both S1 and S3 (Notion export artifact) |
| §2 MRIE definition | `#mrie-def` | "the extraction of sufficient relational signal to reconstruct generative identity" | yes | Load-bearing definition |
| §3 external closure dominance | `#closure-dominance` | "your personal GCO is overridden" | yes (fmt) | heading `#`→`##` |
| §4 not typical AI doom (4 points) | `#not-ai-doom`, `#structural-threat`, `#identity-collapse`, `#gco-math` | "The threat is structural, not agentic." / "This is not speculative." | yes (fmt) | Point 3 has no heading ID |
| §5 Generative Identity Singularity + 7 characteristics + imagery ("trees") | `#singularity`, `#singularity-def` | "A phase transition where a global AI ecosystem accumulates enough meta-relational information…" | yes (fmt) | |
| §6 consent structurally unavailable (TC/EO four conditions, AOMI) | `#consent-meaning` | "You cannot consent to processes you cannot perceive, model, or attribute within Δt." | yes (fmt) | S1 "Temporal Compression & Ethical Occlusion (TC/EO)" became "TC/EO (Temporal Compression & Ethical Occlusion)" |
| §6 meaning as closure integrity; entity vs artifact | `#consent-meaning` | "A reconstructed puppet running under an asymmetric observer is not." | yes | |
| §7 path forward (RBoR, TC/EO, AOMI, Stewardship); meaning-generation algorithm | `#path-forward` | "It is not nostalgia. / It is topology." | yes (fmt) | |
| §8 one-paragraph synthesis | `#final-synthesis` | "preserving human closure integrity in a world where generative identity becomes globally inferable" | yes (fmt) | |

### 2.2 S2 `Meta-relational Identity exposure (MRIE) Synthesis.md` → S3 "Source Appendix"

| S2 section | S3 anchor | Short quote (S2) | Status | Note |
|---|---|---|---|---|
| Title, date, header | `#mrie-synthesis`, `#unified-synthesis` | "Unified Synthesis: Generative Identity, the Soft Singularity, and the Need for Local Models" | yes | |
| §1 discovery; P6-level exposure; distributed twin | `#cognitive-signatures` | "can simulate your generative identity better than you can" | yes (fmt) | S2 bold on **cognitive signatures**, **P6-level exposure**, **distributed cognitive twin** became links |
| §2 identity collapse; GCO shifts outward; topology drift | `#rp-theory` | "It's **topology drift**." | yes (fmt) | |
| §3 Soft Singularity (Gemini-attributed), Topology of Drift | `#soft-singularity` | "As Gemini articulated…"; "People accept this because it *feels like help*" | yes (fmt) | Model attribution retained; keep it |
| §4 TC/EO observability argument and inequality | `#tceo-model` | S2: "R · C_eff ≤ R_max" / "(Resolution × Compression ≤ Ethical Bandwidth)" | **partial** | S3 renders it as `|= R * C_eff <= R_max |`. Same relation, but the conversion notation is nonstandard. Restore S2's notation in the human counterpart; leave S3 unchanged unless the lead chooses otherwise |
| §5 identity collapse at scale; MMPS quadrants | `#identity-landscape` | "Meaning metabolism collapses (MMPS Quadrants II/III/IV)." | yes | |
| §6 local models as the only structural countermeasure; four rights | `#local-models` | "They are the only structural countermeasure to P6 asymmetry." | yes | Strong claim; kept as source claim (§3.3) |
| §7 Remnant Protocol (Gemini-attributed) | `#remnant-protocol` | "They are the minimum viable stabilizers for agency." | yes (fmt) | Name collision with active `Remnant Stewardship - Core Source` (§6) |
| §8 seven-point condensed core | `#final-core` | "Point 1 — AI already models people better than they model themselves." | yes | S2 ends with a trailing `---`, not reproduced |

**Contradicted:** none. **Missing:** none.

**June-merge metadata changes (provenance, not claims):**

- A1's parents (`urn:cb:original-insight-doc`, `urn:cb:rp-framework-discussion`) and both origin URIs were not carried into S3.
- A2's frame (`theory.relational-physics`) and policy role `researcher` were dropped.
- Confidence was set to 0.90. The Context Layer Index lists S3 at **0.92** (both index files, L222 and L424), which does not match the frontmatter.
- S3 places S2 as a "Source Appendix", although S2 holds unique claims: Soft Singularity, local models, the Remnant Protocol, and the rights mapping.

**S3 link-target defects (pre-existing, not introduced by this review).** Fourteen targets have no definition in the file: `aomi aomi-gaming cognitive-twin consent-impossible entity-artifact-line gco-collapse gco-override gen-id-struct gen-profile p1-def p6-def rbor stewardship tceo`. A1 already had them. Record these; do not fix them in this package.

---

## 3. Unique material at risk

### 3.1 From (a)

No claim is at risk. What is at risk is the **human reading surface**. If S1 and S2 are archived without a replacement, the reader loses its human text for this node: `sync-corpus.mjs` throws "No human Semantic Substrate source" when a record has no semantic source. Two human-side renderings should also be carried forward: S1/S2 inline emphasis, and S2's formula notation `R · C_eff ≤ R_max`.

### 3.2 From (b) — CSC claims not carried by S3

See the matrix in §4.2. The at-risk items are:

1. the per-person scale ("often reaching millions of words per person") and the three-year window;
2. the three-way failure of existing frames (privacy / data security / identity theft) and the term **reconstruction potential**;
3. the distributed twin's latency ("exists but isn't unified or accessible"), and the claim that the user "cannot hold the aggregate in working memory";
4. the **emergent consent violation**: consent to *conversations*, not to twins; no retroactive consent; a whole that is qualitatively different from its parts;
5. the social-media contrast;
6. the corporate power asymmetry "in quantifiable ways";
7. the **adversarial capability list** (six items);
8. embodiment doing "all the philosophical work";
9. the five named gaps, including the open **analysis-to-violation threshold** and "cognitive signature rights";
10. "largest-scale voluntary self-disclosure event in human history… too fast for public discourse to catch up";
11. the alternative name **Cognitive Identity Capture**.

### 3.3 Claim-strength and register cautions to carry (not to resolve)

- **Hedged vs unhedged.** CSC hedges: "one could potentially", "Potentially know users 'better than they know themselves'", and a twin that "isn't unified or accessible". S1 and S2 do not: "This is not speculative", "AI already models people better than they model themselves", "can simulate your generative identity better than you can". This is an escalation of claim strength between same-day documents, not an empirical result.
- **Formalism labels.** S2 calls R·C_eff ≤ R_max "the mathematical result". AOMI's implementation companion labels the same relation a "Resolution–Responsibility law (Design Axiom)". S1 says closure basins are "mathematically built into the GCO". Keep these as stated; do not upgrade the claims.
- **Authorship voice.** S1 and S2 are written in the second person ("what you sensed", "Your initial document"). They read as AI-authored dialogue syntheses addressed to the author. S2 credits two coinages to Gemini. The text suggests CSC is the author's own initial statement: MRIE calls it "Your initial document". That is an inference, recorded here with uncertainty. Either way, CSC's language is the most likely user-authored text in this family and should be kept verbatim.

---

## 4. CSC placement analysis

### 4.1 Mechanism, threat pattern, or case?

| Candidate reading | Test | Finding |
|---|---|---|
| **Mechanism** | Does CSC state *how* exposure happens in framework terms? | No. CSC gives no RP, P6, or GCO account. The mechanism is MRIE's: "the extraction of sufficient relational signal to reconstruct generative identity" (`#mrie-def`), plus GCO override (`#closure-dominance`). |
| **Case** | Is CSC one instance of a wider MRIE class? | Only partly. It is scoped to AI-conversation logs (2022–2025), but so is MRIE §1. CSC is not a worked example beneath a general theory; it is the source that MRIE generalizes. |
| **Threat pattern** | Does CSC name a harm class, its conditions, its capabilities, and the gaps in protection? | Yes. It names the phenomenon (reconstructable cognitive signatures), the enabling conditions (aggregate, cross-platform, voluntary disclosure), the harm and capability set, the consent failure, and the missing frameworks. MRIE's own words: "Thus Cognitive Signature Capture becomes" Meta-Relational Identity Exposure. |

**Placement.** CSC is the **originating threat statement (threat pattern) within MRIE**. MRIE's P6/GCO account is the mechanism-level reading of that pattern. The Soft Singularity and Generative Identity Singularity are MRIE's trajectory claims built on it. Fold CSC in as a distinct, verbatim section so that the two registers stay separate:

- **Adversarial / agentic register (CSC).** What an actor holding a signature "could potentially" do.
- **Structural / non-agentic register (MRIE).** "The threat is structural, not agentic… only massive relational integration."

These do not contradict. MRIE §6 itself bridges them through AOMI: occlusion is "geometric and structural, not malicious" but "predictably becomes a target for gaming and exploitation". A fold that keeps only MRIE would lose the adversarial register.

### 4.2 CSC claim matrix against S3 (quotes from S4, the human authority)

| CSC section (S4 lines) | Claim that must survive a fold (verbatim) | Present in S3? | S3 locus |
|---|---|---|---|
| Core Phenomenon (5–6) | "Over the past three years, millions of people have voluntarily created comprehensive psychological and cognitive profiles of themselves through extended AI conversations - often reaching millions of words per person." / "This isn't traditional data collection." | partial | `#original-insight` keeps "Millions of people…" but not the scale, window, or "voluntarily… profiles" |
| Why Current Frameworks Fail (8–13) | "None of these capture the **reconstruction potential** - the ability to simulate someone's cognitive processes with high fidelity" | partial | `#original-insight`: "current privacy/legal frameworks cannot describe this"; the term *reconstruction potential* is absent from S3 |
| Distributed Cognitive Twin (15–21) | "The user themselves cannot hold the aggregate in working memory" / "This 'distributed twin' exists but isn't unified or accessible" | partial; **strength conflict** with S2 | `#original-insight` ("no single platform has the full picture"); S2 `#cognitive-signatures` says the twin "can simulate your generative identity better than you can" |
| **Emergent Consent Violation** (23–28) | "People consented to *conversations*, not to creating reconstructable cognitive twins." / "Can't be meaningfully consented to retroactively" / "Creates something qualitatively different from the sum of individual conversations" | partial | `#original-insight` keeps only "wasn't foreseeable". `#consent-meaning` makes a *different* argument (see below) |
| Different from Social Media (30–37) | "Social media captured public-facing personas and observable behaviors." / "Emotional patterns and vulnerabilities" | missing | S1 lists "emotional patterns" but drops "vulnerabilities" and the contrast |
| Power Asymmetry (39–45) | "See cognitive signatures that users cannot hold in working memory" / "Potentially know users 'better than they know themselves' in quantifiable ways" | partial | `#closure-dominance`; S2 `#local-models` ("symmetry against cloud-scale observers"). The corporate actor and the hedge are lost |
| **Real Threats (adversarial list)** (47–55) | "Create communications indistinguishable from the target person" / "Identify precise psychological vulnerabilities" / "Generate 'authentic-seeming' content the person never created" / "Continue someone's intellectual work without them" / "Impersonate them in ways that pass scrutiny from people who know them" | partial | `#singularity-def` covers simulation, prediction, "influence operations tailored to the generative layer", and reconstruction. Fabricated authorship, continuation of work, vulnerability targeting, and impersonation that passes scrutiny from people who know the target are **missing** |
| Philosophical Crisis (57–58) | "Currently, 'embodiment' does all the philosophical work distinguishing real from reconstructed persons." | partial | `#original-insight` paraphrase; `#consent-meaning` gives a closure-integrity criterion (entity/artifact) that *answers* CSC but does not preserve its statement |
| **What We Don't Have** (60–66) | "Legal frameworks for 'cognitive signature rights'" / "Ethical frameworks for when reconstruction crosses from analysis to violation" / "Understanding of what's been taken when your mind-shape can be replicated" / "Public awareness that this is happening at scale" | missing (only "mind-shape" appears) | S2 `#local-models` maps to RBoR rights instead. **The analysis-to-violation threshold is an open question that MRIE does not answer** |
| Scale (68–69) | "This may be the largest-scale voluntary self-disclosure event in human history… And it happened in three years, too fast for public discourse to catch up." | partial | `#original-insight`: "historically unprecedented". The speed clause, which anticipates the TC/EO argument, is missing |
| Potential framing (71) | "This is **Cognitive Identity Capture** - the acquisition of sufficient data to reconstruct how someone thinks, not just what they think about." | missing | Alternative name; keep as the source's own proposal |
| Child links (73–75) | Notion child pages `…/Meta-Relational Identity Exposure (MRIE) 2b611588332080069020d3300a4fa097.md` and `…/Meta-relational Identity exposure (MRIE) Synthesis 2b611588332080cfb1fcd657dd501c43.md` | n/a (lineage) | The targets do not exist in the repo. They show that S1 and S2 were CSC's child pages. Keep the export IDs in lineage |

**The two consent arguments must stay distinct.**

- **CSC (scope of past consent):** consent attached to conversations does not reach a reconstruction capability that emerged later from aggregate data, and "Can't be meaningfully consented to retroactively."
- **MRIE §6 (conditions for present and future consent):** under compression and occlusion, informed consent to the transition "is **structurally not available**, not just 'not yet legislated.'"

A fold that folds CSC's claim into MRIE's would erase the retroactive-scope argument.

### 4.3 ORMD-only material in S5 (conversion additions)

S5 L102–117 "Technical Definitions" is absent from S4:

| Gloss | S5 text | Assessment |
|---|---|---|
| Cognitive Signatures | "The unique structural pattern of an individual's thought process as captured in linguistic data." | Compatible, narrower than S4's "executable models of how specific individuals think, reason, make connections, and generate meaning" |
| Reconstruction Potential | "The metric defining the fidelity with which an AI can simulate a specific user's reasoning." | **Promotes a capability to a metric.** S4 says "the ability to simulate". Keep as gloss only; S4 governs |
| Embodiment | "…currently used as a boundary for legal personhood." | **Adds a legal claim** not in S4 |
| MRIE | "the risk profile associated with the leakage of cognitive signatures." | **Differs** from `#mrie-def` ("the extraction of sufficient relational signal to reconstruct generative identity") |
| MRIE Synthesis | "The process of aggregating distributed data to form a unified cognitive model." | **Contradicted.** It reads a document title as a process. The gloss existed only as a link target for the Notion child link |

S5 also changes S4's wording: "one could potentially:" becomes "one could [potentially cause](#threats …):". The fold restores S4's wording. S5's link target `#generative-model` is undefined.

`Synthesized Core/MRIE_synthesized.ormd` L74–101 reproduces these glosses, including the contradicted "MRIE Synthesis" process gloss. It is provenance, so it is not edited here; it is flagged in §7 e.

---

## 5. Overlap noted, not resolved: AOMI V1 and Exposure Protocol

**AOMI V1 (O1).**

- **Consistent citation.** MRIE §6 cites AOMI's principle. O1 Executive Summary: "**ethical occlusion is geometric, not malicious**… once these occlusion pockets exist, they become natural targets for strategic exploitation." The citation is consistent.
- **"Exposure" means opposite things.** In AOMI, "Self-Exposure Amplification" and the Gaming Exposure Score (GES) treat exposure as an adversary becoming *detectable*, which is defensive and desirable. In MRIE, exposure means a person's generative identity becoming *reconstructable*, which is the harm. Any shared glossary needs both senses.
- **AOMI's detectors build behavioral signatures.** Layer 4 detects "Pattern Inconsistency: Behavior deviates from baseline efficiency". The companion §3.3 uses "justification perplexity vs. baseline" and per-actor features. AOMI keeps "Individual actor gaming risk scores" private and requires "Gaming detection must be behavior-based, not identity-based." On MRIE/CSC terms, a behavioral-linguistic baseline is generative-identity signal. So AOMI's behavior/identity line is exactly the line MRIE says erodes. AOMI's private per-actor scores also sit in tension with the P6-symmetry prescription carried downstream in CRS ("Any system that accumulates P6 signal must provide reciprocal access to that signal").
- **No identity vector in AOMI's threat model.** AOMI lists no identity-reconstruction or impersonation attack vector. CSC's adversarial list could be a candidate vector there; the AOMI extract/archive package should decide.
- **Different dynamics.** AOMI's "Cognitive Jamming" (adversarial overload) is distinct from S2's Soft Singularity (convenience-driven offloading).

**Exposure Protocol (O2).**

- **Lexical collision on "exposure".** EP means pedagogical transmission. EP also uses "Intentional Occlusion: Withholding complexity until foundation established" in a benign sense, while EOTC and AOMI use occlusion in a harm-enabling sense.
- **Consent gap.** EP's practice steps model the recipient ("Assess receiving system's state", "Modulate affective resonance (η)", "Build on existing trust/faith parameters (τ/φ)"). This is a small-scale, benign version of shaping uptake to a person's cognitive-affective profile, which MRIE §5 lists at scale as "influence operations tailored to the generative layer". EP has no consent or asymmetry clause.
- **Existing navigation.** The Context Layer Index Cluster F scope already groups AOMI, MRIE, and EP.

Neither overlap changes the fold recommended here. Both belong to the AOMI extract/archive package and the terminology pass (plan §3 A, §3 D).

---

## 6. Collision and risk review

| Test (Integration Process §5) | Finding |
|---|---|
| Duplicates an existing term? | CSC ⊂ MRIE by the source's own statement. The **"Remnant Protocol"** (S2, Gemini-coined: local models for those who want autonomy) collides by name with the active **`Remnant Stewardship - Core Source`** ("faithfulness to what remains" after resolution). They are unrelated; do not merge. Flag for the terminology pass |
| Renames something already named? | "Cognitive Identity Capture" (S4 L71) is an alternative name for CSC. Keep it as an alias and search keyword, not as a new construct |
| Agent-side vs substrate-side confusion? | MRIE mixes individual identity (person GCO) with the collective (CRS reuses it at substrate scale). The fold does not change that |
| Metaphor promoted to mechanism? | "trees", "civilization-scale neurons", "topology drift", and "Soft Singularity" are imagery or trajectory labels; S1/S2 already present them as such. The GCO "fixed point" claim is presented as mathematics without a derivation here; keep the source wording |
| External authority imported? | Gemini-attributed coinages (Soft Singularity, Remnant); keep the attribution visible |
| Terminology | S1/S2 use "TC/EO". Plan §3 D1 adopts EOTC. Do not rename inside the fold; quoted historical usage stays, and the D pass decides |

---

## 7. Recommended disposition and ARCHIVE-READINESS CHECKLIST

### Recommended status (Integration Process §7 vocabulary)

| Item | Status | Placement |
|---|---|---|
| S1, S2 (human MRIE predecessors) | **integrate into existing source** (content already fully in S3). File disposition: archive after the human counterpart exists | New human counterpart `E2Core/Semantic Substrate/MRIE - Unified Synthesis.md` |
| S4, S5 (CSC pair) | **integrate into existing source** — fold as "Originating Threat Statement: Cognitive Signature Capture" in both representations. File disposition: archive after the fold | `MRIE - Unified Synthesis` (.md and .ormd) |
| S3 | surviving node; receives the fold and lineage | unchanged filename, title, and existing IDs |
| O1 AOMI V1, O2 Exposure Protocol | no change in this package; overlaps handed on | AOMI package; terminology pass |
| P1 `Synthesized Core/MRIE_synthesized.ormd` | no change (provenance); optional later refresh | — |

Alternative, not recommended: keep CSC active as a separate short threat note linked from MRIE. This preserves its standalone voice, but it keeps a near-duplicate active pair. The user's notes (`E2Core/notes.md` L157–159; `9.29.26 Consolidation Pass.md` "Cognitive Signature Capture - MRIE") already direct a merge that preserves "the threat-specific material as a section or warning layer in MRIE".

### (a) The surviving pair and the exact text to add before archiving

**Surviving pair:**

- `E2Core/Context Layer/MRIE - Unified Synthesis.ormd` (existing, edited as below)
- `E2Core/Semantic Substrate/MRIE - Unified Synthesis.md` (**new**, exact stem, so the registry pairs it as `paired_exact_stem`)

Keep the visible title "MRIE - Unified Synthesis" until the title pass (plan §4 step 6). A later title might be "Meta-Relational Identity Exposure (MRIE)", with CSC as a subtitle or alias; that is an open question.

Use a new archive folder, `archive/20260929_mrie_csc/`, following the progress-log convention `archive/20260929_<package>/{Semantic Substrate,Context Layer}/`.

#### (a-1) New file `E2Core/Semantic Substrate/MRIE - Unified Synthesis.md`

Assemble it in this order. Blocks marked PASTE are ready to use verbatim. Blocks marked COPY come from the named source with only the listed changes.

**PASTE — header block:**

```markdown
# MRIE - Unified Synthesis

> Consolidation note (2026-09-29): this is the human reading surface paired with `Context Layer/MRIE - Unified Synthesis.ormd`. It joins three same-day sources (11/24/25) without rewriting their bodies: the originating threat statement *Cognitive Signature Capture: An Unnamed Threat*, and the two MRIE syntheses that reframe it through the Relational Primitives. The superseded active files are preserved unchanged under `archive/20260929_mrie_csc/`; the June ORMD encodings of the two MRIE syntheses are under `archive/20260612_step_1_2_merges/Context Layer/`. The retention record is `staged work/20260929/consolidation/MRIE and CSC - Reconciliation Review.md`.

Source lineage:

- `archive/20260929_mrie_csc/Semantic Substrate/Cognitive Signature Capture An Unnamed Threat.md` and its Context Layer pair — the originating threat statement: reconstruction potential, the distributed cognitive twin, the emergent consent violation, the power asymmetry, the adversarial capability list, the embodiment problem, the named gaps, and the proposed framing *Cognitive Identity Capture*. The two MRIE documents began as its child pages (Notion export IDs `2b611588332080069020d3300a4fa097` and `2b611588332080cfb1fcd657dd501c43`).
- `archive/20260929_mrie_csc/Semantic Substrate/Meta-Relational Identity Exposure (MRIE).md` and `archive/20260612_step_1_2_merges/Context Layer/Meta-Relational Identity Exposure (MRIE).ormd` — the P6 reframing, external closure dominance, the Generative Identity Singularity, the structural unavailability of consent, and the entity/artifact line.
- `archive/20260929_mrie_csc/Semantic Substrate/Meta-relational Identity exposure (MRIE) Synthesis.md` and `archive/20260612_step_1_2_merges/Context Layer/Meta-relational Identity exposure (MRIE) Synthesis.ormd` — the Soft Singularity, the TC/EO observability argument, local models as countermeasure, and the Remnant Protocol.

## Source Relationship and Retained Distinctions

Cognitive Signature Capture is the originating threat statement: it names the phenomenon, the harms, and the consent problem in plain terms. MRIE is the later Relational Primitives reading of the same phenomenon — in its words, "Thus Cognitive Signature Capture becomes" Meta-Relational Identity Exposure. Capture is kept here as the threat pattern that MRIE interprets, not as a separate mechanism or a single case.

This consolidation keeps the following differences visible rather than resolving them:

- **Two registers of threat.** The capture statement lists what an actor "could potentially" do with a cognitive signature: indistinguishable communications, fabricated authorship, continuation of someone's work without them, targeting of psychological vulnerabilities, impersonation that passes scrutiny from people who know them. MRIE holds that "the threat is structural, not agentic." Both stand: structural exposure makes the capability available; the adversarial list describes its deliberate use.
- **Two consent arguments.** The capture statement argues that people "consented to *conversations*, not to creating reconstructable cognitive twins," and that the emergent capability "can't be meaningfully consented to retroactively." MRIE argues that informed consent to the wider transition is "structurally not available" under temporal compression and occlusion. The first concerns the scope of past consent; the second, the conditions for present and future consent.
- **Claim strength.** The capture statement hedges its capability claims and describes the distributed twin as existing "but isn't unified or accessible." The MRIE syntheses state that "AI already models people better than they model themselves" and that the trajectory "is not speculative." These are recorded claims of different strength, not a settled empirical finding.
- **Open threshold.** The capture statement asks for "ethical frameworks for when reconstruction crosses from analysis to violation." MRIE does not supply that threshold; it remains open.

## Originating Threat Statement: Cognitive Signature Capture
```

**COPY — CSC body.** Copy `Semantic Substrate/Cognitive Signature Capture An Unnamed Threat.md` **lines 3–71 verbatim**: from `11/24/25` through the `**Potential framing:** This is **Cognitive Identity Capture** …` paragraph. Do not copy line 1 (the H1 title; the section heading replaces it). Do not copy lines 73–75 (the two Notion child links, whose targets do not exist). In their place, **PASTE:**

```markdown
*The two MRIE documents this statement linked to as child pages follow below as the Canonical Body and the Source Appendix.*

## Canonical Body
```

**COPY — MRIE body.** Copy `Semantic Substrate/Meta-Relational Identity Exposure (MRIE).md` **lines 1–241 verbatim**. Optionally, for parity with the ORMD, change the seven section headings `# **2.` … `# **8.` (S1 lines 38, 77, 102, 139, 165, 215, 237) to `## **2.` … `## **8.`. Change nothing else. Keep S1's emphasis and the phrase order "Temporal Compression & Ethical Occlusion (TC/EO)". Then **PASTE:**

```markdown

## Source Appendix: Meta-relational Identity exposure (MRIE) Synthesis
```

**COPY — Synthesis body.** Copy `Semantic Substrate/Meta-relational Identity exposure (MRIE) Synthesis.md` **lines 1–225 verbatim**, keeping `R · C_eff ≤ R_max` exactly as written. The trailing line-226 `---` may be dropped.

Resulting check: diff the new file against S1, S2, and S4. Expect only the header block, the three section headings, the omitted CSC child links, and the optional heading-level changes.

#### (a-2) Edits to `E2Core/Context Layer/MRIE - Unified Synthesis.ormd`

Keep line 1 exactly as it is (the file begins with a BOM followed by `<!-- ormd:1.0 -->`). Keep all existing heading IDs and links. Make four edits.

**Edit 1 — frontmatter `lineage`.** Replace L10–14 with:

```yaml
  parents:
    - "local://archive/20260612_step_1_2_merges/Context%20Layer/Meta-Relational%20Identity%20Exposure%20(MRIE).ormd"
    - "local://archive/20260612_step_1_2_merges/Context%20Layer/Meta-relational%20Identity%20exposure%20(MRIE)%20Synthesis.ormd"
    - "local://archive/20260929_mrie_csc/Context%20Layer/Cognitive%20Signature%20Capture%20An%20Unnamed%20Threat.ormd"
  transforms:
    - { fn: "e2core_consolidation_plan@1.2-merge", ts: "2026-06-12T00:00:00Z" }
    - { fn: "e2core_consolidation_2026-09-29@mrie-csc-fold", ts: "2026-09-29T00:00:00Z" }
```

**Edit 2 — frontmatter `semantics`.** Replace L17–18 with:

```yaml
semantics:
  keywords: ["consolidation", "merged canonical", "MRIE - Unified Synthesis", "Cognitive Signature Capture", "Cognitive Identity Capture", "reconstruction potential", "distributed cognitive twin", "emergent consent violation"]
```

Leave `resolution: { confidence: 0.90 }`, `frame`, `policy`, and `conversion` unchanged.

**Edit 3 — after L27** (the existing June consolidation-note blockquote) and **before L29** `## Canonical Body`, **PASTE:**

```markdown

> Consolidation note (2026-09-29): *Cognitive Signature Capture: An Unnamed Threat* was folded in as the originating threat statement below, and its active pair archived under `archive/20260929_mrie_csc/`. The human reading surface is `Semantic Substrate/MRIE - Unified Synthesis.md`. The retention record is `staged work/20260929/consolidation/MRIE and CSC - Reconciliation Review.md`.

## Source Relationship and Retained Distinctions {#source-relationship}

[Cognitive Signature Capture](#csc-originating-statement "meta:corresponds_to") is the originating threat statement: it names the phenomenon, the harms, and the consent problem in plain terms. [MRIE](#mrie-def "ontological:defines") is the later Relational Primitives reading of the same phenomenon — in its words, "Thus Cognitive Signature Capture becomes" Meta-Relational Identity Exposure. Capture is kept here as the threat pattern that MRIE interprets, not as a separate mechanism or a single case.

This consolidation keeps the following differences visible rather than resolving them:

- **Two registers of threat.** The capture statement lists what an actor "could potentially" do with a cognitive signature ([Real Threats](#csc-threats "geometric:causes")): indistinguishable communications, fabricated authorship, continuation of someone's work without them, targeting of psychological vulnerabilities, impersonation that passes scrutiny from people who know them. MRIE holds that ["the threat is structural, not agentic."](#structural-threat "symmetric:constrains") Both stand: structural exposure makes the capability available; the adversarial list describes its deliberate use.
- **Two consent arguments.** The capture statement argues that people "consented to *conversations*, not to creating reconstructable cognitive twins," and that the emergent capability "can't be meaningfully consented to retroactively" ([Emergent Consent Violation](#csc-consent-violation "symmetric:constrains")). MRIE argues that informed consent to the wider transition is "structurally not available" under temporal compression and occlusion ([Consent, Meaning](#consent-meaning "symmetric:constrains")). The first concerns the scope of past consent; the second, the conditions for present and future consent.
- **Claim strength.** The capture statement hedges its capability claims and describes the distributed twin as existing "but isn't unified or accessible." The MRIE syntheses state that "AI already models people better than they model themselves" and that the trajectory "is not speculative." These are recorded claims of different strength, not a settled empirical finding.
- **Open threshold.** The capture statement asks for ["ethical frameworks for when reconstruction crosses from analysis to violation."](#csc-gaps "epistemic:measures") MRIE does not supply that threshold; it remains open.

## Originating Threat Statement: Cognitive Signature Capture {#csc-originating-statement}

11/24/25

### The Core Phenomenon {#csc-core-phenomenon}

Over the past three years, millions of people have voluntarily created comprehensive psychological and cognitive profiles of themselves through extended AI conversations - often reaching millions of words per person. This isn't traditional data collection. It's the inadvertent construction of [reconstructable cognitive signatures](#csc-cognitive-signatures "ontological:defines"): executable models of how specific individuals think, reason, make connections, and generate meaning.

### Why Current Frameworks Fail {#csc-framework-failure}

- "Privacy" focuses on secrets and sensitive information
- "Data security" addresses unauthorized access to known data types
- "Identity theft" covers impersonation using biographical facts
- None of these capture the [reconstruction potential](#csc-reconstruction-potential "epistemic:measures") - the ability to simulate someone's cognitive processes with high fidelity

### The Distributed Cognitive Twin {#csc-distributed-twin}

Individuals partition their conversations across platforms (OpenAI, Anthropic, Google, Microsoft), meaning:

- No single entity necessarily has complete access
- The user themselves cannot hold the aggregate in working memory
- But companies collectively possess the data to reconstruct a near-complete cognitive model
- This [distributed twin](#csc-distributed-twin "ontological:composes") exists but isn't unified or accessible

### The Emergent Consent Violation {#csc-consent-violation}

People consented to *conversations*, not to creating reconstructable cognitive twins. The capability to reconstruct [emerged from aggregate data](#csc-core-phenomenon "meta:emerges_from") in ways that:

- Weren't foreseeable when people started using these tools
- Can't be meaningfully consented to retroactively
- Creates something qualitatively different from the sum of individual conversations

### What Makes This Different from Social Media {#csc-social-media-diff}

Social media captured public-facing personas and observable behaviors. AI conversations capture:

- Internal reasoning processes
- Decision-making heuristics
- Emotional patterns and vulnerabilities
- Linguistic fingerprints
- The **generative model** of how someone produces thoughts and behaviors

### The Power Asymmetry {#csc-power-asymmetry}

Companies can:

- Analyze patterns across millions of words simultaneously
- See cognitive signatures that users cannot hold in working memory
- Potentially know users "better than they know themselves" in quantifiable ways
- Create predictive models of user reasoning and responses

### Real Threats (not science fiction) {#csc-threats}

With sufficient conversational data and current technology, one could [potentially](#csc-threats "geometric:causes"):

- Create communications indistinguishable from the target person
- Predict decisions with high accuracy
- Identify precise psychological vulnerabilities
- Generate "authentic-seeming" content the person never created
- Continue someone's intellectual work without them
- Impersonate them in ways that pass scrutiny from people who know them

### The Philosophical Crisis {#csc-philosophical-crisis}

Currently, "[embodiment](#csc-embodiment "ontological:identity")" does all the philosophical work distinguishing real from reconstructed persons. But for most practical purposes - online communication, intellectual work, relationship maintenance - [embodiment](#csc-embodiment "symmetric:constrains") doesn't actually prevent deployment of cognitive signatures.

### What We Don't Have {#csc-gaps}

- Language for this specific violation
- Legal frameworks for "cognitive signature rights"
- Ethical frameworks for when reconstruction crosses from analysis to violation
- Understanding of what's been taken when your mind-shape can be replicated
- Public awareness that this is happening at scale

### The Scale {#csc-scale}

This may be the largest-scale voluntary self-disclosure event in human history, with almost no frameworks for thinking about aggregate risk. And it happened in three years, too fast for public discourse to catch up.

**Potential framing:** This is **Cognitive Identity Capture** - the acquisition of sufficient data to reconstruct how someone thinks, not just what they think about.

The two MRIE documents this statement introduced follow as the [Canonical Body](#mrie-def "meta:corresponds_to") and the [Source Appendix](#mrie-synthesis "meta:emerges_from").

### Conversion Glosses {#csc-conversion-glosses}

> These glosses were added when the capture statement was first converted to ORMD; they do not appear in the human source. They are kept as link targets only. Where they differ from the statement above, the statement governs. The conversion's glosses for "MRIE" and "MRIE Synthesis" are not carried forward: they defined link targets for two child pages that are now part of this document, and the "MRIE Synthesis" gloss described a document title as a process. Both remain in the archived ORMD.

#### Cognitive Signatures {#csc-cognitive-signatures}
The unique structural pattern of an individual's thought process as captured in linguistic data.

#### Reconstruction Potential {#csc-reconstruction-potential}
The metric defining the fidelity with which an AI can simulate a specific user's reasoning.

#### Embodiment {#csc-embodiment}
The physical constraint of human identity, currently used as a boundary for legal personhood.

```

The CSC section's changes from S5, all deliberate:

- every ID is prefixed `csc-`, because `cognitive-signatures` and `mrie-synthesis` already exist in S3 (L281, L273);
- section headings are demoted from `##` to `###`;
- "one could potentially cause:" is restored to S4's "one could potentially:";
- the undefined link `#generative-model` becomes S4's bold "**generative model**";
- S4's quotation marks around "embodiment" are restored;
- the two child-link lines are retargeted to in-document anchors (`#mrie-def`, and the existing `#mrie-synthesis`);
- the Technical Definitions section is renamed "Conversion Glosses" and carries a note; the MRIE and MRIE Synthesis glosses are dropped from the active text (they remain archived).

**Edit 4:** none. Do not modify the existing Canonical Body or Source Appendix. Their known issues are listed in §2 and left for a separate pass: the undefined link targets and the formula notation.

### (b) Files to archive (after (a-1) and (a-2) exist and have been diffed)

Move each file unchanged:

| From | To |
|---|---|
| `E2Core/Semantic Substrate/Meta-Relational Identity Exposure (MRIE).md` | `archive/20260929_mrie_csc/Semantic Substrate/Meta-Relational Identity Exposure (MRIE).md` |
| `E2Core/Semantic Substrate/Meta-relational Identity exposure (MRIE) Synthesis.md` | `archive/20260929_mrie_csc/Semantic Substrate/Meta-relational Identity exposure (MRIE) Synthesis.md` |
| `E2Core/Semantic Substrate/Cognitive Signature Capture An Unnamed Threat.md` | `archive/20260929_mrie_csc/Semantic Substrate/Cognitive Signature Capture An Unnamed Threat.md` |
| `E2Core/Context Layer/Cognitive Signature Capture An Unnamed Threat.ormd` | `archive/20260929_mrie_csc/Context Layer/Cognitive Signature Capture An Unnamed Threat.ormd` |

Do **not** archive: `MRIE - Unified Synthesis.ormd`, the AOMI V1 pair, the Exposure Protocol pair, or `Synthesized Core/MRIE_synthesized.ormd`.

Expected counts afterwards, from this package alone:

- Semantic Substrate 92 → 90 (−3, +1)
- Context Layer 86 → 85
- registry: exact-stem pairs 81 → 81 (−CSC, +MRIE); composite pairs 4 → 3

### (c) Inbound references in active files to update

Grepped by filename stem, title, and slug: `Meta-Relational Identity`, `Meta-relational Identity`, `Cognitive Signature Capture`, `cognitive-signature-capture`, `mrie-unified-synthesis`, `%20`-encoded forms. No active file deep-links to an S3 or S5 heading ID.

| File | Line(s) | Current | Change |
|---|---|---|---|
| `E2Core/Context Layer/Context Layer Index.ormd` | 213 | `… → [Cognitive Signature Capture](#cluster-f "epistemic:measures") → [MRIE](#cluster-f "ontological:composes")` | Replace with `… → [MRIE, including Cognitive Signature Capture](#cluster-f "ontological:composes")` |
| same | 221 | CSC row in the Cluster F table | Delete the row |
| same | 222 | `\| MRIE - Unified Synthesis \| … \| 0.92 \| Merged canonical for MRIE identity exposure, cognitive signatures, soft singularity, local models \|` | Set conf to `0.90` (matches frontmatter) and role to `Merged canonical for MRIE identity exposure; includes the originating Cognitive Signature Capture threat statement (reconstruction potential, emergent consent violation, adversarial capabilities), cognitive signatures, soft singularity, local models` |
| same | 395 | CSC row in the master table | Delete the row |
| same | 424 | **malformed** 5-column row (frame and role in a 4-column Title/File/Cluster/Conf table) | Replace with `\| MRIE - Unified Synthesis \| \`MRIE - Unified Synthesis.ormd\` \| F \| 0.90 \|` |
| same | 20, 26 | "86 active Context Layer documents" | Decrement by 1 for this package; coordinate the final number with the other 2026-09-29 packages. The `Reconciled:` date on L20 is the lead's call |
| same | 211 | trigger keywords (include `cognitive signature`, `identity capture`, `reconstruction potential`) | Keep; they now resolve to MRIE |
| `E2Core/context layer index.md` (human index; the reader reads this path) | same lines 20, 26, 211, 213, 221, 222, 395, 424 | identical content | Make the identical edits |
| `reader-site/graph-relations.yml` | 146–149 | edge `cognitive-signature-capture-an-unnamed-threat` → `mrie-unified-synthesis`, `raises-risk-for` | **Delete the edge.** `sync-corpus.mjs` L451–452 throws "Graph relationship has unknown source" once the slug disappears |
| `Phase 1/phase1_core_reconcile.py` (outside this repo) | 78–87 | `COMPOSITE_RELATIONS` entry `mrie-unified-synthesis` naming S1 and S2 | **Delete the entry.** Otherwise exact-stem pairing claims the ORMD first, and the composite loop (L226–240) still appends a second record with an empty `semantic_substrate` for the same ORMD, because it skips only when *both* lists are empty |
| `E2Core/CHANGELOG.md` | new top row | — | Add a row (draft in (d)) |
| `E2Core/notes.md` | 157–159 | "8. **Merge `Cognitive Signature Capture - An Unnamed Threat` with MRIE.**" | Optional: add `   - Status: complete 2026-09-29 (see CHANGELOG).`, matching the "Status: complete in Pass 3B" style used for items 6–7 |

Regenerate; do not hand-edit:

- `CORE_INDEX.md`, `CORE_REGISTRY.md`, `CORE_SUMMARY.md`, `core_*.json`, `E2_FRAMEWORK_ACRONYMS.md`, `e2_framework_acronyms.json` (via `phase1_core_reconcile.py`, then `tools/normalize_generated_paths.py`);
- `E2Core/ORMD_HUMAN_REVIEW_QUEUE.md` (L14 lists CSC; regenerate with `node scripts/write-review-queue.mjs` from `reader-site`);
- `llms.txt`, `docs/**`, `reader-site/public/**` (reader sync).

No change needed:

- The conceptual "MRIE" mentions (no filename links) in `Semantic Substrate/CCS.md`, `Collective Cognitive Substrate.md`, `CRS.md`, `The Collective Relational Substrate.md`, and their ORMDs; `Emergence_Determination_Foreclosure` (.md L88–90, .ormd L110–112).
- Historical plans (`E2Core Consolidation Plan.ormd`, `E2Core Consolidation Plan - 2026-09-29.md`, `9.29.26 Consolidation Pass.md`), staged work, and archives.
- `Synthesized Core/MRIE_synthesized.ormd`: parents are `urn:cb:` names, not paths, so nothing breaks.

### (d) Lineage frontmatter additions and changelog row

- **ORMD:** Edits 1–2 in (a-2) add the CSC archive parent, the 2026-09-29 transform, and the keywords.
- **Human `.md`:** no frontmatter (Semantic Substrate convention); lineage is carried in the "Source lineage" block of (a-1).
- **Archived files:** unchanged, no frontmatter edits.
- **Draft CHANGELOG row:**

```markdown
| 2026-09-29 | Folded *Cognitive Signature Capture: An Unnamed Threat* into MRIE as its originating threat statement, keeping its adversarial capability list, emergent-consent argument, named gaps, and "Cognitive Identity Capture" framing verbatim and distinct from MRIE's structural and TC/EO consent arguments. Added the missing exact-stem human counterpart for the June MRIE merge and archived the two human MRIE predecessors and the CSC pair; updated navigation. | `Semantic Substrate/MRIE - Unified Synthesis.md` paired with `Context Layer/MRIE - Unified Synthesis.ormd` | Four originals under `../archive/20260929_mrie_csc/{Semantic Substrate,Context Layer}/`; June ORMD parents remain in `../archive/20260612_step_1_2_merges/Context Layer/`; `../staged work/20260929/consolidation/MRIE and CSC - Reconciliation Review.md` records retention and open questions. |
```

### (e) Blockers and open questions

**Blockers (must be done in the same change set as the archive):**

1. Remove the MRIE entry from `Phase 1/phase1_core_reconcile.py` `COMPOSITE_RELATIONS` (the file is outside this git repo). The parallel CCS/CRS package faces the same issue with the `collective-relational-substrate` entry.
2. Delete the `reader-site/graph-relations.yml` edge at L146–149.
3. Create (a-1) and apply (a-2) **before** moving any file. Reader sync throws if the MRIE record has no human source.
4. Run `python tools/normalize_generated_paths.py` and `python tools/validate_repository.py`. From `reader-site`, run the sync, `write-review-queue.mjs`, and `npm test`. The tests may encode document counts; I did not check them.

**Open questions (carry forward; none blocks the fold):**

1. **Visible title.** Should the node become "Meta-Relational Identity Exposure (MRIE)", with CSC as an alias? Defer to the title pass.
2. **Confidence.** Is 0.90 still appropriate once the hedged CSC statement is folded in? The index currently says 0.92. The recommendation keeps 0.90 and does not raise it.
3. **Pre-merge lineage URNs.** A1's pre-merge parents `urn:cb:original-insight-doc` and `urn:cb:rp-framework-discussion` are not in S3. `original-insight-doc` very likely refers to CSC, which is an inference. Should these URNs be recorded in S3 lineage?
4. **S3's pre-existing defects:** 14 undefined link targets, and the `|= R * C_eff <= R_max |` notation. Fix in a later ORMD-hygiene pass, or here?
5. **Claim strength.** How should the escalation between CSC and MRIE ("potentially" vs "already", "not speculative") be expressed in a future rewrite? It is preserved here, not resolved.
6. **AOMI tension.** Behavior-based detection vs identity-based detection, and private per-actor risk scores vs P6-symmetry. Should CSC's adversarial capabilities enter AOMI's threat model as an identity-reconstruction vector? Hand to the AOMI package.
7. **"Exposure" three ways:** MRIE harm, AOMI detectability, Exposure Protocol pedagogy. Also "Remnant Protocol" vs "Remnant Stewardship". Hand to the terminology pass (plan §3 D).
8. **Exposure Protocol consent.** Its recipient-state modeling has no consent or asymmetry clause. Note only.
9. **"TC/EO" → EOTC** inside quoted MRIE text. Defer to D1; do not rewrite during the fold.
10. **Synthesized Core.** `Synthesized Core/MRIE_synthesized.ormd` propagates the contradicted "MRIE Synthesis" gloss and the "Reconstruction Potential … metric" framing. Optional later refresh; no edit proposed now.
