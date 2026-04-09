/**
 * One-off: log into Grafana (admin/admin), skip forced password change, capture dashboard.
 * Run: node scripts/capture-grafana-dashboard.mjs
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const DASHBOARD_URL =
  "https://grafana-production-53f7.up.railway.app/d/booking-api/go-booking-api?from=now-15m&to=now&timezone=browser";
const OUT = join(root, "public/images/grafana.png");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
});

try {
  await page.goto(DASHBOARD_URL, { waitUntil: "domcontentloaded", timeout: 90000 });

  if (page.url().includes("/login")) {
    await page.getByTestId("data-testid Username input field").fill("admin");
    await page.getByTestId("data-testid Password input field").fill("admin");
    await page.getByTestId("data-testid Login button").click();
    await page.waitForTimeout(4000);
  }

  const skip = page.getByRole("button", { name: "Skip" });
  const skipVisible = await skip.isVisible().catch(() => false);
  if (skipVisible) {
    await skip.click();
    await page.waitForTimeout(2000);
  }

  await page.goto(DASHBOARD_URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(6000);

  await page.screenshot({ path: OUT, fullPage: true });
  console.log("Wrote", OUT);
} finally {
  await browser.close();
}
