import { z } from "zod";

export const contractSchema = z.object({
  clientId: z.string().min(1, "Selecione o cliente."),
  projectId: z.string().min(1, "Selecione o projeto."),
  template: z.string().min(1, "Selecione o template."),
  contractor: z.string().min(3, "Informe o contratante."),
  contractorDocument: z.string().min(11, "Informe CPF/CNPJ do contratante."),
  contracted: z.string().min(3, "Informe o contratado."),
  contractedDocument: z.string().min(11, "Informe CPF/CNPJ do contratado."),
  object: z.string().min(10, "Informe o objeto."),
  scope: z.string().min(20, "Informe o escopo."),
  deadline: z.string().min(2, "Informe o prazo."),
  value: z.coerce.number().min(1, "Informe o valor."),
  paymentTerms: z.string().min(5, "Informe a forma de pagamento."),
  revisions: z.string().min(1, "Informe as revisões."),
  warranty: z.string().min(1, "Informe a garantia."),
  jurisdiction: z.string().min(3, "Informe o foro."),
  observations: z.string().optional()
});

export type ContractFormValues = z.infer<typeof contractSchema>;
