# E2 Core Framework repository instructions

- Read the root `AGENTS.md` and `AGENT_INTEGRATION_PROCESS.md` before editing framework content.
- Treat `staged work/` as non-canonical candidate material.
- Use generated indexes for orientation only; verify claims in active source and Context Layer documents.
- Do not edit generated reports by hand.
- Do not silently promote, rename, archive, merge, or delete framework documents.
- Preserve ORMD markers, CLP frontmatter, lineage, policy, resolution metadata, and explicit heading IDs.
- Keep changes narrowly scoped and preserve visible uncertainty and contradictory evidence.
- After regenerating root reports, run `python tools/normalize_generated_paths.py`.
- Run `python tools/validate_repository.py` before handing off a change.
