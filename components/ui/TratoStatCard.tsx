import type { ReactNode } from "react";
import { TratoCard } from "@/components/ui/TratoCard";
import { cn } from "@/lib/utils";

type TratoStatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
};

export function TratoStatCard({ label, value, icon, className }: TratoStatCardProps) {
  return (
    <TratoCard className={cn("flex items-center justify-between gap-4 bg-paper-cream", className)}>
      <div>
        <p className="font-mono text-xs font-bold uppercase text-ink-black/75">{label}</p>
        <p className="mt-2 font-heading text-4xl font-bold">{value}</p>
      </div>
      {icon ? <div className="grid h-12 w-12 place-items-center border-3 border-ink-black bg-soft-gray text-pen-blue shadow-hard-sm">{icon}</div> : null}
    </TratoCard>
  );
}
