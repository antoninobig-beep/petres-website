import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import resultsHero from "@/assets/results-hero.jpg";
import RevealText from "@/components/anim/RevealText";

const easeEver = [0.22, 1, 0.36, 1] as const;

// Step senza icone lucide AI-slop: numerazione serif minimale
const steps = [
  {
    title: "Corpo più armonioso",
    desc: "Linee più definite e proporzioni più equilibrate",
  },
  {
    title: "Pelle più compatta",
    desc: "Texture migliorata e maggiore tonicità",
  },
  {
    title: "Riduzione degli inestetismi",
    desc: "Intervento mirato su cellulite e zone critiche",
  },
  {
    title: "Più sicurezza in te stessa",
    desc: "Ti senti meglio ogni giorno, non solo allo specchio",
  },
];

const ProblemSection = () => {
  return (
    <section
      id="chi-siamo"
      className="relative scroll-mt-20 overflow-hidden bg-background"
    >
      {/* Foto di sezione.
          - Mobile: full-bleed con overlay scuro verticale per leggibilità step in foreground.
          - Desktop (lg+): solo metà sinistra con gradient orizzontale verso il bg. */}
      <motion.div
        className="absolute inset-0 lg:right-auto lg:w-1/2"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.4, ease: easeEver }}
      >
        <img
          src={resultsHero}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Overlay MOBILE — gradient verticale scuro per testo leggibile */}
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.78) 55%, hsl(var(--background) / 0.92) 100%)",
          }}
        />
        {/* Overlay DESKTOP — gradient orizzontale verso il bg (originale) */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, transparent 50%, hsl(var(--background)) 100%)",
          }}
        />
      </motion.div>

      {/* Bottom fade — fonde la foto laterale col background uniforme prima della
         transizione verso la sezione successiva. Risolve lo stacco visivo con
         MethodSection (background-soft). */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
        style={{
          height: 180,
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 80%, hsl(var(--background)) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container-content relative z-10 section-padding">
        <motion.div
          initial={{ opacity: 0, x: "12%" }}
          whileInView={{ opacity: 1, x: "0%" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: easeEver }}
          className="max-w-2xl mb-12 md:mb-16 lg:ml-auto lg:max-w-md"
        >
          <RevealText
            as="h2"
            className="text-on-dark mb-4"
            stagger={0.07}
            duration={1.1}
          >
            {`I risultati che inizierai
a vedere davvero`}
          </RevealText>
          <p className="text-on-dark-soft text-[15px] leading-relaxed">
            Non si tratta solo di estetica. Si tratta di sentirti di nuovo a tuo
            agio nel tuo corpo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Left spacer for image area su desktop (la foto è bg absolute a sx) */}
          <div className="hidden lg:block" />

          {/* Right - Step numerati editoriali (overlay sopra la foto su mobile) */}
          <ol
            className="flex flex-col"
            style={{ counterReset: "step" }}
            aria-label="Risultati che otterrai"
          >
            {steps.map((step, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: "8%" }}
                  whileInView={{ opacity: 1, x: "0%" }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.9,
                    ease: easeEver,
                  }}
                  className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-10 py-5 md:py-8"
                  style={{
                    borderTop:
                      i === 0
                        ? "1px solid hsl(var(--on-dark) / 0.18)"
                        : "none",
                    borderBottom: "1px solid hsl(var(--on-dark) / 0.18)",
                  }}
                >
                  {/* Numero serif, niente icone */}
                  <span
                    className="font-heading text-on-dark"
                    style={{
                      fontSize: "clamp(32px, 5vw, 44px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                      opacity: 0.55,
                    }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>

                  <div>
                    <h3
                      className="text-on-dark"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(21px, 3.2vw, 28px)",
                        fontWeight: 400,
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        marginBottom: 6,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-on-dark-soft text-[14px] md:text-[15px] leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, x: "12%" }}
          whileInView={{ opacity: 1, x: "0%" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3, duration: 1.0, ease: easeEver }}
          className="mt-10 md:mt-14 lg:ml-auto lg:max-w-md lg:w-full"
        >
          <a
            href="#consulenza"
            aria-label="Inizia il tuo percorso Petres"
            className="block w-full sm:inline-block sm:w-auto"
          >
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Voglio iniziare il mio percorso
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
