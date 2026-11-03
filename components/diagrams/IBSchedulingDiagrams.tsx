import { DiagramFigure, DiagramSvg, Edge, EdgeLabel, Group, Node, StackedFlow } from "@/components/diagrams/kit";

/* ------------------------------------------------------------------ system */

const SYS_TITLE = "IB Scheduling system diagram";
const SYS_DESC =
  "The browser runs the Next.js App Router UI, with middleware and server rendering handling session cookies at the edge. The browser refreshes its session with Supabase Auth through supabase-js and calls the Go API with a Bearer JWT. The Go API, built with chi, go-oidc and pgx, validates tokens against Supabase Auth, reads and writes slots and reservations in Postgres, and exports counters and gauges on /metrics, which Prometheus scrapes and Grafana queries with PromQL.";

function SystemWide() {
  const id = "dg-ibs-sys-w";
  return (
    <DiagramSvg id={id} width={880} height={380} title={SYS_TITLE} description={SYS_DESC}>
      <Group x={8} y={138} w={170} h={82} label="Client" />
      <Group x={8} y={282} w={170} h={82} label="Edge, SSR" />
      <Group x={318} y={132} w={184} h={232} label="Go backend" />
      <Group x={590} y={40} w={282} h={186} label="Supabase" />
      <Group x={560} y={282} w={312} h={82} label="Observability" />

      <Edge id={id} d="M93 150 V22 H731 V52" />
      <Edge id={id} d="M93 208 V288" />
      <Edge id={id} d="M170 179 H324" strong />
      <Edge id={id} d="M410 150 V87 H600" />
      <Edge id={id} d="M490 179 H600" strong />
      <Edge id={id} d="M410 208 V288" />
      <Edge id={id} d="M490 323 H566" />
      <Edge id={id} d="M700 323 H734" />

      <Node x={16} y={150} w={154} h={58} label="Browser" sub={["Next.js App Router"]} />
      <Node x={16} y={294} w={154} h={58} label="Middleware, SSR" sub={["session cookies"]} />
      <Node x={330} y={150} w={160} h={58} focal label="Go API" sub={["chi · go-oidc · pgx"]} />
      <Node x={330} y={294} w={160} h={58} label="/metrics" sub={["Prometheus format"]} />
      <Node x={606} y={58} w={250} h={58} label="Auth" sub={["OIDC issuer, JWKS"]} />
      <Node x={606} y={150} w={250} h={58} kind="store" label="Postgres" sub={["slots and reservations"]} />
      <Node x={572} y={294} w={128} h={58} label="Prometheus" sub={["scrape and store"]} />
      <Node x={740} y={294} w={124} h={58} label="Grafana" sub={["PromQL dashboards"]} />

      <EdgeLabel x={412} y={15}>supabase-js session refresh</EdgeLabel>
      <EdgeLabel x={247} y={170}>Bearer JWT</EdgeLabel>
      <EdgeLabel x={508} y={79}>go-oidc validate</EdgeLabel>
      <EdgeLabel x={546} y={170}>pgx SQL</EdgeLabel>
      <EdgeLabel x={418} y={252} anchor="start">exports</EdgeLabel>
      <EdgeLabel x={531} y={314}>scrapes</EdgeLabel>
    </DiagramSvg>
  );
}

function SystemNarrow() {
  return (
    <StackedFlow
      id="dg-ibs-sys-n"
      title={SYS_TITLE}
      description={SYS_DESC}
      rows={[
        { nodes: [{ label: "Browser", sub: ["Next.js App Router"] }] },
        {
          nodes: [
            { label: "Go API", sub: ["chi · go-oidc · pgx"], focal: true, strongIn: true, inLabel: "Bearer JWT", spine: true },
            { label: "Middleware", sub: ["SSR, session cookies"] },
          ],
        },
        {
          group: "Supabase",
          nodes: [
            { label: "Auth", sub: ["OIDC, JWKS"], from: [0], inLabel: "validate" },
            { label: "Postgres", kind: "store", sub: ["slots, bookings"], from: [0], inLabel: "pgx SQL", strongIn: true },
          ],
        },
        { nodes: [{ label: "/metrics", sub: ["exported by the Go API"], from: "none", fromSpine: true }] },
        { group: "Observability", nodes: [{ label: "Prometheus", sub: ["scrapes and stores"] }] },
        { group: "Observability", nodes: [{ label: "Grafana", sub: ["PromQL dashboards"] }] },
      ]}
    />
  );
}

export function IBSchedulingSystemDiagram() {
  return (
    <DiagramFigure
      wide={<SystemWide />}
      narrow={<SystemNarrow />}
      caption="The browser refreshes its session with Supabase Auth and calls the Go API with a Bearer JWT. Observability here is metrics (scrape and query), not centralised logs."
    />
  );
}

/* -------------------------------------------------------------- deployment */

