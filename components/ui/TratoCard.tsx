import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "accent" | "warning" | "document" | "compact";

type TratoCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantClass: Record<CardVariant, string> = {
  default: "bg-surface",
  elevated: "bg-paper-cream shadow-hard-lg",
  accent: "bg-pen-blue text-paper-cream",
  warning: "bg-warning-yellow",
  document: "bg-paper-cream",
  compact: "bg-soft-sand p-3 shadow-hard-sm"
};

export function TratoCard({
  variant = "default",
  className,
  children,
  ...props
}: TratoCardProps) {
  return (
    <div
      className={cn(
        "motion-safe:animate-fade-up border-3 border-ink-black p-5 shadow-hard",
        variantClass[variant],
        variant !== "compact" && "min-w-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
