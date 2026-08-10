Consequence Routing
A formal specification of the operator unifying Signal, Power, and Justice
Status

This document is an extension of and synthesis across Signal as Bias Field, Power as Relational Field Coherence, Justice Across Scales, Temporal Compression and Ethical Occlusion (TC/EO), AOMI, MMPS, Flow Operators, and Sign-Mediated Accountability. It identifies a shared operator that these documents have been circling from different angles, formalizes it within the existing corpus vocabulary, and proposes specifications that address limitations in prior first-pass formulations.

The shared operator is consequence routing: the directed flow of agentic field pressure through sign-interfaces into substrates with operator-typed flow-receiving capacity. Justice is the integrity of this operation across scales. Power is its curvature. Signals are its inputs. Signs are its interfaces. Substrates are its sinks. Remainder is what fails to route.

This is a structural specification, not a complete theory. Several formalizations are explicitly marked as illustrative-where-empirical-anchoring-is-incomplete. Two structural commitments from Flow Operators are carried throughout: observer-position-dependence of all flow measurements, and decomposition of colloquial "cost" into six structurally distinct operators. The goal is operational rigor sufficient to make failure modes diagnostically tractable, not premature closure.

1. Position in the Existing Formal Substrate

The framework substrate from Signal as Bias Field stands:

S = ⟨ E, R, C, X, Σ ⟩

where E is the entity set (P1), R is the relation set typed by P2 through P6, C is the constraint structure (P4), X is the current closure state, and Σ is the signal field.

Within Σ, define Σ_a ⊂ Σ as the agentic-signal subspace: the field components carrying information about action, agency, capacity, causation, obligation, and benefit. Consequence routing operates on Σ_a.

The GCO from prior formulations remains the closure operator:

GCO = Y(λf. λx. f(f(x)))

A routing event is one instance of GCO firing on agentic signal. Each event has the structure:

GCO_a : Σ_a × N → Σ_W × W × Π_R

where N is the set of available nodes (candidate substrate-bearers), Σ_W is the space of sign-artifacts produced, W is the space of substrate-work, and Π_R is the space of remainder.

This positions consequence routing as a specialization of the general GCO dynamic to the agentic subspace, not as a separate operator.

2. Observer Position and Flow-Operator Foundation

This specification inherits two structural commitments from Flow Operators that are operative throughout.

2.1 Observer Clause

Field-substrate flow does not exist as one canonical thing prior to being observed from a position. From inside the routing system the flow appears as expenditure. From the receiving substrate the same flow appears as uptake, work, nutrition, pollution, or waste depending on boundary state. From a third-party observer it appears as a coupling event. There is no view-from-nowhere where the flow has a single description.

Operational consequence: all measurements in this specification (routing distributions, interface properties, curvature, remainder accounting) are observer-relative. The framework specifies what follows from a given observer position; it does not claim view-independent values. Any account of a routing event requires explicit observer-position. "True" accounts are not available; only privileged-position accounts and meta-accounts of how positions relate.

This is the MPDC commitment applied to the consequence-routing domain specifically.

2.2 Flow-Operator Decomposition

The colloquial term "cost" is a degraded vocabulary collapsing six structurally distinct operations. Per Flow Operators, these are:

Operator	Etymology	Type	Function
Stance-with	com-stare	Rate-quantity, continuous	Expenditure maintaining persistence against drift
Stance-against	with-stand	Threshold-quantity, capacity	Refusing transfer the boundary should not admit
Settlement	pacare (pay-as-pacify)	Event-quantity, bidirectional	Reconciliation transfer closing tension between systems
Depletion	expendere (weigh out)	Stock-quantity, drawdown	Funding rate of operation from reservoir
Trade	ex-cambiare	Pair-quantity, reciprocal	Bidirectional flow at admissibility regime
Consequence-receipt	con-sequi	Result-quantity, located by topology	Downstream landing as nutrition, work, pollution, or waste

