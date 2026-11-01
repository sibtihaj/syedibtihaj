"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Grainient = dynamic(() => import("./Grainient"), { ssr: false });

/**
 * Page backdrop: a static blue ink wash on paper, plus a slow WebGL grain on
 * wide screens. The WebGL layer is skipped on small screens and when the
 * visitor asks for reduced motion; the static wash is the same picture at rest.
 */
export function Backdrop() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimated(wide.matches && !still.matches);
    update();
    wide.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(55% 45% at 0% 0%, rgba(37, 99, 235, 0.24), transparent 70%)",
            "radial-gradient(45% 40% at 100% 0%, rgba(59, 130, 246, 0.16), transparent 70%)",
            "radial-gradient(60% 55% at 85% 100%, rgba(47, 111, 224, 0.20), transparent 70%)",
            "radial-gradient(50% 50% at 0% 100%, rgba(14, 116, 204, 0.14), transparent 70%)",
            "#f2f3f2",
          ].join(", "),
        }}
      />
      {animated ? (
        <div className="absolute inset-0 opacity-[0.22] mix-blend-multiply">
          <Grainient
            color1="#1e4fd6"
            color2="#0b2a6f"
            color3="#7fb6f2"
            warpStrength={0.6}
            timeSpeed={0.04}
            grainAmount={0.06}
            contrast={1.2}
          />
        </div>
      ) : null}
      <div className="grain absolute inset-0 opacity-[0.05] mix-blend-multiply" />
    </div>
  );
}
