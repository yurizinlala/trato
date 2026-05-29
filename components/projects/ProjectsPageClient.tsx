"use client";

import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoModal } from "@/components/ui/TratoModal";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoTable } from "@/components/ui/TratoTable";
import { projectTypes, statusLabels } from "@/lib/constants";
import { formatCurrency, includesNormalized } from "@/lib/utils";
import type { Project } from "@/types/project";
import type { TratoStatus } from "@/types/status";

export function ProjectsPageClient() {
  const { clients, projects, deleteProject } = useTratoData();
  const [query, setQuery] = useState("");
  const [clientFilter, setClientFilter] = useState("todos");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [deadlineFilter, setDeadlineFilter] = useState("todos");
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const deferredQuery = useDeferredValue(query);

  const clientName = (clientId: string) =>
    clients.find((client) => client.id === clientId)?.name ?? "Cliente removido";

  const rows = useMemo(
    () =>
      projects
        .map((project) => ({ ...project, clientName: clientName(project.clientId) }))
        .filter((project) => {
          const deadline = new Date(project.deadline).getTime();
          const today = new Date();
          const in30 = new Date(today);
          const in60 = new Date(today);
          in30.setDate(today.getDate() + 30);
          in60.setDate(today.getDate() + 60);
          const matchesDeadline =
            deadlineFilter === "todos" ||
            (deadlineFilter === "30" && deadline <= in30.getTime()) ||
            (deadlineFilter === "60" && deadline <= in60.getTime()) ||
            (deadlineFilter === "futuros" && deadline > in60.getTime());

          return (
            includesNormalized(`${project.name} ${project.clientName} ${project.type} ${project.status}`, deferredQuery) &&
            (clientFilter === "todos" || project.clientId === clientFilter) &&
            (typeFilter === "todos" || project.type === typeFilter) &&
            (statusFilter === "todos" || project.status === statusFilter) &&
            matchesDeadline
          );
        }),
    [clientFilter, deadlineFilter, deferredQuery, projects, statusFilter, typeFilter, clients]
  );

  const actions = (project: Project) => (
    <div className="flex flex-wrap gap-2">
      <TratoButton href={`/projetos/${project.id}`} size="sm" variant="outline" icon={<Eye className="h-4 w-4" />}>Ver</TratoButton>
      <TratoButton href={`/projetos/${project.id}/editar`} size="sm" variant="outline" icon={<Edit className="h-4 w-4" />}>Editar</TratoButton>
      <TratoButton size="sm" variant="danger" icon={<Trash2 className="h-4 w-4" />} onClick={() => setPendingDelete(project)}>Excluir</TratoButton>
    </div>
  );

  return (
    <>
      <PageTitle title="Projetos | Trato" />
      <PageHeader
        title="Projetos"
        eyebrow="Workspaces internos"
        actions={<TratoButton href="/projetos/novo" icon={<Plus className="h-5 w-5" />}>Novo projeto</TratoButton>}
      />
      <div className="grid gap-4 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <TratoInput label="Busca" placeholder="Filtrar projetos..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <TratoSelect label="Cliente" value={clientFilter} onChange={(event) => setClientFilter(event.target.value)} options={[{ label: "Todos", value: "todos" }, ...clients.map((client) => ({ label: client.name, value: client.id }))]} />
        <TratoSelect label="Tipo" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} options={[{ label: "Todos", value: "todos" }, ...projectTypes.map((type) => ({ label: type, value: type }))]} />
        <TratoSelect label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} options={[{ label: "Todos", value: "todos" }, ...Object.entries(statusLabels).map(([value, label]) => ({ label, value }))]} />
        <TratoSelect
          label="Prazo"
          value={deadlineFilter}
          onChange={(event) => setDeadlineFilter(event.target.value)}
          options={[
            { label: "Todos", value: "todos" },
            { label: "Até 30 dias", value: "30" },
            { label: "Até 60 dias", value: "60" },
            { label: "Depois de 60 dias", value: "futuros" }
          ]}
        />
      </div>
      <TratoTable
        rows={rows}
        getRowKey={(row) => row.id}
        stickyActions
        mobileRender={(project) => (
          <div className="grid gap-3">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-ink-black/65">{project.clientName}</p>
              <h2 className="font-heading text-xl font-bold">{project.name}</h2>
            </div>
            <ProjectStatusBadge status={project.status as TratoStatus} />
            <p>{project.type} · {formatCurrency(project.finalPrice)}</p>
            {actions(project)}
          </div>
        )}
        columns={[
          { key: "name", label: "Nome do projeto", priority: "primary", render: (row) => <strong>{row.name}</strong> },
          { key: "clientName", label: "Cliente" },
          { key: "type", label: "Tipo" },
          { key: "status", label: "Status", nowrap: true, render: (row) => <ProjectStatusBadge status={row.status as TratoStatus} /> },
          { key: "finalPrice", label: "Valor final", nowrap: true, render: (row) => formatCurrency(row.finalPrice) },
          { key: "id", label: "Ações", priority: "actions", render: actions }
        ]}
      />

      <TratoModal open={Boolean(pendingDelete)} title="excluir.projeto" onClose={() => setPendingDelete(null)}>
        <div className="grid gap-4">
          <p>Excluir este projeto remove o registro apenas desta sessão mockada.</p>
          <div className="flex flex-wrap gap-3">
            <TratoButton
              variant="danger"
              onClick={async () => {
                if (pendingDelete) await deleteProject(pendingDelete.id);
                setPendingDelete(null);
              }}
            >
              Excluir
            </TratoButton>
            <TratoButton variant="outline" onClick={() => setPendingDelete(null)}>Cancelar</TratoButton>
          </div>
        </div>
      </TratoModal>
    </>
  );
}
