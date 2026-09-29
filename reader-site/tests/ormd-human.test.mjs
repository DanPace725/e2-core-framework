import assert from "node:assert/strict";
import test from "node:test";
import { projectOrmdToHuman } from "../scripts/ormd-human.mjs";

test("projects an ORMD document without losing its prose or ordinary link titles", () => {
  const source = `<!-- ormd:1.0 -->
---
title: Sample
links:
  - id: evidence
    rel: supports
    to: "#basis"
    text: "the basis"
---
# Sample

See [[evidence]] and [the claim](#basis "epistemic:supports").
Keep [a tooltip](https://example.org "Read the paper").

\`\`\`md
[literal](#basis "epistemic:supports")
\`\`\`
`;
  const human = projectOrmdToHuman(source);
  assert.ok(human.startsWith("# Sample\n"));
  assert.match(human, /See \[the basis\]\(#basis\) and \[the claim\]\(#basis\)\./);
  assert.match(human, /\[a tooltip\]\(https:\/\/example\.org "Read the paper"\)/);
  assert.match(human, /```md\n\[literal\]\(#basis "epistemic:supports"\)\n```/);
  assert.doesNotMatch(human, /ormd:1\.0|^title:/m);
});
