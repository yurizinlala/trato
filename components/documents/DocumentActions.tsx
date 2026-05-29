"use client";

import { Archive, Copy, Download, FilePenLine } from "lucide-react";
import { documentActionsUnavailableMessage } from "@/lib/document-placeholders";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoWindow } from "@/components/ui/TratoWindow";

export function DocumentActions() {
  const pending = () => window.alert(documentActionsUnavailableMessage);

  return (
    <TratoWindow title="ações.do.documento" tone="blue">
      <div className="grid gap-4">
        <TratoButton icon={<FilePenLine className="h-5 w-5" />}>Editar</TratoButton>
        <div className="grid gap-3 sm:grid-cols-2">
          <TratoButton variant="outline" icon={<Download className="h-5 w-5" />} onClick={pending}>Baixar PDF</TratoButton>
          <TratoButton variant="outline" icon={<Download className="h-5 w-5" />} onClick={pending}>Baixar DOCX</TratoButton>
        </div>
        <TratoButton variant="outline" icon={<Copy className="h-5 w-5" />}>Duplicar</TratoButton>
        <TratoButton variant="danger" icon={<Archive className="h-5 w-5" />}>Arquivar</TratoButton>
      </div>
    </TratoWindow>
  );
}
