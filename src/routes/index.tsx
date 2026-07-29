import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Tours } from "@/components/sections/tours";
import { Destinations } from "@/components/sections/destinations";
import { WhyUs } from "@/components/sections/why-us";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { About } from "@/components/sections/about";
import { ContactPreview } from "@/components/sections/contact-preview";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PageLoader } from "@/components/ui/page-loader";

const title = "Safarnama — Small-Group Journeys Worth Remembering";
const description =
  "Discover curated small-group tours, breathtaking destinations and a community of travellers. Plan your next adventure with Safarnama.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Tours />
        <Destinations />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <About />
        <Faq />
        <ContactPreview />
      </main>
      <Footer />
    </>
  );
}
