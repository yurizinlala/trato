"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { briefingFeatures, briefingGoals, budgetRanges, projectTypes } from "@/lib/constants";
import { submitPublicBriefing } from "@/lib/briefings/actions";
import { formatBrazilPhone, formatCpfCnpj, onlyDigits } from "@/lib/formatters";
import { briefingSchema, type BriefingFormValues } from "@/lib/schemas/briefing.schema";
import { cn } from "@/lib/utils";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoCard } from "@/components/ui/TratoCard";
import { TratoCheckbox } from "@/components/ui/TratoCheckbox";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoProgress } from "@/components/ui/TratoProgress";
import { TratoTextarea } from "@/components/ui/TratoTextarea";
import { TratoWindow } from "@/components/ui/TratoWindow";

const steps = [
  "Dados do cliente",
  "Tipo de projeto",
  "Objetivo",
  "Funcionalidades",
  "Conteúdo e acessos",
  "Prazo e orçamento",
  "Revisão e envio"
];

const stepFields: Record<number, (keyof BriefingFormValues)[]> = {
  0: ["name", "company", "document", "email", "whatsapp", "cityState"],
  1: ["projectType"],
  2: ["objective", "goals"],
  3: ["features"],
  4: ["hasDomain", "hasHosting", "hasLogo", "hasTexts", "hasImages", "hasReferences", "referenceLinks", "notes"],
  5: ["desiredDeadline", "budgetRange"],
  6: ["name", "document", "email", "whatsapp", "projectType", "objective", "goals", "features", "desiredDeadline", "budgetRange"]
};

