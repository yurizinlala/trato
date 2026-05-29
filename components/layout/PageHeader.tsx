import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ title, eyebrow, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("motion-safe:animate-fade-up flex flex-col gap-5 border-b-3 border-ink-black pb-6 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="grid gap-3">
        {eyebrow ? (
          <p className="font-mono text-sm font-bold uppercase text-ink-black/70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-heading text-4xl font-bold uppercase leading-none md:text-5xl">
          {title}
        </h1>
        {description ? <p className="max-w-3xl text-lg text-ink-black/75">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
