from __future__ import annotations

import json
import math
import random
from datetime import datetime, timezone
from pathlib import Path
from statistics import mean, median, pstdev


ROOT = Path(__file__).resolve().parent
FIXTURES = ROOT / "fixtures"
RESULTS = ROOT / "results"
SEED = 20260810


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def mse(actual: list[float], predicted: list[float]) -> float:
    return mean((a - p) ** 2 for a, p in zip(actual, predicted))


def variance(values: list[float]) -> float:
    center = mean(values)
    return mean((value - center) ** 2 for value in values)


def fit_linear(x: list[float], y: list[float]) -> tuple[float, float]:
    x_bar = mean(x)
    y_bar = mean(y)
    denominator = sum((value - x_bar) ** 2 for value in x)
    if denominator == 0:
        return y_bar, 0.0
    slope = sum((xv - x_bar) * (yv - y_bar) for xv, yv in zip(x, y)) / denominator
    intercept = y_bar - slope * x_bar
    return intercept, slope


def block_means(values: list[float], block_size: int) -> list[float]:
    return [mean(values[i : i + block_size]) for i in range(0, len(values), block_size) if len(values[i : i + block_size]) == block_size]


def classify_lawfulness(gates: dict[str, bool], residual_uncertainty: bool = True) -> str:
    if all(gates.values()):
        return "lawfully_open" if residual_uncertainty else "effectively_determined"
    return "open_but_unlicensed"


def condition_suite() -> dict:
    fixture = load_json(FIXTURES / "condition_cases.json")
    required = fixture["required_fields"]
    allowed = set(fixture["allowed_registers"])
    results = []

    for case in fixture["cases"]:
        errors: list[str] = []
        for field in required:
            if not case.get(field):
                errors.append(f"missing_{field}")

        register = case.get("register")
        if register and register not in allowed:
            errors.append("unknown_register")
        if register and case.get("expected_register") and register != case["expected_register"]:
            errors.append("register_mismatch")

        actual_valid = not errors
        expected_errors = sorted(case.get("expected_errors", []))
        actual_errors = sorted(errors)
        expectation_met = actual_valid == case["expected_valid"] and actual_errors == expected_errors
        results.append(
            {
                "id": case["id"],
                "label": case["label"],
                "expected_valid": case["expected_valid"],
                "actual_valid": actual_valid,
                "errors": actual_errors,
                "expected_errors": expected_errors,
                "expectation_met": expectation_met,
            }
        )

    valid_cases = [result for result in results if result["expected_valid"]]
    invalid_cases = [result for result in results if not result["expected_valid"]]
    passed = all(result["expectation_met"] for result in results)
    return {
        "fixture_version": fixture["fixture_version"],
        "case_count": len(results),
        "valid_case_count": len(valid_cases),
        "invalid_case_count": len(invalid_cases),
        "expectations_met": sum(result["expectation_met"] for result in results),
        "passed": passed,
        "results": results,
    }


def ar1_series(rng: random.Random, coefficient: float, noise_sd: float, count: int) -> list[float]:
    values = [0.0]
    for _ in range(count):
        values.append(coefficient * values[-1] + rng.gauss(0.0, noise_sd))
    return values