These are not interchangeable. A consequence-routing event demands specific operators from specific substrates, and substrates have specific operator-capacities. The framework treats "cost" as a degraded vocabulary for this operator-structure; the operator decomposition is the analytic primitive. The Boundary 2x2 from Flow Operators (inward-accepts: nutrition, outward-accepts: work, inward-releases: pollution, outward-releases: waste) governs consequence-receipt mode at each substrate boundary.

3. Decomposition of Consequence-Pressure

Prior formulations treated consequence-pressure as a scalar. This is the central formal limitation. Consequence-pressure is structurally multi-component, and routing failures often occur on specific components while others route successfully.

For event e generating pressure π_e ∈ Σ_a, decompose:

π_e = ( π^(c)_e , π^(α)_e , π^(m)_e , π^(r)_e )

where:

π^(c)_e (causal component, P3-dominant): information about what occurred and the causal structure linking event to actors
π^(α)_e (agentic component, P2/P4 mix): information about which nodes had capacity, awareness, freedom, and constraint conditions at the time of the event
π^(m)_e (moral component, P5/P6 mix): the field demand for response, repair, recognition, or constraint
π^(r)_e (resource-flow component, P4-dominant): the demand for specific flow operations to discharge the consequence. Not a scalar cost-demand. A vector across the six flow operators from Section 2.2: which operators are required, at what rates or thresholds, from which substrates, over what timescales.

Each component lives in its own typed subspace and conserves independently. This is the key formal correction: conservation operates component-wise, not as scalar arithmetic.

Diagnostic value of the decomposition:

Cases where π^(c) routes cleanly but π^(m) fails: "everyone agrees what happened, no one agrees it was wrong."
Cases where π^(α) is ambiguous but π^(c) and π^(r) route: "we know what happened and the cost, we don't know who could have prevented it."
Cases where π^(m) routes but π^(r) fails: "the institution acknowledged the harm but did nothing about it."
Cases where π^(c) is suppressed but π^(α) routes: "they punished someone before establishing what happened."

These are distinct pathologies. Treating consequence-pressure as scalar collapses them.

4. Node Capacities

Each candidate routing node n_i ∈ N is characterized by typed capacity vectors, not scalar properties.

n_i ↦ ( B_i , L_i , K_i , P_i , T_i , I_i )

where:

B_i: flow-receiving capacity, a vector across the six flow operators from Section 2.2: stance-with capacity (continuous rate at which the substrate can sustain persistence-maintaining flow), stance-against capacity (threshold above which the substrate can no longer refuse incoming flow), settlement capacity (event-quantity availability for loop-closing transactions), depletion capacity (stock-drawdown availability from reservoirs), trade capacity (admissibility regime for reciprocal flow), consequence-receipt capacity (substrate metabolism for landed flow as nutrition, work, pollution, or waste). Each operator-capacity is separately measurable and not substitutable for the others.
L_i: legibility capacity (P5). The node's capacity to be rendered as an account: records, testimony, narrative coherence, audit support.
K_i: causal-proximity vector to event e. A typed metric in causal space (P3) capturing whether n_i is direct cause, contributory cause, beneficiary, witness, or causally distant.
P_i: response-power. Capacity to actually receive, process, and act on incident agentic signal. Includes agency, awareness, constraint conditions, freedom of action.
T_i: temporal persistence. How long the node will remain available to bear consequence (relevant when routing across long timescales or across institutional reorganization).
I_i: interface conditions specific to this node (legal standing, institutional position, ritual eligibility, contractual relations).

A node's capacity profile determines which routing events it can validly host. A substrate may have abundant depletion capacity (cash reserves) but zero stance-with capacity (no ability to sustain ongoing relational engagement); it can pay a fine but cannot host long-term consequence. A substrate may have stance-against capacity (refuses incoming pressure) but no settlement capacity (cannot close loops); it can resist but cannot reconcile. These are diagnostic distinctions that scalar "cost-bearing" hides.

5. Coupling Conditions

A routing closure Σ_i firing on node n_i requires four conditions simultaneously, not one threshold:

