import { motion } from "framer-motion";
import { Star } from "lucide-react";
import RevealText from "@/components/anim/RevealText";

const easeEver = [0.22, 1, 0.36, 1] as const;

// Recensioni Google reali Petres. Tutte 5★, clienti veri. Niente foto profilo
// (gli avatar disponibili erano mismatchati per genere).
const reviews = [
  {
    name: "Nicola Genovese",
    text: "E ti sembra di sognare ad occhi aperti. In un'oasi, dove personale professionale, coccola il cliente e, alla fine, dispiace andar via. Ti senti in famiglia. Della gentilezza di Giulia e la dolcezza di Federica si rimane contagiati.",
  },
  {
    name: "Adelaide Caliano",
    text: "Valentina e Anna le titolari come tutto il personale sono gentili, ti accolgono con il sorriso, ti fanno sentire al centro della loro attenzione, ti coccolano con una tisana o un caffè. Sono bravissime e professionali nel lavoro.",
  },
  {
    name: "Giovanna De Giacomo",
    text: "Personale altamente qualificato, cordiale e attento a ogni tua esigenza.",
  },
  {
    name: "Martina Esposito",
    text: "Per il mio matrimonio ho scelto Petres e lo sceglierei altre mille volte. Trucco impeccabile, intatto fino a sera. Anna e Valentina super disponibili, hanno colto al volo ciò che desideravo.",
  },
  {
    name: "Federica Russo",
    text: "Centro molto curato e pulito, ottima ospitalità e professionalità. Sono cliente da diversi anni e sono sempre più soddisfatta dei risultati.",
  },
  {
    name: "Carmen D'Amato",
    text: "Atmosfera familiare ma altamente professionale. Mi sono sentita coccolata sin dal primo giorno, ogni trattamento è personalizzato sulle mie esigenze reali.",
  },
];

// Duplichiamo l'array per fare il marquee infinito senza salto visivo
const marqueeReviews = [...reviews, ...reviews];

const TrustSection = () => {
  return (
    <section
      id="recensioni"
      className="bg-background-soft scroll-mt-20 py-20 md:py-32 overflow-hidden"
    >
      <div className="container-content px-6 md:px-10 mb-10 md:mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: easeEver }}
        >
          <RevealText
            as="h2"
            className="text-on-dark text-center text-[34px] sm:text-[40px] md:text-[56px] leading-[1.05]"
            stagger={0.07}
            duration={1.1}
          >
            Dicono di noi
          </RevealText>
        </motion.div>
      </div>

      {/* === Marquee autoscroll === */}
      <div
        className="relative [--mask:linear-gradient(to_right,transparent_0,black_10%,black_90%,transparent_100%)] md:[--mask:linear-gradient(to_right,transparent_0,black_6%,black_94%,transparent_100%)]"
        style={{
          maskImage: "var(--mask)",
          WebkitMaskImage: "var(--mask)",
        }}
      >
        <motion.div
          className="flex gap-4 md:gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeReviews.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} review={r} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ReviewCard = ({
  review,
}: {
  review: { name: string; text: string };
}) => {
  return (
    <article
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] p-6 sm:p-7 md:p-8 flex flex-col min-h-[260px] md:min-h-[280px]"
      style={{
        background: "hsl(var(--on-dark) / 0.05)",
        border: "1px solid hsl(var(--on-dark) / 0.12)",
        borderRadius: 4,
      }}
      aria-label={`Recensione di ${review.name}`}
    >
      {/* Stelle in alto, senza avatar */}
      <div
        className="flex gap-0.5 mb-4 md:mb-5"
        aria-label="Valutazione 5 stelle su 5"
      >
        {Array.from({ length: 5 }).map((_, j) => (
          <Star
            key={j}
            className="w-4 h-4 md:w-3.5 md:h-3.5"
            style={{
              fill: "hsl(var(--brand-accent))",
              color: "hsl(var(--brand-accent))",
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="text-on-dark text-[14px] md:text-[15px] leading-relaxed flex-1 font-body">
        "{review.text}"
      </p>

      {/* Nome in fondo, stile editoriale */}
      <span
        className="text-on-dark-soft mt-5 md:mt-6 block"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        — {review.name}
      </span>
    </article>
  );
};

export default TrustSection;