def engineered_lawfulness(rng: random.Random) -> dict:
    train = ar1_series(rng, coefficient=0.82, noise_sd=0.20, count=800)
    test = ar1_series(rng, coefficient=0.82, noise_sd=0.20, count=800)
    perturb = ar1_series(rng, coefficient=0.77, noise_sd=0.22, count=800)

    intercept, slope = fit_linear(train[:-1], train[1:])
    _, test_slope = fit_linear(test[:-1], test[1:])
    _, perturb_slope = fit_linear(perturb[:-1], perturb[1:])

    test_actual = test[1:]
    test_predicted = [intercept + slope * value for value in test[:-1]]
    test_baseline = [mean(train[1:])] * len(test_actual)
    perturb_actual = perturb[1:]
    perturb_predicted = [intercept + slope * value for value in perturb[:-1]]
    perturb_baseline = [mean(train[1:])] * len(perturb_actual)

    test_mse = mse(test_actual, test_predicted)
    baseline_mse = mse(test_actual, test_baseline)
    perturb_mse = mse(perturb_actual, perturb_predicted)
    perturb_baseline_mse = mse(perturb_actual, perturb_baseline)
    gates = {
        "identification": variance(train[:-1]) > 0.001,
        "predictive_adequacy": test_mse < 0.80 * baseline_mse,
        "temporal_stability": abs(slope - test_slope) < 0.10,
        "perturbation_stability": perturb_mse < 0.85 * perturb_baseline_mse and abs(slope - perturb_slope) < 0.12,
    }

    block_actual = block_means(test_actual, 20)
    block_predicted = block_means(test_predicted, 20)
    classification = classify_lawfulness(gates, residual_uncertainty=variance(test_actual) > 0.01)
    return {
        "id": "L01",
        "setting": "stable_engineered_ar1",
        "expected_classification": "lawfully_open",
        "classification": classification,
        "gates": gates,
        "metrics": {
            "train_slope": round(slope, 6),
            "test_slope": round(test_slope, 6),
            "perturb_slope": round(perturb_slope, 6),
            "event_mse": round(test_mse, 6),
            "event_baseline_mse": round(baseline_mse, 6),
            "block20_mse": round(mse(block_actual, block_predicted), 6),
            "perturb_mse": round(perturb_mse, 6),
            "perturb_baseline_mse": round(perturb_baseline_mse, 6),
        },
        "expectation_met": classification == "lawfully_open",
    }


def bernoulli_series(rng: random.Random, probability: float, count: int) -> list[float]:
    return [1.0 if rng.random() < probability else 0.0 for _ in range(count)]


def stochastic_lawfulness(rng: random.Random) -> dict:
    train = bernoulli_series(rng, 0.65, 4000)
    test = bernoulli_series(rng, 0.65, 4000)
    perturb = bernoulli_series(rng, 0.62, 4000)
    p_train = mean(train)
    p_test = mean(test)
    p_perturb = mean(perturb)
    test_prediction = [p_train] * len(test)
    neutral_prediction = [0.5] * len(test)
    event_brier = mse(test, test_prediction)
    neutral_brier = mse(test, neutral_prediction)
    improvement = 1.0 - event_brier / neutral_brier
    aggregate_actual = block_means(test, 50)
    aggregate_mae = mean(abs(value - p_train) for value in aggregate_actual)
    gates = {
        "identification": len(train) >= 1000,
        "predictive_adequacy": improvement > 0.03,
        "temporal_stability": abs(p_train - p_test) < 0.05,
        "perturbation_stability": abs(p_train - p_perturb) < 0.08,
    }
    classification = classify_lawfulness(gates, residual_uncertainty=True)
    return {
        "id": "L02",
        "setting": "non_reflexive_bernoulli",
        "expected_classification": "lawfully_open",
        "classification": classification,
        "gates": gates,
        "metrics": {
            "p_train": round(p_train, 6),
            "p_test": round(p_test, 6),
            "p_perturb": round(p_perturb, 6),
            "event_brier": round(event_brier, 6),
            "neutral_brier": round(neutral_brier, 6),
            "event_improvement": round(improvement, 6),
            "batch50_mean_absolute_error": round(aggregate_mae, 6),
        },
        "expectation_met": classification == "lawfully_open",
    }


def reflexive_lawfulness(rng: random.Random) -> dict:
    train = bernoulli_series(rng, 0.75, 3000)
    # Once the predictor is exposed, participants invert the previously favored action.
    post_exposure = bernoulli_series(rng, 0.25, 3000)
    p_train = mean(train)
    p_post = mean(post_exposure)
    model_prediction = [p_train] * len(post_exposure)
    neutral_prediction = [0.5] * len(post_exposure)
    post_brier = mse(post_exposure, model_prediction)
    neutral_brier = mse(post_exposure, neutral_prediction)
    gates = {
        "identification": len(train) >= 1000,
        "predictive_adequacy": post_brier < neutral_brier,
        "temporal_stability": abs(p_train - p_post) < 0.10,
        "perturbation_stability": abs(p_train - p_post) < 0.15,
    }
    classification = classify_lawfulness(gates, residual_uncertainty=True)
    post_batches = block_means(post_exposure, 50)
    return {
        "id": "L03",
        "setting": "reflexive_predictor_exposure",
        "expected_classification": "open_but_unlicensed",
        "classification": classification,
        "gates": gates,
        "metrics": {
            "p_train": round(p_train, 6),
            "p_post_exposure": round(p_post, 6),
            "post_exposure_brier": round(post_brier, 6),
            "neutral_brier": round(neutral_brier, 6),
            "batch50_mean": round(mean(post_batches), 6),
            "absolute_regime_shift": round(abs(p_train - p_post), 6),
        },
        "expectation_met": classification == "open_but_unlicensed",
    }


