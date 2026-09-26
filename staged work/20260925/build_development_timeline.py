"""Build a self-contained, evidence-labeled E² development timeline.

Read-only inputs: the 2026-09-10 corpus inventory, current corpus files, and the
2026-09-25 outbound project matrix/chronology. No source document is modified.
"""

from __future__ import annotations

from datetime import date
import json
import os
from pathlib import Path
import re
import subprocess


HERE = Path(__file__).resolve().parent
CORE = HERE.parents[1]
PHASE1 = CORE.parent
E2 = PHASE1.parent
CODING = E2.parent
INVENTORY_DIR = CORE / "staged work/20260910-conceptual-development"
MATRIX = HERE / "E2 Projects - Outbound Fit and Readiness.md"
TEMPLATE = HERE / "development-timeline-template.html"
OUTPUT = HERE / "e2-development-timeline.html"

MONTHS = {name.lower(): i for i, name in enumerate(
    "January February March April May June July August September October November December".split(), 1
)}
NUMERIC_DATE = re.compile(r"(?<!\d)(20\d{2})[-/](\d{1,2})[-/](\d{1,2})(?!\d)")
US_DATE = re.compile(r"(?<!\d)(\d{1,2})[/-](\d{1,2})[/-](20\d{2}|\d{2})(?!\d)")
MONTH_DATE = re.compile(
    r"\b(" + "|".join(MONTHS) + r")\s+(\d{1,2})(?:st|nd|rd|th)?[,]?\s+(20\d{2})\b",
    re.I,
)
DATE_FOLDER = re.compile(r"^(20\d{2})(\d{2})(\d{2})(?:\b|[-_])")


def valid_day(y: int, m: int, d: int) -> str | None:
    try:
        return date(y, m, d).isoformat()
    except ValueError:
        return None


def parse_date(text: str) -> str | None:
    for regex, order in ((NUMERIC_DATE, "ymd"), (US_DATE, "mdy")):
        for match in regex.finditer(text):
            parts = [int(v) for v in match.groups()]
            y, m, d = parts if order == "ymd" else (parts[2], parts[0], parts[1])
            if y < 100:
                y += 2000
            parsed = valid_day(y, m, d)
            if parsed and 2020 <= y <= 2030:
                return parsed
    match = MONTH_DATE.search(text)
    if match:
        return valid_day(int(match.group(3)), MONTHS[match.group(1).lower()], int(match.group(2)))
    return None


def header_lines(path: Path, max_lines: int = 35) -> list[str]:
    try:
        with path.open(encoding="utf-8-sig", errors="replace") as file:
            return [next(file).rstrip("\n\r") for _ in range(max_lines)]
    except StopIteration:
        # The file is short; use the complete content.
        return path.read_text(encoding="utf-8-sig", errors="replace").splitlines()
    except OSError:
        return []


def lineage_dates(lines: list[str]) -> tuple[str | None, str | None]:
    origin = transform = None
    for line in lines[:28]:
        if "origin:" in line and "ts:" in line:
            origin = parse_date(line)
        if "fn:" in line and "ts:" in line:
            transform = parse_date(line)
    return origin, transform


