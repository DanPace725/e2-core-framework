# Candidate Test Report

Generated: `2026-08-10T19:55:21.686651+00:00`

Overall status: **PASS**

## Summary

| Suite | Result | Detail |
| --- | --- | --- |
| Condition trace | PASS | 16/16 expectations met |
| Lawfulness | PASS | 3/3 regimes classified as expected |
| Slow-Layer Clock Ratio | PASS | 4/4 controls classified as expected |
| Persistence | PASS | 4/4 cases classified as expected |
| Responsibility Absorption | PASS | 4/4 cases classified as expected |
| Custody Machinery | PASS | 10/10 cases classified as expected |
| Trust separation | PASS | 11/11 cases classified as expected |

## Condition Results

| Case | Expected | Actual | Errors |
| --- | --- | --- | --- |
| C01 physical possibility | valid | valid | - |
| C02 probability | valid | valid | - |
| C03 sustainability | valid | valid | - |
| C04 normative permissibility | valid | valid | - |
| C05 epistemic license | valid | valid | - |
| C06 positioned disagreement A | valid | valid | - |
| C07 positioned disagreement B | valid | valid | - |
| C08 freshness and un-promotion | valid | valid | - |
| C09 boundary non-collision | valid | valid | - |
| C10 fragment | reject | reject | missing_evidence, missing_position, missing_referent, missing_register, missing_relocalization_trigger, missing_resolution, missing_time_state |
| C11 missing referent | reject | reject | missing_referent |
| C12 ethical claim mislabeled probability | reject | reject | register_mismatch |
| C13 prediction license mislabeled permission | reject | reject | register_mismatch |
| C14 view from nowhere | reject | reject | missing_position |
| C15 stale assignment without trigger | reject | reject | missing_relocalization_trigger |
| C16 missing evidence | reject | reject | missing_evidence |

## Lawfulness Results

| Case | Expected | Actual | Failed gates |
| --- | --- | --- | --- |
| L01 stable_engineered_ar1 | lawfully_open | lawfully_open | - |
| L02 non_reflexive_bernoulli | lawfully_open | lawfully_open | - |
| L03 reflexive_predictor_exposure | open_but_unlicensed | open_but_unlicensed | predictive_adequacy, temporal_stability, perturbation_stability |

## Slow-Layer Clock-Ratio Results

| Case | Expected | Actual | Failed gates | Clock ratio | Drift |
| --- | --- | --- | --- | ---: | ---: |
| K01 two-timescale positive control | pass | pass | - | 100.0 | 0.01709 |
| K02 high-latency unstable negative control | reject | reject | stationarity, timely_adaptation, stabilization_outcome | 40.0 | 0.32192 |
| K03 rigid stable negative control | reject | reject | timely_adaptation, stabilization_outcome | 1000.0 | 0.0 |
| K04 distributed-practice positive case | pass | pass | - | 60.0 | 0.018437 |

## Persistence Results

| Case | Expected | Actual | Observer disagreement | Errors |
| --- | --- | --- | --- | --- |
| P01 organizational succession | valid | valid | True | - |
| P02 stored and restarted software pattern | valid | valid | True | - |
| P03 branching project lineage | valid | valid | True | - |
| P04 duration-to-value collapse | reject | reject | False | missing_maintenance_ledger, missing_topology_fields, moral_inference_from_duration |

## Responsibility Absorption Results

| Case | Expected | Actual | Failed gates |
| --- | --- | --- | --- |
| R01 distributed technical incident with capable coordinator | admit | admit | - |
| R02 organizational failure with external consequence bearers | admit | admit | - |
| R03 heroic absorber without repair control | reject | reject | repair_capacity, contestability, non_displacement, proportional_scope |
| R04 replaceable employee used as scapegoat | reject | reject | repair_capacity, ledger_preservation, contestability, non_displacement, proportional_scope, temporal_commitment |

## Custody Machinery Results

| Case | Expected | Actual | Reasons |
| --- | --- | --- | --- |
| U01 institutional custody without interpersonal trust | valid_custody_without_interpersonal_trust | valid_custody_without_interpersonal_trust | - |
| U02 trust without custody | trust_without_custody | trust_without_custody | - |
| U03 de facto custody without authority | de_facto_obligation_without_authority | de_facto_obligation_without_authority | - |
| U04 willing but overloaded candidate custodian | reject_capacity_mismatch | reject_capacity_mismatch | bearer_capacity_inadequate |
| U05 delegation preserves upstream answerability | delegation_with_continuity | delegation_with_continuity | - |
| U06 capacity loss triggers re-localization | capacity_change_relocalized | capacity_change_relocalized | - |
| U07 proxy custody hands back toward self-management | proxy_withdrawal_coherent | proxy_withdrawal_coherent | - |
| U08 stale custody retained after field change | reject_stale_custody | reject_stale_custody | missing_relocalization |
| U09 transfer with divided remainder routes | transfer_preserves_remainder_routing | transfer_preserves_remainder_routing | - |
| U10 false discharge with unresolved remainder | reject_false_discharge | reject_false_discharge | open_repair_obligations, unrouted_remainder |

## Trust Separation Results

| Case | Expected | Actual | Reasons |
| --- | --- | --- | --- |
| T01 high reliance with low trust | reliance_without_trust | reliance_without_trust | - |
| T02 high estimate without accepted vulnerability | trustworthiness_without_trust | trustworthiness_without_trust | - |
| T03 institutional custody without interpersonal confidence | institutional_custody_without_interpersonal_trust | institutional_custody_without_interpersonal_trust | - |
| T04 affinity without domain evidence | affinity_without_domain_evidence | affinity_without_domain_evidence | - |
| T05 unsupported domain transfer | domain_transfer_not_licensed | domain_transfer_not_licensed | - |
| T06 covert loyalty test | reject_experiment | reject_experiment | consent, proportional, mutual_exposure, repair_path, manufactured_serious_divergence |
| T07 consented mild reciprocal test | admissible_experiment | admissible_experiment | - |
| T08 complete indexed trust trace | indexed_trust | indexed_trust | - |
| T09 stale trustworthiness assignment | stale_trustworthiness_assignment | stale_trustworthiness_assignment | missing_relocalization |
| T10 high assurance without interpersonal trust | assurance_without_interpersonal_trust | assurance_without_interpersonal_trust | - |
| T11 trust without reliance | trust_without_reliance | trust_without_reliance | - |

## Evidence Boundary

These are deterministic schema and synthetic discrimination tests. They show that the candidate definitions can distinguish the designed cases without contradiction. They do not establish empirical validity in physical, organizational, legal, relational, or governance domains.

Raw generated series, gate results, metrics, and sensitivity outputs are preserved in `candidate_test_results.json`.