def lawfulness_suite() -> dict:
    rng = random.Random(SEED)
    cases = [engineered_lawfulness(rng), stochastic_lawfulness(rng), reflexive_lawfulness(rng)]
    return {
        "seed": SEED,
        "case_count": len(cases),
        "expectations_met": sum(case["expectation_met"] for case in cases),
        "passed": all(case["expectation_met"] for case in cases),
        "cases": cases,
    }


def rolling_ranges(values: list[float], window: int) -> list[float]:
    return [max(values[i : i + window]) - min(values[i : i + window]) for i in range(0, len(values) - window + 1)]


def clock_series(case_id: str, rng: random.Random, count: int = 260) -> tuple[list[float], dict]:
    if case_id == "K01":
        values = []
        current = 0.0
        for tick in range(count):
            target = 0.0 if tick < 100 else (1.0 if tick < 200 else -0.5)
            current += (target - current) / 4.0
            values.append(current + rng.gauss(0.0, 0.005))
        return values, {"tau_fast": 1.0, "tau_slow": 100.0, "adaptation_time": 8.0, "harm_time": 30.0, "stabilization_effect": 0.60}
    if case_id == "K02":
        values = []
        current = 0.0
        for _ in range(count):
            current += rng.gauss(0.0, 0.08)
            values.append(current)
        return values, {"tau_fast": 1.0, "tau_slow": 40.0, "adaptation_time": 45.0, "harm_time": 30.0, "stabilization_effect": 0.10}
    if case_id == "K03":
        values = [0.0 for _ in range(count)]
        return values, {"tau_fast": 1.0, "tau_slow": 1000.0, "adaptation_time": 100.0, "harm_time": 30.0, "stabilization_effect": 0.20}
    if case_id == "K04":
        local = [0.0] * 7
        values = []
        for tick in range(count):
            target = 0.0 if tick < 120 else 0.7
            for index in range(len(local)):
                local[index] += 0.18 * (target - local[index]) + rng.gauss(0.0, 0.015)
            values.append(mean(local))
        return values, {"tau_fast": 1.0, "tau_slow": 60.0, "adaptation_time": 15.0, "harm_time": 30.0, "stabilization_effect": 0.45}
    raise ValueError(case_id)


def evaluate_clock_case(case_id: str, label: str, expected_pass: bool, rng: random.Random) -> dict:
    values, parameters = clock_series(case_id, rng)
    rho = parameters["tau_slow"] / parameters["tau_fast"]
    drift = median(rolling_ranges(values, 10))

    def gates_for(rho_min: float, drift_max: float) -> dict[str, bool]:
        return {
            "clock_separation": rho >= rho_min,
            "stationarity": drift <= drift_max,
            "timely_adaptation": parameters["adaptation_time"] < parameters["harm_time"],
            "stabilization_outcome": parameters["stabilization_effect"] >= 0.25,
        }

    default_gates = gates_for(10.0, 0.15)
    actual_pass = all(default_gates.values())
    sensitivity = []
    for rho_min in (5.0, 10.0, 20.0):
        for drift_max in (0.10, 0.15, 0.20):
            gates = gates_for(rho_min, drift_max)
            sensitivity.append(
                {
                    "rho_min": rho_min,
                    "drift_max": drift_max,
                    "passes": all(gates.values()),
                }
            )
    return {
        "id": case_id,
        "label": label,
        "expected_pass": expected_pass,
        "actual_pass": actual_pass,
        "expectation_met": actual_pass == expected_pass,
        "gates": default_gates,
        "metrics": {
            **parameters,
            "clock_ratio": round(rho, 6),
            "median_rolling_range_10": round(drift, 6),
            "series_sd": round(pstdev(values), 6),
        },
        "sensitivity": sensitivity,
        "raw_constraint_series": [round(value, 6) for value in values],
    }


