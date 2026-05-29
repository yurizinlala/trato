"use client";

import { cn } from "@/lib/utils";
import { TratoButton } from "@/components/ui/TratoButton";

type Tab = {
  label: string;
  value: string;
};

type TratoTabsProps = {
  tabs: Tab[];
  active: string;
  onChange?: (value: string) => void;
};

export function TratoTabs({ tabs, active, onChange }: TratoTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b-3 border-ink-black pb-3">
      {tabs.map((tab) => (
        <TratoButton
          key={tab.value}
          className={cn(
            "shadow-none hover:shadow-hard-sm",
            active === tab.value
              ? "border-ink-black bg-ink-black text-paper-cream shadow-hard-sm"
              : "border-transparent text-ink-black hover:border-ink-black hover:bg-soft-gray"
          )}
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => onChange?.(tab.value)}
        >
          {tab.label}
        </TratoButton>
      ))}
    </div>
  );
}
