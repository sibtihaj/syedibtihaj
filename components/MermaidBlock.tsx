"use client";

import { useEffect, useId, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "loose",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
});

type MermaidBlockProps = {
  chart: string;
  caption?: string;
};

export function MermaidBlock({ chart, caption }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/:/g, "");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    void (async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${reactId}`, chart);
        if (!cancelled && el) {
          el.innerHTML = svg;
        }
      } catch {
        if (!cancelled && el) {
          el.textContent =
            "Could not render diagram. Your browser may block required resources.";
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  return (
    <figure className="not-prose my-8">
      <div
        ref={containerRef}
        className="max-h-[min(90vh,1600px)] overflow-auto rounded-xl border border-zinc-200 bg-white p-4 [&_svg]:h-auto [&_svg]:min-w-full [&_svg]:max-w-none"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-zinc-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