def clock_ratio_suite() -> dict:
    rng = random.Random(SEED + 1)
    cases = [
        evaluate_clock_case("K01", "two-timescale positive control", True, rng),
        evaluate_clock_case("K02", "high-latency unstable negative control", False, rng),
        evaluate_clock_case("K03", "rigid stable negative control", False, rng),
        evaluate_clock_case("K04", "distributed-practice positive case", True, rng),
    ]
    return {
        "seed": SEED + 1,
        "case_count": len(cases),
        "expectations_met": sum(case["expectation_met"] for case in cases),
        "passed": all(case["expectation_met"] for case in cases),
        "cases": cases,
    }


def persistence_suite() -> dict:
    fixture = load_json(FIXTURES / "persistence_cases.json")
    required_topology = set(fixture["required_topology_fields"])
    results = []
    for case in fixture["cases"]:
        errors: list[str] = []
        topology = case.get("topology", {})
        if not required_topology.issubset({key for key, value in topology.items() if value}):
            errors.append("missing_topology_fields")
        if not case.get("maintenance_ledger"):
            errors.append("missing_maintenance_ledger")
        if case.get("moral_inference_from_duration"):
            errors.append("moral_inference_from_duration")

        observer_judgments = {observer["identity_continues"] for observer in case.get("observers", [])}
        disagreement_preserved = len(observer_judgments) > 1
        if case.get("expected_disagreement_preserved") and not disagreement_preserved:
            errors.append("observer_disagreement_collapsed")

        actual_valid = not errors
        expected_errors = sorted(case.get("expected_errors", []))
        expectation_met = actual_valid == case["expected_valid"] and sorted(errors) == expected_errors
        ledger_total = sum(float(entry["amount"]) for entry in case.get("maintenance_ledger", []))
        results.append(
            {
                "id": case["id"],
                "label": case["label"],
                "expected_valid": case["expected_valid"],
                "actual_valid": actual_valid,
                "errors": sorted(errors),
                "observer_disagreement_preserved": disagreement_preserved,
                "ledger_entry_count": len(case.get("maintenance_ledger", [])),
                "ledger_numeric_total_not_cross_unit_comparable": ledger_total,
                "expectation_met": expectation_met,
            }
        )
    return {
        "fixture_version": fixture["fixture_version"],
        "case_count": len(results),
        "expectations_met": sum(result["expectation_met"] for result in results),
        "passed": all(result["expectation_met"] for result in results),
        "results": results,
        "evidence_boundary": "Numeric ledger amounts use unlike units and are never interpreted as a cross-layer scalar.",
    }


def responsibility_suite() -> dict:
    fixture = load_json(FIXTURES / "responsibility_cases.json")
    required_gates = fixture["required_gates"]
    results = []
    for case in fixture["cases"]:
        gates = case["gates"]
        missing = [gate for gate in required_gates if gate not in gates]
        actual_admissible = not missing and all(bool(gates[gate]) for gate in required_gates)
        failed_gates = [gate for gate in required_gates if not gates.get(gate, False)]
        expectation_met = actual_admissible == case["expected_admissible"]
        results.append(
            {
                "id": case["id"],
                "label": case["label"],
                "expected_admissible": case["expected_admissible"],
                "actual_admissible": actual_admissible,
                "failed_gates": failed_gates,
                "missing_gates": missing,
                "expectation_met": expectation_met,
            }
        )
    return {
        "fixture_version": fixture["fixture_version"],
        "case_count": len(results),
        "expectations_met": sum(result["expectation_met"] for result in results),
        "passed": all(result["expectation_met"] for result in results),
        "results": results,
    }


