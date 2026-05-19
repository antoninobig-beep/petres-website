import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/easing";

/**
 * StickyCTA — mobile only. Appare dopo 600px di scroll.
 * Stile editoriale coerente coi CTA hero: bordo cream + swipe fill ocra on tap.
 */
const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // L'hero è alta 260vh: dopo ~2.6 viewport heights siamo fuori.
    // Mostriamo lo StickyCTA solo dopo che l'utente ha superato l'hero,
    // così non copre le CTAs della hero.
    const onScroll = () => {
      const threshold = window.innerHeight * 2.4;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE.outSoft }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pt-3"
          style={{
            background: "hsl(var(--background))",
            borderTop: "1px solid hsl(var(--on-dark) / 0.16)",
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          }}
        >
          <a
            href="#consulenza"
            aria-label="Prenota la tua consulenza Petres"
            className="block w-full"
          >
            <Button
              variant="hero"
              className="w-full text-[12px] tracking-[0.16em] uppercase font-medium py-3.5 h-auto min-h-[48px]"
            >
              Prenota ora
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </Button>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
