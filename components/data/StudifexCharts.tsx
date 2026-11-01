import { BarChartFigure, type BarPanel } from "@/components/data/BarChart";
import { DataTable } from "@/components/data/DataTable";

/*
 * Timeout budgets on the photo marking path, before and after the June 2026 fix.
 * Values are the configured limits in the platform's code at the parent of the fix
 * commit and at the fix commit: the client fetch timeout, the Vercel route
 * maxDuration, the Python service's image request wrapper, the ocr_router node
 * budget, the OCR fallback chain timeout and the primary OCR call timeout.
 */

type Layer = { label: string; before: number | null; after: number; primary?: boolean };

const LAYERS: Layer[] = [
  { label: "Browser gives up", before: 120, after: 130 },
  { label: "Vercel function limit", before: 120, after: 120 },
  { label: "Service request limit", before: 120, after: 100 },
  { label: "OCR step of the graph", before: null, after: 60 },
  { label: "OCR fallback chain", before: 105, after: 40 },
  { label: "OCR primary call", before: null, after: 35, primary: true },
];

const seconds = (v: number | null) => (v === null ? "no limit" : `${v} s`);

const PANELS: BarPanel[] = [
  {
    label: "Before the fix",
    bars: LAYERS.map((l) => ({
      label: l.label,
      value: l.before,
      display: seconds(l.before),
      highlight: l.primary,
    })),
  },
  {
    label: "After the fix",
    bars: LAYERS.map((l) => ({
      label: l.label,
      value: l.after,
      display: seconds(l.after),
      highlight: l.primary,
    })),
  },
];

const DESCRIPTION =
  "Horizontal bars on a shared scale from 0 to 130 seconds. Before the fix, the browser, Vercel and the service all " +
  "gave up at 120 seconds, the OCR fallback chain had 105 seconds, and neither the OCR step nor the primary OCR call " +
  "had a limit of its own. After the fix, each layer fits inside the next: the primary OCR call 35 seconds, the " +
  "fallback chain 40, the OCR step 60, the service 100, Vercel 120 and the browser 130.";

export function StudifexTimeoutChart() {
  return (
    <BarChartFigure
      id="ch-stx-timeouts"
      title="Timeout limits on the photo marking path, before and after the fix"
      description={DESCRIPTION}
      max={130}
      ticks={[0, 30, 60, 90, 120]}
      unit="s"
      panels={PANELS}
      caption="Limits as configured in the code before and after the fix. In the incident, the OCR step ran for 120.4 seconds before the 120 second limit cut the whole request off."
      table={
        <DataTable
          className="mb-0 mt-4"
          stackBelow="never"
          caption="Timeout limit per layer, in seconds"
          columns={[
            { label: "Layer", width: "46%" },
            { label: "Before", numeric: true },
            { label: "After", numeric: true },
          ]}
          rows={LAYERS.map((l) => ({
            key: l.label,
            cells: [l.label, seconds(l.before), seconds(l.after)],
          }))}
        />
      }
    />
  );
}
