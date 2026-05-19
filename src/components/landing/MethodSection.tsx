import { motion } from "framer-motion";
import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import RevealText from "@/components/anim/RevealText";

const easeEver = [0.22, 1, 0.36, 1] as const;

/**
 * MethodSection — snellita.
 * Solo: titolo "SYNERGIES" + claim + before/after slider.
 * Rimosse le 3 cards (Analisi / Personalizzazione / Sinergia) e il bottone CTA.
 * Padding ridotto per accorciare la sezione.
 */
const MethodSection = () => {
  return (
    <section
      id="metodo-synergies"
      className="bg-background-soft scroll-mt-20 py-16 md:py-28 px-6 md:px-10"
    >
      <div className="container-content">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: easeEver }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: easeEver }}
              className="text-small text-on-dark-soft tracking-[0.18em] mb-6 block"
            >
              Il metodo
            </motion.span>

            <RevealText
              as="h2"
              className="text-on-dark mb-6"
              stagger={0.08}
              duration={1.2}
              mode="line"
            >
              SYNERGIES
            </RevealText>

            <p className="text-on-dark-soft text-[16px] md:text-[19px] max-w-xl leading-[1.6] md:leading-[1.55] font-body">
              Il Metodo SYNERGIES parte da un ascolto vero. Prima di proporti
              qualunque trattamento valutiamo la tua pelle, il tuo corpo,
              i tuoi obiettivi e il tuo stile di vita.
            </p>
            <p className="text-on-dark-soft text-[16px] md:text-[19px] max-w-xl leading-[1.6] md:leading-[1.55] font-body mt-4 md:mt-5">
              Poi costruiamo insieme un percorso su misura — fatto di
              tecnologie d'avanguardia, mani esperte e tempi tuoi.
              Nessun protocollo preconfezionato, nessuna promessa generica:
              solo ciò che funziona davvero <em>per te</em>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: easeEver }}
            className="overflow-hidden rounded-sm"
          >
            <BeforeAfterSlider className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
