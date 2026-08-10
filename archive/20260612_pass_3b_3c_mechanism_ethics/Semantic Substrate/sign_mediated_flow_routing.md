# Sign-Mediated Flow Routing

## A general specification of routing operations gated by closure-formation

---

## Status

This document operates at a higher abstraction layer than Consequence Routing. It specifies the general operation that Consequence Routing instantiates in the agentic domain: the routing of typed flow across boundaries through interfaces where closure events produce signs that gate, attribute, and enable governance of the flow.

The framework predicts that this operation appears across multiple substrate-domains with structurally similar form: agentic flow (consequence routing, where the integrity property is justice), economic flow (commercial routing, where the integrity property is market integrity), epistemic flow (knowledge routing, where the integrity property is truth-integrity), and others. Each specialization has its own characteristic interfaces, substrates, and failure surfaces, but the operator structure is invariant.

This document specifies what is invariant. Domain-specific specializations are pointed to but not derived here. Consequence Routing is the worked-out agentic specialization and remains the canonical reference for that domain.

Two structural commitments from Flow Operators are operative throughout: observer-position-dependence of all flow measurements, and decomposition of colloquial "cost" or "transfer" into six structurally distinct operators. The goal is to make the general routing structure explicit so that specializations can be derived rather than reinvented.

---

## 1. Position in the Existing Formal Substrate

The framework substrate from Signal as Bias Field stands:

```
S = ⟨ E, R, C, X, Σ ⟩
```

where E is the entity set (P1), R is the relation set typed by P2 through P6, C is the constraint structure (P4), X is the current closure state, and Σ is the signal field.

The GCO from prior formulations remains the closure operator:

```
GCO = Y(λf. λx. f(f(x)))
```

A sign-formation event is one instance of GCO firing on signal-pressure to produce a stable closure-artifact (a sign). A routing event is the directed flow of typed quantities through such sign-formations into substrates with appropriate operator-capacity.

The general signature of a routing event:

```
GCO_Σ : Σ × N → Σ_W × W × Π_R
```

where N is the set of available nodes (candidate substrate-receivers), Σ_W is the space of sign-artifacts produced, W is the space of substrate-work produced, and Π_R is the space of remainder.

Consequence routing specializes this to the agentic subspace Σ_a. Other specializations (economic, epistemic, communicative, relational, political) operate on their own subspaces of Σ with their own characteristic sign-types.

---

## 2. The Flow-Gating Move

The distinction this framework rests on:

**Unsigned flow** is energy or information that crosses boundaries without producing a closure-artifact. Heat diffusing across a thermal gradient, particles drifting in a fluid, information leaking through unattended channels. The flow happens but produces no sign that it happened. It cannot be tracked, attributed, contested, or governed. It is invisible to systems that operate on signs.

**Signed flow** is the same kind of physical or informational transfer but produced through a closure event that generates a stable sign-artifact. The flow now appears in the record. It can be tracked, attributed, contested, audited, and governed. The sign is the gate that converts ungovernable diffusion into governable transfer.

This distinction is what makes routing possible at all. You cannot route what you cannot see. Sign-formation is the structural prerequisite for governance over flow.

Specializations differ in what sign-types they produce:

- Agentic specialization: signatures, verdicts, attributions, accountability records
- Economic specialization: receipts, contracts, settlement records, ledger entries
- Epistemic specialization: citations, attestations, peer-review records, audit trails
- Communicative specialization: witnessed statements, attested testimony, verified communications
- Relational specialization: vows, covenants, pledges, formal commitments
- Political specialization: constitutions, mandates, signed treaties, legitimate authorizations

In each case, the sign converts a flow event that would otherwise be ungovernable into a flow event that enters a record-keeping system. The framework predicts that the routing structure is the same across these substrates even though the sign-types and substrates differ.

---

## 3. Observer Position and Flow-Operator Foundation

This specification inherits two structural commitments from Flow Operators.

### 3.1 Observer Clause

Flow does not exist as one canonical thing prior to being observed from a position. From inside the routing system the flow appears as expenditure. From the receiving substrate the same flow appears as uptake, work, nutrition, pollution, or waste depending on boundary state. From a third-party observer it appears as a coupling event. There is no view-from-nowhere where the flow has a single description.