ValidClosure(Σ_i, e, n_i) :=
    Causal(e, n_i)
  ∧ Agency(e, n_i)
  ∧ Legibility(e, n_i)
  ∧ Substrate(e, n_i)

where each condition is its own typed predicate:

Causal(e, n_i): K_i(e, n_i) above causal-coupling threshold θ^(c). The node must be sufficiently proximate in the causal field that routing to it is not arbitrary.
Agency(e, n_i): π^(α)_e admits n_i. The agentic-signal component is compatible with this node having had relevant capacity at the time of the event.
Legibility(e, n_i): L_i ≥ θ^(L)(scale, stakes). The node must be renderable as account at the appropriate resolution for the scale and stakes involved.
Substrate(e, n_i): B_i ∩ supp(π^(r)_e) ≠ ∅. The node must have flow-receiving capacity in the specific operator-dimensions demanded by the resource-flow component. The intersection is taken in operator-typed space; depletion-demand is not satisfied by stance-with capacity, settlement-demand is not satisfied by trade capacity, and so on.

This four-fold formulation makes failure-mode diagnosis precise. Each failure mode corresponds to a violation of one or more conditions:

Failure	Failed Condition(s)
No valid attribution possible	All four fail
Scapegoating	Causal fails, others succeed
Just-following-orders	Agency fails, others succeed
Procedural fog	Legibility fails
Judgment-proof defendant	Substrate fails
Symbolic accountability	Substrate fails despite other three succeeding
Topological laundering	Causal partially succeeds across many nodes, none above θ^(c) individually

This replaces the single inequality σ_a(N_i) ≥ θ_i from the first-pass with a structured conjunction whose violations have distinguishable diagnostic signatures.

6. Sign-Interfaces as Typed Operators

A sign-interface Σ is the contact surface where field-pressure couples to substrate. The interface is itself an object with measurable properties.

For interface Σ with incident pressure π:

Σ : π_incident → ( π_transduced , π_reflected , π_dissipated , π_leaked )

where:

π_transduced: pressure that crosses into substrate-work
π_reflected: pressure bounced back into the field
π_dissipated: pressure converted to waste-heat (friction without work)
π_leaked: pressure that crosses interface but does not materialize as work

Conservation at the interface:

||π_incident|| = ||π_transduced|| + ||π_reflected|| + ||π_dissipated|| + ||π_leaked||

This is component-wise, as before. The conservation also holds operator-wise: a settlement-demand that crosses an interface arrives at the substrate as settlement-flow, not as depletion-flow. The interface does not transmute operator-type. Interfaces that appear to transmute operator-type (e.g., a policy commitment that converts to nothing more than a budget line item) are actually performing leakage on one operator while permitting transduction on another.

6.1 Interface Properties

Define dimensionless properties of an interface, each potentially operator-typed:

Permeability μ(Σ) ∈ [0,1]: fraction of incident pressure that transduces. μ = ||π_transduced|| / ||π_incident||
Friction φ(Σ) ∈ [0,1]: fraction dissipated. φ = ||π_dissipated|| / ||π_incident||
Reflectivity ρ(Σ) ∈ [0,1]: fraction reflected.
Leakage λ(Σ) ∈ [0,1]: fraction leaked.

These sum to unity by conservation: μ + φ + ρ + λ = 1.

An interface can be permeable to settlement but reflective to depletion-funding, or vice versa. An institutional apology interface (the public statement) typically has high settlement-permeability and low depletion-permeability: the symbolic loop closes, the resources do not flow. The operator-typed version of these properties is what makes diagnosis precise. The scalar permeability "this apology was hollow" decomposes into "settlement-permeability was high, depletion-permeability was zero, and the field experienced this as theater-interface."

A healthy interface has high μ and low λ across the operators the routing event actually demanded. A captured interface has high ρ for some sources and low ρ for others (selective reflection). A theater-interface has low μ on the operators that matter for substrate work, regardless of how high μ is on the symbolic operators.

6.2 Selectivity

Real interfaces are not uniform: their properties depend on the source of incident pressure. Define the selectivity tensor:

