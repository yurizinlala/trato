"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { clients as seedClients, projects as seedProjects } from "@/lib/mock-data";
import { deadlineDateFromDays, formatDeadlineDays } from "@/lib/deadlines";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ClientFormValues } from "@/lib/schemas/client.schema";
import type { ProjectFormValues } from "@/lib/schemas/project.schema";
import type { Client } from "@/types/client";
import type { Project, ProjectHistoryEvent, ProjectScope, ProjectType } from "@/types/project";

type ReadinessState = Record<string, Record<string, boolean>>;

type TratoDataState = {
  clients: Client[];
  projects: Project[];
  readiness: ReadinessState;
  createClient: (values: ClientFormValues) => Promise<Client>;
  updateClient: (id: string, values: ClientFormValues) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  createProject: (values: ProjectFormValues) => Promise<Project>;
  updateProject: (id: string, values: ProjectFormValues) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  toggleProjectReadinessItem: (projectId: string, label: string, fallback: boolean) => Promise<void>;
};

const STORAGE_KEY = "trato:mock-data:v1";

const TratoDataContext = createContext<TratoDataState | null>(null);

type ClientRow = {
  id: string;
  name: string;
  company: string;
  document: string;
  email: string;
  whatsapp: string;
  city: string;
  state: string;
  address: string | null;
  notes: string | null;
  last_activity: string;
};

type ProjectRow = {
  id: string;
  client_id: string;
  name: string;
  type: ProjectType;
  status: Project["status"];
  description: string;
  objective: string;
  desired_deadline: string;
  deadline: string;
  suggested_price: number;
  final_price: number;
  payment_terms: string;
  updated_at: string;
  created_at: string;
  briefing_id: string | null;
  contract_ids: string[] | null;
  document_ids: string[] | null;
  scope: ProjectScope;
};

type ProjectHistoryRow = {
  id: string;
  project_id: string;
  title: string;
  event_date: string;
  event_type: ProjectHistoryEvent["type"];
  detail: string | null;
};

type ReadinessRow = {
  project_id: string;
  label: string;
  done: boolean;
};

function slug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 36);
}

function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  return createSupabaseBrowserClient();
}

function clientToRow(client: Client) {
  return {
    id: client.id,
    name: client.name,
    company: client.company,
    document: client.document,
    email: client.email,
    whatsapp: client.whatsapp,
    city: client.city,
    state: client.state,
    address: client.address ?? null,
    notes: client.notes,
    last_activity: client.lastActivity
  };
}

function projectToRow(project: Project) {
  return {
    id: project.id,
    client_id: project.clientId,
    name: project.name,
    type: project.type,
    status: project.status,
    description: project.description,
    objective: project.objective,
    desired_deadline: project.desiredDeadline,
    deadline: project.deadline,
    suggested_price: project.suggestedPrice,
    final_price: project.finalPrice,
    payment_terms: project.paymentTerms,
    updated_at: project.updatedAt,
    created_at: project.createdAt,
    briefing_id: project.briefingId ?? null,
    contract_ids: project.contractIds,
    document_ids: project.documentIds,
    scope: project.scope
  };
}

function rowToClient(row: ClientRow, projectIds: string[]): Client {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    document: row.document,
    email: row.email,
    whatsapp: row.whatsapp,
    city: row.city,
    state: row.state,
    address: row.address ?? undefined,
    notes: row.notes ?? "",
    projectIds,
    lastActivity: row.last_activity
  };
}

function rowToProject(row: ProjectRow, history: ProjectHistoryEvent[]): Project {
  return {
    id: row.id,
    clientId: row.client_id,
    name: row.name,
    type: row.type,
    status: row.status,
    description: row.description,
    objective: row.objective,
    desiredDeadline: row.desired_deadline,
    deadline: row.deadline,
    suggestedPrice: row.suggested_price,
    finalPrice: row.final_price,
    paymentTerms: row.payment_terms,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
    briefingId: row.briefing_id ?? undefined,
    contractIds: row.contract_ids ?? [],
    documentIds: row.document_ids ?? [],
    history,
    scope: row.scope
  };
}