Operational consequence: all measurements in this specification are observer-relative. The framework specifies what follows from a given observer position; it does not claim view-independent values. Any application must declare observer-position rather than assume a god's-eye view.

### 3.2 Flow Operators

The colloquial vocabulary of "cost," "transfer," "expense," "exchange," or "consequence" collapses six structurally distinct operations:

| Operator | Etymology | Type | Function |
|---|---|---|---|
| Stance-with | com-stare | Rate-quantity, continuous | Expenditure maintaining persistence against drift |
| Stance-against | with-stand | Threshold-quantity, capacity | Refusing transfer the boundary should not admit |
| Settlement | pacare | Event-quantity, bidirectional | Reconciliation transfer closing tension between systems |
| Depletion | expendere | Stock-quantity, drawdown | Funding rate of operation from reservoir |
| Trade | ex-cambiare | Pair-quantity, reciprocal | Bidirectional flow at admissibility regime |
| Consequence-receipt | con-sequi | Result-quantity, located by topology | Downstream landing as nutrition, work, pollution, or waste |

These are not interchangeable. A routing event demands specific operators from specific substrates, and substrates have specific operator-capacities. The framework treats colloquial transfer-vocabulary as a degraded surface for this operator-structure; the operator decomposition is the analytic primitive.

The Boundary 2x2 from Flow Operators governs how landed flow is metabolized:

| | Inward | Outward |
|---|---|---|
| **Accepts** | Nutrition | Work |
| **Releases** | Pollution | Waste |

A healthy boundary admits nutrition and releases work, regulated. An engorged boundary admits pollution and blocks waste-release. A brittle boundary rejects both nutrition and work-output. A failed boundary is indiscriminate. These four conditions characterize the receiving substrate's metabolism of incoming flow.

---

## 4. Typed Flow Components

Routing flow π is multi-component. The general decomposition:

```
π = ( π^(s) , π^(r) , π^(m) , π^(g) )
```

where:

- **π^(s)** (structural component): information about what occurred and its causal-topological structure
- **π^(r)** (resource-flow component): the demand for specific flow operations across the six operator types, with rates, thresholds, and substrate-targets
- **π^(m)** (meaning component): the field-level interpretive demand the flow places on the substrate-system
- **π^(g)** (governance component): the demand for attribution, recording, contestability, and downstream accountability

In the agentic specialization, π^(s) is causal-pressure, π^(m) is moral-pressure, π^(g) is responsibility-pressure (the demand for attribution-closure). In the economic specialization, π^(s) is transactional structure, π^(m) is value-meaning, π^(g) is settlement-binding. Each specialization has its own typed instantiation of these four components, but the component structure is invariant.

Each component lives in its own typed subspace and conserves independently. Component-wise conservation across the entire routing operation is the central formal claim of this framework (Section 8).

---

## 5. Substrate Capacities

Each candidate routing node n_i ∈ N is characterized by typed capacity vectors.

```
n_i ↦ ( B_i , L_i , K_i , P_i , T_i , I_i )
```

where:

- **B_i**: flow-receiving capacity, decomposed across the six flow operators. Each operator-capacity is separately measurable and not substitutable for the others.
- **L_i**: legibility capacity (P5). The node's capacity to be rendered as an account in whatever record-system the specialization uses.
- **K_i**: structural-proximity vector to the originating event. A typed metric capturing the node's position in whatever structural space (causal, transactional, semantic, contractual) is relevant to the specialization.
- **P_i**: response-power. Capacity to actually receive, process, and act on incident signal.
- **T_i**: temporal persistence. How long the node will remain available to receive and host flow.
- **I_i**: interface conditions specific to this node.

A node's capacity profile determines which routing events it can validly host. This is invariant across specializations; what varies is what counts as a "node" and what the structural-proximity space K is for each domain.

---

## 6. Routing Validity Conditions

A routing closure Σ_i firing on node n_i for event e requires four conditions simultaneously:

```
ValidRouting(Σ_i, e, n_i) :=
    Structural(e, n_i)
  ∧ ResponseCapacity(e, n_i)
  ∧ Legibility(e, n_i)
  ∧ OperatorMatch(e, n_i)
```

where:

