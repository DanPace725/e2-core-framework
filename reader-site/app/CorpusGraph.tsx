"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type GraphNode = {
  id: string;
  title: string;
  clusterId: string | null;
  frame: string | null;
  confidence: number | null;
  status: string;
  wordCount: number;
  readerUrl: string;
  ormdUrl: string;
};

type GraphEdge = {
  id: string;
  source: string;
  target: string;
  type: string;
  certainty: "explicit" | "suggested";
  provenance: string;
  note: string;
};

type GraphCluster = { id: string; name: string; scope: string };

export type GraphData = {
  title: string;
  description: string;
  counts: { nodes: number; edges: number; explicitEdges: number; suggestedEdges: number };
  clusters: GraphCluster[];
  nodes: GraphNode[];
  edges: GraphEdge[];
};

type Point = { x: number; y: number };
type ViewBox = { x: number; y: number; width: number; height: number };
type NodeDrag = {
  id: string;
  pointerId: number;
  offsetX: number;
  offsetY: number;
  startClientX: number;
  startClientY: number;
  moved: boolean;
};

const WORLD = { width: 1200, height: 780 };
const FULL_VIEW: ViewBox = { x: 0, y: 0, width: WORLD.width, height: WORLD.height };
const CLUSTER_COLORS: Record<string, string> = {
  A: "#c96b42",
  B: "#b89035",
  C: "#5f8f52",
  D: "#2e8a78",
  E: "#337d9a",
  F: "#5b67a3",
  G: "#835b9e",
  H: "#a45676",
  I: "#6e746f",
};

function hash(value: string) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function buildLayout(graph: GraphData) {
  const positions = new Map<string, Point>();
  const clusterIndex = new Map(graph.clusters.map((cluster, index) => [cluster.id, index]));
  const centers = new Map<string, Point>();

  graph.clusters.forEach((cluster, index) => {
    const angle = -Math.PI / 2 + (index / graph.clusters.length) * Math.PI * 2;
    centers.set(cluster.id, {
      x: WORLD.width / 2 + Math.cos(angle) * 315,
      y: WORLD.height / 2 + Math.sin(angle) * 245,
    });
  });

  graph.nodes.forEach((node) => {
    if (!node.clusterId) {
      positions.set(node.id, { x: WORLD.width / 2, y: WORLD.height / 2 });
      return;
    }
    const center = centers.get(node.clusterId) ?? { x: WORLD.width / 2, y: WORLD.height / 2 };
    const seed = hash(node.id);
    const angle = ((seed % 360) * Math.PI) / 180;
    const distance = 35 + ((seed >>> 8) % 105);
    positions.set(node.id, {
      x: center.x + Math.cos(angle) * distance,
      y: center.y + Math.sin(angle) * distance,
    });
  });

  const explicitEdges = graph.edges.filter((edge) => edge.certainty === "explicit");
  for (let step = 0; step < 180; step += 1) {
    const forces = new Map(graph.nodes.map((node) => [node.id, { x: 0, y: 0 }]));

    for (let i = 0; i < graph.nodes.length; i += 1) {
      const left = graph.nodes[i];
      const leftPosition = positions.get(left.id)!;
      for (let j = i + 1; j < graph.nodes.length; j += 1) {
        const right = graph.nodes[j];
        const rightPosition = positions.get(right.id)!;
        const dx = rightPosition.x - leftPosition.x;
        const dy = rightPosition.y - leftPosition.y;
        const distanceSquared = Math.max(dx * dx + dy * dy, 36);
        if (distanceSquared > 28000) continue;
        const distance = Math.sqrt(distanceSquared);
        const strength = 52 / distanceSquared;
        const fx = (dx / distance) * strength * 70;
        const fy = (dy / distance) * strength * 70;
        forces.get(left.id)!.x -= fx;
        forces.get(left.id)!.y -= fy;
        forces.get(right.id)!.x += fx;
        forces.get(right.id)!.y += fy;
      }
    }

    for (const edge of explicitEdges) {
      const source = positions.get(edge.source)!;
      const target = positions.get(edge.target)!;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const desired = edge.type === "indexes" ? 155 : 92;
      const strength = (distance - desired) * 0.0032;
      const fx = (dx / distance) * strength;
      const fy = (dy / distance) * strength;
      forces.get(edge.source)!.x += fx;
      forces.get(edge.source)!.y += fy;
      forces.get(edge.target)!.x -= fx;
      forces.get(edge.target)!.y -= fy;
    }

    for (const node of graph.nodes) {
      if (!node.clusterId) continue;
      const position = positions.get(node.id)!;
      const center = centers.get(node.clusterId)!;
      forces.get(node.id)!.x += (center.x - position.x) * 0.0055;
      forces.get(node.id)!.y += (center.y - position.y) * 0.0055;
    }

    for (const node of graph.nodes) {
      const position = positions.get(node.id)!;
      const force = forces.get(node.id)!;
      if (!node.clusterId) {
        position.x = WORLD.width / 2;
        position.y = WORLD.height / 2;
        continue;
      }
      const clusterOrder = clusterIndex.get(node.clusterId) ?? 0;
      const cooling = 0.92 - step / 1200 + clusterOrder * 0.0005;
      position.x = Math.min(WORLD.width - 45, Math.max(45, position.x + force.x * cooling));
      position.y = Math.min(WORLD.height - 45, Math.max(45, position.y + force.y * cooling));
    }
  }

  return { positions, centers };
}

