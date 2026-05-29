"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { formatBrazilPhone, formatCpfCnpj } from "@/lib/formatters";
import { clientSchema, type ClientFormValues } from "@/lib/schemas/client.schema";
import { brazilianStates } from "@/lib/constants";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoNotice } from "@/components/ui/TratoNotice";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoTextarea } from "@/components/ui/TratoTextarea";
import { TratoWindow } from "@/components/ui/TratoWindow";

type ClientFormProps = {
  defaultValues?: Partial<ClientFormValues>;
  mode?: "create" | "edit";
  onSubmit?: (values: ClientFormValues) => void;
};

export function ClientForm({ defaultValues, mode = "create", onSubmit }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      document: "",
      email: "",
      whatsapp: "",
      city: "",
      state: "SP",
      address: "",
      notes: "",
      ...defaultValues
    }
  });
  const documentField = register("document");
  const whatsappField = register("whatsapp");

  return (
    <TratoWindow title={mode === "create" ? "cliente.novo" : "cliente.editar"} tone="orange">
      <form className="grid gap-5" onSubmit={handleSubmit((values) => onSubmit?.(values))}>
        <div className="grid gap-5 md:grid-cols-2">
          <TratoInput label="Nome completo" error={errors.name?.message} {...register("name")} />
          <TratoInput label="Empresa" error={errors.company?.message} {...register("company")} />
          <TratoInput
            label="CPF/CNPJ"
            error={errors.document?.message}
            {...documentField}
            onChange={(event) => {
              event.target.value = formatCpfCnpj(event.target.value);
              documentField.onChange(event);
            }}
          />
          <TratoInput label="E-mail" type="email" error={errors.email?.message} {...register("email")} />
          <TratoInput
            label="WhatsApp"
            error={errors.whatsapp?.message}
            {...whatsappField}
            onChange={(event) => {
              event.target.value = formatBrazilPhone(event.target.value);
              whatsappField.onChange(event);
            }}
          />
          <div className="grid gap-5 sm:grid-cols-city-state">
            <TratoInput label="Cidade" error={errors.city?.message} {...register("city")} />
            <TratoSelect
              label="Estado"
              options={brazilianStates.map((state) => ({ label: state, value: state }))}
              error={errors.state?.message}
              {...register("state")}
            />
          </div>
        </div>
        <TratoInput label="Endereço" error={errors.address?.message} {...register("address")} />
        <TratoTextarea label="Observações internas" error={errors.notes?.message} {...register("notes")} />

        {isSubmitSuccessful ? (
          <TratoNotice tone="success">
            Dados validados localmente. Persistência real entra na etapa Supabase.
          </TratoNotice>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <TratoButton type="submit" icon={<Save className="h-5 w-5" />}>
            {mode === "create" ? "Salvar cliente" : "Atualizar cliente"}
          </TratoButton>
          <TratoButton href="/clientes" variant="outline">
            Cancelar
          </TratoButton>
        </div>
      </form>
    </TratoWindow>
  );
}
