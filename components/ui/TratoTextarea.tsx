"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TratoTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

export const TratoTextarea = forwardRef<HTMLTextAreaElement, TratoTextareaProps>(
  ({ label, helperText, error, className, id, ...props }, ref) => {
    const fieldId = id ?? props.name ?? label;
    return (
      <label className="grid gap-2 font-body text-sm font-medium text-ink-black" htmlFor={fieldId}>
        <span className="font-mono text-xs font-bold uppercase">{label}</span>
        <textarea
          id={fieldId}
          ref={ref}
          className={cn(
            "trato-focus min-h-28 w-full resize-y border-3 border-ink-black bg-soft-gray px-3 py-2.5 font-body text-sm text-ink-black shadow-hard-sm placeholder:text-ink-black/45 focus:border-trato-orange focus:bg-paper-cream",
            error && "border-danger-red bg-paper-cream",
            className
          )}
          {...props}
        />
        {helperText && !error ? <span className="text-sm text-ink-black/70">{helperText}</span> : null}
        {error ? <span className="font-mono text-xs font-bold uppercase text-danger-red">{error}</span> : null}
      </label>
    );
  }
);

TratoTextarea.displayName = "TratoTextarea";
