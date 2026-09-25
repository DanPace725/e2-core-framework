"""Read-only corpus inventory and reproducible excerpts for the historical review.

Writes inventory.json, evidence.json, and sources.md beside this script, and
refreshes the marked source-link definitions in the review beside them.
Dates are evidence strings, not inferred dates of first invention. No term counts
or file-copy counts are used to infer conceptual prominence.
"""
from pathlib import Path
import hashlib
import json
import re

OUT = Path(__file__).resolve().parent
CORE = OUT.parents[1]
PHASE1 = CORE.parent
SS = "Core Framework/E2Core/Semantic Substrate/"
LEGACY = "Semantic Substrate/"

# id, collection, filename, inspected ranges, date interpretation
SOURCES = [
    ("S01", LEGACY, "Relationships.md", [(3, 33)], "July 2023; document date and speaker-labeled dialogue."),
    ("S02", SS, "Our essence exists in the space between us.md", [(1, 2)], "July 2023; dated aphorism."),
    ("S03", LEGACY, "Cognition, Communication, and Complexity An Integr.md", [(1, 22)], "August 2024; document date."),
    ("S04", LEGACY, "Principles of Relational Abstraction.md", [(1, 108)], "December 2024; document date."),
    ("S05", SS, "Adaptation via Informational Abstraction.md", [(1, 85)], "December 2024; document date."),
    ("S06", LEGACY, "E^2 Orientation (o3) 4 20 25.md", [(1, 35), (65, 71)], "April 2025; substantive orientation with dated title/body."),
    ("S07", LEGACY, "Overview 2 4 20 25.md", [(1, 47)], "April 2025; includes the name and an earlier Relational Essence Equation."),
    ("S08", SS, "The Resonance Framework An Ontological Map 4 24 25.md", [(1, 65)], "April 2025; dated map of core and orbital concepts."),
    ("S09", SS, "Tensional Intelligence A Theoretical Foundation.md", [(1, 25)], "April 2025; document date."),
    ("S10", LEGACY, "Primer.md", [(1, 53)], "May 2025; EST/ECN synthesis."),
    ("S11", LEGACY, "TACITRA.md", [(1, 38)], "May 2025; SCRIPTA/PLFN lineage described within the document."),
    ("S12", SS, "Communication as Coherence.md", [(1, 17), (41, 65)], "June 2025; text is a historical framework proposal, not independently validated cognitive classification."),
    ("S13", SS, "Context Layer Protocol (CLP).md", [(1, 33)], "September 2025; protocol document date."),
    ("S14", SS, "Relational Derivation Chain - E2 to RCP, MPDC, and AFD.md", [(1, 63)], "June 2025; composite dialogue/synthesis, dated as a document, not every embedded passage."),
    ("S15", SS, "CFA.md", [(1, 37)], "July 2025; explicit connection of E2, AVIA, and AFD."),
    ("S16", SS, "AFD - First Principles.md", [(1, 45)], "July 2025; attention-fluctuation and rule-emergence formulation."),
    ("S17", SS, "Rema v2.md", [(1, 76)], "July 2025; explicitly introduces seven interlocking frameworks."),
    ("S18", SS, "Universal Emergence Pattern.md", [(1, 56)], "July 2025; current copy has a later title-normalization review flag."),
    ("S19", SS, "REMF.md", [(1, 59)], "August 2025; hierarchical cross-framework synthesis."),
    ("S20", SS, "Reverent Stewardship.md", [(1, 65)], "June 2025; restraint, boundaries, cultivation."),
    ("S21", SS, "Power as Relational Field Coherence.md", [(1, 61)], "August 2025; retained date within an evolving source family."),
    ("S22", SS, "Pattern Integrity over Time under Entropy.md", [(1, 42)], "August 2025; explicit extension of the power framework."),
    ("S23", SS, "Interlocked Stewardship V2.md", [(1, 44)], "August 2025; invisible maintenance work and shared life."),
    ("S24", SS, "CFAR.md", [(1, 41)], "September 2025; resolution as a capacity constraint."),
    ("S25", LEGACY, "Temporal Compression & Ethical Occlusion — v2 (Reb.md", [(1, 70)], "September 2025; earlier version used to avoid dating from a later Core merge."),
    ("S26", SS, "Adversarial Occlusion and Mechanism Integrity V1.md", [(1, 52)], "September 2025; accountability under structural blind spots."),
    ("S27", LEGACY, "Metabolic Meaning.md", [(1, 39)], "September 2025; earlier source behind the later MMPS consolidation."),
    ("S28", SS, "Justice Across Scales.md", [(1, 36)], "October 2025; scale and resolution frame the justice question."),
    ("S29", SS, "Exposure Protocol.md", [(1, 47)], "September 2025; continuing translation branch."),
    ("S30", LEGACY, "Relational Primitives.md", [(1, 95)], "November 2025; contains substantive typing framework as well as evolving link index."),
    ("S31", SS, "Relational Ontology Derived from First Principles.md", [(1, 37)], "November 2025; substantive derivation corroborates the primitive cluster."),
    ("S32", SS, "CT translation of RPs.md", [(1, 30)], "November 2025; categorical translation, opening formulation and first mapping."),
    ("S33", LEGACY, "Global Closure Operator.md", [(1, 66)], "November 2025; earlier source describes primitives acting jointly and genesis-to-homeostasis."),
    ("S34", SS, "E^2 Equation.md", [(1, 54)], "November 2025; later recursive closure equation, distinct from April REE."),
    ("S35", SS, "Relational Bill of Rights v2.md", [(1, 55)], "November 2025; historical normative derivation, not a finding about moral status."),
    ("S36", SS, "Signal as Bias Field.md", [(1, 79)], "December 2025; signal-closure synthesis."),
    ("S37", SS, "CRS.md", [(1, 78)], "February 2026; explicit retrospective consolidation of forty-plus components (its own description)."),
    ("S38", SS, "Collective Cognitive Substrate.md", [(1, 35)], "February 2026; synthesis explicitly names its missing shared subject."),
    ("S39", LEGACY, "RE_Foundation.md", [(1, 75)], "February 2026; neighboring relational-economics branch."),
    ("S40", SS, "TCL_Plain_English_Summary.md", [(1, 26), (58, 86)], "February 2026; research narrative read as a historical source; simulations not independently audited here."),
    ("S41", LEGACY, "Relational Substrate Capacity.md", [(1, 95)], "April 2026; dated synthesis of goods, field health, and regime shifts."),
    ("S42", SS, "resolution_synthesis.md", [(1, 57)], "April 24, 2026 session date in prose; explicit conversation arc."),
    ("S43", SS, "Self as Coherence Field.md", [(1, 44)], "April 2026 body date with an explicitly later August admission boundary."),
    ("S44", LEGACY, "Remnant Stewardship.md", [(1, 10), (153, 214)], "April 2026; earlier approach/closure/aftercare formulation."),
    ("S45", SS, "flow_operators_provisional.md", [(1, 63)], "April 30, 2026 session date in prose; provisional synthesis of the cost domain."),
    ("S46", LEGACY, "relational_resolution_sayings_axiom_stack.md", [(1, 65), (825, 876)], "May 2026; retrospective self-history, not independent proof of chronology."),
    ("S47", SS, "boundary_dynamics.md", [(1, 37)], "May 2026 Context Layer origin/conversion metadata; first authorship is not established."),
    ("S48", SS, "Asymmetry Maintenance - Core Source.md", [(1, 54)], "June 2026 source packet/Context Layer metadata; later maintenance formulation."),
    ("S49", SS, "Complex Causality - Core Source.md", [(1, 48)], "June 2026 source packet/Context Layer metadata; may include subsequent revisions."),
    ("S50", SS, "Embedded Universality Principle (EUP).md", [(1, 73)], "June 2026 Context Layer lineage; provisional cumulative synthesis."),
    ("S51", SS, "Relational Localization - Core Source.md", [(1, 35)], "June packet and August revision note; current copy still carries draft status wording."),
    ("S52", SS, "Intervention Stewardship - Core Source.md", [(1, 44)], "June source packet, integrated by August; approach/action/aftermath distinction."),
    ("S53", SS, "Consequence Routing - Core Source.md", [(1, 37)], "August 2026 source basis and Context Layer integration timestamp."),
    ("S54", SS, "Custody - Core Source.md", [(1, 38)], "August 10, 2026 promotion date explicitly marked; not first appearance of custody."),
    ("S55", SS, "E² as a Translation Architecture for Human Remembrance.md", [(1, 95)], "August 11, 2026 Context Layer integration lineage; text is an orientation/bridge."),
    ("S56", SS, "Relational Primitives.md", [(1, 39)], "June 2026 canonical merger metadata, not the 2025 conceptual origin."),
    ("S57", SS, "E^2 Axioms.md", [(1, 45)], "June 2026 canonical consolidation of earlier axioms."),
    ("S58", LEGACY, "Essence of Existence E^2.md", [(1, 11)], "April 2025 label on an evolving index; naming only corroborated using substantive S06/S07."),
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def record(path):
    raw = path.read_bytes()
    lines = raw.decode("utf-8-sig").splitlines()
    date_pattern = r"(?:20\d{2}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}/\d{1,2}/\d{2,4}|Session date:|Promotion date:)"
    return {
        "path": path.relative_to(PHASE1).as_posix(),
        "sha256": digest(raw),
        "line_count": len(lines),
        "headings": [{"line": i, "text": s} for i, s in enumerate(lines, 1) if s.startswith("#")],
        "opening_date_evidence": [{"line": i, "text": s} for i, s in enumerate(lines[:80], 1) if re.search(date_pattern, s)],
    }


def main():
    inventory = []
    collections = [LEGACY.rstrip("/"), SS.rstrip("/"), "Core Framework/E2Core/Context Layer"]
    for folder in collections:
        for path in sorted((PHASE1 / folder).glob("*")):
            if path.suffix in {".md", ".ormd"}:
                inventory.append({"collection": folder, **record(path)})
    evidence = []
    source_md = ["# Source register for the conceptual-development review", "",
                 "Generated from the files on disk. Ranges below record the passages selected for this review; they do not imply full close reading of every source. Dates are documentary anchors, not certified first occurrences. Source/Context pairs and historical copies are not independent witnesses.", ""]
    for sid, folder, filename, ranges, interpretation in SOURCES:
        p = PHASE1 / folder / filename
        lines = p.read_text(encoding="utf-8-sig").splitlines()
        row = {"id": sid, **record(p), "date_interpretation": interpretation, "selected_passages": []}
        for a, b in ranges:
            assert 1 <= a <= b <= len(lines), (sid, a, b, len(lines))
            row["selected_passages"].append({"start_line": a, "end_line": b, "text": "\n".join(lines[a-1:b])})
        context = CORE / "E2Core/Context Layer" / f"{p.stem}.ormd"
        if folder == SS and context.exists():
            row["paired_context_opening"] = {"path": context.relative_to(PHASE1).as_posix(), "sha256": digest(context.read_bytes()), "text": "\n".join(context.read_text(encoding="utf-8-sig").splitlines()[:26])}
        evidence.append(row)
        line_text = ", ".join(f"{a}–{b}" for a, b in ranges)
        source_md += [f"## {sid} — {filename}", "", f"[Open source](<{p.as_posix()}:{ranges[0][0]}>)", "", interpretation, "", f"Selected lines: {line_text}.", ""]
    envelope = {"review_date": "2026-09-10", "phase1_root": PHASE1.as_posix(),
                "method": "Structural inventory plus qualitative reading of selected source passages. No statistical period detection, first-use certification, or independent scientific validation.",
                "collection_counts": {c: sum(x["collection"] == c for x in inventory) for c in collections}}
    (OUT / "inventory.json").write_text(json.dumps({**envelope, "documents": inventory}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT / "evidence.json").write_text(json.dumps({**envelope, "sources": evidence}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT / "sources.md").write_text("\n".join(source_md), encoding="utf-8")
    report = OUT / "conceptual-development.md"
    if report.exists():
        marker = "<!-- SOURCE LINKS -->"
        original = report.read_text(encoding="utf-8")
        assert original.count(marker) == 1
        definitions = []
        for row in evidence:
            target = (PHASE1 / row["path"]).as_posix()
            line = row["selected_passages"][0]["start_line"]
            definitions.append(f'[{row["id"]}]: <{target}:{line}>')
        report.write_text(original.split(marker)[0] + marker + "\n\n" + "\n".join(definitions) + "\n", encoding="utf-8")
    print(json.dumps({"inventory_records": len(inventory), "selected_sources": len(evidence), **envelope["collection_counts"]}))


if __name__ == "__main__":
    main()
