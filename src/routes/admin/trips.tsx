import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/trips")({
  component: TripsPage,
});

function TripsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Trips</h1>
          <p className="text-muted-foreground mt-2">
            Manage all your trips from one place.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-8">
          <h2 className="text-xl font-semibold">
            Trip Management
          </h2>

          <p className="mt-3 text-muted-foreground">
            No trips UI yet. We will build Create, Edit, Delete,
            Publish, Draft and Archive here.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
