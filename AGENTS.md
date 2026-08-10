# Agent Instructions

## Mission

Maintain and extend the E2 Core Framework without flattening provenance, silently promoting proposals, or confusing generated orientation material with source authority.

## Read first

1. Read `AGENT_INTEGRATION_PROCESS.md` before integration work.
2. Use `CORE_INDEX.md` and `CORE_REGISTRY.md` to orient, then open the underlying source and Context Layer documents before making claims or edits.
3. Search the full repository boundary when checking terms, collisions, lineage, or prior versions.

## Authority and status

- `staged work/` is an inbox for candidates and reviews. Its contents are not canonical by location alone.
- Prefer active source and `E2Core/Context Layer/` documents for framework claims.
- `Synthesized Core/` records synthesis and provenance; do not use a synthesis as a substitute for its available sources.
- `CORE_INDEX.md`, `CORE_REGISTRY.md`, `CORE_SUMMARY.md`, their JSON counterparts, and `E2_FRAMEWORK_ACRONYMS.md` are generated review surfaces. Do not edit them by hand.
- `archive/` preserves history. Do not delete, rewrite, or promote archived material without explicit user direction.

## Safe editing rules

- Make the smallest coherent change that satisfies the request.
- Never silently promote a draft into active source or Context Layer documents.
- Do not rename, move, merge, archive, or delete documents unless the task explicitly authorizes that structural change.
- Preserve user-authored language when it is load-bearing.
- Keep mechanism, metaphor, metric, formalism, and empirical claim distinct.
- Preserve uncertainty, contradictions, open questions, confidence, and provenance rather than resolving them implicitly.
- Do not mass-format the corpus.

## ORMD rules

Files in `E2Core/Context Layer/` use Open Relational Markdown.

- Keep `<!-- ormd:1.0 -->` as the first line.
- Keep the YAML frontmatter immediately after the ORMD marker.
- Preserve `title`, `frame`, `lineage`, `policy`, `semantics`, and `resolution` metadata unless the task specifically changes them.
- Preserve explicit heading IDs such as `{#core-recognition}` and check inbound references before changing any ID.
- Treat a rich-text/WYSIWYG round trip as unsafe until it has been tested on a disposable branch and reviewed as a diff.

## Integration workflow

Unless the user directs otherwise:

1. Identify the candidate's load-bearing claim and provisional type.
2. Search Semantic Substrate, Context Layer, Synthesized Core, staged work, and relevant archive lineage.
3. Produce or update a contained integration review in `staged work/`.
4. State the recommended status and placement explicitly.
5. Stop before promotion if accepting the candidate requires user judgment.

## Validation and handoff

Run:

```powershell
python tools/normalize_generated_paths.py
python tools/validate_repository.py
```

In the handoff, list changed files, validation results, any authority decision made, and any remaining open questions. Do not commit, push, or create a pull request unless the user requests publication.
