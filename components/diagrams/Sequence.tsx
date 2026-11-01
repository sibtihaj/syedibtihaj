import React from "react";
import { BODY, CARD, COBALT, DiagramSvg, Edge, HEADING, INK, MUTED, PAPER } from "@/components/diagrams/kit";

/*
 * A sequence diagram drawn two ways from the same steps: lanes with lifelines on
 * wide screens, and a numbered, indented list of messages on narrow ones.
 */

export type Lane = { key: string; label: string; short: string };

export type SeqStep =
  | { type: "msg"; from: string; to: string; text: string; reply?: boolean; strong?: boolean }
  | { type: "note"; at: string; text: string }
  | { type: "frame"; kind: "opt" | "alt" | "loop"; sections: { label: string; steps: SeqStep[] }[] };

type SequenceProps = { id: string; title: string; description: string; lanes: Lane[]; steps: SeqStep[] };

/** A frame's operator (opt, alt, loop) in upright type, then its condition in italic. */
function FrameLabel({ kind, label }: { kind?: string; label: string }) {
  return (
    <>
      {kind ? (
        <tspan fontFamily={BODY} fontStyle="normal" fontSize="11.5" fill={INK}>
          {kind}
        </tspan>
      ) : null}
      <tspan dx={kind ? 7 : 0}>{label}</tspan>
    </>
  );
}

/* ------------------------------------------------------------------ wide */

const WIDE_W = 880;
const MARGIN = 12;

/** Rough width of an italic serif note at 12.5px, with padding. */
const noteWidth = (text: string) => Math.max(240, Math.round(text.length * 6.4) + 32);

/** Greedy word wrap by character count; SVG text does not wrap on its own. */
function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = "";
  text.split(" ").forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function lanesIn(steps: SeqStep[]): string[] {
  return steps.flatMap((s) =>
    s.type === "msg" ? [s.from, s.to] : s.type === "note" ? [s.at] : s.sections.flatMap((sec) => lanesIn(sec.steps))
  );
}

export function SequenceWide({ id, title, description, lanes, steps }: SequenceProps) {
  const laneW = (WIDE_W - MARGIN * 2) / lanes.length;
  const cx = (key: string) => MARGIN + laneW * (lanes.findIndex((l) => l.key === key) + 0.5);
  const parts: React.ReactNode[] = [];
  const frames: React.ReactNode[] = [];
  let y = 84;
  let n = 0;

  const walk = (list: SeqStep[], depth: number) => {
    list.forEach((step) => {
      n += 1;
      if (step.type === "msg") {
        const x1 = cx(step.from);
        const x2 = cx(step.to);
        if (step.from === step.to) {
          parts.push(
            <g key={`m-${n}`}>
              <Edge id={id} d={`M${x1} ${y - 4} H${x1 + 26} V${y + 12} H${x1 + 4}`} />
              <text x={x1 + 34} y={y + 8} fontSize="12.5" fill={INK} stroke={PAPER} strokeWidth="4" paintOrder="stroke">
                {step.text}
              </text>
            </g>
          );
          y += 38;
          return;
        }
        const dir = x2 > x1 ? 1 : -1;
        parts.push(
          <g key={`m-${n}`}>
            <text
              x={(x1 + x2) / 2}
              y={y}
              textAnchor="middle"
              fontSize="12.5"
              fill={step.reply ? MUTED : INK}
              stroke={PAPER}
              strokeWidth="4"
              paintOrder="stroke"
            >
              {step.text}
            </text>
            <Edge id={id} d={`M${x1 + dir * 3} ${y + 8} H${x2 - dir * 4}`} strong={step.strong} dashed={step.reply} />
          </g>
        );
        y += 32;
        return;
      }
      if (step.type === "note") {
        const x = cx(step.at);
        parts.push(
          <g key={`n-${n}`}>
            <rect
              x={x - noteWidth(step.text) / 2}
              y={y - 12}
              width={noteWidth(step.text)}
              height={24}
              rx="6"
              fill={CARD}
              stroke={INK}
              strokeOpacity="0.25"
            />
            <text x={x} y={y + 4} textAnchor="middle" fontFamily={HEADING} fontStyle="italic" fontSize="12.5" fill={MUTED}>
              {step.text}
            </text>
          </g>
        );
        y += 34;
        return;
      }
      const keys = lanesIn(step.sections.flatMap((s) => s.steps));
      const xs = keys.map(cx);
      const inset = depth * 10;
      const fx = Math.min(...xs) - 54 + inset;
      const fw = Math.max(...xs) + 54 - inset - fx;
      // Leave clear space under the previous arrow or note before the frame starts.
      y += 12;
      const top = y - 22;
      y += 8;
      const dividers: React.ReactNode[] = [];
      step.sections.forEach((sec, i) => {
        if (i > 0) {
          dividers.push(
            <line key={`d-${n}-${i}`} x1={fx} x2={fx + fw} y1={y - 22} y2={y - 22} stroke={INK} strokeOpacity="0.5" strokeDasharray="3 5" />
          );
        }
        dividers.push(
          <text
            key={`s-${n}-${i}`}
            x={fx + 10}
            y={y - 7}
            fontFamily={HEADING}
            fontStyle="italic"
            fontSize="12.5"
            fill={MUTED}
          >
            <FrameLabel kind={i === 0 ? step.kind : undefined} label={sec.label} />
          </text>
        );
        y += 14;
        walk(sec.steps, depth + 1);
        y += 6;
      });
      const bottom = y - 12;
      frames.push(
        <g key={`f-${n}`}>
          <rect x={fx} y={top} width={fw} height={bottom - top} rx="8" fill="none" stroke={INK} strokeOpacity="0.5" strokeDasharray="3 5" />
          {dividers}
        </g>
      );
      y += 18;
    });
  };
  walk(steps, 0);

  const height = y + 4;
  return (
    <DiagramSvg id={id} width={WIDE_W} height={height} title={title} description={description}>
      {lanes.map((lane) => {
        const x = cx(lane.key);
        return (
          <g key={lane.key}>
            <line x1={x} x2={x} y1={46} y2={height - 6} stroke={INK} strokeOpacity="0.2" strokeDasharray="2 5" />
            <rect x={x - laneW / 2 + 6} y={8} width={laneW - 12} height={38} rx="10" fill={CARD} stroke={INK} strokeWidth="1.4" />
            <text x={x} y={32} textAnchor="middle" fontFamily={HEADING} fontSize="14" fill={INK}>
              {lane.label}
            </text>
          </g>
        );
      })}
      {frames}
      {parts}
    </DiagramSvg>
  );
}

