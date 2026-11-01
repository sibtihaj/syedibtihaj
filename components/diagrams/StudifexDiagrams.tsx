import { DiagramFigure, DiagramSvg, Edge, EdgeLabel, Group, Node, StackedFlow } from "@/components/diagrams/kit";

/* ------------------------------------------------------------ architecture */

const ARCH_TITLE = "Studifex architecture";
const ARCH_DESC =
  "The browser talks only to the Next.js app on Vercel, which serves the marketing site and the student and admin portals and reads Supabase under row level security. The Next.js app calls the Python service, built with FastAPI and LangGraph and running on AWS EC2 in Sydney, with a service token. The Python service uses Supabase and Pinecone for data, calls Mathpix, Bedrock Claude and Fireworks, and sends logs, traces and errors to Axiom, Langfuse and Sentry.";

function ArchitectureWide() {
  const id = "dg-stx-arch-w";
  return (
    <DiagramSvg id={id} width={880} height={480} title={ARCH_TITLE} description={ARCH_DESC}>
      <Group x={664} y={40} w={204} h={158} label="Data" />
      <Group x={664} y={238} w={204} h={228} label="Model APIs" />

      <Edge id={id} d="M140 180 H178" strong />
      <Edge id={id} d="M354 180 H438" strong />
      <Edge id={id} d="M620 194 H642 V352 H658" strong />
      <Edge id={id} d="M620 166 H642 V119 H658" />
      <Edge id={id} d="M269 143 V85 H672" />
      <Edge id={id} d="M532 217 V312" dashed />

      <Node x={16} y={157} w={124} h={46} kind="actor" label="Browser" />
      <Node x={184} y={143} w={170} h={74} label="Next.js on Vercel" sub={["marketing site", "student and admin portals"]} />
      <Node x={444} y={143} w={176} h={74} focal label="Python service" sub={["FastAPI · LangGraph", "AWS EC2, Sydney"]} />
      <Node x={444} y={318} w={176} h={58} label="Observability" sub={["Axiom · Langfuse · Sentry"]} />

      <Node x={678} y={56} w={176} h={58} kind="store" label="Supabase" sub={["Postgres · Auth · Storage"]} />
      <Node x={678} y={126} w={176} h={58} kind="store" label="Pinecone" sub={["dense and sparse indexes"]} />
      <Node x={678} y={254} w={176} h={58} label="Mathpix" sub={["handwriting to LaTeX"]} />
      <Node x={678} y={324} w={176} h={58} label="Bedrock Claude" sub={["judge and coach"]} />
      <Node x={678} y={394} w={176} h={58} label="Fireworks" sub={["LaTeX, structuring"]} />

      <EdgeLabel x={396} y={171}>service token</EdgeLabel>
      <EdgeLabel x={450} y={77}>auth, reads under RLS</EdgeLabel>
      <EdgeLabel x={524} y={268} anchor="end">logs, traces, errors</EdgeLabel>
    </DiagramSvg>
  );
}

function ArchitectureNarrow() {
  return (
    <StackedFlow
      id="dg-stx-arch-n"
      title={ARCH_TITLE}
      description={ARCH_DESC}
      rows={[
        { nodes: [{ label: "Browser", kind: "actor" }] },
        {
          nodes: [
            {
              label: "Next.js on Vercel",
              sub: ["marketing site and portals", "reads Supabase under RLS"],
              strongIn: true,
            },
          ],
        },
        {
          nodes: [
            {
              label: "Python service",
              sub: ["FastAPI · LangGraph · AWS EC2"],
              focal: true,
              strongIn: true,
              inLabel: "service token",
              spine: true,
            },
          ],
        },
        { group: "Data", nodes: [{ label: "Supabase", kind: "store", sub: ["Postgres · Auth · Storage"], fromSpine: true }] },
        { group: "Data", connect: false, nodes: [{ label: "Pinecone", kind: "store", sub: ["dense and sparse indexes"], fromSpine: true }] },
        { group: "Model APIs", nodes: [{ label: "Mathpix", sub: ["handwriting to LaTeX"], fromSpine: true, strongIn: true }] },
        { group: "Model APIs", connect: false, nodes: [{ label: "Bedrock Claude", sub: ["judge and coach"], fromSpine: true, strongIn: true }] },
        { group: "Model APIs", connect: false, nodes: [{ label: "Fireworks", sub: ["LaTeX, structuring"], fromSpine: true }] },
        { nodes: [{ label: "Observability", sub: ["Axiom · Langfuse · Sentry"], fromSpine: true, dashedIn: true }] },
      ]}
    />
  );
}

