import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * RevealText — split parola-per-parola con stagger.
 * Replica il pattern SplitType + GSAP usato da ever.co.id.
 *
 * Su mount o quando entra in viewport, ogni parola fa fade+up con leggera blur.
 * Default: trigger on enter (whileInView).
 */

// Ease ever-style: exp-out, lento e morbido
const easeEver = [0.22, 1, 0.36, 1] as const;

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  /** Durata della singola parola */
  duration?: number;
  /** Ritardo iniziale prima del primo word */
  delay?: number;
  /** Stagger tra parole */
  stagger?: number;
  /** Animare al mount invece che on-scroll? Per l'hero serve true */
  immediate?: boolean;
  /** Animazione: 'word' (parola intera) | 'line' (riga intera) */
  mode?: "word" | "line";
}

const RevealText = ({
  children,
  as = "div",
  className,
  style,
  duration = 1.0,
  delay = 0,
  stagger = 0.06,
  immediate = false,
  mode = "word",
}: RevealTextProps) => {
  // Split: preserviamo i \n manuali come line breaks
  const lines = children.split("\n");

  const Component = motion[as] as (typeof motion)["div"];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: "0.5em",
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: easeEver },
    },
  };

  const animateProps = immediate
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.4 } };

  return (
    <Component
      className={className}
      style={style}
      variants={containerVariants}
      {...animateProps}
    >
      {lines.map((line, li) => (
        <span
          key={li}
          style={{
            display: "block",
            overflow: "hidden",
            // Padding extra per non tagliare descenders (g, y, p, q) e ascenders
            paddingBottom: "0.22em",
            paddingTop: "0.06em",
            marginBottom: "-0.22em",
            marginTop: "-0.06em",
          }}
        >
          {mode === "word" ? (
            line.split(" ").map((word, wi) => (
              <span
                key={`${li}-${wi}`}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  whiteSpace: "pre",
                  paddingBottom: "0.22em",
                  paddingTop: "0.06em",
                  marginBottom: "-0.22em",
                  marginTop: "-0.06em",
                }}
              >
                <motion.span
                  variants={itemVariants}
                  style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
                >
                  {word}
                  {wi < line.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))
          ) : (
            <motion.span
              variants={itemVariants}
              style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Component>
  );
};

export default RevealText;
