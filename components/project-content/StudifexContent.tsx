import React from "react";
import { MermaidBlock } from "@/components/MermaidBlock";

/** Light theme on the site palette, shared by the diagrams below. */
const THEME = `%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#ffffff',
    'primaryTextColor': '#1e293b',
    'primaryBorderColor': '#cbd5e1',
    'lineColor': '#94a3b8',
    'secondaryColor': '#f8fafc',
    'tertiaryColor': '#ffffff',
    'clusterBkg': '#f8fafc',
    'clusterBorder': '#e2e8f0',
    'fontSize': '13px',
    'fontFamily': 'ui-sans-serif, system-ui, sans-serif',
    'edgeLabelBackground': '#ffffff'
  }
}}%%`;

const ARCHITECTURE = `${THEME}
flowchart TB
  browser(["Student or admin in the browser"])

  subgraph web ["Vercel"]
    next["Next.js app: marketing site, student portal, admin portal"]
  end

  subgraph svc ["AWS, Sydney"]
    rag["Python service: FastAPI and LangGraph"]
  end

  subgraph data ["Data"]
    supa[("Supabase: Postgres, Auth, Storage, Realtime")]
    pine[("Pinecone: dense and sparse indexes")]
  end

  subgraph models ["Model APIs"]
    ocr["Mathpix: handwriting to LaTeX"]
    judge["Bedrock Claude: judge and coach"]
    fire["Fireworks: LaTeX clean-up and document structuring"]
  end

  obs["Axiom, Langfuse, Sentry"]

  browser --> next
  next -- "auth and reads under RLS" --> supa
  next -- "service token" --> rag
  rag --> supa
  rag --> pine
  rag --> ocr
  rag --> judge
  rag --> fire
  rag -. "logs, traces, errors" .-> obs

  style rag fill:#eef3ff,stroke:#1e4fd6,color:#0d1b3e,stroke-width:1.5px
`;

const MARKING = `${THEME}
flowchart TB
  photo(["Photo of handwritten working"])
  gate["Quality gate: is the image usable?"]
  ocr["Read the handwriting into LaTeX"]
  latex["Clean up the LaTeX"]
  steps["Split into parts and steps"]
  guide["Retrieve the marking guide"]
  mark["Mark each criterion, citing the guide"]
  conf{{"How confident is this result?"}}
  save[("Save marks, feedback and audit trail")]
  hold["Held for review"]

  photo --> gate --> ocr --> latex --> steps --> guide --> mark --> conf --> save
  mark -. "no model could mark it" .-> hold

  style mark fill:#eef3ff,stroke:#1e4fd6,color:#0d1b3e,stroke-width:1.5px
  style hold fill:#fff7ed,stroke:#c2410c,color:#7c2d12
`;

const RETRIEVAL = `${THEME}
flowchart TB
  ask(["The question and the student's steps"])
  filter["Filter: this question, certified content, rubric and solution chunks"]
  dense["Dense search"]
  sparse["Sparse search"]
  fuse["Reciprocal rank fusion"]
  rerank["Rerank"]
  hydrate["Load full text from Supabase by chunk id"]
  every["Add every rubric criterion for the question"]
  ctx(["Context for the judge"])

  ask --> filter
  filter --> dense
  filter --> sparse
  dense --> fuse
  sparse --> fuse
  fuse --> rerank --> hydrate --> ctx
  filter --> every --> ctx

  style fuse fill:#eef3ff,stroke:#1e4fd6,color:#0d1b3e,stroke-width:1.5px
`;

/**
 * Case study: Studifex (AI marking for handwritten VCE maths).
 */
