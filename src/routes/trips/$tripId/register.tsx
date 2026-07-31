import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/trips/$tripId/register")({
  component: RegistrationPage,
});

function RegistrationPage() {
  const { tripId } = Route.useParams();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-3xl border p-8 shadow-lg">
        <h1 className="text-3xl font-bold">
          Dynamic Registration Page
        </h1>

        <p className="mt-4 text-muted-foreground">
          Trip ID: {tripId}
        </p>

        <p className="mt-2">
          Registration system coming soon...
        </p>
      </div>
    </div>
  );
}
