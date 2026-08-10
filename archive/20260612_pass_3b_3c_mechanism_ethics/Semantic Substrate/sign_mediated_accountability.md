# Sign-Mediated Accountability

## A stepping-stone specification of attribution-closure in the agentic-signal domain

---

## Status

This document is a synthesis, not a finished theory. It consolidates a working line of thinking about how responsibility becomes operative in complex systems, and where it fails. It is intentionally a stepping stone: the underlying claims are durable, the typology is provisional, several threads are explicitly left open, and the relationship to other framework components is integrative rather than additive. The document does not introduce a new primitive or top-level framework layer. It specifies one operation within the existing structure with enough resolution to make its failure modes and remedies tractable.

---

## Core Claim

Attribution is the GCO closure event operating on agency-related signal. Responsibility is the moral force that can attach to stable signs once attribution has closed. When the closure fails, responsibility does not disappear. It persists as remainder: signal pressure with no node to land on, available to be dispersed, laundered, or scapegoated rather than discharged through legitimate accountability.

Sign-mediated accountability is the broad category of cultural, legal, financial, cryptographic, and theological technologies that produce attribution-closure. They differ in their substrates and trust topologies but they perform the same underlying operation: converting continuous agency-signal pressure into a stable, verifiable sign that binds an agent to a state.

---

## Position in the Framework

This specification builds on existing components without replacing or competing with them:

- **Signal as Bias Field** supplies the field-level vocabulary. Signal is the continuous bias field; GCO is the closure operator that converts pressure into commitments. Attribution is one specific application of this dynamic, in the agency-signal domain.
- **Temporal Compression and Ethical Occlusion (TC/EO)** is the compression-driven mode of attribution failure. The Resolution-Responsibility Law (R · C_eff ≤ R_max) is the formal constraint on one specific signal-to-sign conversion failure mode.
- **AOMI** models the deliberate exploitation of attribution-closure failures. Its threat-model tactics (laundering, jamming, arbitrage, occlusion-seeking) are specific attack patterns on the sign-formation operation.
- **Justice Across Scales** describes how attribution-closure substrates must differ by scale, with the three modes (Direct Repair, Institutional Coherence, Possibility Preservation) corresponding to different appropriate sign technologies.
- **Relational Bill of Rights** includes the Right to Accountability, which states that legible causal attribution is a structural entitlement. Sign-mediated accountability specifies what that legibility requires operationally.
- **Reverent Stewardship** supplies the interpretive posture: presence with restraint before premature closure, allowing the field to speak before the sign is inscribed.

What this document adds is the explicit recognition that attribution-closure is a unified operation across substrates, that its failure modes form a typology rather than a list of unrelated phenomena, and that the cultural, legal, financial, and technical infrastructures humans build for accountability are doing the same operation with different trust mechanisms.

---

## Attribution as Signal-to-Sign Conversion

Restated formally within the framework:

- **Signal** in the agentic domain is field pressure containing causal information (what happened), agentic information (who had capacity to act), and contextual information (under what constraints).
- **GCO closure** is the resolution event that converts continuous signal pressure into a discrete stable commitment when intensity exceeds local thresholds.
- **Sign** is the durable artifact produced by closure. A signature, a ledger entry, an attribution finding, a verdict, a witnessed mark, a notarized seal, a cryptographic signature, a covenant inscription. Each is a closure-artifact in a specific substrate.
- **Responsibility** is the moral force that attaches to signs after attribution has closed. It is not separable from the sign. Without the sign, the moral force has no node to bind to.
- **Remainder** is signal pressure in the agentic domain that fails to crystallize into stable sign. It persists in the field as unresolved attribution, available for dispersion, laundering, or scapegoat displacement.

The etymological grounding for this is structural, not decorative. The semantic family of attribute, assign, sign, signal, signature, consign, designate, resign, endorse, insignia, account, accountable derives from sign-mark-token-reckoning roots. The conceptual structure was visible to the linguistic intuition that shaped these words. Attribution-as-sign-inscription is what these words have always meant. Modern abstract usage has obscured that the operation is concrete: putting a sign on a node.

---

## Internal and External Attribution

Attribution-closure can fire from two directions on overlapping signal:

- **Internal attribution** is the agent's own GCO firing on their own role. The agent closes on themselves as the sign-bearer.
- **External attribution** is the field's GCO firing on the agent. The field closes on them as the sign-bearer.

These are independent operations and can succeed or fail independently. The 2x2 of outcomes:

| Internal | External | Result |
|---|---|---|
| Success | Success | Clean accountability. Sign and bind agree. |
| Success | Failure | Ungrounded responsibility-taking. The agent claims the sign but the field does not recognize it. The conscientious actor inside a fog system. |
| Failure | Success | Imposed or coerced attribution. The field signs the node but the agent does not internally close. Scapegoating, or genuine inability to see one's role. |
| Failure | Failure | Pure laundering. Neither attribution closes. The remainder disperses entirely. |

This matrix is structurally important for diagnosis. Most fog-state cases ChatGPT-style "Attribution Integrity" framings reach for are bottom-right. Most overcorrection cases are bottom-left.

