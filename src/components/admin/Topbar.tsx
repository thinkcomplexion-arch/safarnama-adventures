import { Bell, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";

export function Topbar() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();

    navigate({
      to: "/login",
    });
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="text-xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-muted-foreground">
          Welcome to Safar Nama Management Portal
        </p>
      </div>


      <div className="flex items-center gap-4">

        <button className="rounded-full p-2 transition hover:bg-accent">
          <Bell className="h-5 w-5" />
        </button>


        <div className="flex items-center gap-3">

          <UserCircle className="h-9 w-9" />

          <div>
            <p className="text-sm font-semibold">
              {profile?.name || "Admin"}
            </p>

            <p className="text-xs text-muted-foreground capitalize">
              {profile?.role || "Administrator"}
            </p>
          </div>


          <button
            onClick={handleLogout}
            className="ml-2 rounded-full p-2 transition hover:bg-accent"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>

        </div>

      </div>
    </header>
  );
