import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { getAllTrips, type Trip } from "@/services/trips";
import { getAllTrips, type Trip } from "@/services/trips";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);

useEffect(() => {
  async function loadTrips() {
    const data = await getAllTrips();
    setTrips(data);
  }

  loadTrips();
}, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!user) {
  return (
    <div className="p-10">
      No Firebase user found
    </div>
  );
}

if (!profile) {
  return (
    <div className="p-10">
      User logged in, but admin profile not found
      <br />
      UID: {user.uid}
    </div>
  );
}

if (profile.role !== "owner" || profile.active !== true) {
  return (
    <div className="p-10">
      Access denied
      <br />
      Role: {profile.role}
      <br />
      Active: {String(profile.active)}
    </div>
  );
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

        <div className="rounded-xl border bg-card p-6 shadow">
  <h2 className="font-semibold">
    Trips
  </h2>

  <p className="mt-2 text-3xl font-bold">
    {trips.length}
  </p>

  <p className="text-sm text-muted-foreground">
    Total trips created
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
