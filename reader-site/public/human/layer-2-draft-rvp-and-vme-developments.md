# Layer 2 Draft: RVP + VME (Developments So Far)
2/10/26

## Purpose of Layer 2
Layer 2 translates the Layer 0/1 theory into *operational machinery* that can be deployed without pretending to compute “true value.”

Core stance:
- **RVP is a communication protocol**, not a measurement instrument.
- **Vector Matching (VME) is a coordination engine**, not a moral court.
- **Outputs must remain multi-dimensional** (vectorized) to avoid silently rebuilding a scalar “price-like” gate.


## RVP (Relational Value Packet)

### What an RVP is
An RVP is a structured label attached to an offer/transaction that expresses an exchange’s **coherence profile** across the six primitives. It is designed to:
- Preserve multi-dimensionality (6D profile rather than a single number)
- Track provenance (claims vs evidence vs annotations)
- Encode scale-context (Mode 1/2/3) and time-decay
- Surface integrity risks (P-violations) without requiring omniscience

RVP does **not** declare “this is worth X.”
It declares: “here is what is being exchanged, how it couples across the primitives, and why anyone should believe any of it.”


### Practical framing
RVP ≈ “nutritional labeling for exchanges”:
- Most exchanges get a small label.
- Complex exchanges (contracts, medical bills, loans) get richer packets.
- **Unknown is first-class**: forcing completeness invites fabrication, bureaucracy, and gaming.


### RVP design principles (guardrails)
1. **No universal scalar score** used for eligibility/access decisions.
2. **Claims ≠ truth**: separate claim, evidence, and judgment.
3. **Mode-bounded meaning**: judgments must be scoped to justice mode (Mode 1/2/3).
4. **Time matters**: labels and judgments decay; value-couplings are temporal.
5. **Privacy by default**: personal transaction history is local-first; sharing is consented and minimal.


### RVP schema v0.1 (buildable starting point)
This is a minimal spec intended to force clarity while remaining deployable.

#### 1) `rvp_header`
- `rvp_version`
- `exchange_id` (UUID/hash)
- `event_time` (timestamp or {start,end})
- `mode_context` (mode1 | mode2 | mode3)
- `jurisdiction` (optional)
- `consent_scope` (share permissions + granularity)

#### 2) `parties`
Each party:
- `party_id` (pseudonymous by default)
- `role` (provider | receiver | broker | platform | witness | auditor)
- `org_ref` (optional)
- `relationship_type` (one_off | ongoing | dependency_risk | contract_bound)

#### 3) `exchange_object`
- `object_type` (good | service | labor | contract | financial_instrument | digital_access | bundle)
- `descriptor` (text + optional category codes)
- `quantity` (+ unit)
- `duration` (optional)
- `reversibility` (reversible | partially_reversible | irreversible)
- `exit_conditions` (optional)

#### 4) `six_dim_profile` (the packet)
Six objects (one per primitive), each containing:
- `signal` (short claim about this dimension)
- `impact` (positive | mixed | negative | unknown)
- `uncertainty` (low/med/high or 0–1)
- `risk_flags` (list)
- `evidence_refs` (list)

Recommended mapping:
- `P1_ontological`: identity/boundary honesty (“what is this really?”)
- `P2_dynamical`: maintenance/work realism (“who pays metabolic cost?”)
- `P3_geometric`: distance/context visibility (supply chain / causal distance)
- `P4_symmetric`: rule symmetry (contract fairness, enforcement symmetry)
- `P5_epistemic`: observability / information symmetry / Rayleigh pressure
- `P6_meta`: self-modeling impact (confusion-by-design, agency impairment)

#### 5) `claims`
Each claim:
- `claim_id`
- `claimer_party_id`
- `claim_type` (self_report | counterparty_report | third_party | automated_inference)
- `claim_text`
- `scope` (which primitives)
- `confidence_hint` (optional)

#### 6) `evidence`
Each evidence item:
- `evidence_id`
- `evidence_type` (receipt | contract | audit | measurement | testimonial | public_record | telemetry/log)
- `provenance` (producer + acquisition)
- `integrity` (hash/signature fields)
- `redactions`
- `access_policy` (private | community | public)

