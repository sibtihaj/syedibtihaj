"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types/products";
import { cn } from "@/lib/utils";

/**
 * Screenshot viewer for a case study: one large frame and a row of thumbnails.
 */
export const ProjectGallery = ({ images, title }: { images: ProductImage[]; title: string }) => {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_30px_60px_-36px_rgba(13,27,62,0.5)]">
        <Image
          key={active}
          src={current}
          alt={`${title}, screenshot ${active + 1} of ${images.length}`}
          fill
          priority={active === 0}
          sizes="(min-width: 1024px) 880px, 100vw"
          className="object-cover object-left-top"
        />
      </div>

      {images.length > 1 ? (
        <ul className="mt-4 flex flex-wrap gap-3" aria-label="Screenshots">
          {images.map((image, idx) => (
            <li key={idx}>
              <button
                type="button"
                onClick={() => setActive(idx)}
                aria-pressed={active === idx}
                aria-label={`Show screenshot ${idx + 1} of ${images.length}`}
                className={cn(
                  "relative block h-16 w-24 overflow-hidden rounded-lg border transition-all duration-200 sm:h-20 sm:w-32",
                  active === idx
                    ? "border-cobalt ring-2 ring-cobalt/25"
                    : "border-ink/10 opacity-70 hover:opacity-100"
                )}
              >
                <Image src={image} alt="" fill sizes="128px" className="object-cover object-left-top" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
