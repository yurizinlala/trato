"use client";

import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import { internalRoutes } from "@/lib/routes";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoLogo } from "@/components/ui/TratoLogo";

export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b-3 border-ink-black bg-paper-cream shadow-hard-bottom">
      <div className="flex min-h-20 items-center justify-between gap-4 px-mobile-x md:px-desktop-x">
        <TratoButton
          className="h-11 w-11 p-0 lg:hidden"
          variant="outline"
          size="sm"
          type="button"
          aria-label="Abrir navegação"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu className="h-5 w-5" />
        </TratoButton>

        <GlobalSearch />

        <div className="lg:hidden">
          <TratoLogo compact />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <TratoButton
            className="relative h-11 w-11 p-0 shadow-none"
            variant="ghost"
            size="sm"
            type="button"
            aria-label="Notificações"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-ink-black bg-danger-red" />
          </TratoButton>
          <TratoButton className="hidden sm:inline-flex" href="/projetos/novo">
            Novo trato
          </TratoButton>
        </div>
      </div>

      {open ? (
        <nav className="grid gap-2 border-t-3 border-ink-black bg-paper-cream p-4 lg:hidden">
          {internalRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <TratoButton
                key={route.href}
                className="justify-start shadow-hard-sm"
                variant="outline"
                size="sm"
                href={route.href}
              >
                <Icon className="h-4 w-4" />
                {route.label}
              </TratoButton>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
