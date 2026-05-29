import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

/** window con riferimento Lenis esposto (il tipo globale di lenis è diverso, castiamo qui). */
type WindowWithLenis = { lenis?: Lenis };

/**
 * SmoothScroll — Lenis provider, ricostruisce il feel di ever.co.id.
 * Parametri tunati per inerzia lunga e dolce: lerp basso, duration medio-alto,
 * easing exp-out.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Se l'utente preferisce reduced-motion, non attiviamo lo smooth scroll
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.4, // più alto = più morbido/lento (default 1.2)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exp-out, ever-like
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: 0.08, // più basso = più inerzia
    });

    // Esponi globalmente per consumer (es. HeroSection auto-scroll)
    (window as unknown as WindowWithLenis).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as WindowWithLenis).lenis;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
