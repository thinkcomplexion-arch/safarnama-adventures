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
  X,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, to: "/admin/" },
  { title: "Trips", icon: Map, to: "/admin/trips" },
  { title: "Itineraries", icon: CalendarDays, to: "/admin/itineraries" },
  { title: "Registrations", icon: Users, to: "/admin/forms" },
  { title: "Finance", icon: CreditCard, to: "/admin/finance" },
  { title: "Gallery", icon: Image, to: "/admin/gallery" },
  { title: "Reviews", icon: MessageSquare, to: "/admin/reviews" },
  { title: "Settings", icon: Settings, to: "/admin/settings" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-background border-r shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h1 className="text-2xl font-bold">
              🌍 Safar Nama
            </h1>

            <p className="text-sm text-muted-foreground">
              Management Portal
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-accent"
          >
            <X size={20} />
          </button>
        </div>


        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;

            return (
              <Link
                key={item.title}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
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
            <button
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

        </nav>
      </aside>
    </>
  );
}
