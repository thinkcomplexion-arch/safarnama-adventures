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

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Trips", icon: Map },
  { title: "Itineraries", icon: CalendarDays },
  { title: "Registrations", icon: Users },
  { title: "Finance", icon: CreditCard },
  { title: "Gallery", icon: Image },
  { title: "Reviews", icon: MessageSquare },
  { title: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-72 min-h-screen border-r bg-background">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">🌍 Safar Nama</h1>
        <p className="text-sm text-muted-foreground">
          Management Portal
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition hover:bg-accent"
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </button>
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
