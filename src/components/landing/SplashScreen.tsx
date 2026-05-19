import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Splash ever-style: wordmark grande al centro su fondo caramel.
 * Niente glow, niente sottotitolo decorativo. Solo: marchio → fade out.
 */
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const out = setTimeout(() => setVisible(false), 1800);
    const done = setTimeout(onComplete, 2600);
    return () => {
      clearTimeout(out);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "hsl(var(--background))" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease }}
          >
            <Logo variant="light" height={140} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