function buildProject(values: ProjectFormValues): Project {
  const id = `proj-${slug(values.name) || Date.now().toString()}`;
  const today = new Date().toISOString().slice(0, 10);
  const desiredDeadline = formatDeadlineDays(values.desiredDeadline);

  return {
    id,
    clientId: values.clientId,
    name: values.name,
    type: values.type as ProjectType,
    status: "novo",
    description: values.description,
    objective: values.description,
    desiredDeadline,
    deadline: deadlineDateFromDays(values.desiredDeadline),
    suggestedPrice: 0,
    finalPrice: 0,
    paymentTerms: "A definir",
    updatedAt: today,
    createdAt: today,
    contractIds: [],
    documentIds: [],
    history: [
      {
        id: `${id}-created`,
        title: "Projeto criado",
        date: today,
        type: "created",
        detail: "Workspace criado nesta sessão."
      }
    ],
    scope: {
      summary: values.description,
      includedPages: [],
      includedFeatures: [],
      excludedFeatures: [],
      deliverables: [],
      estimatedDeadline: desiredDeadline,
      notes: values.notes ?? "",
      questions: []
    }
  };
}

function buildClient(values: ClientFormValues): Client {
  const id = `cli-${slug(values.name) || Date.now().toString()}`;
  const today = new Date().toISOString().slice(0, 10);

  return {
    id,
    name: values.name,
    company: values.company,
    document: values.document,
    email: values.email,
    whatsapp: values.whatsapp,
    city: values.city,
    state: values.state,
    address: values.address,
    notes: values.notes ?? "",
    projectIds: [],
    lastActivity: today
  };
}

