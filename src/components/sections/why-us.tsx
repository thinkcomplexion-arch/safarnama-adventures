import { motion } from "motion/react";
import {
  BadgeCheck,
  HeartHandshake,
  Map,
  Mountain,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const reasons = [
  {
    icon: Map,
    title: "Carefully Planned Trips",
    body: "Every route is walked by our team before a single seat opens.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    body: "Transparent costs, no hidden add-ons, no surprise upgrades.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Travel",
    body: "Vetted stays, first-aid trained leads and 24/7 on-trip support.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Guides",
    body: "Local experts who grew up on the trails they take you through.",
  },
  {
    icon: Sparkles,
    title: "Unique Experiences",
    body: "Sunrise ridges and village kitchens instead of tourist queues.",
  },
  {
    icon: HeartHandshake,
    title: "Community Travel",
    body: "Small groups of 12–16 who leave as friends, not strangers.",
  },
  {
    icon: Mountain,
    title: "Memorable Adventures",
    body: "Trips built around the stories you'll retell for years.",
  },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <span
        aria-hidden
        className="animate-float-slow bg-teal/20 absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
      />
      <span
        aria-hidden
        className="animate-float-med bg-sunshine/25 absolute -right-20 bottom-0 h-80 w-80 rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          eyebrow="Why Safarnama"
          title="Travel that's handled,"
          highlight="not hurried"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 34, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="glass group rounded-3xl p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift"
            >
              <span className="gradient-sea grid h-12 w-12 place-items-center rounded-2xl shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <reason.icon className="h-6 w-6 text-primary-foreground" />
              </span>
              <h3 className="mt-5 text-base font-bold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="gradient-sun animate-gradient flex flex-col justify-between rounded-3xl p-6 shadow-glow"
          >
            <p className="font-display text-2xl leading-tight font-bold text-accent-foreground">
              Ready when you are.
            </p>
            <p className="mt-3 text-sm text-accent-foreground/85">
              Tell us how you like to travel and we'll match you to the right group.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
