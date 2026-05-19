import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
});
const page = await ctx.newPage();

await page.goto("https://www.ever.co.id", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

// 1) hero only (above the fold)
await page.screenshot({ path: "/tmp/ever-hero.png", fullPage: false });
console.log("saved /tmp/ever-hero.png");

// 2) full page (scrolled)
await page.screenshot({ path: "/tmp/ever-full.png", fullPage: true });
console.log("saved /tmp/ever-full.png");

// 3) computed design tokens
const tokens = await page.evaluate(() => {
  const body = document.body;
  const cs = getComputedStyle(body);
  const h1 = document.querySelector("h1");
  const h1cs = h1 ? getComputedStyle(h1) : null;
  return {
    bodyFontFamily: cs.fontFamily,
    bodyColor: cs.color,
    bodyBackground: cs.backgroundColor,
    h1FontFamily: h1cs?.fontFamily,
    h1FontWeight: h1cs?.fontWeight,
    h1FontSize: h1cs?.fontSize,
    h1Color: h1cs?.color,
    h1Text: h1?.textContent?.trim().slice(0, 200),
  };
});
console.log(JSON.stringify(tokens, null, 2));

await browser.close();
