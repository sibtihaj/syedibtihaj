import React from "react";
import {
  AIIncidentPipelineDiagram,
  AIIncidentRetentionDiagram,
  AIIncidentRuntimeDiagram,
} from "@/components/diagrams/AIIncidentDiagrams";
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
      </section>

      <section className="space-y-6">
        <Heading as="h2" className="text-2xl font-normal text-ink tracking-tight">Capability Matrix</Heading>
        <div className="overflow-hidden rounded-2xl border border-rule bg-white/50 shadow-sm">
          <table className="min-w-full divide-y divide-rule text-sm">
            <thead className="bg-cobalt-wash/70 text-left text-ink">
              <tr>
                <th className="px-6 py-4 font-normal text-[0.8125rem]">Area</th>
                <th className="px-6 py-4 font-normal text-[0.8125rem]">Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-ink-body">
              <tr className="hover:bg-cobalt-wash/30 transition-colors">
                <td className="px-6 py-4 font-medium text-ink">Chat Orchestration</td>
                <td className="px-6 py-4 leading-relaxed">
                  Route handler manages model selection, tool binding, token trimming, and persistent session synchronization.
                </td>
              </tr>
              <tr className="hover:bg-cobalt-wash/30 transition-colors">
                <td className="px-6 py-4 font-medium text-ink">Authentication</td>
                <td className="px-6 py-4 leading-relaxed">
                  Supabase Auth + middleware edge guards, fronted by Cloudflare Turnstile protection.
                </td>
              </tr>
              <tr className="hover:bg-cobalt-wash/30 transition-colors">
                <td className="px-6 py-4 font-medium text-ink">Session Memory</td>
                <td className="px-6 py-4 leading-relaxed">
                  Postgres JSONB envelope stores raw messages alongside a structured memory summary and key facts, re-injected on every turn.
                </td>
              </tr>
              <tr className="hover:bg-cobalt-wash/30 transition-colors">
                <td className="px-6 py-4 font-medium text-ink">Abuse Controls</td>
                <td className="px-6 py-4 leading-relaxed">
                  Rolling per-user window via Supabase RPC directly enforced on the chat API.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <Heading as="h2" className="text-2xl font-normal text-ink tracking-tight">MCP Tool Surface</Heading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Incident', items: ['create_incident', 'get_incident', 'update_incident', 'list_incidents'] },
            { title: 'Templates', items: ['get_can_templates', 'get_sev1_canvas', 'get_rca_templates', 'load_template'] },
            { title: 'Documents', items: ['generate_can_document', 'generate_rca_document'] },
            { title: 'Meta', items: ['list_tools'] }
          ].map((group) => (
            <div key={group.title} className="rounded-2xl border border-rule bg-white p-6 shadow-sm hover:border-cobalt/30 hover:shadow-md transition-all">
              <div className="mb-4 font-heading text-base italic text-cobalt">{group.title}</div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="font-mono text-[11px] text-ink-body bg-paper-deep/60 px-2 py-1 rounded inline-block">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
        <Heading as="h2" className="text-2xl font-normal text-ink tracking-tight">Environment Controls</Heading>
        <div className="grid gap-2 text-sm text-ink-body">
          <div className="flex items-center gap-4 rounded-xl border border-rule bg-paper-deep/60 px-4 py-3">
            <span className="w-24 font-medium text-ink">Models</span>
            <code className="font-mono text-xs text-cobalt">AI_GATEWAY_MODEL, AI_GATEWAY_BASE_URL</code>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-rule bg-paper-deep/60 px-4 py-3">
            <span className="w-24 font-medium text-ink">Supabase</span>
            <code className="font-mono text-xs text-cobalt">NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-rule bg-paper-deep/60 px-4 py-3">
            <span className="w-24 font-medium text-ink">Quota</span>
            <code className="font-mono text-xs text-cobalt">CHAT_QUOTA_MAX, CHAT_QUOTA_WINDOW_HOURS</code>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-rule bg-paper-deep/60 px-4 py-3">
            <span className="w-24 font-medium text-ink">Security</span>
            <code className="font-mono text-xs text-cobalt">TURNSTILE_SECRET_KEY, CAPTCHA_COOKIE_SECRET</code>
          </div>
        </div>
      </section>
    </div>
  );
}
