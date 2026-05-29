import type { HTMLAttributes } from "react";
import { statusLabels } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { TratoStatus } from "@/types/status";

type TratoBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status: TratoStatus;
};

const badgeClass: Record<TratoStatus, string> = {
  novo: "bg-warning-yellow text-ink-black",
  briefing_enviado: "bg-soft-gray text-ink-black",
  briefing_recebido: "bg-warning-yellow text-ink-black",
  em_analise: "bg-soft-sand text-ink-black",
  escopo_aprovado: "bg-pen-blue text-paper-cream",
  contrato_gerado: "bg-trato-orange text-paper-cream",
  em_desenvolvimento: "bg-success-green text-paper-cream",
  entregue: "bg-success-green text-paper-cream",
  cancelado: "bg-danger-red text-paper-cream",
  rascunho: "bg-soft-gray text-ink-black",
  gerado: "bg-warning-yellow text-ink-black",
  enviado: "bg-pen-blue text-paper-cream",
  assinado_externamente: "bg-success-green text-paper-cream",
  arquivado: "bg-ink-black text-paper-cream"
};

export function TratoBadge({ status, className, ...props }: TratoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center whitespace-nowrap border-2 border-ink-black px-2.5 py-1 font-mono text-xs font-bold uppercase leading-none shadow-hard-sm",
        badgeClass[status],
        className
      )}
      {...props}
    >
      {statusLabels[status]}
    </span>
  );
}
