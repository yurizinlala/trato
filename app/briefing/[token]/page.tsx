import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/PublicShell";
import { BriefingWizard } from "@/components/forms/BriefingWizard";

export const metadata: Metadata = {
  title: "Briefing público"
};

export default function PublicBriefingPage() {
  return (
    <PublicShell>
      <div className="grid max-w-3xl gap-3 text-center">
        <h1 className="font-heading text-4xl font-bold uppercase md:text-5xl">Iniciar Novo Projeto</h1>
        <p className="text-lg text-ink-black/75">
          Preencha os dados abaixo para que possamos entender melhor sua necessidade e preparar uma proposta sob medida.
        </p>
      </div>
      <BriefingWizard />
    </PublicShell>
  );
}
