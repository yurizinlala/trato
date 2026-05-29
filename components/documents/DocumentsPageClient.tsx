"use client";

import { Archive, Download, Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoTable } from "@/components/ui/TratoTable";
import { documents } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function DocumentsPageClient() {
  const { clients, projects } = useTratoData();
  const rows = documents.map((document) => ({
    ...document,
    client: clients.find((client) => client.id === document.clientId)?.name ?? "Cliente removido",
    project: projects.find((project) => project.id === document.projectId)?.name ?? "Projeto removido"
  }));
  const actions = (row: (typeof rows)[number]) => (
    <div className="flex flex-wrap gap-2">
      <TratoButton href={`/documentos/${row.id}`} size="sm" variant="outline" icon={<Eye className="h-4 w-4" />}>Visualizar</TratoButton>
      <TratoButton href={`/api/documents/${row.id}/pdf`} size="sm" variant="outline" icon={<Download className="h-4 w-4" />}>PDF</TratoButton>
      <TratoButton href={`/api/documents/${row.id}/docx`} size="sm" variant="outline" icon={<Download className="h-4 w-4" />}>DOCX</TratoButton>
      <TratoButton size="sm" variant="danger" icon={<Archive className="h-4 w-4" />}>Arquivar</TratoButton>
    </div>
  );

  return (
    <>
      <PageTitle title="Documentos | Trato" />
      <PageHeader title="Documentos" eyebrow="Propostas, contratos e anexos" />
      <TratoTable
        rows={rows}
        getRowKey={(row) => row.id}
        stickyActions
        mobileRender={(document) => (
          <div className="grid gap-3">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-ink-black/65">{document.type}</p>
              <h2 className="font-heading text-xl font-bold">{document.title}</h2>
              <p>{document.client} · {document.project}</p>
            </div>
            <p className="font-mono text-xs uppercase">{formatDate(document.date)}</p>
            {actions(document)}
          </div>
        )}
        columns={[
          { key: "title", label: "Documento", priority: "primary", render: (row) => <strong>{row.title}</strong> },
          { key: "type", label: "Tipo" },
          { key: "client", label: "Cliente" },
          { key: "project", label: "Projeto" },
          { key: "date", label: "Data", nowrap: true, render: (row) => formatDate(row.date) },
          { key: "id", label: "Ações", priority: "actions", render: actions }
        ]}
      />
    </>
  );
}
