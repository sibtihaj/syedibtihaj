import React from "react";
import { cn } from "@/lib/utils";

/*
 * Project banners: abstract ink-on-paper artwork in the site palette.
 * Everything is computed from fixed numbers at module load (no randomness), and
 * the banners render in server components, so the markup is identical every time.
 * They are decorative: the project title next to or above them carries the name.
 */

const PAPER = "#f6f5f1";
const INK = "#0d1b3e";
const COBALT = "#1e4fd6";
const HEADING = "var(--font-heading), Georgia, serif";

const W = 800;
const H = 500;

const round = (n: number) => Math.round(n * 10) / 10;

/** Paper ground, a soft cobalt tint in one corner, and the numeral with its fading rule. */
function BannerFrame({
  id,
  numeral,
  tintAt,
  className,
  children,
}: {
  id: string;
  numeral: string;
  tintAt: { cx: string; cy: string };
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div aria-hidden className={cn("relative aspect-[16/10] w-full overflow-hidden", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        focusable="false"
      >
        <defs>
          <radialGradient id={`${id}-tint`} cx={tintAt.cx} cy={tintAt.cy} r="0.75">
            <stop offset="0" stopColor={COBALT} stopOpacity="0.08" />
            <stop offset="1" stopColor={COBALT} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-rule`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={COBALT} />
            <stop offset="0.4" stopColor={COBALT} stopOpacity="0.3" />
            <stop offset="1" stopColor={COBALT} stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill={PAPER} />
        <rect width={W} height={H} fill={`url(#${id}-tint)`} />

        {children}

        <text x="48" y="74" fontFamily={HEADING} fontStyle="italic" fontSize="30" fill={COBALT}>
          {numeral}
        </text>
        <rect x="48" y="92" width="260" height="1.5" fill={`url(#${id}-rule)`} />
      </svg>
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply" />
    </div>
  );
}

/* ---------- AI marking: lines of handwritten working, read and marked ---------- */

const WORK_ROWS = 9;
const WORK_Y0 = 156;
const WORK_DY = 36;
const WORK_X0 = 84;
const WORK_MARGIN = 628; // the ruled margin where marks are written
const WORK_SIGNAL = 3; // the row being read, drawn in cobalt

/** Small deterministic hash in [0, 1) so every row and word gets a stable shape. */
function hash01(a: number, b: number) {
  const h = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return h - Math.floor(h);
}

/** One handwritten "word": a run of small cursive loops sitting on the baseline. */
function wordPath(x0: number, base: number, length: number, height: number, slant: number) {
  const a = 2.1; // forward travel per radian
  const b = 3.4; // loop radius, larger than `a` so the stroke curls back on itself
  const tMax = length / a;
  const points: string[] = [];
  for (let t = 0; t <= tMax; t += 0.32) {
    const lift = (1 - Math.cos(t)) / 2;
    const x = x0 + a * t - b * Math.sin(t) + slant * lift * height;
    const y = base - 2 - lift * height;
    points.push(`${round(x)} ${round(y)}`);
  }
  return `M${points.join(" L")}`;
}

const WORK_LINES = Array.from({ length: WORK_ROWS }, (_, row) => {
  const base = WORK_Y0 + row * WORK_DY;
  // Part labels start flush; the working under them is indented a little.
  const indent = row === 0 || row === 5 ? 0 : 22;
  const end = WORK_X0 + 300 + hash01(row, 0) * 200;
  const words: string[] = [];
  let x = WORK_X0 + indent;
  let w = 0;
  while (x < end) {
    const length = 26 + hash01(row, w + 1) * 70;
    const height = 9 + hash01(row, w + 7) * 7;
    words.push(wordPath(x, base, Math.min(length, end - x + 10), height, 0.35));
    x += length + 16 + hash01(row, w + 13) * 10;
    w += 1;
  }
  // Most lines earn a tick in the margin; a couple are left unmarked.
  const mark = row === 2 || row === 6 ? "none" : "tick";
  return { row, base, words, mark, signal: row === WORK_SIGNAL };
});

/**
 * AI marking banner: ruled paper with lines of handwritten working, a margin rule,
 * and ticks in the margin where lines have been read and marked. The line being
 * read is cobalt.
 */
export function AIMarkingBanner({ className }: { className?: string }) {
  return (
    <BannerFrame id="banner-aim" numeral="No. 01" tintAt={{ cx: "0.2", cy: "0.85" }} className={className}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {WORK_LINES.map((line) => (
          <line
            key={`rule-${line.row}`}
            x1="40"
            x2={W - 40}
            y1={line.base}
            y2={line.base}
            stroke={INK}
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        ))}
        <line x1={WORK_MARGIN} x2={WORK_MARGIN} y1="122" y2={H - 20} stroke={COBALT} strokeOpacity="0.35" strokeWidth="1.2" />
        {WORK_LINES.map((line) =>
          line.words.map((d, i) => (
            <path
              key={`w-${line.row}-${i}`}
              d={d}
              stroke={line.signal ? COBALT : INK}
              strokeOpacity={line.signal ? 1 : 0.55}
              strokeWidth={line.signal ? 1.6 : 1.1}
            />
          ))
        )}
        {WORK_LINES.filter((line) => line.mark === "tick").map((line) => (
          <path
            key={`t-${line.row}`}
            d={`M${WORK_MARGIN + 40} ${line.base - 11} L${WORK_MARGIN + 48} ${line.base - 3} L${WORK_MARGIN + 66} ${line.base - 22}`}
            stroke={line.signal ? COBALT : INK}
            strokeOpacity={line.signal ? 1 : 0.6}
            strokeWidth={line.signal ? 2.2 : 1.5}
          />
        ))}
      </g>
    </BannerFrame>
  );
}

/* ---------- AI Incident Assistant: a disturbance in the signal, settling into calm ---------- */

const RIPPLE_LINES = 15;
const RIPPLE_SIGNAL = 7; // the one line drawn in cobalt

function ripplePath(k: number) {
  const base = 158 + k * 19;
  // Lines in the middle of the stack carry the most energy.
  const centre = (RIPPLE_LINES - 1) / 2;
  const weight = 1 - Math.abs(k - centre) / (centre + 2);
  const amp = 42 * weight;
  const phase = k * 0.55;
  const points: string[] = [];
  for (let x = -20; x <= W + 20; x += 6) {
    // Agitated near the left third, decaying to a flat, calm line on the right.
    const rise = x < 120 ? 0.35 + 0.65 * Math.max(0, (x + 20) / 140) : 1;
    const decay = x < 120 ? 1 : Math.exp(-(x - 120) / 190);
    const y = base + amp * rise * decay * Math.sin(x * 0.05 + phase) * Math.cos(x * 0.011 + k * 0.3);
    points.push(`${round(x)} ${round(y)}`);
  }
  return `M${points.join(" L")}`;
}

const RIPPLES = Array.from({ length: RIPPLE_LINES }, (_, k) => ({
  d: ripplePath(k),
  signal: k === RIPPLE_SIGNAL,
  opacity: round(0.16 + 0.42 * (1 - Math.abs(k - RIPPLE_SIGNAL) / RIPPLE_LINES)),
}));

/**
 * AI Incident Assistant banner: a stack of ink lines thrown into a ripple on the
 * left, as if by an alert, that settle into calm parallel lines on the right.
 * One line, the signal, is cobalt.
 */
export function AIIncidentBanner({ className }: { className?: string }) {
  return (
    <BannerFrame id="banner-aia" numeral="No. 02" tintAt={{ cx: "0.15", cy: "0.6" }} className={className}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {RIPPLES.filter((r) => !r.signal).map((r, i) => (
          <path key={i} d={r.d} stroke={INK} strokeOpacity={r.opacity} strokeWidth="1.2" />
        ))}
        {RIPPLES.filter((r) => r.signal).map((r, i) => (
          <path key={`s${i}`} d={r.d} stroke={COBALT} strokeWidth="2.2" />
        ))}
      </g>
    </BannerFrame>
  );
}

/* ---------- IB Scheduling: a field of time slots, a few of them taken ---------- */

const SLOT_COLS = 11;
const SLOT_ROWS = 10;
const SLOT_W = 50;
const SLOT_H = 20;
const SLOT_X0 = 236;
const SLOT_Y0 = 132;
const SLOT_DX = 58;
const SLOT_DY = 34;

/** Fixed pattern: which slots are booked (ink) and which three are being reserved (cobalt). */
const RESERVED = new Set(["4,3", "6,5", "8,2"]);

function slotState(col: number, row: number): "open" | "booked" | "reserved" {
  if (RESERVED.has(`${col},${row}`)) return "reserved";
  const h = ((col * 92837 + row * 12345 + col * row * 7919) % 997) % 9;
  return h < 2 ? "booked" : "open";
}

const SLOTS = Array.from({ length: SLOT_COLS * SLOT_ROWS }, (_, n) => {
  const col = n % SLOT_COLS;
  const row = Math.floor(n / SLOT_COLS);
  // Each day column sits slightly lower than the last, like a week laid out on a desk.
  const x = SLOT_X0 + col * SLOT_DX;
  const y = SLOT_Y0 + row * SLOT_DY + col * 3;
  return { col, row, x, y, state: slotState(col, row) };
});

/**
 * IB Scheduling banner: a quiet field of time slots drawn as ink outlines, some
 * filled where they are booked and three marked in cobalt, fading into the paper
 * on the left.
 */
export function IBSchedulingBanner({ className }: { className?: string }) {
  const id = "banner-ibs";
  return (
    <BannerFrame id={id} numeral="No. 03" tintAt={{ cx: "0.85", cy: "0.2" }} className={className}>
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0.22" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width={W} height={H} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`}>
        {SLOTS.map((s) => (
          <rect
            key={`${s.col}-${s.row}`}
            x={s.x}
            y={s.y}
            width={SLOT_W}
            height={SLOT_H}
            rx="4"
            fill={s.state === "booked" ? INK : s.state === "reserved" ? COBALT : "none"}
            fillOpacity={s.state === "booked" ? 0.78 : 1}
            stroke={s.state === "reserved" ? COBALT : INK}
            strokeOpacity={s.state === "open" ? 0.28 : 1}
            strokeWidth="1.2"
          />
        ))}
      </g>
    </BannerFrame>
  );
}
