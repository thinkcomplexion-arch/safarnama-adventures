import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">

      <Topbar onMenuClick={() => setMenuOpen(true)} />

      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main>
        <div className="p-6">
          {children}
        </div>
      </main>

    </div>
  );
}
