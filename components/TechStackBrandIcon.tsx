import type { SimpleIcon } from "simple-icons";

type TechStackBrandIconProps = {
  icon: SimpleIcon;
  className?: string;
};

/**
 * Renders a Simple Icons glyph at 24×24 with brand color on the SVG.
 */
export function TechStackBrandIcon({ icon, className }: TechStackBrandIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      style={{ color: `#${icon.hex}` }}
    >
      <title>{icon.title}</title>
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}
