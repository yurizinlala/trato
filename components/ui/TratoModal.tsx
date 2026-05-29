"use client";

import type { ReactNode } from "react";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoWindow } from "@/components/ui/TratoWindow";

type TratoModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function TratoModal({ open, title, children, onClose }: TratoModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink-black/55 p-4">
      <TratoWindow
        title={title}
        className="w-full max-w-xl"
        actions={
          <TratoButton size="sm" variant="ghost" onClick={onClose}>
            Fechar
          </TratoButton>
        }
      >
        {children}
      </TratoWindow>
    </div>
  );
}
