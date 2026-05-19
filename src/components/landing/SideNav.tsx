import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sideNavItems = [
  { id: "chi-siamo", label: "Chi siamo" },
  { id: "metodo-synergies", label: "SYNERGIES" },
  { id: "servizi", label: "Servizi" },
  { id: "perche-petres", label: "Perché noi" },
  { id: "recensioni", label: "Recensioni" },
  { id: "faq", label: "FAQ" },
  { id: "consulenza", label: "Contatti" },
];

const SideNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = sideNavItems.map((i) => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-0.5"
        >
          {sideNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-right px-3 py-1.5 text-[11px] tracking-[0.04em] font-medium transition-all duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground/40 hover:text-muted-foreground"
                }`}
                title={item.label}
              >
                {item.label}
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default SideNav;