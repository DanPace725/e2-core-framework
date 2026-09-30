# Relational Primitive Engine (RPE) {#rpe-root}

12/11/25
📘 **Relational Primitive Engine (RPE)
Deterministic Update Algorithm v2**

## Purpose {#purpose}
The Relational Primitive Engine (RPE) provides a deterministic, ontology-driven, emergent simulation layer. It evaluates world state through [six relational primitives](#update-cycle) (Ontology, Geometry, Constraint, Epistemic, Dynamics, Meta) and applies the [Global Closure Operator (GCO)](#gco) to produce a consistent, stable, and interpretable world update each tick.

The RPE is engine-agnostic and [integrates cleanly](#integration) with Unreal, Unity, Godot, or a custom engine.

---

## 1. Data Model {#data-model}

### Entity {#entity}
A discrete world participant.
```json
Entity {
  id: string,
  kind: string,      // category/class/template
  state: { key: value } // arbitrary properties (hp, hunger, faction, resources...)
}
```

### Relation {#relation}
A typed edge [connecting entities](#entity) or expressing a property.
```json
Relation {
  primitive: ONTOLOGY | GEOMETRY | CONSTRAINT | EPISTEMIC | DYNAMICS | META,
  source: EntityID,
  target?: EntityID,
  payload?: any      // radius, weight, occlusion, visibility, resource delta, rule references...
}
```

### World {#world}
The [World](#world) is the container for the simulation state.
```json
World {
  entities: Set<Entity>,
  relations: Set<Relation>,
  spatialIndex: Structure,    // quadtree/octree/BVH for GEOMETRY + EPISTEMIC
  dirtyFlags: Map<EntityID, Flags> // tracks which entities changed and why
}
```

---

## 2. Update Cycle (One Tick) {#update-cycle}
The RPE update cycle is [strictly ordered](#step-1) for determinism:

---

### ⭐ Step 1 — GEOMETRY {#step-1}
(Spatial, structural, topological evaluation)
**Purpose**: Build a geometric snapshot for the tick.
**Operations**:
- Compute proximity relations
- Field gradients (pressure, influence, heat, mana, etc.)
- Occlusion and line-of-sight
- Structural connectivity
- Region membership
- Local curvature / manifold effects

**Output**: `GeometryContext`
This serves as the [spatial foundation](#step-2) for all subsequent primitives.

---

### ⭐ Step 2 — CONSTRAINT {#step-2}
**Purpose**: Enforce physical, systemic, resource, or logical [bounds](#step-2).
**Examples**:
- clamp health, energy, capacity
- enforce conservation rules
- apply faction laws or cultural norms
- stabilize invalid states
- handle collisions or blocked actions

This stage ensures the world enters [Dynamics](#step-4) in a valid, bounded configuration.

---

### ⭐ Step 3 — EPISTEMIC {#step-3}
**Purpose**: Determine what each entity [knows](#step-3), based on [Geometry](#step-1) and [Constraints](#step-2).
**Derived from**:
- visibility
- sensory ranges
- occlusion
- faction intelligence
- memory
- inference rules

**Output**: Knowledge graph per agent or per faction.
This grounds the simulation in [local perspective](#step-3) — agents cannot act on information they do not have. (It also supports stealth, misinformation, rumors, and drift.)

---

### ⭐ Step 4 — DYNAMICS {#step-4}
**Purpose**: Apply [state changes](#step-4)—movement, growth, decay, combat, reproduction, trade, social action—filtered through [Constraints](#step-2) and [Epistemics](#step-3).
**Dynamics include**:
- movement or pathing
- metabolic cycles
- resource flows
- combat resolution
- AI decision-making
- behavior scripts (or RP-rule behavior selectors)
- ecological or systemic dynamics

This is the main “action” stage of the simulation.

---

### ⭐ Step 5 — META {#step-5}
**Purpose**: Rules about rules. Structural operations. [System-level mutation](#step-5).
**META handles**:
- spawning / despawning entities
- adding/removing relations
- role changes
- faction reorganization
- cultural drift
- rule injection (e.g., new schema when player builds a creation)
- architecture changes
- large-scale systemic adjustments
- rewriting topologies or categories

META is how the world [evolves its own laws](#step-5).

---

### ⭐ Step 6 — GCO (Global Closure Operator) {#gco}
**Purpose**: Ensure world consistency; resolve contradictions; [finalize the tick](#gco).
**Operations**:
- dedupe relations
- remove contradictions
- enforce schema-level invariants
- resolve conflicts deterministically
- collapse equivalences
- freeze stable states
- trigger RESET events where appropriate
- produce a closure report for debugging and/or narrative use

After GCO completes, the world state is [valid, minimal, and consistent](#rpe-root) for the next tick.

---

## 3. Runtime Integration {#integration}
For UE5 or Unity:
Run `RPE.Step(world)`:
1. after physics simulation
2. after animation updates
3. before AI planning or rendering
4. optionally multiple times per gameplay tick (substepping)

The RPE becomes the [semantic layer](#rpe-root) of the engine.

---

## 4. Authoring Rules {#authoring}
Rules are authored as:
- JSON
- ScriptableObjects / DataAssets
- Lua fragments
- Blueprint function objects
- Graph-based logic

Each rule [emits or modifies](#relation) Relations.
META rules may [mutate the ruleset](#step-5) itself.

---

## 5. Performance Notes {#performance}
- Use [spatial indexing](#world) aggressively for GEOMETRY and EPISTEMIC.
- Use change-driven evaluation (only recompute relations touching “dirty” entities).
- Keep [GCO](#gco) simple (not a solver—just a closure pruner).
- Cache perceptual fields where possible.

This keeps the simulation [scalable](#performance) to thousands of entities.

---

## 6. Debugging and Introspection {#debugging}
The greatest strength of RPE is transparency.
Log or visualize:
- relations added this tick
- relations removed
- contradictions detected
- closure events
- epistemic states
- META rewrites

This makes AI and world-sim behavior [fully explainable](#debugging).

---

## ⭐ 7. Determinism Guarantees {#determinism}
The RPE tick cycle is [deterministic](#determinism) if:
1. input order is stable
2. relation evaluation order is stable
3. GCO resolution rules are stable

This enables:
- replays
- debugging
- synchronization for multiplayer
- predictable AI
- reproducible world evolutions
