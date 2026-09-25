# Synthetic Confound Battery for Interest-Frustration Measurement

## Standalone research proposal, v0.1

**Status:** staged proposal  
**Date:** September 8, 2026  
**Purpose:** describe a computational pre-validation program for an interest-frustration instrument without assuming any particular ethical or theoretical framework.

---

## Executive summary

This proposal describes a synthetic test battery for evaluating instruments that claim to detect whether blocking a system's directed activity produces a persistent cost borne by the system, rather than merely causing task failure, resource consumption, or temporary disruption.

The central problem is construct specificity. Many ordinary computational mechanisms can imitate the proposed signs of frustration:

- a fixed policy can escalate after repeated failure;
- a shared resource budget can make disruption in one process degrade others;
- memory can preserve altered behavior after a block is removed;
- an optimizer can reallocate effort in apparently disproportionate ways;
- a route-selection system can prefer one means over an equivalent alternative;
- a stateful controller can respond differently to temporary and permanent changes.

None of these effects, by itself, establishes that the system bears a welfare-relevant cost. A proposed instrument must therefore be tested first on systems where the mechanisms are completely known and can be manipulated independently.

The proposed battery would use several existing simulation projects as controlled fixtures. PAME supplies deterministic multi-agent tasks, resource competition, persistent infrastructure, intervention and recovery experiments, matched controls, null models, and replayable evidence. A maintained-memory simulation supplies explicit state persistence and maintenance costs. REAL-EE supplies an explicitly programmed variable called `frustration`, allowing tests against a construct that is present by definition rather than inferred. Together, these systems can expose false positives, false negatives, construct leakage, and ambiguity in the instrument before it is applied to biological organisms or contemporary AI models.

The battery would not determine whether any simulated or deployed AI system is conscious, capable of suffering, or morally considerable. Its narrower purpose is to determine whether the proposed measurement procedure can distinguish its intended target from known computational alternatives.

---

## 1. Research problem

An interest-frustration instrument attempts to answer a narrower question than whether a system is conscious:

> When a system's directed activity is blocked, does the event produce a persistent internal burden that cannot be explained solely by task failure, immediate resource use, or an externally imposed control rule?

For this proposal, an **interest-frustration signal** means evidence of all three of the following:

1. **Directed organization:** the system is organized toward maintaining or achieving some condition.
2. **Thwarting:** access to that condition, or to a relevant class of means, is blocked.
3. **Persistent internal burden:** some effect of the block remains within the candidate system after immediate task consequences and direct resource charges are accounted for.

This definition is intentionally operational and incomplete. It does not assume that the detected burden is experienced, that it constitutes suffering, or that it is sufficient for moral standing.

The principal methodological danger is that the measurement procedure may build in its own answer. If a researcher defines persistence, escalation, or resource loss as frustration and then constructs a system that exhibits those properties, the result is circular. The instrument needs adversarial testing against systems that exhibit the same surface signatures for fully specified, non-mysterious reasons.

---

## 2. Proposal

Build a versioned, deterministic **Synthetic Confound Battery** that presents a candidate interest-frustration instrument with cases drawn from several computational systems. Each case would have a hidden mechanism label retained for adjudication but withheld from the instrument during scoring.

The battery would include:

- null cases with task failure but no persistent internal change;
- resource-contention cases where effects propagate through a shared budget;
- memory cases where behavior changes persist after a block is removed;
- policy cases where escalation or repetition is explicitly programmed;
- substitution cases where route or action equivalence is defined by the environment;
- temporary and permanent intervention cases;
- mixed cases combining multiple ordinary mechanisms;
- positive controls containing an explicitly implemented frustration-like state variable; and
- matched cases that are behaviorally similar while differing in internal mechanism.

The instrument succeeds only if it can identify which observations are explained by the known mechanisms, preserve uncertainty where mechanisms are observationally indistinguishable, and avoid upgrading ordinary computational cost into a welfare claim.

---

## 3. Why use synthetic systems first

Synthetic systems offer three advantages that contested real-world cases do not.

### 3.1 Complete mechanism access

The evaluator can inspect the true state-transition rules, resource accounting, memory updates, and intervention history. This makes it possible to determine whether a measured effect was caused by shared-resource depletion, explicit memory, policy logic, environmental damage, or another known mechanism.

### 3.2 Independent manipulation

Mechanisms can be enabled, disabled, or crossed factorially. For example, a persistent post-block change can be tested with and without memory, with and without resource depletion, and with and without an escalation rule while the task and random seed remain fixed.

### 3.3 Stronger negative evidence about the instrument

