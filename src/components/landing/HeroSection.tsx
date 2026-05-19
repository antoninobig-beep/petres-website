import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroModel from "@/assets/hero-model.png";
import Logo from "@/components/Logo";
import RevealText from "@/components/anim/RevealText";
import { Button } from "@/components/ui/button";

const easeEver = [0.22, 1, 0.36, 1] as const;

/**
 * HeroSection — opening choreography (NO auto-scroll).
 *
 * Sequence (~4.3s):
 *   0.0s  mount, logo inizia a comporsi (clip-path sweep, scale, blur)
 *   2.4s  logo COMPLETO (clip-path sweep finito)
 *   2.6s  overlay fade-in inizia (foto + testi)
 *   2.9s  h1 word-by-word reveal "valorizza la tua bellezza naturale"
 *   3.9s  paragrafo fade-in
 *   4.3s  CTA fade-in → tutto visibile, utente scrolla quando vuole
 *
 * L'auto-scroll precedente è stato rimosso: spingeva fuori dalla hero
 * prima che l'utente potesse leggerla, e bloccava lo scroll manuale.
 *
 * Le scritte hero sono TIMER-DRIVEN (immediate=true con delay), non scroll-driven.
 *
 * Scroll-driven solo:
 *  - foto: zoom-in lieve (1.06 → 1) + fade-out graduale (0.4 → 1 di progress)
 *    per handoff continuo verso ProblemSection
 *  - logo: timer-driven (overlayShown), NON scroll-driven
 */
