import { Bell, UserCircle } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Welcome to Safar Nama Management Portal
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 transition hover:bg-accent">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle className="h-9 w-9" />
          <div>
            <p className="text-sm font-semibold">Owner</p>
            <p className="text-xs text-muted-foreground">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
