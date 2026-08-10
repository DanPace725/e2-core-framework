# August Candidate Test Workspace

Status: active test workspace

Created: 2026-08-10

## Scope

This folder contains reproducible tests for candidate artifacts in `staged work/20260807`. Passing a test does not automatically promote a candidate into `E2Core`; it satisfies one named admission gate and preserves failures for review.

Current suites:

- Condition minimum-trace and register discrimination;
- Lawfulness across engineered, stochastic, and reflexive regimes;
- Slow-Layer Clock-Ratio positive and negative controls;
- Persistence topology and maintenance-ledger cases;
- Responsibility Absorption admissibility cases;
- Custody lifecycle, authority, and answerability-continuity cases;
- Trust construct-separation, indexed-trace, freshness, assurance, and experiment-gate cases.

Deliberately excluded:

- Condition Map product behavior;
- Interest-Frustration Instrument validation;
- consciousness, welfare, or moral-standing inference;
- transfer of TCL numerical constants outside their validated model.

## Files

- `fixtures/condition_cases.json`: hand-authored Condition cases and expected dispositions.
- `fixtures/persistence_cases.json`: identity/topology/maintenance cases.
- `fixtures/responsibility_cases.json`: absorption admissibility cases.
- `fixtures/custody_cases.json`: custody assignment, lifecycle, transfer, and discharge cases.
- `fixtures/trust_cases.json`: trustworthiness/trust/reliance/custody separation plus trace, freshness, assurance, and experiment cases.
- `run_candidate_tests.py`: deterministic standard-library runner.
- `results/candidate_test_results.json`: machine-readable generated results.
- `results/CANDIDATE_TEST_REPORT.md`: generated human-readable report.

## Run

From this folder:

```powershell
python .\run_candidate_tests.py
```

The runner uses Python's standard library and a fixed random seed. It overwrites only the two generated result files named above.

## Evidence Rules

- Fixtures declare expected results before execution.
- Failed expectations remain in the generated outputs.
- Synthetic demonstrations validate discrimination logic, not empirical performance in real domains.
- Published cases must retain citations and evidence boundaries in their parent candidate documents.
- Candidate promotion requires a separate integration decision after the relevant tests pass.