S(Σ; source, target) = μ(Σ) | source, target

A captured interface has S that varies sharply with source (pressure from powerful sources reflects, pressure from less-powerful sources dissipates). A neutral interface has S approximately invariant.

This is where AOMI's threat model lives: adversarial actors exploit S to route pressure away from themselves and toward weaker substrates.

5.3 Permeability Estimation

Permeability is in principle measurable, though not always practical. Candidate proxies:

Ratio of complaints filed to documented resolutions
Ratio of policy commitments announced to policy commitments resourced
Ratio of audit findings to enforcement actions
Ratio of harm reports to substrate-changes (personnel, budget, structure)

These are rough but they give the interface property empirical content rather than leaving it as pure abstraction. They are also fundable as research operations independent of the framework.

7. Conservation Law

The central formal claim, generalized from the implicit conservation principle in accounting and from the first-pass conservation gesture:

Component-wise conservation of consequence-pressure.

For event e with pressure components π^(k)_e (k ∈ {c, α, m, r}) routed through closures {Σ_i} producing work {W_i} and remainder π_R:

||π^(k)_e|| = Σ_i ||W^(k)_i|| + ||π^(k)_R||      for each k ∈ {c, α, m, r}

The norm ||·|| is the appropriate measure in each typed subspace and is not interchangeable across components.

The resource-flow component π^(r) conserves further within itself across the six flow operators. For operator j ∈ {stance-with, stance-against, settlement, depletion, trade, consequence-receipt}:

||π^(r,j)_e|| = Σ_i ||W^(r,j)_i|| + ||π^(r,j)_R||

Settlement-demand conserves separately from depletion-demand conserves separately from stance-with-demand. An event can be settled (loop closed symbolically) without depletion (no reservoir drawn down) without stance-with (no continuous attention sustained). Each operator-conservation must hold for the resource-flow conservation to hold, and the resource-flow conservation must hold along with the other three component-conservations for routing to be valid.

Operational reading: the moral-pressure component of an event is conserved separately from the causal-pressure component. A system can route the causal mass cleanly (everyone knows what happened) while losing the moral mass entirely (no one bears the moral weight). Similarly, a system can route the settlement-operator of resource-flow (apology issued, loop appears closed) while losing the depletion-operator (no resources drawn down for repair). Both layers of conservation must hold for justice to be operative; satisfying one without the others produces partial routing with characteristic remainder signatures.

This is the law that double-entry accounting operationalizes in the financial domain, where it tracks one operator (settlement-with-depletion) within one pressure component. The generalized version tracks all four pressure components across all six flow operators. It is the formal expression of the principle that responsibility-mass cannot disappear, only be tracked or lost track of.

8. Generalized Resolution-Responsibility Law

The original RRL from TC/EO:

R · C_eff ≤ R_max

This is a one-component statement. Generalize to multi-component pressure:

R^(k) · C^(k)_eff ≤ R^(k)_max       for each k ∈ {c, α, m, r}

where:

R^(k) is the resolution at which routing is attempted for the k-component of pressure
C^(k)_eff is the effective compression on the k-component (which need not equal C_eff for other components)
R^(k)_max is the maximum resolution sustainable for that component given current system state

Components have different compression dynamics. Causal compression in a fast-moving system can be severe while moral compression is mild (the events outrun causal investigation but the moral pressure persists slowly). Conversely, moral compression in social-media-driven discourse can be severe while causal compression is mild (the moral judgment fires faster than the causal record is established).

This generalization predicts cases where one component of routing fails under compression while others succeed, producing characteristic partial-routing remainder.

9. Power as Routing Curvature

Power as Relational Field Coherence establishes power as the capacity to influence what gets repeated. In the routing model, power manifests as curvature of the routing manifold: deviation from uniform routing toward causally-implicated nodes.

For a routing event with candidate nodes {n_1, ..., n_m} with response-powers {P_1, ..., P_m} and causal-proximities {K_1, ..., K_m}:

Define the just-routing baseline as routing probability proportional to causal-proximity weight:

