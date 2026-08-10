# Relational Primitives {#relational-primitives}

This document is the canonical merged Relational Primitives node. It preserves the compact formal framework from the earlier `Relational Primitives` document and the physics-grounded derivation and categorical semantics from `Relational Primitives V3`.

## Purpose {#purpose}

The relational primitives provide a minimal vocabulary for describing relation types across domains. They do not replace domain-specific science, ethics, or practice. They provide a shared grammar for asking what kind of relation is operating.

The six primitives are:

1. Ontological
2. Dynamical
3. Geometric / Causal
4. Symmetric / Constraint
5. Epistemic / Informational
6. Meta-Relational

## Physics-Grounded Derivation {#physics-grounded-derivation}

The V3 derivation began from Matter, Energy, and Spacetime and extracted recurring relationship types from contemporary physics. Across quantum fields, particles, energy distributions, geometry, causality, conservation, measurement, and cross-domain mappings, roughly thirty recurring relation types appear.

Those types cluster into six functional categories. The claim is modest but useful:

- the primitives are systematically derived from recognizable physical structures;
- they are functionally independent for current modeling purposes;
- together they provide coverage for the extracted relationship types;
- they remain working categories, not metaphysical absolutes.

## The Six Primitives {#six-primitives}

### 1. Ontological {#ontological}

Ontological relations define what something is, what it is composed of, and what identity conditions hold it together.

Examples: identity, composition, structural hierarchy, entity definition, emergence as category formation.

Typical link verbs: `defines`, `composes`, `is_a`.

### 2. Dynamical {#dynamical}

Dynamical relations describe change, interaction, transformation, coupling, force, flow, and evolution.

Examples: interaction between systems, energy transfer, phase transition, process dynamics.

Typical link verbs: `interacts_with`, `transforms_to`, `produces`.

### 3. Geometric / Causal {#geometric-causal}

Geometric and causal relations describe embedding, location, topology, curvature, ordering, propagation, and causal influence.

Examples: causal structure, light cones, embedding in a field, stress-energy shaping curvature.

Typical link verbs: `embedded_in`, `causes`, `precedes`.

### 4. Symmetric / Constraint {#symmetric-constraint}

Symmetric and constraint relations describe invariance, conservation, boundary conditions, duality, reciprocal constraint, and stability.

Examples: conservation laws, gauge symmetry, limits, fixed points, preserving conditions.

Typical link verbs: `constrains`, `preserves`, `limits`.

### 5. Epistemic / Informational {#epistemic-informational}

Epistemic and informational relations describe measurement, observability, uncertainty, information flow, hiddenness, evidence, and model limits.

Examples: measurement, entropy, decoherence, evidence, blind spots, confidence.

Typical link verbs: `measures`, `supports`, `refutes`.

### 6. Meta-Relational {#meta-relational}

Meta-relational relations describe mappings between relation systems, recursive correspondences, abstraction layers, and cross-domain translations.

Examples: functorial mappings, analogies, renormalization-style scale mappings, framework-to-framework correspondences.

Typical link verbs: `corresponds_to`, `emerges_from`, `models`.

## Formal Typing Framework {#formal-typing-framework}

Let:

- `D` be a unified domain of physical or conceptual entities.
- `R` be the set of relational instances.
- `T` be the set of relational types.
- `TypeOf: R -> T` assign each relation instance a type.

Let the primitive predicates over `T` be:

```text
P = { Ont, Dyn, Geo, Sym, Epi, Meta }
```

Core typing axioms:

- **Total typing:** every relation instance has a type.
- **Typing uniqueness:** a relation instance has one active type at the chosen resolution.
- **Primitive covering:** every type belongs to at least one primitive category.
- **Primitive distinction:** primitives remain distinguishable at the relevant modeling resolution.

## Counter-Modes {#counter-modes}

Each primitive carries internal polarity. The earlier formal source encoded this as positive and negative modes:

- Ontological: elemental / composite
- Dynamical: deterministic / stochastic
- Geometric-causal: local / nonlocal
- Symmetric-constraint: invariant / variant
- Epistemic-informational: observed / hidden
- Meta-relational: equivalent / non-equivalent

The point is not that these are the only possible modes. The point is that each primitive has an internal tension or modal fingerprint that cannot be reduced to the others.

## Irreducibility Claim {#irreducibility}

The primitives are treated as irreducible when changing one primitive's modal assignment can alter a model while all other primitives remain fixed. If a primitive were definable entirely from the others, such a difference could not occur.

This supports the working claim that the six primitives are independent enough to serve as a minimal relational grammar.

## Categorical Semantics {#categorical-semantics}

The V3 source mapped the primitives naturally into categorical language:

| Primitive | Categorical analogue |
| --- | --- |
| Ontological | Objects |
| Dynamical | Morphisms |
| Geometric / Causal | Monoidal structure and causal ordering |
| Symmetric / Constraint | Groupoids, limits, invariants |
| Epistemic / Informational | Kleisli categories / monadic structure |
| Meta-Relational | Functors and adjunctions |

This mapping is not the primitive definition. It is a formal translation that supports cross-domain reasoning and connects to `CT translation of RPs.ormd`.

## Relationship to GCO and E2 {#relationship-to-gco-e2}

The primitives describe relation categories. The Global Closure Operator describes how relational systems stabilize, maintain fixed points, and preserve coherence across change. The E^2 Equation expresses recursive composition across operators. Together:

- primitives name relation types;
- GCO constrains and stabilizes relational fields;
- the E^2 equation composes relational dynamics into a recursive ontology.

## Canonical Pointers {#canonical-pointers}

- `E^2 Axioms.ormd` for the axiom layer.
- `Global Closure Operator.ormd` for closure and stability.
- `CT translation of RPs.ormd` for category-theoretic translation.
- `RP Lambda Calc Translation.ormd` for lambda calculus translation.
- `Relational Bill of Rights v2.ormd` for ethical consequences.
- `E^2 Equation.ormd` for recursive composition.

## Summary {#summary}

The Relational Primitives are a six-part grammar for classifying relations: what defines, what changes, what causes or embeds, what constrains, what informs, and what maps relations across levels. They are physics-grounded, formally typed, and useful because they make relational structure legible without forcing every domain into one vocabulary of objects.

