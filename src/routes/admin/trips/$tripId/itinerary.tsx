import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import {
  getItinerary,
  addItineraryDay,
  type ItineraryDay,
} from "@/services/itinerary";
import { Plus, CalendarDays, Image, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/trips/$tripId/itinerary")({
  component: ItineraryPage,
});

function ItineraryPage() {
  const { tripId } = Route.useParams();
const [days, setDays] = useState<ItineraryDay[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function load() {
    try {
      const data = await getItinerary(tripId);
      setDays(data);
    } finally {
      setLoading(false);
    }
  }

  load();
}, [tripId]);

  
  return (
    <AdminLayout>
      <div className="space-y-8">

        {loading ? (
  <div className="rounded-2xl border p-6">
    Loading itinerary...
  </div>
) : (
  <div className="rounded-2xl border p-6">
    <h2 className="text-xl font-bold">
      Days Loaded: {days.length}
    </h2>
  </div>
)}

        {/* Hero */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 p-10 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            ✈️ Itinerary Builder
          </h1>

          <p className="mt-3 max-w-2xl text-white/90">
            Design a beautiful journey for your travellers.
            Add unlimited days, images, stay details,
            activities and much more.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur">
            Trip ID : {tripId}
          </div>

        </div>

        {/* Add Button */}

        <button
  onClick={async () => {
    await addItineraryDay(tripId, {
      day: days.length + 1,
      coverImage: "",
      sections: [],
    });

    const data = await getItinerary(tripId);
    setDays(data);
  }}
  className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-primary-foreground shadow-lg"
>

          <Plus size={20} />

          Add New Day

        </button>

        {/* Demo Card */}

        <div className="rounded-3xl border bg-card p-8 shadow-lg">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-full bg-primary/10 p-4">

                <CalendarDays className="text-primary" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  Day 1

                </h2>

                <p className="text-muted-foreground">

                  Arrival & Local Sightseeing

                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <button className="rounded-xl border p-3 hover:bg-muted">

                <Pencil size={18} />

              </button>

              <button className="rounded-xl border p-3 hover:bg-red-100">

                <Trash2
                  size={18}
                  className="text-red-500"
                />

              </button>

            </div>

          </div>

          <div className="mt-8 rounded-2xl border border-dashed p-10">

            <div className="flex flex-col items-center">

              <Image
                size={50}
                className="text-primary"
              />

              <p className="mt-4 font-semibold">

                Upload Beautiful Cover Image

              </p>

              <p className="text-sm text-muted-foreground">

                Mountains, lakes, camps, trekking,
                food or any memorable moment.

              </p>

            </div>

          </div>

          <div className="mt-8 grid gap-5">

            <input
              placeholder="Day Title"
              className="rounded-xl border p-4"
            />

            <textarea
              rows={6}
              placeholder="Write the complete itinerary for this day..."
              className="rounded-xl border p-4"
            />

          </div>

        </div>

      </div>
    </AdminLayout>
  );
                  }
