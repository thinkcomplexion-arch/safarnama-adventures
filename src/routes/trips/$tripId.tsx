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
  {itinerary.map((day) => (
    <div
  key={day.id}
  className="
relative
overflow-hidden
rounded-[45px]
border
border-white/50
bg-gradient-to-br
from-indigo-50
via-cyan-50
to-pink-50
shadow-2xl
transition-all
duration-500
hover:shadow-cyan-200
">
      {/* Cover Image */}
      {day.coverImage && (
  <div className="relative h-[420px] overflow-hidden">

    <img
      src={day.coverImage}
      alt={`Day ${day.day}`}
      className="h-full w-full object-cover transition duration-700 hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />


    <div className="absolute bottom-8 left-8 text-white">

      <div className="space-y-4">

  <span
    className="
      inline-flex
      items-center
      rounded-full
      bg-white/20
      px-6
      py-3
      text-sm
      font-bold
      uppercase
      tracking-wider
      backdrop-blur-xl
      shadow-lg
    "
  >
    🌄 Day {day.day}
  </span>


  <h2
    className="
      text-5xl
      font-black
      leading-tight
      drop-shadow-lg
      md:text-6xl
    "
  >
    {day.title || `Day ${day.day}`}
  </h2>


  <p className="max-w-xl text-lg text-white/90">
    Explore this beautiful chapter of your journey.
  </p>

</div>

    </div>

  </div>
)}

<div className="p-8">

        <div className="space-y-8">

  {day.sections.map((section) => (

    <div
      key={section.id}
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        bg-white/70
        p-8
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/40 via-transparent to-purple-100/40 opacity-0 transition group-hover:opacity-100" />


      <div className="relative">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-3xl
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              text-3xl
              shadow-lg
            "
          >
            {getSectionIcon(section.type)}
          </div>


          <div>

            <h3 className="text-3xl font-extrabold text-slate-900">
              {section.title || "Untitled Section"}
            </h3>

            <p className="mt-1 text-sm font-medium text-slate-500 capitalize">
              {section.type || "Description"}
            </p>

          </div>

        </div>


        <p className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-slate-600">
          {section.content}
        </p>


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
