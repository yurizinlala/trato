"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

type TratoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-trato-orange text-paper-cream hover:bg-warning-yellow hover:text-ink-black",
  secondary: "bg-pen-blue text-paper-cream hover:bg-soft-gray hover:text-ink-black",
  outline: "bg-paper-cream text-ink-black hover:bg-soft-gray",
  ghost:
    "bg-transparent text-ink-black shadow-none hover:bg-soft-gray hover:shadow-hard-sm",
  danger: "bg-danger-red text-paper-cream hover:bg-paper-cream hover:text-danger-red",
  success: "bg-success-green text-paper-cream hover:bg-paper-cream hover:text-success-green"
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "min-h-8 px-2.5 py-1 text-xs",
  md: "min-h-10 px-4 py-2 text-sm",
  lg: "min-h-12 px-5 py-3 text-base"
};

export function TratoButton({
  href,
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  type = "button",
  ...props
}: TratoButtonProps) {
  const classes = cn(
    "trato-focus inline-flex items-center justify-center gap-2 border-3 border-ink-black font-heading font-bold uppercase leading-tight shadow-hard transition-all duration-150 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60",
    variantClass[variant],
    sizeClass[size],
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {icon}
      {children}
    </button>
  );
}
