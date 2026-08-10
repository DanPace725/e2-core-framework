# Agent Integration Process

Purpose: provide a repeatable process for integrating staged work into the Core Framework without flattening, duplicating, or prematurely promoting new ideas.

## Working Model

The Core Framework is the active corpus.

`staged work/` is not the corpus. It is an inbox for candidate material.

An integration agent should treat staged material as a proposal under review, not as already canonical.

## Inputs

Required:

- staged document
- Core Framework source corpus
- Core Framework Context Layer
- Core Framework Synthesized Core
- current acronym/source indexes when relevant

Optional:

- prior integration reviews
- manual notes from the user
- known intended placement

## Outputs

Each integration pass should produce at least one contained review document.

Recommended output location:

```text
Core Framework/staged work/<candidate title> - Integration Review.md
```

If the candidate is accepted, a later pass can produce promoted source and context-layer documents.

## Process

### 1. Identify The Candidate Claim

Read the staged document and extract:

- core construct
- proposed name and symbol
- claimed placement in the framework
- existing concepts it depends on
- new distinctions introduced
- open questions admitted by the staged document

Do not start by summarizing the whole document. Start by identifying the load-bearing claim.

### 2. Classify The Candidate

Assign a provisional integration type:

| Type | Meaning |
| --- | --- |
| construct | Adds a named conceptual object inside existing architecture. |
| metric/property | Names a measurable or diagnosable property of an existing object. |
| specialization | Applies an existing operator to a domain. |
| bridge | Connects existing documents without adding a new core object. |
| practice | Operationalizes a framework idea into method or protocol. |
| interpretive parallel | Provides analogy, etymology, theological, literary, or historical resonance. |

Default preference: classify conservatively. Most staged work should enter as a construct, metric/property, specialization, or bridge before becoming canonical.

The six relational primitives are treated as the settled grammar of the current framework. Integration work should normally place new material inside that architecture rather than reopening the primitive layer.

### 3. Search The Corpus

Cross-reference the staged document against:

- exact terms from the candidate
- synonymous concepts
- named framework acronyms
- likely parent documents
- adjacent constructs
- possible collision terms

Use the Core Framework as the search boundary.

Search both:

- `Semantic Substrate/`
- `Context Layer/`
- `Synthesized Core/`

Generated reports can help orient the search, but they should not be treated as source authority.

### 4. Build The Connection Map

For each relevant source, record:

- document path
- existing claim
- how it supports, limits, or complicates the staged idea
- whether the staged idea extends, duplicates, sharpens, or conflicts with it

The connection map should distinguish:

- primary parents
- adjacent supports
- downstream implications
- possible collisions

### 5. Check For Collision

Before recommending integration, test:

- Does this duplicate an existing term?
- Does it rename something already named?
- Does it fit cleanly inside the six-primitive architecture, or does it need a clearer placement?
- Does it confuse agent-side and substrate-side properties?
- Does it collapse a process into a substance?
- Does it promote metaphor into mechanism too quickly?
- Does it overfit a local example?
- Does it import external frameworks as authority instead of using them as parallels?

### 6. Propose Placement

Recommend where the idea belongs:

- source document update
- new candidate source document
- Context Layer conversion
- synthesized-core update
- acronym/index update
- future work only

A staged idea should not be integrated everywhere at once.

Preferred sequence:

```text
staged note
  -> integration review
  -> candidate source document
  -> Context Layer ORMD
  -> index/acronym update
  -> synthesis update
```

### 7. Preserve Status

Every integration review should state one of:

- reject / archive
- hold as staged
- promote as candidate
- integrate as source
- integrate into existing source
- synthesize into existing core artifact

The status should be explicit so later agents do not mistake staged material for accepted framework language.

### 8. Record Open Questions

Do not erase uncertainty.

Carry forward:

- unresolved definitions
- loose formal relationships
- empirical calibration needs
- naming alternatives
- scope limits
- likely failure modes

Open questions are part of the integration payload.

## Review Template

```markdown
# <Candidate Title> - Integration Review

Status: staged integration review

Staged document: `<path>`

Corpus boundary used for review: `Core Framework`

## Working Read

## Corpus Connections

### <Primary Parent Document>

Primary connection:

- `<path>`

Existing claim:

Integration implication:

## Collision And Risk Review

## Proposed Integration Method

## Integration Recommendation

Recommended status:

Recommended placement:

Recommended next artifact:

Recommended action before promotion:
```

## Agent Rules

- Do not delete staged material.
- Do not silently promote staged material into source.
- Do not rely on summaries alone when source files are available.
- Do not treat generated reports as source authority.
- Prefer source and Context Layer documents for claims.
- Keep metaphor, mechanism, metric, and formalism distinct.
- Mark speculative bridges as speculative.
- Preserve user-authored language when it appears load-bearing.
- Make the integration recommendation explicit.

## Current Test Case

The first test case is:

```text
staged work/relational viscosity.md
```

The review output is:

```text
staged work/Relational Viscosity - Integration Review.md
```

This test case classifies Relational Viscosity as a candidate CRS metric/property inside the existing six-primitive architecture.