function zoomView(view: ViewBox, factor: number): ViewBox {
  const width = Math.min(WORLD.width * 1.5, Math.max(260, view.width * factor));
  const height = width * (WORLD.height / WORLD.width);
  return {
    x: view.x + (view.width - width) / 2,
    y: view.y + (view.height - height) / 2,
    width,
    height,
  };
}

function clientPointToWorld(svg: SVGSVGElement, clientX: number, clientY: number): Point | null {
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const worldPoint = point.matrixTransform(matrix.inverse());
  return { x: worldPoint.x, y: worldPoint.y };
}

export function CorpusGraph({
  graph,
  selectedId,
  onSelect,
  onOpenDocument,
}: {
  graph: GraphData;
  selectedId: string;
  onSelect: (id: string) => void;
  onOpenDocument: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [showSuggested, setShowSuggested] = useState(false);
  const [focusMode, setFocusMode] = useState(true);
  const [activeClusters, setActiveClusters] = useState(() => new Set(graph.clusters.map((cluster) => cluster.id)));
  const [viewBox, setViewBox] = useState<ViewBox>(FULL_VIEW);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; view: ViewBox } | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, Point>>({});
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const nodeDragRef = useRef<NodeDrag | null>(null);
  const suppressedNodeClickRef = useRef<string | null>(null);
  const canvasRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      setViewBox((view) => zoomView(view, event.deltaY < 0 ? 0.88 : 1.14));
    };
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, []);

  const layout = useMemo(() => buildLayout(graph), [graph]);
  const positions = useMemo(() => {
    const result = new Map(layout.positions);
    for (const [id, point] of Object.entries(nodePositions)) result.set(id, point);
    return result;
  }, [layout.positions, nodePositions]);
  const centers = layout.centers;
  const nodeMap = useMemo(() => new Map(graph.nodes.map((node) => [node.id, node])), [graph.nodes]);
  const selectedNode = nodeMap.get(selectedId) ?? graph.nodes[0];

  const eligibleEdges = useMemo(
    () => graph.edges.filter((edge) => showSuggested || edge.certainty === "explicit"),
    [graph.edges, showSuggested],
  );

  const neighborIds = useMemo(() => {
    const result = new Set([selectedNode.id]);
    for (const edge of eligibleEdges) {
      if (edge.source === selectedNode.id) result.add(edge.target);
      if (edge.target === selectedNode.id) result.add(edge.source);
    }
    return result;
  }, [eligibleEdges, selectedNode.id]);

  const visibleNodeIds = useMemo(() => {
    const result = new Set<string>();
    for (const node of graph.nodes) {
      const clusterVisible = !node.clusterId || activeClusters.has(node.clusterId);
      if (clusterVisible && (!focusMode || neighborIds.has(node.id))) result.add(node.id);
    }
    result.add(selectedNode.id);
    return result;
  }, [activeClusters, focusMode, graph.nodes, neighborIds, selectedNode.id]);

  const visibleEdges = useMemo(
    () => eligibleEdges.filter((edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)),
    [eligibleEdges, visibleNodeIds],
  );

  const degree = useMemo(() => {
    const result = new Map<string, number>();
    for (const edge of graph.edges) {
      if (edge.certainty !== "explicit") continue;
      result.set(edge.source, (result.get(edge.source) ?? 0) + 1);
      result.set(edge.target, (result.get(edge.target) ?? 0) + 1);
    }
    return result;
  }, [graph.edges]);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return [];
    return graph.nodes
      .filter((node) => `${node.title} ${node.frame ?? ""}`.toLocaleLowerCase().includes(normalized))
      .slice(0, 8);
  }, [graph.nodes, query]);

  const connections = useMemo(
    () => eligibleEdges
      .filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id)
      .toSorted((a, b) => a.certainty.localeCompare(b.certainty) || a.type.localeCompare(b.type)),
    [eligibleEdges, selectedNode.id],
  );

  function selectNode(id: string) {
    onSelect(id);
    setQuery("");
  }

  function toggleCluster(id: string) {
    setActiveClusters((current) => {
      const next = new Set(current);
      if (next.has(id) && next.size > 1) next.delete(id);
      else next.add(id);
      return next;
    });
    setFocusMode(false);
  }

  function beginNodeDrag(event: ReactPointerEvent<SVGGElement>, id: string) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const canvas = canvasRef.current;
    const position = positions.get(id);
    if (!canvas || !position) return;
    const pointer = clientPointToWorld(canvas, event.clientX, event.clientY);
    if (!pointer) return;

    event.preventDefault();
    event.stopPropagation();
    suppressedNodeClickRef.current = null;
    event.currentTarget.setPointerCapture(event.pointerId);
    nodeDragRef.current = {
      id,
      pointerId: event.pointerId,
      offsetX: position.x - pointer.x,
      offsetY: position.y - pointer.y,
      startClientX: event.clientX,
      startClientY: event.clientY,
      moved: false,
    };
    setDraggingNodeId(id);
  }

  function moveNode(event: ReactPointerEvent<SVGGElement>) {
    const drag = nodeDragRef.current;
    const canvas = canvasRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !canvas) return;
    const pointer = clientPointToWorld(canvas, event.clientX, event.clientY);
    if (!pointer) return;

    event.preventDefault();
    event.stopPropagation();
    if (Math.hypot(event.clientX - drag.startClientX, event.clientY - drag.startClientY) > 3) drag.moved = true;
    const nextPosition = {
      x: Math.min(WORLD.width - 18, Math.max(18, pointer.x + drag.offsetX)),
      y: Math.min(WORLD.height - 18, Math.max(18, pointer.y + drag.offsetY)),
    };
    setNodePositions((current) => ({ ...current, [drag.id]: nextPosition }));
  }

  function endNodeDrag(event: ReactPointerEvent<SVGGElement>) {
    const drag = nodeDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (drag.moved) suppressedNodeClickRef.current = drag.id;
    nodeDragRef.current = null;
    setDraggingNodeId(null);
  }

  function handleNodeClick(id: string) {
    if (suppressedNodeClickRef.current === id) {
      suppressedNodeClickRef.current = null;
      return;
    }
    selectNode(id);
  }

  return (
    <section className="graph-view" aria-labelledby="graph-title">
      <header className="graph-intro">
        <div>
          <p className="eyebrow">Relational orientation</p>
          <h1 id="graph-title">Corpus graph</h1>
          <p>Explore recorded connections without confusing navigation metadata with framework authority.</p>
        </div>
        <div className="graph-counts" aria-label="Graph counts">
          <span><strong>{graph.counts.nodes}</strong> documents</span>
          <span><strong>{graph.counts.explicitEdges}</strong> curated links</span>
          <span><strong>{graph.counts.suggestedEdges}</strong> suggestions</span>
        </div>
      </header>

      <div className="graph-toolbar">
        <div className="graph-search">
          <label htmlFor="graph-search">Find a document</label>
          <input
            id="graph-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title or frame"
            autoComplete="off"
          />
          {searchResults.length > 0 ? (
            <div className="graph-search-results">
              {searchResults.map((node) => (
                <button key={node.id} type="button" onClick={() => selectNode(node.id)}>
                  <span>{node.clusterId ?? "Index"}</span>{node.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="graph-switches">
          <button type="button" className={focusMode ? "active" : ""} onClick={() => setFocusMode((value) => !value)}>
            {focusMode ? "Local neighborhood" : "Whole corpus"}
          </button>
          <button type="button" className={showSuggested ? "active" : ""} onClick={() => setShowSuggested((value) => !value)}>
            Suggested links {showSuggested ? "on" : "off"}
          </button>
        </div>
      </div>

      <div className="cluster-filter" aria-label="Filter graph by cluster">
        {graph.clusters.map((cluster) => (
          <button
            key={cluster.id}
            type="button"
            className={activeClusters.has(cluster.id) ? "active" : ""}
            onClick={() => toggleCluster(cluster.id)}
            title={cluster.name}
          >
            <span style={{ backgroundColor: CLUSTER_COLORS[cluster.id] }} />
            {cluster.id}
          </button>
        ))}
      </div>

      <div className="graph-workspace">
        <div className="graph-canvas-wrap">
          <div className="graph-zoom-controls" aria-label="Graph zoom controls">
            <button type="button" onClick={() => setViewBox((view) => zoomView(view, 0.78))} aria-label="Zoom in">+</button>
            <button type="button" onClick={() => setViewBox((view) => zoomView(view, 1.28))} aria-label="Zoom out">−</button>
            <button type="button" onClick={() => setViewBox(FULL_VIEW)}>Fit</button>
            <button type="button" onClick={() => setNodePositions({})} disabled={Object.keys(nodePositions).length === 0}>Reset nodes</button>
          </div>
          <svg
            ref={canvasRef}
            className="graph-canvas"
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            role="img"
            aria-label={`Interactive E squared corpus graph showing ${visibleNodeIds.size} documents and ${visibleEdges.length} relationships`}
            onPointerDown={(event) => {
              if (event.target !== event.currentTarget) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              setDragStart({ x: event.clientX, y: event.clientY, view: viewBox });
            }}
            onPointerMove={(event) => {
              if (!dragStart) return;
              const scaleX = dragStart.view.width / event.currentTarget.clientWidth;
              const scaleY = dragStart.view.height / event.currentTarget.clientHeight;
              setViewBox({
                ...dragStart.view,
                x: dragStart.view.x - (event.clientX - dragStart.x) * scaleX,
                y: dragStart.view.y - (event.clientY - dragStart.y) * scaleY,
              });
            }}
            onPointerUp={() => setDragStart(null)}
            onPointerCancel={() => setDragStart(null)}
          >
            <g className="graph-cluster-labels" aria-hidden="true">
              {!focusMode ? graph.clusters.map((cluster) => {
                const point = centers.get(cluster.id)!;
                return activeClusters.has(cluster.id) ? <text key={cluster.id} x={point.x} y={point.y - 112}>{cluster.id}</text> : null;
              }) : null}
            </g>
            <g className="graph-edges" aria-hidden="true">
              {visibleEdges.map((edge) => {
                const source = positions.get(edge.source)!;
                const target = positions.get(edge.target)!;
                const sourceNode = nodeMap.get(edge.source)!;
                const targetNode = nodeMap.get(edge.target)!;
                const selected = edge.source === selectedNode.id || edge.target === selectedNode.id;
                const crossCluster = sourceNode.clusterId !== targetNode.clusterId;
                return (
                  <line
                    key={edge.id}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    className={`${edge.certainty} ${selected ? "selected" : ""} ${crossCluster ? "cross-cluster" : ""}`}
                  />
                );
              })}
            </g>
            <g className="graph-nodes">
              {graph.nodes.map((node) => {
                if (!visibleNodeIds.has(node.id)) return null;
                const point = positions.get(node.id)!;
                const selected = node.id === selectedNode.id;
                const connected = neighborIds.has(node.id);
                const radius = node.clusterId ? 7 + Math.min(5, Math.sqrt(degree.get(node.id) ?? 0) * 1.25) : 16;
                const labelVisible = selected || connected || !focusMode && (degree.get(node.id) ?? 0) >= 4;
                return (
                  <g
                    key={node.id}
                    className={`graph-node ${selected ? "selected" : ""} ${draggingNodeId === node.id ? "dragging" : ""}`}
                    transform={`translate(${point.x} ${point.y})`}
                    onPointerDown={(event) => beginNodeDrag(event, node.id)}
                    onPointerMove={moveNode}
                    onPointerUp={endNodeDrag}
                    onPointerCancel={endNodeDrag}
                    onClick={() => handleNodeClick(node.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.title}${node.clusterId ? `, Cluster ${node.clusterId}` : ", framework index"}`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") selectNode(node.id);
                    }}
                  >
                    <circle className="confidence-ring" r={radius + 4} opacity={0.28 + (node.confidence ?? 0.45) * 0.72} />
                    <circle r={radius} fill={node.clusterId ? CLUSTER_COLORS[node.clusterId] : "#17342b"} />
                    {labelVisible ? <text x={radius + 7} y={4}>{node.title}</text> : null}
                    <title>{node.title}</title>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="graph-legend">
            <span>Drag nodes to rearrange</span>
            <span><i className="solid-line" /> Curated</span>
            <span><i className="dashed-line" /> Suggested</span>
            <span><i className="confidence-dot" /> Ring = recorded confidence</span>
          </div>
        </div>

        <aside className="graph-detail" aria-live="polite">
          <div className="graph-detail-kicker">
            <span style={{ backgroundColor: selectedNode.clusterId ? CLUSTER_COLORS[selectedNode.clusterId] : "#17342b" }} />
            {selectedNode.clusterId ? `Cluster ${selectedNode.clusterId}` : "Framework index"}
          </div>
          <h2>{selectedNode.title}</h2>
          <p className="graph-frame">{selectedNode.frame ?? "No frame recorded"}</p>
          <div className="graph-detail-meta">
            <span>{selectedNode.confidence === null ? "Confidence unrecorded" : `${Math.round(selectedNode.confidence * 100)}% confidence`}</span>
            <span>{selectedNode.wordCount.toLocaleString()} words</span>
          </div>
          <button className="graph-open-document" type="button" onClick={() => onOpenDocument(selectedNode.id)}>Read document</button>
          <a className="graph-ormd-link" href={selectedNode.ormdUrl}>Open ORMD for AI</a>
          <div className="graph-connections">
            <h3>Direct relationships</h3>
            {connections.length === 0 ? <p>No visible relationships under the current filters.</p> : connections.map((edge) => {
              const outgoing = edge.source === selectedNode.id;
              const other = nodeMap.get(outgoing ? edge.target : edge.source)!;
              return (
                <button key={edge.id} type="button" onClick={() => selectNode(other.id)}>
                  <span>{edge.certainty === "suggested" ? "Suggested" : outgoing ? edge.type : `is ${edge.type} by`}</span>
                  <strong>{other.title}</strong>
                </button>
              );
            })}
          </div>
          <p className="graph-authority-note">Relationships orient navigation. The linked ORMD documents remain authoritative.</p>
        </aside>
      </div>
    </section>
  );
}
