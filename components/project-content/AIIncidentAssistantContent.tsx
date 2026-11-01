import React from "react";
import {
  AIIncidentPipelineDiagram,
  AIIncidentRetentionDiagram,
  AIIncidentRuntimeDiagram,
} from "@/components/diagrams/AIIncidentDiagrams";
import { DataTable } from "@/components/data/DataTable";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export function AIIncidentAssistantContent() {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <Heading as="h2" className="text-2xl font-normal text-ink tracking-tight">What it is</Heading>
        <div className="space-y-4">
          <Paragraph className="text-lg leading-relaxed text-ink-body">
            AI Incident Assistant is a production-style incident response
            playground. Operators sign in, chat with an LLM, create/update Sev1
            incidents, load templates (CAN, Sev1 canvas, RCA), and generate
            document outputs from structured incident data.
          </Paragraph>
          <Paragraph className="text-lg leading-relaxed text-ink-body">
            The build demonstrates gateway-routed models, MCP-backed tools,
            Supabase-backed auth/sessions, rolling per-user chat quotas, and
            hybrid observability (gateway-level metrics plus trace-level tooling).
          </Paragraph>
        </div>
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

      <section className="space-y-6">
        <Heading as="h2" className="text-2xl font-normal text-ink tracking-tight">Capability matrix</Heading>
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

      <section className="space-y-6">
        <Heading as="h2" className="text-2xl font-normal text-ink tracking-tight">MCP tool surface</Heading>
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
        <Paragraph className="text-sm text-ink-muted italic">
          Incident/template storage is local JSON in the MCP server data directory with validation, safer writes, and bounded runtime.
        </Paragraph>
      </section>

      <div className="my-24 h-px w-full bg-gradient-to-r from-transparent via-rule to-transparent" />

      {/* Architecture Diagrams Section */}
      <section className="space-y-16">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <Heading as="h2" className="text-2xl md:text-3xl font-normal text-ink tracking-tight">Architecture & Flow</Heading>
          <Paragraph className="text-lg text-ink-muted">
            A high-fidelity breakdown of how the AI Incident Assistant orchestrates UI, model generation, and tool execution.
          </Paragraph>
        </div>

        <div className="space-y-24">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-cobalt-wash/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-cobalt" />
                <h3 className="font-heading text-base italic text-cobalt">01 / Pipeline</h3>
              </div>
              <div className="space-y-2">
                <Heading as="h3" className="text-2xl font-normal text-ink">Optimized Request Pipeline</Heading>
                <Paragraph className="text-ink-muted max-w-3xl">
                  Thin system prompt, LangChain-trimmed history, persisted session memory folded into the system string, then branch into model-only or tool-enabled execution.
                </Paragraph>
              </div>
              <AIIncidentPipelineDiagram />
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-cobalt-wash/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-cobalt" />
                <h3 className="font-heading text-base italic text-cobalt">02 / Retention</h3>
              </div>
              <div className="space-y-2">
                <Heading as="h3" className="text-2xl font-normal text-ink">Context Retention Flow</Heading>
                <Paragraph className="text-ink-muted max-w-3xl">
                  From the browser through load/merge of the envelope, optional CAN guardrails, token trimming, and generation, with memory written back under the same row the user already owns via RLS.
                </Paragraph>
              </div>
              <AIIncidentRetentionDiagram />
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-cobalt-wash/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-cobalt" />
                <h3 className="font-heading text-base italic text-cobalt">03 / Execution</h3>
              </div>
              <div className="space-y-2">
                <Heading as="h3" className="text-2xl font-normal text-ink">End-to-End Runtime</Heading>
                <Paragraph className="text-ink-muted max-w-3xl">
                  Request execution from user submit through API orchestration, decision gates, optional MCP calls, and response delivery.
                </Paragraph>
              </div>
              <AIIncidentRuntimeDiagram />
            </div>
          </div>
        </div>
      </section>

      <div className="my-24 h-px w-full bg-gradient-to-r from-transparent via-rule to-transparent" />

      <section className="space-y-6">
        <Heading as="h2" className="text-2xl font-normal text-ink tracking-tight">Environment controls</Heading>
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
