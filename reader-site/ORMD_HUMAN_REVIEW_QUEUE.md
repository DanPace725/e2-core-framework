# Human Markdown / ORMD review queue

**0 pairs pending review** out of 79 one-to-one source pairs. The other 79 pairs are listed in [the reviewed ORMD set](scripts/ormd-primary.json).

All active one-to-one human documents now project their ORMD counterparts. Previous human originals and the pre-projection differences register are preserved for author review under `archive/20260930_semantic_pre_ormd/` and `staged work/20260930/consolidation/`.

Regenerate this queue with `node scripts/write-review-queue.mjs` from `reader-site`. The queue is derived from `core_registry.json` and `scripts/ormd-primary.json`; the reviewed-set manifest, rather than this generated list, controls publication behavior.
