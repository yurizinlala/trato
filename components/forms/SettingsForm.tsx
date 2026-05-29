"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { brazilianStates } from "@/lib/constants";
import { settingsSchema, type SettingsFormValues } from "@/lib/schemas/settings.schema";
import type { Settings } from "@/types/settings";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoNotice } from "@/components/ui/TratoNotice";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoTextarea } from "@/components/ui/TratoTextarea";
import { TratoWindow } from "@/components/ui/TratoWindow";

export function SettingsForm({ settings }: { settings: Settings }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings
  });

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(() => undefined)}>
      <TratoWindow title="meus.dados" tone="orange">
        <div className="grid gap-5 md:grid-cols-2">
          <TratoInput label="Nome" error={errors.name?.message} {...register("name")} />
          <TratoInput label="CPF/CNPJ" error={errors.document?.message} {...register("document")} />
          <TratoInput label="E-mail" error={errors.email?.message} {...register("email")} />
          <TratoInput label="WhatsApp" error={errors.whatsapp?.message} {...register("whatsapp")} />
          <TratoInput label="Cidade" error={errors.city?.message} {...register("city")} />
          <TratoSelect
            label="Estado"
            options={brazilianStates.map((state) => ({ label: state, value: state }))}
            error={errors.state?.message}
            {...register("state")}
          />
          <TratoInput label="Endereço" error={errors.address?.message} {...register("address")} />
        </div>
      </TratoWindow>

      <TratoWindow title="dados.padrão.contrato" tone="blue">
        <div className="grid gap-5 md:grid-cols-2">
          <TratoInput label="Foro padrão" error={errors.defaultJurisdiction?.message} {...register("defaultJurisdiction")} />
          <TratoInput label="Limite padrão de revisões" error={errors.defaultRevisionLimit?.message} {...register("defaultRevisionLimit")} />
          <TratoInput label="Garantia técnica padrão" error={errors.defaultWarranty?.message} {...register("defaultWarranty")} />
          <TratoInput label="Forma de pagamento padrão" error={errors.defaultPaymentTerms?.message} {...register("defaultPaymentTerms")} />
        </div>
      </TratoWindow>

      <TratoWindow title="aparência" tone="default">
        <div className="grid gap-5 md:grid-cols-2">
          <TratoInput label="Logo" error={errors.logo?.message} {...register("logo")} />
          <TratoInput label="Cor principal" error={errors.primaryColor?.message} {...register("primaryColor")} />
        </div>
      </TratoWindow>

      <TratoWindow title="templates.e.cláusulas" tone="default">
        <div className="grid gap-5">
          <TratoInput label="Templates padrão" error={errors.defaultTemplate?.message} {...register("defaultTemplate")} />
          <TratoTextarea label="Cláusulas padrão" error={errors.defaultClauses?.message} {...register("defaultClauses")} />
        </div>
      </TratoWindow>

      {isSubmitSuccessful ? <TratoNotice tone="success">Configurações validadas.</TratoNotice> : null}
      <TratoButton className="w-fit" type="submit" icon={<Save className="h-5 w-5" />}>Salvar configurações</TratoButton>
    </form>
  );
}