- **Structural(e, n_i)**: K_i(e, n_i) above threshold θ^(K). The node must be sufficiently proximate in the structural space that routing to it is not arbitrary. In agentic routing this is causal-proximity; in economic routing this is transactional-proximity; in epistemic routing this is evidential-proximity.
- **ResponseCapacity(e, n_i)**: π^(s)_e admits n_i. The structural-pressure component is compatible with this node having had relevant capacity at the time of the event.
- **Legibility(e, n_i)**: L_i ≥ θ^(L)(scale, stakes). The node must be renderable in the appropriate record-system at the appropriate resolution.
- **OperatorMatch(e, n_i)**: B_i ∩ supp(π^(r)_e) ≠ ∅ in operator-typed space. The node must have flow-receiving capacity in the specific operator-dimensions demanded.

The four-fold conjunction makes failure modes diagnostically precise. Each violation has a distinguishable signature.

---

## 7. Sign-Interfaces as Typed Operators

A sign-interface Σ is the contact surface where field-pressure couples to substrate through a closure event. The interface is itself an object with measurable properties.

For interface Σ with incident pressure π:

```
Σ : π_incident → ( π_transduced , π_reflected , π_dissipated , π_leaked )
```

where π_transduced crosses into substrate-work, π_reflected bounces back into the field, π_dissipated converts to waste-heat (friction without work), and π_leaked crosses interface but does not materialize as work.

Conservation at the interface holds component-wise and operator-wise:

```
||π_incident|| = ||π_transduced|| + ||π_reflected|| + ||π_dissipated|| + ||π_leaked||
```

### 7.1 Interface Properties

Define dimensionless properties, each potentially operator-typed:

- **Permeability μ(Σ) ∈ [0,1]**: fraction of incident pressure that transduces
- **Friction φ(Σ) ∈ [0,1]**: fraction dissipated
- **Reflectivity ρ(Σ) ∈ [0,1]**: fraction reflected
- **Leakage λ(Σ) ∈ [0,1]**: fraction crossing without materializing as work

These sum to unity by conservation. An interface can be permeable to settlement-flow but reflective to depletion-flow, or permeable to symbolic operators but reflective to substantive ones. The operator-typed version of these properties is what makes diagnosis precise.

### 7.2 Selectivity

Real interfaces are not uniform. Their properties depend on the source of incident pressure. Define the selectivity tensor:

```
S(Σ; source, target) = μ(Σ) | source, target
```

A captured interface has S that varies sharply with source (pressure from powerful sources reflects, pressure from less-powerful sources dissipates). A neutral interface has S approximately invariant across sources. This is where adversarial routing-distortion lives in any specialization: actors exploit S to route pressure away from themselves and toward weaker substrates.

---

## 8. Conservation Law

The central formal claim:

**Component-wise and operator-wise conservation of routed flow.**

For event e with pressure components π^(k)_e (k ∈ {s, r, m, g}) routed through closures {Σ_i} producing work {W_i} and remainder π_R:

```
||π^(k)_e|| = Σ_i ||W^(k)_i|| + ||π^(k)_R||      for each k ∈ {s, r, m, g}
```

The norm ||·|| is the appropriate measure in each typed subspace and is not interchangeable across components.

The resource-flow component π^(r) conserves further within itself across the six flow operators. For each operator j ∈ {stance-with, stance-against, settlement, depletion, trade, consequence-receipt}:

```
||π^(r,j)_e|| = Σ_i ||W^(r,j)_i|| + ||π^(r,j)_R||
```

Each operator-conservation must hold for the resource-flow conservation to hold, and the resource-flow conservation must hold along with the other three component-conservations for routing to be valid. The system can satisfy some conservations while violating others, producing characteristic partial-routing remainder signatures.

This is the formal expression of the principle that flow-mass cannot disappear, only be tracked or lost track of. Double-entry accounting operationalizes one operator-conservation within one pressure component for financial flow. The generalized version tracks all four components across all six operators for any sign-mediated flow domain.

---

## 9. Generalized Resolution-Flow Law

The original Resolution-Responsibility Law from TC/EO applies in the agentic specialization. The general form across specializations:

```
R^(k) · C^(k)_eff ≤ R^(k)_max       for each k ∈ {s, r, m, g}
```

where R^(k) is the resolution at which routing is attempted for the k-component, C^(k)_eff is the effective compression on that component, and R^(k)_max is the maximum resolution sustainable for that component given current system state.

