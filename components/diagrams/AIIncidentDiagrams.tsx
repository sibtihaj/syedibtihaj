import { DiagramFigure, DiagramSvg, Edge, EdgeLabel, Group, Node, StackedFlow } from "@/components/diagrams/kit";
import { SequenceNarrow, SequenceWide, type Lane, type SeqStep } from "@/components/diagrams/Sequence";

/* ---------------------------------------------------------------- pipeline */

const PIPE_TITLE = "AI Incident Assistant request pipeline";
const PIPE_DESC =
  "The user client sends a message to the chat route, which checks the JWT and the chat quota in Supabase. The route builds a thin prompt with the prompt engine, trims history to a token budget, and injects persisted memory into the system prompt; the client lists and saves chat sessions, whose summary and key facts feed that memory. A decision gate sends conversational turns to the model only, and actionable turns to the tool-enabled path, which calls the MCP toolset. Both paths return the response payload.";

function PipelineWide() {
  const id = "dg-aia-pipe-w";
  return (
    <DiagramSvg id={id} width={880} height={384} title={PIPE_TITLE} description={PIPE_DESC}>
      <Group x={16} y={244} w={536} h={96} label="Supabase" />

      <Edge id={id} d="M126 96 H144" strong />
      <Edge id={id} d="M280 96 V63 H286" />
      <Edge id={id} d="M280 96 V129 H286" />
      <Edge id={id} d="M410 63 H422 V96" arrow={false} />
      <Edge id={id} d="M410 129 H422 V96" arrow={false} />
      <Edge id={id} d="M268 96 H428" strong />
      <Edge id={id} d="M552 96 H570" strong />
      <Edge id={id} d="M635 70 V46 H728" />
      <Edge id={id} d="M635 122 V267" strong />
      <Edge id={id} d="M694 299 H728" strong />
      <Edge id={id} d="M799 270 V209" strong />
      <Edge id={id} d="M799 72 V151" />

      <Edge id={id} d="M190 119 V200 H100 V257" />
      <Edge id={id} d="M240 119 V200 H259 V257" />
      <Edge id={id} d="M493 263 V131" dashed />
      <Edge id={id} d="M16 96 H8 V364 H443 V327" dashed />

      <Node x={16} y={73} w={110} h={46} kind="actor" label="User client" />
      <Node x={150} y={73} w={118} h={46} label="Chat route" />
      <Node x={292} y={40} w={118} h={46} label="Prompt engine" />
      <Node x={292} y={106} w={118} h={46} label="Trim history" />
      <Node x={434} y={67} w={118} h={58} label="Inject memory" sub={["into system prompt"]} />
      <Node x={576} y={70} w={118} h={52} kind="decision" label="Decision gate" />
      <Node x={734} y={20} w={130} h={52} label="Model only" />
      <Node x={734} y={157} w={130} h={46} kind="actor" label="Response" />
      <Node x={576} y={273} w={118} h={52} label="Tool enabled" />
      <Node x={734} y={270} w={130} h={58} focal label="MCP toolset" sub={["incidents, templates"]} />

      <Node x={32} y={263} w={136} h={58} label="Auth" sub={["JWT session"]} />
      <Node x={184} y={263} w={150} h={58} kind="store" label="Chat quota" sub={["user_chat_usage"]} />
      <Node x={350} y={263} w={186} h={58} kind="store" label="Chat sessions" sub={["JSON envelope, RLS"]} />

      <EdgeLabel x={682} y={38}>conversational</EdgeLabel>
      <EdgeLabel x={643} y={204} anchor="start">actionable</EdgeLabel>
      <EdgeLabel x={485} y={204} anchor="end">summary, key facts</EdgeLabel>
      <EdgeLabel x={225} y={358}>list, save</EdgeLabel>
    </DiagramSvg>
  );
}

function PipelineNarrow() {
  return (
    <StackedFlow
      id="dg-aia-pipe-n"
      title={PIPE_TITLE}
      description={PIPE_DESC}
      rows={[
        { nodes: [{ label: "User client", kind: "actor" }] },
        { nodes: [{ label: "Chat route", sub: ["JWT and quota in Supabase"], strongIn: true }] },
        { nodes: [{ label: "Prompt engine" }, { label: "Trim history" }] },
        {
          nodes: [
            { label: "Inject memory", sub: ["from saved chat sessions"], strongIn: true },
          ],
        },
        { nodes: [{ label: "Decision gate", kind: "decision", strongIn: true }] },
        {
          nodes: [
            { label: "Model only", inLabel: "conversational" },
            { label: "Tool enabled", inLabel: "actionable", strongIn: true },
          ],
        },
        { nodes: [{ label: "", pass: true, from: [0] }, { label: "MCP toolset", focal: true, from: [1], strongIn: true }] },
        { nodes: [{ label: "Response", kind: "actor", strongIn: true }] },
      ]}
    />
  );
}

