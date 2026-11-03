import React from "react";
import { BODY, COBALT, DiagramSvg, HEADING, INK, MUTED } from "@/components/diagrams/kit";

/*
 * Horizontal bar charts for the case studies: static SVG drawn on the server
 * from fixed numbers, in the diagram kit's language. Bars are neutral; one
 * cobalt bar carries the point of the chart. Every bar is labelled directly, so
 * there is no legend, and each figure ships a table of the same numbers.
 *
 * Like the diagrams, a figure has a wide drawing for large screens and a
 * stacked drawing for phones, sharing one scale within each drawing.
 */

/** Neutral bar fill. 3:1 against the paper, and well apart from cobalt for colour-blind readers. */
const NEUTRAL = "#7f889d";
const GRID = "#dcdbd4";

export type BarDatum = {
  label: string;
  /** Length in the chart's unit, or null for "no limit", drawn as an open dashed line. */
  value: number | null;
  /** Text shown at the bar, for example "35 s" or "no limit". */
  display: string;
  /** The bar the chart is about, drawn in cobalt. */
  highlight?: boolean;
  /** Spoken in the bar's hover title, after the value. */
  note?: string;
};

export type BarPanel = {
  /** Panel name, for example "Before the fix". */
  label: string;
  bars: BarDatum[];
};

type ChartProps = {
  id: string;
  title: string;
  description: string;
  /** Largest value on the scale. */
  max: number;
  ticks: number[];
  /** Short unit for tick labels, for example "s". */
  unit: string;
  panels: BarPanel[];
};

/** A bar anchored square at the baseline with a 4px rounded data end. */
function barPath(x0: number, x1: number, y: number, h: number) {
  const r = Math.min(4, h / 2, Math.max(0, x1 - x0));
  return `M${x0} ${y} H${x1 - r} Q${x1} ${y} ${x1} ${y + r} V${y + h - r} Q${x1} ${y + h} ${x1 - r} ${y + h} H${x0} Z`;
}

function barTitle(panel: BarPanel, bar: BarDatum) {
  return `${panel.label}: ${bar.label}, ${bar.display}${bar.note ? `. ${bar.note}` : ""}`;
}