export function StudifexArchitectureDiagram() {
  return (
    <DiagramFigure
      wide={<ArchitectureWide />}
      narrow={<ArchitectureNarrow />}
      caption="The browser only talks to the Next.js app. Everything that touches a model goes through the Python service."
    />
  );
}

/* ----------------------------------------------------------------- marking */

const MARK_TITLE = "How a photo of handwritten working is marked";
const MARK_DESC =
  "A photo of handwritten working passes a quality gate, Mathpix reads the handwriting into LaTeX, the LaTeX is cleaned up, and the working is split into parts and steps. The marking guide is then retrieved, Bedrock Claude marks each criterion against it, a confidence check runs, and the marks and audit trail are saved. If no model could mark the answer, it is held for review instead.";

function MarkingWide() {
  const id = "dg-stx-mark-w";
  const row1 = [194, 364, 534, 704];
  return (
    <DiagramSvg id={id} width={880} height={400} title={MARK_TITLE} description={MARK_DESC}>
      <Group x={180} y={66} w={686} h={88} label="Read the working" />
      <Group x={180} y={216} w={686} h={88} label="Mark it" />

      <Edge id={id} d="M156 110 H188" strong />
      {row1.slice(0, 3).map((x) => (
        <Edge key={`r1-${x}`} id={id} d={`M${x + 150} 110 H${x + 164}`} strong />
      ))}
      <Edge id={id} d="M779 139 V186 H269 V225" strong />
      {row1.slice(0, 3).map((x) => (
        <Edge key={`r2-${x}`} id={id} d={`M${x + 150} 260 H${x + 164}`} strong />
      ))}
      <Edge id={id} d="M439 289 V334" dashed />

      <Node x={16} y={87} w={140} h={46} kind="actor" label="Photo of working" />
      <Node x={194} y={81} w={150} h={58} label="Quality gate" sub={["is the photo usable?"]} />
      <Node x={364} y={81} w={150} h={58} label="Read handwriting" sub={["Mathpix to LaTeX"]} />
      <Node x={534} y={81} w={150} h={58} label="Clean up LaTeX" sub={["rules, then a model"]} />
      <Node x={704} y={81} w={150} h={58} label="Parts and steps" sub={["split the working"]} />

      <Node x={194} y={231} w={150} h={58} label="Marking guide" sub={["hybrid retrieval"]} />
      <Node x={364} y={231} w={150} h={58} focal label="Mark criteria" sub={["Bedrock Claude judge"]} />
      <Node x={534} y={231} w={150} h={58} kind="decision" label="Confidence" sub={["how sure is it?"]} />
      <Node x={704} y={231} w={150} h={58} kind="store" label="Save result" sub={["marks, audit trail"]} />

      <Node x={364} y={340} w={150} h={46} label="Held for review" />
      <EdgeLabel x={447} y={320} anchor="start">no model marked it</EdgeLabel>
    </DiagramSvg>
  );
}

function MarkingNarrow() {
  return (
    <StackedFlow
      id="dg-stx-mark-n"
      title={MARK_TITLE}
      description={MARK_DESC}
      rows={[
        { nodes: [{ label: "Photo of working", kind: "actor" }] },
        { group: "Read the working", nodes: [{ label: "Quality gate", sub: ["is the photo usable?"], strongIn: true }] },
        { group: "Read the working", nodes: [{ label: "Read handwriting", sub: ["Mathpix to LaTeX"], strongIn: true }] },
        { group: "Read the working", nodes: [{ label: "Clean up LaTeX", sub: ["rules, then a model"], strongIn: true }] },
        { group: "Read the working", nodes: [{ label: "Parts and steps", sub: ["split the working"], strongIn: true }] },
        { group: "Mark it", nodes: [{ label: "Marking guide", sub: ["hybrid retrieval"], strongIn: true }] },
        { group: "Mark it", nodes: [{ label: "Mark criteria", sub: ["Bedrock Claude judge"], focal: true, strongIn: true }] },
        {
          group: "Mark it",
          nodes: [
            { label: "Held for review", dashedIn: true, inLabel: "not marked" },
            { label: "Confidence", kind: "decision", sub: ["how sure is it?"], strongIn: true },
          ],
        },
        { group: "Mark it", nodes: [{ label: "Save result", kind: "store", sub: ["marks, audit trail"], from: [1], strongIn: true }] },
      ]}
    />
  );
}

