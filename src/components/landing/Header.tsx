import { ArrowUpRight, Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { EASE, EASE_CSS } from "@/lib/easing";

const navItems = [
  { label: "Chi siamo", href: "#chi-siamo" },
  { label: "Metodo", href: "#metodo-synergies" },
  { label: "Servizi", href: "#servizi" },
  { label: "FAQ", href: "#faq" },
  { label: "Contatti", href: "#consulenza" },
];

/**
 * Header — versione editoriale con backdrop dinamico.
 *
 * Sopra l'hero (scrollY < 80): header trasparente, no backdrop.
 * Sopra qualunque altra sezione (scrollY ≥ 80): si attiva un backdrop
 * blur + tint scuro (gradient verso transparent in basso) che garantisce
 * leggibilità del testo cream a prescindere da cosa c'è dietro (foto chiare,
 * sezioni mocha, elementi cream del form, eccetera).
 */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // imposta lo stato iniziale (in caso di hard refresh con scroll già attivo)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop dinamico: fade-in dopo l'hero per garantire contrasto del testo cream */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: scrolled ? 1 : 0,
          background:
            "linear-gradient(to bottom, hsl(var(--background) / 0.78) 0%, hsl(var(--background) / 0.4) 65%, hsl(var(--background) / 0) 100%)",
          backdropFilter: "blur(14px) saturate(110%)",
          WebkitBackdropFilter: "blur(14px) saturate(110%)",
          transition: `opacity 450ms ${EASE_CSS.outSoft}`,
          height: "110%", // pochissimo oltre il padding, solo per coprire la zona del pill CTA
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-12 pt-4 md:pt-4 pb-2 md:pb-0">
        <div className="flex items-center justify-between">
          {/* Sinistra — Logo + Instagram */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE.outSoft }}
            className="flex items-center gap-4 z-10"
          >
            <a href="#" aria-label="Petres — home" className="block">
              <Logo variant="light" height="clamp(30px, 8vw, 36px)" />
            </a>
            <a
              href="https://www.instagram.com/petresesteticaebenessere/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Petres su Instagram"
              className="text-on-dark-faint hover:text-on-dark transition-colors"
              style={{ transitionDuration: "300ms", transitionTimingFunction: EASE_CSS.inOut }}
            >
              <Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </a>
          </motion.div>

          {/* Centro — nav inline editoriale (no pill, no glass) */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE.outSoft }}
            className="hidden lg:flex items-center gap-9"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-[12px] tracking-[0.14em] uppercase text-on-dark-soft hover:text-on-dark font-body font-medium group"
                style={{
                  transition: `color 300ms ${EASE_CSS.inOut}`,
                }}
              >
                {item.label}
                {/* Underline che si rivela da sinistra */}
                <span
                  className="absolute -bottom-1.5 left-0 h-px bg-[hsl(var(--on-dark))] w-0 group-hover:w-full"
                  style={{
                    transition: `width 350ms ${EASE_CSS.inOut}`,
                  }}
                  aria-hidden="true"
                />
              </a>
            ))}
          </motion.nav>

          {/* Destra — CTA editoriale (Button hero compatto, no pill) */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE.outSoft }}
            className="hidden lg:flex items-center"
          >
            <a href="#consulenza" aria-label="Prenota ora la tua consulenza">
              <Button
                variant="hero"
                className="text-[10.5px] tracking-[0.18em] uppercase font-medium px-4 py-2.5 h-auto"
              >
                Prenota ora
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
              </Button>
            </a>
          </motion.div>

          {/* Mobile hamburger — niente glass, bordo semplice */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden z-10 w-11 h-11 flex items-center justify-center rounded-full text-on-dark"
            style={{
              background: "hsl(var(--on-dark) / 0.08)",
              border: "1px solid hsl(var(--on-dark) / 0.22)",
              transition: `background 300ms ${EASE_CSS.inOut}`,
            }}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-[18px] h-[18px]" aria-hidden="true" strokeWidth={1.75} />
            ) : (
              <Menu className="w-[18px] h-[18px]" aria-hidden="true" strokeWidth={1.75} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE.outSoft }}
            className="lg:hidden absolute top-0 left-0 right-0 pt-20 pb-10 px-5"
            style={{
              background: "hsl(var(--background))",
              borderBottom: "1px solid hsl(var(--on-dark) / 0.12)",
            }}
          >
            <nav className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: EASE.outSoft }}
                  onClick={() => setMobileOpen(false)}
                  className="text-[13px] tracking-[0.14em] uppercase text-on-dark hover:text-on-dark font-body font-medium py-[18px] border-b"
                  style={{
                    borderColor: "hsl(var(--on-dark) / 0.18)",
                    transition: `color 300ms ${EASE_CSS.inOut}`,
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#consulenza"
                onClick={() => setMobileOpen(false)}
                aria-label="Prenota ora la tua consulenza"
                className="mt-8 self-stretch"
              >
                <Button
                  variant="hero"
                  className="w-full text-[12px] tracking-[0.16em] uppercase font-medium px-6 py-4 h-auto"
                >
                  Prenota ora
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
