import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function SectionHeader({ title, description, actions }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 border-b-3 border-ink-black pb-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="font-heading text-2xl font-bold uppercase">{title}</h2>
        {description ? <p className="mt-1 text-ink-black/70">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
