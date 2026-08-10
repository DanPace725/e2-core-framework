# E2Core Cleanup Notes

Working notes reorganized from the alphabetical folder pass. Similar operations are grouped so the work can be done in chunked passes instead of one document at a time.

## Operating Rules

- Archive superseded source documents with lineage before removing them from the active Context Layer.
- When merging, create or update the successor document with all source documents listed in `lineage.parents`.
- Keep naming changes separate from conceptual merges where possible.
- Update the Context Layer Index after each pass, or at least after each chunk.

## AI Handoff Snapshot

Updated 2026-06-12 after Pass 3B/3C.

### Current State

- Active source of truth: `E2Core/Context Layer`.
- Semantic mirrors: `E2Core/Semantic Substrate`; mirrors were regenerated for documents touched in Pass 3A and Pass 3B/3C.
- Current active Context Layer count: 77 `.ormd` documents, excluding `Context Layer Index.ormd`.
- `Context Layer Index.ormd` has been updated after the completed cleanup passes.

### Preserve / Defer

- Do not edit `Context Layer/Relational Derivation Chain .ormd`. The user manually changed this after Pass 2 and explicitly asked that it be preserved.
- Leave `Family as a Relational Field.ormd` alone. It is an implementation/demonstration view of Family through the framework lens, not a source of new core ideas.
- Cluster J promotion/reclassification remains delayed until after the rest of this notes document is complete, per DP's note. The specific sign-mediated merge from Pass 3B is complete, but the broader Cluster J pass is still deferred.

### Completed Work

- Step 1.2/1.3 consolidation was completed before this notes cleanup. Archived sources are under `archive/20260612_step_1_2_merges`.
- Step 2.1 explicit dialogue-file tracking/consolidation was completed before this notes cleanup. Archived sources and `STEP_2_1_TRACKING.md` are under `archive/20260612_step_2_1_dialogues`.
- Step 2.3 outlier consolidation is complete. Archived sources are under `archive/20260612_step_2_3_outliers`; `Family as a Relational Field.ormd` was intentionally left active and untouched.
- Pass 1 is complete except for the deferred Cluster J promotion: `Justice Across Scales` was promoted to Context Layer, REMA was recovered as a distinct node, and `Relational Consciousness Framework` was merged into REMA.
- Pass 2 naming/title normalization is complete except for the Tensional Intelligence rename, which is intentionally deferred until the Tension/Tensional Intelligence merge.
- Pass 3A is complete: Entry Point/Primer, Axioms, and Relational Primitives were consolidated with matching Semantic Substrate mirrors regenerated.
- Pass 3B/3C is complete: GCO/GCO Logic, Metabolic Meaning/MMPS, Sign-Mediated Accountability/Flow Routing, and EOTC/Glossary were consolidated with matching Semantic Substrate mirrors regenerated.

### Archive Map

- `archive/20260612_step_1_2_merges`
- `archive/20260612_step_2_1_dialogues`
- `archive/20260612_step_2_3_outliers`
- `archive/20260612_pass_1_promotion_recovery`
- `archive/20260612_pass_3a_core_ontology`
- `archive/20260612_pass_3b_3c_mechanism_ethics`

### Next Likely Work

- Continue with Pass 3D, but do not redo the REMA/RCF merge; that part was already completed in Pass 1.
- Then continue with Pass 3E: merge Tension/Tensional Intelligence, rename the successor to `Tensional Intelligence (TI)`, and consolidate the Resonance family.
- Then run Pass 4 removals and Pass 5 final index/lineage/verification.

## Pass 1: Promotion, Recovery, and Missing Canonical Nodes

These tasks add or recover active canonical documents before broader merges depend on them.

1. **Update/promote Cluster J.** (Delayed until after everything else in this document is done -DP)
   - Status: deferred for Pass 1 per delay note.
   - Review the current Cluster J contents and decide which provisional/workbench materials should remain in Cluster J, move into another cluster, or be archived.

2. **Add Justice Across Scales to the Context Layer.**
   - Status: complete in Pass 1.
   - Source exists as an `.md` document in the Semantic Substrate.
   - Convert it to `.ormd`.
   - Add it to the Context Layer.
   - Add an index entry with appropriate cluster, frame, confidence, and lineage.

3. **Recover REMA as a distinct node document.**
   - Status: complete in Pass 1.
   - REMA and REMF should remain separate.
   - REMF is the grammar for how various parts of the framework work together.
   - REMA needs to be restored as its own conceptual node before related merges happen.

4. **After REMA recovery, merge Relational Consciousness Framework into REMA.**
   - Status: complete in Pass 1.
   - Treat this as a synthesis into the recovered REMA node.
   - Archive `Relational Consciousness Framework.ormd`.
   - Add RCF as a parent of the recovered/synthesized REMA document.

## Pass 2: Naming and Title Normalization

These are primarily naming/readability fixes. Do them as a low-risk pass before or after merges, but keep them distinct in the change log.

1. **Rename `E2 -> RCP -> MPDC -> AFD ->` to a derivation-oriented title.**
   - Status: complete in Pass 2.
   - Suggested direction: `Relational Derivation Chain - E2 to RCP, MPDC, and AFD`.
   - Preserve the current document as the active content unless a separate content edit is needed.

2. **Rename `Power Through the E2 Lens` to `Power as Relational Field Coherence`.**
   - Status: complete in Pass 2.
   - The active consolidated document already points conceptually in that direction.
   - Update filename, title, and index references together.

3. **Rename `Temporal Compression and Ethical Occlusion Framework` to `Ethical Occlusion via Temporal Compression (EOTC)`.**
   - Status: complete in Pass 2.
   - Update filename, title, frame/keywords if needed, and index references.

