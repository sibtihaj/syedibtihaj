import React from "react";
import {
  AIIncidentPipelineDiagram,
  AIIncidentRetentionDiagram,
  AIIncidentRuntimeDiagram,
} from "@/components/diagrams/AIIncidentDiagrams";
import { DataTable } from "@/components/data/DataTable";

export function AIIncidentAssistantContent() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section>
        <h2>What it is</h2>
        <p>
          AI Incident Assistant is a production-style incident response
          playground. Operators sign in, chat with an LLM, create and update Sev1
          incidents, load templates (CAN, Sev1 canvas, RCA), and generate
          documents from structured incident data.
        </p>
        <p>
          It shows gateway-routed models, MCP-backed tools, Supabase-backed
          auth and sessions, rolling per-user chat quotas, and two layers of
          observability: gateway-level metrics plus trace-level tooling.
        </p>
        <DataTable
          caption="The stack, layer by layer"
          stackBelow="sm"
          columns={[{ label: "Layer", width: "26%" }, { label: "What runs there" }]}
          rows={[
            { key: "ui", cells: ["Interface", "Next.js and TypeScript, deployed on Vercel"] },
            {
              key: "models",
              cells: ["Models", "Vercel AI Gateway routes each request to the configured model; LangChain trims the history"],
            },
            {
              key: "tools",
              cells: ["Tools", "An MCP server with incident, template and document tools, storing its data as local JSON"],
            },
            {
              key: "data",
              cells: ["Auth and data", "Supabase Auth, and Postgres for chat sessions and the per-user quota"],
            },
            { key: "abuse", cells: ["Abuse protection", "Cloudflare Turnstile and a rolling per-user chat quota"] },
            { key: "obs", cells: ["Observability", "Gateway-level metrics plus LangSmith traces"] },
          ]}
        />
      </section>

      <section>
        <h2>What each area does</h2>
        <DataTable
          caption="Capability matrix: what each area does"
          hideCaption
          stackBelow="sm"
          columns={[{ label: "Area", width: "26%" }, { label: "How it works" }]}
          rows={[
            {
              key: "chat",
              cells: [
                "Chat orchestration",
                "A route handler picks the model, binds the tools, trims the token history and keeps the session in sync.",
              ],
            },
            {
              key: "context",
              cells: [
                "Context",
                "A thin system prompt, history trimmed with LangChain, and the saved session memory folded into the system string.",
              ],
            },
            {
              key: "auth",
              cells: ["Authentication", "Supabase Auth with middleware guards at the edge, behind Cloudflare Turnstile."],
            },
            {
              key: "memory",
              cells: [
                "Session memory",
                "A Postgres JSONB envelope holds the raw messages, a structured memory summary and key facts. It is re-injected on every turn and written back to the same row the user owns under row level security.",
              ],
            },
            {
              key: "abuse",
              cells: ["Abuse controls", "A rolling per-user window, counted through a Supabase RPC and enforced on the chat API."],
            },
          ]}
        />
      </section>

      <section>
        <h2>MCP tools</h2>
        <DataTable
          caption="MCP tools by group"
          hideCaption
          stackBelow="sm"
          columns={[{ label: "Group", width: "26%" }, { label: "Tools" }]}
          rows={[
            { key: "incident", title: "Incident", items: ["create_incident", "get_incident", "update_incident", "list_incidents"] },
            {
              key: "templates",
              title: "Templates",
              items: ["get_can_templates", "get_sev1_canvas", "get_rca_templates", "load_template"],
            },
            { key: "documents", title: "Documents", items: ["generate_can_document", "generate_rca_document"] },
            { key: "meta", title: "Meta", items: ["list_tools"] },
          ].map((g) => ({
            key: g.key,
            cells: [
              g.title,
              <ul key="tools" className="flex flex-wrap gap-x-2 gap-y-1.5">
                {g.items.map((item) => (
                  <li key={item}>
                    <code className="rounded bg-cobalt-wash px-1.5 py-0.5 font-mono text-[0.8125rem] text-ink">{item}</code>
                  </li>
                ))}
              </ul>,
            ],
          }))}
        />
        <p>
          Incident and template storage is local JSON in the MCP server&apos;s
          data directory, with validation, safer writes and bounded runtime.
        </p>
      </section>

      <section>
        <h2>How a request flows</h2>
        <p>
          Three views of one chat turn: how the prompt is built, how memory is
          kept between turns, and the order of calls from submit to response.
        </p>

        <h3>Request pipeline</h3>
        <p>
          The system prompt is thin, the history is trimmed with LangChain, and
          the saved session memory is folded into the system string. The request
          then branches into a model-only path or a tool-enabled one.
        </p>
        <AIIncidentPipelineDiagram />

        <h3>Context retention</h3>
        <p>
          From the browser, the envelope is loaded and merged, optional CAN
          guardrails apply, the history is trimmed to a token budget and the
          model generates. Memory is written back to the same row the user
          already owns under RLS.
        </p>
        <AIIncidentRetentionDiagram />

        <h3>End-to-end runtime</h3>
        <p>
          The request runs from the user&apos;s submit through API orchestration
          and the decision gates to optional MCP calls, then the response.
        </p>
        <AIIncidentRuntimeDiagram />
      </section>

      <section>
        <h2>Environment controls</h2>
        <DataTable
          caption="Environment variables by area"
          hideCaption
          stackBelow="sm"
          columns={[{ label: "Area", width: "26%" }, { label: "Variables" }]}
          rows={[
            { key: "models", title: "Models", vars: ["AI_GATEWAY_MODEL", "AI_GATEWAY_BASE_URL"] },
            { key: "supabase", title: "Supabase", vars: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] },
            { key: "quota", title: "Quota", vars: ["CHAT_QUOTA_MAX", "CHAT_QUOTA_WINDOW_HOURS"] },
            { key: "security", title: "Security", vars: ["TURNSTILE_SECRET_KEY", "CAPTCHA_COOKIE_SECRET"] },
          ].map((g) => ({
            key: g.key,
            cells: [
              g.title,
              <ul key="vars" className="flex flex-wrap gap-x-2 gap-y-1.5">
                {g.vars.map((v) => (
                  <li key={v}>
                    <code className="rounded bg-cobalt-wash px-1.5 py-0.5 font-mono text-[0.8125rem] text-ink">{v}</code>
                  </li>
                ))}
              </ul>,
            ],
          }))}
        />
      </section>
    </div>
  );
}
