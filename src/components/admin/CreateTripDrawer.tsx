import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import type { Trip } from "@/services/trips";
import { updateTrip } from "@/services/trips";


interface CreateTripDrawerProps {
  open: boolean;
  onClose: () => void;
  trip?: Trip | null;
  onSaved?: () => void;
}

export function CreateTripDrawer({
  open,
  onClose,
  trip,
  onSaved,
}: CreateTripDrawerProps) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    duration: "",
    season: "",
    description: "",
    status: "draft",
  });

useEffect(() => {

  if (!trip) return;

  setForm({
    title: trip.title || "",
    location: trip.location || "",
    price: String(trip.price || ""),
    duration: trip.duration || "",
    season: trip.season || "",
    description: trip.description || "",
    status: trip.status || "draft",
  });

}, [trip]);
  
  const updateField = (
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSave = async () => {

    if (!form.title || !form.location) {
      toast.error("Title and location are required");
      return;
    }


    try {

      setLoading(true);
      if (trip) {

  await updateTrip(trip.id, {

    title: form.title,

    location: form.location,

    price: Number(form.price),

    duration: form.duration,

    season: form.season,

    description: form.description,

    status: form.status as any,

  });

  toast.success("Trip updated successfully 🎉");

  onSaved?.();

  onClose();

  return;

      }


      await addDoc(collection(db, "trips"), {

        title: form.title,

        location: form.location,

        price: Number(form.price),

        duration: form.duration,

        season: form.season,

        description: form.description,

        status: form.status,

        createdAt: serverTimestamp(),

      });


      toast.success("Trip created successfully 🎉");


      setForm({
        title: "",
        location: "",
        price: "",
        duration: "",
        season: "",
        description: "",
        status: "draft",
      });


      onClose();


    } catch (error) {

      console.error(error);

      toast.error("Failed to create trip");

    } finally {

      setLoading(false);

    }

  };


  if (!open) return null;


  return (
    <div className="fixed inset-0 z-50">

      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />


      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-background p-6 shadow-xl">


        <div className="flex items-center justify-between border-b pb-4">

          <div>
            <h2 className="text-2xl font-bold">
              Create Trip
            </h2>

            <p className="text-sm text-muted-foreground">
              Add a new travel experience
            </p>
          </div>


          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-accent"
          >
            <X size={20}/>
          </button>

        </div>



        <div className="mt-6 space-y-5">


          <input
            value={form.title}
            onChange={(e)=>updateField("title",e.target.value)}
            placeholder="Trip Title"
            className="w-full rounded-xl border px-4 py-3"
          />


          <input
            value={form.location}
            onChange={(e)=>updateField("location",e.target.value)}
            placeholder="Location"
            className="w-full rounded-xl border px-4 py-3"
          />


          <input
            type="number"
            value={form.price}
            onChange={(e)=>updateField("price",e.target.value)}
            placeholder="Price"
            className="w-full rounded-xl border px-4 py-3"
          />


          <input
            value={form.duration}
            onChange={(e)=>updateField("duration",e.target.value)}
            placeholder="Duration"
            className="w-full rounded-xl border px-4 py-3"
          />


          <input
            value={form.season}
            onChange={(e)=>updateField("season",e.target.value)}
            placeholder="Season"
            className="w-full rounded-xl border px-4 py-3"
          />



          <textarea
            value={form.description}
            onChange={(e)=>updateField("description",e.target.value)}
            placeholder="Description"
            rows={5}
            className="w-full rounded-xl border px-4 py-3"
          />



          <select
            value={form.status}
            onChange={(e)=>updateField("status",e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          >

            <option value="draft">
              Draft
            </option>

            <option value="published">
              Published
            </option>

            <option value="archived">
              Archived
            </option>

          </select>




          <div className="flex gap-3 pt-4">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border px-5 py-3"
            >
              Cancel
            </button>


            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
            >

              {loading ? "Saving..." : "Save Trip"}

            </button>


          </div>


        </div>


      </div>


    </div>
  );
}