P_just(routing → n_i) = K_i / Σ_j K_j

Define the actual routing distribution as observed:

P_actual(routing → n_i)

Power curvature is the divergence between actual and just-baseline distributions:

κ(Σ; event) = D( P_actual || P_just )

where D is an appropriate divergence (KL-divergence is one candidate; others are possible).

A power-neutral system has κ ≈ 0 (routing follows causal weight regardless of power). A power-curved system has κ > 0 (routing deviates systematically toward power-protected configurations).

This makes "power bends consequence-routing" a measurable claim, in principle, given access to the routing distribution and a defensible causal-weighting.

The Power document's claim that internal repetition dominates external maps onto this as follows: in a captured system, the routing distribution is shaped by the system's internal power gradients (who repeats what within the institution), not by the external causal field. The curvature κ measures the strength of this internal override.

10. Remainder Dynamics

Remainder is not a static residue. It has its own dynamics governed by system state.

For total remainder vector π_R(t) at time t:

dπ_R/dt = -M(π_R, S) + D(t) + U(t)

where:

M(π_R, S): metabolization rate. Function of remainder and substrate-health. Captures the rate at which the system legitimately discharges remainder through delayed routing, repair, memory-work, or honest acknowledgment.
D(t): displacement input rate. New remainder generated from active displacement events (laundering, scapegoating, dumping).
U(t): unrouted input rate. New remainder generated from events whose pressure failed to route at all.

System characterization:

Healthy regime: M > D + U on average. Remainder decreases over time. The system is digesting its consequence-mass faster than it generates new remainder.
Stationary regime: M ≈ D + U. Remainder is approximately constant. The system is in metabolic equilibrium with its accumulation.
Degrading regime: M < D + U. Remainder accumulates. The system is generating more displaced and unrouted consequence than it can metabolize.

This is the formal expression of MMPS dynamics applied to consequence routing. A degrading regime predicts eventual phase transition: when accumulated remainder exceeds substrate capacity, the system either collapses, reorganizes, or exports remainder catastrophically (revolution, civil collapse, systemic-trust breakdown).

Caveat: M, D, U are not directly observable in most systems. The model has empirical content but the parameter estimation is open. Proxies are possible (rate of public scandal, rate of legal settlement, rate of policy reversal) but require domain-specific calibration.

11. Justice as System-Level Property

Justice is not a property of a single routing event. It is a property of a system across time. A single just verdict in a fundamentally captured system is not a just system. A single corrupt verdict in a generally just system is not a corrupt system. The diagnostic level is system-temporal.

Define justice-integrity J(S, T) of system S over time interval T as the time-integrated product of three component properties:

J(S, T) = ∫_T α(t) · β(t) · γ(t) dt

where:

α(t): routing-validity. Fraction of routing events at time t satisfying the four coupling conditions.
β(t): closure-honesty. Fraction of closures that produce actual substrate-work, weighted by the resource component of incident pressure. Low β indicates high leakage and theater-interfaces.
γ(t): remainder-stewardship. Honesty index of how remainder is handled. High when remainder is named and tracked, low when it is hidden, displaced, or dumped onto vulnerable substrates.

Note: α, β, γ are themselves functional and not directly measurable as point values. The integral notation is illustrative of the structural form, not a literal formula. The point is:

Justice is a triple-product of distinct properties, not a single measure.
All three must be nonzero for the integrand to be nonzero (failure in any one factor collapses the product).
Justice integrates over time; episodic exceptions and persistent patterns differ structurally.

This addresses the limitation in the first-pass that conflated "fair outcome" with "just system." A just system has high α and β and γ sustained over time, not single moments of correct routing.

12. Cross-Lens Validation

Signal as Bias Field specifies four complementary lenses on the substrate: Graph, Dynamical, Information, and Localization. Consequence routing manifests in each.

Graph lens. Routing pathways appear as directed edges from event-nodes to substrate-nodes through interface-nodes. Edge weights encode coupling strength (composite of the four conditions). Captured interfaces appear as edge-weight asymmetries that violate the symmetry expected from causal weight alone. Topological laundering appears as path fragmentation: many short edges, no long path that aggregates the routing.

