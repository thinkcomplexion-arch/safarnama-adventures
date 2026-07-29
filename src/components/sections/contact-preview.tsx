import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { RippleButton } from "@/components/ui/ripple-button";

const contactDetails = [
  { icon: Mail, label: "hello@safarnama.travel" },
  { icon: Phone, label: "+91 98000 12345" },
  { icon: MapPin, label: "Rishikesh · Goa · Bengaluru" },
];

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
];

export function ContactPreview() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="gradient-sea animate-gradient relative overflow-hidden rounded-[2.5rem] p-8 shadow-lift sm:p-14">
            <span
              aria-hidden
              className="animate-float-slow absolute -top-16 -right-10 h-56 w-56 rounded-full bg-card/15 blur-2xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="min-w-0">
                <h2 className="text-3xl leading-tight font-bold text-balance text-primary-foreground sm:text-4xl">
                  Let's plan your next chapter
                </h2>
                <p className="mt-4 max-w-md text-primary-foreground/85">
                  Tell us where you'd like to wake up next. A trip coordinator replies within a day.
                </p>

                <ul className="mt-8 grid gap-3">
                  {contactDetails.map((detail) => (
                    <li
                      key={detail.label}
                      className="flex min-w-0 items-center gap-3 text-sm text-primary-foreground/90"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-card/20">
                        <detail.icon className="h-4 w-4 text-primary-foreground" />
                      </span>
                      <span className="truncate">{detail.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href="#contact"
                      aria-label={social.label}
                      className="grid h-11 w-11 place-items-center rounded-full bg-card/20 text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:text-foreground"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              <RippleButton size="lg" variant="sun" className="w-full lg:w-auto">
                Start a Conversation
              </RippleButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
