import { useState, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "sun" | "sea" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  sun: "gradient-sun text-accent-foreground shadow-glow hover:shadow-lift",
  sea: "gradient-sea text-primary-foreground shadow-soft hover:shadow-lift",
  ghost: "glass text-foreground hover:bg-card",
  outline: "border border-border bg-card/60 text-foreground hover:border-primary",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function RippleButton({
  variant = "sun",
  size = "md",
  className,
  children,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    onClick?.(event);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={cn(
        "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold",
        "transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden
          className="ripple-dot pointer-events-none absolute -z-10 h-24 w-24 rounded-full bg-card/50"
          style={{ left: ripple.x - 48, top: ripple.y - 48 }}
        />
      ))}
      {children}
    </button>
  );
}
