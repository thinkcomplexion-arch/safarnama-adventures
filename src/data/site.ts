import tour1 from "@/assets/tour-1.jpg";
import tour2 from "@/assets/tour-2.jpg";
import tour3 from "@/assets/tour-3.jpg";
import tour4 from "@/assets/tour-4.jpg";
import tour5 from "@/assets/tour-5.jpg";
import tour6 from "@/assets/tour-6.jpg";
import dest1 from "@/assets/dest-1.jpg";
import dest2 from "@/assets/dest-2.jpg";
import dest3 from "@/assets/dest-3.jpg";
import dest4 from "@/assets/dest-4.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

/** Placeholder data only — swap for a real API later. */

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export interface Tour {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  description: string;
  difficulty: Difficulty;
  season: string;
  image: string;
}

export const tours: Tour[] = [
  {
    id: "himalayan-skyline",
    title: "Himalayan Skyline Trek",
    location: "Manali, Himachal",
    duration: "6 days / 5 nights",
    price: "₹18,900",
    description: "Walk above the clouds through prayer-flag ridges and glacier-fed valleys.",
    difficulty: "Challenging",
    season: "Apr – Jun",
    image: tour1,
  },
  {
    id: "island-slowdown",
    title: "Island Slowdown",
    location: "Havelock, Andaman",
    duration: "5 days / 4 nights",
    price: "₹24,500",
    description: "Turquoise lagoons, barefoot mornings and sunsets that refuse to end.",
    difficulty: "Easy",
    season: "Nov – Feb",
    image: tour2,
  },
  {
    id: "desert-highway",
    title: "Desert Highway Roadtrip",
    location: "Jaisalmer, Rajasthan",
    duration: "4 days / 3 nights",
    price: "₹14,200",
    description: "Open roads, golden dunes and campfire stories under a wide orange sky.",
    difficulty: "Easy",
    season: "Oct – Mar",
    image: tour3,
  },
  {
    id: "rainforest-cascades",
    title: "Rainforest Cascades",
    location: "Coorg, Karnataka",
    duration: "3 days / 2 nights",
    price: "₹9,800",
    description: "Chase hidden waterfalls through emerald forests and coffee estates.",
    difficulty: "Moderate",
    season: "Jun – Sep",
    image: tour4,
  },
  {
    id: "alpine-mirror-lakes",
    title: "Alpine Mirror Lakes",
    location: "Tawang, Arunachal",
    duration: "7 days / 6 nights",
    price: "₹27,600",
    description: "Glass-still lakes, pine ridgelines and mountain air that resets everything.",
    difficulty: "Moderate",
    season: "May – Aug",
    image: tour5,
  },
  {
    id: "sunrise-camp",
    title: "Sunrise Meadow Camp",
    location: "Chopta, Uttarakhand",
    duration: "2 days / 1 night",
    price: "₹6,400",
    description: "A weekend of meadow camping, guitar circles and first light on the peaks.",
    difficulty: "Easy",
    season: "Mar – Nov",
    image: tour6,
  },
];

export interface Destination {
  id: string;
  name: string;
  blurb: string;
  image: string;
  span: string;
}

export const destinations: Destination[] = [
  {
    id: "aegean",
    name: "Aegean Coast",
    blurb: "Whitewashed cliffs above impossibly blue water.",
    image: dest1,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "rice-terraces",
    name: "Emerald Terraces",
    blurb: "Green stairways carved into tropical hills.",
    image: dest2,
    span: "md:col-span-2",
  },
  {
    id: "fjord",
    name: "Kayak Fjords",
    blurb: "Paddle between towering green walls.",
    image: dest3,
    span: "md:col-span-1",
  },
  {
    id: "snow-village",
    name: "Snow Villages",
    blurb: "Pine, powder and slow winter mornings.",
    image: dest4,
    span: "md:col-span-1",
  },
];

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: "Mountains" | "Beaches" | "Forests" | "People";
  tall?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { id: "g1", image: g1, caption: "Canyon viewpoint", category: "Mountains", tall: true },
  { id: "g2", image: g2, caption: "Roadtrip crew", category: "People" },
  { id: "g3", image: g3, caption: "Balloons at dawn", category: "Mountains", tall: true },
  { id: "g4", image: g4, caption: "Reef swim", category: "Beaches" },
  { id: "g5", image: g5, caption: "Waterfall bridge", category: "Forests", tall: true },
  { id: "g6", image: g6, caption: "Sunset walk", category: "Beaches" },
];

export const galleryFilters = ["All", "Mountains", "Beaches", "Forests", "People"] as const;

export interface Testimonial {
  id: string;
  name: string;
  trip: string;
  rating: number;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav Mehta",
    trip: "Himalayan Skyline Trek",
    rating: 5,
    quote:
      "I joined solo and came back with eleven friends. Every detail was handled — I only had to look up and enjoy the mountains.",
    initials: "AM",
  },
  {
    id: "t2",
    name: "Sara Fernandes",
    trip: "Island Slowdown",
    rating: 5,
    quote:
      "The pace was perfect. Nothing felt rushed, nothing felt touristy. It genuinely felt like travelling with old friends.",
    initials: "SF",
  },
  {
    id: "t3",
    name: "Devansh Rao",
    trip: "Desert Highway Roadtrip",
    rating: 4,
    quote:
      "Campfire nights in the dunes were unreal. Our guide knew every hidden stop that no itinerary would ever list.",
    initials: "DR",
  },
  {
    id: "t4",
    name: "Meera Nair",
    trip: "Rainforest Cascades",
    rating: 5,
    quote:
      "Safe, warm and beautifully organised. As a woman travelling alone, that mattered more than anything else.",
    initials: "MN",
  },
];

export const faqs = [
  {
    q: "How do I join a Safarnama trip?",
    a: "Browse upcoming tours, pick the dates that suit you and send us an enquiry. A trip coordinator walks you through everything before you commit.",
  },
  {
    q: "Do you host solo travellers?",
    a: "Around half of every group travels solo. We handle introductions, shared stays and group pacing so you never feel like an outsider.",
  },
  {
    q: "What is included in the trip price?",
    a: "Stays, in-trip transport, listed meals, permits, guides and safety support. Flights and personal expenses stay on your side.",
  },
  {
    q: "How fit do I need to be?",
    a: "Each tour carries a difficulty badge. Easy trips suit everyone; challenging treks need a few weeks of walking practice beforehand.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free changes up to 21 days before departure, with a sliding refund scale after that. Full details sit in the Refund Policy.",
  },
];

export const stats = [
  { label: "Happy Travelers", value: 24800, suffix: "+" },
  { label: "Trips Organized", value: 1420, suffix: "+" },
  { label: "Destinations Covered", value: 96, suffix: "" },
  { label: "Customer Satisfaction", value: 98, suffix: "%" },
];