Dynamical lens. Routing manifests as state transitions in the substrate. A routing event is a transition where substrate state X changes to absorb the consequence-pressure. Failed routing appears as field pressure that persists without inducing substrate transition. Hysteresis at this lens captures the irreversibility of certain routings (criminal record, financial settlement, public verdict) and the reversibility of others (apology, promise, intention).

Information lens. Routing requires sufficient signal-to-noise ratio in the agentic-signal subspace. Below threshold, attribution distinctions collapse (Rayleigh failure). Above threshold, distinctions hold. Routing-validity α(t) is bounded by the signal quality available to the system. Improving observability (more records, better forensics, longer feedback windows) raises the achievable α.

Localization lens. Routing happens at specific scale-patches. A given routing event is valid at one scale and may be invalid at another. Personal-scale routing (apology, direct repair) doesn't compose to civilizational-scale routing (reparations, structural reform) without explicit scale-transition operators. Scale-mismatch is a routing failure: applying personal-scale routing tools at civilizational scale produces interface inadequacy, and vice versa.

Cross-lens disagreement is diagnostic. If routing appears successful at Graph lens (edges exist) but failed at Dynamical lens (no substrate transition), the interface has high leakage. If routing appears successful at Information lens (signal supports the attribution) but failed at Graph lens (no actual edge to substrate), the system has accountability without liability. Each cross-lens disagreement points to a specific failure mode.

13. Failure Modes as Operator Pathologies

Each failure mode from prior documents maps to a specific operator pathology in this framework:

Failure Mode	Formal Signature
Unrouted consequence	No n_i satisfies ValidClosure for any closure event
Misrouted (scapegoat)	ValidClosure(Σ_i, e, n_i) holds but K_i is small relative to other candidates
Overrouting	
Weak coupling	μ(Σ_i) → 0 despite valid closure firing
False closure	Σ_i fires producing sign-artifact but W_i ≈ 0
Interface capture	Selectivity tensor S(Σ; source) varies sharply with source power
Remainder dumping	π_R routed to n_j with K_j ≈ 0
Compression collapse	R^(k) · C^(k)_eff > R^(k)_max for some k
Hermeneutic precompression	π^(α)_e collapsed before reaching interface
Topological laundering	Σ_i over many sub-events, none individually meeting θ^(c)
Temporal arbitrage	T_i scheduled to fall below threshold before closure fires
Power curvature attack	κ(Σ; event) maximized for the adversary's benefit
Operator-conflation	π^(r)_e treated as scalar rather than operator-typed; required operators occluded
Operator-substitution	One operator fired in place of the operator the event actually demanded

Operator-conflation deserves note as a distinct attack surface. When discourse treats consequence-flow as undifferentiated "cost," the specific operator demanded by the event cannot be examined. A routing system can claim "we paid the cost" while having only fired settlement (apology, symbolic loop-closure) with no depletion (no resources actually drawn down). The conflation is what makes the substitution undetectable. Adversarial actors benefit from keeping discourse at the cost-vocabulary level because operator-specific analysis is what would expose the substitution. This is structurally an AOMI tactic operating on the conceptual interface to the framework, not just on the routing system itself.

This makes the failure typology operationally diagnostic. Given an observed routing failure, the framework predicts which formal property must be checked to identify the underlying pathology, rather than offering only descriptive labels.

14. Relational Primitives Constraint

For routing to be valid, both field and substrate must satisfy all six relational primitives. Each primitive supports a specific coupling condition.

Primitive	Routing Role	Failure Mode
P1 (Ontological)	Node identity stable enough to bind	Sign has no node to land on
P2 (Dynamical)	Node persists through routing duration	Sign decays before work occurs
P3 (Geometric/Causal)	Causal path between event and node	Coupling is symbolic but causally inert
P4 (Constraint)	Coupling imposes real proportional constraint	Sign binds nothing or binds too much
P5 (Epistemic)	Coupling is legible and accountable	Coupling exists but cannot be rendered as account
P6 (Meta-Relational)	Coupling integrates into broader legitimacy	Coupling works locally but damages larger field

