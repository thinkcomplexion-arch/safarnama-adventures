import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { galleryFilters, galleryItems } from "@/data/site";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [active, setActive] = useState<(typeof galleryFilters)[number]>("All");

  const visible = galleryItems.filter((item) => active === "All" || item.category === active);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          eyebrow="Travel Gallery"
          title="Frames from"
          highlight="the road"
          description="Real moments sent in by travellers who came back with more than photos."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300",
                active === filter
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === filter ? (
                <motion.span
                  layoutId="gallery-pill"
                  className="gradient-sea absolute inset-0 -z-10 rounded-full shadow-soft"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.figure
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block break-inside-avoid overflow-hidden rounded-3xl shadow-soft"
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  loading="lazy"
                  className={cn(
                    "w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110",
                    item.tall ? "aspect-[4/5]" : "aspect-[4/3]",
                  )}
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/80 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="text-sm font-semibold text-primary-foreground">
                    {item.caption}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
