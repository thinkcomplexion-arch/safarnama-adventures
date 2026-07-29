import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { destinations } from "@/data/site";

export function Destinations() {
  return (
    <section id="destinations" className="gradient-soft relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          eyebrow="Featured Destinations"
          title="Places that stay with you"
          highlight="long after"
          description="Handpicked corners of the map where the light, the food and the people all line up."
        />

        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-4">
          {destinations.map((destination, index) => (
            <motion.a
              key={destination.id}
              href="#tours"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl shadow-soft transition-shadow duration-500 hover:shadow-lift ${destination.span}`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500 group-hover:from-foreground/90" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-bold text-primary-foreground">{destination.name}</h3>
                <p className="mt-1 max-w-xs text-sm text-primary-foreground/80">
                  {destination.blurb}
                </p>
                <span className="mt-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-card/90 px-4 py-2 text-xs font-semibold text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
