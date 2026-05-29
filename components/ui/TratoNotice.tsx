import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type NoticeTone = "success" | "warning" | "danger" | "info";

type TratoNoticeProps = HTMLAttributes<HTMLDivElement> & {
  tone?: NoticeTone;
};

const toneClass: Record<NoticeTone, string> = {
  success: "bg-success-green text-paper-cream",
  warning: "bg-warning-yellow text-ink-black",
  danger: "bg-danger-red text-paper-cream",
  info: "bg-soft-gray text-ink-black"
};

export function TratoNotice({ tone = "info", className, children, ...props }: TratoNoticeProps) {
  return (
    <div
      className={cn(
        "border-2 border-ink-black px-3 py-2 font-mono text-sm font-bold uppercase shadow-hard-sm",
        toneClass[tone],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