Components have different compression dynamics. Structural compression in a fast-moving system can be severe while meaning-compression is mild (events outrun investigation but interpretive pressure persists slowly). Conversely, meaning-compression in mass-mediated discourse can be severe while structural compression is mild (judgment fires faster than the record is established). The law predicts cases where one component routes cleanly under compression while others fail.

---

## 10. Routing Curvature

Power as Relational Field Coherence establishes power as the capacity to influence what gets repeated. In the general routing framework, this is one source of routing-curvature: deviation from the routing distribution that would obtain under structural-proximity weighting alone.

For a routing event with candidate nodes {n_1, ..., n_m} with response-powers {P_1, ..., P_m} and structural-proximities {K_1, ..., K_m}:

Define the **structural-baseline routing distribution** as:

```
P_baseline(routing → n_i) = K_i / Σ_j K_j
```

Define the **actual routing distribution** as observed.

**Routing curvature** is the divergence between actual and baseline:

```
κ(Σ; event) = D( P_actual || P_baseline )
```

A curvature-neutral system has κ ≈ 0 (routing follows structural weight). A curved system has κ > 0 (routing deviates systematically toward some configurations over others).

Power-curvature is one source. Others include institutional inertia, attention-asymmetries, technological mediation effects, and information-cost gradients. The general framework treats κ as a measurable deviation; specializations identify which curvature-sources are operative in their domain.

---

## 11. Remainder Dynamics

Remainder is not a static residue. It has its own dynamics governed by system state.

For total remainder vector π_R(t):

```
dπ_R/dt = -M(π_R, S) + D(t) + U(t)
```

where M is the metabolization rate (function of remainder and substrate-health), D is the displacement input rate (new remainder from active displacement), and U is the unrouted input rate (new remainder from failed routing).

System regime classification:

- **Healthy**: M > D + U on average. Remainder decreases over time.
- **Stationary**: M ≈ D + U. Remainder approximately constant.
- **Degrading**: M < D + U. Remainder accumulates toward phase transition.

This is the formal expression of MMPS dynamics applied to any sign-mediated flow domain. A degrading regime predicts eventual phase transition: when accumulated remainder exceeds substrate capacity, the system collapses, reorganizes, or exports remainder catastrophically.

---

## 12. Integrity as System-Level Property

Integrity is not a property of a single routing event. It is a property of a system across time. Define the integrity Z(S, T) of system S over time interval T as a time-integrated triple-product:

```
Z(S, T) = ∫_T α(t) · β(t) · γ(t) dt
```

where:

- **α(t)**: routing-validity. Fraction of routing events satisfying the four conditions.
- **β(t)**: closure-honesty. Fraction of closures producing actual substrate-work, weighted by the resource-flow component of incident pressure.
- **γ(t)**: remainder-stewardship. Honesty index of how remainder is handled.

α, β, γ are functionals; the integral notation is illustrative of the structural form. The triple-product structure is load-bearing: all three factors must be nonzero for integrand to be nonzero (failure in any one collapses the product).

Specialization names for this integrity property:

- Agentic specialization: justice integrity
- Economic specialization: market integrity (also: contract integrity)
- Epistemic specialization: truth integrity (also: evidence integrity)
- Communicative specialization: communicative integrity (also: discourse integrity)
- Relational specialization: bond integrity (also: fidelity)
- Political specialization: legitimacy integrity

These are the same operation evaluated on the same triple-product structure across different specializations. A system that has high integrity in one specialization may have low integrity in another; the integrities are partially independent.

---

## 13. TCL Constants as Universal Operator-Thresholds

The three constants from Temporal Constraint Lamination correspond to specific operator-threshold locations that apply across specializations:

| TCL Constant | Approximate Value | Operator Threshold |
|---|---|---|
| Viability floor | ~0.757 | Depletion limit: reservoir cannot fund stance-with rate |
| Chaos ceiling | ~0.930 | Stance-against limit: boundary cannot withstand incoming flow |
| Parametric wall | ~0.289 | Trade-equivalence limit: reciprocal regime cannot rebalance |

These bound the achievable α independent of routing system design quality. A perfectly-designed routing system cannot validly route flow to a substrate whose operator-capacities are exhausted at any of these locations.

The TCL convergence is general because the underlying operators are general. The same thresholds operate on substrate-exhaustion failure whether the routing domain is agentic, economic, epistemic, or any other sign-mediated flow specialization. This is one of the strongest empirical anchors the framework provides: universal threshold-locations that apply across specializations because the flow operators they bound are themselves universal.

