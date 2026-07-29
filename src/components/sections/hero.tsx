import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Cloud, Plane, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { RippleButton } from "@/components/ui/ripple-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { stats } from "@/data/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handle = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      setPointer({ x, y });
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <motion.img
        src={heroImage}
        alt="Sunrise over a mirror-still mountain lake with hot air balloons"
        width={1920}
        height={1200}
        style={{ y: imageY, x: pointer.x * -18 }}
        className="absolute inset-0 -z-30 h-[115%] w-[104%] object-cover"
      />
      <div className="gradient-hero animate-gradient absolute inset-0 -z-20 opacity-30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* floating decorative layers */}
      <motion.div
        aria-hidden
        style={{ x: pointer.x * 40, y: pointer.y * 26 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <Cloud className="animate-float-slow absolute top-[18%] left-[8%] h-16 w-16 text-card/70" />
        <Cloud className="animate-float-med absolute top-[30%] right-[12%] h-24 w-24 text-card/50" />
        <Plane className="animate-float-med absolute top-[22%] right-[28%] h-8 w-8 -rotate-12 text-card/80" />
        <span className="animate-float-slow bg-sunshine/40 absolute bottom-[28%] left-[16%] h-24 w-24 rounded-full blur-2xl" />
        <span className="animate-float-med bg-teal/40 absolute top-[40%] right-[6%] h-32 w-32 rounded-full blur-3xl" />
      </motion.div>

      {/* animated waves */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <svg viewBox="0 0 1440 160" className="h-24 w-full sm:h-32" preserveAspectRatio="none">
          <motion.path
            d="M0,80 C240,140 480,20 720,70 C960,120 1200,40 1440,90 L1440,160 L0,160 Z"
            fill="var(--color-background)"
            opacity="0.55"
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,110 C260,60 520,150 780,105 C1040,60 1240,130 1440,100 L1440,160 L0,160 Z"
            fill="var(--color-background)"
            animate={{ x: [0, 36, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-6xl px-5 sm:px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] text-foreground uppercase"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          Journeys worth remembering
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl text-4xl leading-[1.03] font-bold text-balance text-primary-foreground sm:text-6xl lg:text-7xl"
        >
          Travel further.
          <br />
          Feel <span className="text-gradient">everything</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg"
        >
          Safarnama gathers curious people and takes them somewhere beautiful — small groups,
          honest pricing, and trips designed around the moments you'll actually remember.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <RippleButton
            size="lg"
            variant="sun"
            onClick={() => document.querySelector("#tours")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Tours <ArrowRight className="h-4 w-4" />
          </RippleButton>
          <RippleButton
            size="lg"
            variant="ghost"
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </RippleButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.8 }}
          className="glass mt-14 grid grid-cols-2 gap-6 rounded-3xl p-6 shadow-soft sm:gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <dt className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {stat.label}
              </dt>
              <dd className="font-display mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
