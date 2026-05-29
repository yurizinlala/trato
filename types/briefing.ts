import type { ProjectType } from "./project";
import type { TratoStatus } from "./status";

export type Briefing = {
  id: string;
  token: string;
  clientId: string;
  projectId: string;
  receivedAt: string;
  status: TratoStatus;
  projectType: ProjectType;
  objective: string;
  goals: string[];
  features: string[];
  assets: {
    hasDomain: boolean;
    hasHosting: boolean;
    hasLogo: boolean;
    hasTexts: boolean;
    hasImages: boolean;
    hasReferences: boolean;
    referenceLinks: string;
    notes: string;
  };
  desiredDeadline: string;
  budgetRange: string;
  attentionPoints: string[];
  confirmationQuestions: string[];
};
