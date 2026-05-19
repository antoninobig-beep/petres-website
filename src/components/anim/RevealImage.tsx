import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * RevealImage — clip-path mask reveal su scroll-in.
 * L'immagine appare con un mask che si apre dall'alto verso il basso (o lato a lato),
 * mentre l'immagine stessa parte leggermente scalata e si normalizza.
 */

const easeEver = [0.22, 1, 0.36, 1] as const;

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Direzione dell'apertura del mask */
  direction?: "top" | "bottom" | "left" | "right";
  duration?: number;
  delay?: number;
  /** Anima al mount invece che on-scroll (per immagini above the fold) */
  immediate?: boolean;
}

const RevealImage = ({
  children,
  className,
  style,
  direction = "bottom",
  duration = 1.4,
  delay = 0,
  immediate = false,
}: RevealImageProps) => {
  const clipMap = {
    top: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)",
    },
    bottom: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0 0 0 0)",
    },
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0)",
    },
  };

  const wrapperAnim = immediate
    ? {
        initial: { clipPath: clipMap[direction].hidden },
        animate: { clipPath: clipMap[direction].visible },
      }
    : {
        initial: { clipPath: clipMap[direction].hidden },
        whileInView: { clipPath: clipMap[direction].visible },
        viewport: { once: true, amount: 0.25 },
      };

  const innerAnim = immediate
    ? {
        initial: { scale: 1.15 },
        animate: { scale: 1 },
      }
    : {
        initial: { scale: 1.15 },
        whileInView: { scale: 1 },
        viewport: { once: true, amount: 0.25 },
      };

  return (
    <motion.div
      className={className}
      style={{ overflow: "hidden", ...style }}
      {...wrapperAnim}
      transition={{ duration, delay, ease: easeEver }}
    >
      <motion.div
        {...innerAnim}
        transition={{ duration: duration * 1.2, delay, ease: easeEver }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default RevealImage;
