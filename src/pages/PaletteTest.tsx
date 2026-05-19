import { ArrowUpRight } from "lucide-react";
import logoDark from "@/assets/logo-petres-dark.png";
import logoLight from "@/assets/logo-petres-light.png";

/**
 * Pagina di test palette — confronto visivo tra varianti.
 * Apri http://localhost:8080/palette per visualizzare.
 *
 * Ogni variante è un MINI HERO con: logo, eyebrow, headline, paragrafo, CTA.
 * I 7 colori della palette ufficiale Petres vengono ricombinati come bg/text/accent.
 */

interface Variant {
  id: string;
  name: string;
  description: string;
  bg: string;
  text: string;
  textSoft: string;
  accent: string;
  logoVariant: "dark" | "light";
  ctaTextOnAccent: string;
}

const PETRES = {
  cream: "#F6F1EB",
  beige: "#E6D7C8",
  rose: "#CEA6A1",
  ocra: "#C6A06B",
  mocha: "#9C8476",
  cacao: "#6A5044",
  espresso: "#2B1E1A",
};

const variants: Variant[] = [
  {
    id: "current",
    name: "01 · Corrente (Cacao + Cream + Ocra)",
    description: "Versione attuale del sito. Caramel scuro come bg principale, testo cream, accent ocra/oro.",
    bg: PETRES.cacao,
    text: PETRES.cream,
    textSoft: PETRES.cream + "cc", // 80% alpha
    accent: PETRES.ocra,
    logoVariant: "light",
    ctaTextOnAccent: PETRES.espresso,
  },
  {
    id: "light-editorial",
    name: "02 · Light Editorial (Cream + Espresso + Ocra)",
    description: "Invertito: cream chiaro come bg, testo espresso scuro, accent ocra. Aria editoriale brillante, magazine.",
    bg: PETRES.cream,
    text: PETRES.espresso,
    textSoft: PETRES.espresso + "b3", // 70%
    accent: PETRES.ocra,
    logoVariant: "dark",
    ctaTextOnAccent: PETRES.espresso,
  },
  {
    id: "mocha-soft",
    name: "03 · Mocha Mid (Mocha + Cream + Ocra)",
    description: "Tonalità intermedia: bg mocha nocciola caldo, testo cream, accent ocra. Tonality meno cinematica, più conviviale.",
    bg: PETRES.mocha,
    text: PETRES.cream,
    textSoft: PETRES.cream + "cc",
    accent: PETRES.ocra,
    logoVariant: "light",
    ctaTextOnAccent: PETRES.espresso,
  },
  {
    id: "espresso-luxury",
    name: "04 · Espresso Luxury (Espresso + Cream + Rosa)",
    description: "Drammatica: bg espresso quasi nero, testo cream, accent rosa cipria. Massima cinematica, lusso fine art.",
    bg: PETRES.espresso,
    text: PETRES.cream,
    textSoft: PETRES.cream + "b3",
    accent: PETRES.rose,
    logoVariant: "light",
    ctaTextOnAccent: PETRES.espresso,
  },
  {
    id: "cream-rose",
    name: "05 · Light Femminile (Cream + Espresso + Rosa)",
    description: "Light + accent rosa cipria invece di ocra. Più morbida, femminile, atmosfera boudoir editoriale.",
    bg: PETRES.cream,
    text: PETRES.espresso,
    textSoft: PETRES.espresso + "b3",
    accent: PETRES.rose,
    logoVariant: "dark",
    ctaTextOnAccent: PETRES.espresso,
  },
];

