import { z } from "zod";

export const settingsSchema = z.object({
  name: z.string().min(3, "Informe o nome."),
  document: z.string().min(11, "Informe CPF/CNPJ."),
  email: z.string().email("Informe um e-mail válido."),
  whatsapp: z.string().min(10, "Informe o WhatsApp."),
  city: z.string().min(2, "Informe a cidade."),
  state: z.string().min(2, "Informe o estado."),
  address: z.string().min(5, "Informe o endereço."),
  defaultJurisdiction: z.string().min(3, "Informe o foro padrão."),
  defaultRevisionLimit: z.string().min(1, "Informe o limite de revisões."),
  defaultWarranty: z.string().min(1, "Informe a garantia padrão."),
  defaultPaymentTerms: z.string().min(3, "Informe a forma de pagamento."),
  logo: z.string().optional(),
  primaryColor: z.string().min(4, "Informe a cor principal."),
  defaultTemplate: z.string().min(3, "Informe o template padrão."),
  defaultClauses: z.string().min(10, "Informe cláusulas padrão.")
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