export function StudifexMarkingDiagram() {
  return (
    <DiagramFigure
      wide={<MarkingWide />}
      narrow={<MarkingNarrow />}
      caption="Eight steps in one LangGraph graph. If no model actually marked the answer, it is held for review instead of getting a guessed mark."
    />
  );
}

/* --------------------------------------------------------------- retrieval */

const RET_TITLE = "Retrieval grounded in the marking guide";
const RET_DESC =
  "The question and the student's steps are filtered to this question's certified rubric and solution content. Dense and sparse searches run in parallel and are merged with reciprocal rank fusion, reranked, and hydrated with full text from Supabase by chunk id. A separate SQL lookup adds every rubric criterion for the question, and both feed the context for the judge.";

function RetrievalWide() {
  const id = "dg-stx-ret-w";
  return (
    <DiagramSvg id={id} width={880} height={300} title={RET_TITLE} description={RET_DESC}>
      <Edge id={id} d="M152 110 H170" strong />
      <Edge id={id} d="M304 110 H317 V70 H324" strong />
      <Edge id={id} d="M317 110 V150 H324" strong />
      <Edge id={id} d="M440 70 H453 V110 H460" strong />
      <Edge id={id} d="M440 150 H453 V110" strong arrow={false} />
      <Edge id={id} d="M594 110 H614" strong />
      <Edge id={id} d="M732 110 H752" strong />
      <Edge id={id} d="M811 139 V229" strong />
      <Edge id={id} d="M240 147 V258 H324" />
      <Edge id={id} d="M594 258 H614" />

      <Node x={16} y={87} w={136} h={46} kind="actor" label="Question, steps" />
      <Node x={176} y={73} w={128} h={74} label="Filter" sub={["this question,", "certified content"]} />
      <Node x={330} y={47} w={110} h={46} label="Dense search" />
      <Node x={330} y={127} w={110} h={46} label="Sparse search" />
      <Node x={466} y={81} w={128} h={58} focal label="Rank fusion" sub={["reciprocal rank"]} />
      <Node x={620} y={81} w={112} h={58} label="Rerank" sub={["BGE, then Cohere"]} />
      <Node x={758} y={81} w={106} h={58} label="Hydrate" sub={["full text by id"]} />

      <Node x={330} y={229} w={264} h={58} kind="store" label="Every rubric criterion" sub={["SQL lookup for this question"]} />
      <Node x={620} y={235} w={244} h={46} kind="actor" label="Context for the judge" />
    </DiagramSvg>
  );
}

function RetrievalNarrow() {
  return (
    <StackedFlow
      id="dg-stx-ret-n"
      title={RET_TITLE}
      description={RET_DESC}
      rows={[
        { nodes: [{ label: "Question, steps", kind: "actor" }] },
        { nodes: [{ label: "Filter", sub: ["this question, certified content"], strongIn: true, spine: true }] },
        {
          nodes: [
            { label: "Dense search", strongIn: true },
            { label: "Sparse search", strongIn: true },
          ],
        },
        { nodes: [{ label: "Rank fusion", sub: ["reciprocal rank"], focal: true, strongIn: true }] },
        { nodes: [{ label: "Rerank", sub: ["BGE, then Cohere"], strongIn: true }] },
        {
          nodes: [
            { label: "All criteria", kind: "store", sub: ["SQL, this question"], from: "none", fromSpine: true },
            { label: "Hydrate", sub: ["full text by chunk id"], from: [0], strongIn: true },
          ],
        },
        { nodes: [{ label: "Context for the judge", kind: "actor", strongIn: true }] },
      ]}
    />
  );
}

export function StudifexRetrievalDiagram() {
  return (
    <DiagramFigure
      wide={<RetrievalWide />}
      narrow={<RetrievalNarrow />}
      caption="Similarity search finds the relevant solution steps. The SQL lookup guarantees the full rubric is in front of the judge."
    />
  );
}
