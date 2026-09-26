# Outbound Release Process v0.2 - Review

Status: staged review of `Outbound Release Process v0.2.md`, 2026-09-25. This review does not integrate or authorize the candidate. The v0.1 draft and its integration review remain separate lineage.

## Working Read And Disposition

**Load-bearing claim:** outward release is a stewarded, traceable offer or receiver-shaped piece whose subsequent contact is recorded as events, with source status, receiver autonomy, credit, and evidence limits intact. The author decides eligibility and whether to offer; receivers determine what, if anything, they use or maintain. This is a provisional **practice specialization** of the active Exposure Protocol, constrained by Intervention Stewardship and Boundary Dynamics. GDD is marked as a legacy parent, not silently treated as active Core.

**Recommendation:** keep v0.2 staged. It is a much more coherent candidate for a bounded practice trial than v0.1. Before integration, complete one retrospective event backfill and one small Release Review using an actual artifact/version; reconcile the operational distinctions below; then run the inward integration process on the tested candidate. Naming and promotion remain Daniel's decisions.

## What The Revision Resolves

| v0.1 review concern | v0.2 treatment | Assessment |
| --- | --- | --- |
| `carried` / `promoted` collision | Defines `carried` first and reserves `promoted` for receiver maintenance without author effort; says promotion can remain open after a carried window closes. | Substantially resolved as a working distinction. Its duration and proof threshold remain open. |
| Whole-framework evidence overreach | Scopes uptake evidence to a piece and requires a registered, discriminating comparison for broader claims. Conceptual lineage and observed contact are independent fields. | Resolved in the main model; H3 still needs a design that controls for piece type and channel. |
| Promotion gate borrowed too broadly | Explicitly names the Intervention Stewardship gate as a limited parent and receiver maintenance as an extension by analogy. | Provenance is now clear. The new operational meaning needs a test case. |
| `ignored` and absence of signal | Replaces it with `no signal`, scoped to channel and observation window; event source and unknowns are fields. | Resolved as a record rule. |
| Incomplete workflow and excessive weight | Adds piece selection, retrospective backfill, offer/commission, templates, short form, and local registration format. | Much more usable, subject to the distinctions below. |
| Active versus legacy source status | Marks active Exposure, Intervention, Boundary, CRS, and EOTC sources; GDD is legacy and Prediction Registry is unlocated. | Good source discipline. The unlocated registry and GDD status remain explicit dependencies. |

The parent checks in the earlier integration review still apply: `E2Core/Semantic Substrate/Exposure Protocol.md` gives the Invitation → Structure → Integration → Demonstration transmission pattern; `E2Core/Semantic Substrate/Intervention Stewardship - Core Source.md` limits its healthier-basin promotion gate mainly to Solution and partly Transition modes. V0.2 does not claim these sources already contain its release record system.

## Remaining Operational Seams

1. **Separate entry point, relationship, and form.** `Commission` currently includes both a receiver request and an unprompted artifact built for a particular receiver. Those have different initiative and selection pressures. Keep `offer`/`commission` if useful, but record `initiated by receiver`, `initiated by author for a known receiver`, or `originated by collaborator` separately. Likewise `relational release` describes the channel and relationship around a piece, while `instrument`, `translation`, and `practice` describe what travels. Permit a relational instrument or relational translation instead of forcing one label. H1 and H2 otherwise partly restate the same classification.
2. **Make empirical generalizations provisional.** “Silence is the base rate” and the claim that receiver-specific work accounts for most observed adaptation may be reasonable working expectations, but the current readiness scan is a selected, recalled sample without a denominator or matched observation windows. Phrase these as priors to test, not established frequencies. The current H1 wording appropriately admits confounding; its supporting prose should match that caution.
3. **Keep `fielded` evidence narrow.** Years of author-operated use establish that a tool did work in an actual setting and expose maintenance costs. They do not by themselves show net benefit, transferability, or comparative usefulness. The definition's “strong evidence of usefulness” should specify usefulness to the author in that workflow, unless outcomes are separately recorded.
4. **Registration should preserve order, not require a Git commit everywhere.** A commit is a good receipt for a repository release. Essays, shared workbooks, private family tools, and conversations may have other durable timestamps. Define a frozen artifact/version plus an independently inspectable pre-release timestamp or immutable reference; distinguish those from retrospective reconstruction. The v0.2 template can retain commit as the preferred repository case.
5. **Do not let evidence rules erase ordinary sources.** “Do not import external work as authority” in step 10 is ambiguous. External research and primary records may be the correct authority for factual claims and prior art; they do not become *Core* authority merely by being cited. State that distinction explicitly.
6. **Agent and human decisions need a clear boundary.** The agent rule against assigning `retired` without confirmed events is appropriate. A model can propose a label with cited events, while the user confirms the event and final characterization. In particular, MindiAI's data export and paused maintenance do not by themselves establish every receiver's end date or exit quality.

## H4: A Chronology Test, Not A Date Sort

H4 asks whether some outward practices predate or run alongside the corpus's articulation of Exposure and Stewardship. This is plausible and worth a dedicated evidence pass. A repository's earliest surviving commit is a **lower bound on documented activity**, not the date the idea or practice began. A Core file's current modification time is not its first conceptual articulation. A timestamp comparison alone cannot prove that later text was caused by earlier practice, or that earlier practice was independent of E² ideas circulating informally.

For each candidate, keep separate clocks:

| Clock | What to date | Useful evidence |
| --- | --- | --- |
| Practice | First known receiver-specific building, use, adaptation, sharing, or retirement | Dated messages/reviews, user account with stated precision, work records where shareable |
| Artifact | Earliest inspectable project state and major versions | Git commits/tags, dated release or document, source creation record; note imported history |
| Concept | Earliest extant E² expression of the relevant Exposure/Stewardship pattern, whether named or not | Version history and dated source text; distinguish drafts, legacy Phase 1, and active Core |
| Canonical articulation | When the named active Core document or current formulation appeared | Dated commits and source status; never substitute this later date for concept origin |

Record dates as day, month, year, interval, or unknown, with a source and confidence. Compare a **specific practice** with a **specific concept**, not a whole project with a whole framework. Code or file dates can identify leads; the decisive comparison needs what the earlier artifact actually did and what the later source actually claimed. Candidate patterns in the current matrix include ANEx built for a brother, DocFlow's author-operated workplace use, ACE's family use, MindiAI's father use and exit, ORMD's developer feedback, and WDW's community follow-on. Their existence in the matrix is not a finding that they predate E².

A useful H4 result would be one of: `documented practice before extant articulation`, `documented overlap`, `practice after extant articulation`, or `order unresolved`. Even the first supports a **formalization chronology**, not sole origin or causal direction, unless independent evidence links the practice to the later source. H4 was formulated after these candidate examples were recalled and selected, so this first chronology is exploratory rather than a preregistered confirmation test. Mark user-reported dating as such and protect receiver privacy. This review's companion chronology appendices are evidence inventories, not an H4 verdict.

## Next Bounded Trial

Use one event-rich case and one thin case. MindiAI can test `fielded`/receiver use, maintenance burden, data export, and uncertain retirement; the Fast Fashion essay can test E² lineage, translation, dated dashboard response, and the difference between reception and `carried`. For each, freeze the exact artifact version, record only confirmed events and their provenance, and see whether the v0.2 templates can express unknowns without manufacturing an outcome. The essay's local revised DOCX must not be silently equated with the published version.

No Release Review, registration, publication, or Core promotion is performed by this review.