export function BriefingWizard({ token = "public" }: { token?: string }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors }
  } = useForm<BriefingFormValues>({
    resolver: zodResolver(briefingSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      document: "",
      email: "",
      whatsapp: "",
      cityState: "",
      projectType: "Site institucional",
      objective: "",
      goals: [],
      features: [],
      hasDomain: false,
      hasHosting: false,
      hasLogo: false,
      hasTexts: false,
      hasImages: false,
      hasReferences: false,
      referenceLinks: "",
      notes: "",
      desiredDeadline: "",
      budgetRange: "Ainda não sei"
    }
  });

  const values = watch();
  const documentRegistration = register("document");
  const whatsappRegistration = register("whatsapp");
  const deadlineRegistration = register("desiredDeadline");

  if (submitted) {
    return (
      <TratoWindow title="briefing.enviado" tone="orange" className="w-full max-w-3xl">
        <div className="grid place-items-center gap-5 py-10 text-center">
          <CheckCircle2 className="h-16 w-16 text-success-green" />
          <h1 className="font-heading text-4xl font-bold uppercase">Briefing enviado. Trato iniciado!</h1>
          <p className="max-w-2xl text-lg text-ink-black/75">
            Recebi suas informações e vou analisar tudo com calma. Em breve entro em contato para confirmar o escopo.
          </p>
        </div>
      </TratoWindow>
    );
  }

  const next = async () => {
    const isValid = await trigger(stepFields[step], { shouldFocus: true });
    if (isValid) setStep((current) => Math.min(steps.length - 1, current + 1));
  };
  const previous = () => setStep((current) => Math.max(0, current - 1));

  return (
    <TratoWindow title={`passo ${step + 1} de ${steps.length} — ${steps[step]}`} tone="default" className="w-full">
      <form
        className="grid gap-8"
        onSubmit={handleSubmit(async (formValues) => {
          await submitPublicBriefing(token, formValues);
          setSubmitted(true);
        })}
      >
        <TratoProgress value={((step + 1) / steps.length) * 100} label={steps[step]} />

        {step === 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <TratoInput label="Nome completo" error={errors.name?.message} {...register("name")} />
            <TratoInput label="Empresa" error={errors.company?.message} {...register("company")} />
            <TratoInput
              label="CPF/CNPJ"
              error={errors.document?.message}
              {...documentRegistration}
              onChange={(event) => {
                event.target.value = formatCpfCnpj(event.target.value);
                documentRegistration.onChange(event);
              }}
            />
            <TratoInput label="E-mail" type="email" error={errors.email?.message} {...register("email")} />
            <TratoInput
              label="WhatsApp"
              inputMode="tel"
              error={errors.whatsapp?.message}
              {...whatsappRegistration}
              onChange={(event) => {
                event.target.value = formatBrazilPhone(event.target.value);
                whatsappRegistration.onChange(event);
              }}
            />
            <TratoInput label="Cidade/estado" error={errors.cityState?.message} {...register("cityState")} />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectTypes.map((type) => (
              <TratoButton
                key={type}
                type="button"
                variant={values.projectType === type ? "primary" : "outline"}
                size="lg"
                className="min-h-28 justify-start whitespace-normal p-4 text-left text-xl"
                onClick={() => setValue("projectType", type, { shouldDirty: true, shouldValidate: true })}
              >
                {type}
              </TratoButton>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-6">
            <TratoTextarea label="O que você quer resolver com esse projeto?" error={errors.objective?.message} {...register("objective")} />
            <div className="grid gap-3 md:grid-cols-2">
              {briefingGoals.map((goal) => (
                <TratoCheckbox key={goal} label={goal} value={goal} {...register("goals")} />
              ))}
            </div>
            {errors.goals?.message ? <p className="font-mono text-xs font-bold uppercase text-danger-red">{errors.goals.message}</p> : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {briefingFeatures.map((feature) => (
              <TratoCheckbox key={feature} label={feature} value={feature} {...register("features")} />
            ))}
            {errors.features?.message ? <p className="font-mono text-xs font-bold uppercase text-danger-red">{errors.features.message}</p> : null}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-5">
            <div className="grid gap-3 md:grid-cols-2">
              <TratoCheckbox label="Já possui domínio?" {...register("hasDomain")} />
              <TratoCheckbox label="Já possui hospedagem?" {...register("hasHosting")} />
              <TratoCheckbox label="Já possui logo?" {...register("hasLogo")} />
              <TratoCheckbox label="Já possui textos?" {...register("hasTexts")} />
              <TratoCheckbox label="Já possui imagens?" {...register("hasImages")} />
              <TratoCheckbox label="Tem referências de sites?" {...register("hasReferences")} />
            </div>
            <TratoInput label="Links de referência" {...register("referenceLinks")} />
            <TratoTextarea label="Observações" {...register("notes")} />
          </div>
        ) : null}

        {step === 5 ? (
          <div className="grid gap-5">
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
            <div className="grid gap-3 md:grid-cols-2">
              {budgetRanges.map((range) => (
                <TratoButton
                  key={range}
                  type="button"
                  variant="outline"
                  size="md"
                  className={cn(
                    "justify-start text-left font-mono text-sm shadow-hard-sm",
                    values.budgetRange === range && "bg-warning-yellow hover:bg-warning-yellow"
                  )}
                  onClick={() => setValue("budgetRange", range, { shouldDirty: true, shouldValidate: true })}
                >
                  {range}
                </TratoButton>
              ))}
            </div>
          </div>
        ) : null}

        {step === 6 ? (
          <TratoCard variant="document" className="grid gap-4">
            <h2 className="font-heading text-3xl font-bold uppercase">Revisão</h2>
            <dl className="grid gap-3 md:grid-cols-2">
              {[
                ["Cliente", values.name || "Não informado"],
                ["Empresa", values.company || "Não informado"],
                ["Projeto", values.projectType],
                ["Prazo", values.desiredDeadline ? `${values.desiredDeadline} dias` : "Não informado"],
                ["Investimento", values.budgetRange],
                ["Objetivo", values.objective || "Não informado"]
              ].map(([label, value]) => (
                <TratoCard key={label} variant="compact" className="shadow-none">
                  <dt className="font-mono text-xs font-bold uppercase">{label}</dt>
                  <dd className="mt-1">{value}</dd>
                </TratoCard>
              ))}
            </dl>
          </TratoCard>
        ) : null}

        <div className="flex flex-wrap justify-between gap-3 border-t-3 border-ink-black pt-5">
          <TratoButton type="button" variant="outline" disabled={step === 0} icon={<ArrowLeft className="h-5 w-5" />} onClick={previous}>
            Voltar
          </TratoButton>
          {step < steps.length - 1 ? (
            <TratoButton type="button" icon={<ArrowRight className="h-5 w-5" />} onClick={next}>
              Próximo
            </TratoButton>
          ) : (
            <TratoButton type="submit" icon={<Send className="h-5 w-5" />}>
              Enviar briefing
            </TratoButton>
          )}
        </div>
      </form>
    </TratoWindow>
  );
}
