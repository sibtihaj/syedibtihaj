import React from "react";

/*
 * Designed project covers, drawn as inline SVG in the site's own language:
 * paper ground, navy ink outlines, one cobalt path for the flow that matters,
 * the italic serif numeral and the fading cobalt rule.
 * Every node and edge comes from the case study diagrams in
 * components/project-content/*; nothing here is decorative invention.
 */

const PAPER = "#f6f5f1";
const PAPER_CARD = "#fbfaf7";
const INK = "#0d1b3e";
const INK_MUTED = "#5e6679";
const COBALT = "#1e4fd6";

const HEADING = "var(--font-heading), Georgia, serif";
const BODY = "var(--font-body), system-ui, sans-serif";

type CoverProps = { className?: string; decorative?: boolean };

/** Shared frame: paper ground, numeral, fading rule and a caption. */
function CoverFrame({
  id,
  numeral,
  caption,
  title,
  description,
  decorative,
  className,
  children,
}: {
  id: string;
  numeral: string;
  caption: string;
  title: string;
  description: string;
  decorative?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-labelledby": `${id}-title ${id}-desc` };

  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      style={{ fontFamily: BODY }}
      {...a11y}
    >
      {decorative ? null : (
        <>
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-desc`}>{description}</desc>
        </>
      )}
      <defs>
        <linearGradient id={`${id}-rule`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={COBALT} />
          <stop offset="0.4" stopColor={COBALT} stopOpacity="0.3" />
          <stop offset="1" stopColor={COBALT} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-wash`} cx="1" cy="0" r="0.9">
          <stop offset="0" stopColor={COBALT} stopOpacity="0.07" />
          <stop offset="1" stopColor={COBALT} stopOpacity="0" />
        </radialGradient>
        <marker id={`${id}-ink`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1 L9 5 L1 9" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        </marker>
        <marker id={`${id}-cobalt`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1 L9 5 L1 9" fill="none" stroke={COBALT} strokeWidth="1.8" strokeLinecap="round" />
        </marker>
      </defs>

      <rect width="800" height="500" fill={PAPER} />
      <rect width="800" height="500" fill={`url(#${id}-wash)`} />

      <text x="44" y="64" fontFamily={HEADING} fontStyle="italic" fontSize="28" fill={COBALT}>
        {numeral}
      </text>
      <rect x="44" y="80" width="300" height="1.5" fill={`url(#${id}-rule)`} />
      <text x="756" y="64" textAnchor="end" fontSize="17" fill={INK_MUTED}>
        {caption}
      </text>

      {children}
    </svg>
  );
}

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string[];
  focal?: boolean;
};

/** A component box: ink outline on paper, or solid ink for the focal component. */
function Node({ x, y, w, h, label, sub = [], focal }: NodeProps) {
  const lines = 1 + sub.length;
  const lineGap = 22;
  const top = y + h / 2 - ((lines - 1) * lineGap) / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill={focal ? INK : PAPER_CARD}
        stroke={INK}
        strokeWidth="1.6"
      />
      <text
        x={x + w / 2}
        y={top + 8}
        textAnchor="middle"
        fontFamily={HEADING}
        fontSize="24"
        fill={focal ? PAPER : INK}
      >
        {label}
      </text>
      {sub.map((line, i) => (
        <text
          key={line}
          x={x + w / 2}
          y={top + 8 + (i + 1) * lineGap}
          textAnchor="middle"
          fontSize="15.5"
          fill={focal ? "#c9d3ea" : INK_MUTED}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Edge({
  d,
  id,
  strong,
  dashed,
}: {
  d: string;
  id: string;
  strong?: boolean;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={strong ? COBALT : INK}
      strokeWidth={strong ? 2.6 : 1.6}
      strokeDasharray={dashed ? "5 6" : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd={`url(#${id}-${strong ? "cobalt" : "ink"})`}
    />
  );
}

function EdgeLabel({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={HEADING} fontStyle="italic" fontSize="16" fill={INK_MUTED}>
      {children}
    </text>
  );
}

/**
 * AI Incident Assistant: the request path from the case study pipeline.
 * Operator chat to the chat route (trimmed history, injected memory), Supabase
 * for auth, sessions and quota, then the decision gate: conversational turns go
 * to the gateway-routed model, actionable ones to the MCP incident tools.
 */
export function AIIncidentCover({ className, decorative }: CoverProps) {
  const id = "cover-aia";
  return (
    <CoverFrame
      id={id}
      numeral="No. 01"
      caption="Request path"
      title="AI Incident Assistant request path"
      description="Operator chat in Next.js sends a message to the chat route, which trims history and injects session memory, with Supabase handling auth, sessions and quota. A decision gate sends conversational turns to a model routed through the AI Gateway and actionable ones to MCP incident tools that work with incidents and CAN and RCA templates."
      decorative={decorative}
      className={className}
    >
      <Node x={26} y={196} w={168} h={92} label="Operator chat" sub={["Next.js · Turnstile"]} />
      <Node x={232} y={196} w={164} h={92} label="Chat route" sub={["trim · memory"]} />
      <Node x={232} y={372} w={164} h={92} label="Supabase" sub={["auth · sessions", "quota"]} />

      {/* Decision gate */}
      <path d="M478 206 L514 242 L478 278 L442 242 Z" fill={PAPER_CARD} stroke={INK} strokeWidth="1.6" />
      <text x="466" y="306" textAnchor="end" fontSize="15.5" fill={INK_MUTED}>
        decision gate
      </text>

      <Node x={574} y={120} w={190} h={92} label="Model only" sub={["AI Gateway routed"]} />
      <Node x={574} y={282} w={190} h={112} label="MCP tools" sub={["incidents", "CAN · RCA templates"]} focal />

      <Edge id={id} d="M194 242 H226" strong />
      <Edge id={id} d="M396 242 H436" strong />
      <Edge id={id} d="M478 206 V166 H568" />
      <Edge id={id} d="M478 278 V338 H568" strong />
      <Edge id={id} d="M314 288 V366" dashed />

      <EdgeLabel x={522} y={155}>conversational</EdgeLabel>
      <EdgeLabel x={522} y={325}>actionable</EdgeLabel>
    </CoverFrame>
  );
}

/**
 * IB Scheduling: the deployment from the case study diagram. Browser to
 * Next.js on Vercel, Bearer JWT to the Go API on Railway, which verifies the
 * token against Supabase Auth, books through pgx into Supabase Postgres and
 * exports metrics that Prometheus scrapes and Grafana charts.
 */
export function IBSchedulingCover({ className, decorative }: CoverProps) {
  const id = "cover-ibs";
  const group = (x: number, y: number, w: number, h: number, name: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="18" fill="none" stroke={INK} strokeOpacity="0.35" strokeDasharray="4 6" />
      <text x={x + 16} y={y - 10} fontFamily={HEADING} fontStyle="italic" fontSize="18" fill={INK_MUTED}>
        {name}
      </text>
    </g>
  );

  return (
    <CoverFrame
      id={id}
      numeral="No. 02"
      caption="Deployment"
      title="IB Scheduling deployment"
      description="A browser loads the Next.js App Router frontend on Vercel, which calls the Go API on Railway with a Bearer JWT. The Go API, built with chi, pgx and go-oidc, verifies tokens against Supabase Auth and reads and writes slots and reservations in Supabase Postgres. It exports metrics that Prometheus scrapes and Grafana charts, both also on Railway."
      decorative={decorative}
      className={className}
    >
      {group(176, 168, 176, 162, "Vercel")}
      {group(392, 126, 210, 346, "Railway")}
      {group(632, 126, 148, 226, "Supabase")}

      <Node x={24} y={206} w={124} h={84} label="Browser" />
      <Node x={192} y={202} w={144} h={92} label="Next.js" sub={["App Router"]} />
      <Node x={410} y={146} w={174} h={104} label="Go API" sub={["chi · pgx", "go-oidc"]} focal />
      <Node x={410} y={300} w={174} h={64} label="Prometheus" />
      <Node x={410} y={392} w={174} h={64} label="Grafana" />
      <Node x={646} y={144} w={120} h={84} label="Auth" sub={["OIDC JWKS"]} />
      <Node x={646} y={250} w={120} h={88} label="Postgres" sub={["slots", "reservations"]} />

      <Edge id={id} d="M148 248 H186" strong />
      <Edge id={id} d="M336 248 H370 V198 H404" strong />
      <Edge id={id} d="M584 226 H612 V294 H640" strong />
      <Edge id={id} d="M584 172 H640" dashed />
      <Edge id={id} d="M497 250 V294" />
      <Edge id={id} d="M497 364 V386" />

      <EdgeLabel x={372} y={186}>JWT</EdgeLabel>
      <EdgeLabel x={508} y={278} anchor="start">/metrics</EdgeLabel>
    </CoverFrame>
  );
}
