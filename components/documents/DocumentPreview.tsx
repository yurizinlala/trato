import { FileText } from "lucide-react";
import { TratoWindow } from "@/components/ui/TratoWindow";
import type { Document } from "@/types/document";

type DocumentPreviewProps = {
  title: string;
  subtitle?: string;
  document?: Document;
  children?: React.ReactNode;
};

export function DocumentPreview({ title, subtitle, document, children }: DocumentPreviewProps) {
  return (
    <TratoWindow title="preview.pdf - visualizador visual" tone="blue" bodyClassName="bg-soft-gray p-6">
      <div className="a4-ratio document-paper mx-auto w-full max-w-3xl bg-paper-cream p-8 shadow-hard-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-4xl font-bold uppercase leading-tight">{title}</h2>
            <p className="mt-3 font-mono text-sm">Referência: {document?.id.toUpperCase() ?? "DOC-TRATO"}</p>
          </div>
          <div className="-rotate-3 border-3 border-ink-black px-3 py-1 font-heading text-xl font-bold text-trato-orange">
            TRATO
          </div>
        </div>
        <div className="my-8 border-t-3 border-ink-black" />
        {subtitle ? <p className="mb-5 font-heading text-xl font-bold">{subtitle}</p> : null}
        {children ?? (
          <div className="grid gap-5">
            {["w-8/12", "w-11/12", "w-10/12", "w-9/12", "w-11/12", "w-8/12"].map((widthClass) => (
              <div key={widthClass} className={`${widthClass} h-4 bg-soft-gray`} />
            ))}
            <div className="mt-10 grid grid-cols-2 gap-10">
              <div className="border-t-3 border-ink-black pt-2 font-mono text-xs uppercase">Assinatura contratante</div>
              <div className="border-t-3 border-ink-black pt-2 font-mono text-xs uppercase">Assinatura contratada</div>
            </div>
          </div>
        )}
        <div className="mt-auto pt-8 text-right text-ink-black/40">
          <FileText className="ml-auto h-5 w-5" />
        </div>
      </div>
    </TratoWindow>
  );
}
