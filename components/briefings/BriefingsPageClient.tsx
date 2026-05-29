"use client";

import { Eye, Sparkles } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoTable } from "@/components/ui/TratoTable";
import { briefings } from "@/lib/mock-data";
import { statusLabels } from "@/lib/constants";
import { formatDate, includesNormalized } from "@/lib/utils";

export function BriefingsPageClient() {
  const { clients, projects } = useTratoData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const deferredQuery = useDeferredValue(query);

  const rows = useMemo(
    () =>
      briefings
        .map((briefing) => ({
          ...briefing,
          client: clients.find((item) => item.id === briefing.clientId)?.name ?? "Cliente removido",
          project: projects.find((item) => item.id === briefing.projectId)?.name ?? "Projeto removido"
        }))
        .filter((briefing) =>
          includesNormalized(`${briefing.client} ${briefing.project} ${briefing.projectType} ${briefing.status}`, deferredQuery) &&
          (statusFilter === "todos" || briefing.status === statusFilter)
        ),
    [clients, deferredQuery, projects, statusFilter]
  );

  const actions = (row: (typeof rows)[number]) => (
    <div className="flex flex-wrap gap-2">
      <TratoButton href={`/briefings/${row.id}`} size="sm" variant="outline" icon={<Eye className="h-4 w-4" />}>Ver respostas</TratoButton>
      <TratoButton href={`/escopo/${row.projectId}`} size="sm" icon={<Sparkles className="h-4 w-4" />}>Transformar em escopo</TratoButton>
    </div>
  );

  return (
    <>
      <PageTitle title="Briefings | Trato" />
      <PageHeader title="Briefings" />
      <div className="grid gap-4 md:grid-cols-filters-md">
        <TratoInput label="Busca" placeholder="Cliente, projeto ou tipo..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <TratoSelect
          label="Status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          options={[{ label: "Todos", value: "todos" }, ...Object.entries(statusLabels).map(([value, label]) => ({ label, value }))]}
        />
      </div>
      <TratoTable
        rows={rows}
        getRowKey={(row) => row.id}
        stickyActions
        mobileRender={(briefing) => (
          <div className="grid gap-3">
            <ProjectStatusBadge status={briefing.status} />
            <div>
              <h2 className="font-heading text-xl font-bold">{briefing.client}</h2>
              <p>{briefing.project} · {briefing.projectType}</p>
            </div>
            <p className="font-mono text-xs uppercase">{formatDate(briefing.receivedAt)}</p>
            {actions(briefing)}
          </div>
        )}
        columns={[
          { key: "client", label: "Cliente", priority: "primary", render: (row) => <strong>{row.client}</strong> },
          { key: "project", label: "Projeto" },
          { key: "receivedAt", label: "Data de recebimento", nowrap: true, render: (row) => formatDate(row.receivedAt) },
          { key: "projectType", label: "Tipo de projeto" },
          { key: "status", label: "Status", nowrap: true, render: (row) => <ProjectStatusBadge status={row.status} /> },
          { key: "id", label: "Ações", priority: "actions", render: actions }
        ]}
      />
    </>
  );
}
