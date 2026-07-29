import { cn } from "@/lib/utils";

const tones = {
  Easy: "bg-emerald/15 text-emerald",
  Moderate: "bg-sunshine/25 text-accent-foreground",
  Challenging: "bg-coral/15 text-coral",
  neutral: "bg-secondary text-secondary-foreground",
} as const;

interface BadgeProps {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