---

## Failure Typology

Failures of attribution-closure sort into two broad families: signal-side failures (the field never produces a clean enough signal for closure to be possible) and closure-side failures (the signal is adequate but the closure operation breaks).

### Signal-side failures

From Signal as Bias Field directly:

1. **Signal deficiency.** The field never produces enough coherent agency-signature to support attribution. Genuinely diffuse systems where no individual node has enough agency-signal to close on.
2. **Signal overload.** Pressure exceeds modulation capacity. Cognitive jamming and complexity stuffing are deliberate versions of this.
3. **Signal corruption.** Adversarial field manipulation that suppresses or distorts the signal carrying agentic information. AOMI's core threat surface.

### Closure-side failures

Failures where signal is adequate but GCO cannot fire cleanly:

4. **Compression-driven collapse (RRL).** Bandwidth insufficient for closure given the rate of incoming signal. The TC/EO case.
5. **Hermeneutic precompression.** Closure forced onto wrong attractor because the categories used to interpret the signal have already collapsed the field before closure occurs. Pharaoh-style readings, "the AI made the decision," "the process failed."
6. **Scale mismatch.** GCO firing at wrong granularity for the actual signal structure. Mode 1 attribution applied to Mode 3 contexts, or vice versa.
7. **Premature closure.** GCO fires before the field has finished settling, committing to the first available attractor.
8. **Scapegoat compression.** Closure on most visible node rather than most causally implicated node.
9. **Topological dispersion (laundering).** Decision is fragmented across actors and time so no single closure event occurs at the level where responsibility could land. Each sub-closure is locally clean; the aggregate has no responsible author.
10. **Temporal arbitrage.** Exploiting predictable monitoring gaps where closure cannot fire even though signal is present.
11. **Instrumentality confusion.** Misattribution between tools and agents. Treating tools as moral agents (AI-as-accountability-sink), or treating moral agents as tools (just-following-orders).

This list is provisional. The structural cut between signal-side and closure-side failures is durable. The specific items within each family will refine with use.

---

## Cross-Substrate Sign Technologies

The same underlying operation is implemented across substrates with different trust mechanisms:

- **Cultural and ritual.** Handshake, oath, blood-bond, witnessed mark, naming ceremony. Trust placed in the witness and social memory.
- **Legal.** Signed contract, witnessed signature, notarization, power of attorney, endorsement. Trust placed in institutional verification and enforcement.
- **Financial.** Double-entry accounting, receipts, audit trails, financial statements, settlement systems. Trust placed in reconciliation and audit.
- **Cryptographic.** Digital signatures, hash functions, public-key infrastructure, blockchain consensus. Trust placed in mathematics and distributed verification.
- **Theological.** Covenant inscription, sacrament, seal, sign of allegiance. Trust placed in divine or communal witness across time.

