import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Clock, CalendarRange } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ItinerarySectionView } from "@/components/ItinerarySection";
import { Link } from "@tanstack/react-router";
import {
  getTripById,
  type Trip,
} from "@/services/trips";

import {
  getItinerary,
  type ItineraryDay,
} from "@/services/itinerary";

export const Route = createFileRoute("/trips/$tripId/")({
  component: TripDetailsPage,
});

function TripDetailsPage() {
  const { tripId } = Route.useParams();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
const [showItinerary, setShowItinerary] = useState(false);

  useEffect(() => {
    async function fetchTrip() {
      const data = await getTripById(tripId);
const itineraryData = await getItinerary(tripId);

setTrip(data);
setItinerary(itineraryData);
setLoading(false);
    }

    fetchTrip();
  }, [tripId]);


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading trip...
      </div>
    );
  }


  if (!trip) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          Trip not found.
        </div>
        <Footer />
      </>
    );
  }

  function getSectionIcon(type?: string) {
  switch (type) {
    case "places":
      return "📍";
    case "gallery":
      return "🖼️";
    case "meals":
      return "🍽️";
    case "stay":
      return "🏨";
    case "transport":
      return "🚌";
    case "highlights":
      return "⭐";
    case "tips":
      return "💡";
    default:
      return "✨";
  }
  }


  return (
    <>
      <Navbar />

      <main>

        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">

          <img
            src={trip.image}
            alt={trip.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />


          <div className="absolute bottom-10 left-0 right-0 mx-auto max-w-6xl px-6 text-white">

            <h1 className="text-4xl font-bold md:text-6xl">
              {trip.title}
            </h1>


            <div className="mt-5 flex flex-wrap gap-5 text-sm">

              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {trip.location}
              </span>


              <span className="flex items-center gap-2">
                <Clock size={18} />
                {trip.duration}
              </span>


              <span className="flex items-center gap-2">
                <CalendarRange size={18} />
                {trip.season}
              </span>

            </div>

          </div>

        </section>



        {/* Main Content */}
        <section className="mx-auto max-w-6xl px-6 py-16">

          <div className="grid gap-10 lg:grid-cols-3">


            <div className="lg:col-span-2">

              <h2 className="text-3xl font-bold">
                About this journey
              </h2>


              <p className="mt-5 leading-relaxed text-muted-foreground">
                {trip.description}
              </p>



              <div className="mt-12 overflow-hidden rounded-3xl border bg-gradient-to-br from-sky-50 to-cyan-50">

  <button
    onClick={() => setShowItinerary(!showItinerary)}
    className="flex w-full items-center justify-between p-8 text-left"
  >
    <div>
      <h3 className="text-3xl font-bold">
        🗺️ Journey Itinerary
      </h3>

      <p className="mt-2 text-muted-foreground">
        Explore your complete day-wise adventure.
      </p>
    </div>

    <span className="rounded-full bg-primary px-5 py-2 text-white">
      {showItinerary ? "Hide" : "View Full Itinerary"}
    </span>
  </button>

             {showItinerary && (
  <div
    className="
      fixed
      inset-0
      z-50
      h-screen
      w-screen
      overflow-y-auto
      snap-y
      snap-mandatory
      bg-black
      p-4
      md:p-8
      animate-in
      fade-in
      duration-700
    "
  >

    {/* Close Button */}
    <button
      onClick={() => setShowItinerary(false)}
      className="
        fixed
        right-6
        top-6
        z-[60]
        rounded-full
        bg-white/20
        px-6
        py-3
        text-white
        backdrop-blur-xl
        transition
        hover:bg-white/40
      "
    >
      ✕ Close
    </button>


    <div className="space-y-10">

      {itinerary.map((day) => (

        <div
          key={day.id}
          className="
            group
            relative
            flex
            min-h-[calc(100vh-4rem)]
            w-full
            snap-start
            overflow-hidden
            rounded-[60px]
            border
            border-white/20
            shadow-[0_40px_120px_rgba(0,0,0,0.5)]
            transition-all
            duration-1000
          "
        >

          {/* Background Image */}
          <div className="absolute inset-0">

            {day.coverImage && (
              <img
                src={day.coverImage}
                alt={`Day ${day.day}`}
                className="
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-[2500ms]
                  group-hover:scale-110
                "
              />
            )}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-indigo-950/90
                via-purple-900/70
                to-cyan-900/80
              "
            />

          </div>


          {/* Content */}
          <div
            className="
              w-full
px-4
py-8
text-white
sm:px-6
md:px-10
lg:px-16
            "
          >

            {/* Day Badge */}
            <div
              className="
                inline-flex
                w-fit
                rounded-full
                bg-white/20
                px-6
                py-3
                backdrop-blur-xl
                shadow-lg
                animate-pulse
              "
            >
              🌄 DAY {day.day}
            </div>


            <h2
              className="
                mt-6
                text-5xl
                font-black
                leading-tight
                drop-shadow-2xl
                md:text-8xl
              "
            >
              {day.title || `Day ${day.day}`}
            </h2>


            <p
              className="
                mt-5
                max-w-3xl
                text-lg
                text-white/90
                md:text-2xl
              "
            >
              Discover the next chapter of your adventure.
            </p>



            {/* Sections */}
            <div className="mt-12 space-y-10">

                {day.sections.map((section) => (
  <ItinerarySectionView
    key={section.id}
    section={section}
  />
))}

          

            </div>


          </div>


        </div>

      ))}

    </div>


  </div>
)}
     </div>
     </div>

            {/* Booking Card */}
            <div className="h-fit rounded-3xl border p-6 shadow-lg">

              <h3 className="text-3xl font-bold">
                {trip.price}
              </h3>


              <Link
                to="/trips/$tripId/register"
                params={{ tripId }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-primary-foreground transition hover:opacity-90"
              >
                Book Now
              </Link>

            </div>


          </div>

        </section>


      </main>

      <Footer />
    </>
  );
}