def document_date(path: Path, group: str, snapshot: dict | None) -> tuple[str | None, str]:
    if path.exists():
        lines = header_lines(path)
    else:
        lines = []
    if group in {"legacy-context", "core-context"}:
        origin, transform = lineage_dates(lines)
        if transform:
            return transform, "context conversion metadata"
        if origin:
            return origin, "context lineage origin"
    if group == "synthesis":
        # Some generated summary origins predate the sources they summarize.
        # Their lineage timestamps are not reliable document creation dates.
        return None, "summary date unverified"

    candidate_lines = lines[:12]
    if not candidate_lines and snapshot:
        candidate_lines = [e["text"] for e in snapshot.get("opening_date_evidence", [])]
    for line in candidate_lines:
        if line.lstrip().startswith("[") and "](" in line:
            continue  # a linked source's date, not this file's date
        parsed = parse_date(line)
        if parsed:
            if "origin:" in line and "ts:" in line:
                return parsed, "lineage origin metadata"
            if "Status:" in line and ("passed" in line or "integrated" in line):
                return parsed, "integration/status milestone"
            return parsed, "date in document opening"
    if group in {"legacy-source", "core-source"} and snapshot:
        for e in snapshot.get("opening_date_evidence", []):
            if e["line"] > 10 and "Revision note" in e["text"]:
                continue
            parsed = parse_date(e["text"])
            if parsed:
                return parsed, "date in opening section"
    if group in {"legacy-source", "core-source"}:
        context_folder = PHASE1 / "Context Layer" if group == "legacy-source" else CORE / "E2Core/Context Layer"
        paired = context_folder / (path.stem + ".ormd")
        if paired.exists():
            origin, _ = lineage_dates(header_lines(paired))
            if origin:
                return origin, "paired Context lineage origin"
    if group == "staged":
        parsed = parse_date(path.name)
        if parsed:
            return parsed, "date in filename"
        for part in path.relative_to(CORE / "staged work").parts[:-1]:
            match = DATE_FOLDER.match(part)
            if match:
                parsed = valid_day(*(int(v) for v in match.groups()))
                if parsed:
                    return parsed, "staging folder date"
    return None, "date unlocated"


def added_in_core_git() -> dict[str, str]:
    command = [
        "git", "log", "--all", "--diff-filter=A", "--name-only",
        "--format=@@%aI", "--", "E2Core", "Synthesized Core", "staged work",
    ]
    result = subprocess.run(command, cwd=CORE, capture_output=True, text=True,
                            encoding="utf-8", errors="replace", check=False)
    if result.returncode:
        return {}
    current = None
    found: dict[str, str] = {}
    for raw in result.stdout.splitlines():
        line = raw.strip()
        if line.startswith("@@"):
            current = parse_date(line[2:])
        elif line and current and line.lower().endswith((".md", ".ormd")):
            found.setdefault(line.replace("\\", "/"), current)
    return found


def group_for(path: Path) -> str:
    relative = path.relative_to(PHASE1).as_posix()
    if relative.startswith("Semantic Substrate/"):
        return "legacy-source"
    if relative.startswith("Context Layer/"):
        return "legacy-context"
    if relative.startswith("Core Framework/E2Core/Semantic Substrate/"):
        return "core-source"
    if relative.startswith("Core Framework/E2Core/Context Layer/"):
        return "core-context"
    if relative.startswith("Core Framework/Synthesized Core/"):
        return "synthesis"
    if relative.startswith("Core Framework/staged work/"):
        return "staged"
    return "process"


def corpus_documents() -> list[dict]:
    inventory = json.loads((INVENTORY_DIR / "inventory.json").read_text(encoding="utf-8"))
    evidence = json.loads((INVENTORY_DIR / "evidence.json").read_text(encoding="utf-8"))
    snapshots = {d["path"]: d for d in inventory["documents"]}
    anchors = {d["path"]: d["id"] for d in evidence["sources"]}
    paths = {PHASE1 / rel for rel in snapshots}
    for folder in (PHASE1 / "Semantic Substrate", PHASE1 / "Context Layer",
                   CORE / "E2Core/Semantic Substrate", CORE / "E2Core/Context Layer",
                   CORE / "Synthesized Core"):
        paths.update(p for p in folder.glob("*") if p.is_file() and p.suffix.lower() in {".md", ".ormd"})
    staged = CORE / "staged work"
    paths.update(p for p in staged.rglob("*") if p.is_file() and p.suffix.lower() in {".md", ".ormd"}
                 and not any(part in {"node_modules", ".git", "tests", "results"} for part in p.parts))
    paths.update(p for p in CORE.glob("*.md") if p.is_file())
    added = added_in_core_git()
    docs: list[dict] = []
    for path in sorted(paths, key=lambda p: str(p).casefold()):
        rel = path.relative_to(PHASE1).as_posix()
        group = group_for(path)
        day, basis = document_date(path, group, snapshots.get(rel))
        if not day and path.is_relative_to(CORE):
            git_rel = path.relative_to(CORE).as_posix()
            if git_rel in added:
                day, basis = added[git_rel], "first tracked in Core Git"
        if not path.exists():
            basis += "; path absent in current checkout"
        docs.append({
            "id": "d:" + rel,
            "kind": "document",
            "group": group,
            "name": path.name,
            "date": day,
            "end": day,
            "basis": basis,
            "path": str(path),
            "href": path.as_uri() if path.exists() else None,
            "exists": path.exists(),
            "anchor": anchors.get(rel),
        })
    return docs


