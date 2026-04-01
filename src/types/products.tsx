import type { StaticImageData } from "next/image";

export type ProductImage = StaticImageData | string;

export type Product = {
  title: string;
  description: string;
  thumbnail: ProductImage;
  images: ProductImage[];
  href: string;
  slug?: string;
  stack?: string[];
  content?: React.ReactNode | string;
};