A substrate with P1 instability (no stable identity) cannot bear binding. A substrate with P3 violations (no causal connection to the event) cannot validly host routing. A substrate with P5 deficits (no legibility) cannot produce accountability even if it bears consequence.

This is why substrate-health (CRS, RBoR) is upstream of any consequence-routing system working. The substrate has to satisfy all six P-conditions for the routing operation to have somewhere to land.

15. Conservation Across Substrate Transitions

A consequence-pressure may need to cross substrate boundaries (legal → financial → social → institutional) to fully discharge. Each transition is itself an interface with its own properties.

Define a routing chain as a sequence of closures:

e → Σ_1 → n_1 → Σ_2 → n_2 → ... → Σ_k → n_k

Conservation across the chain:

||π^(j)_e|| = Σ_i ||W^(j)_i|| + ||π^(j)_R||      for each component j

Component-wise conservation holds across the entire chain, not just at individual closures. A chain that loses moral mass at the first interface cannot recover it at later interfaces; the loss is permanent unless the chain is reconstructed with explicit routing for the moral component.

This explains why complex multi-substrate consequence-routing (corporate harm crossing legal, financial, regulatory, and social substrates) often fails on the moral component while succeeding on the financial component. The legal substrate transduces financial pressure but reflects moral pressure. Subsequent interfaces in the chain inherit the moral remainder without mechanism to route it. The pressure persists in the social substrate as institutional distrust, where it has no formal interface to enter.

16. TCL Constants as Operator-Threshold Locations

The three constants from Temporal Constraint Lamination correspond to specific operator thresholds in the consequence-routing framework. This convergence (originally identified in Flow Operators) provides substrate-side quantitative anchoring complementary to the closure-side Resolution-Responsibility Law.

TCL Constant	Approximate Value	Operator Threshold
Viability floor	~0.757	Depletion limit: reservoir cannot fund stance-with rate. Sustained drawdown past this point collapses the substrate's capacity to maintain ongoing persistence.
Chaos ceiling	~0.930	Stance-against limit: boundary cannot withstand incoming flow. Pressure above this threshold overwhelms the substrate's refusal capacity.
Parametric wall	~0.289	Trade-equivalence limit: reciprocal regime cannot rebalance. Below this point, exchange admissibility breaks down structurally.

Operational reading: routing-validity α(t) is bounded not only by whether the four coupling conditions hold but also by whether the substrate operator-capacities sit within these thresholds. A routing event satisfying all four coupling conditions can still fail if it requires depletion below the viability floor (substrate collapses under sustained drawdown), drives stance-against above the chaos ceiling (boundary fails under incoming pressure), or violates trade-equivalence past the parametric wall (reciprocity becomes structurally impossible).

These thresholds bound the achievable α independent of the routing system's design quality. A perfectly-designed routing system cannot validly route consequence to a substrate whose operator-capacities are exhausted at any of these locations. This is the substrate-side analog to the closure-side Resolution-Responsibility Law: where RRL bounds resolution achievable under compression, the TCL constants bound flow achievable through substrate capacity.

Routing systems that ignore these thresholds produce a characteristic failure: apparent procedural success accompanied by substrate collapse. The closure fires, the sign is inscribed, the work-assignment is made, and the substrate fails to sustain the operation because the operator-load exceeds threshold. This is mechanistically distinct from interface-capture failure (where the geometry was wrong) and from compression-collapse failure (where the resolution was wrong). It is substrate-exhaustion failure, and it has the empirical signature of operator-quantities trending past TCL thresholds in the lead-up to collapse.

