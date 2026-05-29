"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "@/lib/utils";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoCard } from "@/components/ui/TratoCard";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoNotice } from "@/components/ui/TratoNotice";
import { TratoSelect } from "@/components/ui/TratoSelect";
import { TratoWindow } from "@/components/ui/TratoWindow";

const priceSchema = z.object({
  finalPrice: z.coerce.number().min(1, "Informe o valor final."),
  paymentTerms: z.string().min(3, "Informe a forma de pagamento.")
});

type PriceFormValues = z.infer<typeof priceSchema>;

export function PriceForm({
  projectId,
  suggestedPrice,
  finalPrice,
  paymentTerms
}: {
  projectId: string;
  suggestedPrice: number;
  finalPrice: number;
  paymentTerms: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful }
  } = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: { finalPrice, paymentTerms }
  });

  return (
    <TratoWindow
      title="motor.precificação"
      tone="blue"
      actions={
        <TratoNotice tone="warning" className="inline-flex items-center gap-2 px-2 py-1 text-xs">
          <EyeOff className="h-4 w-4" /> Valor interno — o cliente não vê isso.
        </TratoNotice>
      }
    >
      <div className="grid gap-6 xl:grid-cols-price-editor">
        <div className="grid gap-5">
          <TratoCard variant="document" className="bg-dot-grid">
            <p className="font-mono text-xs font-bold uppercase">Preço sugerido</p>
            <p className="mt-2 font-heading text-6xl font-bold text-trato-orange">
              {formatCurrency(suggestedPrice)}
            </p>
            <p className="mt-3 text-ink-black/70">
              Faixa sugerida: {formatCurrency(suggestedPrice - 900)} a {formatCurrency(suggestedPrice + 1600)}.
            </p>
          </TratoCard>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Complexidade", "Média alta"],
              ["Volume", "5 a 8 entregáveis"],
              ["Prazo", "Entrega com janela curta"]
            ].map(([title, text]) => (
              <TratoCard key={title} variant="compact">
                <p className="font-mono text-xs font-bold uppercase">{title}</p>
                <p className="mt-2 font-heading text-xl font-bold">{text}</p>
              </TratoCard>
            ))}
          </div>
          <TratoCard variant="warning">
            <p className="font-mono text-sm font-bold uppercase">Fatores considerados</p>
            <ul className="mt-3 grid gap-2 text-sm md:grid-cols-2">
              {["número de páginas", "funcionalidades", "integrações", "prazo", "conteúdo", "revisões", "manutenção"].map((factor) => (
                <li key={factor} className="border-2 border-ink-black bg-paper-cream px-3 py-2 font-bold uppercase">
                  {factor}
                </li>
              ))}
            </ul>
          </TratoCard>
        </div>
        <TratoCard variant="compact" className="h-fit bg-soft-sand p-5">
          <form className="grid gap-5" onSubmit={handleSubmit(() => undefined)}>
          <TratoInput label="Valor final" type="number" error={errors.finalPrice?.message} {...register("finalPrice")} />
          <TratoSelect
            label="Forma de pagamento"
            options={[
              { label: "50% entrada / 50% entrega", value: "50% entrada / 50% entrega" },
              { label: "Entrada + 2 parcelas", value: "Entrada + 2 parcelas" },
              { label: "3x por etapa", value: "3x por etapa" },
              { label: paymentTerms, value: paymentTerms }
            ]}
            error={errors.paymentTerms?.message}
            {...register("paymentTerms")}
          />
          {isSubmitSuccessful ? <TratoNotice tone="success">Valor final validado.</TratoNotice> : null}
          <TratoButton type="button" variant="outline" onClick={() => setValue("finalPrice", suggestedPrice)}>Usar preço sugerido</TratoButton>
          <TratoButton type="button" variant="ghost">Editar manualmente</TratoButton>
          <TratoButton type="submit" icon={<Save className="h-5 w-5" />}>Salvar valor final</TratoButton>
          <TratoButton href={`/projetos/${projectId}`} variant="secondary">Voltar ao projeto</TratoButton>
          </form>
        </TratoCard>
      </div>
    </TratoWindow>
  );
}