export function TratoDataProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(seedClients);
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [readiness, setReadiness] = useState<ReadinessState>({});

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      try {
        const parsed = JSON.parse(saved) as {
          clients?: Client[];
          projects?: Project[];
          readiness?: ReadinessState;
        };
        if (Array.isArray(parsed.clients)) setClients(parsed.clients);
        if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
        if (parsed.readiness) setReadiness(parsed.readiness);
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
      return;
    }

    let active = true;
    const db = supabase;

    async function loadSupabaseData() {
      const [
        clientsResult,
        projectsResult,
        historyResult,
        readinessResult
      ] = await Promise.all([
        db.from("clients").select("*").order("last_activity", { ascending: false }),
        db.from("projects").select("*").order("updated_at", { ascending: false }),
        db.from("project_history").select("*").order("event_date", { ascending: true }),
        db.from("project_readiness").select("*")
      ]);

      if (!active) return;
      if (clientsResult.error || projectsResult.error) return;

      const projectRows = (projectsResult.data ?? []) as ProjectRow[];
      const historyRows = (historyResult.data ?? []) as ProjectHistoryRow[];
      const readinessRows = (readinessResult.data ?? []) as ReadinessRow[];
      const projectIdsByClient = projectRows.reduce<Record<string, string[]>>((acc, project) => {
        acc[project.client_id] = [...(acc[project.client_id] ?? []), project.id];
        return acc;
      }, {});
      const historyByProject = historyRows.reduce<Record<string, ProjectHistoryEvent[]>>((acc, event) => {
        acc[event.project_id] = [
          ...(acc[event.project_id] ?? []),
          {
            id: event.id,
            title: event.title,
            date: event.event_date,
            type: event.event_type,
            detail: event.detail ?? undefined
          }
        ];
        return acc;
      }, {});
      const readinessByProject = readinessRows.reduce<ReadinessState>((acc, item) => {
        acc[item.project_id] = {
          ...(acc[item.project_id] ?? {}),
          [item.label]: item.done
        };
        return acc;
      }, {});

      setProjects(projectRows.map((project) => rowToProject(project, historyByProject[project.id] ?? [])));
      setClients(((clientsResult.data ?? []) as ClientRow[]).map((client) => rowToClient(client, projectIdsByClient[client.id] ?? [])));
      setReadiness(readinessByProject);
    }

    void loadSupabaseData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured()) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ clients, projects, readiness }));
  }, [clients, projects, readiness]);

  const createClient = useCallback(async (values: ClientFormValues) => {
    const client = buildClient(values);
    setClients((current) => [client, ...current]);

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("clients").insert(clientToRow(client));
      if (error) console.error(error);
    }

    return client;
  }, []);

  const updateClient = useCallback(async (id: string, values: ClientFormValues) => {
    const updatedAt = new Date().toISOString().slice(0, 10);
    let updatedClient: Client | undefined;

    setClients((current) =>
      current.map((client) => {
        if (client.id !== id) return client;
        updatedClient = {
          ...client,
          ...values,
          notes: values.notes ?? "",
          address: values.address,
          lastActivity: updatedAt
        };
        return updatedClient;
      })
    );

    const supabase = getSupabaseClient();
    if (supabase && updatedClient) {
      const { error } = await supabase.from("clients").update(clientToRow(updatedClient)).eq("id", id);
      if (error) console.error(error);
    }
  }, []);

  const deleteClient = useCallback(async (id: string) => {
    setClients((current) => current.filter((client) => client.id !== id));

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) console.error(error);
    }
  }, []);

  const createProject = useCallback(async (values: ProjectFormValues) => {
    const project = buildProject(values);
    setProjects((current) => [project, ...current]);
    setClients((current) =>
      current.map((client) =>
        client.id === values.clientId
          ? { ...client, projectIds: Array.from(new Set([project.id, ...client.projectIds])) }
          : client
      )
    );

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("projects").insert(projectToRow(project));
      if (error) console.error(error);
      if (project.history?.length) {
        const { error: historyError } = await supabase.from("project_history").insert(
          project.history.map((event) => ({
            id: event.id,
            project_id: project.id,
            title: event.title,
            event_date: event.date,
            event_type: event.type,
            detail: event.detail ?? null
          }))
        );
        if (historyError) console.error(historyError);
      }
    }

    return project;
  }, []);

  const updateProject = useCallback(async (id: string, values: ProjectFormValues) => {
    const today = new Date().toISOString().slice(0, 10);
    const desiredDeadline = formatDeadlineDays(values.desiredDeadline);
    const historyEvent: ProjectHistoryEvent = {
      id: `${id}-updated-${Date.now()}`,
      title: "Projeto atualizado",
      date: today,
      type: "updated",
      detail: "Dados principais revisados nesta sessão."
    };
    let updatedProject: Project | undefined;

    setProjects((current) =>
      current.map((project) => {
        if (project.id !== id) return project;
        updatedProject = {
          ...project,
          clientId: values.clientId,
          name: values.name,
          type: values.type as ProjectType,
          description: values.description,
          desiredDeadline,
          deadline: deadlineDateFromDays(values.desiredDeadline),
          updatedAt: today,
          history: [...(project.history ?? []), historyEvent],
          scope: { ...project.scope, estimatedDeadline: desiredDeadline, notes: values.notes ?? project.scope.notes }
        };
        return updatedProject;
      })
    );

    const supabase = getSupabaseClient();
    if (supabase && updatedProject) {
      const { error } = await supabase.from("projects").update(projectToRow(updatedProject)).eq("id", id);
      if (error) console.error(error);
      const { error: historyError } = await supabase.from("project_history").insert({
        id: historyEvent.id,
        project_id: id,
        title: historyEvent.title,
        event_date: historyEvent.date,
        event_type: historyEvent.type,
        detail: historyEvent.detail ?? null
      });
      if (historyError) console.error(historyError);
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    setProjects((current) => current.filter((project) => project.id !== id));
    setClients((current) =>
      current.map((client) => ({
        ...client,
        projectIds: client.projectIds.filter((projectId) => projectId !== id)
      }))
    );
    setReadiness((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) console.error(error);
    }
  }, []);

  const toggleProjectReadinessItem = useCallback(async (projectId: string, label: string, fallback: boolean) => {
    const done = !(readiness[projectId]?.[label] ?? fallback);
    setReadiness((current) => ({
      ...current,
      [projectId]: {
        ...current[projectId],
        [label]: done
      }
    }));

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("project_readiness").upsert({
        project_id: projectId,
        label,
        done
      });
      if (error) console.error(error);
    }
  }, [readiness]);


  const value = useMemo(
    () => ({
      clients,
      projects,
      readiness,
      createClient,
      updateClient,
      deleteClient,
      createProject,
      updateProject,
      deleteProject,
      toggleProjectReadinessItem
    }),
    [
      clients,
      projects,
      readiness,
      createClient,
      updateClient,
      deleteClient,
      createProject,
      updateProject,
      deleteProject,
      toggleProjectReadinessItem
    ]
  );

  return <TratoDataContext.Provider value={value}>{children}</TratoDataContext.Provider>;
}

export function useTratoData() {
  const context = useContext(TratoDataContext);
  if (!context) throw new Error("useTratoData deve ser usado dentro de TratoDataProvider.");
  return context;
}
