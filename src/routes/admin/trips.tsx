import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Plus, Map } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CreateTripDrawer } from "@/components/admin/CreateTripDrawer";
import { Link } from "@tanstack/react-router";
import {
  getAllTrips,
  deleteTrip,
  publishTrip,
  archiveTrip,
} from "@/services/trips";


export const Route = createFileRoute("/admin/trips")({
  component: TripsPage,
});

function TripsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTrips() {
    try {
      const data = await getAllTrips();
      setTrips(data);
    } catch (error) {
      console.error("Failed to load trips", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrips();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trips</h1>
            <p className="mt-2 text-muted-foreground">
              Create, edit, publish and manage all your trips.
            </p>
          </div>

          <button
  onClick={() => setCreateOpen(true)}
  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground transition hover:opacity-90"
>
  <Plus size={18} />
  Create Trip
</button>
        </div>
        {/* Search */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />

            <input
              type="text"
              placeholder="Search trips..."
              className="h-12 w-full rounded-xl border bg-background pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Trips List */}

{loading ? (
  <div className="rounded-3xl border bg-card p-10 text-center">
    Loading trips...
  </div>
) : trips.length === 0 ? (
  <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed bg-card text-center">

    <div className="rounded-full bg-primary/10 p-6">
      <Map className="h-10 w-10 text-primary" />
    </div>

    <h2 className="mt-6 text-2xl font-bold">
      No Trips Yet
    </h2>

    <p className="mt-3 max-w-md text-muted-foreground">
      Create your first trip and it will appear here.
    </p>

  </div>
) : (

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

    {trips.map((trip)=>(
      <div
        key={trip.id}
        className="overflow-hidden rounded-2xl border bg-card shadow-sm"
      >

        {trip.image && (
          <img
            src={trip.image}
            alt={trip.title}
            className="h-48 w-full object-cover"
          />
        )}

        <div className="p-5 space-y-3">

          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">
              {trip.title}
            </h3>

            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">
              {trip.status}
            </span>
          </div>


          <p className="text-sm text-muted-foreground">
            📍 {trip.location}
          </p>


          <p className="font-semibold">
            ₹{trip.price}
          </p>


          <div className="flex gap-2 pt-4">

              <Link
  to="/admin/trips/$tripId/itinerary"
  params={{ tripId: trip.id }}
  className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white"
>
  Manage Itinerary
</Link>
            {trip.status === "draft" && (
              <button
                onClick={()=>publishTrip(trip.id).then(loadTrips)}
                className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
              >
                Publish
              </button>
            )}


            {trip.status === "published" && (
              <button
                onClick={()=>archiveTrip(trip.id).then(loadTrips)}
                className="rounded-lg border px-3 py-2 text-sm"
              >
                Archive
              </button>
            )}


            <button
              onClick={()=>deleteTrip(trip.id).then(loadTrips)}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    ))}

  </div>

)}
    

        <CreateTripDrawer
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />

      </div>
    </AdminLayout>
  );
}