export function StudifexContent() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section>
        <h2>What it is</h2>
        <p>
          Studifex is a study platform for Victorian VCE students. It has a question bank built from past exam papers,
          practice and timed exam modes, and marking for short and structured answers. For maths, a student photographs
          their handwritten working; the system reads it, compares it step by step with the official marking guide, and
          returns marks with feedback. A coach then explains where marks were lost.
        </p>
        <p>
          I built it through Webifex Labs between March and June 2026: the Next.js app (marketing site, student portal
          and admin portal), the Python service that ingests exam papers, retrieves content and marks answers, and the
          AWS infrastructure and CI that run it. It reached a working MVP on staging and has not launched publicly, so
          there is no live link here.
        </p>
      </section>

      <section>
        <h2>Architecture at a glance</h2>
        <p>
          One Next.js deployment on Vercel serves the marketing site and the signed-in app, split by hostname. It
          handles sign-in, reads data through Supabase with row level security, and calls the Python service for
          anything that touches a model. Browsers never talk to Pinecone or a model API directly.
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> is the system of record: users, questions, content chunks, grading results and
            job progress. Pinecone only holds embeddings.
          </li>
          <li>
            <strong>The Python service</strong> (FastAPI, Python 3.12, uv) owns ingestion, retrieval and marking. Only
            its ingestion path writes vectors.
          </li>
          <li>
            <strong>Model providers</strong> sit behind small interfaces, so swapping an OCR provider or the judge is a
            configuration change rather than a rewrite. That mattered, because both changed more than once.
          </li>
        </ul>
        <MermaidBlock
          chart={ARCHITECTURE}
          caption="The Next.js app is the only thing the browser talks to. The Python service does the model work."
        />
      </section>

      <section>
        <h2>Marking a photo of handwritten working</h2>
        <p>
          Marking is a LangGraph state graph with eight steps. Each step records what it did and passes a typed state to
          the next one, and every call to an outside service inside it has a time limit. The judge marks against specific criteria retrieved from the official
          marking guide, so every mark can be traced back to the line of the guide it came from.
        </p>
        <MermaidBlock
          chart={MARKING}
          caption="If no model actually marked the answer, it is held for review instead of getting a guessed mark."
        />
        <p>
          The judge is Claude on AWS Bedrock and runs on every grounded mark: Sonnet first, Haiku if that fails, and a
          stronger escalation pass when the result looks inconsistent or the question is hard. It returns its answer
          through a forced tool call so the output is always valid JSON, and the shared prompt prefix is cached.
        </p>
        <p>
          One rule shaped the whole graph. Early on, when the judge failed, the pipeline quietly fell back to a simple
          rule-based scorer and showed the result as if nothing had happened. A wrong mark presented with confidence is
          worse for a student than &quot;under review&quot;, so now the attempt is held for review and the failure is
          logged as a signal, and the record of which grader ran is kept all the way to the saved result.
        </p>
      </section>

      <section>
        <h2>Retrieval grounded in the marking guide</h2>
        <p>
          Marking needs the whole rubric for a question, not just the paragraphs that happen to look most similar to
          the student&apos;s working. Retrieval runs a dense and a sparse search in parallel, merges them with
          reciprocal rank fusion, reranks the result with a Pinecone-hosted reranker (BGE reranker v2 m3 by default,
          falling back to Cohere Rerank 3.5), and loads the full text from Supabase by chunk id. A separate SQL lookup
          then adds every rubric criterion for that question, so nothing the examiners would check is left out.
        </p>
        <MermaidBlock
          chart={RETRIEVAL}
          caption="Similarity search finds the relevant solution steps; the SQL lookup guarantees the full rubric."
        />
        <p>
          I looked at Bedrock Knowledge Bases as a managed alternative when the judge moved to Bedrock. It is built for
          general document Q&amp;A, it cannot express the &quot;every criterion for this question&quot; lookup, and
          replacing Pinecone through it would have cost more each month for less control. Moving the judge did not
          need retrieval to move with it.
        </p>
      </section>

      <section>
        <h2>Decisions that changed under real traffic</h2>

        <h3>Which OCR reads the handwriting</h3>
        <p>
          The first policy used Google&apos;s Gemini Flash on Vertex AI as the primary, with a second provider as a
          fallback and Mathpix switched off, to keep the critical path with one vendor until real usage showed how often the
          fallbacks were needed. Production changed that. Gemini caused the incident below, so a Fireworks vision
          model became the primary. On real student handwriting it often took 38 to 90 seconds or more per page,
          against a 35 second budget. Mathpix, a dedicated maths OCR, was fast and accurate enough, so it became the
          only provider for marking, with a clear &quot;try again&quot; error instead of a slow fallback that usually
          failed anyway. Mathpix is configured not to keep student images.
        </p>

        <h3>Which model is the judge</h3>
        <p>
          The judge started on open-source models served by Fireworks. The instruct models it depended on started
          returning 404s on the serverless tier, and the fallback model was slow and often returned invalid JSON. I
          compared Together AI, staying on Fireworks, Gemini on Vertex, and Claude on Bedrock. Judge quality is the
          biggest lever on the feedback students see, and Bedrock Claude gave the best feedback quality plus forced
          tool output and prompt caching, so it won.
        </p>

        <h3>Where the Python service runs</h3>
        <p>
          It started on Render, which ran out of memory on Docling (the PDF parser used for exam papers), moved to a
          DigitalOcean droplet, and finally to a single EC2 instance in Sydney. The reason for EC2 was access, not
          speed: an IAM instance role can call Bedrock without static AWS keys on the host. EC2 cost more than the
          droplet, and I accepted that for the judge quality and the cleaner credentials. Deploys go through one
          GitHub Actions pipeline using OIDC, configuration lives in SSM Parameter Store, and a policy check refuses to
          start the container if the configuration has drifted. The droplet stayed as a standby for one release, so
          rollback was a single URL change.
        </p>

        <h3>Serverless models now, self-hosting later</h3>
        <p>
          After the OCR incident it was tempting to self-host a model on Modal or Baseten. I wrote up the numbers: at
          Studifex&apos;s volume, serverless model APIs were far cheaper than keeping a GPU warm, and scaling a GPU to
          zero brings back the cold starts that caused the incident. Self-hosting is deferred until volume justifies
          it. Any future fine-tuning is limited to answers a human has verified, because training on the model&apos;s
          own past marks would teach it to repeat its mistakes.
        </p>
      </section>

      <section>
        <h2>Incident: &quot;Marking took too long&quot;</h2>
        <p>
          <strong>Symptom.</strong> Photo marking climbed to 94 percent in the UI and then failed with &quot;Marking
          took too long&quot;. The admin dashboard showed no completed gradings, and the service had no logs for the
          failed requests.
        </p>
        <p>
          <strong>Root cause.</strong> The Gemini OCR client refreshed its Google OAuth token synchronously on the event
          loop, with no timeout. When the token endpoint was slow, the whole marking graph blocked until the outer
          120 second limit killed it. Three things hid it: the primary OCR call had no timeout of its own, the browser,
          Vercel and the service all gave up at the same 120 seconds so there was no margin to report anything useful,
          and the 94 percent was a cosmetic cap on the progress bar, not real progress.
        </p>
        <p>
          <strong>Fix.</strong> The token refresh moved off the event loop with a hard timeout and a cache. Every
          external call on the marking path got a bound, and the limits were nested so each layer outlasts the one
          inside it:
        </p>
        <ul>
          <li>OCR primary call 35 seconds, and the whole OCR fallback chain 40 seconds</li>
          <li>The OCR step of the graph 60 seconds</li>
          <li>The service&apos;s request limit 100 seconds</li>
          <li>Vercel&apos;s function limit 120 seconds</li>
          <li>The browser gives up at 130 seconds</li>
        </ul>
        <p>
          Tests assert that order and that a hanging provider fails fast instead of eating the budget. OCR now logs
          each sub-stage, so a hang is visible even when the request times out, and error messages show a reference id
          that support can look up.
        </p>
      </section>

      <section>
        <h2>Other problems worth writing down</h2>
        <ul>
          <li>
            <strong>Correct OCR, wrong marks.</strong> After the switch to Mathpix, the pipeline still expected the
            previous provider&apos;s output shape, so a full page of working collapsed onto one line. That destroyed
            the (a) and (b) structure that step splitting relies on, and the UI showed raw LaTeX. Reading Mathpix&apos;s
            page Markdown and normalising it while keeping the maths delimiters fixed both.
          </li>
          <li>
            <strong>A deleted deploy workflow that kept running.</strong> After moving to EC2, every CI run still
            started the old DigitalOcean deploy, which then failed. GitHub Actions reads <code>workflow_run</code>{" "}
            triggers from the default branch, and the workflow had only been removed from the working branch.
          </li>
          <li>
            <strong>Log shipping that shipped nothing.</strong> The OpenTelemetry Collector sidecar was running, but
            Axiom received no logs: the collector&apos;s default user could not read Docker&apos;s log files. Fixed,
            documented, and confirmed by querying the logs and traces datasets.
          </li>
          <li>
            <strong>Maths that rendered wrong.</strong> Some exam questions showed corrupted maths because the portal
            was rendering the text normalised for embeddings. Display now always reads the original LaTeX, with tests
            and a written rule so it stays that way.
          </li>
        </ul>
      </section>

      <section>
        <h2>Evaluation and diagnostics</h2>
        <p>
          Providers changed often, so each change needed a quick, repeatable way to show nothing had got worse.
        </p>
        <ul>
          <li>
            <strong>A grading evaluation runner</strong> compares models against examiner marks: exact mark agreement,
            mean absolute mark error, the share within one mark, criterion-level F1, and the share of responses that
            are valid JSON.
          </li>
          <li>
            <strong>An OCR evaluation harness</strong> runs providers side by side, works without labelled data for
            smoke runs, batches requests to stay under provider rate limits, and has a one-image readiness check to run
            before long jobs.
          </li>
          <li>
            <strong>A grading canary</strong> marks a known question end to end after a deploy, and load tests check
            latency and error rate against fixed thresholds.
          </li>
          <li>
            <strong>A grading pipeline view</strong> in the admin portal shows each run&apos;s step timings and what was
            retrieved, plus a staging-only switch to compare OCR providers on the same submission. In production
            that switch is read-only.
          </li>
        </ul>
      </section>

      <section>
        <h2>Observability</h2>
        <p>
          A single <code>trace_id</code> is stamped on every log line, outgoing request and trace span, and it joins
          six places: Axiom for logs and OpenTelemetry traces, Langfuse for model calls, Sentry for errors, a typed
          signals table in Supabase for business events, PostHog for product analytics, and the pipeline view in the
          admin portal. When a request crosses the browser, Vercel, the Python service and two model vendors, that one
          key is what makes an incident traceable.
        </p>
      </section>

      <section>
        <h2>Where it stands</h2>
        <p>
          The MVP works end to end on staging: accounts, the question explorer, practice and exam sessions, photo
          marking, the coach, the admin ingest pipeline and the operations dashboards. It has not launched publicly.
          The open work was a formal OCR sign-off against labelled data and a latency target for marking.
        </p>
      </section>
    </div>
  );
}
