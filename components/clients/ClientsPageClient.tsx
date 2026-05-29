"use client";

import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTitle } from "@/components/layout/PageTitle";
import { useTratoData } from "@/components/providers/TratoDataProvider";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoEmptyState } from "@/components/ui/TratoEmptyState";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoModal } from "@/components/ui/TratoModal";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoTable } from "@/components/ui/TratoTable";
import { brazilianStates } from "@/lib/constants";
import { onlyDigits } from "@/lib/formatters";
import { includesNormalized } from "@/lib/utils";
import type { Client } from "@/types/client";

export function ClientsPageClient() {
  const { clients, deleteClient } = useTratoData();
  const [query, setQuery] = useState("");
  const [documentType, setDocumentType] = useState("todos");
  const [stateFilter, setStateFilter] = useState("todos");
  const [projectFilter, setProjectFilter] = useState("todos");
  const [pendingDelete, setPendingDelete] = useState<Client | null>(null);
  const deferredQuery = useDeferredValue(query);

  const rows = useMemo(
    () =>
      clients.filter((client) => {
        const searchable = `${client.name} ${client.company} ${client.email} ${client.whatsapp} ${client.city} ${client.state}`;
        const digits = onlyDigits(client.document);
        const matchesDocument =
          documentType === "todos" ||
          (documentType === "cpf" && digits.length === 11) ||
          (documentType === "cnpj" && digits.length === 14);
        const matchesState = stateFilter === "todos" || client.state === stateFilter;
        const matchesProjects =
          projectFilter === "todos" ||
          (projectFilter === "com-projetos" && client.projectIds.length > 0) ||
          (projectFilter === "sem-projetos" && client.projectIds.length === 0);
        return includesNormalized(searchable, deferredQuery) && matchesDocument && matchesState && matchesProjects;
      }),
    [clients, deferredQuery, documentType, projectFilter, stateFilter]
  );

  const actions = (client: Client) => (
    <div className="flex flex-wrap gap-2">
      <TratoButton href={`/clientes/${client.id}`} size="sm" variant="outline" icon={<Eye className="h-4 w-4" />}>
        Ver
      </TratoButton>
      <TratoButton href={`/clientes/${client.id}/editar`} size="sm" variant="outline" icon={<Edit className="h-4 w-4" />}>
        Editar
      </TratoButton>
      <TratoButton size="sm" variant="danger" icon={<Trash2 className="h-4 w-4" />} onClick={() => setPendingDelete(client)}>
        Excluir
      </TratoButton>
    </div>
  );

  return (
    <>
      <PageTitle title="Clientes | Trato" />
      <PageHeader
        title="Clientes"
        eyebrow="Gerenciamento de contatos e entidades"
        actions={<TratoButton href="/clientes/novo" icon={<Plus className="h-5 w-5" />}>Novo cliente</TratoButton>}
      />
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <TratoInput label="Busca" placeholder="Filtrar clientes..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <TratoSelect
          label="CPF/CNPJ"
          value={documentType}
          onChange={(event) => setDocumentType(event.target.value)}
          options={[
            { label: "Todos", value: "todos" },
            { label: "CPF", value: "cpf" },
            { label: "CNPJ", value: "cnpj" }
          ]}
        />
        <TratoSelect
          label="Estado"
          value={stateFilter}
          onChange={(event) => setStateFilter(event.target.value)}
          options={[{ label: "Todos", value: "todos" }, ...brazilianStates.map((state) => ({ label: state, value: state }))]}
        />
        <TratoSelect
          label="Projetos"
          value={projectFilter}
          onChange={(event) => setProjectFilter(event.target.value)}
          options={[
            { label: "Todos", value: "todos" },
            { label: "Com projetos", value: "com-projetos" },
            { label: "Sem projetos", value: "sem-projetos" }
          ]}
        />
      </div>
      <TratoTable
        rows={rows}
        getRowKey={(row) => row.id}
        stickyActions
        empty={<TratoEmptyState title="Sem registros" description="Nenhum cliente encontrado com os filtros atuais." actionLabel="Adicionar cliente" actionHref="/clientes/novo" />}
        mobileRender={(client) => (
          <div className="grid gap-3">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-ink-black/65">{client.company}</p>
              <h2 className="font-heading text-xl font-bold">{client.name}</h2>
              <p className="text-sm">{client.email}</p>
            </div>
            <p className="font-mono text-xs uppercase">{client.whatsapp} · {client.city}/{client.state}</p>
            {actions(client)}
          </div>
        )}
        columns={[
          { key: "name", label: "Nome", priority: "primary", render: (row) => <strong>{row.name}</strong> },
          { key: "email", label: "E-mail" },
          { key: "whatsapp", label: "WhatsApp", nowrap: true, render: (row) => <span className="font-mono">{row.whatsapp}</span> },
          { key: "city", label: "Cidade/UF", render: (row) => `${row.city}/${row.state}` },
          { key: "projectIds", label: "Projetos", nowrap: true, render: (row) => <span className="inline-block border-2 border-ink-black bg-trato-orange px-2 py-1 font-mono text-paper-cream">{row.projectIds.length}</span> },
          { key: "id", label: "Ações", priority: "actions", render: actions }
        ]}
      />

      <TratoModal open={Boolean(pendingDelete)} title="excluir.cliente" onClose={() => setPendingDelete(null)}>
        <div className="grid gap-4">
          <p>Excluir este cliente remove o registro apenas desta sessão mockada.</p>
          <div className="flex flex-wrap gap-3">
            <TratoButton
              variant="danger"
              onClick={() => {
                if (pendingDelete) deleteClient(pendingDelete.id);
                setPendingDelete(null);
              }}
            >
              Excluir
            </TratoButton>
            <TratoButton variant="outline" onClick={() => setPendingDelete(null)}>
              Cancelar
            </TratoButton>
          </div>
        </div>
      </TratoModal>
    </>
  );
}
