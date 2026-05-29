"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { internalRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoLogo } from "@/components/ui/TratoLogo";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r-3 border-ink-black bg-paper-cream p-6 shadow-hard-right lg:flex">
      <div className="grid gap-2">
        <TratoLogo />
        <span className="font-mono text-sm font-bold uppercase text-ink-black/70">
          Estúdio Criativo
        </span>
      </div>

      <TratoButton href="/projetos/novo" icon={<Plus className="h-5 w-5" />} className="mt-8">
        Novo projeto
      </TratoButton>

      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {internalRoutes.map((route) => {
          const active =
            pathname === route.href ||
            (route.href !== "/dashboard" && pathname.startsWith(route.href));
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              className={cn(
                "trato-focus flex items-center gap-4 border-3 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase transition-all",
                active
                  ? "border-ink-black bg-trato-orange text-paper-cream shadow-hard"
                  : "text-ink-black/75 hover:border-ink-black hover:bg-soft-gray"
              )}
              href={route.href}
            >
              <Icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
