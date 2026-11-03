import React from "react";
import {
  AIMarkingArchitectureDiagram,
  AIMarkingFlowDiagram,
  AIMarkingRetrievalDiagram,
} from "@/components/diagrams/AIMarkingDiagrams";
import { DataTable } from "@/components/data/DataTable";
import { AIMarkingTimeoutChart } from "@/components/data/AIMarkingCharts";

/**
 * Case study: EdTech AI platform (AI marking for handwritten VCE maths).
 */
export function AIMarkingContent() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section>
        <h2>What it is</h2>
        <p>
          The platform is built for Victorian VCE students. It has a question bank built from past exam papers,
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
        <AIMarkingArchitectureDiagram />
        <DataTable
          caption="The stack, layer by layer"
          stackBelow="sm"
          columns={[{ label: "Layer", width: "26%" }, { label: "What runs there" }]}
          rows={[
            {
              key: "web",
              cells: ["Web app", "Next.js 16, React 19, TypeScript, Tailwind CSS and KaTeX for maths, hosted on Vercel"],
            },
            {
              key: "service",
              cells: ["Marking service", "Python 3.12, FastAPI, Pydantic and LangGraph, packaged with uv and Docker"],
            },
            {
              key: "ingest",
              cells: ["Document ingest", "Docling for exam papers, python-docx for marking guides, PyMuPDF"],
            },
            {
              key: "data",
              cells: [
                "Data",
                "Supabase (Postgres with row level security, Auth, Storage, Realtime) and Pinecone dense and sparse indexes with hosted reranking",
              ],
            },
            {
              key: "models",
              cells: [
                "Models",
                "Mathpix for handwriting, Claude on AWS Bedrock as judge and coach, Kimi on Fireworks for LaTeX clean-up and structuring",
              ],
            },
            {
              key: "infra",
              cells: ["Infrastructure", "AWS EC2 with an IAM instance role, ECR, SSM Parameter Store, Terraform"],
            },
            {
              key: "delivery",
              cells: ["Delivery", "GitHub Actions with OIDC to AWS for the service, Vercel's Git integration for the web app"],
            },
            {
              key: "observability",
              cells: ["Observability", "OpenTelemetry, Axiom, Langfuse, Sentry and PostHog"],
            },
          ]}
        />
      </section>

      <section>
        <h2>Marking a photo of handwritten working</h2>
        <p>
          Marking is a LangGraph state graph with eight steps. Each step records what it did and passes a typed state to
          the next one, and every call to an outside service inside it has a time limit. The judge marks against specific criteria retrieved from the official
          marking guide, so every mark can be traced back to the line of the guide it came from.
        </p>
        <AIMarkingFlowDiagram />
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
        <AIMarkingRetrievalDiagram />
        <p>
          I looked at Bedrock Knowledge Bases as a managed alternative when the judge moved to Bedrock. It is built for
          general document Q&amp;A, it cannot express the &quot;every criterion for this question&quot; lookup, and
          replacing Pinecone through it would have cost more each month for less control. Moving the judge did not
          need retrieval to move with it.
        </p>
      </section>

      <section>
        <h2>Decisions that changed under real traffic</h2>
        <p>
          Several of the big choices were made twice: once on paper, and again once real handwriting and real failures
          showed where the first answer was wrong. The table is the short version; the reasoning for the ones that
          moved most follows it.
        </p>
        <DataTable
          caption="Key decisions and what they cost"
          stackBelow="lg"
          columns={[
            { label: "Decision", width: "22%" },
            { label: "Options considered", width: "24%" },
            { label: "Why", width: "30%" },
            { label: "Trade-off" },
          ]}
          rows={[
            {
              key: "retrieval",
              cells: [
                "Hybrid retrieval on Pinecone plus a SQL rubric lookup",
                "Bedrock Knowledge Bases",
                "Marking needs every criterion for the question, which does not fit a similarity-search knowledge base",
                "I own and maintain the retrieval code",
              ],
            },
            {
              key: "judge",
              cells: [
                "Claude on AWS Bedrock as the judge",
                "Llama on Together AI, staying on Fireworks, Gemini on Vertex AI",
                "Best feedback quality, forced tool output for valid JSON, and prompt caching",
                "Model access is tied to AWS, which is why the service moved there too",
              ],
            },
            {
              key: "host",
              cells: [
                "One EC2 instance with an IAM role",
                "Staying on a DigitalOcean droplet with static keys",
                "Bedrock access without long-lived AWS keys on the host",
                "Costs more each month than the droplet",
              ],
            },
            {
              key: "hold",
              cells: [
                "Hold an attempt for review when no judge ran",
                "Fall back quietly to a rule-based scorer",
                "A confident wrong mark is worse for a student than \"under review\"",
                "Some attempts wait for review instead of getting a mark",
              ],
            },
            {
              key: "ocr",
              cells: [
                "Mathpix as the only OCR for marking",
                "Gemini on Vertex AI, Kimi on Fireworks, a fallback chain",
                "Fast and accurate on handwriting, and a clear failure beats a silent switch to a weaker model",
                "Mathpix has a monthly page cap, so a search for a bulk provider continued",
              ],
            },
            {
              key: "serverless",
              cells: [
                "Serverless model APIs",
                "Self-hosting on Modal or Baseten",
                "Far cheaper at this volume, and scaling a GPU to zero brings back cold starts",
                "Revisit once volume makes a warm GPU worth paying for",
              ],
            },
          ]}
        />

        <h3>Which OCR reads the handwriting</h3>
        <p>
          The OCR provider changed three times in four days once real student handwriting reached it. Mathpix, a
          dedicated maths OCR, ended up as the only provider for marking, and it is configured not to keep student
          images.
        </p>
        <DataTable
          caption="OCR provider for marking, over time"
          stackBelow="md"
          columns={[
            { label: "When", width: "18%" },
            { label: "OCR for marking", width: "34%" },
            { label: "Why it changed" },
          ]}
          rows={[
            {
              key: "may",
              cells: [
                "May 2026",
                "Gemini Flash on Vertex AI, Fireworks as fallback, Mathpix off by default",
                "The first policy kept the critical path with one vendor until real usage showed how often a fallback was needed.",
              ],
            },
            {
              key: "jun19",
              cells: [
                "19 June",
                "Kimi on Fireworks, Gemini as a bounded fallback",
                "Gemini's token refresh hung the marking graph, which is the incident below.",
              ],
            },
            {
              key: "jun20",
              cells: [
                "20 June",
                "Mathpix, Gemini as fallback",
                "Kimi often took 38 to 90 seconds or more on real student handwriting, against a 35 second budget.",
              ],
            },
            {
              key: "jun22",
              cells: [
                "22 June",
                "Mathpix only",
                "The silent fallback to a weaker model was removed, so a failure now returns a clear \"try again\".",
              ],
            },
          ]}
        />

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
          the platform&apos;s volume, serverless model APIs were far cheaper than keeping a GPU warm, and scaling a GPU to
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
          inside it. A slow OCR provider now fails inside its own 35 seconds and leaves the outer layers time to
          report what happened.
        </p>
        <AIMarkingTimeoutChart />
        <p>
          Tests assert that order and that a hanging provider fails fast instead of eating the budget. OCR now logs
          each sub-stage, so a hang is visible even when the request times out, and error messages show a reference id
          that support can look up.
        </p>
      </section>

      <section>
        <h2>Other problems worth writing down</h2>
        <DataTable
          caption="Smaller incidents, in the order they turned up"
          stackBelow="lg"
          columns={[
            { label: "Problem", width: "19%" },
            { label: "Symptom", width: "24%" },
            { label: "Cause", width: "30%" },
            { label: "Fix" },
          ]}
          rows={[
            {
              key: "mathpix-shape",
              cells: [
                "Correct OCR, wrong marks",
                "After the switch to Mathpix, marks were off and the UI showed raw LaTeX.",
                "The pipeline still expected the previous provider's output, so a full page of working collapsed onto one line and lost the (a) and (b) structure that step splitting relies on.",
                "Read Mathpix's page Markdown and normalise it while keeping the maths delimiters.",
              ],
            },
            {
              key: "deploy-workflow",
              cells: [
                "A deleted deploy workflow that kept running",
                "Every CI run still started the old DigitalOcean deploy, which then failed.",
                <>
                  GitHub Actions reads <code>workflow_run</code> triggers from the default branch, and the workflow
                  had only been removed from the working branch.
                </>,
                "Remove it from the default branch too, so only the EC2 deploy follows CI.",
              ],
            },
            {
              key: "log-shipping",
              cells: [
                "Log shipping that shipped nothing",
                "The OpenTelemetry Collector sidecar was running, but Axiom received no logs.",
                "The collector's default user could not read Docker's log files.",
                "Give the collector read access, document the symptom, and confirm by querying the logs and traces datasets.",
              ],
            },
            {
              key: "schema-422",
              cells: [
                "Marking rejected by its own schema",
                "Text gradings and the grading canary failed with HTTP 422.",
                "Long judge explanations broke a length limit in the result schema.",
                "Clamp the explanation before validation, with a regression test.",
              ],
            },
            {
              key: "maths-render",
              cells: [
                "Maths that rendered wrong",
                "Some exam questions showed corrupted maths.",
                "The portal was rendering the text normalised for embeddings.",
                "Display always reads the original LaTeX, with tests and a written rule.",
              ],
            },
            {
              key: "tutor-500",
              cells: [
                "A tutor chat that could not be reached",
                "The page loaded, but sending a message returned a 500.",
                "A Next.js cache wrapper was put around a Supabase client that reads cookies, which cannot run inside a cache scope.",
                "Remove the wrapper and add a CI check that blocks the pattern.",
              ],
            },
          ]}
        />
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
