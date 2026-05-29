import type { TratoStatus } from "./status";

export type DocumentType =
  | "Proposta comercial"
  | "Contrato"
  | "Anexo de escopo"
  | "Termo de aprovação";

export type Document = {
  id: string;
  title: string;
  type: DocumentType;
  clientId: string;
  projectId: string;
  contractId?: string;
  date: string;
  status: TratoStatus;
  fileName: string;
  versionHistory: Array<{
    version: string;
    date: string;
    note: string;
  }>;
};