def matrix_rows(section_start: str, section_end: str) -> list[tuple[str, str]]:
    text = MATRIX.read_text(encoding="utf-8")
    block = text.split(section_start, 1)[1].split(section_end, 1)[0]
    rows = []
    for line in block.splitlines():
        if not line.startswith("| **"):
            continue
        cells = [x.strip() for x in line.strip().strip("|").split("|")]
        name_match = re.search(r"\*\*(.*?)\*\*", cells[0])
        if name_match:
            rows.append((name_match.group(1), cells[-1]))
    return rows


# Dates here are *records*, not assumed conception or continuous-use dates.
# Each value is (first dated record, last dated record, date basis).
E2_DATES = {
    "MSAF / Forecast Field Lab": ("2026-04-27", "2026-04-27", "timestamped exports"),
    "PAME": ("2026-09-02", "2026-09-03", "dated study records"),
    "Relational Reserves": ("2026-05-01", "2026-05-01", "dated feedback artifact"),
    "FOSL": ("2026-08-13", "2026-08-14", "physical capture and conclusions"),
    "Decimen optical transfer": ("2026-08-09", "2026-08-09", "dated benchmark runs"),
    "Emergence Bench / Emergence Lab": ("2026-07-18", "2026-07-18", "dated Build Week context"),
    "real_system": ("2026-04-01", "2026-04-01", "timestamped cycles"),
    "REAL-EE": ("2026-03-22", "2026-03-22", "timestamped outputs"),
    "REAL Neural Substrate": ("2026-03-17", "2026-03-30", "experiment trace and redesign note"),
    "papersearch": ("2026-08-04", "2026-08-04", "dated research reports"),
    "Causal valence": ("2026-06-16", "2026-06-16", "captured synthesis date"),
    "Etymology Registry": ("2026-08-07", "2026-08-07", "dated filing/move"),
    "Linguistic Spectrometry": ("2026-04-03", "2026-08-07", "progress note to registry move"),
    "TMG cost-aware POC": ("2026-05-19", "2026-05-20", "stated creation and output date"),
    "WDW / Who's Discipling Who": ("2026-08-12", "2026-08-12", "dated workbook archive"),
    "Phase 2": ("2026-03-03", "2026-03-15", "dated progress and update documents"),
    "Codex Build Week 2026": ("2026-07-18", "2026-07-18", "created build plan"),
}
CODING_DATES = {
    "ACE": ("2024-09-17", "2026-08-11", "local Git commits"),
    "Aviary": ("2023-12-04", "2026-04-28", "nested Git commits"),
    "ChaosTamer": ("2025-12-06", "2025-12-07", "local Git commits"),
    "Coherence Engine": ("2026-02-18", "2026-02-18", "nested Git commits"),
    "Conav": ("2025-11-22", "2025-11-29", "local Git commits"),
    "Decimen optical transfer": ("2026-07-30", "2026-08-15", "local Git commits"),
    "DocFlow / Doc Flow Automaton": ("2025-05-06", "2025-05-07", "local Git commits"),
    "eChain / Civic Incident OS": ("2026-02-06", "2026-02-06", "local Git commit"),
    "Emergence Engine": ("2025-11-04", "2025-11-17", "local Git commits"),
    "Interessence": ("2025-12-19", "2025-12-31", "local Git commits"),
    "Nexes": ("2025-09-27", "2025-09-30", "local Git commits for platform prototype"),
    "Open RMD": ("2025-05-28", "2025-05-29", "nested Git commits"),
    "ORMD": ("2025-05-28", "2026-05-14", "nested Git commits"),
    "Personal Site": ("2026-08-25", "2026-09-05", "nested Git commits"),
    "Ponder": ("2026-01-27", "2026-01-27", "local Git commit"),
    "PortfolioSite": ("2024-10-11", "2024-10-11", "local Git commit"),
    "Resonance-OS": ("2025-04-24", "2025-04-24", "local Git commits"),
    "RP-Lang": ("2025-11-19", "2026-08-11", "local Git commits"),
    "Policy graph": ("2025-02-10", "2025-02-10", "nested Git commits"),
}
PUBLIC_DATES = {
    "ANEx": ("2025-11-26", "2025-11-29", "public Git commits"),
    "MindiAI": ("2024-03-28", "2024-08-23", "public Git commits"),
    "ChatGPT_history_parser": ("2023-11-29", "2023-11-29", "public Git commits"),
    "Immigration Paradox": ("2026-01-29", "2026-01-29", "public Git commits"),
    "The Durable Heresy of Fast Fashion": ("2026-07-07", "2026-07-07", "dated reader dashboard"),
}