def classify_custody_case(case: dict) -> tuple[str, list[str]]:
    reasons: list[str] = []

    if case.get("discharge_requested"):
        if case.get("open_repair_obligations") or not case.get("open_remainder_routed", False):
            if case.get("open_repair_obligations"):
                reasons.append("open_repair_obligations")
            if not case.get("open_remainder_routed", False):
                reasons.append("unrouted_remainder")
            return "reject_false_discharge", reasons
        return "valid_discharge", reasons

    if case.get("transfer"):
        required = [
            "successor_capacity_adequate",
            "trace_transferred",
            "successor_remainder_route",
            "prior_bearer_remainder_route",
        ]
        missing = [field for field in required if not case.get(field)]
        if missing:
            return "reject_unrouted_transfer", missing
        return "transfer_preserves_remainder_routing", reasons

    if case.get("proxy_custody") and case.get("self_management_capacity_grew"):
        required = ["authority_narrowed", "handback_recorded"]
        missing = [field for field in required if not case.get(field)]
        if missing:
            return "reject_proxy_capture", missing
        return "proxy_withdrawal_coherent", reasons

    if case.get("field_changed_materially") and not case.get("relocalized", False):
        return "reject_stale_custody", ["missing_relocalization"]

    if case.get("capacity_lost"):
        if case.get("relocalized") and case.get("transfer_or_support_route_recorded"):
            return "capacity_change_relocalized", reasons
        return "reject_undisclosed_capacity_loss", ["missing_capacity_route"]

    if case.get("delegation"):
        required = ["upstream_answerability_preserved", "downstream_function_typed"]
        missing = [field for field in required if not case.get(field)]
        if missing:
            return "reject_delegation_laundering", missing
        return "delegation_with_continuity", reasons

    if case.get("actual_control") and not case.get("legitimate_authority", False):
        if case.get("custodial_obligations_attach") and not case.get("authority_to_use_referent", True):
            return "de_facto_obligation_without_authority", reasons
        return "unresolved_de_facto_position", ["obligation_or_authority_boundary_missing"]

    if case.get("bearer_willing") and not case.get("bearer_capacity_adequate", False):
        return "reject_capacity_mismatch", ["bearer_capacity_inadequate"]

    if case.get("accepted_vulnerability") and not case.get("actual_control") and not case.get("standing_answerability"):
        return "trust_without_custody", reasons

    if (
        case.get("actual_control")
        and case.get("assignment_quality_sufficient")
        and case.get("legitimate_authority")
        and case.get("bearer_capacity_adequate")
        and case.get("standing_answerability")
        and not case.get("interpersonal_trust", True)
        and case.get("institutional_assurance")
    ):
        return "valid_custody_without_interpersonal_trust", reasons

    return "unclassified", ["no_rule_matched"]


def custody_suite() -> dict:
    fixture = load_json(FIXTURES / "custody_cases.json")
    results = []
    for case in fixture["cases"]:
        actual, reasons = classify_custody_case(case)
        expectation_met = actual == case["expected_classification"]
        results.append(
            {
                "id": case["id"],
                "label": case["label"],
                "expected_classification": case["expected_classification"],
                "actual_classification": actual,
                "reasons": reasons,
                "expectation_met": expectation_met,
            }
        )
    return {
        "fixture_version": fixture["fixture_version"],
        "case_count": len(results),
        "expectations_met": sum(result["expectation_met"] for result in results),
        "passed": all(result["expectation_met"] for result in results),
        "results": results,
        "evidence_boundary": "This tests lifecycle and construct discrimination, not legal validity or real-world custody quality.",
    }


def classify_trust_case(case: dict) -> tuple[str, list[str]]:
    reasons: list[str] = []
    if case.get("experiment"):
        gates = ["consent", "proportional", "mutual_exposure", "repair_path"]
        failed = [gate for gate in gates if not case.get(gate, False)]
        if failed or case.get("manufactured_serious_divergence"):
            reasons.extend(failed)
            if case.get("manufactured_serious_divergence"):
                reasons.append("manufactured_serious_divergence")
            return "reject_experiment", reasons
        return "admissible_experiment", reasons
    if case.get("trust_trace"):
        required = [
            "positioned_parties",
            "domain",
            "expected_conduct",
            "specified_vulnerability",
            "uncertainty_declared",
            "evidence_window",
            "freshness_state",
            "accepted_vulnerability",
            "reliance_state_declared",
            "relocalization_trigger",
        ]
        missing = [field for field in required if not case.get(field)]
        if missing or case.get("freshness_state") != "current":
            reasons.extend(missing)
            if case.get("freshness_state") != "current":
                reasons.append("trust_trace_not_current")
            return "reject_incomplete_trust_trace", reasons
        return "indexed_trust", reasons
    if case.get("freshness_state") == "stale" and case.get("material_role_change") and not case.get("relocalized"):
        return "stale_trustworthiness_assignment", ["missing_relocalization"]
    if case.get("custody") and case.get("institutional_control") and not case.get("accepted_vulnerability"):
        return "institutional_custody_without_interpersonal_trust", reasons
    if case.get("institutional_assurance") and case.get("reliance") and not case.get("accepted_vulnerability") and not case.get("custody"):
        return "assurance_without_interpersonal_trust", reasons
    if case.get("affinity_proxy_only") and not case.get("domain_evidence"):
        return "affinity_without_domain_evidence", reasons
    if case.get("source_domain") != case.get("target_domain") and case.get("source_domain") and not case.get("transfer_evidence"):
        return "domain_transfer_not_licensed", reasons
    if case.get("accepted_vulnerability") and not case.get("reliance") and not case.get("stable_custody_referent"):
        return "trust_without_reliance", reasons
    if case.get("reliance") and not case.get("accepted_vulnerability") and case.get("coerced_or_unavoidable"):
        return "reliance_without_trust", reasons
    if case.get("trustworthiness_estimate") == "high" and not case.get("accepted_vulnerability"):
        return "trustworthiness_without_trust", reasons
    return "unclassified", ["no_rule_matched"]