export function AIIncidentPipelineDiagram() {
  return (
    <DiagramFigure
      wide={<PipelineWide />}
      narrow={<PipelineNarrow />}
      caption="The chat route checks the session and quota first, then builds a small prompt with memory folded in. The decision gate only reaches for tools when the turn needs them."
    />
  );
}

/* ---------------------------------------------------------------- retention */

const RET_TITLE = "AI Incident Assistant context retention";
const RET_DESC =
  "The chat UI sends recent history and the conversationId. The route loads the JSON envelope from the chat_sessions row, then updates the incident summary and structured key facts, persisting those memory fields back to the row. For a CAN-style report with missing facts it asks for the missing fields before calling the model. Otherwise it skips a duplicate last user turn, trims history to a token budget, builds the system prompt with the memory block, and calls the AI Gateway, whose reply returns to the chat UI.";

function RetentionWide() {
  const id = "dg-aia-ret-w";
  return (
    <DiagramSvg id={id} width={880} height={400} title={RET_TITLE} description={RET_DESC}>
      <Edge id={id} d="M136 176 H154" strong />
      <Edge id={id} d="M284 176 H302" strong />
      <Edge id={id} d="M432 176 H450" strong />
      <Edge id={id} d="M580 176 H598" strong />
      <Edge id={id} d="M728 176 H740" />
      <Edge id={id} d="M666 202 V265" strong />
      <Edge id={id} d="M604 300 H586" strong />
      <Edge id={id} d="M456 300 H438" strong />
      <Edge id={id} d="M284 300 H302" />
      <Edge id={id} d="M500 205 V240 H222 V265" />
      <Edge id={id} d="M370 326 V376 H74 V205" strong />
      <Edge id={id} d="M370 82 V141" dashed />
      <Edge id={id} d="M518 147 V88" dashed />

      <Node x={332} y={24} w={224} h={58} kind="store" label="chat_sessions row" sub={["Postgres, under RLS"]} />

      <Node x={12} y={153} w={124} h={46} kind="actor" label="Chat UI" />
      <Node x={160} y={139} w={124} h={74} label="History" sub={["recent turns", "conversationId"]} />
      <Node x={308} y={147} w={124} h={58} label="Load envelope" sub={["JSON from the row"]} />
      <Node x={456} y={147} w={124} h={58} focal label="Update memory" sub={["summary, key facts"]} />
      <Node x={604} y={150} w={124} h={52} kind="decision" label="CAN report?" />
      <Node x={746} y={139} w={124} h={74} label="Ask for facts" sub={["missing fields,", "back to the chat"]} />

      <Node x={160} y={271} w={124} h={58} label="System prompt" sub={["plus memory block"]} />
      <Node x={308} y={274} w={124} h={52} kind="decision" label="AI Gateway" />
      <Node x={456} y={271} w={124} h={58} label="Trim history" sub={["token budget"]} />
      <Node x={604} y={271} w={124} h={58} label="Skip duplicate" sub={["last user turn"]} />

      <EdgeLabel x={378} y={116} anchor="start">read</EdgeLabel>
      <EdgeLabel x={526} y={120} anchor="start">persist</EdgeLabel>
      <EdgeLabel x={674} y={238} anchor="start">ok</EdgeLabel>
      <EdgeLabel x={222} y={370}>reply</EdgeLabel>
    </DiagramSvg>
  );
}

function RetentionNarrow() {
  return (
    <StackedFlow
      id="dg-aia-ret-n"
      title={RET_TITLE}
      description={RET_DESC}
      rows={[
        { nodes: [{ label: "Chat UI", kind: "actor" }] },
        { nodes: [{ label: "History", sub: ["recent turns, conversationId"], strongIn: true }] },
        { nodes: [{ label: "Load envelope", sub: ["reads the chat_sessions row"], strongIn: true }] },
        {
          nodes: [
            { label: "Update memory", sub: ["summary, key facts, persisted"], focal: true, strongIn: true, spine: true },
          ],
        },
        { nodes: [{ label: "CAN report?", kind: "decision", strongIn: true }] },
        {
          nodes: [
            { label: "Ask for facts", sub: ["back to the chat"], inLabel: "missing" },
            { label: "Skip duplicate", sub: ["last user turn"], inLabel: "ok", strongIn: true },
          ],
        },
        {
          nodes: [
            { label: "System prompt", sub: ["plus memory block"], from: "none", fromSpine: true },
            { label: "Trim history", sub: ["token budget"], from: [1], strongIn: true },
          ],
        },
        { nodes: [{ label: "AI Gateway", kind: "decision", strongIn: true }] },
        { nodes: [{ label: "Reply in the chat UI", kind: "actor", strongIn: true }] },
      ]}
    />
  );
}

