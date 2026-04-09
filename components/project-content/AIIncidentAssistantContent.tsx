import React from "react";
import { MermaidBlock } from "@/components/MermaidBlock";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

const MERMAID_THEME = `
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#ffffff',
    'primaryTextColor': '#1e293b',
    'primaryBorderColor': '#e2e8f0',
    'lineColor': '#cbd5e1',
    'secondaryColor': '#f8fafc',
    'tertiaryColor': '#ffffff',
    'mainBkg': '#ffffff',
    'nodeBorder': '#cbd5e1',
    'clusterBkg': '#f8fafc',
    'clusterBorder': '#e2e8f0',
    'fontSize': '13px',
    'fontFamily': 'ui-sans-serif, system-ui, sans-serif',
    'textColor': '#475569',
    'nodeTextColor': '#1e293b',
    'edgeLabelBackground': '#ffffff'
  }
}}%%
`;

const DIAGRAMS = {
  pipeline: `${MERMAID_THEME}
flowchart TD
  userClient(["User Client"])
  routeApi[["Chat Route API"]]
  
  subgraph supabase ["Supabase Backend"]
    sbAuth["Auth / JWT"]
    sbQuota[("user_chat_usage")]
    sbSessions[("chat_sessions JSON envelope + RLS")]
  end

  subgraph orchestration ["Orchestration Layer"]
    promptEngine["Prompt Engine"]
    trimStep["Trim History (token budget)"]
    memInject["Inject persisted memory into system"]
    decisionGate{{"Decision Gate"}}
  end

  subgraph execution ["Execution Paths"]
    modelOnly["Model Only"]
    toolPath["Tool Enabled"]
    mcpToolset[/"MCP Toolset"/]
  end

  userClient ==> routeApi
  routeApi --> sbAuth
  routeApi --> sbQuota
  userClient -. "list / save" .-> sbSessions
  sbSessions -. "summary + key facts" .-> memInject
  routeApi --> promptEngine & trimStep & memInject
  promptEngine & trimStep --> memInject
  memInject --> decisionGate
  
  decisionGate -- "Conversational" --> modelOnly
  decisionGate -- "Actionable" --> toolPath
  toolPath ==> mcpToolset
  
  modelOnly & mcpToolset --> responsePayload(["Response Payload"])

  style decisionGate fill:#f0f9ff,stroke:#38bdf8,color:#0369a1,stroke-width:2px
  style toolPath fill:#f0f9ff,stroke:#38bdf8,color:#0369a1
  style memInject fill:#fdf4ff,stroke:#fbbf24,color:#854d0e
  style sbQuota fill:#f8fafc,stroke:#94a3b8,color:#475569
  style sbSessions fill:#f8fafc,stroke:#94a3b8,color:#475569
`,
  runtime: `${MERMAID_THEME}
sequenceDiagram
    autonumber
    participant U as User
    participant C as Client
    participant S as Supabase
    participant R as API Route
    participant P as Prompt Engine
    participant M as AI Gateway
    participant T as MCP Server

    U->>C: Submit Prompt
    C->>R: POST /api/chat
    R->>S: Validate JWT session
    S-->>R: authenticated user
    opt conversationId present
        R->>S: SELECT chat_sessions.messages
        S-->>R: prior memory + stored messages
    end
    Note over R: CAN-style requests may return early if facts missing
    R->>S: increment_and_check_chat_quota RPC
    S-->>R: allowed / remaining
    Note over R: Intent & Entity Detection
    R->>P: Assemble Thin System Prompt
    R->>R: Trim History (LangChain)
    opt conversationId present
        R->>S: UPDATE envelope.memory
    end
    Note over R: Append memory block to system string
    
    alt isConversational
        R->>M: generateText
        M-->>R: Response
    else isActionable
        R->>T: List & Register Tools
        R->>M: generateText (with Tools)
        loop Tool Loop
            M->>T: Call Tool
            T-->>M: Tool Result
        end
        M-->>R: Final Response
    end
    
    R-->>C: JSON + Metadata
    C->>S: Debounced save chat_sessions (RLS)
    C-->>U: Render Response
`,
  retention: `${MERMAID_THEME}
flowchart TB
  subgraph client ["Browser"]
    ui(["Chat UI"])
    hist["Recent message history + conversationId"]
  end

  subgraph api ["POST /api/chat"]
    load["Load JSON envelope from chat_sessions"]
    merge["Update incident summary + structured key facts"]
    can{{"CAN-style report?"}}
    needFacts["Require missing fields before LLM"]
    dedupe["Skip duplicate last user turn"]
    trim["LangChain trim to token budget"]
    sys["System prompt + memory block"]
    llm{{"AI Gateway"}}
  end

  subgraph store ["Supabase Postgres"]
    row[("chat_sessions row under RLS")]
  end

  ui --> hist
  hist --> load
  row -. "read JSON envelope" .-> load
  load --> merge
  merge --> can
  can -- "yes, incomplete facts" --> needFacts
  needFacts --> ui
  can -- "ok or not CAN" --> dedupe
  dedupe --> trim
  merge --> sys
  trim --> llm
  sys --> llm
  merge -. "persist memory fields" .-> row
  llm --> ui

  style needFacts fill:#fef9c3,stroke:#ca8a04,color:#854d0e
  style merge fill:#f0f9ff,stroke:#38bdf8,color:#0369a1
  style row fill:#f8fafc,stroke:#94a3b8,color:#475569
  style sys fill:#f0fdf4,stroke:#22c55e,color:#166534
`
};

