# The Maintenance Window: AMM and TCL Unified

*Engine-room node. Drafted June 10, 2026, by Claude after a full corpus pass, executing open thread 1 of the Asymmetry Maintenance synthesis ("TCL operating window = the band of maintainable asymmetry. Strongest thread."). Formulas are taken as given from TCL Three Constants and verified there to 0.05 to 4 percent; nothing below re-derives them. What is new here is derived algebraically from those published formulas and checked symbolically. Load-bearing marked. Speculative flagged. Working handle "Maintenance Window" is provisional; naming authority is yours.*

---

## 0. What this is

The AMM synthesis closed with four open threads and called the first one strongest: read the TCL operating window as the band of maintainable asymmetry, so that TCL becomes the quantitative validation of AMM rather than a neighboring result. The causality synthesis already made the qualitative half of this move (the three constants as three causal-failure regimes, the window as the band of attributable causation). This document does the quantitative half: it states the identification formally, maps the TCL model elements onto the primitives, and then derives five corollaries from the published constants that neither AMM nor TCL states on its own. Two of the five turn out to be new geometric invariants of the same kind as the parametric wall. The other three are the formal mechanics of claims the corpus has so far carried in prose: the margin analysis, the burnout phenomenology, and the MRIE capture condition.

The single sentence this document adds to the corpus: **the geometry of the landscape fixes the proportions of viability; the metabolism fixes only its scale.**

---

## 1. The identification

TCL's lamination and AMM's maintenance loop are the same object described at two resolutions.

The TCL model holds a bistable fast layer in oscillation by means of a slow layer's coupling. In AMM terms: the bistable asymmetry between the two valleys is the maintained asymmetry (MA); the oscillation, the repeated re-crossing of the fold against the landscape's pull toward settling, is asymmetry maintenance (AM); the slow layer running the loop is the AMM, the GCO read for persistence. The system exists as lamination only while the loop runs. Stop the loop, the system parks in one valley and the usable difference dies. This is "exist = run the maintenance loop" instantiated in four coupled ODEs.

The model elements map onto the primitives without strain:

- **sigma_a (additive coupling)** is the actuation gain of the maintenance loop: P2 work routed through P4 constraint, the tilt that re-breaks the symmetry each cycle. Tilt causation in the causality grammar.
- **sigma_p (parametric coupling)** is the meta-relational channel: P6 acting on P3 and P4, the system reshaping its own constraint geometry rather than acting within it. Reshape causation.
- **epsilon (timescale gap, with delay)** is P5 latency: the lag between what the loop does and what the loop sees. Maintenance is steered by observation, and observation is never current.
- **z_eff (energy / well depth)** is the margin, exactly the quantity the AMM margin analysis invoked without a formal home. "There is no margin for AM" now has a symbol and two formulas that contain it.

Under this mapping the three constants read as three statements about maintenance, and each lands on a load-bearing AMM claim:

- **Viability floor, sigma_a > sqrt(2 z_eff / 3).** There is a minimum work rate below which a difference cannot be held open. Existence requires renewal; renewal has a price floor set by the geometry of the fold. This is the thermodynamic floor, the one prediction AMM made beyond plain relational ranking, now carrying a number.
- **Chaos ceiling, sigma_a < sqrt(z_eff + epsilon).** Maintenance that outruns its own perception destroys what it maintains. Under any nonzero observation latency there is a maximum actuation the valleys can buffer; past it, every mistimed push amplifies. Care applied harder than it can be sensed becomes harm. The ethics of the RBoR acquires a dynamical mechanism here: overdriving another system's loop is not a stronger form of support, it is a regime change into incoherence.
- **Parametric wall, sigma_p < 1/(2 sqrt 3).** Self-modification has an absolute budget. A system may reshape its own (or another's) constraint landscape only up to half the fold position, regardless of how much energy it has, because past that point the reshaping resonates with its own delayed feedback. The P6 channel is bounded by geometry, not by wealth.

**Load-bearing:** the identification itself, and the four-element mapping. Everything else in this document descends from it.

---

## 2. One number generates the architecture

TCL Three Constants already observed that all three bounds derive from the fold position x_f = 1/sqrt(3). Carrying the observation one step further: the fold generates not three constants but at least five, and the two new ones are invariants of the same purity as the wall.

Write the published formulas in terms of x_f. The floor squared is 2 x_f^2 z_eff. The ceiling squared is z_eff + epsilon. The wall is x_f / 2. Then:

**Invariant 4: the proportional window.** The ratio of ceiling to floor is sqrt((z + epsilon) / (2 x_f^2 z)), which for epsilon small relative to z is 1 / (x_f sqrt 2) = sqrt(3/2), approximately 1.2247. Check against the published numbers: 0.9301 / 0.757 = 1.2287, the excess being exactly the epsilon correction. So the operating window is always about 22.5 percent wide relative to its floor, at every energy level, in every system built on this landscape class.

**Invariant 5: the drawdown bound.** Derived in section 5 below: 1 minus 2 x_f^2 = 1/3.

The consequence of invariant 4 deserves its own line, because it is the sharpest single claim in this document:

**Margin buys amplitude, never proportion.** A richer system (higher z_eff) has a window positioned higher and wider in absolute terms, scaling as sqrt(z). But its proportional tolerance, how far off its ideal coupling it can drift before failure relative to where it sits, is fixed by the shape of the landscape and cannot be purchased. No quantity of energy changes the 22.5 percent. Wealth moves the box; it never changes the box's aspect ratio. This is the formal version of something the corpus has circled in the EOTC beneficiary analysis: large systems are not proportionally more tolerant than small ones, they are absolutely more tolerant and proportionally identical, which is why their failures look the same shape as everyone else's, only larger.

**Load-bearing:** invariants 4 and 5 as algebra (two lines each from the published formulas, verified symbolically). **Hold loosely:** their generalization beyond the cubic landscape class, exactly as TCL flags for the wall.

---

## 3. The z-window: depletion exits through chaos, entrenchment exits through stasis

The published constants treat sigma_a as the free variable and z_eff as a parameter. Invert the frame, because the margin analysis lives on the other axis: real systems mostly cannot retune their couplings on the timescale at which their margins move. A job's demands, a marriage's tempo, an institution's reporting cadence are fixed sigma; the person's z_eff is what fluctuates.

For a fixed coupling sigma, the system is inside the window iff

**sigma^2 minus epsilon < z_eff < (3/2) sigma^2.**

Three things fall out.

First, **the window in margin-space has width sigma^2 / 2 + epsilon.** Tolerance for metabolic fluctuation grows with the square of coupling strength. A strongly coupled system (still inside its box) can absorb quadratically more margin swing than a weakly coupled one before either wall arrives. This is a non-obvious prediction: within the viable band, tighter coupling is metabolically safer, not riskier.

```
 z_eff
   ^
   |  STASIS  (z too high for sigma: wells too deep to flip;
   |           entrenchment; "entrenchment kills, not scarcity")
   |- - - - - - - - - - - - - -  z = (3/2) sigma^2
   |
   |     MAINTAINED OSCILLATION
   |     (width sigma^2/2 + epsilon)
   |
   |- - - - - - - - - - - - - -  z = sigma^2 - epsilon
   |  CHAOS   (z too low for sigma: same demand, no buffer;
   |           every mistimed push amplifies; thrash)
   +--------------------------------------------> time, as margin moves
```

Second, **the two exits are asymmetric in kind.** Rising z at fixed sigma deepens the wells until the coupling can no longer flip them: stasis, the frozen single attractor. This is TCL's own "entrenchment kills, not scarcity," placed on an axis. Falling z at fixed sigma drops the ceiling onto the coupling: chaos. So depletion does not produce freeze. Depletion produces thrash. The demand did not change; the buffer under it did. The same institutional coupling that coordinated a resourced node incoherently whips a depleted one. "Not dumber, saturated" is now a theorem of the model: the cognitive signature of margin loss at fixed external demand is predicted to be incoherence under unchanged load, which is precisely what the saturation phenomenology looks like from inside.

Third, the critical margins are computable per coupling: chaos arrives at z = sigma^2 minus epsilon, stasis at z = 1.5 sigma^2. For any node you can estimate a coupling for, you can estimate how much margin loss it is from thrash and how much margin gain (or commitment-deepening) it is from freeze.

**Load-bearing:** the inequality and the asymmetry of exits. This section is pure algebra on published formulas.

---

## 4. The anatomy of burnout

The AMM margin analysis described saturated individuals collapsing onto cheap attractors, which is a stasis picture, while section 3 says depletion at fixed coupling exits through chaos. Both are right, because a node carries two kinds of coupling, and depletion moves them through different walls.

**Self-coupling is funded from the margin.** The drive a node applies to its own loop (initiating, switching, holding friction open) is paid out of the same budget as everything else, so to first order sigma_self scales with z. The floor scales as sqrt(z). A linear quantity falling against a square-root floor crosses it from above: below z = 2 / (3 c^2), where c is the node's coupling-per-unit-margin, self-drive goes sub-floor and the node can no longer flip its own valleys. Inner stasis. The cheap attractor wins not because it became attractive but because the work rate needed to leave it is no longer affordable. (The crossing exists for any self-coupling that degrades faster than sqrt(z) under depletion; linear is just the natural first model.)

**External couplings are fixed in absolute terms.** The job, the family tempo, the notification cadence do not scale down with the node's reserves. As z falls, the ceiling sqrt(z + epsilon) descends onto these fixed sigmas and they cross into the chaos regime. Outer thrash.

So the model predicts the conjunction: below a computable margin band, a node is simultaneously too weak to drive itself and too strongly driven by everything else. Inner stasis plus outer chaos, at the same time, from one parameter moving. That conjunction is the burnout phenomenology stated exactly: cannot start anything, cannot stop reacting. The corpus has described this state repeatedly (lucid powerlessness, saturation, the endurance floor failing first); this is its dynamical anatomy, and it makes the intervention ordering non-optional: restore z before retuning sigma, because no coupling adjustment is stable while the box itself is moving. Margin restoration is not one intervention among several. It is the precondition for the others having a fixed target.

**Load-bearing:** the two-coupling decomposition and the conjunction prediction. **Flagged:** the linear sigma_self model is an assumption (any faster-than-sqrt(z) degradation suffices, but the specific thresholds depend on it).

---

## 5. The breathing bound

TCL established that under metabolic cost sustained oscillation is impossible: all realistic laminated systems must breathe, with z_eff itself oscillating. TCL Three Constants lists the interaction between breathing and the window as an open question. To first order, quasi-statically, it closes cleanly.

A fixed coupling survives the whole breath iff it stays above the floor at the top of the breath and below the ceiling at the bottom: sqrt(2 z_max / 3) < sigma < sqrt(z_min + epsilon). Such a sigma exists iff

**z_min / z_max > 2/3 minus epsilon / z_max,**

equivalently: **maximum survivable drawdown is one third of peak reserve** (plus a thin epsilon allowance; with the inferred parameters, 34 percent). This is invariant 5, and like the wall it is geometry: 1 minus 2 x_f^2 = 1/3, independent of energy scale and timescale separation.

A laminated system whose reserves swing more than a third cannot hold any fixed coupling inside the window across the breath. It has exactly three options: shallow the breath, retune its couplings within the breath (coupling must track metabolism, sigma roughly proportional to sqrt(z(t))), or accept scheduled excursions, transient stasis at the top of the breath or transient chaos at the bottom. Rest, in this frame, is not the absence of maintenance. Rest is the scheduled stasis excursion that keeps the drawdown legal. Systems that refuse the excursion take the drawdown instead, and the drawdown exits through the chaos wall.

Scope condition, stated plainly: this is quasi-static. It treats the walls as instantaneous functions of z(t), which is defensible when the breath is slow relative to the lamination period and unexamined when it is not. Fast breathing could plausibly produce resonance effects this bound does not see. That is the first thing the numerical check (section 8) should probe.

**Load-bearing:** the bound as quasi-static algebra. **Flagged:** its validity under fast breathing.

---

## 6. Capture economics and the attack-vector shift

MRIE names external GCO takeover at the P6 step. The window gives the takeover a price sheet.

**The capture condition.** A node is dynamically available for external driving when its own coupling is sub-floor while an external agent's coupling sits inside the node's window: sigma_int < sqrt(2z/3) and sqrt(2z/3) < sigma_ext < sqrt(z + epsilon). The captured node oscillates again. It looks alive. The modulation layer is foreign. From outside, and often from inside, recovery and capture are indistinguishable at the level of "is the loop running"; they differ only in whose setpoint the P6 comparison serves.

**The discount.** The minimum external drive scales as sqrt(z). Halve a node's margin and the price of driving it falls by a factor of sqrt(2), a 29 percent discount. The economics of capture improve continuously as the target depletes, which is why extraction systems that deplete their targets are not merely harming them but cheapening them for the next acquirer. EOTC section 8 described the gradient (benefits up, entropy down); this is the gradient's purchase order.

**The vector shift.** Here is the asymmetry that matters most. The tilt window has absolute width approximately 0.1835 sqrt(z): it shrinks as the margin drains. The reshape budget, the wall at 0.289, is z-independent: it does not shrink at all. So the ratio of available reshape influence to available tilt influence grows as 1.57 / sqrt(z). At the inferred healthy margin the ratio is about 1.7; at half margin, 2.3; at quarter margin, 3.2. **Against a depleted target, reshaping scales better than pushing.** Pressure campaigns lose efficiency with the target's margin; identity and frame campaigns do not. The model therefore predicts that influence operations against saturated populations will drift from incentive-shaped (tilt) toward landscape-shaped (reshape): not "prefer A over B" but "here is what the options are, here is who you are." That MRIE attacks are observed to be parametric rather than additive stops being a stylized fact and becomes what the geometry requires of an efficient adversary.

The defensive corollary inverts cleanly: margin restoration re-prices tilt capture upward but does nothing to the reshape budget, so reshape defense cannot be metabolic. It has to be epistemic and structural: latency reduction (the wall is a delay resonance; faster, higher-fidelity self-observation raises the effective tolerance), and P6 custody (knowing whose setpoint the comparison step is serving). This matches, and grounds, the RBoR's emphasis on the integrity of the meta-relational step rather than on resource guarantees alone.

**Load-bearing:** the capture condition and the 1.57 / sqrt(z) ratio as algebra. **Flagged:** the adversary-behavior prediction is an inference about optimizing agents, not a property of the model itself.

---

## 7. Two currencies, and the EOTC rhyme

The five constants sort into two currencies. The floor and ceiling are paid in **energy**: both carry z_eff, both move when the margin moves. The wall, the proportional window, and the drawdown bound are paid in **phase**: pure geometry, indifferent to wealth. AM therefore has two distinct failure economies. You can be too poor to maintain (energy currency) and you can be too self-blind to maintain (phase currency), and no amount of the first currency settles debts in the second. This is why rich systems still die of delay.

One structural rhyme, flagged as analogy rather than derivation: the chaos ceiling rearranges to sigma_a^2 <= z_eff + epsilon, actuation pressure bounded by absorption capacity plus timing slack. EOTC's Resolution-Responsibility Law, R times C_eff <= R_max, has the same shape: granularity times compression bounded by bandwidth. Both say that the product of how hard you act and how compressed your timing is must stay under what the substrate can absorb, or attribution (there) and coherence (here) decohere. The ceiling looks like the Resolution-Responsibility Law instantiated inside a concrete dynamical model. If the rhyme is real, EOTC's C* (the critical compression where Zone 3 behavior dominates) should be derivable from a landscape geometry the way the ceiling is, which would promote the law from design axiom to theorem within a model class. That is a thread, not a claim.

---

## 8. Falsifiers and proposed numerical checks

Everything above is algebra on formulas the TCL campaign already verified, so the corollaries inherit that verification only at the points the formulas were tested. The new claims have their own exposure. Proposed checks against the TCL codebase, in order of decisiveness:

1. **Quasi-static margin ramp.** Fix sigma_a inside the window, ramp z_eff slowly downward with nonzero delay. Prediction: oscillation degrades into chaos (not stasis) as z crosses sigma^2 minus epsilon. Then ramp upward: stasis onset at 1.5 sigma^2. Failure of either kills section 3.
2. **Breathing amplitude sweep.** Oscillate z_eff slowly at fixed sigma; sweep drawdown. Prediction: a kill boundary near drawdown 1/3 (epsilon-corrected). Then sweep breathing frequency to find where the quasi-static bound breaks, which characterizes the metabolic-interaction question TCL left open.
3. **Coupling-tracking rescue.** Same deep-breathing regime, but let sigma track sqrt(z(t)). Prediction: lamination survives drawdowns far beyond 1/3. This is the model's version of "retune within the breath" and doubles as a design principle for REAL's regulatory mesh: slow-layer weights should scale with the metabolic budget's square root, and REAL sessions whose budget swings exceed roughly a third without weight retuning should show the coherence breakdown on schedule.
4. **Proportional-window invariance.** Re-run the floor and ceiling measurements at several z_eff values; the ratio should hold at sqrt(3/2) within the epsilon correction while the absolute positions move. Cheap, and it tests invariant 4 directly.
5. **Two-coupling burnout run.** One internal coupling proportional to z, one external coupling fixed, ramp z down. Prediction: a band where the internal channel is sub-floor while the external channel is supra-ceiling, with the characteristic inner-stasis outer-chaos signature in the trajectories.

What would falsify the whole node rather than a corollary: any demonstration that lamination persists without continuous energy flux through the coupling (which would break the AM identification itself), or that the window's proportions move with z in the pure-tilt model (which would break the geometry-fixes-proportion claim).

---

## 9. Placement in corpus

Sits directly on top of the AMM synthesis (it executes that document's open thread 1) and TCL Three Constants (it consumes those formulas without modifying them). Beside the causality synthesis section 4: that node read the window qualitatively as the band of attributable causation; this node supplies the quantitative corollaries and the margin axis. Feeds MRIE (capture condition and pricing), EOTC (the rhyme in section 7, and the formal purchase order for section 8's gradient), the RBoR (overdrive as mechanism of harm; P6 custody as the reshape defense), Signal as Bias Field (premature collapse as the sub-floor regime), CRS (the burnout anatomy is a node-resolution cross-section of C_body depletion under fixed C_cog demand), and REAL (check 3 is a concrete architecture prediction for the regulatory mesh). Replaces nothing. Adds five numbers and two invariants to an identification the corpus had already sketched in prose.

---

## 10. Saved phrases

> The geometry fixes the proportions of viability; the metabolism fixes only its scale. Margin buys amplitude, never proportion.

> Depletion does not produce freeze. Depletion produces thrash. The demand did not change; the buffer under it did.

> Burnout is the conjunction: too weak to drive yourself, too strongly driven by everything else, from one parameter moving.

> Rest is the scheduled stasis excursion that keeps the drawdown legal.

> Maintenance that outruns its own perception destroys what it maintains.

> Against a depleted target, reshaping scales better than pushing. Extraction does not just harm its targets; it cheapens them for the next acquirer.

> Recovery and capture are indistinguishable at the level of "is the loop running." They differ in whose setpoint the comparison serves.