export function AIIncidentRetentionDiagram() {
  return (
    <DiagramFigure
      wide={<RetentionWide />}
      narrow={<RetentionNarrow />}
      caption="Memory lives in the same chat_sessions row the user already owns under RLS: read at the start of a turn, updated before the model call."
    />
  );
}

/* ------------------------------------------------------------------ runtime */

const LANES: Lane[] = [
  { key: "U", label: "User", short: "User" },
  { key: "C", label: "Client", short: "Client" },
  { key: "S", label: "Supabase", short: "Supabase" },
  { key: "R", label: "API route", short: "Route" },
  { key: "P", label: "Prompt engine", short: "Prompt" },
  { key: "M", label: "AI Gateway", short: "Gateway" },
  { key: "T", label: "MCP server", short: "MCP" },
];

const STEPS: SeqStep[] = [
  { type: "msg", from: "U", to: "C", text: "Submit prompt", strong: true },
  { type: "msg", from: "C", to: "R", text: "POST /api/chat", strong: true },
  { type: "msg", from: "R", to: "S", text: "Validate JWT session" },
  { type: "msg", from: "S", to: "R", text: "Authenticated user", reply: true },
  {
    type: "frame",
    kind: "opt",
    sections: [
      {
        label: "conversationId present",
        steps: [
          { type: "msg", from: "R", to: "S", text: "SELECT chat_sessions.messages" },
          { type: "msg", from: "S", to: "R", text: "Prior memory, stored messages", reply: true },
        ],
      },
    ],
  },
  { type: "note", at: "R", text: "CAN-style requests may return early if facts are missing" },
  { type: "msg", from: "R", to: "S", text: "increment_and_check_chat_quota RPC" },
  { type: "msg", from: "S", to: "R", text: "Allowed, remaining", reply: true },
  { type: "note", at: "R", text: "Intent and entity detection" },
  { type: "msg", from: "R", to: "P", text: "Assemble thin system prompt" },
  { type: "msg", from: "R", to: "R", text: "Trim history (LangChain)" },
  {
    type: "frame",
    kind: "opt",
    sections: [
      {
        label: "conversationId present",
        steps: [{ type: "msg", from: "R", to: "S", text: "UPDATE envelope.memory" }],
      },
    ],
  },
  { type: "note", at: "R", text: "Append memory block to the system string" },
  {
    type: "frame",
    kind: "alt",
    sections: [
      {
        label: "conversational",
        steps: [
          { type: "msg", from: "R", to: "M", text: "generateText" },
          { type: "msg", from: "M", to: "R", text: "Response", reply: true },
        ],
      },
      {
        label: "actionable",
        steps: [
          { type: "msg", from: "R", to: "T", text: "List and register tools" },
          { type: "msg", from: "R", to: "M", text: "generateText with tools", strong: true },
          {
            type: "frame",
            kind: "loop",
            sections: [
              {
                label: "each tool call",
                steps: [
                  { type: "msg", from: "M", to: "T", text: "Call tool", strong: true },
                  { type: "msg", from: "T", to: "M", text: "Tool result", reply: true },
                ],
              },
            ],
          },
          { type: "msg", from: "M", to: "R", text: "Final response", reply: true },
        ],
      },
    ],
  },
  { type: "msg", from: "R", to: "C", text: "JSON and metadata", reply: true },
  { type: "msg", from: "C", to: "S", text: "Debounced save of chat_sessions (RLS)" },
  { type: "msg", from: "C", to: "U", text: "Render response", strong: true },
];

const RUN_TITLE = "AI Incident Assistant end-to-end runtime";
const RUN_DESC =
  "A sequence across the user, client, Supabase, API route, prompt engine, AI Gateway and MCP server: the prompt is posted to the chat route, the JWT is validated, prior memory is loaded when a conversation exists, the quota is checked, a thin system prompt is assembled and history trimmed, memory is updated, and then either the model answers directly or, for actionable turns, tools are registered and called in a loop before the final response. The client renders the reply and saves the session.";

export function AIIncidentRuntimeDiagram() {
  return (
    <DiagramFigure
      wide={<SequenceWide id="dg-aia-run-w" title={RUN_TITLE} description={RUN_DESC} lanes={LANES} steps={STEPS} />}
      narrow={<SequenceNarrow id="dg-aia-run-n" title={RUN_TITLE} description={RUN_DESC} lanes={LANES} steps={STEPS} />}
      caption="Every turn in order, with replies dashed or muted. Cobalt marks the path from the user's prompt to the rendered answer."
    />
  );
}
