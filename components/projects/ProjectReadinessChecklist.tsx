"use client";

import { Check } from "lucide-react";
import { TratoCheckbox } from "@/components/ui/TratoCheckbox";
import { TratoProgress } from "@/components/ui/TratoProgress";
import { TratoWindow } from "@/components/ui/TratoWindow";

type ChecklistItem = {
  label: string;
  description: string;
  done: boolean;
};

export function ProjectReadinessChecklist({
  items,
  onToggle
}: {
  items: ChecklistItem[];
  onToggle?: (item: ChecklistItem) => void;
}) {
  const complete = items.filter((item) => item.done).length;
  const progress = Math.round((complete / items.length) * 100);

  return (
    <TratoWindow title="pronto.para.contrato?" tone="orange" className="h-fit">
      <div className="grid gap-4">
        {items.map((item) => (
          <TratoCheckbox
            key={item.label}
            label={item.label}
            helperText={item.description}
            checked={item.done}
            onChange={() => onToggle?.(item)}
          />
        ))}
        {complete === items.length ? (
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-success-green">
            <Check className="h-4 w-4" /> Pronto para contrato
          </div>
        ) : null}
        <TratoProgress value={progress} label={`${progress}% pronto`} />
      </div>
    </TratoWindow>
  );
}