4. **Rename the merged Tensional Intelligence successor to `Tensional Intelligence (TI)`.**
   - Status: deferred until the Pass 3 Tension/Tensional Intelligence merge.
   - Do this after the Tension/Tensional Intelligence merge in Pass 3.

5. **Rename `Universal Emergence Pattern E2 Integration and Ext` to `Universal Emergence Pattern`.**
   - Status: complete in Pass 2.
   - Flag the document as needing update/review.
   - Update filename, title, and index references.

## Pass 3: Merge and Consolidation Batches

These are substantive merges. Each merge should produce one active successor and archive the superseded source documents with lineage.

### 3A. Core Ontology and Axioms

1. **Merge `E^2 Entry Point` and `E^2 Primer`.**
   - Status: complete in Pass 3A.
   - Archive both sources after creating the successor.
   - Successor should become the clean reader-facing entry point.

2. **Merge and condense all Axioms into one document.**
   - Status: complete in Pass 3A.
   - Archive `Initial Axioms.ormd` and any other superseded axiom source documents.
   - Successor should be the canonical axioms document.

3. **Merge the two Relational Primitives documents.**
   - Status: complete in Pass 3A.
   - Keep one active document named `Relational Primitives`.
   - Archive the superseded primitive document(s).
   - Preserve any V3 improvements that remain canonical.

### 3B. Formal / Mechanism Documents

4. **Merge `GCO Logic` and `GCO`.**
   - Status: complete in Pass 3B.
   - Archive `GCO Logic.ormd`.
   - Keep the active successor under the canonical GCO title.

5. **Merge `Metabolic Meaning` with `MMPS`.**
   - Status: complete in Pass 3B.
   - Archive `Metabolic Meaning.ormd`.
   - Preserve MMPS as the canonical meaning/metabolism process document unless review suggests otherwise.

6. **Merge `Sign-Mediated Accountability` and `Flow Routing`.**
   - Status: complete in Pass 3B.
   - Create a unified document for sign-mediated accounting/accountability and flow routing.
   - Archive `Sign-Mediated Accountability.ormd`.

### 3C. Ethical / Temporal Compression Documents

7. **Merge `Ethical Occlusion via Temporal Compression (EOTC)` framework and Glossary.**
   - Status: complete in Pass 3C.
   - Do this after the EOTC rename in Pass 2.
   - Archive the Glossary after merging.
   - Keep glossary content as definitions or an appendix inside the EOTC successor.

### 3D. Identity, Exposure, and Consciousness Documents

8. **Merge `Cognitive Signature Capture - An Unnamed Threat` with MRIE.**
   - Archive `Cognitive Signature Capture - An Unnamed Threat.ormd`.
   - Preserve the threat-specific material as a section or warning layer in MRIE.

9. **Wrap `AOMI AI responses.ormd` into AOMI.**
   - Archive `AOMI AI responses.ormd`.
   - Keep raw response material as lineage, not active doctrine.

10. **Merge Relational Consciousness Framework with recovered REMA.**
   - Status: complete in Pass 1.
   - Listed here only as a dependency reminder; do not repeat unless reviewing the synthesis.

### 3E. Tension / Resonance Family

11. **Merge `Tension` and `Tensional Intelligence`.**
   - Archive `Tension.ormd`.
   - Rename the successor to `Tensional Intelligence (TI)`.

12. **Synthesize and consolidate all Resonant documents into one document.**
   - Archive the superseded Resonant/Resonance source documents.
   - Preserve historical distinctions in lineage or a short development-history section.

## Pass 4: Removals from Active Core

These are not conceptual deletions from history. They should leave the active core while preserving/removing according to the appropriate archive/intake policy.

1. **Remove `layer_2_draft_rvp_and_vme_developments` from the core.**
   - This belongs to the external `relational reserves` project.
   - It is not necessary for the E2Core canon.
   - Move to archive or external-project holding area, depending on existing convention.

2. **Remove RPE from the core.**
   - Decide whether RPE belongs in an implementation/engineering layer, archive, or external tooling area.
   - Remove it from active core index membership once relocated.

## Pass 5: Index, Flags, and Verification

Run after each chunk, and again at the end.

1. **Update the Context Layer Index.**
   - Reflect all renamed files.
   - Reflect all merged successor documents.
   - Remove archived documents from active cluster tables.
   - Add Justice Across Scales.
   - Update Cluster J after promotion/reclassification.

2. **Backfill lineage.**
   - Confirm every merged successor lists all archived sources in `lineage.parents`.
   - Confirm archive paths are correct and reversible.

3. **Flag documents needing later content update.**
   - `Universal Emergence Pattern` should be explicitly flagged as needing update/review after rename.

4. **Verify active folder hygiene.**
   - No duplicate canonical documents with the same role.
   - No external-project drafts left in active core.
   - No orphan index entries pointing to archived or renamed files.
   - No active document removed without a lineage/archive decision.

## Suggested Chunk Order

1. Promotion/recovery: Justice Across Scales and REMA recovery; Cluster J remains delayed until the rest of this document is done.
2. Pure naming pass: derivation chain, Power, EOTC, Universal Emergence Pattern.
3. Low-risk merges: AOMI responses, GCO, Metabolic Meaning/MMPS, EOTC Glossary.
4. Core conceptual merges: Entry Point/Primer, Axioms, Relational Primitives.
5. Field-family merges: MRIE threat material, REMA/RCF, Tension/TI, Resonance synthesis.
6. Remove or relocate external/non-core materials: relational reserves draft, RPE.
7. Final index/lineage/verification sweep.
