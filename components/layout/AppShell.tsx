import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-cream text-ink-black">
      <Sidebar />
      <div className="min-h-screen lg:pl-72">
        <Topbar />
        <main className="mx-auto flex w-full max-w-app flex-col gap-10 px-mobile-x py-8 md:px-desktop-x">
          {children}
        </main>
      </div>
    </div>
  );
}
