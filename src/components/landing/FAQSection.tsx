import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import RevealText from "@/components/anim/RevealText";

const ease = [0.16, 1, 0.3, 1] as const;

const faqs = [
  { q: "Come capisco il trattamento giusto per me?", a: "Da PETRES parti da una consulenza personalizzata con il Metodo SYNERGIES. Valutiamo le tue esigenze e ti orientiamo verso la soluzione più adatta." },
  { q: "Devo sapere già cosa voglio fare?", a: "No. La consulenza serve proprio a questo: aiutarti a capire il percorso migliore." },
  { q: "La consulenza è personalizzata?", a: "Sì. È il cuore dell'approccio PETRES. Il Metodo SYNERGIES costruisce percorsi su misura." },
  { q: "Posso contattarvi su WhatsApp?", a: "Certo, puoi scriverci per ricevere informazioni o richiedere un appuntamento." },
  { q: "Dove si trova PETRES?", a: "PETRES si trova in Via Vetriera 54, 83025 Montoro (AV). Siamo aperti dal martedì al sabato, dalle 09:00 alle 20:00." },
  { q: "I percorsi sono standard?", a: "No. Ogni percorso è costruito sulle esigenze della singola cliente." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-background-soft scroll-mt-20">
      <div className="container-content max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 md:mb-14"
        >
          <RevealText as="h2" className="text-foreground" stagger={0.07} duration={1.1}>
            Domande frequenti
          </RevealText>
        </motion.div>

        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease }}
            >
              <AccordionItem value={`faq-${i}`} className="border-b border-border border-t-0 border-l-0 border-r-0">
                <AccordionTrigger className="text-left text-[16px] md:text-[15px] font-medium text-foreground hover:no-underline hover:text-foreground/80 py-5 md:py-6 min-h-[56px] transition-colors duration-200 gap-4">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[15px] md:text-[14px] leading-relaxed pb-6 pr-2">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
