import type { StaticImageData } from "next/image";

export type ProductImage = StaticImageData | string;

export type Product = {
  title: string;
  description: string;
  /** Fallback cover image, used only when no designed `Cover` is set. */
  thumbnail: ProductImage;
  /** Designed cover drawn in the site's style (components/covers). */
  Cover?: React.ComponentType<{ className?: string; decorative?: boolean }>;
  images: ProductImage[];
  href: string;
  slug?: string;
  stack?: string[];
  content?: React.ReactNode | string;
};