const DEP_TITLE = "IB Scheduling deployment";
const DEP_DESC =
  "Users reach the Next.js frontend on Vercel over HTTPS. The frontend uses supabase-js for auth with Supabase Cloud and calls the Go API on Railway with a Bearer JWT. The Go API verifies tokens with OIDC and JWKS against Supabase Auth, uses pgx for SQL against Supabase Postgres, and exports metrics that Prometheus scrapes and Grafana charts, both on Railway. Vercel rewrites on the app domain proxy the Grafana and Prometheus dashboards so users can open observability without leaving the app.";

function DeploymentWide() {
  const id = "dg-ibs-dep-w";
  return (
    <DiagramSvg id={id} width={880} height={420} title={DEP_TITLE} description={DEP_DESC}>
      <Group x={150} y={76} w={190} h={276} label="Vercel" />
      <Group x={410} y={76} w={236} h={326} label="Railway" />
      <Group x={688} y={76} w={184} h={194} label="Supabase Cloud" />

      <Edge id={id} d="M71 186 V125 H160" strong />
      <Edge id={id} d="M71 232 V299 H160" />
      <Edge id={id} d="M246 154 V256" />
      <Edge id={id} d="M326 125 H414" strong />
      <Edge id={id} d="M246 96 V40 H820 V90" />
      <Edge id={id} d="M630 125 H694" />
      <Edge id={id} d="M630 140 H652 V225 H694" strong />
      <Edge id={id} d="M525 154 V176" />
      <Edge id={id} d="M525 228 V256" />
      <Edge id={id} d="M525 308 V334" />
      <Edge id={id} d="M326 285 H414" />
      <Edge id={id} d="M326 318 H360 V363 H414" />

      <Node x={16} y={186} w={110} h={46} kind="actor" label="Users" />
      <Node x={166} y={96} w={160} h={58} label="Next.js frontend" sub={["App Router"]} />
      <Node x={166} y={262} w={160} h={74} label="Rewrites" sub={["/grafana-dashboard", "/prometheus-dashboard"]} />
      <Node x={420} y={96} w={210} h={58} focal label="Go API" sub={["chi · pgx · go-oidc"]} />
      <Node x={420} y={182} w={210} h={46} label="/metrics" />
      <Node x={420} y={262} w={210} h={46} label="Prometheus" />
      <Node x={420} y={340} w={210} h={46} label="Grafana" />
      <Node x={700} y={96} w={156} h={58} label="Auth" sub={["OIDC, JWKS"]} />
      <Node x={700} y={196} w={156} h={58} kind="store" label="Postgres" sub={["slots, reservations"]} />

      <EdgeLabel x={79} y={162} anchor="start">HTTPS</EdgeLabel>
      <EdgeLabel x={79} y={272} anchor="start">dashboards</EdgeLabel>
      <EdgeLabel x={375} y={116}>Bearer JWT</EdgeLabel>
      <EdgeLabel x={514} y={34}>supabase-js auth</EdgeLabel>
      <EdgeLabel x={667} y={116}>JWKS</EdgeLabel>
      <EdgeLabel x={672} y={217}>pgx</EdgeLabel>
      <EdgeLabel x={533} y={248} anchor="start">scrapes</EdgeLabel>
      <EdgeLabel x={370} y={277}>proxy</EdgeLabel>
      <EdgeLabel x={366} y={355} anchor="start">proxy</EdgeLabel>
    </DiagramSvg>
  );
}

function DeploymentNarrow() {
  return (
    <StackedFlow
      id="dg-ibs-dep-n"
      title={DEP_TITLE}
      description={DEP_DESC}
      rows={[
        { nodes: [{ label: "Users", kind: "actor" }] },
        {
          group: "Vercel",
          nodes: [
            { label: "Next.js", sub: ["frontend"], inLabel: "HTTPS", strongIn: true },
            { label: "Rewrites", sub: ["dashboard proxy"], inLabel: "dashboards" },
          ],
        },
        {
          nodes: [
            {
              label: "Go API",
              sub: ["chi · pgx · go-oidc, on Railway"],
              focal: true,
              from: [0],
              inLabel: "Bearer JWT",
              strongIn: true,
              spine: true,
            },
          ],
        },
        {
          group: "Supabase Cloud",
          nodes: [
            { label: "Auth", sub: ["OIDC, JWKS"], inLabel: "JWKS" },
            { label: "Postgres", kind: "store", sub: ["slots, reservations"], inLabel: "pgx", strongIn: true },
          ],
        },
        { group: "Railway", nodes: [{ label: "/metrics", sub: ["exported by the Go API"], from: "none", fromSpine: true }] },
        { group: "Railway", nodes: [{ label: "Prometheus", sub: ["proxied by the rewrites"], inLabel: "scrapes" }] },
        { group: "Railway", nodes: [{ label: "Grafana", sub: ["proxied by the rewrites"] }] },
      ]}
    />
  );
}

export function IBSchedulingDeploymentDiagram() {
  return (
    <DiagramFigure
      wide={<DeploymentWide />}
      narrow={<DeploymentNarrow />}
      caption="Users reach everything through the app domain: Vercel serves the frontend and proxies the Grafana and Prometheus dashboards, Railway runs the Go API and metrics stack, and Supabase Cloud holds auth and data. The frontend also talks to Supabase Auth directly through supabase-js."
    />
  );
}
