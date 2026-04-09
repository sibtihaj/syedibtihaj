/** Custom production domain (Vercel still exposes *.vercel.app as `VERCEL_URL`). */
const PRODUCTION_ORIGIN = "https://syedibtihaj.com";

/**
 * Canonical site origin for metadata, sitemap, and robots.
 *
 * Priority:
 * 1. `NEXT_PUBLIC_SITE_URL`: override for any environment
 * 2. Vercel production (`VERCEL_ENV=production`) → `https://syedibtihaj.com`
 * 3. `VERCEL_URL`: preview deployments and dev URL (e.g. syedibtihaj.vercel.app)
 * 4. Local dev → http://localhost:3000
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_ORIGIN;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const withProtocol = vercel.startsWith("http") ? vercel : `https://${vercel}`;
    return withProtocol.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
