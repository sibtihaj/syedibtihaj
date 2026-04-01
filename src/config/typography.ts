/**
 * Heading typeface switch. Both Manrope (Google) and Plein (local) are loaded in
 * `src/app/layout.tsx` — change this value to flip the site without removing fonts.
 *
 * - `"manrope"` — current trial (geometric, readable display)
 * - `"plein"`   — original local variable heading font
 */
export type HeadingFontId = "manrope" | "plein";

export const HEADING_FONT: HeadingFontId = "plein";
