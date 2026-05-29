"use client";

import { Archive, Copy, Download, FilePenLine } from "lucide-react";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoWindow } from "@/components/ui/TratoWindow";

export function DocumentActions({ documentId }: { documentId: string }) {
  return (
    <TratoWindow title="ações.do.documento" tone="blue">
      <div className="grid gap-4">
        <TratoButton icon={<FilePenLine className="h-5 w-5" />}>Editar</TratoButton>
        <div className="grid gap-3 sm:grid-cols-2">
          <TratoButton href={`/api/documents/${documentId}/pdf`} variant="outline" icon={<Download className="h-5 w-5" />}>Baixar PDF</TratoButton>
          <TratoButton href={`/api/documents/${documentId}/docx`} variant="outline" icon={<Download className="h-5 w-5" />}>Baixar DOCX</TratoButton>
        </div>
        <TratoButton variant="outline" icon={<Copy className="h-5 w-5" />}>Duplicar</TratoButton>
        <TratoButton variant="danger" icon={<Archive className="h-5 w-5" />}>Arquivar</TratoButton>
      </div>
    </TratoWindow>
  );
}
