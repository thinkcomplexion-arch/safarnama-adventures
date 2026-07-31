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
      className="overflow-hidden rounded-3xl border bg-white shadow-xl"
    >
      {/* Cover Image */}
      {day.coverImage && (
        <div className="relative">

  <img
    src={day.coverImage}
    alt={`Day ${day.day}`}
    className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

</div>
      )}

      <div className="p-8">

        <div className="relative -mt-24 z-10">

  <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-lg font-bold text-white shadow-2xl">
    Day {day.day}
  </div>

  <h2 className="mt-5 text-4xl font-extrabold text-slate-900">
    {day.title || `Day ${day.day}`}
  </h2>

</div>

        <div className="space-y-6">
          {day.sections.map((section) => (
            <div
  key={section.id}
  className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
              <div className="mb-4 flex items-center gap-3">

  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl text-white shadow-lg">

    {section.type === "places" && "📍"}
    {section.type === "gallery" && "🖼️"}
    {section.type === "meals" && "🍽️"}
    {section.type === "stay" && "🏨"}
    {section.type === "transport" && "🚌"}
    {section.type === "highlights" && "⭐"}
    {section.type === "tips" && "💡"}
    {(!section.type || section.type === "description") && "✨"}

  </div>

  <h4 className="text-2xl font-bold text-slate-900">
    {section.title || "Untitled Section"}
  </h4>

</div>
              <p className="mt-3 whitespace-pre-wrap text-muted-foreground leading-relaxed">
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
