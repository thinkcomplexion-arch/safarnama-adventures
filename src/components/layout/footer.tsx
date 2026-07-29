import { Compass, Send } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: ["Upcoming Tours", "Destinations", "Gallery", "Testimonials"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "FAQs", "Rules & Regulations"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Refund Policy", "Terms & Conditions"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="gradient-sea grid h-10 w-10 shrink-0 place-items-center rounded-2xl">
                <Compass className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="font-display truncate text-lg font-bold">Safarnama</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Small-group journeys across mountains, coasts and everything in between.
            </p>

            <form
              className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="Your email for trip drops"
                className="min-w-0 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="gradient-sun grid h-12 w-12 shrink-0 place-items-center rounded-full text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title} className="min-w-0">
                <h3 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#home"
                        className="story-link text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Safarnama. Crafted for people who travel with their eyes
          open.
        </p>
      </div>
    </footer>
  );
}
