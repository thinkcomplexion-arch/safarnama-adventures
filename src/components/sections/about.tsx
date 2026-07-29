import { motion } from "motion/react";
import { Compass, Heart, Users } from "lucide-react";
import aboutImage from "@/assets/about.jpg";
import { Reveal } from "@/components/ui/reveal";
import { RippleButton } from "@/components/ui/ripple-button";

const pillars = [
  { icon: Compass, title: "Our Mission", body: "Make meaningful travel simple, safe and shared." },
  { icon: Users, title: "Our Community", body: "A growing circle of travellers who keep coming back." },
  { icon: Heart, title: "Our Philosophy", body: "Slow mornings, honest food, and space to feel present." },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="group overflow-hidden rounded-[2.5rem] shadow-lift">
            <img
              src={aboutImage}
              alt="Travellers sharing stories on a mountain viewpoint"
              loading="lazy"
              width={1280}
              height={1024}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          </div>
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong absolute -right-2 -bottom-6 rounded-3xl px-6 py-5 shadow-soft sm:right-6"
          >
            <p className="font-display text-3xl font-bold text-gradient-sea">9 yrs</p>
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              of shared journeys
            </p>
          </motion.div>
        </motion.div>

        <div>
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary-foreground uppercase">
              About Safarnama
            </span>
            <h2 className="mt-5 text-3xl leading-[1.1] font-bold text-balance sm:text-4xl lg:text-5xl">
              A travel diary written by <span className="text-gradient">everyone who joins</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Safarnama began with six friends, one borrowed van and a route nobody had planned
              properly. What stayed with us wasn't the destination — it was the people. Today we
              design trips the same way: gather good company, choose somewhere beautiful, and leave
              enough room for the unexpected.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.1}>
                <div className="h-full rounded-3xl border border-border bg-card p-5 shadow-soft transition-transform duration-500 hover:-translate-y-1.5">
                  <pillar.icon className="h-6 w-6 text-accent" />
                  <h3 className="mt-4 text-sm font-bold">{pillar.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}>
            <RippleButton size="lg" className="mt-10">
              Connect With Us
            </RippleButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