const MiniHero = ({ variant }: { variant: Variant }) => (
  <div
    className="relative w-full overflow-hidden"
    style={{
      background: variant.bg,
      color: variant.text,
      minHeight: "70vh",
      padding: "5rem 2rem",
    }}
  >
    <div className="max-w-[1280px] mx-auto flex flex-col gap-12 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-center">
      {/* Left: text content */}
      <div>
        <span
          style={{
            color: variant.textSoft,
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: 32,
            display: "block",
          }}
        >
          Estetica avanzata · Montoro
        </span>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            fontSize: "clamp(48px, 6vw, 88px)",
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
            margin: 0,
            color: variant.text,
          }}
        >
          Valorizza
          <br />
          la tua bellezza
          <br />
          naturale.
        </h1>

        <p
          style={{
            color: variant.textSoft,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.55,
            maxWidth: 480,
            marginTop: 24,
            marginBottom: 32,
          }}
        >
          Da Petres ogni percorso parte da te. Il <em>Metodo SYNERGIES</em>{" "}
          individua il trattamento più adatto.
        </p>

        {/* CTA + accent dot */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            className="group inline-flex items-center gap-3 px-7 py-4 transition-all duration-[450ms]"
            style={{
              background: "transparent",
              color: variant.text,
              border: `1.5px solid ${variant.text}`,
              borderRadius: 4,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              zIndex: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = variant.accent;
              e.currentTarget.style.borderColor = variant.accent;
              e.currentTarget.style.color = variant.ctaTextOnAccent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = variant.text;
              e.currentTarget.style.color = variant.text;
            }}
          >
            Prenota la tua consulenza
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </button>

          <span
            style={{
              color: variant.accent,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              borderBottom: `1px solid ${variant.accent}`,
              paddingBottom: 4,
            }}
          >
            Scrivici su WhatsApp
          </span>
        </div>
      </div>

      {/* Right: logo */}
      <div className="flex justify-center lg:justify-end">
        <img
          src={variant.logoVariant === "light" ? logoLight : logoDark}
          alt="Petres"
          style={{
            height: "min(28vh, 280px)",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  </div>
);

const PaletteTest = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Header sticky con info */}
      <div
        className="sticky top-0 z-50 px-6 py-4 border-b"
        style={{
          background: "#0a0a0a",
          borderColor: "#1a1a1a",
        }}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.04em",
            }}
          >
            Petres — Palette Test
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#888",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Scroll per confronto · 5 varianti
          </span>
        </div>
      </div>

      {/* 7 swatches della palette ufficiale */}
      <div className="px-6 py-6" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1280px] mx-auto">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#888",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              display: "block",
              marginBottom: 16,
            }}
          >
            Palette ufficiale Petres (7 colori)
          </span>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(PETRES).map(([name, hex]) => (
              <div
                key={name}
                style={{
                  background: hex,
                  color:
                    name === "cream" || name === "beige" || name === "rose"
                      ? "#000"
                      : "#fff",
                  padding: "12px 16px",
                  fontSize: 12,
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  borderRadius: 4,
                  flex: "1 1 auto",
                  minWidth: 130,
                }}
              >
                <div style={{ textTransform: "uppercase" }}>{name}</div>
                <div style={{ opacity: 0.7, fontSize: 11 }}>{hex}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Varianti */}
      {variants.map((v) => (
        <div key={v.id}>
          {/* Label */}
          <div
            className="px-6 py-6"
            style={{ background: "#0a0a0a", color: "#fff" }}
          >
            <div className="max-w-[1280px] mx-auto">
              <h2
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  fontWeight: 600,
                  margin: 0,
                  letterSpacing: "-0.005em",
                }}
              >
                {v.name}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#888",
                  marginTop: 6,
                  maxWidth: 800,
                }}
              >
                {v.description}
              </p>
              <div
                className="flex gap-2 mt-3 flex-wrap"
                style={{ fontFamily: "var(--font-body)", fontSize: 11 }}
              >
                <span
                  style={{
                    padding: "4px 10px",
                    border: "1px solid #333",
                    borderRadius: 999,
                    color: "#aaa",
                  }}
                >
                  bg: {v.bg}
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    border: "1px solid #333",
                    borderRadius: 999,
                    color: "#aaa",
                  }}
                >
                  text: {v.text}
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    border: "1px solid #333",
                    borderRadius: 999,
                    color: "#aaa",
                  }}
                >
                  accent: {v.accent}
                </span>
              </div>
            </div>
          </div>
          {/* Mini hero */}
          <MiniHero variant={v} />
        </div>
      ))}

      <div
        className="px-6 py-12 text-center"
        style={{ background: "#0a0a0a", color: "#888", fontSize: 13 }}
      >
        Scegli quella che preferisci e dimmi l'ID (01 / 02 / 03 / 04 / 05) per
        applicarla globalmente.
      </div>
    </div>
  );
};

export default PaletteTest;
