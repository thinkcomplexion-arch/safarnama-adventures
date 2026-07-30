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

export function Sidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <aside className="w-72 min-h-screen border-r bg-background">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">🌍 Safar Nama</h1>
        <p className="text-sm text-muted-foreground">
          Management Portal
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;

          return (
            <Link
              key={item.title}
              to={item.to}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </Link>
          );
        })}

        <div className="pt-6">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-50">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>
    </aside>
    );
    }