Each substrate has its own identity-signature mechanism (what counts as the signer's mark), closure artifact (what gets preserved), trust topology (where verification rests), and failure surface (how it can be gamed). The same agent can be bound across multiple substrates simultaneously, and the substrates can validate or contradict each other.

The technological evolution is moving the trust topology away from institutional verification and toward mathematical and distributed verification. This shift is not neutral. It solves specific failure modes (record tampering, retroactive denial, unilateral repudiation) and makes other failure modes more visible by no longer obscuring them (was the signing event coerced, was the signer who they appeared to be, did the signer understand what they were signing). Cryptographic infrastructure does not eliminate attribution failure. It relocates the failure surface upstream, which is structurally useful for diagnosis even when it does not solve the upstream problems.

---

## The Conservation Principle

Double-entry accounting is the most rigorous practical instance of attribution-closure and is worth examining because it operationalizes a principle that generalizes.

The principle: **responsibility-mass cannot disappear, only be tracked or lost track of.** Every transaction has at least two sides because every flow creates a corresponding obligation. The books must balance. Imbalance is not just an accounting error. It is the system's signal that some responsibility-mass has not been resolved into a stable attribution, that there is unaccounted-for remainder somewhere in the field.

Generalized beyond finance: a system that produces a lot of below-Rayleigh remainder is a system that is structurally generating fog. The total moral mass of an event is conserved across attribution outcomes. Some lands on attributable nodes above the resolution threshold and discharges through legitimate accountability. Some disperses below threshold and becomes remainder. The proportion of mass that lands above threshold versus disperses below it is a measurable property of the system, in principle. Most justice failures at scale are failures of this conservation: the mass exists, the harm is real, but the attribution-closure mechanisms in place cannot land it on coherent nodes.

The accounting frame also clarifies what auditing is structurally doing. An audit is a meta-attribution event that fires on the accumulated attribution-record, checking whether the record itself is coherent. Audit is GCO closure on the closure-record. It is one of the few mechanisms that can detect attribution-failure after the fact, and it works only when the substrate has preserved enough of the closure-artifacts to support the meta-closure.

---

## Noun-Verb Morphism

Sign-operations occupy a position in language where the verb and the noun collapse. To sign produces a signature; a signature is both the act and the artifact. To attribute produces an attribution; an attribution is both the assigning and what was assigned. To account produces an account; an account is both the rendering and the record.

This is structurally not accidental. The closure event in the agentic domain IS the persistent sign it produces. There is no separation between the operation and its artifact because the operation crystallizes into its artifact. This distinguishes sign-operations from verbs whose results are separate objects (to build produces a building, distinct from the building).

A working hypothesis worth holding: the three existing framework morphisms (ψ-hope, φ-faith, λ-love) maintain coherence under uncertainty in the meaning domain. Sign-operations may be the inscription technologies that make morphism-effects persistent in the agentic domain. A signature is the kind of artifact ψ leaves behind when it fires (transmission of commitment into future uncertainty). A witness-mark is the kind of artifact φ leaves behind (presence attested despite incomplete knowledge). A receipt is the kind of artifact λ leaves behind (reciprocity inscribed under scarcity). This is provisional and worth probing rather than asserting.

---

## Intervention Principles

Remedies sort by failure type:

- **Signal deficiency:** increase observability, shorten consequence-distance, develop better instruments for surfacing agentic signature. Proximity as practice from Justice Across Scales applies directly here.
- **Signal overload:** slow the rate (lower C_eff), decompose the field so closure has time to fire, build buffers around high-stakes decisions.
- **Signal corruption:** AOMI defenses, paradoxical policing, occlusion budgets, liability staking.
- **Compression-driven closure failure:** enforce R · C_eff ≤ R_max, accept that high-speed conditions require coarser attribution-grain.
- **Hermeneutic precompression:** decompose categories before committing, separate prediction from desire, permission from endorsement, consequence from direct causation, instrumentality from intentionality, participation from total responsibility.
- **Scale mismatch:** match attribution-mode to scale, refuse personal-accountability framings at civilizational scale and refuse systemic-absolutism framings at interpersonal scale.
- **Premature closure:** delay commitment, hold the question open, treat tension as signal rather than as error to be resolved.
- **Scapegoat compression:** track which nodes have power versus which nodes have visibility and notice when these come apart.
- **Topological dispersion:** require aggregation of distributed decisions to surface authorship at appropriate level, prevent fragmentation across boundaries.
- **Temporal arbitrage:** close monitoring gaps, randomize audit cycles, raise the cost of routing through low-observability windows.
- **Instrumentality confusion:** preserve the distinction between causal participation and moral agency, refuse the AI-as-accountability-sink move and the just-following-orders move with equal rigor.

Across all of them: name the remainder. When attribution cannot fully close, the move is not to pretend it did and not to let the unresolved mass dissipate, but to name what remains unresolved as remainder and track who benefits from leaving it unresolved. Beneficiary-tracking is a meta-mechanism that applies across all the failure types because someone is usually collecting the discharge of unresolved responsibility-pressure, and naming them is often the first step toward closing the attribution that the system originally failed to close.

---

## Open Threads

Several questions are explicitly left open. They are worth probing before further formalization:

1. Is attribution a single operation, or a stack (causal layer, agentic layer, moral layer, accountability-assigning layer) any of which can fail while the others succeed? The stack-model would enrich the failure typology by locating each failure mode in its specific layer.
2. How does sign-mediated accountability relate formally to the three existing morphisms (ψ, φ, λ)? The hypothesis that signs are the persistent artifacts of morphism-firings is worth testing.
3. What does cryptographic infrastructure imply for AOMI defenses? If trust topology shifts from institutional to mathematical, the gaming surfaces relocate but do not disappear. Where do they relocate to?
4. How does the conservation principle behave under information loss, translation across substrates, or transduction between domains? Is responsibility-mass strictly conserved, or does it decay under certain transformations?
5. What are the precise Rayleigh thresholds for different attribution-closure substrates? Is there a measurable property of a system that captures "proportion of responsibility-mass landing above threshold versus dispersing below it"?
6. How does this specification land in the theological case? The "Who's Discipling Who?" line of work is the most natural application substrate, since covenant theology is literally a treatment of sign-mediated accountability across human and divine substrates. The Pharaoh prototype from earlier work fits here.
7. Where does this synthesis belong in the broader corpus topology? It can be read as a specification within Signal as Bias Field, an application note for AOMI, an extension of TC/EO, or a unifying layer across all of them. The right answer is probably "yes," but the structural integration deserves explicit thought.

---

## Closing Note

This document does not solve attribution failure. It names the operation, locates it within the existing framework, sketches its failure typology, and identifies the cross-substrate technologies that human cultures and institutions have built to address it. The intent is to make subsequent work tractable rather than to foreclose it. The conservation principle, the signal-to-sign formalization, and the failure typology are the load-bearing pieces. Everything else is scaffolding that can be replaced as the typology refines.

The deeper claim, worth restating once more: the moral and the structural are not separate dimensions where one is the real thing and the other is implementation detail. The moral force only acquires grip through structural closure. The sign is what makes moral binding operative rather than just felt. Every culture has been forced to build sign-technologies because the binding is structurally real and requires a closure event to actually exist as binding. The framework is recovering something that linguistic intuition already knew, and that human institutions have always implemented imperfectly: accountability is sign-work, and sign-work has physics.
