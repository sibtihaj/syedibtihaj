import React from "react";

/*
 * Diagram kit for the case studies: static, hand-placed SVG in the site's own
 * language (paper ground, navy ink outlines, one cobalt path, Source Serif 4 and
 * Outfit at weight 400). Everything renders on the server from fixed numbers, so
 * there is no client-side layout and no inner scrolling.
 *
 * Each figure carries two drawings of the same diagram: a wide one for large
 * screens and a stacked one for phones and narrow windows.
 */

export const PAPER = "#f6f5f1";
export const CARD = "#fbfaf7";
export const INK = "#0d1b3e";
export const MUTED = "#5e6679";
export const COBALT = "#1e4fd6";
const FOCAL_SUB = "#c9d3ea";

export const HEADING = "var(--font-heading), Georgia, serif";
export const BODY = "var(--font-body), system-ui, sans-serif";

const LABEL_SIZE = 15;
const SUB_SIZE = 12;
const LINE_GAP = 16;

export type NodeKind = "box" | "actor" | "store" | "decision";

/* ---------------------------------------------------------------- frame */

export function DiagramSvg({
  id,
  width,
  height,
  title,
  description,
  children,
}: {
  id: string;
  width: number;
  height: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className="block h-auto w-full"
      style={{ fontFamily: BODY }}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      <defs>
        <marker id={`${id}-ink`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1.5 1.5 L8.5 5 L1.5 8.5" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        </marker>
        <marker id={`${id}-cobalt`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1.5 1.5 L8.5 5 L1.5 8.5" fill="none" stroke={COBALT} strokeWidth="1.7" strokeLinecap="round" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

/**
 * A figure with the wide drawing on large screens and the stacked drawing below
 * that. Only one is displayed at a time, so only one reaches assistive tech.
 */
export function DiagramFigure({
  wide,
  narrow,
  caption,
}: {
  wide: React.ReactNode;
  narrow: React.ReactNode;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-10">
      <div className="rounded-2xl border border-ink/10 bg-paper px-4 py-5 sm:px-6 sm:py-6">
        <div className="hidden lg:block">{wide}</div>
        <div className="mx-auto max-w-[420px] lg:hidden">{narrow}</div>
      </div>
      {caption ? <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">{caption}</figcaption> : null}
    </figure>
  );
}

/* ----------------------------------------------------------- primitives */

export type NodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string[];
  kind?: NodeKind;
  focal?: boolean;
};

/** Height a node needs for its label and sub lines. */
export function nodeHeight(sub: string[] = [], kind: NodeKind = "box") {
  const h = 42 + sub.length * LINE_GAP;
  return kind === "decision" ? Math.max(h, 48) : h;
}

function shapePath({ x, y, w, h, kind }: { x: number; y: number; w: number; h: number; kind: NodeKind }) {
  if (kind === "decision") {
    const c = 14;
    return `M${x + c} ${y} H${x + w - c} L${x + w} ${y + h / 2} L${x + w - c} ${y + h} H${x + c} L${x} ${y + h / 2} Z`;
  }
  return null;
}

/** A component box: ink outline on card paper, or solid ink for the focal component. */
export function Node({ x, y, w, h, label, sub = [], kind = "box", focal }: NodeProps) {
  const fill = focal ? INK : CARD;
  const lines = 1 + sub.length;
  const blockHeight = LABEL_SIZE + (lines - 1) * LINE_GAP;
  const first = y + h / 2 - blockHeight / 2 + LABEL_SIZE - 3;
  const cx = x + w / 2;
  const decision = shapePath({ x, y, w, h, kind });

  return (
    <g>
      {decision ? (
        <path d={decision} fill={fill} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      ) : (
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={kind === "actor" ? Math.min(h / 2, 22) : kind === "store" ? 4 : 10}
          fill={fill}
          stroke={INK}
          strokeWidth="1.4"
        />
      )}
      {kind === "store" ? (
        <line x1={x + 6} x2={x + w - 6} y1={y + 6} y2={y + 6} stroke={focal ? PAPER : INK} strokeOpacity="0.3" strokeWidth="1" />
      ) : null}
      <text
        x={cx}
        y={first}
        textAnchor="middle"
        fontFamily={HEADING}
        fontSize={LABEL_SIZE}
        fontWeight={400}
        fill={focal ? PAPER : INK}
      >
        {label}
      </text>
      {sub.map((line, i) => (
        <text
          key={line}
          x={cx}
          y={first + (i + 1) * LINE_GAP}
          textAnchor="middle"
          fontSize={SUB_SIZE}
          fill={focal ? FOCAL_SUB : MUTED}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** A connector. Ink by default, cobalt for the path that matters, dashed for side traffic. */
export function Edge({
  id,
  d,
  strong,
  dashed,
  arrow = true,
}: {
  id: string;
  d: string;
  strong?: boolean;
  dashed?: boolean;
  arrow?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={strong ? COBALT : INK}
      strokeOpacity={strong ? 1 : 0.75}
      strokeWidth={strong ? 2 : 1.3}
      strokeDasharray={dashed ? "4 5" : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd={arrow ? `url(#${id}-${strong ? "cobalt" : "ink"})` : undefined}
    />
  );
}

/** A small italic label for a connector, with a paper halo so it reads over lines. */
export function EdgeLabel({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={HEADING}
      fontStyle="italic"
      fontSize="12.5"
      fill={MUTED}
      stroke={PAPER}
      strokeWidth="4"
      strokeLinejoin="round"
      paintOrder="stroke"
    >
      {children}
    </text>
  );
}

/** A dashed boundary around related components, named in italic above its top-left corner. */
export function Group({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" fill="none" stroke={INK} strokeOpacity="0.3" strokeDasharray="3 5" />
      <text
        x={x + 12}
        y={y - 7}
        fontFamily={HEADING}
        fontStyle="italic"
        fontSize="13"
        fill={MUTED}
        stroke={PAPER}
        strokeWidth="4"
        paintOrder="stroke"
      >
        {label}
      </text>
    </g>
  );
}

/* ------------------------------------------------------- stacked layout */

export type StackNode = {
  label: string;
  sub?: string[];
  kind?: NodeKind;
  focal?: boolean;
  /** Indexes of the nodes in the row above that point here. Defaults to all of them; "none" for no link. */
  from?: number[] | "none";
  /** Short label for the incoming connector. */
  inLabel?: string;
  strongIn?: boolean;
  dashedIn?: boolean;
  /** A line straight down through this column, for a connector that skips this row. */
  pass?: boolean;
  /** This node starts the spine on the left that links it to later rows. */
  spine?: boolean;
  /** This node is reached from the spine. */
  fromSpine?: boolean;
};

export type StackRow = {
  nodes: StackNode[];
  /** Dashed boundary name. Consecutive rows with the same name share one boundary. */
  group?: string;
  /** Set to false for siblings inside a group that are not linked to the row above. */
  connect?: boolean;
};

const STACK_W = 320;
const SPINE_X = 10;

type Placed = StackNode & { x: number; y: number; w: number; h: number; cx: number };

/**
 * The stacked drawing used on narrow screens: rows top to bottom, up to three
 * components side by side, right-angle connectors, optional dashed boundaries
 * and a spine on the left for links that skip rows.
 */
export function StackedFlow({
  id,
  title,
  description,
  rows,
}: {
  id: string;
  title: string;
  description: string;
  rows: StackRow[];
}) {
  const hasSpine = rows.some((r) => r.nodes.some((n) => n.spine));
  const hasGroup = rows.some((r) => r.group);
  const left = (hasSpine ? 30 : 4) + (hasGroup ? 10 : 0);
  const right = STACK_W - 4 - (hasGroup ? 10 : 0);
  const inner = right - left;

  const placed: Placed[][] = [];
  const rowTops: number[] = [];
  const rowHeights: number[] = [];
  let cursor = hasGroup && rows[0]?.group ? 30 : 6;

  rows.forEach((row, r) => {
    const h = Math.max(...row.nodes.map((n) => (n.pass ? 0 : nodeHeight(n.sub, n.kind))), 0);
    if (r > 0) {
      const prev = rows[r - 1];
      const labelled = row.nodes.some((n) => n.inLabel && !n.fromSpine);
      let gap = row.connect === false ? 12 : labelled ? 48 : 32;
      if (row.group && row.group !== prev.group) gap += 22;
      if (prev.group && prev.group !== row.group) gap += 10;
      cursor += gap;
    }
    const n = row.nodes.length;
    const single = n === 1;
    const w = single ? Math.min(inner, 236) : (inner - (n - 1) * 10) / n;
    placed.push(
      row.nodes.map((node, i) => {
        const x = single ? left + (inner - w) / 2 : left + i * (w + 10);
        const nh = node.pass ? h : nodeHeight(node.sub, node.kind);
        const y = cursor + (h - nh) / 2;
        return { ...node, x, y, w, h: nh, cx: x + w / 2 };
      })
    );
    rowTops.push(cursor);
    rowHeights.push(h);
    cursor += h;
  });

  const lastGrouped = rows.length > 0 && rows[rows.length - 1].group;
  const height = cursor + (lastGrouped ? 12 : 6);

  // Dashed boundaries around runs of rows that share a group name.
  const groups: { label: string; top: number; bottom: number }[] = [];
  rows.forEach((row, r) => {
    if (!row.group) return;
    const top = rowTops[r] - 10;
    const bottom = rowTops[r] + rowHeights[r] + 10;
    const last = groups[groups.length - 1];
    if (last && r > 0 && rows[r - 1].group === row.group) last.bottom = bottom;
    else groups.push({ label: row.group, top, bottom });
  });

  const edges: React.ReactNode[] = [];
  const labels: React.ReactNode[] = [];

  placed.forEach((row, r) => {
    if (r === 0 || rows[r].connect === false) return;
    const prev = placed[r - 1];
    const prevBottom = rowTops[r - 1] + rowHeights[r - 1];
    const bus = prevBottom + 14;
    // When this row opens a dashed boundary, its name sits just above the border,
    // so connector labels move up next to the bus to stay clear of it.
    const opensGroup = Boolean(rows[r].group) && rows[r].group !== rows[r - 1].group;
    row.forEach((node, j) => {
      if (node.fromSpine && node.from === undefined) return;
      const sources = node.from === "none" ? [] : (node.from ?? prev.map((_, i) => i));
      sources.forEach((s) => {
        const src = prev[s];
        if (!src) return;
        const sy = src.pass ? prevBottom : src.y + src.h;
        const ty = node.pass ? rowTops[r] : node.y - 2;
        const d = src.cx === node.cx ? `M${src.cx} ${sy} V${ty}` : `M${src.cx} ${sy} V${bus} H${node.cx} V${ty}`;
        edges.push(
          <Edge
            key={`e-${r}-${j}-${s}`}
            id={id}
            d={d}
            strong={node.strongIn}
            dashed={node.dashedIn}
            arrow={!node.pass}
          />
        );
      });
      if (node.inLabel && !node.fromSpine) {
        labels.push(
          <EdgeLabel key={`l-${r}-${j}`} x={node.cx + 7} y={opensGroup ? bus + 17 : node.y - 10} anchor="start">
            {node.inLabel}
          </EdgeLabel>
        );
      }
    });
  });

  // Pass-through columns draw a plain line across their row.
  placed.forEach((row, r) =>
    row.forEach((node, j) => {
      if (!node.pass) return;
      edges.push(
        <Edge key={`p-${r}-${j}`} id={id} d={`M${node.cx} ${rowTops[r]} V${rowTops[r] + rowHeights[r]}`} arrow={false} />
      );
    })
  );

  // The spine: from the left side of its source down to the last row it reaches.
  const flat = placed.flat();
  const source = flat.find((n) => n.spine);
  const targets = flat.filter((n) => n.fromSpine);
  if (source && targets.length) {
    const sy = source.y + source.h / 2;
    const lastY = Math.max(...targets.map((t) => t.y + t.h / 2));
    edges.push(<Edge key="spine" id={id} d={`M${source.x} ${sy} H${SPINE_X} V${lastY}`} arrow={false} />);
    targets.forEach((t, i) => {
      const ty = t.y + t.h / 2;
      edges.push(
        <Edge key={`s-${i}`} id={id} d={`M${SPINE_X} ${ty} H${t.x - 2}`} strong={t.strongIn} dashed={t.dashedIn} />
      );
    });
  }

  return (
    <DiagramSvg id={id} width={STACK_W} height={height} title={title} description={description}>
      {groups.map((g) => (
        <Group key={`${g.label}-${g.top}`} x={left - 10} y={g.top} w={inner + 20} h={g.bottom - g.top} label={g.label} />
      ))}
      {edges}
      {flat
        .filter((n) => !n.pass)
        .map((n) => (
          <Node key={`${n.label}-${n.x}-${n.y}`} {...n} />
        ))}
      {labels}
    </DiagramSvg>
  );
}
