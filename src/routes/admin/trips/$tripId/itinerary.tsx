import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/admin/trips/$tripId/itinerary"
)({
  component: TestItinerary,
});

function TestItinerary() {
  const { tripId } = Route.useParams();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Itinerary Page Working
      </h1>

      <p className="mt-4">
        Trip ID: {tripId}
      </p>
    </div>
  );
}
