import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const Route = createFileRoute("/trips/$tripId/register")({
  head: () => ({
    meta: [
      { title: "Trip Registration — Safarnama" },
      {
        name: "description",
        content: "Register for your Safarnama journey and secure your spot on an upcoming small-group departure.",
      },
      { property: "og:title", content: "Trip Registration — Safarnama" },
      {
        property: "og:description",
        content: "Register for your Safarnama journey and secure your spot on an upcoming small-group departure.",
      },
    ],
  }),
  component: RegistrationPage,
});

function RegistrationPage() {
  const { tripId } = Route.useParams();

  return (
    <>
      <Navbar />

      <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-24">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
          <h1 className="text-4xl font-bold sm:text-5xl">Trip Registration</h1>

          <p className="mt-4 text-muted-foreground">
            You're registering for trip{" "}
            <span className="font-semibold text-foreground">{tripId}</span>.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            The registration form, payment and verification steps are coming soon.
          </p>

          <Link
            to="/trips/$tripId"
            params={{ tripId }}
            className="mt-8 inline-flex items-center justify-center rounded-xl border border-input px-5 py-3 text-sm font-medium transition hover:bg-accent"
          >
            Back to trip details
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