const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // === Scroll-driven ===
  // Section è 125vh → sticky 100vh + 25vh di scroll "utile".
  // Zoom foto ridotto (1.06 → 1) per non far percepire la hero come bloccante.
  // endFade più ampio (0.4 → 1) così la transizione verso ProblemSection
  // copre l'intero scroll-out della hero, non solo l'ultimo lampo.
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const endFade = useTransform(scrollYProgress, [0.4, 1], [1, 0]);

  // === Timer-driven mount choreography ===
  const [overlayShown, setOverlayShown] = useState(false);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1) Mostra overlay (foto + testo) a 2.6s
    const tOverlay = setTimeout(() => setOverlayShown(true), reduce ? 0 : 2600);

    // 2) NIENTE auto-scroll: l'utente atterra in cima e scrolla quando vuole.
    //    L'auto-scroll precedente atterrava già fuori hero e impediva di
    //    apprezzare la choreography del logo. Rimosso.

    return () => {
      clearTimeout(tOverlay);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-background"
      style={{ height: "125vh" }}
      aria-label="Petres — introduzione"
    >
      <div
        className="sticky top-0 left-0 right-0 w-full overflow-hidden"
        style={{ height: "100vh", minHeight: 640 }}
      >
        {/* === Layer foto fullscreen === */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: endFade,
            scale: photoScale,
            transformOrigin: "center",
          }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={overlayShown ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.4, ease: easeEver }}
            className="absolute inset-0"
          >
            <img
              src={heroModel}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "saturate(0.92) contrast(1.03) brightness(0.78)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.5) 40%, hsl(var(--background) / 0.25) 70%, hsl(var(--background) / 0.4) 100%)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* === Bottom blend — fade clean verso ProblemSection ===
            Sempre presente (non scroll-driven): l'ultima fascia del viewport
            sticky sfuma nel colore di background, così la transizione alla
            sezione successiva risulta continua anche prima che endFade scatti. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] z-[15]"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background) / 0) 0%, hsl(var(--background) / 0.6) 55%, hsl(var(--background) / 1) 100%)",
          }}
          aria-hidden="true"
        />

        {/* === Layer logo (compose al mount + fade-out via timer, NON scroll) ===
            Una volta che overlayShown=true, il logo si nasconde definitivamente.
            Lo scroll back-to-top non lo riporta visibile. */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          animate={
            overlayShown
              ? { opacity: 0, scale: 0.85, y: -70 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 1.4, ease: easeEver }}
        >
          <LogoCompose />
        </motion.div>

        {/* === Layer overlay testi ===
            Desktop (md+): grid 2 colonne — H1 a sinistra, body+CTA a destra,
            colonna centrale vuota per non coprire il viso del modello.
            Mobile: stack ancorato al bottom così il viso resta visibile in alto. */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-end pb-24 sm:pb-28 md:pb-0 md:justify-center px-5 sm:px-6 md:px-10 lg:px-16 pointer-events-none"
          style={{ opacity: endFade }}
        >
          <div className="w-full md:grid md:grid-cols-12 md:gap-6 lg:gap-10 md:items-center">
            {/* H1 — sinistra su desktop, centrato in alto su mobile */}
            <motion.div
              className="pointer-events-auto md:col-span-5 lg:col-span-4 text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={overlayShown ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, ease: easeEver }}
            >
              <RevealText
                as="h1"
                immediate
                delay={0.3} /* parte 0.3s dopo l'overlay mostrato */
                stagger={0.07}
                duration={0.95}
                className="text-on-dark"
                style={{ marginBottom: 0 }}
              >
                {`Valorizza
la tua bellezza
naturale.`}
              </RevealText>
            </motion.div>

            {/* Spacer centrale — riservato al viso del modello (solo desktop) */}
            <div className="hidden md:block md:col-span-2 lg:col-span-4" aria-hidden="true" />

            {/* Body + CTAs — destra su desktop, sotto su mobile */}
            <div className="md:col-span-5 lg:col-span-4 mt-6 md:mt-0">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={
                  overlayShown ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                }
                transition={{ duration: 0.9, delay: 1.3, ease: easeEver }}
                className="pointer-events-auto text-[15px] leading-[1.55] md:text-body-lg text-on-dark-soft max-w-[560px] mx-auto md:mx-0 md:ml-auto md:text-right text-center px-1"
              >
                Da Petres ogni percorso parte da te. Il <em>Metodo SYNERGIES</em>{" "}
                individua il trattamento più adatto per valorizzare viso e
                corpo.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={
                  overlayShown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                }
                transition={{ duration: 0.9, delay: 1.7, ease: easeEver }}
                className="pointer-events-auto flex flex-col sm:flex-row gap-4 sm:gap-6 items-center md:justify-end justify-center mt-7 md:mt-8"
              >
                <a
                  href="#consulenza"
                  aria-label="Prenota la tua consulenza Petres"
                  className="w-full sm:w-auto flex justify-center"
                >
                  <Button variant="hero" size="lg" className="text-[12px] md:text-[13px] tracking-[0.08em] uppercase font-medium px-6 md:px-7 py-3.5 md:py-4 h-auto">
                    Prenota la tua consulenza
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </Button>
                </a>
                <a
                  href="https://wa.me/393406924537"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Scrivici su WhatsApp (si apre in nuova finestra)"
                  className="text-on-dark text-[11.5px] md:text-[12px] tracking-[0.14em] uppercase font-medium border-b pb-1.5 px-2 py-1 min-h-[44px] flex items-center transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[hsl(var(--brand-accent))] hover:border-[hsl(var(--brand-accent))]"
                  style={{ borderColor: "hsl(var(--on-dark) / 0.4)" }}
                >
                  Scrivici su WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * LogoCompose — animazione di scrittura velocizzata:
 * - wrapper fade-in + scale + blur clear: 1.4s
 * - clip-path mask sweep left→right: 2.2s (più rapido dei 3.5s precedenti)
 * - Logo grande (min 55vh / 480px)
 */
const LogoCompose = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.4, ease: easeEver }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 2.2, delay: 0.2, ease: easeEver }}
        style={{ willChange: "clip-path" }}
      >
        <Logo
          variant="light"
          format="svg"
          height="min(55vh, 55vw, 480px)"
          style={{ width: "auto" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
