export type Blog = {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
  tags?: string[];
  // rest
  [key: string]: any;
};

/** Serialized blog metadata for client components (no MDX component). */
export type BlogMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category?: string;
  tags?: string[];
};