The slow-layer/fast-layer lamination architecture from TCL is the structural pattern by which routing systems sustain coupling across these thresholds. Routing systems that recapitulate this architecture inherit TCL's anchoring as a substrate-side bound on what is structurally possible.

---

## 14. Cross-Substrate Routing Chains

Flow may need to cross substrate-boundaries (one specialization to another) to fully discharge. A routing chain:

```
e → Σ_1 → n_1 → Σ_2 → n_2 → ... → Σ_k → n_k
```

Conservation holds across the entire chain, not just at individual closures. A chain that loses one component or one operator at an early interface cannot recover it at later interfaces; the loss is permanent unless the chain is reconstructed with explicit routing for the lost dimension.

This explains why complex multi-domain flow events (corporate harm crossing legal, financial, regulatory, and social substrates; scientific misconduct crossing epistemic, professional, and reputational substrates; political betrayal crossing political, legal, and relational substrates) often fail on one component or operator while succeeding on others. Each substrate has its characteristic interface-properties; subsequent interfaces inherit whatever was not transduced upstream without mechanism to recover it.

The cross-domain pattern: a routing chain that crosses specialization-boundaries inherits the failure-modes of each substrate it traverses. A failure that begins as agentic (consequence not routed) becomes economic (no financial settlement), then epistemic (no truth-establishment), then political (no legitimacy-binding). The harm propagates across domains without ever being routed to its specialization-appropriate substrate.

---

## 15. Specializations

The general framework predicts specializations across substrate-domains. Each specialization has its own characteristic sign-types, substrate-types, structural-proximity space K, integrity property, and failure surface. The framework does not predict that the specializations exhaust the space; it predicts that any sign-mediated flow domain has the same operator structure with domain-specific instantiation.

| Specialization | Sign-Types | Substrate | Integrity Property | K-Space |
|---|---|---|---|---|
| Agentic (Consequence Routing) | Verdicts, attributions, accountability records | Persons, institutions, collectives | Justice | Causal-proximity |
| Economic | Receipts, contracts, settlements, ledgers | Accounts, firms, markets | Market integrity | Transactional-proximity |
| Epistemic | Citations, attestations, peer-review records | Knowledge bases, communities, archives | Truth integrity | Evidential-proximity |
| Communicative | Witnessed statements, attested testimony | Discourse, relational fields | Communicative integrity | Semantic-proximity |
| Relational | Vows, covenants, pledges, commitments | Bonds, partnerships, communities | Bond integrity | Commitment-proximity |
| Political | Constitutions, mandates, treaties, authorizations | Polities, institutions, governance systems | Legitimacy integrity | Authority-proximity |

Consequence Routing is the worked-out agentic specialization. The other specializations are predicted by the general framework but not derived in detail here. Each is its own potential document.

---

## 16. Failure Modes as Operator Pathologies

The general failure typology, with specialization-instances in parentheses:

| Failure Mode | Formal Signature | Agentic Instance | Economic Instance |
|---|---|---|---|
| Unrouted flow | No n_i satisfies ValidRouting | Unrouted consequence | Uncollected debt |
| Misrouted | ValidRouting holds but K_i small relative to other candidates | Scapegoating | Wrong-party billing |
| Weak coupling | μ(Σ_i) → 0 despite valid routing | Hollow accountability | Theater settlement |
| False closure | Σ_i fires but W_i ≈ 0 | Symbolic apology without repair | Receipt without payment |
| Interface capture | S(Σ; source) varies sharply with source-power | Captured court | Captured regulator |
| Remainder dumping | π_R routed to n_j with K_j ≈ 0 | Blame displacement | Externalities |
| Compression collapse | R^(k) · C^(k)_eff > R^(k)_max | RRL violation | Market panic |
| Operator-conflation | π^(r)_e treated as scalar; required operators occluded | Cost-vocabulary obscuring substantive accountability | Aggregate cost-talk obscuring specific transfer-types |
| Operator-substitution | One operator fired in place of operator the event demanded | Settlement without depletion | Trade without delivery |
| Topological dispersion | Σ_i over many sub-events, none individually meeting θ^(K) | Responsibility laundering | Shell-company structures |