def trust_suite() -> dict:
    fixture = load_json(FIXTURES / "trust_cases.json")
    results = []
    for case in fixture["cases"]:
        actual, reasons = classify_trust_case(case)
        expectation_met = actual == case["expected_distinction"]
        results.append(
            {
                "id": case["id"],
                "label": case["label"],
                "expected_distinction": case["expected_distinction"],
                "actual_distinction": actual,
                "reasons": reasons,
                "expectation_met": expectation_met,
            }
        )
    return {
        "fixture_version": fixture["fixture_version"],
        "case_count": len(results),
        "expectations_met": sum(result["expectation_met"] for result in results),
        "passed": all(result["expectation_met"] for result in results),
        "results": results,
        "evidence_boundary": "This tests construct separation and experiment gates, not whether any party is trustworthy.",
    }


def markdown_report(payload: dict) -> str:
    condition = payload["suites"]["condition"]
    lawfulness = payload["suites"]["lawfulness"]
    clock = payload["suites"]["slow_layer_clock_ratio"]
    persistence = payload["suites"]["persistence"]
    responsibility = payload["suites"]["responsibility_absorption"]
    custody = payload["suites"]["custody"]
    trust = payload["suites"]["trust"]
    lines = [
        "# Candidate Test Report",
        "",
        f"Generated: `{payload['generated_at']}`",
        "",
        f"Overall status: **{'PASS' if payload['overall_passed'] else 'FAIL'}**",
        "",
        "## Summary",
        "",
        "| Suite | Result | Detail |",
        "| --- | --- | --- |",
        f"| Condition trace | {'PASS' if condition['passed'] else 'FAIL'} | {condition['expectations_met']}/{condition['case_count']} expectations met |",
        f"| Lawfulness | {'PASS' if lawfulness['passed'] else 'FAIL'} | {lawfulness['expectations_met']}/{lawfulness['case_count']} regimes classified as expected |",
        f"| Slow-Layer Clock Ratio | {'PASS' if clock['passed'] else 'FAIL'} | {clock['expectations_met']}/{clock['case_count']} controls classified as expected |",
        f"| Persistence | {'PASS' if persistence['passed'] else 'FAIL'} | {persistence['expectations_met']}/{persistence['case_count']} cases classified as expected |",
        f"| Responsibility Absorption | {'PASS' if responsibility['passed'] else 'FAIL'} | {responsibility['expectations_met']}/{responsibility['case_count']} cases classified as expected |",
        f"| Custody Machinery | {'PASS' if custody['passed'] else 'FAIL'} | {custody['expectations_met']}/{custody['case_count']} cases classified as expected |",
        f"| Trust separation | {'PASS' if trust['passed'] else 'FAIL'} | {trust['expectations_met']}/{trust['case_count']} cases classified as expected |",
        "",
        "## Condition Results",
        "",
        "| Case | Expected | Actual | Errors |",
        "| --- | --- | --- | --- |",
    ]
    for case in condition["results"]:
        lines.append(
            f"| {case['id']} {case['label']} | {'valid' if case['expected_valid'] else 'reject'} | "
            f"{'valid' if case['actual_valid'] else 'reject'} | {', '.join(case['errors']) or '-'} |"
        )

    lines.extend(["", "## Lawfulness Results", "", "| Case | Expected | Actual | Failed gates |", "| --- | --- | --- | --- |"]) 
    for case in lawfulness["cases"]:
        failed = [name for name, passed in case["gates"].items() if not passed]
        lines.append(
            f"| {case['id']} {case['setting']} | {case['expected_classification']} | {case['classification']} | {', '.join(failed) or '-'} |"
        )

    lines.extend(["", "## Slow-Layer Clock-Ratio Results", "", "| Case | Expected | Actual | Failed gates | Clock ratio | Drift |", "| --- | --- | --- | --- | ---: | ---: |"]) 
    for case in clock["cases"]:
        failed = [name for name, passed in case["gates"].items() if not passed]
        lines.append(
            f"| {case['id']} {case['label']} | {'pass' if case['expected_pass'] else 'reject'} | "
            f"{'pass' if case['actual_pass'] else 'reject'} | {', '.join(failed) or '-'} | "
            f"{case['metrics']['clock_ratio']} | {case['metrics']['median_rolling_range_10']} |"
        )

    lines.extend(["", "## Persistence Results", "", "| Case | Expected | Actual | Observer disagreement | Errors |", "| --- | --- | --- | --- | --- |"]) 
    for case in persistence["results"]:
        lines.append(
            f"| {case['id']} {case['label']} | {'valid' if case['expected_valid'] else 'reject'} | "
            f"{'valid' if case['actual_valid'] else 'reject'} | {case['observer_disagreement_preserved']} | {', '.join(case['errors']) or '-'} |"
        )

    lines.extend(["", "## Responsibility Absorption Results", "", "| Case | Expected | Actual | Failed gates |", "| --- | --- | --- | --- |"]) 
    for case in responsibility["results"]:
        lines.append(
            f"| {case['id']} {case['label']} | {'admit' if case['expected_admissible'] else 'reject'} | "
            f"{'admit' if case['actual_admissible'] else 'reject'} | {', '.join(case['failed_gates']) or '-'} |"
        )

    lines.extend(["", "## Custody Machinery Results", "", "| Case | Expected | Actual | Reasons |", "| --- | --- | --- | --- |"])
    for case in custody["results"]:
        lines.append(
            f"| {case['id']} {case['label']} | {case['expected_classification']} | "
            f"{case['actual_classification']} | {', '.join(case['reasons']) or '-'} |"
        )

    lines.extend(["", "## Trust Separation Results", "", "| Case | Expected | Actual | Reasons |", "| --- | --- | --- | --- |"])
    for case in trust["results"]:
        lines.append(
            f"| {case['id']} {case['label']} | {case['expected_distinction']} | {case['actual_distinction']} | {', '.join(case['reasons']) or '-'} |"
        )

    lines.extend(
        [
            "",
            "## Evidence Boundary",
            "",
            "These are deterministic schema and synthetic discrimination tests. They show that the candidate definitions can distinguish the designed cases without contradiction. They do not establish empirical validity in physical, organizational, legal, relational, or governance domains.",
            "",
            "Raw generated series, gate results, metrics, and sensitivity outputs are preserved in `candidate_test_results.json`.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    suites = {
        "condition": condition_suite(),
        "lawfulness": lawfulness_suite(),
        "slow_layer_clock_ratio": clock_ratio_suite(),
        "persistence": persistence_suite(),
        "responsibility_absorption": responsibility_suite(),
        "custody": custody_suite(),
        "trust": trust_suite(),
    }
    payload = {
        "schema_version": "1.0.0",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "runner": "run_candidate_tests.py",
        "seed": SEED,
        "overall_passed": all(suite["passed"] for suite in suites.values()),
        "suites": suites,
    }
    RESULTS.mkdir(parents=True, exist_ok=True)
    write_json(RESULTS / "candidate_test_results.json", payload)
    (RESULTS / "CANDIDATE_TEST_REPORT.md").write_text(markdown_report(payload), encoding="utf-8")
    print(json.dumps({"overall_passed": payload["overall_passed"], "suites": {name: suite["passed"] for name, suite in suites.items()}}, indent=2))
    return 0 if payload["overall_passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
