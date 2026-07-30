import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import {
  getItinerary,
  addItineraryDay,
  updateItineraryDay,
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
  const [selectedSectionDay, setSelectedSectionDay] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<{
  dayId: string;
  sectionId: string;
} | null>(null);

const [sectionTitle, setSectionTitle] = useState("");
const [sectionContent, setSectionContent] = useState("");
  
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


  async function handleAddSection(day: ItineraryDay) {
  if (!day.id) return;

  try {
    const newSection = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
    };

    await updateItineraryDay(
      tripId,
      day.id,
      {
        sections: [
          ...day.sections,
          newSection,
        ],
      }
    );

    const data = await getItinerary(tripId);

    setDays(data);

    const createdSection =
      data
        .find((d) => d.id === day.id)
        ?.sections.at(-1);

    if (createdSection) {
      setEditingSection({
        dayId: day.id,
        sectionId: createdSection.id,
      });

      setSectionTitle("");
      setSectionContent("");
    }

  } catch (error) {
    console.error(
      "Failed to add section:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Failed to add section"
    );
  }
  }

  async function handleAddSection(
  day: ItineraryDay,
  type: string
) {
  if (!day.id) return;

  try {
    const newSection = {
      id: crypto.randomUUID(),
      type,
      content: "",
    };

    await updateItineraryDay(
      tripId,
      day.id,
      {
        sections: [
          ...day.sections,
          newSection,
        ],
      }
    );

    const data = await getItinerary(tripId);

    setDays(data);

    setSelectedSectionDay(null);

  } catch (error) {
    console.error("Failed to add section:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Failed to add section"
    );
  }
  }

  async function handleSaveSection(
  dayId: string,
  sectionId: string
) {
  try {

    const updatedDays = days.map((day) => {

      if (day.id !== dayId) {
        return day;
      }

      return {
        ...day,
        sections: day.sections.map((section) => {

          if (section.id !== sectionId) {
            return section;
          }

          return {
            ...section,
            title: sectionTitle,
            content: sectionContent,
          };

        }),
      };

    });


    const updatedDay = updatedDays.find(
      (day) => day.id === dayId
    );


    if (!updatedDay) return;


    await updateItineraryDay(
      tripId,
      dayId,
      {
        sections: updatedDay.sections,
      }
    );


    const data = await getItinerary(tripId);

    setDays(data);

    setEditingSection(null);
    setSectionTitle("");
    setSectionContent("");


  } catch(error) {

    console.error(
      "Failed to save section:",
      error
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


                <button
  onClick={() => handleAddSection(day)}
  className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
>
  <Plus size={18} />
  Add Section
</button>
              
              
              {/* Sections */}

              <div className="mt-6 space-y-3">

                {day.sections.map((section) => (

                  <div
  key={section.id}
  className="rounded-xl border p-4"
>

  <h3 className="font-semibold capitalize">
  {section.title || "Untitled Section"}
</h3>


  {editingSection?.sectionId === section.id ? (

    <div className="mt-4 space-y-3">

      <input
        value={sectionTitle}
        onChange={(e) =>
          setSectionTitle(e.target.value)
        }
        placeholder="Section title"
        className="w-full rounded-xl border p-3"
      />


      <textarea
        value={sectionContent}
        onChange={(e) =>
          setSectionContent(e.target.value)
        }
        placeholder="Write details..."
        rows={5}
        className="w-full rounded-xl border p-3"
      />


      <button
        onClick={() =>
          handleSaveSection(
            day.id!,
            section.id
          )
        }
        className="rounded-xl bg-primary px-5 py-3 text-primary-foreground"
      >
        Save Section
      </button>


    </div>


  ) : (

    <>

      <p className="mt-2 text-sm text-muted-foreground">
        {section.content || "No content"}
      </p>


      <button
        onClick={() => {

          setEditingSection({
            dayId: day.id!,
            sectionId: section.id,
          });

          setSectionTitle(
            section.title || ""
          );

          setSectionContent(
            section.content || ""
          );

        }}
        className="mt-3 rounded-xl border px-4 py-2"
      >
        Edit Section
      </button>

    </>

  )}

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
