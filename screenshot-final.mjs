import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

await page.goto("http://localhost:8080/", { waitUntil: "networkidle" });
// wait for splash + fonts
await page.waitForTimeout(3500);

await page.screenshot({ path: "/tmp/petres-hero.png", fullPage: false });
console.log("saved hero");

// full page
await page.screenshot({ path: "/tmp/petres-full.png", fullPage: true });
console.log("saved full");

await browser.close();
