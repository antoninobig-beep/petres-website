import { useState, useRef, useCallback } from "react";
import beforeImg from "@/assets/before-acne-aligned.jpg";
import afterImg from "@/assets/after-acne-aligned.jpg";

const BeforeAfterSlider = ({ className = "" }: { className?: string }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  }, [updatePosition]);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  }, [updatePosition]);

  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      // NOTA: niente `data-lenis-prevent` qui — bloccava il wheel di Lenis sopra
      // lo slider e creava un bounce su/giù (native scroll vs Lenis catch-up).
      // touchAction: pan-y → su mobile lo scroll verticale passa attraverso
      // lo slider, ma il drag orizzontale resta catturato per la comparison.
      className={`relative select-none cursor-col-resize overflow-hidden aspect-[3/4] ${className}`}
      style={{
        borderRadius: 4,
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        touchAction: "pan-y",
      }}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      role="slider"
      aria-label="Confronto prima e dopo trattamento"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {/* After image (full) */}
      <img
        src={afterImg}
        alt="Dopo il trattamento"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Prima del trattamento"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/90 z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle — cream solido, no glass. 44x44 mobile per tap target, 40x40 desktop. */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-10 md:h-10 rounded-full flex items-center justify-center gap-1"
          style={{
            background: "hsl(var(--on-dark))",
            boxShadow:
              "0 4px 14px -2px hsl(0 0% 0% / 0.25), 0 0 0 4px hsl(var(--on-dark) / 0.18)",
          }}
        >
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" className="opacity-50">
            <path d="M5 1L1 6L5 11" stroke="#2F2623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" className="opacity-50">
            <path d="M1 1L5 6L1 11" stroke="#2F2623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels editoriali — no glass, eyebrow uppercase tracking wide */}
      <span
        className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-body font-medium text-on-dark z-20 px-3 py-1.5"
        style={{
          background: "hsl(var(--background) / 0.7)",
          border: "1px solid hsl(var(--on-dark) / 0.2)",
          borderRadius: 2,
        }}
      >
        Prima
      </span>
      <span
        className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase font-body font-medium text-on-dark z-20 px-3 py-1.5"
        style={{
          background: "hsl(var(--background) / 0.7)",
          border: "1px solid hsl(var(--on-dark) / 0.2)",
          borderRadius: 2,
        }}
      >
        Dopo
      </span>
    </div>
  );
};

export default BeforeAfterSlider;