export function AIIncidentAssistantContent() {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <Heading as="h2" className="text-3xl font-normal text-zinc-900 tracking-tight">What it is</Heading>
        <div className="space-y-4">
          <Paragraph className="text-lg leading-relaxed text-zinc-600">
            AI Incident Assistant is a production-style incident response
            playground. Operators sign in, chat with an LLM, create/update Sev1
            incidents, load templates (CAN, Sev1 canvas, RCA), and generate
            document outputs from structured incident data.
          </Paragraph>
          <Paragraph className="text-lg leading-relaxed text-zinc-600">
            The build demonstrates gateway-routed models, MCP-backed tools,
            Supabase-backed auth/sessions, rolling per-user chat quotas, and
            hybrid observability (gateway-level metrics plus trace-level tooling).
          </Paragraph>
        </div>
      </section>

      <section className="space-y-6">
        <Heading as="h2" className="text-3xl font-normal text-zinc-900 tracking-tight">Capability Matrix</Heading>
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white/50 shadow-sm backdrop-blur-sm">
          <table className="min-w-full divide-y divide-blue-50 text-sm">
            <thead className="bg-gradient-to-r from-blue-50/50 to-sky-50/50 text-left text-blue-900">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-widest text-[11px]">Area</th>
                <th className="px-6 py-4 font-medium uppercase tracking-widest text-[11px]">Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-600">
              <tr className="hover:bg-blue-50/20 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">Chat Orchestration</td>
                <td className="px-6 py-4 leading-relaxed">
                  Route handler manages model selection, tool binding, token trimming, and persistent session synchronization.
                </td>
              </tr>
              <tr className="hover:bg-blue-50/20 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">Authentication</td>
                <td className="px-6 py-4 leading-relaxed">
                  Supabase Auth + middleware edge guards, fronted by Cloudflare Turnstile protection.
                </td>
              </tr>
              <tr className="hover:bg-blue-50/20 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">Session Memory</td>
                <td className="px-6 py-4 leading-relaxed">
                  Postgres JSONB envelope stores raw messages alongside a structured memory summary and key facts, re-injected on every turn.
                </td>
              </tr>
              <tr className="hover:bg-blue-50/20 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">Abuse Controls</td>
                <td className="px-6 py-4 leading-relaxed">
                  Rolling per-user window via Supabase RPC directly enforced on the chat API.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <Heading as="h2" className="text-3xl font-normal text-zinc-900 tracking-tight">MCP Tool Surface</Heading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Incident', items: ['create_incident', 'get_incident', 'update_incident', 'list_incidents'] },
            { title: 'Templates', items: ['get_can_templates', 'get_sev1_canvas', 'get_rca_templates', 'load_template'] },
            { title: 'Documents', items: ['generate_can_document', 'generate_rca_document'] },
            { title: 'Meta', items: ['list_tools'] }
          ].map((group) => (
            <div key={group.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
              <div className="mb-4 text-xs font-medium uppercase tracking-widest text-blue-600">{group.title}</div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="font-mono text-[11px] text-zinc-600 bg-zinc-50 px-2 py-1 rounded inline-block">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Paragraph className="text-sm text-zinc-500 italic">
          Incident/template storage is local JSON in the MCP server data directory with validation, safer writes, and bounded runtime.
        </Paragraph>
      </section>

      <div className="my-24 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      {/* Architecture Diagrams Section */}
      <section className="space-y-16">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <Heading as="h2" className="text-4xl font-normal text-zinc-900 tracking-tight">Architecture & Flow</Heading>
          <Paragraph className="text-lg text-zinc-500">
            A high-fidelity breakdown of how the AI Incident Assistant orchestrates UI, model generation, and tool execution.
          </Paragraph>
        </div>

        <div className="space-y-24">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-blue-600" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-blue-600">01 / Pipeline</h3>
              </div>
              <div className="space-y-2">
                <Heading as="h3" className="text-2xl font-normal text-zinc-900">Optimized Request Pipeline</Heading>
                <Paragraph className="text-zinc-500 max-w-3xl">
                  Thin system prompt, LangChain-trimmed history, persisted session memory folded into the system string, then branch into model-only or tool-enabled execution.
                </Paragraph>
              </div>
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-xl shadow-sm ring-1 ring-black/5">
                <MermaidBlock chart={DIAGRAMS.pipeline} />
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-sky-50/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-sky-600" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-sky-600">02 / Retention</h3>
              </div>
              <div className="space-y-2">
                <Heading as="h3" className="text-2xl font-normal text-zinc-900">Context Retention Flow</Heading>
                <Paragraph className="text-zinc-500 max-w-3xl">
                  From the browser through load/merge of the envelope, optional CAN guardrails, token trimming, and generation—with memory written back under the same row the user already owns via RLS.
                </Paragraph>
              </div>
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-xl shadow-sm ring-1 ring-black/5">
                <MermaidBlock chart={DIAGRAMS.retention} />
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-indigo-600" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-600">03 / Execution</h3>
              </div>
              <div className="space-y-2">
                <Heading as="h3" className="text-2xl font-normal text-zinc-900">End-to-End Runtime</Heading>
                <Paragraph className="text-zinc-500 max-w-3xl">
                  Request execution from user submit through API orchestration, decision gates, optional MCP calls, and response delivery.
                </Paragraph>
              </div>
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-xl shadow-sm ring-1 ring-black/5">
                <MermaidBlock chart={DIAGRAMS.runtime} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="my-24 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <section className="space-y-6">
        <Heading as="h2" className="text-2xl font-normal text-zinc-900 tracking-tight">Environment Controls</Heading>
        <div className="grid gap-2 text-sm text-zinc-600">
          <div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="w-24 font-medium text-zinc-900">Models</span>
            <code className="font-mono text-xs text-blue-600">AI_GATEWAY_MODEL, AI_GATEWAY_BASE_URL</code>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="w-24 font-medium text-zinc-900">Supabase</span>
            <code className="font-mono text-xs text-blue-600">NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="w-24 font-medium text-zinc-900">Quota</span>
            <code className="font-mono text-xs text-blue-600">CHAT_QUOTA_MAX, CHAT_QUOTA_WINDOW_HOURS</code>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="w-24 font-medium text-zinc-900">Security</span>
            <code className="font-mono text-xs text-blue-600">TURNSTILE_SECRET_KEY, CAPTCHA_COOKIE_SECRET</code>
          </div>
        </div>
      </section>
    </div>
  );
}
