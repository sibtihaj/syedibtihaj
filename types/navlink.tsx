export type Navlink = {
  href: string;
  label: string;
};

export type SocialLink = Navlink & {
  /** Short handle shown next to the label, e.g. "sibtihaj". */
  handle: string;
  external: boolean;
};
