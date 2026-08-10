#!/usr/bin/env python3
"""Replace machine-local Core Framework roots in generated reports."""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ACTIVE_ROOT = ROOT / "E2Core"
LEGACY_PHASE1_ROOT = ROOT.parent
LEGACY_ACRONYM_DICTIONARY = LEGACY_PHASE1_ROOT / "Acronym Dictionary.md"

GENERATED_REPORTS = (
    "CORE_INDEX.md",
    "CORE_REGISTRY.md",
    "CORE_SUMMARY.md",
    "E2_FRAMEWORK_ACRONYMS.md",
    "core_manifest.json",
    "core_registry.json",
    "core_summary.json",
    "e2_framework_acronyms.json",
)


def variants(path: Path) -> set[str]:
    windows = str(path)
    return {
        windows,
        windows.replace("\\", "\\\\"),
        path.as_posix(),
    }


def main() -> int:
    replacements: list[tuple[str, str]] = []
    replacements.extend((value, "E2Core") for value in variants(ACTIVE_ROOT))
    replacements.extend((value, ".") for value in variants(ROOT))
    replacements.extend(
        (value, "legacy://phase1/Acronym Dictionary.md")
        for value in variants(LEGACY_ACRONYM_DICTIONARY)
    )
    replacements.extend((value, "legacy://phase1") for value in variants(LEGACY_PHASE1_ROOT))
    replacements.sort(key=lambda item: len(item[0]), reverse=True)

    changed = 0
    for name in GENERATED_REPORTS:
        path = ROOT / name
        if not path.is_file():
            continue
        original = path.read_text(encoding="utf-8-sig", errors="strict")
        normalized = original
        for source, destination in replacements:
            normalized = normalized.replace(source, destination)
        if normalized != original:
            path.write_text(normalized, encoding="utf-8", newline="\n")
            changed += 1

    print(f"Normalized machine-local paths in {changed} generated report(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