/* ---------------------------------------------------------------- narrow */

const NARROW_W = 320;

export function SequenceNarrow({ id, title, description, lanes, steps }: SequenceProps) {
  const short = (key: string) => lanes.find((l) => l.key === key)?.short ?? key;
  const parts: React.ReactNode[] = [];
  let y = 8;
  let count = 0;
  let k = 0;

  const walk = (list: SeqStep[], depth: number) => {
    const x = 4 + depth * 14;
    list.forEach((step) => {
      k += 1;
      if (step.type === "msg") {
        count += 1;
        const route = step.from === step.to ? short(step.from) : `${short(step.from)} → ${short(step.to)}`;
        parts.push(
          <g key={`m-${k}`}>
            <circle cx={x + 10} cy={y + 13} r="10" fill={step.strong ? COBALT : CARD} stroke={step.strong ? COBALT : INK} strokeWidth="1.2" />
            <text x={x + 10} y={y + 17} textAnchor="middle" fontSize="10.5" fill={step.strong ? PAPER : INK}>
              {count}
            </text>
            <text x={x + 28} y={y + 9} fontSize="11" fill={MUTED}>
              {route}
            </text>
            <text x={x + 28} y={y + 26} fontSize="13" fill={step.reply ? MUTED : INK} fontFamily={BODY}>
              {step.text}
            </text>
          </g>
        );
        y += 40;
        return;
      }
      if (step.type === "note") {
        const lines = wrap(step.text, Math.floor((NARROW_W - x - 32) / 6.6));
        parts.push(
          <g key={`n-${k}`}>
            <line x1={x + 4} x2={x + 16} y1={y + 9} y2={y + 9} stroke={COBALT} strokeWidth="1.5" />
            {lines.map((line, i) => (
              <text key={line} x={x + 28} y={y + 13 + i * 17} fontFamily={HEADING} fontStyle="italic" fontSize="13" fill={MUTED}>
                {line}
              </text>
            ))}
          </g>
        );
        y += 28 + (lines.length - 1) * 17;
        return;
      }
      const top = y;
      step.sections.forEach((sec, i) => {
        parts.push(
          <text key={`s-${k}-${i}`} x={x + 12} y={y + 13} fontFamily={HEADING} fontStyle="italic" fontSize="13" fill={MUTED}>
            <FrameLabel kind={i === 0 ? step.kind : undefined} label={sec.label} />
          </text>
        );
        y += 24;
        walk(sec.steps, depth + 1);
      });
      parts.push(
        <path
          key={`b-${k}`}
          d={`M${x + 8} ${top + 2} H${x + 3} V${y - 6} H${x + 8}`}
          fill="none"
          stroke={INK}
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      );
      y += 6;
    });
  };
  walk(steps, 0);

  return (
    <DiagramSvg id={id} width={NARROW_W} height={y + 4} title={title} description={description}>
      {parts}
    </DiagramSvg>
  );
}
