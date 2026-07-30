import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, Map } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CreateTripDrawer } from "@/components/admin/CreateTripDrawer";



export const Route = createFileRoute("/admin/trips")({
  component: TripsPage,
});

function TripsPage() {
  const [createOpen, setCreateOpen] = useState(false);

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

        {/* Empty State */}
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed bg-card text-center">

          <div className="rounded-full bg-primary/10 p-6">
            <Map className="h-10 w-10 text-primary" />
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            No Trips Yet
          </h2>

          <p className="mt-3 max-w-md text-muted-foreground">
            Create your first trip and it will automatically appear here.
          </p>

          <button
  onClick={() => setCreateOpen(true)}
  className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
>
  <Plus size={18} />
  Create First Trip
</button>

                </div>

        <CreateTripDrawer
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />

      </div>
    </AdminLayout>
  );
}
