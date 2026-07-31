import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import {
  getItinerary,
  addItineraryDay,
  updateItineraryDay,
  deleteItineraryDay,
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
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [editingCoverDay, setEditingCoverDay] = useState<string | null>(null);
  const [sectionType, setSectionType] = useState<string>("");
  
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

  title: `Day ${days.length + 1}`,

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

  async function handleAddSection(day: ItineraryDay) {
  if (!day.id) return;

  try {
    const newSection = {
  id: crypto.randomUUID(),

  title: "",

  content: "",

  images: [],
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
  type: sectionType || undefined,
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


  async function handleDeleteSection(
  dayId: string,
  sectionId: string
) {
  try {
    const day = days.find(
      (item) => item.id === dayId
    );

    if (!day) return;

    const updatedSections = day.sections.filter(
      (section) => section.id !== sectionId
    );

    await updateItineraryDay(
      tripId,
      dayId,
      {
        sections: updatedSections,
      }
    );

    const data = await getItinerary(tripId);

    setDays(data);

  } catch (error) {
    console.error(
      "Failed to delete section:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Failed to delete section"
    );
  }
  }


  async function handleDeleteDay(dayId: string) {
  try {
    await deleteItineraryDay(
      tripId,
      dayId
    );

    const data = await getItinerary(tripId);

    setDays(data);

    setCoverImageUrl("");
setEditingCoverDay(null);

  } catch (error) {
    console.error(
      "Failed to delete day:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Failed to delete day"
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

                    <div className="space-y-3">

  <p className="text-sm font-semibold text-primary">
    Day {day.day}
  </p>

  <input
    defaultValue={day.title}
    placeholder="Enter day title"
    onBlur={async (e) => {

      if (!day.id) return;

      await updateItineraryDay(
        tripId,
        day.id,
        {
          title: e.target.value,
        }
      );

      const data = await getItinerary(tripId);

      setDays(data);

    }}
    className="w-full rounded-xl border p-3 text-2xl font-bold"
  />

  <p className="text-muted-foreground">
    {day.sections.length} Sections Added
  </p>

</div>


                  </div>


                </div>


                <div className="flex gap-3">

  <button
    onClick={() =>
      handleDeleteDay(day.id!)
    }
    className="rounded-xl border p-3 hover:bg-red-100"
  >

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

                  {day.coverImage ? (
  <img
    src={day.coverImage}
    alt={`Day ${day.day} cover`}
    className="mt-4 h-60 w-full rounded-2xl object-cover"
  />
) : (
  <p className="text-sm text-muted-foreground">
    No image uploaded
  </p>
)}
                  
                    <div className="mt-5 w-full space-y-3">

{editingCoverDay === day.id || !day.coverImage ? (

  <>
    <input
      value={coverImageUrl}
      onChange={(e) =>
        setCoverImageUrl(e.target.value)
      }
      placeholder="Paste image URL here"
      className="w-full rounded-xl border p-3"
    />

    <button
      onClick={async () => {

        if (!day.id || !coverImageUrl) return;

        await updateItineraryDay(
          tripId,
          day.id,
          {
            coverImage: coverImageUrl,
          }
        );

        const data = await getItinerary(tripId);

        setDays(data);

        setCoverImageUrl("");
        setEditingCoverDay(null);

      }}
      className="rounded-xl bg-primary px-5 py-3 text-primary-foreground"
    >
      Save Cover Image
    </button>
  </>

) : (

  <div className="flex gap-3">

    <button
      onClick={() => {
        setCoverImageUrl(day.coverImage);
        setEditingCoverDay(day.id!);
      }}
      className="rounded-xl border px-5 py-3"
    >
      Edit URL
    </button>


    <button
      onClick={async () => {

        await updateItineraryDay(
          tripId,
          day.id!,
          {
            coverImage: "",
          }
        );

        const data = await getItinerary(tripId);

        setDays(data);

      }}
      className="rounded-xl border px-5 py-3 text-red-500"
    >
      Remove Image
    </button>

  </div>

)}

</div>
                  
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

      <select
  value={sectionType}
  onChange={(e) => setSectionType(e.target.value)}
  className="w-full rounded-xl border p-3"
>
  <option value="">Default Section</option>
  <option value="description">Description</option>
  <option value="places">Places to Visit</option>
  <option value="gallery">Gallery</option>
  <option value="meals">Meals</option>
  <option value="stay">Stay</option>
  <option value="transport">Transport</option>
  <option value="highlights">Highlights</option>
  <option value="tips">Travel Tips</option>
</select>
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


      <div className="mt-3 flex gap-3">

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

      setSectionType(section.type || "");

    }}
    className="rounded-xl border px-4 py-2"
  >
    Edit Section
  </button>


  <button
    onClick={() =>
      handleDeleteSection(
        day.id!,
        section.id
      )
    }
    className="rounded-xl border px-4 py-2 text-red-500 hover:bg-red-50"
  >
    Delete
  </button>

</div>

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
