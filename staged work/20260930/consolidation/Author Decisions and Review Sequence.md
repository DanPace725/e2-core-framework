# Author decisions and review sequence — 2026-09-30

These decisions supersede the corresponding proposed dispositions in the 2026-09-29 consolidation plan. Active claims still depend on the source documents and their stated limits.

| Package | Author decision | Current disposition |
| --- | --- | --- |
| OSI | Keep the OSI model substantially intact. | Active pair retained; no fold into Relational Primitives or Communication. The older Relational Capacity Scale and RNT stay within OSI with their existing evidential limits. |
| RP translations | Keep translations distinct from the canonical primitives; merge and limit their scope. | CT and lambda attempts combined in `Relational Primitive Translations.ormd`; originals and prior synthesized proof claim archived. `Derivation deep dive` remains a separate exploratory survey. |
| Resonance family | Merge. | April 17/24/26 works combined in `Resonance and Relational Translation.ormd`; originals and prior synthesis archived. |
| Intelligence Field; Relational Perfection; Cyclical Integrity | Keep separate. | Each active work stays in its own role; no merger or archive inferred from thematic overlap. |
| EST | Leave out for now. | The 18-file staged family and conceptual reference remain staged. No new EST theory, notation, or protocol was promoted in this pass; existing active historical references were not retroactively removed. |
| Human Markdown / ORMD | Make ORMD the source of truth for paired documents and downstream content. Preserve the original Care, Attention, and Coherence manifesto register as historical text; the other human-only differences do not require active incorporation. | 79 active paired human files and the human master index project ORMD. The original NexEs Manifesto v2.0 wording is included in the active manifesto ORMD as a marked developmental register. Other previous human originals and two unpaired Markdown sources remain archived with hashes. The pre-projection differences register is retained as provenance, not an open promotion queue. |

The author has resolved the human-only difference review: only the original manifesto register enters active ORMD, as developmental history. `ORMD_PROJECTION_DIFFERENCES.md` and `archive/20260930_semantic_pre_ormd/manifest.json` remain provenance records. Future work can resume the visible-title and terminology pass; filename, anchor, link, and slug migration still needs its own reference audit.

The ORMD-led reader exposed inherited local-anchor defects in 20 ORMD sources: 628 link occurrences pointing to 491 distinct missing fragments. The reader now leaves those labels visible without making them dead links; it does not rewrite the ORMD sources. `reader-site/ORMD_LOCAL_ANCHOR_REVIEW.json` records each source slug, fragment, and occurrence count for a later targeted link pass. The largest groups are CRS, Derivation Deep Dive, CCS, Justice Across Scales Practical Applications, and OSI.

Pair equality here means exact output of `projectOrmdToHuman(ORMD)`, including removal of relationship-link titles and trailing whitespace. The generated registry's older `body_equivalent_after_frontmatter` field compares more literal body text and can still read false for a projected pair. The reader test now checks the projection equality directly for every active one-to-one pair and the master index.
