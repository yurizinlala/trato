"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ProjectScope } from "@/types/project";
import { TratoButton } from "@/components/ui/TratoButton";
import { TratoCard } from "@/components/ui/TratoCard";
import { TratoInput } from "@/components/ui/TratoInput";
import { TratoNotice } from "@/components/ui/TratoNotice";
import { TratoTextarea } from "@/components/ui/TratoTextarea";
import { TratoWindow } from "@/components/ui/TratoWindow";

const scopeSchema = z.object({
  summary: z.string().min(10, "Informe o resumo."),
  includedPages: z.string().min(2, "Informe páginas/telas."),
  includedFeatures: z.string().min(2, "Informe funcionalidades incluídas."),
  excludedFeatures: z.string().min(2, "Informe itens fora do escopo."),
  deliverables: z.string().min(2, "Informe entregáveis."),
  estimatedDeadline: z.string().min(2, "Informe o prazo."),
  notes: z.string().optional(),
  questions: z.string().optional()
});

type ScopeFormValues = z.infer<typeof scopeSchema>;

export function ScopeForm({ scope, projectId }: { scope: ProjectScope; projectId: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful }
  } = useForm<ScopeFormValues>({
    resolver: zodResolver(scopeSchema),
    defaultValues: {
      summary: scope.summary,
      includedPages: scope.includedPages.join("\n"),
      includedFeatures: scope.includedFeatures.join("\n"),
      excludedFeatures: scope.excludedFeatures.join("\n"),
      deliverables: scope.deliverables.join("\n"),
      estimatedDeadline: scope.estimatedDeadline,
      notes: scope.notes,
      questions: scope.questions.join("\n")
    }
  });

  const values = watch();

  return (
    <div className="grid gap-6 xl:grid-cols-scope-preview">
      <TratoWindow title="escopo.editável" tone="blue">
        <form className="grid gap-5" onSubmit={handleSubmit(() => undefined)}>
          <TratoTextarea label="Resumo do projeto" error={errors.summary?.message} {...register("summary")} />
          <TratoTextarea label="Páginas/telas incluídas" error={errors.includedPages?.message} {...register("includedPages")} />
          <TratoTextarea label="Funcionalidades incluídas" error={errors.includedFeatures?.message} {...register("includedFeatures")} />
          <TratoTextarea label="Funcionalidades não incluídas" error={errors.excludedFeatures?.message} {...register("excludedFeatures")} />
          <TratoTextarea label="Entregáveis" error={errors.deliverables?.message} {...register("deliverables")} />
          <TratoInput label="Prazo estimado" error={errors.estimatedDeadline?.message} {...register("estimatedDeadline")} />
          <TratoTextarea label="Observações" error={errors.notes?.message} {...register("notes")} />
          <TratoTextarea label="Pontos para confirmar" error={errors.questions?.message} {...register("questions")} />
          {isSubmitSuccessful ? <TratoNotice tone="success">Escopo validado.</TratoNotice> : null}
          <div className="flex flex-wrap gap-3">
            <TratoButton type="submit" icon={<Save className="h-5 w-5" />}>Salvar escopo</TratoButton>
            <TratoButton href={`/projetos/${projectId}`} variant="outline">Aplicar ao projeto</TratoButton>
            <TratoButton href={`/preco/${projectId}`} variant="secondary" icon={<FileText className="h-5 w-5" />}>Gerar proposta</TratoButton>
          </div>
        </form>
      </TratoWindow>

      <TratoWindow title="preview.escopo" tone="orange" className="h-fit">
        <div className="grid gap-4">
          <TratoCard variant="document">
            <h2 className="font-heading text-2xl font-bold uppercase">Escopo sugerido</h2>
            <p className="mt-3 text-ink-black/75">{values.summary}</p>
          </TratoCard>
          {[
            ["Páginas", values.includedPages],
            ["Funcionalidades", values.includedFeatures],
            ["Fora do escopo", values.excludedFeatures],
            ["Entregáveis", values.deliverables]
          ].map(([title, content]) => (
            <TratoCard key={title} variant="compact">
              <h3 className="font-mono text-sm font-bold uppercase">{title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm">{content}</p>
            </TratoCard>
          ))}
        </div>
      </TratoWindow>
    </div>
  );
}
