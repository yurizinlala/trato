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
import type { ClientFormValues } from "@/lib/schemas/client.schema";
import type { ProjectFormValues } from "@/lib/schemas/project.schema";
import type { Client } from "@/types/client";
import type { Project, ProjectType } from "@/types/project";

type ReadinessState = Record<string, Record<string, boolean>>;

type TratoDataState = {
  clients: Client[];
  projects: Project[];
  readiness: ReadinessState;
  createClient: (values: ClientFormValues) => Client;
  updateClient: (id: string, values: ClientFormValues) => void;
  deleteClient: (id: string) => void;
  createProject: (values: ProjectFormValues) => Project;
  updateProject: (id: string, values: ProjectFormValues) => void;
  deleteProject: (id: string) => void;
  toggleProjectReadinessItem: (projectId: string, label: string, fallback: boolean) => void;
};

const STORAGE_KEY = "trato:mock-data:v1";

const TratoDataContext = createContext<TratoDataState | null>(null);

function slug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 36);
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
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ clients, projects, readiness }));
  }, [clients, projects, readiness]);

  const createClient = useCallback((values: ClientFormValues) => {
    const client = buildClient(values);
    setClients((current) => [client, ...current]);
    return client;
  }, []);

  const updateClient = useCallback((id: string, values: ClientFormValues) => {
    setClients((current) =>
      current.map((client) =>
        client.id === id
          ? {
              ...client,
              ...values,
              notes: values.notes ?? "",
              address: values.address,
              lastActivity: new Date().toISOString().slice(0, 10)
            }
          : client
      )
    );
  }, []);

  const deleteClient = useCallback((id: string) => {
    setClients((current) => current.filter((client) => client.id !== id));
  }, []);

  const createProject = useCallback((values: ProjectFormValues) => {
    const project = buildProject(values);
    setProjects((current) => [project, ...current]);
    setClients((current) =>
      current.map((client) =>
        client.id === values.clientId
          ? { ...client, projectIds: Array.from(new Set([project.id, ...client.projectIds])) }
          : client
      )
    );
    return project;
  }, []);

  const updateProject = useCallback((id: string, values: ProjectFormValues) => {
    const today = new Date().toISOString().slice(0, 10);
    const desiredDeadline = formatDeadlineDays(values.desiredDeadline);

    setProjects((current) =>
      current.map((project) =>
        project.id === id
          ? {
              ...project,
              clientId: values.clientId,
              name: values.name,
              type: values.type as ProjectType,
              description: values.description,
              desiredDeadline,
              deadline: deadlineDateFromDays(values.desiredDeadline),
              updatedAt: today,
              history: [
                ...(project.history ?? []),
                {
                  id: `${project.id}-updated-${Date.now()}`,
                  title: "Projeto atualizado",
                  date: today,
                  type: "updated",
                  detail: "Dados principais revisados nesta sessão."
                }
              ],
              scope: { ...project.scope, estimatedDeadline: desiredDeadline, notes: values.notes ?? project.scope.notes }
            }
          : project
      )
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
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
  }, []);

  const toggleProjectReadinessItem = useCallback((projectId: string, label: string, fallback: boolean) => {
    setReadiness((current) => ({
      ...current,
      [projectId]: {
        ...current[projectId],
        [label]: !(current[projectId]?.[label] ?? fallback)
      }
    }));
  }, []);

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
