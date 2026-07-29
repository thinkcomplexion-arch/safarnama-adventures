import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Compass, Menu, X } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Upcoming Tours", href: "#tours" },
  { label: "Destinations", href: "#destinations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <nav
        className={cn(
          "mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 py-3 transition-all duration-500 sm:px-6",
          scrolled ? "glass-strong shadow-soft" : "border border-transparent bg-transparent",
        )}
      >
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span className="gradient-sea grid h-10 w-10 shrink-0 place-items-center rounded-2xl shadow-soft">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="min-w-0">
            <span
              className={cn(
                "font-display block truncate text-lg leading-none font-bold transition-colors",
                scrolled ? "text-foreground" : "text-primary-foreground",
              )}
            >
              Safarnama
            </span>
            <span
              className={cn(
                "block truncate text-[11px] tracking-[0.22em] uppercase transition-colors",
                scrolled ? "text-muted-foreground" : "text-primary-foreground/75",
              )}
            >
              Travel Stories
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "story-link text-sm font-medium transition-colors",
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/90 hover:text-primary-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
          <RippleButton size="sm" variant="sun" onClick={() => setOpen(false)}>
            Plan a Trip
          </RippleButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors lg:hidden",
            scrolled ? "bg-secondary text-foreground" : "bg-card/25 text-primary-foreground",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong mx-auto mt-3 max-w-6xl rounded-3xl p-4 shadow-lift lg:hidden"
          >
            <ul className="grid gap-1">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <RippleButton className="mt-3 w-full" onClick={() => setOpen(false)}>
              Plan a Trip
            </RippleButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
