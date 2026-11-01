import React from "react";
import Image from "next/image";
import { IBSchedulingDeploymentDiagram, IBSchedulingSystemDiagram } from "@/components/diagrams/IBSchedulingDiagrams";

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
        <div className="not-prose my-4 overflow-x-auto rounded-xl border border-rule">
          <table className="w-full min-w-[32rem] text-left text-sm text-ink-body">
            <thead className="bg-paper-deep/60 text-[0.8125rem] text-ink-muted">
              <tr>
                <th className="px-3 py-2 font-normal">Method</th>
                <th className="px-3 py-2 font-normal">Path</th>
                <th className="px-3 py-2 font-normal">Auth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <tr>
                <td className="px-3 py-2 font-mono text-xs">GET</td>
                <td className="px-3 py-2 font-mono text-xs">/health</td>
                <td className="px-3 py-2">None</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">GET</td>
                <td className="px-3 py-2 font-mono text-xs">
                  /api/v1/db-status
                </td>
                <td className="px-3 py-2">Bearer</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">GET</td>
                <td className="px-3 py-2 font-mono text-xs">
                  /api/v1/availability
                </td>
                <td className="px-3 py-2">Bearer</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">GET</td>
                <td className="px-3 py-2 font-mono text-xs">
                  /api/v1/reservations
                </td>
                <td className="px-3 py-2">Bearer</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">POST</td>
                <td className="px-3 py-2 font-mono text-xs">
                  /api/v1/reservations
                </td>
                <td className="px-3 py-2">Bearer</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">POST</td>
                <td className="px-3 py-2 font-mono text-xs">/api/v1/slots</td>
                <td className="px-3 py-2">Bearer</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">POST</td>
                <td className="px-3 py-2 font-mono text-xs">
                  /api/v1/benchmark/booking-rush
                </td>
                <td className="px-3 py-2">Bearer</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">POST</td>
                <td className="px-3 py-2 font-mono text-xs">
                  /api/v1/mimic/notification/email
                </td>
                <td className="px-3 py-2">Bearer</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">POST</td>
                <td className="px-3 py-2 font-mono text-xs">
                  /api/v1/mimic/notification/whatsapp
                </td>
                <td className="px-3 py-2">Bearer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Database invariants</h2>
        <ul>
          <li>
            <code>public.resources</code> - bookable entity
          </li>
          <li>
            <code>public.slots</code> - <code>UNIQUE (resource_id, starts_at)</code>{" "}
            - discrete windows
          </li>
          <li>
            <code>public.reservations</code> -{" "}
            <code>UNIQUE (slot_id)</code> - at most one confirmed row per slot ({" "}
            <code>ON CONFLICT</code> target)
          </li>
          <li>
            <code>reservations.user_id</code> references{" "}
            <code>auth.users(id)</code> - aligns with JWT <code>sub</code>
          </li>
        </ul>
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