The TCL convergence also clarifies the architecture of stewardship under asymmetric coupling. A steward maintains coupling with a substrate operating below the viability floor by routing depletion-flow from a reservoir beyond the dyad. The slow-layer/fast-layer lamination structure that TCL formalizes is the architecture that makes such asymmetric coupling sustainable across operator-thresholds. Routing systems that recapitulate this architecture (slow-layer stewardship over fast-layer substrate fluctuation) inherit TCL's empirical anchoring as a substrate-side bound on what is structurally possible.

17. Limits of the Specification

Several places where this specification is loose and where empirical anchoring is incomplete:

Threshold values θ^(c), θ^(L) are not specified. They are scale-dependent and stakes-dependent. Empirical calibration requires domain-specific work. Different legal systems, organizational contexts, and cultural settings will have different θ functions. The framework predicts the form of the dependence (θ rises with stakes, falls with scale-mismatch) but not the values.
Norms ||·|| in pressure-components are domain-specific. The moral-pressure norm in a small-group context (where reputation is the relevant substrate) is not the same as the moral-pressure norm in a civilizational-scale context (where institutional legitimacy is the relevant substrate). The framework treats these as typed-incommensurable rather than reducible to a common scale.
The integral J(S, T) is illustrative, not literal. Justice-integrity as a time-integrated triple-product captures the structural form, but α, β, γ are functionals whose exact form remains open. The argument is that the integrand must have this product structure (all three factors required, failure in any collapses the product), not that the specific functional form is fixed.
Remainder dynamics M, D, U are not directly observable in most systems. Proxies are possible but require domain calibration. The empirical content of the regime classification (healthy / stationary / degrading) is meaningful but its operationalization needs case-specific work.
Causal weighting K_i is itself contested in real cases. Different causal theories will produce different K_i, and the just-routing baseline depends on K_i. The framework can specify what would follow from a given causal weighting but cannot adjudicate between weightings without invoking additional commitments.
The four-fold coupling conditions are conjoined, not weighted. Treating them as a hard conjunction is a strong claim. Real systems may have weighted-AND semantics (a strong satisfaction of three conditions partially compensates for weak satisfaction of the fourth). The framework treats this as an open empirical question rather than asserting a position.
Observer-position must be made explicit in any application. Per the Observer Clause (Section 2.1), all measurements are observer-relative. The framework specifies what follows from a given observer position; it does not provide view-independent values. Applications must declare observer-position rather than implicitly assuming a god's-eye view.

These limits are not failures of the specification but markers of where the model meets the empirical surface and requires domain-specific work. The framework's claim is that the operator structure is invariant across these domains; the parameter values and exact functional forms are domain-variable.

18. Summary

The shared operator beneath Signal as Bias Field, Power as Relational Field Coherence, Justice Across Scales, TC/EO, AOMI, MMPS, Flow Operators, and Sign-Mediated Accountability is consequence routing: the directed flow of typed agentic-signal pressure through sign-interfaces into substrates with operator-typed flow-receiving capacity, with component-wise and operator-wise conservation, power-induced manifold curvature, and time-evolving remainder dynamics.

The formal specification adds seven things to prior treatments:

Observer-position commitment from Flow Operators, making all measurements explicitly observer-relative.
Six-operator decomposition of "cost" into stance-with, stance-against, settlement, depletion, trade, and consequence-receipt, replacing scalar cost vocabulary throughout.
Multi-component decomposition of consequence-pressure, enabling component-wise diagnostic precision across causal, agentic, moral, and resource-flow components.
Four-fold coupling conditions with distinguishable failure signatures, replacing the single-threshold inequality.
Sign-interfaces as typed operators with measurable properties (permeability, friction, reflectivity, leakage, selectivity), themselves potentially operator-typed.
Generalized Resolution-Responsibility Law operating per-component rather than as scalar constraint, complemented by TCL constants as substrate-side operator-thresholds.
System-level justice as triple-product time-integral of routing-validity, closure-honesty, and remainder-stewardship.

This is a structural specification with deliberately marked limits. The operator is invariant; the parameter values and functional forms are domain-variable. Subsequent work can either tighten the formalization in specific domains (legal, organizational, ecological) or apply the diagnostic typology to specific failure cases without further formalization.