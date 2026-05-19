import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, PhoneCall, Sparkles, CalendarCheck, ChevronDown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  { num: "01", title: "Invia la richiesta", desc: "Compila il form o scrivici su WhatsApp.", icon: Send },
  { num: "02", title: "Ti ricontattiamo", desc: "Confermiamo il tuo appuntamento.", icon: PhoneCall },
  { num: "03", title: "Iniziamo da SYNERGIES", desc: "Valutiamo insieme il percorso migliore.", icon: Sparkles },
  { num: "04", title: "Prenota la tua consulenza", desc: "Inizia il tuo percorso personalizzato.", icon: CalendarCheck, isCTA: true },
];

const SArrowRight = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4, ease }}
    className="hidden md:flex items-center justify-center"
  >
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="text-white/30">
      <motion.path
        d="M4 20 C20 20, 25 4, 40 4 S60 20, 76 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease }}
      />
      <motion.polygon
        points="76,20 68,16 68,24"
        fill="currentColor"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.8, duration: 0.3, ease }}
      />
    </svg>
  </motion.div>
);

const SArrowLeft = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4, ease }}
    className="hidden md:flex items-center justify-center"
  >
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="text-white/30">
      <motion.path
        d="M4 20 C20 20, 25 36, 40 36 S60 20, 76 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease }}
      />
      <motion.polygon
        points="76,20 68,16 68,24"
        fill="currentColor"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.8, duration: 0.3, ease }}
      />
    </svg>
  </motion.div>
);

const MobileArrow = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4, ease }}
    className="flex md:hidden justify-center py-3"
  >
    <ChevronDown className="w-5 h-5 text-white/30" />
  </motion.div>
);

const StepCard = ({ s, i, baseDelay }: { s: typeof steps[0]; i: number; baseDelay: number }) => {
  const d = baseDelay + i * 0.25;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: d, duration: 0.6, ease }}
      className="text-center"
    >
      <motion.div
        className="relative mx-auto w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4"
        style={{ boxShadow: '0 0 18px 4px hsl(var(--brand-accent) / 0.25), 0 0 40px 8px hsl(var(--brand-accent) / 0.1)' }}
        initial={{ scale: 0, rotate: -30 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: d + 0.15, duration: 0.5, ease, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)", boxShadow: '0 0 24px 6px hsl(var(--brand-accent) / 0.35), 0 0 50px 12px hsl(var(--brand-accent) / 0.15)' }}
      >
        <s.icon className="w-5 h-5 text-brand-accent" strokeWidth={1.5} />
        <motion.span
          className="absolute -top-2 -right-2 text-[10px] font-medium text-brand-accent bg-background border border-white/15 rounded-full w-6 h-6 flex items-center justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: d + 0.35, duration: 0.3, type: "spring", stiffness: 300 }}
        >
          {s.num}
        </motion.span>
      </motion.div>
      <motion.h3
        className="text-white mb-2 text-[15px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: d + 0.3, duration: 0.4, ease }}
      >
        {s.title}
      </motion.h3>
      <motion.p
        className="text-white/50 text-[13px] max-w-[180px] mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: d + 0.4, duration: 0.4, ease }}
      >
        {s.desc}
      </motion.p>
      {s.isCTA && (
        <motion.a
          href="#consulenza"
          className="inline-block mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: d + 0.5, duration: 0.4, ease }}
        >
          <Button variant="hero" size="lg">Prenota ora</Button>
        </motion.a>
      )}
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const arrowDelays = [0.4, 0.9, 1.4];
  return (
    <section className="section-padding bg-background">
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-xl mx-auto text-center mb-20"
        >
          <h2 className="text-white">Prenotare è <span className="relative inline-block">SEMPLICE<motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6, ease }} className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-brand-accent rounded-full origin-left" /><motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.6, ease }} className="absolute left-0 right-0 -bottom-3 h-[1.5px] bg-brand-accent/50 rounded-full origin-left" /></span></h2>
        </motion.div>

        {/* Desktop S-shaped */}
        <div className="hidden md:grid md:grid-cols-7 items-center gap-y-4 mb-16">
          {steps.map((s, i) => (
            <React.Fragment key={s.title}>
              <StepCard s={s} i={i} baseDelay={0.2} />
              {i < steps.length - 1 && (i % 2 === 0 ? <SArrowRight delay={arrowDelays[i]} /> : <SArrowLeft delay={arrowDelays[i]} />)}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="flex flex-col md:hidden mb-16">
          {steps.map((s, i) => (
            <div key={s.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                className="text-center"
              >
                <div className="relative mx-auto w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4" style={{ boxShadow: '0 0 18px 4px hsl(var(--brand-accent) / 0.25), 0 0 40px 8px hsl(var(--brand-accent) / 0.1)' }}>
                  <s.icon className="w-5 h-5 text-brand-accent" strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 text-[10px] font-medium text-brand-accent bg-background border border-white/15 rounded-full w-6 h-6 flex items-center justify-center">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-white mb-2 text-[15px]">{s.title}</h3>
                <p className="text-white/50 text-[13px]">{s.desc}</p>
                {s.isCTA && (
                  <a href="#consulenza" className="inline-block mt-4">
                    <Button variant="hero" size="lg">Prenota ora</Button>
                  </a>
                )}
              </motion.div>
              {i < steps.length - 1 && <MobileArrow delay={0.2 + i * 0.25 + 0.5} />}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease }}
          className="flex flex-wrap justify-center gap-8 text-[12px] tracking-[0.06em] text-white/40 uppercase"
        >
          <span>Su appuntamento</span>
          <span>Senza impegno</span>
          <span>Approccio personalizzato</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
