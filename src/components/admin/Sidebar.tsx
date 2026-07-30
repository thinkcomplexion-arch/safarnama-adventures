import {
  LayoutDashboard,
  Map,
  CalendarDays,
  Users,
  CreditCard,
  Image,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { title: "Trips", icon: Map, to: "/admin/trips" },
  { title: "Itineraries", icon: CalendarDays, to: "/admin/itineraries" },
  { title: "Registrations", icon: Users, to: "/admin/registrations" },
  { title: "Finance", icon: CreditCard, to: "/admin/finance" },
  { title: "Gallery", icon: Image, to: "/admin/gallery" },
  { title: "Reviews", icon: MessageSquare, to: "/admin/reviews" },
  { title: "Settings", icon: Settings, to: "/admin/settings" },
];

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-background p-2 shadow md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 min-h-screen border-r bg-background transition-all duration-300 md:static ${
          open ? "w-72" : "w-20"
        }`}
      >
        <div className="border-b p-6">
          {open ? (
            <>
              <h1 className="text-2xl font-bold">🌍 Safar Nama</h1>
              <p className="text-sm text-muted-foreground">
                Management Portal
              </p>
            </>
          ) : (
            <h1 className="text-xl font-bold">🌍</h1>
          )}
        </div>

        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;

            return (
              <Link
                key={item.title}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <Icon size={18} />

                {open && (
                  <span>{item.title}</span>
                )}
              </Link>
            );
          })}

          <div className="pt-6">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-50">
              <LogOut size={18} />

              {open && (
                <span>Logout</span>
              )}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
                  }
