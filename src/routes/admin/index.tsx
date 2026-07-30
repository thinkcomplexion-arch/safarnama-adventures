import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (
    !user ||
    !profile ||
    profile.role !== "owner" ||
    profile.active !== true
  ) {
    navigate({
      to: "/login",
    });

    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Welcome to Safar Nama Management Portal 👋
        </h1>

        <p className="text-muted-foreground">
          Welcome back, {profile.name}
        </p>

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
