import { X } from "lucide-react";

interface CreateTripDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CreateTripDrawer({
  open,
  onClose,
}: CreateTripDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-background p-6 shadow-xl">

        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold">
              Create Trip
            </h2>
            <p className="text-sm text-muted-foreground">
              Add a new travel experience.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-accent"
          >
            <X size={20} />
          </button>
        </div>


        <div className="mt-6 space-y-5">

          <div>
            <label className="text-sm font-medium">
              Trip Title
            </label>
            <input
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3"
              placeholder="Example: Himalayan Adventure"
            />
          </div>


          <div>
            <label className="text-sm font-medium">
              Location
            </label>
            <input
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3"
              placeholder="Example: Manali"
            />
          </div>


          <div>
            <label className="text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3"
              placeholder="18000"
            />
          </div>


          <div>
            <label className="text-sm font-medium">
              Duration
            </label>
            <input
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3"
              placeholder="6 Days / 5 Nights"
            />
          </div>


          <div>
            <label className="text-sm font-medium">
              Season
            </label>
            <input
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3"
              placeholder="April - June"
            />
          </div>


          <div>
            <label className="text-sm font-medium">
              Description
            </label>
            <textarea
              rows={5}
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3"
              placeholder="Describe your trip..."
            />
          </div>


          <div>
            <label className="text-sm font-medium">
              Status
            </label>

            <select className="mt-2 w-full rounded-xl border bg-background px-4 py-3">
              <option value="draft">
                Draft
              </option>
              <option value="published">
                Published
              </option>
              <option value="archived">
                Archived
              </option>
            </select>
          </div>


          <div className="flex gap-3 pt-4">
            <button
              className="flex-1 rounded-xl border px-5 py-3"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="flex-1 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
            >
              Save Trip
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
