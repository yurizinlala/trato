import { z } from "zod";
import { isValidBrazilPhone, isValidCpfCnpj } from "@/lib/validators";

export const clientSchema = z.object({
  name: z.string().min(3, "Informe o nome completo."),
  company: z.string().min(2, "Informe a empresa ou use Independente."),
  document: z.string().min(11, "Informe CPF ou CNPJ.").refine(isValidCpfCnpj, "CPF/CNPJ inválido."),
  email: z.string().email("Informe um e-mail válido."),
  whatsapp: z.string().min(10, "Informe o WhatsApp.").refine(isValidBrazilPhone, "WhatsApp inválido."),
  city: z.string().min(2, "Informe a cidade."),
  state: z.string().min(2, "Informe o estado."),
  address: z.string().optional(),
  notes: z.string().optional()
});

export type ClientFormValues = z.infer<typeof clientSchema>;
