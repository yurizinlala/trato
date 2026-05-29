import type { ReactNode } from "react";
import { FileX2 } from "lucide-react";
import { TratoButton } from "@/components/ui/TratoButton";
import { cn } from "@/lib/utils";

type TratoEmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: ReactNode;
  className?: string;
};

export function TratoEmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
  className
}: TratoEmptyStateProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-2xl place-items-center gap-4 border-3 border-ink-black bg-paper-cream bg-dot-grid p-10 text-center shadow-hard-lg",
        className
      )}
    >
      <div className="grid h-20 w-20 rotate-3 place-items-center border-3 border-ink-black bg-soft-gray shadow-hard-sm">
        {icon ?? <FileX2 className="h-10 w-10" />}
      </div>
      <h2 className="font-heading text-3xl font-bold uppercase">{title}</h2>
      <p className="max-w-md text-lg text-ink-black/75">{description}</p>
      {actionLabel && actionHref ? (
        <TratoButton href={actionHref}>{actionLabel}</TratoButton>
      ) : null}
    </div>
  );
}
