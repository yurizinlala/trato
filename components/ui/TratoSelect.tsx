"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TratoSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  helperText?: string;
  error?: string;
  options?: Array<{ label: string; value: string }>;
};

export const TratoSelect = forwardRef<HTMLSelectElement, TratoSelectProps>(
  ({ label, helperText, error, options, className, id, children, ...props }, ref) => {
    const fieldId = id ?? props.name ?? label;
    return (
      <label className="grid gap-2 font-body text-sm font-medium text-ink-black" htmlFor={fieldId}>
        <span className="font-mono text-xs font-bold uppercase">{label}</span>
        <select
          id={fieldId}
          ref={ref}
          className={cn(
            "trato-focus min-h-11 w-full border-3 border-ink-black bg-soft-gray px-3 py-2.5 font-body text-sm text-ink-black shadow-hard-sm focus:border-trato-orange focus:bg-paper-cream",
            error && "border-danger-red bg-paper-cream",
            className
          )}
          {...props}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        {helperText && !error ? <span className="text-sm text-ink-black/70">{helperText}</span> : null}
        {error ? <span className="font-mono text-xs font-bold uppercase text-danger-red">{error}</span> : null}
      </label>
    );
  }
);

TratoSelect.displayName = "TratoSelect";
