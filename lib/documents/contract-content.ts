import { formatCurrency } from "@/lib/utils";
import type { Client } from "@/types/client";
import type { Contract } from "@/types/contract";
import type { Document as TratoDocument } from "@/types/document";
import type { Project } from "@/types/project";

export type ContractSection = {
  title: string;
  body: string[];
};

export function getContractSections(contract: Contract, client: Client, project: Project): ContractSection[] {
  return [
    {
      title: "Contratante",
      body: [
        `${client.name}, ${client.company}, inscrito(a) sob o documento ${contract.contractorDocument || client.document}.`,
        `Contato principal: ${client.email} · ${client.whatsapp}.`
      ]
    },
    {
      title: "Contratado",
      body: [`${contract.contracted}, inscrito sob o documento ${contract.contractedDocument}.`]
    },
    {
      title: "Objeto",
      body: [contract.object || project.description]
    },
    {
      title: "Escopo",
      body: [contract.scope || project.scope.summary]
    },
    {
      title: "Prazo",
      body: [`Prazo estimado: ${contract.deadline || project.desiredDeadline}.`]
    },
    {
      title: "Valor e forma de pagamento",
      body: [`Valor total: ${formatCurrency(contract.value || project.finalPrice)}. Forma de pagamento: ${contract.paymentTerms || project.paymentTerms}.`]
    },
    {
      title: "Obrigações do contratado",
      body: ["Executar os serviços descritos no escopo, comunicar impedimentos relevantes e entregar os arquivos combinados."]
    },
    {
      title: "Obrigações do contratante",
      body: ["Fornecer informações, acessos, conteúdos e aprovações necessárias para execução do projeto."]
    },
    {
      title: "Revisões",
      body: [contract.revisions]
    },
    {
      title: "Aprovação e entrega",
      body: ["A entrega será considerada aprovada após validação do escopo acordado ou ausência de solicitações dentro do prazo combinado."]
    },
    {
      title: "Garantia técnica",
      body: [contract.warranty]
    },
    {
      title: "Domínio, hospedagem e serviços de terceiros",
      body: ["Custos e responsabilidades de serviços externos pertencem ao contratante, salvo quando descrito expressamente no escopo."]
    },
    {
      title: "Propriedade intelectual",
      body: ["Após pagamento integral, os materiais finais aprovados passam a pertencer ao contratante, respeitadas bibliotecas e ferramentas de terceiros."]
    },
    {
      title: "Uso no portfólio",
      body: ["O contratado poderá citar o projeto em portfólio, salvo restrição formal acordada entre as partes."]
    },
    {
      title: "Confidencialidade",
      body: ["As partes se comprometem a manter confidenciais informações sensíveis acessadas durante o projeto."]
    },
    {
      title: "Proteção de dados",
      body: ["As partes devem tratar dados pessoais apenas para finalidades necessárias à execução do projeto."]
    },
    {
      title: "Cancelamento e rescisão",
      body: ["Cancelamentos devem respeitar etapas já executadas, valores devidos e materiais entregues até a data da rescisão."]
    },
    {
      title: "Comunicação oficial",
      body: ["As comunicações oficiais ocorrerão por e-mail, WhatsApp ou outro canal acordado pelas partes."]
    },
    {
      title: "Assinatura eletrônica",
      body: ["A assinatura será realizada externamente, inclusive por gov.br ou serviço equivalente escolhido pelas partes."]
    },
    {
      title: "Foro",
      body: [`Fica eleito o foro de ${contract.jurisdiction} para dirimir dúvidas decorrentes deste contrato.`]
    }
  ];
}

export function getDocumentTitle(document: TratoDocument) {
  if (document.type === "Contrato") return "Contrato de Prestação de Serviços de Desenvolvimento Digital";
  return document.title;
}

export function getDocumentSections(document: TratoDocument, contract: Contract, client: Client, project: Project): ContractSection[] {
  if (document.type === "Contrato") return getContractSections(contract, client, project);

  return [
    {
      title: "Cliente",
      body: [`${client.name} · ${client.company}`, `${client.email} · ${client.whatsapp}`]
    },
    {
      title: "Projeto",
      body: [`${project.name} · ${project.type}`, project.description]
    },
    {
      title: "Escopo",
      body: [project.scope.summary, ...project.scope.includedPages, ...project.scope.includedFeatures]
    },
    {
      title: "Prazo",
      body: [`Prazo estimado: ${project.desiredDeadline}.`]
    },
    {
      title: "Valor",
      body: [`Valor final registrado: ${formatCurrency(project.finalPrice || contract.value)}.`]
    },
    {
      title: "Observações",
      body: [contract.observations || "Documento gerado automaticamente pelo Trato a partir dos dados internos do projeto."]
    }
  ];
}
