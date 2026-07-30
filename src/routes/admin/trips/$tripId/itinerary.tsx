import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/trips/$tripId/itinerary")({
  component: ItineraryPage,
});

function ItineraryPage() {
  const { tripId } = Route.useParams();

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
          <h1 className="text-3xl font-bold">
            Itinerary Builder
          </h1>

          <p className="mt-2 text-muted-foreground">
            Trip ID: {tripId}
          </p>

          <div className="mt-8 rounded-2xl border border-dashed p-10 text-center">
            <h2 className="text-xl font-semibold">
              🚧 Itinerary Builder Coming Soon
            </h2>

            <p className="mt-3 text-muted-foreground">
              Here you'll be able to create beautiful day-wise itineraries,
              upload multiple images, reorder days with drag & drop,
              add highlights, meals, stay, maps and much more.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
