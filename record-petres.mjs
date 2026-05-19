import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: "/tmp", size: { width: 1280, height: 800 } },
});
const page = await ctx.newPage();

await page.goto("http://localhost:8080/", { waitUntil: "networkidle" });
// Wait for splash to clear (1.8s splash + 0.8s fade)
await page.waitForTimeout(3500);

// Smooth scroll through the page in steps, giving Lenis + reveals time to play
const total = await page.evaluate(() => document.body.scrollHeight);
const step = 500;
const steps = Math.ceil(total / step);
for (let i = 0; i < steps; i++) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "smooth" }), i * step);
  await page.waitForTimeout(900); // give Lenis inertia + reveal to play
}

// scroll back to top to show smooth back motion
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
await page.waitForTimeout(2500);

await page.close();
await ctx.close();
await browser.close();

console.log("video saved in /tmp (look for *.webm)");
