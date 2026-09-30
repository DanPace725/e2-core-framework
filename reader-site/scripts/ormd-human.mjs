import YAML from "yaml";

const RELATIONSHIP = /^(?:[a-z][a-z0-9_-]*:[a-z][a-z0-9_-]*|supports|refutes|cites|references|related|extends)$/i;

export function projectOrmdToHuman(raw) {
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const envelope = normalized.match(/^<!-- ormd:[^>]+-->\n---\n([\s\S]*?)\n---\n?/);
  if (!envelope) throw new Error("ORMD marker and YAML frontmatter are required");
  const metadata = YAML.parse(envelope[1]) ?? {};
  const links = new Map(
    (Array.isArray(metadata.links) ? metadata.links : [])
      .filter((link) => link && typeof link.id === "string")
      .map((link) => [link.id, link]),
  );
  const body = normalized.slice(envelope[0].length);
  let fenced = false;
  const projected = body.split("\n").map((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      return line;
    }
    if (fenced) return line;
    return simplifyRelationshipLinks(resolveLinkIds(line, links));
  }).join("\n");
  return projected.replace(/[ \t]+$/gm, "").replace(/^\n+/, "").replace(/\n*$/, "\n");
}

function resolveLinkIds(line, links) {
  return line.replace(/\[\[([^\]]+)\]\]/g, (whole, id) => {
    const link = links.get(id);
    if (!link) return whole;
    const label = link.text || link.title || id;
    const target = link.to || link.target;
    return target ? `[${label}](${target})` : label;
  });
}

function simplifyRelationshipLinks(line) {
  let cursor = 0;
  let output = "";
  while (cursor < line.length) {
    const start = line.indexOf("](", cursor);
    if (start < 0) break;
    let depth = 1;
    let end = start + 2;
    for (; end < line.length; end += 1) {
      if (line[end] === "(") depth += 1;
      else if (line[end] === ")" && --depth === 0) break;
    }
    if (depth !== 0) break;
    const inside = line.slice(start + 2, end);
    const relationship = inside.match(/^(.*?)\s+(["'])([^"']+)\2\s*$/);
    output += line.slice(cursor, start + 2);
    output += relationship && RELATIONSHIP.test(relationship[3]) ? relationship[1] : inside;
    output += ")";
    cursor = end + 1;
  }
  return output + line.slice(cursor);
}