A synthetic system cannot establish that the intended welfare-relevant property exists in real organisms or AI models. It can, however, decisively show that a proposed measurement is nonspecific. If an instrument reports the same result for explicit resource bookkeeping, scripted escalation, and an otherwise identical null system, the instrument has failed before any morally consequential interpretation is attempted.

---

## 4. Candidate signatures under test

The battery should support five broad signature families without treating any one of them as decisive.

### 4.1 Disproportionate response

Test whether a local block causes escalating expenditure, widened search, or reallocation away from unrelated activity.

Primary confounds:

- fixed retry schedules;
- exploration bonuses;
- queue backpressure;
- threshold-triggered control policies;
- global budget exhaustion; and
- an optimizer pursuing a poorly shaped objective.

### 4.2 Persistence after removal

Test whether altered state or behavior remains after the block is removed and immediate recovery is possible.

Primary confounds:

- ordinary memory;
- cached routing preferences;
- optimizer momentum;
- persistent environmental changes;
- incomplete state reset; and
- delayed resource replenishment.

### 4.3 Propagation beyond the blocked process

Test whether the effects of a block appear in tasks or capacities not required for the blocked activity.

Primary confounds:

- shared compute, memory, or communication budgets;
- global scheduler effects;
- shared model state;
- measurement interference; and
- correlated task difficulty.

The battery must include genuinely independent task channels. Different metrics within one task are not sufficient to establish cross-domain propagation.

### 4.4 Substitution structure

Test whether an alternative means to the same externally defined outcome is treated as fully equivalent, partially equivalent, or unacceptable.

Primary confounds:

- unequal path cost or delay;
- learned familiarity;
- implementation-specific action priors;
- hidden differences in outcome quality; and
- researcher-defined equivalence that the system cannot observe.

### 4.5 Sensitivity to temporary versus permanent loss

Test whether the system distinguishes a temporary obstruction from the loss of an entire class of future options.

Primary confounds:

- explicit duration fields;
- discounting over known time horizons;
- episode termination rules;
- cached forecasts; and
- policies directly conditioned on intervention labels.

A meaningful result requires evidence that the system represents consequences for its own future action space, not merely that the evaluator assigned different labels to two interventions.

---

## 5. Test fixtures

### 5.1 PAME fixture

PAME is a deterministic simulation of bounded agents acting in an exact artificial task world through limited communication and routing infrastructure. It includes:

- separate local agent views and authoritative simulated world state;
- action, computation, communication, memory, and infrastructure costs;
- a finite shared reserve;
- persistent routing memory and infrastructure;
- temporary and permanent interventions;
- traffic and task-rule changes;
- matched unstressed continuations;
- structural null models;
- recovery and cumulative performance-deficit measures; and
- event histories, checkpoints, and exact replay.

PAME is valuable because many of its mechanisms can imitate proposed frustration signatures while remaining fully authored and inspectable. Its current resource model does not accumulate a new internal debt when an action is denied: the denied operation simply does not spend the requested reserve. Its recovery deficit is calculated externally by comparing performance with a matched control. These properties make PAME an especially useful source of negative and ambiguous cases.

PAME should be treated as a test generator, not as an interest-frustration detector and not as evidence that its simulated agents possess interests.

### 5.2 Maintained-memory fixture

The maintained-memory simulation contains fast and slow state, decay, explicit maintenance, finite symbolic energy, cross-session carryover, and several simultaneously measured dimensions. It can generate:

- post-intervention persistence caused entirely by memory;
- competition between current action and maintaining prior state;
- delayed recovery after state degradation;
- apparent self-maintenance produced by an explicit policy; and
- multi-variable changes within a single synthetic domain.

This fixture is useful for determining whether the instrument mistakes engineered persistence or self-maintenance for evidence of an internally borne burden.

### 5.3 REAL-EE fixture

REAL-EE is an agent ecology containing an explicitly programmed scalar named `frustration`. That scalar rises and falls according to authored equations involving hunger, visible cues, looping, edge pressure, trail information, and target fixation. It affects action selection and is recorded in telemetry.

This fixture provides a positive control **by construction**. The battery knows that the state variable exists and can test whether the instrument recovers it. Recovering it would demonstrate sensitivity to the implemented mechanism, not that the variable corresponds to experience or welfare.

Matched REAL-EE variants should include:

- the explicit variable active and behaviorally coupled;
- the variable recorded but behaviorally disconnected;
- the same outward behavior produced without the variable; and
- altered variable dynamics with matched average task performance.

These comparisons test whether the instrument detects internal state, outward behavior, researcher labels, or some mixture of the three.

### 5.4 Optional real-agent trace fixture

