/**
 * Easing tokens centralizzati per coerenza animazioni Petres.
 * Tutte le curve usano la convenzione cubic-bezier 4-args di Framer Motion.
 *
 * Linee guida di utilizzo:
 *  - REVEAL (entry, scroll-in, mount): easeOutExpo → drammatica ma morbida
 *  - HOVER, MICRO-INTERAZIONI (entry+exit): easeInOut → simmetrica naturale
 *  - CTA emphasis (bottoni primari, scale): easeOutBack → micro-bounce subtle
 *  - HANDOFF (cross-fade tra sezioni / scroll-driven): easeOutSoft → meno aggressivo
 *  - SCROLL automatico Lenis: easeOutCubic
 *  - SPRING fisico (drag, swipe, value spring): SPRING_SOFT
 */

export const EASE = {
  /** Entry/reveal — exponential out, lenta morbida. Default ever-style. */
  outExpo: [0.22, 1, 0.36, 1] as const,
  /** Hover/micro-interazioni in & out — simmetrica naturale. */
  inOut: [0.4, 0, 0.2, 1] as const,
  /** Soft handoff — più dolce dell'expo, ottima per cross-fade. */
  outSoft: [0.16, 1, 0.3, 1] as const,
  /** Bounce subtle per CTA "appear" (overshoot leggero). */
  outBack: [0.34, 1.56, 0.64, 1] as const,
  /** Stop dolce per scroll/timeline lunghi. */
  outCubic: [0.33, 1, 0.68, 1] as const,
  /** Entry rapida ma morbida (in-out leggero). */
  inOutCirc: [0.85, 0, 0.15, 1] as const,
} as const;

/**
 * Spring physics tokens per Framer Motion `transition={SPRING.soft}`.
 */
export const SPRING = {
  soft: {
    type: "spring" as const,
    stiffness: 110,
    damping: 18,
    mass: 1,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 240,
    damping: 22,
    mass: 0.8,
  },
  gentle: {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    mass: 1.2,
  },
} as const;

/** Tailwind-compatible cubic-bezier strings (utile per className/style inline). */
export const EASE_CSS = {
  outExpo: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  outSoft: "cubic-bezier(0.16, 1, 0.3, 1)",
  outBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  outCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
} as const;

/** Durate standard (ms) per coerenza. */
export const DURATION = {
  micro: 200,    // hover, focus
  short: 350,    // small UI shifts
  base: 600,    // standard reveal
  long: 1000,   // headline reveal
  xlong: 1400,  // hero compose, big mask
} as const;
