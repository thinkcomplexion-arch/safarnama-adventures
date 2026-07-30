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


  async function handleAddDay() {
    try {
      await addItineraryDay(tripId, {
        day: days.length + 1,
        coverImage: "",
        sections: [],
      });

      const data = await getItinerary(tripId);
      setDays(data);

    } catch (error) {
      console.error("Failed to add day:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }


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
          onClick={handleAddDay}
          className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-primary-foreground shadow-lg"
        >

          <Plus size={20} />

          Add New Day

        </button>




        {/* Dynamic Days */}

        <div className="space-y-8">

          {days.map((day) => (

            <div
              key={day.id}
              className="rounded-3xl border bg-card p-8 shadow-lg"
            >


              <div className="flex items-center justify-between">


                <div className="flex items-center gap-3">


                  <div className="rounded-full bg-primary/10 p-4">

                    <CalendarDays className="text-primary" />

                  </div>


                  <div>

                    <h2 className="text-2xl font-bold">
                      Day {day.day}
                    </h2>


                    <p className="text-muted-foreground">
                      {day.sections.length} Sections Added
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



              {/* Cover Image */}

              <div className="mt-8 rounded-2xl border border-dashed p-10">

                <div className="flex flex-col items-center">

                  <Image
                    size={50}
                    className="text-primary"
                  />

                  <p className="mt-4 font-semibold">
                    Cover Image
                  </p>


                  <p className="text-sm text-muted-foreground">
                    {day.coverImage
                      ? day.coverImage
                      : "No image uploaded"}
                  </p>


                </div>

              </div>



              {/* Sections */}

              <div className="mt-6 space-y-3">

                {day.sections.map((section) => (

                  <div
                    key={section.id}
                    className="rounded-xl border p-4"
                  >

                    <h3 className="font-semibold capitalize">
                      {section.title || section.type}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {section.content || "No content"}
                    </p>


                  </div>

                ))}


              </div>


            </div>

          ))}



          {days.length === 0 && (

            <div className="rounded-3xl border p-10 text-center text-muted-foreground">

              No itinerary days created yet.

            </div>

          )}


        </div>



      </div>

    </AdminLayout>
  );
            }