function OpenBar({ x0, x1, y, highlight }: { x0: number; x1: number; y: number; highlight?: boolean }) {
  const color = highlight ? COBALT : NEUTRAL;
  return (
    <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x0 + 1} ${y} H${x1 - 2}`} strokeDasharray="5 5" />
      <path d={`M${x1 - 7} ${y - 5} L${x1} ${y} L${x1 - 7} ${y + 5}`} />
    </g>
  );
}

/** Stacks the panels top to bottom: each gets a header band and one row per bar. */
function stackPanels(panels: BarPanel[], start: number, head: number, row: number, gap: number) {
  const layout: { panel: BarPanel; top: number; bottom: number }[] = [];
  let cursor = start;
  panels.forEach((panel, p) => {
    if (p > 0) cursor += gap;
    const top = cursor;
    cursor += head + panel.bars.length * row;
    layout.push({ panel, top, bottom: cursor });
  });
  return { layout, end: cursor };
}

/* ------------------------------------------------------------------ wide */

const W_WIDTH = 880;
const W_LABEL_RIGHT = 236;
const W_X0 = 252;
const W_X1 = 772;
const W_OPEN_END = 800;
const W_ROW = 32;
const W_BAR = 14;
const W_HEAD = 34;
const W_GAP = 24;
const W_AXIS = 30;

function WideBars({ id, title, description, max, ticks, unit, panels }: ChartProps) {
  const sx = (v: number) => W_X0 + (v / max) * (W_X1 - W_X0);
  const { layout, end: last } = stackPanels(panels, 6, W_HEAD, W_ROW, W_GAP);
  const plotTop = layout[0].top + W_HEAD - 6;
  const plotBottom = last + 4;
  const height = plotBottom + W_AXIS;

  return (
    <DiagramSvg id={id} width={W_WIDTH} height={height} title={title} description={description}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={plotTop} y2={plotBottom} stroke={GRID} strokeWidth="1" />
          <text x={sx(t)} y={plotBottom + 20} textAnchor="middle" fontSize="12.5" fill={MUTED} className="tabular-nums">
            {`${t} ${unit}`}
          </text>
        </g>
      ))}
      {layout.map(({ panel, top, bottom }) => (
        <g key={panel.label}>
          <text x={0} y={top + 18} fontFamily={HEADING} fontStyle="italic" fontSize="15" fill={INK}>
            {panel.label}
          </text>
          <line x1={W_X0} x2={W_X0} y1={top + W_HEAD - 4} y2={bottom} stroke={INK} strokeOpacity="0.55" strokeWidth="1" />
          {panel.bars.map((bar, i) => {
            const rowTop = top + W_HEAD + i * W_ROW;
            const cy = rowTop + W_ROW / 2;
            const end = bar.value === null ? W_OPEN_END : sx(bar.value);
            return (
              <g key={bar.label}>
                <title>{barTitle(panel, bar)}</title>
                <rect x={0} y={rowTop} width={W_WIDTH} height={W_ROW} fill="transparent" />
                <text x={W_LABEL_RIGHT} y={cy + 5} textAnchor="end" fontSize="14" fill={INK}>
                  {bar.label}
                </text>
                {bar.value === null ? (
                  <OpenBar x0={W_X0} x1={W_OPEN_END} y={cy} highlight={bar.highlight} />
                ) : (
                  <path d={barPath(W_X0, end, cy - W_BAR / 2, W_BAR)} fill={bar.highlight ? COBALT : NEUTRAL} />
                )}
                <text
                  x={end + (bar.value === null ? 14 : 8)}
                  y={cy + 5}
                  fontSize="13.5"
                  fill={bar.highlight ? INK : MUTED}
                  className="tabular-nums"
                >
                  {bar.display}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </DiagramSvg>
  );
}

/* --------------------------------------------------------------- stacked */

const N_WIDTH = 320;
const N_X0 = 2;
const N_X1 = 280;
const N_OPEN_END = 300;
const N_ROW = 42;
const N_BAR = 11;
const N_HEAD = 30;
const N_GAP = 20;
const N_AXIS = 26;

function NarrowBars({ id, title, description, max, ticks, unit, panels }: ChartProps) {
  const sx = (v: number) => N_X0 + (v / max) * (N_X1 - N_X0);
  const { layout, end: last } = stackPanels(panels, 4, N_HEAD, N_ROW, N_GAP);
  const plotTop = layout[0].top + N_HEAD;
  const plotBottom = last + 2;
  const height = plotBottom + N_AXIS;

  return (
    <DiagramSvg id={id} width={N_WIDTH} height={height} title={title} description={description}>
      {ticks.map((t, i) => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={plotTop} y2={plotBottom} stroke={GRID} strokeWidth="1" />
          <text
            x={sx(t)}
            y={plotBottom + 17}
            textAnchor={i === 0 ? "start" : "middle"}
            fontSize="11.5"
            fill={MUTED}
            className="tabular-nums"
          >
            {`${t} ${unit}`}
          </text>
        </g>
      ))}
      {layout.map(({ panel, top }) => (
        <g key={panel.label}>
          <text x={0} y={top + 17} fontFamily={HEADING} fontStyle="italic" fontSize="15" fill={INK}>
            {panel.label}
          </text>
          {panel.bars.map((bar, i) => {
            const rowTop = top + N_HEAD + i * N_ROW;
            const textY = rowTop + 14;
            const barY = rowTop + 22;
            const end = bar.value === null ? N_OPEN_END : sx(bar.value);
            return (
              <g key={bar.label}>
                <title>{barTitle(panel, bar)}</title>
                <rect x={0} y={rowTop} width={N_WIDTH} height={N_ROW} fill="transparent" />
                <text x={N_X0} y={textY} fontSize="13" fill={INK}>
                  {bar.label}
                </text>
                <text
                  x={N_WIDTH - 2}
                  y={textY}
                  textAnchor="end"
                  fontSize="13"
                  fill={bar.highlight ? INK : MUTED}
                  className="tabular-nums"
                >
                  {bar.display}
                </text>
                {bar.value === null ? (
                  <OpenBar x0={N_X0} x1={N_OPEN_END} y={barY + N_BAR / 2} highlight={bar.highlight} />
                ) : (
                  <path d={barPath(N_X0, end, barY, N_BAR)} fill={bar.highlight ? COBALT : NEUTRAL} />
                )}
              </g>
            );
          })}
        </g>
      ))}
    </DiagramSvg>
  );
}

/* ---------------------------------------------------------------- figure */

/**
 * A bar chart figure: the wide drawing at xl and up, the stacked one below,
 * a caption, and the same numbers as a table behind a disclosure.
 */
export function BarChartFigure({
  id,
  caption,
  table,
  tableLabel = "Show these numbers as a table",
  ...chart
}: Omit<ChartProps, "id"> & {
  id: string;
  caption?: string;
  table?: React.ReactNode;
  tableLabel?: string;
}) {
  return (
    <figure className="not-prose my-10">
      <div className="rounded-2xl border border-ink/10 bg-paper px-4 py-5 sm:px-6 sm:py-6" style={{ fontFamily: BODY }}>
        <div className="hidden xl:block">
          <WideBars id={`${id}-w`} {...chart} />
        </div>
        <div className="mx-auto max-w-[420px] xl:hidden">
          <NarrowBars id={`${id}-n`} {...chart} />
        </div>
      </div>
      {caption ? <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">{caption}</figcaption> : null}
      {table ? (
        <details className="group mt-2">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded text-sm text-cobalt underline decoration-cobalt/30 underline-offset-4 hover:decoration-cobalt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt [&::-webkit-details-marker]:hidden">
            <svg
              aria-hidden="true"
              viewBox="0 0 10 10"
              className="h-2.5 w-2.5 shrink-0 transition-transform group-open:rotate-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 1.5 L7 5 L3.5 8.5" />
            </svg>
            {tableLabel}
          </summary>
          {table}
        </details>
      ) : null}
    </figure>
  );
}
