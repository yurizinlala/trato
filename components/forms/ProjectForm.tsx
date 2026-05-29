"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { parseDeadlineToDays } from "@/lib/deadlines";
import { onlyDigits } from "@/lib/formatters";
import { projectSchema, type ProjectFormValues } from "@/lib/schemas/project.schema";
import { projectTypes } from "@/lib/constants";
import type { Client } from "@/types/client";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoNotice } from "@/components/ui/TratoNotice";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoTextarea } from "@/components/ui/TratoTextarea";
import { TratoWindow } from "@/components/ui/TratoWindow";

type ProjectFormProps = {
  clients: Client[];
  defaultValues?: Partial<ProjectFormValues>;
  mode?: "create" | "edit";
  projectId?: string;
  onSubmit?: (values: ProjectFormValues) => void;
};

export function ProjectForm({ clients, defaultValues, mode = "create", onSubmit }: ProjectFormProps) {
  const normalizedDefaults = defaultValues
    ? {
        ...defaultValues,
        desiredDeadline: parseDeadlineToDays(defaultValues.desiredDeadline)
      }
    : undefined;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
    defaultValues: {
      clientId: clients[0]?.id ?? "",
      name: "",
      type: "Site institucional",
      description: "",
      desiredDeadline: "",
      notes: "",
      ...(normalizedDefaults ?? {})
    }
  });
  const deadlineRegistration = register("desiredDeadline");

  return (
    <TratoWindow title="projeto.form" tone="blue">
      <form className="grid gap-5" onSubmit={handleSubmit((values) => onSubmit?.(values))}>
        <div className="grid gap-5 md:grid-cols-2">
          <TratoSelect
            label="Cliente"
            options={clients.map((client) => ({ label: `${client.name} — ${client.company}`, value: client.id }))}
            error={errors.clientId?.message}
            {...register("clientId")}
          />
          <TratoInput label="Nome do projeto" error={errors.name?.message} {...register("name")} />
          <TratoSelect
            label="Tipo de projeto"
            options={projectTypes.map((type) => ({ label: type, value: type }))}
            error={errors.type?.message}
            {...register("type")}
          />
          <TratoInput
            label="Prazo desejado (dias)"
            inputMode="numeric"
            pattern="[0-9]*"
            error={errors.desiredDeadline?.message}
            {...deadlineRegistration}
            onChange={(event) => {
              event.target.value = onlyDigits(event.target.value);
              deadlineRegistration.onChange(event);
            }}
          />
        </div>
        <TratoTextarea label="Descrição inicial" error={errors.description?.message} {...register("description")} />
        <TratoTextarea label="Observações internas" error={errors.notes?.message} {...register("notes")} />
        {isSubmitSuccessful ? (
          <TratoNotice tone="warning">
            Projeto validado com dados mockados.
          </TratoNotice>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <TratoButton type="submit" icon={<Save className="h-5 w-5" />}>
            {mode === "create" ? "Criar projeto" : "Atualizar projeto"}
          </TratoButton>
          {mode === "create" ? (
            <TratoButton type="submit" variant="secondary" icon={<Link2 className="h-5 w-5" />}>
              Criar e gerar briefing
            </TratoButton>
          ) : null}
        </div>
      </form>
    </TratoWindow>
  );
}
