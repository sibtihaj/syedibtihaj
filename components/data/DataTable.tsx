import React from "react";
import { cn } from "@/lib/utils";

/*
 * Tables for the case studies, in the same ink-on-paper language as the diagram
 * kit: an ink rule above and below, hairlines between rows, a serif header row
 * and Outfit body text. No zebra stripes, no hover fills.
 *
 * On narrow screens each row reflows into a small card: the row's first cell
 * becomes its title and every other cell shows its column name above the value,
 * so nothing scrolls sideways. The table keeps explicit ARIA roles, because
 * some browsers drop table semantics once a table is no longer display: table.
 */

export type DataColumn = {
  /** Column name, shown in the header row and above each value when stacked. */
  label: string;
  /** Width hint for the wide layout, for example "24%". */
  width?: string;
  /** Right-aligned, tabular figures. */
  numeric?: boolean;
};

export type DataRow = {
  key: string;
  /** One cell per column. The first cell is the row header. */
  cells: React.ReactNode[];
};

type Breakpoint = "sm" | "md" | "lg" | "never";

/* Tailwind needs whole class names in the source, so each breakpoint is spelled out. */
const LAYOUT: Record<
  Breakpoint,
  { table: string; caption: string; head: string; body: string; row: string; cell: string; label: string; num: string }
> = {
  sm: {
    table: "block sm:table",
    caption: "block sm:table-caption",
    head: "sr-only sm:not-sr-only sm:table-header-group",
    body: "block border-t border-ink/70 sm:table-row-group sm:border-t-0",
    row: "block py-4 sm:table-row sm:py-0",
    cell: "block sm:table-cell sm:py-3.5 sm:pr-6 sm:last:pr-0",
    label: "sm:hidden",
    num: "sm:text-right",
  },
  md: {
    table: "block md:table",
    caption: "block md:table-caption",
    head: "sr-only md:not-sr-only md:table-header-group",
    body: "block border-t border-ink/70 md:table-row-group md:border-t-0",
    row: "block py-4 md:table-row md:py-0",
    cell: "block md:table-cell md:py-3.5 md:pr-6 md:last:pr-0",
    label: "md:hidden",
    num: "md:text-right",
  },
  never: {
    table: "table",
    caption: "table-caption",
    head: "table-header-group",
    body: "table-row-group",
    row: "table-row",
    cell: "table-cell py-3 pr-4 last:pr-0 sm:py-3.5 sm:pr-6",
    label: "",
    num: "text-right",
  },
  lg: {
    table: "block lg:table",
    caption: "block lg:table-caption",
    head: "sr-only lg:not-sr-only lg:table-header-group",
    body: "block border-t border-ink/70 lg:table-row-group lg:border-t-0",
    row: "block py-4 lg:table-row lg:py-0",
    cell: "block lg:table-cell lg:py-3.5 lg:pr-6 lg:last:pr-0",
    label: "lg:hidden",
    num: "lg:text-right",
  },
};

export function DataTable({
  caption,
  columns,
  rows,
  stackBelow = "md",
  hideCaption = false,
  compact = false,
  className,
}: {
  /** Names the table. Shown above it, in the italic serif the diagrams use for group names. */
  caption: string;
  columns: DataColumn[];
  rows: DataRow[];
  /**
   * Below this breakpoint each row reflows into a card. Wider tables need a wider
   * breakpoint; "never" keeps a short, narrow table as a table at every width.
   */
  stackBelow?: Breakpoint;
  /** In the card layout, put each column name beside its value instead of above it. For column names of about four characters and short values. */
  compact?: boolean;
  /** Keep the caption for assistive tech only, when a visible heading right above already names the table. */
  hideCaption?: boolean;
  className?: string;
}) {
  const l = LAYOUT[stackBelow];

  return (
    <div className={cn("not-prose my-8", className)}>
      <table role="table" className={cn(l.table, "w-full table-fixed border-collapse text-left")}>
        <caption
          className={
            hideCaption
              ? "sr-only"
              : cn(l.caption, "caption-top pb-3 text-left font-heading text-[1rem] italic leading-snug text-ink-muted")
          }
        >
          {caption}
        </caption>
        <colgroup>
          {columns.map((c, i) => (
            <col key={i} style={c.width ? { width: c.width } : undefined} />
          ))}
        </colgroup>
        <thead role="rowgroup" className={l.head}>
          <tr role="row" className="border-b border-t border-b-ink/25 border-t-ink/70">
            {columns.map((c, i) => (
              <th
                key={i}
                role="columnheader"
                scope="col"
                className={cn(
                  "py-2.5 align-bottom font-heading text-[0.95rem] font-normal text-ink-muted last:pr-0",
                  stackBelow === "never" ? "pr-4 sm:pr-6" : "pr-6",
                  c.numeric && l.num
                )}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup" className={cn(l.body, "border-b border-b-ink/70")}>
          {rows.map((row) => (
            <tr key={row.key} role="row" className={cn(l.row, "border-b border-rule last:border-b-0")}>
              {row.cells.map((cell, i) => {
                const col = columns[i] ?? { label: "" };
                const label = stackBelow === "never" ? null : (
                  <span
                    aria-hidden="true"
                    className={cn(
                      l.label,
                      compact ? "min-w-10 shrink-0 text-[0.8125rem] text-ink-muted" : "mb-1 block text-[0.8125rem] text-ink-muted"
                    )}
                  >
                    {col.label}
                  </span>
                );
                if (i === 0) {
                  return (
                    <th
                      key={i}
                      role="rowheader"
                      scope="row"
                      className={cn(
                        l.cell,
                        "align-top font-heading text-[1rem] font-normal leading-snug text-ink"
                      )}
                    >
                      {cell}
                    </th>
                  );
                }
                return (
                  <td
                    key={i}
                    role="cell"
                    className={cn(
                      l.cell,
                      "align-top text-[0.9375rem] leading-relaxed text-ink-body [overflow-wrap:anywhere]",
                      stackBelow !== "never" && (compact ? "mt-1.5 flex items-baseline gap-3" : "mt-3"),
                      stackBelow === "sm" && "sm:mt-0",
                      stackBelow === "md" && "md:mt-0",
                      stackBelow === "lg" && "lg:mt-0",
                      col.numeric && cn("tabular-nums", l.num)
                    )}
                  >
                    {label}
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
