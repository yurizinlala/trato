import { Eye, Plus } from "lucide-react";
import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { TratoBadge } from "@/components/ui/TratoBadge";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoTable } from "@/components/ui/TratoTable";
import { clients, contracts, projects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contratos"
};

export default function ContractsPage() {
  const rows = contracts.map((contract) => ({
    ...contract,
    client: clients.find((client) => client.id === contract.clientId)?.name ?? "Cliente",
    project: projects.find((project) => project.id === contract.projectId)?.name ?? "Projeto"
  }));

  return (
    <AppShell>
      <PageHeader
        title="Contratos"
        eyebrow="Minutas e assinatura externa"
        actions={<TratoButton href="/contratos/novo" icon={<Plus className="h-5 w-5" />}>Novo contrato</TratoButton>}
      />
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2"><TratoInput label="Busca" placeholder="Nome, cliente ou projeto..." /></div>
        <TratoSelect label="Cliente" options={[{ label: "Todos", value: "todos" }, ...clients.map((client) => ({ label: client.name, value: client.id }))]} />
        <TratoSelect label="Status" options={[{ label: "Todos", value: "todos" }, { label: "Rascunho", value: "rascunho" }, { label: "Gerado", value: "gerado" }, { label: "Enviado", value: "enviado" }, { label: "Assinado externamente", value: "assinado" }, { label: "Arquivado", value: "arquivado" }]} />
      </div>
      <TratoTable
        rows={rows}
        getRowKey={(row) => row.id}
        columns={[
          { key: "name", label: "Nome do contrato", render: (row) => <strong>{row.name}</strong> },
          { key: "client", label: "Cliente" },
          { key: "project", label: "Projeto" },
          { key: "status", label: "Status", render: (row) => <TratoBadge status={row.status} /> },
          { key: "createdAt", label: "Data de criação", render: (row) => formatDate(row.createdAt) },
          { key: "updatedAt", label: "Última edição", render: (row) => formatDate(row.updatedAt) },
          { key: "id", label: "Ações", render: (row) => <TratoButton href={`/contratos/${row.id}`} size="sm" variant="outline" icon={<Eye className="h-4 w-4" />}>Abrir</TratoButton> }
        ]}
      />
    </AppShell>
  );
}
