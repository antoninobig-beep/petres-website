interface SectionTransitionProps {
  /** Token CSS del colore sopra (es. "--background") */
  from: string;
  /** Token CSS del colore sotto (es. "--background-soft") */
  to: string;
  /** Altezza in vh (default 18 — abbastanza lungo per essere percepito morbido) */
  heightVh?: number;
  /** Aria-label per screen reader */
  label?: string;
}

/**
 * SectionTransition — bridge gradient morbido tra due sezioni di colore diverso.
 * Solo un linear-gradient verticale `from` → `to`, alto e gentile.
 * Niente dim, blur, vignette o ornamenti.
 *
 * Se `from === to` (stesse sezioni stesso colore), non renderizza nulla
 * (nessuna transition serve).
 */
const SectionTransition = ({
  from,
  to,
  heightVh = 18,
  label = "Transizione tra sezioni",
}: SectionTransitionProps) => {
  if (from === to) return null;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="relative w-full"
      style={{
        height: `${heightVh}vh`,
        minHeight: 120,
        background: `linear-gradient(to bottom, hsl(var(${from})) 0%, hsl(var(${to})) 100%)`,
      }}
      aria-label={label}
    />
  );
};

export default SectionTransition;
