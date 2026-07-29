import { motion } from "motion/react";
import { ArrowUpRight, CalendarRange, Clock, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge-pill";
import { RippleButton } from "@/components/ui/ripple-button";
import { tours } from "@/data/site";

export function Tours() {
  return (
    <section id="tours" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          eyebrow="Upcoming Tours"
          title="Departures we're"
          highlight="excited about"
          description="Small groups, verified guides and itineraries with room to breathe. Dates release every month."
        />

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <motion.article
              key={tour.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-80" />
                <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
                  <Badge tone={tour.difficulty}>{tour.difficulty}</Badge>
                  <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-foreground">
                    {tour.price}
                  </span>
                </div>
                <p className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {tour.location}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold">{tour.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tour.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    {tour.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarRange className="h-4 w-4 text-accent" />
                    {tour.season}
                  </span>
                </div>

                <RippleButton variant="sea" size="sm" className="mt-6 w-full">
                  View Details <ArrowUpRight className="h-4 w-4" />
                </RippleButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