def source_href(group: str, cell: str) -> str | None:
    if group == "project-public":
        match = re.search(r"\]\((https?://[^)]+)\)", cell)
        if match:
            return match.group(1)
    match = re.search(r"`([^`]+)`", cell)
    if not match:
        return None
    raw = match.group(1)
    if raw.startswith("C:/"):
        p = Path(raw)
    else:
        base = E2 if group == "project-e2" else CODING
        p = base / raw
    return p.as_uri() if p.exists() else None


def projects() -> list[dict]:
    sections = [
        ("project-e2", "## Project Matrix", "## Known Receiver", E2_DATES),
        ("project-coding", "## Sibling Projects In", "## Public GitHub", CODING_DATES),
        ("project-public", "## Public GitHub Projects", "## What The Scan", PUBLIC_DATES),
    ]
    items = []
    for group, start_heading, end_heading, dates in sections:
        for name, source in matrix_rows(start_heading, end_heading):
            start, end, basis = dates.get(name, (None, None, "date unlocated"))
            items.append({
                "id": "p:" + group + ":" + name,
                "kind": "project",
                "group": group,
                "name": name,
                "date": start,
                "end": end,
                "basis": basis,
                "path": None,
                "href": source_href(group, source),
                "exists": True,
                "anchor": None,
                "bound": "2025-09-25" if group == "project-coding" and name == "ACE" else None,
            })
    assert len(items) == 60, f"Expected all 60 matrix rows, got {len(items)}"
    return items


def main() -> None:
    items = corpus_documents() + projects()
    dated = [item for item in items if item["date"]]
    payload = {
        "generated": date.today().isoformat(),
        "items": items,
        "counts": {
            "documents": sum(item["kind"] == "document" for item in items),
            "projects": sum(item["kind"] == "project" for item in items),
            "dated": len(dated),
            "undated": len(items) - len(dated),
        },
    }
    encoded = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    template = TEMPLATE.read_text(encoding="utf-8")
    assert template.count("__TIMELINE_DATA__") == 1
    OUTPUT.write_text(template.replace("__TIMELINE_DATA__", encoded), encoding="utf-8")
    print(json.dumps({"output": str(OUTPUT), **payload["counts"]}))


if __name__ == "__main__":
    main()
