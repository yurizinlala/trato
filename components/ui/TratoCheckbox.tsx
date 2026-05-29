"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TratoCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

function toSafeId(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const TratoCheckbox = forwardRef<HTMLInputElement, TratoCheckboxProps>(
  ({ label, helperText, error, className, id, ...props }, ref) => {
    const fieldId = id ?? toSafeId(`${props.name ?? "checkbox"}-${String(props.value ?? label)}`);
    return (
      <label
        className={cn(
          "flex cursor-pointer items-start gap-3 border-2 border-ink-black bg-paper-cream p-3 shadow-hard-sm transition hover:bg-soft-gray",
          className
        )}
        htmlFor={fieldId}
      >
        <input
          id={fieldId}
          ref={ref}
          type="checkbox"
          className="trato-focus mt-0.5 h-5 w-5 shrink-0 appearance-none border-2 border-ink-black bg-paper-cream checked:bg-success-green"
          {...props}
        />
        <span className="grid gap-1">
          <span className="font-body text-sm font-bold">{label}</span>
          {helperText ? <span className="text-sm text-ink-black/70">{helperText}</span> : null}
          {error ? <span className="font-mono text-xs font-bold uppercase text-danger-red">{error}</span> : null}
        </span>
      </label>
    );
  }
);

TratoCheckbox.displayName = "TratoCheckbox";