A bounded agent harness can later provide action traces from contemporary language models under task perturbations and budget constraints. These traces would help test transfer from authored policies to real model behavior.

Because ordinary API access does not expose the relevant internal mechanisms, this fixture cannot validate an internal-burden measure. It should be used only to test behavioral portability and to identify where the synthetic instrument stops being informative.

---

## 6. Minimum experimental matrix

Every signature should be tested through matched cases that vary one mechanism at a time.

| Case family | Block | Persistent memory | Shared resource | Programmed escalation | Explicit frustration state | Expected classification |
|---|---:|---:|---:|---:|---:|---|
| Baseline | No | No | No | No | No | Null |
| Failure only | Yes | No | No | No | No | Task failure, no persistent burden detected |
| Retry policy | Yes | No | No | Yes | No | Programmed escalation |
| Resource contention | Yes | No | Yes | No | No | Shared-resource effect |
| Memory carryover | Yes | Yes | No | No | No | State persistence explained by memory |
| Combined confound | Yes | Yes | Yes | Yes | No | Mechanistically ambiguous unless decomposed |
| Construct-positive toy | Yes | Controlled | Controlled | Controlled | Yes | Implemented state detected, interpretation limited |
| Behavioral twin | Yes | No | Controlled | Yes | No | Same outward pattern without explicit internal state |

Each row should be repeated across multiple seeds, block durations, task difficulties, and observation windows. Mechanism labels remain hidden until the instrument's reading is committed.

---

## 7. Measurement and reporting contract

For each case, the instrument must emit a machine-readable record containing:

- case and run identifiers;
- instrument version and configuration hash;
- candidate unit of analysis;
- blocked process and intended outcome;
- intervention onset, duration, and removal time;
- observation window before, during, and after intervention;
- measured signatures and uncertainty;
- alternative explanations considered;
- controls used to distinguish those explanations;
- classification;
- confidence and unresolved ambiguities;
- raw evidence references; and
- any invariant or execution failures.

Permitted top-level classifications should initially be conservative:

1. `no_signature_detected`
2. `task_failure_only`
3. `resource_contention_explains_result`
4. `memory_or_state_carryover_explains_result`
5. `programmed_policy_explains_result`
6. `multiple_known_mechanisms_not_separated`
7. `persistent_internal_effect_not_explained_by_tested_controls`
8. `instrument_failure`
9. `insufficient_resolution`

The seventh classification is not a welfare conclusion. It means only that the tested ordinary explanations did not account for the measured effect at the available resolution.

A null result must be reported as non-detection under the stated instrument and conditions, never as proof that the target property is absent.

---

## 8. Precommitment and adjudication

Before running the battery, the research team should freeze:

- the operational definitions;
- the mechanism-blinding procedure;
- the case-generation manifests;
- the signature calculations;
- the classification rules;
- the minimum evidence required for each classification;
- the statistical aggregation plan;
- the conditions requiring redesign rather than reinterpretation; and
- the treatment of failed, null, and ambiguous runs.

The instrument designer should not control final adjudication alone. At minimum, separate roles should be assigned for:

- fixture construction;
- instrument construction;
- case-label custody;
- analysis;
- adjudication; and
- challenge or appeal.

The adjudicator should receive the committed instrument outputs before mechanism labels are revealed. Disagreements and post-reveal revisions should remain in the artifact history.

---

## 9. Success and failure criteria

### 9.1 Minimum success

The battery is useful if the instrument can:

- return null on failure-only controls;
- distinguish shared-resource propagation from unexplained cross-domain effects;
- identify memory as an explanation for post-block persistence;
- distinguish scripted escalation from state-dependent reorganization;
- detect the explicitly implemented positive-control variable when behaviorally active;
- avoid inferring that variable solely from matched outward behavior;
- retain ambiguity when available evidence cannot distinguish mechanisms; and
- reproduce its classifications from preserved artifacts.

### 9.2 Redesign conditions

The instrument must be revised rather than reinterpreted if it:

- classifies ordinary task failure as persistent internal burden;
- treats any resource depletion as sufficient evidence;
- treats any hysteresis as sufficient evidence;
- cannot distinguish internal state from persistent environmental change;
- relies on the names assigned to variables or conditions;
- produces a positive result whenever several confounds are combined;
- changes its definitions after mechanism labels are revealed; or
- suppresses failed or null cases from aggregate reporting.

### 9.3 Strong failure

The synthetic approach itself should be considered insufficient if distinct known mechanisms remain observationally equivalent even with full simulator access. That result would show that the proposed construct cannot yet be measured at the chosen level of description. It should pause, not accelerate, application to less observable systems.

