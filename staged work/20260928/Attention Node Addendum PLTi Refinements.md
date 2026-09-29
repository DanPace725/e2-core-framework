# Attention Node Addendum: PLTi Refinements

Sep 27, 2026 · @Daniel Pace

## Source and status

An external paper independently reproduces the Attention node's core separation, and suggests five refinements. Companion to "Attention: Access, Terrain, and Closure" (Sept 23). Nothing here is applied to the node yet.

- **Source:** Kothari, Banerjee, Zhang, You & Mysore, "Evolutionarily old brainstem neurons are required for the control of selective spatial attention," *Nature Communications* 17:5849 (2026). [doi:10.1038/s41467-026-72340-9](https://doi.org/10.1038/s41467-026-72340-9)
- **Finding in one line:** PLTi, a conserved group of PV+ inhibitory brainstem neurons projecting to the superior colliculus, is required for choosing a target over competing distractors in a mouse flanker task, while perception and motor choice stay intact.
- **Convergence status:** Independent. The authors never saw the corpus. Much of the node's mechanics layer already recovers mainstream attention science, so the independent evidence is specifically the triple dissociation and the Ward-to-categorical link.
- **Provenance:** \[D\] Daniel surfaced the paper and framed the question; \[C\] Claude drafted the mapping.

## 1. The triple dissociation

Silencing PLTi splits along the exact seams the node marked load-bearing: attention as modulation of access to closure, separate from resolution capacity and from the GCO.

| Node term | Paper's measure | Effect of PLTi silencing |
| --- | --- | --- |
| Resolution capacity | Single-target discrimination and d′ across contrasts (Fig. 3a) | None |
| GCO commitment | Upper vs. lower port choice rates, head trajectories (Fig. 3b, 3c) | None |
| Access (competition for closure) | Incongruent vs. congruent flanker accuracy (Fig. 2c) | Large drop, incongruent only |

A system can see perfectly and commit perfectly while failing to settle which difference gets to steer. The node predicted that this failure should be separable. It is.

**Status:** load-bearing, as external support for an existing load-bearing claim.

## 2. Priority placement: PLTi as the G term

The corpus schematic reads the paper's priority result more cleanly than the paper does. PLTi is best placed as Gate (with Ward as its suppressive pole) acting on already-combined priority.

```latex
\Pi_i = A \cdot G_i \cdot \Phi(P_i, R_i \mid L)
```

- **The data:** a task-irrelevant flanker (matched contrast, no orientation) produces no deficit after silencing (Fig. 2d). Salience alone does not engage PLTi.
- **The paper's claim:** PLTi "uses" both top-down and bottom-up signals.
- **What the data actually show:** the deficit is conditional on relevance. That fits relevance and salience combining upstream in Φ, with PLTi applying G to the result. PLTi need not receive relevance input itself.
- **Lean as terrain:** a high-contrast patch with no relevance terrain beneath it does not bid. This is the node's claim that pull has no context-independent force.
- **One competition, not two networks:** the result supports a single competition over combined priority rather than rival top-down and bottom-up systems.

**Status:** load-bearing as a placement. It predicts every reported result with fewer assumptions than the paper's own framing.

## 3. Ward makes Pick

Categorical selection may be a product of Ward's geometry rather than a property Pick carries on its own. In the avian homolog (Imc), inhibition reaches everywhere except its own location, a "donut" that turns linearly varying input into step-like output (Mahajan & Mysore 2022).

PLTi silencing changes the behavioral decision boundary in two separable ways (Fig. 4f, 4g), and the SC's neural boundary changes the same way (Fig. 5):

- **Position shifts left:** weaker flankers win. The point of subjective equality moves.
- **Precision widens:** the transition range broadens. Selection stops being winner-take-all.

**Refinements for the node:**

1. **Two new Pick parameters**, beside aperture and multiplicity: boundary *position* (where Lean lives) and boundary *sharpness* (categoricalness). Names deferred to Daniel.
2. **Resolve as Ward's shape.** Pick may not be a separate operator following Ward. It may be what Ward looks like when its topology is "everything but here."
3. **Zone 2 echo.** The node said institutions keep groups in Zone 2 by collapsing attention topology. PLTi is a brainstem enforcer of single-winner topology; removing it leaves the topology permissive and graded.

**Status:** 1 load-bearing. 2 and 3 held loosely; the donut geometry is shown in birds, and only suggested for mammals.

## 4. CFAR: k₁ gets a resident

The paper separates two resolutions that CFAR's minimum resolvable change folds into one term.

```latex
\Delta Y_{\min} \approx k_1 \cdot \frac{\lambda_{\text{eff}}}{\mathrm{NA}_{\text{eff}}}
```

- **Perceptual resolution** (d′ per stimulus) sits on the NA side. PLTi silencing leaves it untouched.
- **Selection resolution** (transition range along the relative-priority axis) is what collapses.
- **PLTi as a resolution enhancement technique.** In lithography, k₁ is lowered by techniques that suppress sidelobes without changing the lens. PLTi behaves like one: an inhibitory filter that sharpens competition. Silencing it raises k₁ for selection while NA stays fixed.
- **Third tenant of k₁.** The node already parked terrain effects and Alert fluctuations in k₁. Competitive sharpening is a third, and the first one localized to a circuit.
- **DOF, localized.** A step-shaped boundary is robust everywhere except a thin band at threshold, where it is maximally sensitive. The paper's reliability argument and CFAR's depth-of-focus tradeoff are the same fact read from opposite sides of the band.

**Status:** the two-resolution split is load-bearing. The lithography mapping is an analogy pending operationalization in the CFAR engine.

## 5. Two distractibilities

Distractibility has at least two structurally distinct sources, and they leave different signatures.

| Source | Mechanism | Predicted capture by irrelevant salient stimuli | Predicted capture by relevant competitors |
| --- | --- | --- | --- |
| Tonic Alert | Non-directional readiness raised across a whole class of pulls | Increases | Increases |
| Ward failure | Competitive suppression lost at the G term | No change | Increases |

The paper shows the Ward-failure signature: weak relevant flankers capture, irrelevant ones do not.

**Test:** run the relevant and irrelevant flanker variants side by side under an arousal manipulation. Alert-driven distractibility should raise both; Ward failure should raise only the relevant one.

**Status:** the distinction is load-bearing. Mapping either signature onto ADHD or schizophrenia phenotypes is held loosely; the paper gestures at this without testing it.

## 6. The closure threshold rides along

One inhibitory source holds back both who wins and when closure fires, and the two effects dissociate.

- **Speed:** silencing shortens reaction times in every condition. A drift-diffusion fit shows a lowered threshold *a*, attributed to disinhibition of the SC (Fig. 3d, 3e).
- **Accuracy:** it drops only on incongruent trials, which rules out a plain speed-accuracy shift.
- **Corpus reading:** the threshold drop is the GCO trigger lowering, AMM's "firing early." The accuracy drop is the access failure of section 1. Same circuit, two functions, separable at the right resolution. This fits the node's pattern of a braid that localizes by resolution.

**Status:** held loosely. The threshold link rests on a model fit and on recordings in passive mice.

## Proposed updates and caveats

For Daniel's review during integration; nothing is applied.

**Proposed updates:**

1. **Attention node, §5.2 Pick:** add boundary position and boundary sharpness as parameters. Add a held-loosely note that categoricalness may arise from Ward topology.
2. **Attention node, §5.3 schematic:** annotate G with PLTi as a candidate neural locus acting on combined priority.
3. **Attention node, §5.2 Alert:** add the two-distractibility distinction and its test.
4. **Attention node, §18:** add the triple dissociation to the load-bearing list as external support.
5. **CFAR (and the node's proposed CFA/CFAR update):** split k₁ to name competitive sharpening; distinguish perceptual from selection resolution.
6. **AMM:** cite the threshold result beside "GCO firing early."

**Caveats on the source:**

- **Small samples:** n = 6 for the main manipulation, n = 3 for the irrelevant-flanker control that carries the priority claim. Analyses were not blinded.
- **Salience, not priority, in the neural data:** SC recordings used expanding dots in passive mice. Where relevance enters this circuit is not shown; section 2's placement fills that gap by structure, not by data.
- **Compute vs. relay is open,** by the authors' own account. In corpus terms this is the access vs. closure question, which the node can sharpen.
- **Bilateral silencing leaves performance above chance.** The authors attribute this to lower-resolution comparison elsewhere, which leaves room for distributed backups alongside the specialized module.
