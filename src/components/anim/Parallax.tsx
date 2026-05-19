import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * Parallax — wrapper che fa traslare il figlio mentre l'elemento scorre nel viewport.
 * Replica il pattern hero di ever.co.id (h1 con translateY scroll-linked).
 *
 * `amount` = quanti px (positivi = il figlio sale più lentamente, negativi = scende).
 */

interface ParallaxProps {
  children: ReactNode;
  amount?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Parallax = ({ children, amount = 80, className, style }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
