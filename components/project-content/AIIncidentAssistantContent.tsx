import React from "react";
import Image from "next/image";
import { MermaidBlock } from "@/components/MermaidBlock";

const RUNTIME_OVERVIEW = `flowchart TB
  B["Browser UI"]
  N["Next.js App Router (Node)"]
  C["POST /api/chat"]
  O["Orchestration: trim + memory merge + CAN fact checks"]
  G["Vercel AI Gateway"]
  M["MCP stdio client + child process"]
  S["Supabase: Auth + Postgres sessions + quota RPC"]
  T["Tools: incident CRUD, templates, CAN/RCA generation"]
  L["LangSmith / Langfuse (optional)"]
  X["Turnstile verification"]

  B --> N --> C --> O
  O --> G
  O --> M
  O --> S
  M --> T
  N --> X
  O -. optional traces .-> L`;

const DEPLOYMENT_OVERVIEW = `flowchart LR
  U["Operators"]
  V["Vercel: App + API routes"]
  F["Serverless function + MCP child"]
  P["Supabase: GoTrue + Postgres + RLS/RPC"]
  A["Vercel AI Gateway"]
  R["Model providers"]
  T["Cloudflare Turnstile"]

  U --> V
  V --> F
  F --> P
  F --> A --> R
  V --> T`;

export function AIIncidentAssistantContent() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section>
        <h2>What it is</h2>
        <p>
          AI Incident Assistant is a production-style incident response
          playground. Operators sign in, chat with an LLM, create/update Sev1
          incidents, load templates (CAN, Sev1 canvas, RCA), and generate
          document outputs from structured incident data.
        </p>
        <p>
          The build demonstrates gateway-routed models, MCP-backed tools,
          Supabase-backed auth/sessions, rolling per-user chat quotas, and
          hybrid observability (gateway-level metrics plus trace-level tooling).
        </p>
      </section>

      <section>
        <h2>What it does (user-visible)</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-zinc-200">
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-zinc-50 text-left text-zinc-700">
              <tr>
                <th className="px-3 py-2 font-normal">Area</th>
                <th className="px-3 py-2 font-normal">Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              <tr>
                <td className="px-3 py-2">Landing</td>
                <td className="px-3 py-2">Marketing / entry at <code>/</code>.</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Chat</td>
                <td className="px-3 py-2">
                  <code>/chat</code> orchestrates model + tools + trimming +
                  session persistence.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">Auth</td>
                <td className="px-3 py-2">
                  Supabase Auth + middleware guards; Turnstile-protected login.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">Sessions</td>
                <td className="px-3 py-2">
                  Postgres session envelope stores messages + memory summary/key
                  facts and re-injects each turn.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">Quotas</td>
                <td className="px-3 py-2">
                  Rolling per-user window via Supabase RPC on chat API.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">Observability UI</td>
                <td className="px-3 py-2">
                  <code>/observability</code> for gateway health + optional
                  LangSmith roots.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>MCP tool surface</h2>
        <ul>
          <li>
            <strong>Incident:</strong> <code>create_incident</code>,{" "}
            <code>get_incident</code>, <code>update_incident</code>,{" "}
            <code>list_incidents</code>
          </li>
          <li>
            <strong>Templates:</strong> <code>get_can_templates</code>,{" "}
            <code>get_sev1_canvas_templates</code>,{" "}
            <code>get_rca_templates</code>, <code>load_template</code>
          </li>
          <li>
            <strong>Documents:</strong> <code>generate_can_document</code>,{" "}
            <code>generate_rca_document</code>
          </li>
          <li>
            <strong>Meta:</strong> <code>list_tools</code>
          </li>
        </ul>
        <p>
          Incident/template storage is local JSON in the MCP server data
          directory with validation, safer writes, and bounded runtime.
        </p>
      </section>

      <section className="not-prose">
        <h2 className="mb-4 text-xl font-normal text-zinc-900">
          Runtime architecture
        </h2>
        <MermaidBlock
          chart={RUNTIME_OVERVIEW}
          caption="Browser → Next.js orchestration → AI Gateway + MCP tools + Supabase; optional trace exporters."
        />
      </section>

      <section className="not-prose">
        <h2 className="mb-4 text-xl font-normal text-zinc-900">
          Deployment architecture
        </h2>
        <MermaidBlock
          chart={DEPLOYMENT_OVERVIEW}
          caption="Production-style layout on Vercel/Supabase with gateway-routed models and Turnstile protection."
        />
      </section>

      <section className="not-prose mt-8">
        <h2 className="mb-4 text-xl font-normal text-zinc-900">
          Product screenshots
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <Image
              src="/images/ai-incident-assistant-home.png"
              alt="AI Incident Assistant landing page"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />
            <figcaption className="px-3 py-2 text-xs text-zinc-500">
              Landing and capability framing
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <Image
              src="/images/ai-incident-assistant-login.png"
              alt="AI Incident Assistant login screen"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />
            <figcaption className="px-3 py-2 text-xs text-zinc-500">
              Auth gate for the chat playground
            </figcaption>
          </figure>
        </div>
        <figure className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <Image
            src="/images/ai-incident-assistant-flow.png"
            alt="AI Incident Assistant chat flow page"
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
          <figcaption className="px-3 py-2 text-xs text-zinc-500">
            Chat flow narrative: prompt to MCP execution
          </figcaption>
        </figure>
      </section>

      <section>
        <h2>Environment controls used in this build</h2>
        <ul>
          <li>
            <strong>Models:</strong> <code>AI_GATEWAY_MODEL</code>,{" "}
            <code>AI_GATEWAY_BASE_URL</code>, <code>VERCEL_OIDC_TOKEN</code>{" "}
            or <code>AI_GATEWAY_API_KEY</code>
          </li>
          <li>
            <strong>Supabase:</strong> <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code>
          </li>
          <li>
            <strong>Quota:</strong> <code>CHAT_QUOTA_MAX</code>,{" "}
            <code>CHAT_QUOTA_WINDOW_HOURS</code>
          </li>
          <li>
            <strong>Observability:</strong> provider + LangSmith/Langfuse vars
          </li>
          <li>
            <strong>Login:</strong> Turnstile keys +{" "}
            <code>CAPTCHA_COOKIE_SECRET</code>
          </li>
        </ul>
      </section>
    </div>
  );
}
