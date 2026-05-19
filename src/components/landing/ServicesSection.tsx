import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import RevealText from "@/components/anim/RevealText";
import serviceViso from "@/assets/service-viso.jpg";
import serviceCorpo from "@/assets/service-corpo.jpg";
import serviceConsulenza from "@/assets/service-consulenza.jpg";
import servicePercorsi from "@/assets/service-percorsi.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  { title: "Estetica avanzata viso", desc: "Luminosità, qualità e aspetto della pelle.", image: serviceViso },
  { title: "Trattamenti corpo", desc: "Armonia, benessere e tonicità.", image: serviceCorpo },
  { title: "Consulenza personalizzata", desc: "Il primo passo per capire cosa è adatto a te.", image: serviceConsulenza },
  { title: "Percorsi su misura", desc: "Programmi costruiti sui tuoi obiettivi.", image: servicePercorsi },
];

// Tutte le cards stessa altezza + stesso aspect ratio (4:5 portrait)
const CARD_ASPECT = "aspect-[4/5]";

const ServicesSection = () => {
  return (
    <section id="servizi" className="py-16 md:py-28 scroll-mt-20 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-6 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
          >
            <RevealText as="h2" className="text-on-dark" stagger={0.08} duration={1.2}>
              Servizi
            </RevealText>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-on-dark-soft text-[15px] md:text-[14px] leading-relaxed max-w-sm md:max-w-xs font-body italic"
          >
            Ogni servizio è parte di un percorso pensato sulle tue esigenze reali, per valorizzare la tua bellezza naturale.
          </motion.p>
        </div>

        {/* Cards — horizontal scroll on mobile, 4-col on desktop */}
        <div
          className="flex gap-3 md:gap-4 overflow-x-auto md:overflow-visible md:grid md:grid-cols-4 scrollbar-hide pb-2 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory [scroll-padding-left:1.5rem] md:[scroll-padding-left:0]"
        >
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#consulenza"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease }}
              className={`group relative flex-shrink-0 w-[78vw] max-w-[320px] md:max-w-none md:w-auto overflow-hidden rounded-xl md:rounded-2xl cursor-pointer snap-start ${CARD_ASPECT}`}
            >
              {/* Image — object-cover + object-center per allineare visivamente
                 anche se le foto originali hanno proporzioni leggermente diverse */}
              <img
                src={s.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-500" />

              {/* Arrow icon — top right, stile minimal editoriale (no glass) */}
              <div
                className="absolute top-3 right-3 md:top-4 md:right-4 w-11 h-11 md:w-9 md:h-9 flex items-center justify-center transition-all duration-300 group-hover:bg-[hsl(var(--on-dark))]"
                style={{
                  background: "hsl(var(--on-dark) / 0.18)",
                  border: "1px solid hsl(var(--on-dark) / 0.4)",
                  borderRadius: 999,
                }}
              >
                <ArrowUpRight
                  className="w-[18px] h-[18px] md:w-4 md:h-4 text-on-dark transition-all duration-300 group-hover:text-[hsl(var(--foreground))] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>

              {/* Title — bottom left */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-white text-[17px] md:text-[18px] font-heading font-medium leading-tight transition-transform duration-300 group-hover:-translate-y-0.5">
                  {s.title}
                </h3>
                <p className="text-white/70 md:text-white/50 text-[12px] font-body mt-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  {s.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
