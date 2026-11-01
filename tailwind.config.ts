import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  safelist: [
    "font-heading",
    "prose-headings:font-heading",
    "prose-headings:font-normal",
  ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "ui-serif", "Georgia", "serif"],
        heading: ["var(--font-heading)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        // Site palette: warm paper, navy ink, one cobalt accent.
        // Hex values live here so opacity modifiers (e.g. text-cobalt/60) work;
        // app/globals.css reads them back with theme().
        paper: {
          DEFAULT: "#f6f5f1",
          deep: "#ecebe5",
        },
        ink: {
          DEFAULT: "#0d1b3e",
          body: "#3b4458",
          muted: "#5e6679",
          faint: "#a9adb8",
        },
        cobalt: {
          DEFAULT: "#1e4fd6",
          deep: "#0b2a6f",
          bright: "#2f6fe0",
          wash: "#e9eef8",
        },
        rule: "#dcdbd4",

        // shadcn tokens, mapped onto the palette above.
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        measure: "40rem",
      },
      transitionTimingFunction: {
        ink: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), addVariablesForColors],
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// Colours that are already CSS variables are skipped so they cannot point at themselves.
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors)
      .filter(([, val]) => typeof val === "string" && !val.startsWith("var("))
      .map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
