"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TratoInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
  hideLabel?: boolean;
  leftIcon?: ReactNode;
  wrapperClassName?: string;
};

export const TratoInput = forwardRef<HTMLInputElement, TratoInputProps>(
  ({ label, helperText, error, className, id, hideLabel, leftIcon, wrapperClassName, ...props }, ref) => {
    const fieldId = id ?? props.name ?? label;
    return (
      <label
        className={cn("grid gap-2 font-body text-sm font-medium text-ink-black", wrapperClassName)}
        htmlFor={fieldId}
      >
        <span className={cn("font-mono text-xs font-bold uppercase", hideLabel && "sr-only")}>
          {label}
        </span>
        <span className="relative block">
          {leftIcon ? (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-black/60">
              {leftIcon}
            </span>
          ) : null}
          <input
            id={fieldId}
            ref={ref}
            className={cn(
              "trato-focus min-h-11 w-full border-3 border-ink-black bg-soft-gray px-3 py-2.5 font-body text-sm text-ink-black shadow-hard-sm placeholder:text-ink-black/45 focus:border-trato-orange focus:bg-paper-cream",
              leftIcon && "pl-12",
              error && "border-danger-red bg-paper-cream",
              className
            )}
            {...props}
          />
        </span>
        {helperText && !error ? <span className="text-sm text-ink-black/70">{helperText}</span> : null}
        {error ? <span className="font-mono text-xs font-bold uppercase text-danger-red">{error}</span> : null}
      </label>
    );
  }
);

TratoInput.displayName = "TratoInput";
