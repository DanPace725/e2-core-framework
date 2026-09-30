# RP Translations - Consolidation Review

**Status:** staged review only; no active source, archive, or generated surface changed.
**Execution update (2026-09-30):** the author approved this merge. `E2Core/Context Layer/Relational Primitive Translations.ormd` is now the scoped active successor, and its Semantic Markdown is an ORMD projection. The CT and lambda predecessor pairs and prior formal-translations synthesis are under `archive/20260930_rp_translations/`. The review's proposed-state language below records the basis for that action.
**Decision applied:** keep the six Relational Primitives canonical and distinct; retain their formal translations in one scoped translation artifact.
**Working destination:** a new ORMD source titled **Relational Primitive Translations**, placed in `E2Core/Context Layer/`, with one paired reader-facing Markdown file in `E2Core/Semantic Substrate/` only if the project continues requiring pairs. The ORMD is authoritative for downstream content.

## Source inventory and merge scope

| Active source | Exact path | Translation-specific material to retain | Limits to carry into successor |
| --- | --- | --- | --- |
| Category-theory translation | `E2Core/Context Layer/CT translation of RPs.ormd`; `E2Core/Semantic Substrate/CT translation of RPs.md` | The six-row analogue table; optional illustrations involving objects/morphisms, monoidal products, isomorphisms/limits, Kleisli categories, functors/adjunctions; explicit reminder that these are candidate encodings of the six primitives. | Keep each mapping domain-dependent and optional. Do not claim one-to-one correspondence, completeness, a structural proof, or suitability for mathematical physics without specified structures and evidence. The terminal-object equation as written is tautological for maps to a terminal object and does not establish no-signaling. Categorical objects/tensors/equalizers/monads do not automatically represent physical entities, composition, constraints, or measurement. |
| Lambda-calculus translation | `E2Core/Context Layer/RP Lambda Calc Translation.ormd`; `E2Core/Semantic Substrate/RP Lambda Calc Translation.md` | Preserve as a clearly marked historical example of an attempted encoding: `P = λx.x`, `C = λf.λx.f(fx)`, the Y combinator, the proposed level sequence, pipeline notation, and `E² = Y C P`, so future readers can inspect what was proposed. | State that these terms do not currently encode the asserted primitive stages, GCO, or physical fixed point. With the displayed definitions, `C(P)` reduces to `P`; thus the displayed iteration does not generate distinct levels. Y provides a fixed point in an untyped calculus, not convergence, physical stabilization, or ethical optimality. The nested lambdas do not apply the named processes. Do not retain “source code,” “most accurate language,” or equivalence claims as established results. |
| Derivation survey (context, not an RP translation) | `E2Core/Context Layer/Derivation deep dive.ormd`; `E2Core/Semantic Substrate/Derivation deep dive.md` | If the user intends the previous plan’s broad “derivation document,” retain a short, explicitly provisional context note: there are multiple partial categorical/physics formalisms and no standard “Category of All Stuff”; preserve selected CQM/TQFT/representation-category/stress-energy examples only as candidate analogies with their references and attribution. | Its Matter/Energy/Spacetime relation inventories and “20/~95%,” “practically exhaustive,” “complete,” and universal claims are not supported by a defined corpus, sampling/coding method, or denominator. Do not fold the lengthy inventory or conversational AI-generated taxonomy into a formal translation as fact. It is reasonable to archive this survey independently after successor links are set; it is not necessary to merge it to satisfy “RP translations remain distinct from RPs.” |

The two translation works are substantively different and should remain separate sections, not be blended into one mathematical formalism. Give each section its own assumptions and status. The successor should say plainly that translations are interpretive/modeling proposals and do not define or prove the six primitives.

## Canonical source to retain unchanged

- `E2Core/Context Layer/Relational Primitives.ormd` remains the canonical six-category grammar.
- `E2Core/Semantic Substrate/Relational Primitives.md` remains its human counterpart until the broader pair-reconciliation pass decides archive/match treatment.
- Keep the current six-category definitions and scoped categorical analogue table in the canonical RP pair; replace its direct links to the two old translation filenames with one link to the successor only when the successor is actually created. The translation successor must not be folded into the RPs source.

