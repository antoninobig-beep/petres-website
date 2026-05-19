import { motion } from "framer-motion";
import { useState } from "react";
import whyUsHero from "@/assets/why-us-hero.jpg";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/easing";

const easeEver = EASE.outExpo;

// Niente più icone glass né numeri — solo i label, stile editoriale pulito
const values = [
  { label: "Qualità" },
  { label: "Professionalità" },
  { label: "Efficacia" },
  { label: "Esperienza" },
];

const interests = [
  "Viso",
  "Corpo",
  "Consulenza personalizzata",
  "Non so, vorrei un consiglio",
];

// Mobile: 16px font-size obbligatorio per evitare auto-zoom iOS al focus.
// Da md+ torniamo a 15px per coerenza editoriale col resto.
const inputClass =
  "w-full h-12 px-0 bg-transparent border-b text-on-dark text-[16px] md:text-[15px] focus:outline-none focus:border-[hsl(var(--brand-accent))] transition-all duration-300 placeholder:text-on-dark-faint";

/**
 * WhyUsSection — accorpata con ContactForm.
 * Sopra: hero "perché scegliere petres" (foto fullscreen + logo + valori).
 * Sotto, stessa sezione + stesso bg coerente: form prenotazione integrato.
 * Niente più ContactFormSection separato.
 */
const WhyUsSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [interesse, setInteresse] = useState("");
  const [messaggio, setMessaggio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `Ciao, vorrei prenotare una consulenza.\n\nNome: ${nome.trim()}\nTelefono: ${telefono.trim()}`;
    if (email.trim()) text += `\nEmail: ${email.trim()}`;
    if (interesse) text += `\nInteresse: ${interesse}`;
    if (messaggio.trim()) text += `\nMessaggio: ${messaggio.trim()}`;
    const url = `https://wa.me/393406924537?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      id="perche-petres"
      className="relative scroll-mt-20 bg-background overflow-hidden"
    >
      {/* === BLOCCO 1: hero "perché scegliere petres" === */}
      <div className="relative min-h-[72vh] md:min-h-[88vh] flex flex-col overflow-hidden">
        {/* Foto fullscreen + overlay scuri */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={whyUsHero}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 18%, transparent 70%, hsl(var(--background)) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, hsl(var(--background)) 100%)",
            }}
          />
        </div>

        {/* Contenuto centrato */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: easeEver }}
            className="text-on-dark-soft font-body text-[11px] tracking-[0.22em] block mb-8 uppercase"
          >
            Perché scegliere
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: easeEver }}
            className="mb-10 flex justify-center"
          >
            {/* Logo: 120 su mobile, 180 da md+ — height={180} a tutta larghezza era troppo su iPhone */}
            <span className="block md:hidden">
              <Logo variant="light" height={120} />
            </span>
            <span className="hidden md:block">
              <Logo variant="light" height={180} />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.0, delay: 0.3, ease: easeEver }}
            className="text-on-dark-soft text-[15px] md:text-[17px] leading-relaxed max-w-xl mx-auto font-body"
          >
            Da Petres ogni dettaglio è pensato per offrirti un'esperienza di
            estetica avanzata autentica, personalizzata e orientata al
            risultato.
          </motion.p>
        </div>

        {/* Valori — stile editoriale: numeri serif + label, divider sottili */}
        <div className="relative z-10 w-full pb-14 md:pb-16 px-6">
          <div className="max-w-[920px] mx-auto">
            <div
              className="grid grid-cols-2 sm:grid-cols-4"
              style={{
                borderTop: "1px solid hsl(var(--on-dark) / 0.22)",
                borderBottom: "1px solid hsl(var(--on-dark) / 0.22)",
              }}
            >
              {values.map((v, i) => {
                // Mobile (2 cols, < sm): right divider su pari (0,2); bottom divider su prima riga (0,1).
                // sm+ (4 cols): right divider su 0,1,2; nessun bottom divider.
                const showRightMobile = i % 2 === 0; // 0,2
                const showBottomMobile = i < 2; // 0,1
                const showRightDesktop = i < values.length - 1; // 0,1,2
                const borderColorClass = "border-[hsl(var(--on-dark)/0.18)]";
                // Mobile classes: bordi via Tailwind, sm: reset bottom + set right su tutti tranne ultimo
                const rightMobileClass = showRightMobile ? "border-r" : "border-r-0";
                const bottomMobileClass = showBottomMobile ? "border-b" : "border-b-0";
                const rightDesktopClass = showRightDesktop ? "sm:border-r" : "sm:border-r-0";
                const bottomDesktopClass = "sm:border-b-0";
                return (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.12,
                      duration: 0.9,
                      ease: easeEver,
                    }}
                    className={`flex items-center justify-center py-5 sm:py-6 px-3 sm:px-4 md:px-6 ${borderColorClass} ${rightMobileClass} ${bottomMobileClass} ${rightDesktopClass} ${bottomDesktopClass}`}
                  >
                    <span className="text-on-dark text-[12px] sm:text-[13px] md:text-[15px] font-body font-medium tracking-[0.06em] uppercase text-center leading-tight">
                      {v.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* === BLOCCO 2: form prenotazione — stessa sezione, stesso bg === */}
      <div
        id="consulenza"
        className="relative z-10 px-6 md:px-10 py-16 md:py-28 scroll-mt-20"
      >
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: easeEver }}
            className="text-center mb-12 md:mb-14"
          >
            <h2
              className="text-on-dark mb-4"
              style={{ marginBottom: "1rem", lineHeight: 1.05 }}
            >
              Prenota la tua consulenza
            </h2>
            <p className="text-on-dark-soft text-[15px] md:text-[16px]">
              Ti ricontatteremo via WhatsApp per fissare il tuo appuntamento.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeEver }}
              className="py-16 text-center"
            >
              <h3 className="text-on-dark mb-3">Grazie</h3>
              <p className="text-on-dark-soft text-[15px]">
                Ti ricontatteremo il prima possibile.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              onSubmit={handleSubmit}
              className="space-y-6"
              style={{ color: "hsl(var(--on-dark))" }}
            >
              {[
                {
                  id: "wu-nome",
                  label: "Nome *",
                  type: "text",
                  value: nome,
                  set: setNome,
                  required: true,
                  autoComplete: "name",
                  maxLength: 100,
                },
                {
                  id: "wu-tel",
                  label: "Telefono *",
                  type: "tel",
                  value: telefono,
                  set: setTelefono,
                  required: true,
                  autoComplete: "tel",
                  maxLength: 20,
                },
                {
                  id: "wu-email",
                  label: "Email",
                  type: "email",
                  value: email,
                  set: setEmail,
                  required: false,
                  autoComplete: "email",
                  maxLength: 255,
                },
              ].map((f) => (
                <motion.div
                  key={f.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: easeEver },
                    },
                  }}
                >
                  <label
                    htmlFor={f.id}
                    className="block text-[11px] tracking-[0.14em] uppercase text-on-dark-soft mb-2"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    required={f.required}
                    maxLength={f.maxLength}
                    autoComplete={f.autoComplete}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    className={inputClass}
                    style={{
                      borderBottomColor: "hsl(var(--on-dark) / 0.28)",
                    }}
                  />
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: easeEver },
                  },
                }}
              >
                <label
                  htmlFor="wu-interesse"
                  className="block text-[11px] tracking-[0.14em] uppercase text-on-dark-soft mb-2"
                >
                  Interesse
                </label>
                <select
                  id="wu-interesse"
                  name="interesse"
                  value={interesse}
                  onChange={(e) => setInteresse(e.target.value)}
                  className={inputClass}
                  style={{
                    borderBottomColor: "hsl(var(--on-dark) / 0.28)",
                    color: interesse
                      ? "hsl(var(--on-dark))"
                      : "hsl(var(--on-dark) / 0.5)",
                  }}
                >
                  <option value="">Seleziona…</option>
                  {interests.map((i) => (
                    <option
                      key={i}
                      value={i}
                      style={{
                        background: "hsl(var(--background))",
                        color: "hsl(var(--on-dark))",
                      }}
                    >
                      {i}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: easeEver },
                  },
                }}
              >
                <label
                  htmlFor="wu-messaggio"
                  className="block text-[11px] tracking-[0.14em] uppercase text-on-dark-soft mb-2"
                >
                  Messaggio (opzionale)
                </label>
                <textarea
                  id="wu-messaggio"
                  name="messaggio"
                  maxLength={1000}
                  rows={3}
                  value={messaggio}
                  onChange={(e) => setMessaggio(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b text-on-dark text-[16px] md:text-[15px] focus:outline-none focus:border-[hsl(var(--brand-accent))] transition-all duration-300 resize-none"
                  style={{
                    borderBottomColor: "hsl(var(--on-dark) / 0.28)",
                  }}
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: easeEver },
                  },
                }}
                className="flex items-start gap-3 pt-3"
              >
                <input
                  type="checkbox"
                  required
                  id="wu-privacy"
                  className="mt-0.5 accent-[hsl(var(--brand-accent))] shrink-0 cursor-pointer"
                  style={{ width: 20, height: 20 }}
                />
                <label
                  htmlFor="wu-privacy"
                  className="text-[13px] md:text-[12px] text-on-dark-soft leading-relaxed cursor-pointer select-none"
                >
                  Acconsento al trattamento dei dati personali secondo la
                  Privacy Policy.
                </label>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: easeEver },
                  },
                }}
              >
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full mt-4 active:scale-[0.98] transition-transform duration-150"
                  style={{
                    background: "hsl(var(--on-dark))",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Prenota la tua consulenza
                </Button>
              </motion.div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
