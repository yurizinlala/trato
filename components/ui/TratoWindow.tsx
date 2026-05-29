import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TratoWindowProps = {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  tone?: "default" | "blue" | "orange" | "dark";
};

const toneClass = {
  default: "bg-soft-gray text-ink-black",
  blue: "bg-pen-blue text-paper-cream",
  orange: "bg-trato-orange text-paper-cream",
  dark: "bg-ink-black text-paper-cream"
};

export function TratoWindow({
  title,
  actions,
  children,
  className,
  bodyClassName,
  tone = "default"
}: TratoWindowProps) {
  return (
    <section className={cn("border-3 border-ink-black bg-paper-cream shadow-hard-lg", className)}>
      <header
        className={cn(
          "flex min-h-12 items-center justify-between gap-4 border-b-3 border-ink-black px-4 py-2 font-mono text-sm font-bold uppercase",
          toneClass[tone]
        )}
      >
        <span className="truncate">{title}</span>
        <div className="flex items-center gap-2">
          {actions}
          <span className="hidden gap-1 sm:flex" aria-hidden>
            <i className="h-3 w-3 border-2 border-current bg-paper-cream" />
            <i className="h-3 w-3 border-2 border-current bg-paper-cream" />
          </span>
        </div>
      </header>
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}