#### 7) `annotations`
Multiple per exchange (mode-bounded judgments):
- `annotation_id`
- `annotator_role` (party | witness | auditor | community_mod | automated_agent)
- `mode_context`
- `violation_flags` (P2/P3/P4/P5 etc.)
- `notes`
- `dispute_status` (uncontested | contested | resolved | unresolved)
- `expiry` (time-decay)


## VME (Vector Matching Engine)

### What VME is trying to solve
Scalar economics matches using a single inequality:
- `if Bid >= Ask → Execute`

Relational Economics must match without collapsing 6D reality to a scalar.
So matching becomes a **Constraint Satisfaction Problem (CSP)**:
- “Does this exchange reduce salient deficits for both parties while preserving rights, symmetry, epistemic integrity, and temporal safety?”


### Core shift: from “value equality” to “fit / complementarity”
- Scalar: “Do we agree on a number?”
- Vector: “Does your surplus fit my deficit (and vice versa) without violating floors?”


### Data structures
Each agent has:
- `D` = **Deficit vector** (needs to reach/maintain stability)
- `K` = **Capacity vector** (what can be offered without falling below a floor)
- `C` = **Constraints** (hard limits: time, fatigue, min cash buffer, obligations)
- `Disclosure` = privacy policy controlling what can be revealed at which step


### Three-stage pipeline (to avoid friction + compute explosion)

#### Stage A: Candidate discovery (cheap)
Goal: find plausible matches without simulation.
- Compute complementarity overlap (masked by disclosure):
  - overlap ≈ dot(K_A, D_B) + dot(K_B, D_A)
- If overlap is near zero → stop.

#### Stage B: Proposal generation (bounded)
Goal: generate a small set of candidate bundles (“offer vectors”).
- Build candidate flows `f` from A→B and B→A that appear feasible.
- Only do simple feasibility checks vs constraints (no full sim yet).

#### Stage C: Validation (heavier, only for finalists)
Goal: validate that a proposed exchange is coherent.
Validation gates (vector-world analog of “Bid ≥ Ask”):
1) **Mutual feasibility**: both remain above floor constraints
2) **Mutual intelligibility**: both understand terms above a threshold (P5 gate)
3) **Mutual symmetry**: obligations/enforcement are not asymmetrical (P4 gate)
4) **Mutual deficit reduction**: each reduces a salient deficit OR explicitly consents to altruism/investment
5) **Temporal safety**: no unacceptable lock-in/dependency given acclimation dynamics


### Critical guardrail: “metabolic conversion” must not become stealth scalar
Thermodynamic reasoning is allowed as a **local, agent-relative estimator** (e.g., “will learning X likely reduce my future effort?”), but must not become a universal commensurator.

Otherwise the system rebuilds “price” under a different name.


### Relationship between VME and RVP
- VME **consumes** RVPs as reputation/evidence/history (mode-bounded and privacy-gated)
- VME **produces** RVPs for executed offers:
  - what was proposed
  - what constraints bound
  - which gates passed/failed
  - which primitives were affected
  - what evidence exists

RVP becomes the auditable record of “why this match happened,” without claiming omniscient truth.


## Implementation stance (practical deployment)

### Mode 2 first (the beachhead)
Mode 2 (co-ops, local networks, small org procurement) is the viable starting environment because:
- trust is still local enough for signal
- governance can be human-scale
- feedback loops are short
- incentives can route flows without needing regulators


### RVP maturity levels (staged adoption)
- Level 0: private personal RVP notes (local-first)
- Level 1: community-visible labels (Mode 2 governance)
- Level 2: audited claims (higher evidence bar)
- Level 3: privacy-preserving aggregates (Mode 3)


### “Triage, not omniscience” (Phase 1 wedge)
Phase 1 can focus on high-yield, common flags that are actionable and relatively detectable:
- P5: exit friction / lock-in / cancellation traps
- P4: asymmetric enforcement / hidden terms
- P2: hidden maintenance burden shifted to buyer
- P6: confusion-by-design / agency impairment

This yields immediate protection without requiring global supply chain omniscience.


## Next concrete tasks
1) Convert RVP schema v0.1 into a formal JSON Schema.
2) Run 5 real-world test cases through the schema:
   - subscription service
   - used car purchase
   - grocery item
   - phone plan contract
   - medical bill
3) Define Mode 2 governance mechanics for annotations (lightweight dispute + evidence thresholds).
4) Specify VME Stage A/B/C in pseudocode with explicit gates and disclosure rules.

