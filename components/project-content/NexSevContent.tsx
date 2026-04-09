import React from "react";

/**
 * Long-form case study for NexSev (portfolio project detail).
 */
export function NexSevContent() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-lg text-zinc-700 leading-relaxed not-prose">
          <strong className="font-normal text-zinc-900">How we used LLMs and agentic workflows to cut Sev1 response time by 40%</strong>
        </p>
      </div>

      <hr className="border-zinc-100 not-prose" />

      <section>
        <h2>The problem: incident response is a time sink</h2>
        <p>
          If you&apos;ve been on-call for enterprise infrastructure, you know the pattern: an alert fires, you troubleshoot, you resolve—then the administrative work begins: detailed Root Cause Analysis (RCA), Customer Action Notices (CANs), searching past tickets, and updating the knowledge base.
        </p>
        <p>
          At HashiCorp, our support team was spending <strong>2+ hours per Sev1 incident</strong> on post-resolution work. Across dozens of critical incidents per month, that added up to weeks of manual documentation.
        </p>
        <p>
          During IBM&apos;s AI HackWeek, I led a cross-functional team to build <strong>NexSev</strong>—an AI-powered incident response assistant that automates those workflows.
        </p>
      </section>

      <section>
        <h2>The vision: an AI teammate for support engineers</h2>
        <p>
          The goal was not to replace engineers—it was to handle the tedious parts so people can focus on solving customer problems.
        </p>
        <p>What we wanted NexSev to do:</p>
        <ol>
          <li>
            <strong>Auto-generate RCA documentation</strong> from incident data and resolution notes
          </li>
          <li>
            <strong>Draft Customer Action Notices</strong> with the right technical depth and tone
          </li>
          <li>
            <strong>Surface relevant historical solutions</strong> from the knowledge base when similar issues arise
          </li>
          <li>
            <strong>Provide real-time troubleshooting guidance</strong> during active incidents
          </li>
        </ol>
        <p>In short: turn collective institutional knowledge into an always-available assistant.</p>
      </section>

      <section>
        <h2>Architecture: agentic workflows + knowledge retrieval</h2>
        <h3>Tech stack</h3>
        <ul>
          <li>
            <strong>LLMs:</strong> Llama 3.1 and IBM Granite (via Ollama for local hosting)
          </li>
          <li>
            <strong>Orchestration:</strong> LangChain for agentic workflows
          </li>
          <li>
            <strong>Knowledge base:</strong> Vector embeddings of historical Zendesk tickets
          </li>
          <li>
            <strong>Integrations:</strong> Custom MCP (Model Context Protocol) tools for Slack and Zendesk
          </li>
          <li>
            <strong>Frontend:</strong> Next.js for document generation and review
          </li>
          <li>
            <strong>Backend:</strong> Python for LLM orchestration and API integrations
          </li>
        </ul>

        <h3>Why this stack</h3>
        <p>
          <strong>Local LLMs (Ollama):</strong> Customer data had to stay inside our infrastructure. Running Llama 3.1 and Granite locally meant sensitive context did not leave the environment.
        </p>
        <p>
          <strong>MCP:</strong> Custom tools gave the model access to Zendesk (tickets, customer context, notes), internal knowledge (past RCAs, runbooks), and Slack (updates and commands).
        </p>
        <p>
          <strong>Agentic design:</strong> Instead of one brittle mega-prompt, the assistant could decide what to fetch, call tools, synthesize drafts, and pause for human review before finalizing.
        </p>
      </section>

      <section>
        <h2>Implementation: from concept to production</h2>

        <h3>Phase 1: Knowledge base retrieval</h3>
        <p>Historical incidents were unstructured and noisy. Our approach:</p>
        <ol>
          <li>Extract resolved Sev1 and Sev2 tickets from Zendesk</li>
          <li>Clean and chunk descriptions, resolution notes, and RCAs where available</li>
          <li>Embed with a lightweight model and store in a vector database</li>
          <li>At incident time, retrieve by error patterns, components (TFE, PostgreSQL, Redis, VCS), and environment (cloud, topology)</li>
        </ol>

        <h3>Phase 2: RCA generation</h3>
        <p>
          A strong RCA needs accuracy, timeline, real root cause (not symptoms), remediation, and prevention. We combined ticket data with retrieved similar incidents, used structured outputs (function calling), and presented a draft for engineer refinement.
        </p>
        <blockquote>
          <p>
            The key insight: <strong>don&apos;t chase perfect AI copy</strong>—ship a strong first draft an engineer can polish in minutes instead of writing from scratch for an hour.
          </p>
        </blockquote>

        <h3>Phase 3: Slack integration</h3>
        <p>Support engineers live in Slack during incidents. We shipped slash-style workflows such as:</p>
        <ul>
          <li>
            <code className="text-sm bg-zinc-100 px-1.5 py-0.5 rounded">/nexsev analyze</code> — suggest troubleshooting steps for the active incident
          </li>
          <li>
            <code className="text-sm bg-zinc-100 px-1.5 py-0.5 rounded">/nexsev rca [ticket-id]</code> — RCA draft for a resolved incident
          </li>
          <li>
            <code className="text-sm bg-zinc-100 px-1.5 py-0.5 rounded">/nexsev can [ticket-id]</code> — CAN draft
          </li>
          <li>
            <code className="text-sm bg-zinc-100 px-1.5 py-0.5 rounded">/nexsev search [query]</code> — knowledge base search
          </li>
        </ul>
        <p>The bot used MCP-backed tools to pull Zendesk context, search knowledge, generate documents, and post results back to the channel.</p>

        <h3>Phase 4: Next.js review interface</h3>
        <p>
          Long-form review needed more than a thread. We built a Next.js app to review and edit RCAs and CANs, track approval state, and export finalized documents to Zendesk—closing the loop so engineer edits inform prompt improvements over time.
        </p>
      </section>

      <section>
        <h2>Impact: ~40% reduction in incident documentation time</h2>
        <p>After rollout to our APJ support team, we measured:</p>
        <ul>
          <li>
            <strong>RCA:</strong> ~90 minutes average → ~30 minutes to review and finalize AI-generated drafts (~67% reduction)
          </li>
          <li>
            <strong>CAN:</strong> ~30 minutes → ~10 minutes to finalize (~67% reduction)
          </li>
          <li>
            <strong>Knowledge retrieval:</strong> automated and surfaced during incidents instead of ad hoc search
          </li>
        </ul>
        <p>
          <strong>Overall: roughly 40% less time</strong> on post-incident documentation, with better consistency, fewer missed sections (timelines, prevention), and less cognitive load on engineers during high-pressure events.
        </p>
      </section>

      <section>
        <h2>Lessons learned</h2>
        <ul>
          <li>
            <strong>Local LLMs are viable in production</strong> when privacy matters—fast enough, no per-token bill, and room to customize.
          </li>
          <li>
            <strong>Agentic flows beat one-shot prompts</strong> for reliability when context must be gathered from multiple systems.
          </li>
          <li>
            <strong>Human-in-the-loop is non-negotiable</strong> for customer-facing quality—draft, review, then publish.
          </li>
          <li>
            <strong>Adoption follows the workflow</strong>—Slack integration mattered as much as model quality.
          </li>
        </ul>
      </section>

      <section>
        <h2>What&apos;s next</h2>
        <p>NexSev is in production for APJ; the roadmap includes expansion to other regions, proactive signals, tighter feedback loops for fine-tuning, and deeper observability integrations (e.g. Datadog / Prometheus).</p>
      </section>

      <section>
        <h2>Technical details</h2>
        <p className="not-prose font-normal text-zinc-900">Reference stack</p>
        <pre className="not-prose overflow-x-auto rounded-2xl bg-zinc-900 text-zinc-100 p-5 text-xs leading-relaxed font-mono">
          <code>{`Backend:
- Python 3.11
- LangChain (agent orchestration)
- Ollama (local LLMs)
- FastAPI (API)
- Vector DB (Chroma)

Frontend:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

Integrations:
- Slack SDK (Bolt for Python)
- Zendesk API
- Custom MCP tools

Models:
- Llama 3.1 (8B / 70B)
- IBM Granite 13B`}</code>
        </pre>
        <p>
          <strong>Implementation tips:</strong> start with retrieval before generation; use structured outputs; bake review into v1; prioritize low-friction entry (Slack first).
        </p>
      </section>

      <section>
        <h2>Conclusion</h2>
        <p>
          NexSev began as a HackWeek experiment and became a production system that saves the team significant time each month while improving consistency. The direction that resonates most: use AI for the repetitive work so engineers can stay focused on hard technical problems and customer outcomes.
        </p>
      </section>

      <footer className="not-prose pt-6 border-t border-zinc-100">
        <p className="text-sm text-zinc-500 italic leading-relaxed">
          Syed Ibtihaj is a Senior Product Support Engineer at HashiCorp/IBM, specializing in Terraform Enterprise and Kubernetes infrastructure. He also runs Webifex Labs, shipping Next.js products for clients from Melbourne, Australia.
        </p>
      </footer>
    </div>
  );
}
