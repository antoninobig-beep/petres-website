import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Hover transitions con cubic-bezier `inOut` (0.4, 0, 0.2, 1) — simmetrica
  // naturale in entrata e uscita. Durata 400ms ottimale per micro-interazioni.
  // Lift sottile -1.5px + arrow shift + accent glow su variant hero.
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-medium transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[400ms] [&_svg]:ease-[cubic-bezier(0.4,0,0.2,1)] hover:[&_svg]:translate-x-0.5 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85 hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5",
        outline: "border border-[hsl(var(--on-dark)/0.4)] bg-transparent text-[hsl(var(--on-dark))] hover:bg-[hsl(var(--on-dark)/0.06)] hover:border-[hsl(var(--on-dark)/0.7)] hover:-translate-y-0.5",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost: "text-foreground hover:bg-muted",
        link: "text-foreground underline-offset-4 hover:underline",
        // CTA principale editoriale: trasparente con bordo cream, sharp corners.
        // Hover: ocra entra da sinistra (swipe fill via ::before) + testo si scurisce
        // + bordo diventa ocra. Niente più pill cream classica.
        hero:
          "relative overflow-hidden z-0 rounded-sm border-[1.5px] border-[hsl(var(--on-dark))] bg-transparent text-[hsl(var(--on-dark))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--brand-accent))] before:content-[''] before:absolute before:inset-0 before:bg-[hsl(var(--brand-accent))] before:[transform:translateX(-101%)] before:transition-transform before:duration-[550ms] before:ease-[cubic-bezier(0.4,0,0.2,1)] before:z-[-1] hover:before:[transform:translateX(0)] active:before:[transform:translateX(0)] active:text-[hsl(var(--foreground))]",
        // Outline ghost: solo testo + arrow + underline ocra subtle (per CTA secondari)
        heroOutline:
          "bg-transparent text-[hsl(var(--on-dark))] rounded-sm border-b border-[hsl(var(--on-dark)/0.4)] rounded-none hover:border-[hsl(var(--brand-accent))] hover:text-[hsl(var(--brand-accent))] !px-0 !pb-2 !pt-0 !h-auto",
      },
      size: {
        default: "h-10 px-5 py-2 text-[14px]",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-11 px-7 text-[14px]",
        xl: "h-12 px-8 text-[14px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
