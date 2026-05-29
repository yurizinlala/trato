import { clients, contracts, documents, projects } from "@/lib/mock-data";
import type { Client } from "@/types/client";
import type { Contract } from "@/types/contract";
import type { Document } from "@/types/document";
import type { Project } from "@/types/project";

export type DocumentBundle = {
  document: Document;
  contract: Contract;
  client: Client;
  project: Project;
};

function syntheticDocument(contract: Contract): Document {
  return {
    id: contract.id,
    title: contract.name,
    type: "Contrato",
    clientId: contract.clientId,
    projectId: contract.projectId,
    contractId: contract.id,
    date: contract.updatedAt,
    status: contract.status,
    fileName: `${contract.id}.pdf`,
    versionHistory: [
      {
        version: "v1.0",
        date: contract.updatedAt,
        note: "Documento gerado a partir do contrato."
      }
    ]
  };
}

export function getDocumentBundle(id: string): DocumentBundle {
  const document = documents.find((item) => item.id === id);
  const contract = document?.contractId
    ? contracts.find((item) => item.id === document.contractId)
    : contracts.find((item) => item.id === id);
  const resolvedContract = contract ?? contracts[0];
  const resolvedDocument = document ?? syntheticDocument(resolvedContract);
  const client = clients.find((item) => item.id === resolvedDocument.clientId) ?? clients[0];
  const project = projects.find((item) => item.id === resolvedDocument.projectId) ?? projects[0];

  return {
    document: resolvedDocument,
    contract: resolvedContract,
    client,
    project
  };
}

