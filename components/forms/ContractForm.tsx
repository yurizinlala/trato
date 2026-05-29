"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileDown, FileText, Save, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { documentActionsUnavailableMessage } from "@/lib/document-placeholders";
import { contractSchema, type ContractFormValues } from "@/lib/schemas/contract.schema";
import type { Client } from "@/types/client";
import type { Contract } from "@/types/contract";
import type { Project } from "@/types/project";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoNotice } from "@/components/ui/TratoNotice";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoTextarea } from "@/components/ui/TratoTextarea";
import { TratoWindow } from "@/components/ui/TratoWindow";

type ContractFormProps = {
  clients: Client[];
  projects: Project[];
  contract?: Contract;
};

export function ContractForm({ clients, projects, contract }: ContractFormProps) {
  const fallbackClient = clients[0];
  const fallbackProject = projects[0];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      clientId: contract?.clientId ?? fallbackClient?.id ?? "",
      projectId: contract?.projectId ?? fallbackProject?.id ?? "",
      template: contract?.template ?? "Prestação de serviços digitais",
      contractor: contract?.contractor ?? fallbackClient?.company ?? "",
      contractorDocument: contract?.contractorDocument ?? fallbackClient?.document ?? "",
      contracted: contract?.contracted ?? "Trato Estúdio Criativo",
      contractedDocument: contract?.contractedDocument ?? "45.678.901/0001-20",
      object: contract?.object ?? fallbackProject?.description ?? "",
      scope: contract?.scope ?? fallbackProject?.scope.summary ?? "",
      deadline: contract?.deadline ?? fallbackProject?.desiredDeadline ?? "",
      value: contract?.value ?? fallbackProject?.finalPrice ?? 0,
      paymentTerms: contract?.paymentTerms ?? fallbackProject?.paymentTerms ?? "",
      revisions: contract?.revisions ?? "Até 2 rodadas de ajustes por etapa",
      warranty: contract?.warranty ?? "30 dias de garantia técnica",
      jurisdiction: contract?.jurisdiction ?? "São Paulo - SP",
      observations: contract?.observations ?? ""
    }
  });

  const pendingAction = () => window.alert(documentActionsUnavailableMessage);

  return (
    <TratoWindow title="parâmetros.da.minuta" tone="default">
      <form className="grid gap-5" onSubmit={handleSubmit(() => undefined)}>
        <TratoNotice tone="warning" className="p-4">
          Minuta gerada automaticamente. Revise antes de enviar para assinatura.
        </TratoNotice>
        <div className="grid gap-5 md:grid-cols-2">
          <TratoSelect
            label="Cliente"
            options={clients.map((client) => ({ label: `${client.name} — ${client.company}`, value: client.id }))}
            error={errors.clientId?.message}
            {...register("clientId")}
          />
          <TratoSelect
            label="Projeto"
            options={projects.map((project) => ({ label: project.name, value: project.id }))}
            error={errors.projectId?.message}
            {...register("projectId")}
          />
          <TratoSelect
            label="Template"
            options={[
              { label: "Prestação de serviços digitais", value: "Prestação de serviços digitais" },
              { label: "Site institucional", value: "Site institucional" },
              { label: "Sistema web", value: "Sistema web" },
              { label: "Landing page", value: "Landing page" }
            ]}
            error={errors.template?.message}
            {...register("template")}
          />
          <TratoInput label="Valor" type="number" error={errors.value?.message} {...register("value")} />
          <TratoInput label="Contratante" error={errors.contractor?.message} {...register("contractor")} />
          <TratoInput label="CPF/CNPJ contratante" error={errors.contractorDocument?.message} {...register("contractorDocument")} />
          <TratoInput label="Contratado" error={errors.contracted?.message} {...register("contracted")} />
          <TratoInput label="CPF/CNPJ contratado" error={errors.contractedDocument?.message} {...register("contractedDocument")} />
        </div>
        <TratoTextarea label="Objeto" error={errors.object?.message} {...register("object")} />
        <TratoTextarea label="Escopo" error={errors.scope?.message} {...register("scope")} />
        <div className="grid gap-5 md:grid-cols-2">
          <TratoInput label="Prazo" error={errors.deadline?.message} {...register("deadline")} />
          <TratoInput label="Forma de pagamento" error={errors.paymentTerms?.message} {...register("paymentTerms")} />
          <TratoInput label="Revisões" error={errors.revisions?.message} {...register("revisions")} />
          <TratoInput label="Garantia técnica" error={errors.warranty?.message} {...register("warranty")} />
          <TratoInput label="Foro" error={errors.jurisdiction?.message} {...register("jurisdiction")} />
        </div>
        <TratoTextarea label="Observações" error={errors.observations?.message} {...register("observations")} />
        {isSubmitSuccessful ? <TratoNotice tone="success">Contrato validado localmente.</TratoNotice> : null}
        <div className="grid gap-3 sm:grid-cols-2">
          <TratoButton type="submit" icon={<Save className="h-5 w-5" />}>Salvar rascunho</TratoButton>
          <TratoButton type="button" variant="secondary" icon={<FileText className="h-5 w-5" />} onClick={pendingAction}>Gerar PDF</TratoButton>
          <TratoButton type="button" variant="secondary" icon={<FileDown className="h-5 w-5" />} onClick={pendingAction}>Gerar DOCX</TratoButton>
          <TratoButton type="button" variant="outline" icon={<Send className="h-5 w-5" />}>Marcar como enviado</TratoButton>
          <TratoButton type="button" variant="success" icon={<ShieldCheck className="h-5 w-5" />}>Marcar como assinado externamente</TratoButton>
        </div>
      </form>
    </TratoWindow>
  );
}
