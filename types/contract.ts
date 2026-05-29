import type { TratoStatus } from "./status";

export type Contract = {
  id: string;
  name: string;
  clientId: string;
  projectId: string;
  status: TratoStatus;
  createdAt: string;
  updatedAt: string;
  template: string;
  contractor: string;
  contractorDocument: string;
  contracted: string;
  contractedDocument: string;
  object: string;
  scope: string;
  deadline: string;
  value: number;
  paymentTerms: string;
  revisions: string;
  warranty: string;
  jurisdiction: string;
  observations: string;
};
