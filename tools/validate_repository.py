#!/usr/bin/env python3
"""Validate repository scaffolding and loss-sensitive document envelopes."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTEXT_DIR = ROOT / "E2Core" / "Context Layer"
MOBILE_DRAFTS_DIR = ROOT / "staged work" / "mobile drafts"

REQUIRED_FILES = (
    ROOT / ".pages.yml",
    ROOT / "AGENTS.md",
    ROOT / "AGENT_INTEGRATION_PROCESS.md",
    ROOT / "README.md",
    ROOT / ".github" / "copilot-instructions.md",
)

REQUIRED_ORMD_KEYS = (
    "title",
    "frame",
    "lineage",
    "policy",
    "semantics",
    "resolution",
)

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


def add_error(errors: list[str], path: Path, message: str) -> None:
    try:
        label = path.relative_to(ROOT).as_posix()
    except ValueError:
        label = str(path)
    errors.append(f"{label}: {message}")


def frontmatter_bounds(lines: list[str], start: int) -> tuple[int, int] | None:
    if len(lines) <= start or lines[start].strip() != "---":
        return None
    for index in range(start + 1, len(lines)):
        if lines[index].strip() == "---":
            return start, index
    return None


def validate_ormd(path: Path, errors: list[str]) -> None:
    # utf-8-sig accepts both ordinary UTF-8 and the BOM-bearing files already
    # present in the corpus without rewriting either representation.
    text = path.read_text(encoding="utf-8-sig", errors="strict")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "<!-- ormd:1.0 -->":
        add_error(errors, path, "first line must be '<!-- ormd:1.0 -->'")
        return

    bounds = frontmatter_bounds(lines, 1)
    if bounds is None:
        add_error(errors, path, "missing YAML frontmatter immediately after the ORMD marker")
        return

    _, end = bounds
    metadata = "\n".join(lines[2:end])
    for key in REQUIRED_ORMD_KEYS:
        if re.search(rf"(?m)^{re.escape(key)}\s*:", metadata) is None:
            add_error(errors, path, f"missing required frontmatter key '{key}'")

    if not any(line.startswith("# ") for line in lines[end + 1 :]):
        add_error(errors, path, "missing level-one document heading after frontmatter")


def validate_mobile_draft(path: Path, errors: list[str]) -> None:
    text = path.read_text(encoding="utf-8-sig", errors="strict")
    lines = text.splitlines()
    bounds = frontmatter_bounds(lines, 0)
    if bounds is None:
        add_error(errors, path, "mobile draft must start with YAML frontmatter")
        return

    _, end = bounds
    metadata = "\n".join(lines[1:end])
    for key in ("title", "status"):
        if re.search(rf"(?m)^{key}\s*:\s*\S", metadata) is None:
            add_error(errors, path, f"missing non-empty frontmatter key '{key}'")


def validate_tracked_paths(errors: list[str]) -> None:
    if not (ROOT / ".git").exists():
        return
    result = subprocess.run(
        ["git", "ls-files", "-z"],
        cwd=ROOT,
        check=False,
        capture_output=True,
    )
    if result.returncode != 0:
        add_error(errors, ROOT / ".git", "could not inspect tracked paths")
        return

    tracked = result.stdout.decode("utf-8", errors="replace").split("\0")
    for item in tracked:
        normalized = item.replace("\\", "/")
        if "/node_modules/" in f"/{normalized}/":
            add_error(errors, ROOT / item, "node_modules content must not be tracked")
        if normalized in {
            "E2Core/.obsidian/workspace.json",
            "E2Core/.obsidian/workspace-mobile.json",
        }:
            add_error(errors, ROOT / item, "local Obsidian workspace state must not be tracked")


def validate_generated_paths(errors: list[str]) -> None:
    local_markers = ("C:\\Users\\", "C:\\\\Users\\\\")
    for name in GENERATED_REPORTS:
        path = ROOT / name
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8-sig", errors="strict")
        if any(marker in text for marker in local_markers):
            add_error(
                errors,
                path,
                "contains a machine-local Windows path; run tools/normalize_generated_paths.py",
            )


def main() -> int:
    errors: list[str] = []

    for path in REQUIRED_FILES:
        if not path.is_file():
            add_error(errors, path, "required repository file is missing")

    if not CONTEXT_DIR.is_dir():
        add_error(errors, CONTEXT_DIR, "active Context Layer directory is missing")
    else:
        ormd_files = sorted(CONTEXT_DIR.glob("*.ormd"))
        if not ormd_files:
            add_error(errors, CONTEXT_DIR, "no active ORMD documents found")
        for path in ormd_files:
            try:
                validate_ormd(path, errors)
            except UnicodeDecodeError:
                add_error(errors, path, "file is not valid UTF-8")

    if MOBILE_DRAFTS_DIR.is_dir():
        for path in sorted(MOBILE_DRAFTS_DIR.glob("*.md")):
            if path.name.casefold() == "readme.md":
                continue
            try:
                validate_mobile_draft(path, errors)
            except UnicodeDecodeError:
                add_error(errors, path, "file is not valid UTF-8")

    validate_generated_paths(errors)
    validate_tracked_paths(errors)

    if errors:
        print(f"Repository validation failed with {len(errors)} error(s):")
        for error in errors:
            print(f"- {error}")
        return 1

    count = len(list(CONTEXT_DIR.glob("*.ormd")))
    print(f"Repository validation passed: {count} active ORMD documents checked.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
