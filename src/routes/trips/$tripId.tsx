import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Clock, CalendarRange } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  getTripById,
  type Trip,
} from "@/services/trips";

import {
  getItinerary,
  type ItineraryDay,
} from "@/services/itinerary";

export const Route = createFileRoute("/trips/$tripId")({
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
  <div className="border-t p-8">

    <div className="space-y-10">

      {itinerary.map((day, index) => (

  <div
    key={day.id}
    className="
      group
      relative
      overflow-hidden
      rounded-[50px]
      border
      border-white/30
      shadow-2xl
      transition-all
      duration-700
      hover:-translate-y-3
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
            duration-[2000ms]
            group-hover:scale-110
          "
        />
      )}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-indigo-900/80
          via-purple-900/60
          to-cyan-900/70
        "
      />

    </div>



    {/* Content */}
    <div className="relative z-10 p-8 md:p-12 text-white">


      {/* Day Badge */}

      <div
        className="
          inline-flex
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
          md:text-7xl
          drop-shadow-2xl
        "
      >
        {day.title || `Day ${day.day}`}
      </h2>


      <p className="mt-4 max-w-2xl text-lg text-white/90">
        Discover the next chapter of your adventure.
      </p>




      {/* Sections */}

      <div className="mt-12 space-y-8">


        {day.sections.map((section) => (

          <div
            key={section.id}
            className="
              border-b
              border-white/20
              pb-6
              last:border-none
            "
          >


            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/20
                  text-3xl
                  backdrop-blur-xl
                "
              >
                {getSectionIcon(section.type)}
              </div>


              <div>

                <h3 className="text-2xl font-bold">
                  {section.title}
                </h3>


                <p
                  className="
                    text-sm
                    uppercase
                    tracking-widest
                    text-white/70
                  "
                >
                  {section.type}
                </p>

              </div>


            </div>


            <p
              className="
                mt-4
                text-lg
                leading-relaxed
                text-white/90
              "
            >
              {section.content}
            </p>


          </div>

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


              <button className="mt-6 w-full rounded-xl bg-primary px-5 py-3 text-primary-foreground">
                Book Now
              </button>

            </div>


          </div>

        </section>


      </main>

      <Footer />
    </>
  );
}
