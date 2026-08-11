#!/usr/bin/env python3
"""Audit or repair reversible UTF-8 mojibake in active Core source files."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from encoding_health import find_mojibake_sequences, repair_mojibake


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIRS = (
    ROOT / "E2Core" / "Semantic Substrate",
    ROOT / "E2Core" / "Context Layer",
    ROOT / "Synthesized Core",
)
UTF8_BOM = b"\xef\xbb\xbf"


def active_documents() -> list[Path]:
    return sorted(
        (
            path
            for folder in SOURCE_DIRS
            for path in folder.iterdir()
            if path.is_file() and path.suffix.lower() in {".md", ".ormd"}
        ),
        key=lambda path: path.as_posix().casefold(),
    )


def escaped(value: str) -> str:
    return value.encode("unicode_escape").decode("ascii")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--write",
        action="store_true",
        help="Write conservative repairs to active source files. Without this flag, audit only.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    affected = 0
    replacements = 0

    for path in active_documents():
        raw = path.read_bytes()
        had_bom = raw.startswith(UTF8_BOM)
        text = raw.decode("utf-8-sig")
        repaired, count = repair_mojibake(text)
        remaining = find_mojibake_sequences(repaired)
        if count == 0 and not remaining:
            continue

        affected += 1
        replacements += count
        label = path.relative_to(ROOT).as_posix()
        if args.write and count:
            encoded = repaired.encode("utf-8")
            path.write_bytes((UTF8_BOM if had_bom else b"") + encoded)
            print(f"Repaired {label}: {count} sequence(s)")
        else:
            sample = find_mojibake_sequences(text)[:3]
            examples = ", ".join(f"{escaped(source)} -> {escaped(target)}" for _, source, target in sample)
            print(f"Found {label}: {count} repairable sequence(s); {examples}")

        if remaining:
            examples = ", ".join(escaped(source) for _, source, _ in remaining[:3])
            print(f"Unresolved {label}: {len(remaining)} sequence(s); {examples}")

    action = "Repaired" if args.write else "Found"
    print(f"{action} {replacements} reversible sequence(s) across {affected} active source file(s).")
    return 0 if args.write or affected == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