## Proposed successor and lineage

Proposed ORMD: `E2Core/Context Layer/Relational Primitive Translations.ormd`.
Proposed human pair, if retained under the current publishing convention: `E2Core/Semantic Substrate/Relational Primitive Translations.md`.

Suggested sections: (1) purpose and scope; (2) categorical analogies, by primitive; (3) lambda-calculus attempt and explicit reduction/status; (4) optional physics/category-theory context, only if wanted; (5) assumptions, nonclaims, and source lineage. ORMD should preserve the required metadata and use a new stable identifier. Record the two translation pairs as source parents with a `consolidates_as_translation` or equivalent relation; include Derivation Deep Dive only if its selected survey context is retained. Do not inherit the current synthesis’s `formal_proof`, `confidence: 1.0`, or completeness framing.

## Proposed archive set after successor and links exist

Archive as source/history pairs:

- `E2Core/Context Layer/CT translation of RPs.ormd`
- `E2Core/Semantic Substrate/CT translation of RPs.md`
- `E2Core/Context Layer/RP Lambda Calc Translation.ormd`
- `E2Core/Semantic Substrate/RP Lambda Calc Translation.md`

Keep the active Relational Primitives pair. Treat Derivation Deep Dive separately: archive both `E2Core/Context Layer/Derivation deep dive.ormd` and `E2Core/Semantic Substrate/Derivation deep dive.md` only if its useful context has been either selectively retained in the translation successor or explicitly left as historical material. Do not assume it is part of the translation merge.

The existing `Synthesized Core/RP_Formal_Translations_synthesized.ormd` is an unpublished/generated-style derivative with unsupported proof and confidence claims. Do not promote it or use it as the successor. Archive/retire it only under the project’s separate Synthesized Core cleanup decision; preserve its history and record the disposition.

## Link and publication impacts

Before moving the four translation files, update authored references:

- `E2Core/Context Layer/Relational Primitives.ormd` and `E2Core/Semantic Substrate/Relational Primitives.md`, sections `Categorical Semantics` and `Canonical Pointers`, currently point at old filenames.
- `E2Core/Synthesized Core/Relational_Primitives_synthesized.ormd` currently names both old translations in its graph text; update only if this derivative remains in use, otherwise record it as stale/history.
- `E2Core/Synthesized Core/RP_Formal_Translations_synthesized.ormd` has source parents `urn:cb:CT translation of RPs.ormd` and `urn:cb:RP Lambda Calc Translation.ormd`; its lineage/disposition must be reconciled if the sources are archived.
- `staged work/20260910-conceptual-development/conceptual-development.md` and `sources.md` contain direct references to the CT Markdown source. Preserve their historical provenance; annotate/update to the successor only if these staged materials are still being used.
- `E2Core/Context Layer/Context Layer Index.ormd` and generated `E2Core/context layer index.md` have titles, entries, and navigation for the three works. Regenerate through the repository workflow after decisions; never edit generated rows by hand.
- Reader publication state is currently pending for these pairs per `staged work/20260929/consolidation/00 Comparison Ledger.md`. Archive/remap the publication inputs through the canonical ORMD publication workflow; do not patch `reader-site/public`, `dist`, or packaged outputs directly.

Lineage identifiers needing resolution before archival: CT source parent `urn:cb:relational-ontology-paper` is likely, but not proven identical to, the active Semantic Substrate `Relational Ontology Derived from First Principles.md` (its ORMD twin is archived). Lambda source parent `urn:cb:relational-physics-core` is unresolved. Preserve those as historical source identifiers or document their mapping; do not silently redirect either to the successor.

## Recommendation

Proceed with a staged ORMD translation candidate combining the CT and lambda sections while retaining them as distinct, explicitly limited approaches. Keep RPs separate and canonical. Carry Derivation Deep Dive as optional context with claims reduced to what its sources support; otherwise archive it separately as exploratory history. Archive the old translation pairs only after the successor, reference migration, lineage note, and reader/index regeneration are complete. This review authorizes none of those active-file or archive operations.
