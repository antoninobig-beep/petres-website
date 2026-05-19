import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

const scripts = [];
page.on("response", (r) => {
  const url = r.url();
  if (url.match(/\.(js|mjs)/) && !url.includes("data:")) scripts.push(url);
});

await page.goto("https://www.ever.co.id", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(4000);

const detection = await page.evaluate(() => {
  const w = window;
  const tells = {
    lenis: typeof w.Lenis !== "undefined" || !!document.querySelector("[data-lenis-prevent], .lenis"),
    gsap: typeof w.gsap !== "undefined",
    scrollTrigger: typeof w.ScrollTrigger !== "undefined",
    locomotive: typeof w.LocomotiveScroll !== "undefined" || !!document.querySelector("[data-scroll]"),
    framerMotion: typeof w.Motion !== "undefined",
    smoothScrollbar: typeof w.Scrollbar !== "undefined",
    barba: typeof w.barba !== "undefined",
    swup: typeof w.Swup !== "undefined",
    splitType: typeof w.SplitType !== "undefined",
  };

  const html = document.documentElement;
  const body = document.body;
  const classes = Array.from(html.classList).concat(Array.from(body.classList));

  const observed = document.querySelectorAll("[data-aos], [data-reveal], [data-scroll], [data-animation], [data-anim], [data-ix]");
  const transformed = [];
  document.querySelectorAll("*").forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.willChange && cs.willChange !== "auto" && transformed.length < 8) {
      transformed.push({
        tag: el.tagName,
        cls: (el.className?.toString() || "").slice(0, 60),
        willChange: cs.willChange,
        transform: cs.transform.slice(0, 60),
        transition: cs.transition.slice(0, 80),
      });
    }
  });

  // count elements with opacity 0 or transform != none initially
  let hiddenCount = 0;
  document.querySelectorAll("section *").forEach((el) => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.05 || (cs.transform !== "none" && cs.transform.includes("matrix"))) hiddenCount++;
  });

  return {
    tells,
    htmlClasses: classes,
    observedAttrs: observed.length,
    transformedSample: transformed,
    hiddenInitially: hiddenCount,
  };
});

console.log("LIB DETECTION:");
console.log(JSON.stringify(detection, null, 2));

console.log("\nSCRIPTS LOADED (filtered):");
const interesting = scripts.filter((u) =>
  /lenis|gsap|scroll|locomotive|barba|swup|motion|animate|smooth|split/i.test(u)
);
interesting.forEach((u) => console.log("  •", u));

const revealLog = await page.evaluate(() => {
  return new Promise((resolve) => {
    const log = [];
    const startTime = performance.now();
    const targets = document.querySelectorAll("h1, h2, h3, img, picture, video, section > div");
    targets.forEach((t) => {
      t.__initial = {
        opacity: getComputedStyle(t).opacity,
        transform: getComputedStyle(t).transform.slice(0, 80),
        clip: getComputedStyle(t).clipPath?.slice(0, 80),
      };
    });

    let y = 0;
    const max = document.body.scrollHeight;
    const stepPx = 250;
    const tick = () => {
      window.scrollTo(0, y);
      targets.forEach((t, i) => {
        const cs = getComputedStyle(t);
        const init = t.__initial;
        if (init && (
          cs.opacity !== init.opacity ||
          cs.transform.slice(0, 80) !== init.transform ||
          (cs.clipPath?.slice(0, 80) !== init.clip)
        )) {
          log.push({
            t: Math.round(performance.now() - startTime),
            y,
            i,
            tag: t.tagName,
            cls: (t.className?.toString() || "").slice(0, 40),
            from: init,
            to: {
              opacity: cs.opacity,
              transform: cs.transform.slice(0, 80),
              clip: cs.clipPath?.slice(0, 80),
            },
          });
          t.__initial = {
            opacity: cs.opacity,
            transform: cs.transform.slice(0, 80),
            clip: cs.clipPath?.slice(0, 80),
          };
        }
      });
      y += stepPx;
      if (y < max) setTimeout(tick, 150);
      else resolve(log.slice(0, 30));
    };
    tick();
  });
});

console.log("\nREVEAL LOG (first 30 transitions):");
console.log(JSON.stringify(revealLog, null, 2));

await browser.close();