The typology is invariant across specializations; what varies is the substrate-specific instantiation. The diagnostic move is the same in each: identify which formal property is violated, then identify the substrate-specific signature.

---

## 17. Relational Primitives Constraint

For routing to be valid, both field and substrate must satisfy all six relational primitives. Each primitive supports a specific routing condition.

| Primitive | Routing Role | Failure Mode |
|---|---|---|
| P1 (Ontological) | Node identity stable enough to receive routing | Sign has no node to land on |
| P2 (Dynamical) | Node persists through routing duration | Sign decays before work occurs |
| P3 (Geometric/Causal) | Structural path between event and node | Coupling is symbolic but structurally inert |
| P4 (Constraint) | Coupling imposes real proportional constraint | Sign binds nothing or binds too much |
| P5 (Epistemic) | Coupling is legible and renderable as account | Coupling exists but cannot be tracked |
| P6 (Meta-Relational) | Coupling integrates into broader legitimacy | Local coupling damages larger field |

This is invariant across specializations. The substrate must satisfy all six P-conditions for the routing operation to have somewhere to land. CRS-level substrate-health is upstream of any sign-mediated flow domain working at all.

---

## 18. Limits of the Specification

1. **Threshold values θ^(K), θ^(L) are not specified.** They are scale-dependent, stakes-dependent, and specialization-dependent. Empirical calibration requires domain-specific work.

2. **Norms ||·|| in pressure-components are domain-specific.** The structural-pressure norm in epistemic flow is not the structural-pressure norm in agentic flow. The framework treats these as typed-incommensurable.

3. **The integral Z(S, T) is illustrative, not literal.** The triple-product structure is load-bearing; the specific functional form remains open.

4. **Remainder dynamics M, D, U are not directly observable in most systems.** Proxies require domain-specific calibration.

5. **Structural-proximity weighting K_i is itself contested in real cases.** The framework predicts what follows from a given weighting but cannot adjudicate weightings without additional commitments.

6. **The four-fold validity conditions are conjoined, not weighted.** Real systems may have weighted-AND semantics. The framework treats this as open.

7. **Observer-position must be made explicit in any application.** Per Section 3.1, all measurements are observer-relative.

8. **The list of specializations in Section 15 is illustrative, not exhaustive.** The framework predicts that any sign-mediated flow domain has the same operator structure but does not claim to have enumerated all such domains.

These limits mark where the model meets the empirical surface and requires domain-specific work. The framework's claim is that the operator structure is invariant across these domains; the parameter values and functional forms are domain-variable.

---

## 19. Summary

The general operation beneath Signal as Bias Field, Power as Relational Field Coherence, Justice Across Scales, TC/EO, AOMI, MMPS, Flow Operators, Sign-Mediated Accountability, and Consequence Routing is **sign-mediated flow routing**: the directed flow of typed signal-pressure through closure events that produce stable sign-artifacts, into substrates with operator-typed flow-receiving capacity, with component-wise and operator-wise conservation, multi-source routing-curvature, and time-evolving remainder dynamics.

What this specification adds at the higher abstraction layer:

1. **The flow-gating move**: sign-formation is the structural prerequisite for governance over flow. Unsigned flow cannot be routed because it cannot be seen.
2. **Cross-specialization invariance**: the operator structure is the same across agentic, economic, epistemic, communicative, relational, and political flow domains. Specializations differ in sign-types, substrate-types, and characteristic failure surfaces, not in operator structure.
3. **Integrity as a general property**: justice is the integrity property of the agentic specialization. Each specialization has its own integrity property with the same triple-product structure.
4. **Cross-substrate routing chains**: flow events that cross specialization-boundaries inherit the failure-modes of each substrate they traverse. The framework predicts characteristic cross-domain failure propagation.
5. **TCL constants as universal thresholds**: the substrate-side operator-thresholds apply across specializations because the operators themselves are universal.

Consequence Routing is the worked-out agentic specialization. Other specializations are predicted by the framework and remain to be derived in their own documents. The relationship is: general framework predicts specialization-structure, specialization-documents derive the domain-specific details.

This is a structural specification with deliberately marked limits. The operator is invariant; parameter values, functional forms, and specialization-instantiations are domain-variable. The framework's signature commitment is operational rigor sufficient to make failure modes diagnostically tractable across substrate-domains, not premature closure on any one of them.
