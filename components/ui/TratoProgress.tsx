import { cn } from "@/lib/utils";

type TratoProgressProps = {
  value: number;
  label?: string;
  className?: string;
};

export function TratoProgress({ value, label, className }: TratoProgressProps) {
  const bounded = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("grid gap-2", className)}>
      {label ? <span className="font-mono text-xs font-bold uppercase">{label}</span> : null}
      <div className="h-5 border-3 border-ink-black bg-paper-cream">
        <div className="h-full border-r-3 border-ink-black bg-warning-yellow" style={{ width: `${bounded}%` }} />
      </div>
    </div>
  );
}
