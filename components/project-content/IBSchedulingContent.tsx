import React from "react";
import Image from "next/image";
import { IBSchedulingDeploymentDiagram, IBSchedulingSystemDiagram } from "@/components/diagrams/IBSchedulingDiagrams";
import { DataTable } from "@/components/data/DataTable";

const GRAFANA_DASHBOARD_URL =
  "https://grafana-production-53f7.up.railway.app/d/booking-api/go-booking-api?from=now-15m&to=now&timezone=browser";

/**
 * Case study: IB Scheduling (Go booking system) - portfolio project detail.
 */
export function IBSchedulingContent() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section>
        <h2>Architecture at a glance</h2>
        <p>
          The summary above names the pieces; here is how work is divided:
          Next.js (TypeScript) owns the product UI and browser session; Go owns
          booking rules, JWT verification against Supabase&apos;s OIDC issuer,
          and Postgres access via pgx. Nothing authoritative runs in the client.
        </p>
        <ul>
          <li>
            <strong>Identity:</strong> Supabase Auth issues JWTs; Next keeps the
            session; Go verifies tokens with OIDC (JWKS).
          </li>
          <li>
            <strong>Data:</strong> Single Postgres (Supabase). Go connects with{" "}
            <code>DATABASE_URL</code> using a service / pooler role - never
            exposed in the browser.
          </li>
          <li>
            <strong>Deploy pattern:</strong> Next on Vercel, Go API on Railway
            (long-lived), CORS restricted to the web origin.
          </li>
        </ul>
        <p>
          The Go service never sees the Supabase anon key - only the user&apos;s{" "}
          <code>access_token</code> as a <code>Bearer</code> JWT, verified
          against the Auth issuer.
        </p>
        <DataTable
          caption="The stack, layer by layer"
          stackBelow="sm"
          columns={[{ label: "Layer", width: "26%" }, { label: "What runs there" }]}
          rows={[
            { key: "ui", cells: ["Web app", "Next.js and TypeScript on Vercel: the product UI and the browser session"] },
            { key: "api", cells: ["API", "Go with chi and pgx on Railway: booking rules and all database access"] },
            {
              key: "identity",
              cells: ["Identity", "Supabase Auth issues the JWT; Go verifies it against the OIDC issuer's JWKS"],
            },
            { key: "data", cells: ["Data", "One Supabase Postgres database, reached through a service or pooler role"] },
            {
              key: "metrics",
              cells: ["Metrics", <>Prometheus scrapes the API&apos;s <code key="m">/metrics</code>; Grafana dashboards query it</>],
            },
          ]}
        />
      </section>

      <section className="not-prose">
        <h2 className="mb-4 text-xl font-normal text-ink">
          System diagram
        </h2>
        <p className="mb-4 text-base leading-relaxed text-ink-body">
          How the browser, Next.js, Supabase (Auth + Postgres), and the Go API
          exchange requests. Observability shows metrics scrape/query
          (Prometheus/Grafana), not centralized logs.
        </p>
        <IBSchedulingSystemDiagram />
      </section>

      <section className="not-prose">
        <h2 className="mb-4 text-xl font-normal text-ink">
          Deployment diagram
        </h2>
        <p className="mb-4 text-base leading-relaxed text-ink-body">
          How Supabase, Vercel, and Railway services connect in production.
        </p>
        <IBSchedulingDeploymentDiagram />
      </section>

      <section>
        <h2>Telemetry and monitoring</h2>
        <p>
          The stack exposes a full metrics path: the Go API serves Prometheus
          text at <code>/metrics</code>; Prometheus scrapes and stores
          time-series; Grafana dashboards query Prometheus (e.g. PromQL). This
          is the operational layer for runtime and app health.
        </p>
        <ul>
          <li>
            <a
              href="https://grafana-production-53f7.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cobalt underline-offset-4 hover:underline"
            >
              Grafana (Railway)
            </a>{" "}
            - dashboards and queries
          </li>
          <li>
            <a
              href="https://railway-prometheus-production-07f7.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cobalt underline-offset-4 hover:underline"
            >
              Prometheus (Railway)
            </a>{" "}
            - scrape targets and TSDB
          </li>
          <li>
            <a
              href="https://go-booking-api-production.up.railway.app/metrics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cobalt underline-offset-4 hover:underline"
            >
              Go API /metrics
            </a>{" "}
            - raw Prometheus exposition from the booking service
          </li>
        </ul>

        <aside
          className="not-prose mt-6 rounded-xl border-2 border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-950 shadow-sm"
          role="note"
        >
          <p className="m-0 font-normal text-amber-950">
            Grafana demo login (portfolio)
          </p>
          <p className="mt-2 mb-0 leading-relaxed">
            Username: <strong className="font-semibold">admin</strong> ·
            Password: <strong className="font-semibold">admin</strong>
          </p>
          <p className="mt-2 mb-0 leading-relaxed">
            After signing in, open <strong>Dashboards</strong> and select{" "}
            <strong>Go booking platform</strong> to view the dashboard that
            tracks Go runtime signals (including goroutines). You can also open{" "}
            <a
              href={GRAFANA_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal text-amber-900 underline underline-offset-2 hover:text-amber-950"
            >
              this dashboard directly
            </a>
            .
          </p>
        </aside>

        <figure className="not-prose mt-8">
          <h3 className="mb-3 text-lg font-normal text-ink">
            Go booking API dashboard (Grafana)
          </h3>
          <div className="overflow-hidden rounded-xl border border-rule bg-paper-deep/60 shadow-sm">
            <Image
              src="/images/grafana.png"
              alt="Grafana dashboard showing Go booking API metrics including goroutines and runtime signals"
              width={2890}
              height={2000}
              className="h-auto w-full"
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority={false}
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-muted">
            Snapshot of the live{" "}
            <a
              href={GRAFANA_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cobalt underline-offset-4 hover:underline"
            >
              Go booking API
            </a>{" "}
            dashboard (last 15 minutes). Use the demo credentials above if Grafana
            prompts for login.
          </figcaption>
        </figure>
      </section>

      <section>
        <h2>Go API surface</h2>
        <p>
          Public vs JWT-protected routes are mounted in{" "}
          <code>apps/api/cmd/server/main.go</code>. Protected handlers expect{" "}
          <code>Authorization: Bearer &lt;supabase access_token&gt;</code>.
        </p>
        <DataTable
          caption="Routes and the auth each one needs"
          hideCaption
          stackBelow="sm"
          compact
          columns={[{ label: "Route" }, { label: "Auth", width: "20%" }]}
          rows={[
            ["GET", "/health", "None"],
            ["GET", "/api/v1/db-status", "Bearer"],
            ["GET", "/api/v1/availability", "Bearer"],
            ["GET", "/api/v1/reservations", "Bearer"],
            ["POST", "/api/v1/reservations", "Bearer"],
            ["POST", "/api/v1/slots", "Bearer"],
            ["POST", "/api/v1/benchmark/booking-rush", "Bearer"],
            ["POST", "/api/v1/mimic/notification/email", "Bearer"],
            ["POST", "/api/v1/mimic/notification/whatsapp", "Bearer"],
          ].map(([method, path, auth]) => ({
            key: `${method} ${path}`,
            cells: [
              <span key="r" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="w-10 font-mono text-[0.8125rem] text-ink-muted">{method}</span>
                <code>
                  {path.split("/").map((part, i) => (
                    <React.Fragment key={i}>
                      {i > 0 ? "/" : null}
                      {i > 1 ? <wbr /> : null}
                      {part}
                    </React.Fragment>
                  ))}
                </code>
              </span>,
              auth,
            ],
          }))}
        />
      </section>

      <section>
        <h2>Database invariants</h2>
        <DataTable
          caption="Tables, their constraints and what each guarantees"
          hideCaption
          stackBelow="md"
          columns={[
            { label: "Table", width: "26%" },
            { label: "Constraint", width: "34%" },
            { label: "What it guarantees" },
          ]}
          rows={[
            {
              key: "resources",
              cells: [
                <code key="t">public.resources</code>,
                <span key="c" className="text-ink-muted">
                  <span aria-hidden="true">-</span>
                  <span className="sr-only">No extra constraint</span>
                </span>,
                "The bookable entity",
              ],
            },
            {
              key: "slots",
              cells: [
                <code key="t">public.slots</code>,
                <code key="c">UNIQUE (resource_id, starts_at)</code>,
                "Discrete windows: one slot per resource per start time",
              ],
            },
            {
              key: "reservations",
              cells: [
                <code key="t">public.reservations</code>,
                <code key="c">UNIQUE (slot_id)</code>,
                <>
                  At most one confirmed reservation per slot; this is the <code key="o">ON CONFLICT</code> target
                </>,
              ],
            },
            {
              key: "user",
              cells: [
                <code key="t">reservations.user_id</code>,
                <>
                  References <code key="r">auth.users(id)</code>
                </>,
                <>
                  Matches the JWT <code key="s">sub</code>, so a booking always belongs to a real user
                </>,
              ],
            },
          ]}
        />
      </section>

      <section>
        <h2>Booking mechanics (race-safe)</h2>
        <p>
          <code>POST /api/v1/reservations</code> with a body{" "}
          <code>{`{ "slot_id": "uuid" }`}</code> runs in a transaction: lock
          the slot row, insert reservation, commit. The unique constraint on{" "}
          <code>slot_id</code> plus <code>FOR UPDATE</code> serializes competing
          bookings; duplicate inserts return 409.
        </p>
        <p>
          <code>GET /api/v1/availability</code> returns open slots (no confirmed
          reservation) via LEFT JOIN; the UI sends the Supabase access token on
          every call through a small fetch wrapper.
        </p>
        <DataTable
          caption="What the system guarantees, and what enforces it"
          stackBelow="sm"
          columns={[{ label: "Guarantee", width: "38%" }, { label: "Enforced by" }]}
          rows={[
            {
              key: "one-booking",
              cells: [
                "Two people cannot book the same slot",
                <>
                  A transaction that locks the slot row with <code key="f">FOR UPDATE</code>, plus{" "}
                  <code key="u">UNIQUE (slot_id)</code> on reservations
                </>,
              ],
            },
            {
              key: "conflict",
              cells: ["The loser of a race gets a clear answer", "A duplicate insert returns 409 instead of a second booking"],
            },
            {
              key: "auth",
              cells: [
                "Only signed-in users can read or book",
                "Every booking route verifies the Supabase JWT against the OIDC issuer",
              ],
            },
            {
              key: "client",
              cells: ["Nothing authoritative runs in the browser", "Booking rules and Postgres access are owned by the Go API"],
            },
            {
              key: "secrets",
              cells: [
                "Database credentials never reach the browser",
                <>
                  <code key="d">DATABASE_URL</code> stays on the Go service, which never sees the Supabase anon key
                </>,
              ],
            },
            { key: "cors", cells: ["Only the web app can call the API from a browser", "CORS restricted to the web origin"] },
          ]}
        />
      </section>

      <section>
        <h2>Source and live demo</h2>
        <p>
          Full source and deployment notes live in the repo{" "}
          <a
            href="https://github.com/sibtihaj/go-booking-system"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cobalt underline-offset-4 hover:underline"
          >
            sibtihaj/go-booking-system
          </a>
          . Try the hosted app at{" "}
          <a
            href="https://go-booking-system.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cobalt underline-offset-4 hover:underline"
          >
            go-booking-system.vercel.app
          </a>{" "}
          and the Architecture pages for interactive diagrams.
        </p>
      </section>
    </div>
  );
}
