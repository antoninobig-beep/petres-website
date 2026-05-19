import logoDarkPng from "@/assets/logo-petres-dark.png";
import logoLightPng from "@/assets/logo-petres-light.png";
import logoDarkSvg from "@/assets/logo-petres.svg";
import logoLightSvg from "@/assets/logo-petres-light.svg";

/**
 * Logo Petres riusabile.
 * Default: SVG (vettoriale, crisp a qualunque size).
 * `format="png"` per fallback PNG (con sfondo trasparente, già pre-processato).
 */
interface LogoProps {
  variant?: "dark" | "light";
  format?: "svg" | "png";
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

const Logo = ({
  variant = "dark",
  format = "svg",
  height = 32,
  className,
  style,
  ariaLabel = "Petres",
}: LogoProps) => {
  const src =
    format === "svg"
      ? variant === "light"
        ? logoLightSvg
        : logoDarkSvg
      : variant === "light"
        ? logoLightPng
        : logoDarkPng;

  return (
    <img
      src={src}
      alt={ariaLabel}
      className={className}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        width: "auto",
        objectFit: "contain",
        display: "block",
        ...style,
      }}
      draggable={false}
    />
  );
};

export default Logo;
