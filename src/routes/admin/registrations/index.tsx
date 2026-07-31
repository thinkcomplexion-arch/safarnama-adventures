import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/registration/")({
  component: RegistrationManagement,
});

function RegistrationManagement() {
  return (
    <AdminLayout>
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Registration Management
        </h1>

        <p className="text-muted-foreground">
          Select a trip to view registrations.
        </p>

      </div>
    </AdminLayout>
  );
}
