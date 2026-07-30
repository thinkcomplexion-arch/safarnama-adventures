import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Welcome to Safar Nama Management Portal 👋
        </h1>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-card p-6 shadow">
            <h2 className="font-semibold">Trips</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              🚧 Coming Soon
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow">
            <h2 className="font-semibold">Registrations</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              🚧 Coming Soon
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow">
            <h2 className="font-semibold">Finance</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              🚧 Coming Soon
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow">
            <h2 className="font-semibold">Settings</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              🚧 Coming Soon
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
