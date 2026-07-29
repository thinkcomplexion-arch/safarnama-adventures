import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="gradient-soft relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeader eyebrow="Testimonials" title="Stories from" highlight="our travellers" />

        <div className="relative mt-14 min-h-[320px] sm:min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: direction * -60, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-[2rem] p-8 shadow-soft sm:p-12"
            >
              <Quote className="text-accent/60 h-10 w-10" />
              <p className="mt-6 text-lg leading-relaxed font-medium text-balance sm:text-2xl">
                {current.quote}
              </p>

              <footer className="mt-8 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                <span className="gradient-sea font-display grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-bold text-primary-foreground">
                  {current.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{current.name}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {current.trip}
                  </span>
                </span>
                <span className="col-span-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={cn(
                        "h-4 w-4",
                        starIndex < current.rating
                          ? "fill-sunshine text-sunshine"
                          : "text-muted-foreground/40",
                      )}
                    />
                  ))}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(index - 1)}
            className="glass grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 hover:-translate-x-0.5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((testimonial, dotIndex) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                onClick={() => go(dotIndex)}
                className={cn(
                  "h-2 rounded-full transition-all duration-400",
                  dotIndex === index ? "gradient-sun w-8" : "w-2 bg-border hover:bg-muted-foreground",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(index + 1)}
            className="glass grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 hover:translate-x-0.5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
