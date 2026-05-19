import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="section-padding bg-background"
    >
      <div className="container-content">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16 mb-12 md:mb-16">
          <div>
            <div className="mb-5"><Logo variant="light" height={64} /></div>
            <a href="https://www.instagram.com/petresesteticaebenessere/" target="_blank" rel="noopener noreferrer" className="inline-block text-[12px] tracking-[0.06em] uppercase transition-opacity duration-300 py-2 -my-2" style={{ color: 'hsla(37, 42%, 62%, 0.7)' }}>
              Instagram →
            </a>
          </div>

          <div className="space-y-3">
            <span className="text-[12px] uppercase tracking-[0.1em] block mb-5" style={{ color: 'hsla(36, 30%, 95%, 0.4)' }}>Contatti</span>
            <a href="https://maps.google.com/?q=Via+Vetriera+54+83025+Montoro+AV" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] hover:opacity-80 transition-opacity duration-300 py-1" style={{ color: 'hsla(36, 30%, 95%, 0.5)' }}>
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.2} /> Via Vetriera 54, Montoro (AV)
            </a>
            <a href="tel:+393406924537" className="flex items-center gap-3 text-[13px] hover:opacity-80 transition-opacity duration-300 py-1" style={{ color: 'hsla(36, 30%, 95%, 0.5)' }}>
              <Phone className="w-3.5 h-3.5" strokeWidth={1.2} /> 340 692 4537
            </a>
            <a href="https://wa.me/393406924537" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] hover:opacity-80 transition-opacity duration-300 py-1" style={{ color: 'hsla(36, 30%, 95%, 0.5)' }}>
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.2} /> WhatsApp
            </a>
            <a href="mailto:info@petres.it" className="flex items-center gap-3 text-[13px] hover:opacity-80 transition-opacity duration-300 py-1" style={{ color: 'hsla(36, 30%, 95%, 0.5)' }}>
              <Mail className="w-3.5 h-3.5" strokeWidth={1.2} /> info@petres.it
            </a>
          </div>

          <div>
            <span className="text-[12px] uppercase tracking-[0.1em] block mb-5" style={{ color: 'hsla(36, 30%, 95%, 0.4)' }}>Orari</span>
            <div className="text-[13px] space-y-1" style={{ color: 'hsla(36, 30%, 95%, 0.5)' }}>
              <p>Martedì – Sabato: 09 – 20</p>
              <p>Domenica e Lunedì: Chiuso</p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-3 text-[11px] tracking-[0.04em] text-center md:text-left" style={{ borderTop: '1px solid hsla(36, 30%, 95%, 0.1)', color: 'hsla(36, 30%, 95%, 0.3)' }}>
          <span>© {new Date().getFullYear()} PETRES Estetica e Benessere</span>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-70 transition-opacity duration-200 py-1">Privacy Policy</a>
            <a href="#" className="hover:opacity-70 transition-opacity duration-200 py-1">Cookie Policy</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
