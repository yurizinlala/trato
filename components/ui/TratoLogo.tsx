import Link from "next/link";
import { cn } from "@/lib/utils";

type TratoLogoProps = {
  href?: string;
  compact?: boolean;
  className?: string;
  inverted?: boolean;
};

export function TratoLogo({
  href = "/dashboard",
  compact,
  className
}: TratoLogoProps) {
  const content = (
    <span
      className={cn(
        "inline-flex -rotate-trato border-3 border-ink-black bg-paper-cream px-3 py-1 font-heading text-4xl font-black uppercase leading-none text-ink-black shadow-hard-sm transition-transform hover:-translate-y-0.5",
        compact && "text-2xl",
        className
      )}
    >
      Trato
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
