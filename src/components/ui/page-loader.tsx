import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Compass } from "lucide-react";

export function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-hero animate-gradient fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            className="grid h-16 w-16 place-items-center rounded-full bg-card/25 backdrop-blur-md"
          >
            <Compass className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold tracking-tight text-primary-foreground">
              Safarnama
            </p>
            <p className="mt-1 text-sm text-primary-foreground/80">Packing your journey…</p>
          </div>
          <div className="h-1 w-44 overflow-hidden rounded-full bg-card/25">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="h-full w-full rounded-full bg-card"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
