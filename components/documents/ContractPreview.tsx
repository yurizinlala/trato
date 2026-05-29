import { contractSections } from "@/lib/document-placeholders";
import { formatCurrency } from "@/lib/utils";
import type { Contract } from "@/types/contract";

export function ContractPreview({ contract }: { contract: Contract }) {
  return (
    <div className="a4-ratio document-paper mx-auto w-full max-w-3xl border-3 border-ink-black bg-paper-cream p-8 shadow-hard-lg">
      <h2 className="text-center font-serif text-3xl font-bold uppercase">
        Contrato de Prestação de Serviços de Desenvolvimento Digital
      </h2>
      <p className="mt-4 text-center font-serif italic">Minuta gerada via Plataforma Trato.</p>
      <div className="my-8 border-t-3 border-ink-black" />
      <div className="grid gap-5 font-serif text-base leading-7">
        <p>
          Pelo presente instrumento particular, de um lado <strong>{contract.contractor}</strong>,
          inscrita no CPF/CNPJ sob nº <strong>{contract.contractorDocument}</strong>, e de outro
          lado <strong>{contract.contracted}</strong>, têm entre si justo e contratado o que segue.
        </p>
        <p>
          O presente contrato tem por objeto {contract.object.toLowerCase()} pelo valor de{" "}
          <strong>{formatCurrency(contract.value)}</strong>, com pagamento em {contract.paymentTerms}.
        </p>
        <p>
          O escopo compreende: <em>{contract.scope}</em>. O prazo previsto é de {contract.deadline}.
        </p>
      </div>
      <div className="mt-8 grid gap-3">
        {contractSections.map((section) => (
          <div key={section} className="border-b border-ink-black/30 pb-2">
            <h3 className="font-serif text-sm font-bold uppercase">{section}</h3>
          </div>
        ))}
      </div>
      <p className="mt-8 border-2 border-ink-black bg-warning-yellow p-3 font-mono text-xs font-bold uppercase">
        Minuta gerada automaticamente. Revise antes de enviar para assinatura.
      </p>
    </div>
  );
}
