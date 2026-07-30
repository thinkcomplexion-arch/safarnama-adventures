import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
