import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1, // smaller files
});
const page = await ctx.newPage();

await page.goto("http://localhost:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);

// Take 5 viewport-height screenshots scrolling down
const totalHeight = await page.evaluate(() => document.body.scrollHeight);
const vh = 900;
const shots = Math.min(6, Math.ceil(totalHeight / vh));

for (let i = 0; i < shots; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * vh);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/petres-s${i}.png`, fullPage: false });
  console.log(`saved s${i} (scroll=${i * vh})`);
}

await browser.close();
