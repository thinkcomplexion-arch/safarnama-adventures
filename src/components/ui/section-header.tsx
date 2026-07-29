import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary-foreground uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl leading-[1.1] font-bold text-balance sm:text-4xl lg:text-5xl">
        {title} {highlight ? <span className="text-gradient">{highlight}</span> : null}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
