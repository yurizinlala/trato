import type { TratoStatus } from "./status";

export type ProjectType =
  | "Site institucional"
  | "Portfólio"
  | "Landing page"
  | "Sistema web"
  | "Dashboard"
  | "Loja virtual"
  | "Manutenção"
  | "Outro";

export type ProjectScope = {
  summary: string;
  includedPages: string[];
  includedFeatures: string[];
  excludedFeatures: string[];
  deliverables: string[];
  estimatedDeadline: string;
  notes: string;
  questions: string[];
};

export type ProjectHistoryEvent = {
  id: string;
  title: string;
  date: string;
  type: "created" | "updated" | "briefing" | "contract" | "document";
  detail?: string;
};

export type Project = {
  id: string;
  clientId: string;
  name: string;
  type: ProjectType;
  status: TratoStatus;
  description: string;
  objective: string;
  desiredDeadline: string;
  deadline: string;
  suggestedPrice: number;
  finalPrice: number;
  paymentTerms: string;
  updatedAt: string;
  createdAt: string;
  briefingId?: string;
  contractIds: string[];
  documentIds: string[];
  history?: ProjectHistoryEvent[];
  scope: ProjectScope;
};
