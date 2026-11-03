import type { StaticImageData } from "next/image";

export type ProductImage = StaticImageData | string;

export type Product = {
  title: string;
  description: string;
  /** Fallback cover image, used only when no `Banner` is set. */
  thumbnail?: ProductImage;
  /** Decorative banner artwork in the site's style (components/banners). */
  Banner?: React.ComponentType<{ className?: string }>;
  /** Screenshots for the case study gallery. Empty when the project has none to show. */
  images: ProductImage[];
  /** Live app or repository URL. Empty when there is nothing public to link to. */
  href: string;
  slug?: string;
  stack?: string[];
  content?: React.ReactNode | string;
};
