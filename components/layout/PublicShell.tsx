import type { ReactNode } from "react";
import { TratoLogo } from "@/components/ui/TratoLogo";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-paper-cream px-mobile-x py-10 text-ink-black md:px-desktop-x">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <TratoLogo href="" compact />
        {children}
        <footer className="font-mono text-xs font-bold uppercase text-ink-black/70">
          © Trato Estúdio Criativo. Confidencial.
        </footer>
      </div>
    </main>
  );
}