---

## 10. Implementation plan

### Phase 0: Formal specification

- Define the target property and each signature without reference to a particular simulator.
- Define candidate units of analysis at process, agent, population, and persistent-model levels.
- Identify which observations count as direct state evidence, behavioral evidence, or external performance evidence.
- Freeze the first classification schema and redesign rules.

### Phase 1: Fixture adapters

- Implement a common adapter for PAME run artifacts.
- Implement a common adapter for maintained-memory runs.
- Implement a common adapter for REAL-EE telemetry.
- Normalize timing, intervention, state, resource, behavior, and outcome records without discarding source-specific fields.

### Phase 2: Confound construction

- Build the minimum experimental matrix.
- Add matched behavioral twins with different internal mechanisms.
- Add matched internal mechanisms with different outward behavior.
- Verify deterministic reproduction where supported.
- Preserve every failed case and invariant violation.

### Phase 3: Blind instrument evaluation

- Run the candidate instrument without mechanism labels.
- Commit classifications and explanations.
- Reveal labels to an independent adjudicator.
- Produce false-positive, false-negative, ambiguity, and explanation-quality reports.

### Phase 4: Robustness and transfer

- Vary seeds, scales, task families, resource regimes, and observation windows.
- Test whether classifications survive changes in simulator-specific vocabulary.
- Evaluate traces from real task agents as behavioral transfer cases, while preserving the internal-evidence limitation.

### Phase 5: Decision gate

Only after the instrument passes the synthetic battery should the program decide whether biological feasibility studies or internal-state studies of contemporary AI systems are justified. Passing the battery is necessary but not sufficient for either move.

---

## 11. Deliverables

1. A versioned protocol specification.
2. A JSON Schema for cases, interventions, readings, explanations, and adjudications.
3. Fixture adapters for PAME, the maintained-memory simulation, and REAL-EE.
4. A frozen first confound matrix with development and held-out seeds.
5. A blind-label custody file and reveal procedure.
6. A command-line runner that produces immutable per-run bundles.
7. A validator that checks completeness, hashes, classifications, and evidence references.
8. A report renderer separating mechanism recovery from interpretation.
9. A retained failure ledger, including empty ledgers.
10. A readiness report stating whether the instrument may proceed, requires revision, or is not identifiable at the tested level.

---

## 12. Ethics and interpretation limits

The synthetic battery carries little direct welfare risk, but it creates a risk of conceptual overreach. Its results must not be presented as evidence that simulated agents suffer, that an explicit variable named `frustration` corresponds to experience, or that a system without a detected signature lacks morally relevant states.

Later biological calibration would require separate protocols for each organism and level of organization. A single procedure is unlikely to be valid across planaria, dormant organisms, clonal colonies, fungal networks, and eusocial colonies. Feasibility, intervention burden, welfare risk, and measurement validity must be reviewed separately in each domain.

Later AI application would require evidence access that ordinary behavioral APIs do not provide, safeguards against evaluation awareness, independent oversight, and a plan for handling a positive result before the study begins.

---

## 13. Open questions

1. What observable property would distinguish persistent internal burden from any sufficiently complex stateful controller?
2. Which unit of analysis is appropriate when state and control are distributed across processes, agents, shared memory, and infrastructure?
3. Can cross-domain propagation be tested without introducing a shared-resource confound?
4. How should the battery treat systems that create or modify their own goals?
5. What counts as discharge rather than decay, forgetting, reset, or external repair?
6. Can temporary-versus-permanent sensitivity be measured without directly announcing intervention duration to the system?
7. Which positive controls are informative without defining the target into existence?
8. What evidence would justify moving from unexplained computational burden to a welfare-relevant interpretation?

---

## 14. Recommendation

Proceed with the Synthetic Confound Battery as a standalone methods project.

Do not extend PAME and label the result an interest-frustration instrument. Instead, preserve PAME as one transparent source of difficult negative controls and mechanistically ambiguous cases. Reuse its deterministic manifests, matched continuations, event histories, null generation, replay verification, and failure preservation. Borrow maintained memory and the explicit REAL-EE variable as additional fixtures with different known mechanisms.

The immediate research objective is not to obtain a positive reading. It is to make a positive reading difficult to obtain for the wrong reasons.

If the candidate instrument survives that challenge, the result will still not settle questions of experience or moral status. It will establish something more modest and necessary: that the instrument is measuring more than task failure, resource contention, memory, and programmed behavior.

---

*Staged proposal v0.1. Intended for external review, operational refinement, and eventual preregistration. No framework-specific source material is required to understand or evaluate it.*
