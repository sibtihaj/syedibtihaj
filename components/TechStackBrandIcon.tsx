import type { SimpleIcon } from "simple-icons";

type TechStackBrandIconProps = {
  icon: SimpleIcon;
  className?: string;
  /** Paint the glyph in the brand's own colour instead of the inherited text colour. */
  brandColor?: boolean;
};

/**
 * Renders a Simple Icons glyph at 24x24. Decorative: the label sits next to it.
 */
export function TechStackBrandIcon({ icon, className, brandColor = false }: TechStackBrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      style={brandColor ? { color: `#${icon.hex}` } : undefined}
    >
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}
