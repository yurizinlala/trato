import { z } from "zod";
import { onlyDigits } from "@/lib/formatters";
import { isValidBrazilPhone, isValidCpfCnpj } from "@/lib/validators";

export const briefingSchema = z.object({
  name: z.string().min(3, "Informe seu nome."),
  company: z.string().min(2, "Informe empresa ou Independente."),
  document: z.string().refine(isValidCpfCnpj, "Informe um CPF ou CNPJ válido."),
  email: z.string().email("Informe um e-mail válido."),
  whatsapp: z.string().refine(isValidBrazilPhone, "Informe um WhatsApp válido."),
  cityState: z.string().min(4, "Informe cidade e estado."),
  projectType: z.string().min(1, "Escolha um tipo de projeto."),
  objective: z.string().min(20, "Conte um pouco mais sobre o objetivo."),
  goals: z.array(z.string()).min(1, "Selecione ao menos um objetivo."),
  features: z.array(z.string()).min(1, "Selecione ao menos uma funcionalidade."),
  hasDomain: z.boolean().default(false),
  hasHosting: z.boolean().default(false),
  hasLogo: z.boolean().default(false),
  hasTexts: z.boolean().default(false),
  hasImages: z.boolean().default(false),
  hasReferences: z.boolean().default(false),
  referenceLinks: z.string().optional(),
  notes: z.string().optional(),
  desiredDeadline: z
    .string()
    .refine((value) => {
      const days = Number(onlyDigits(value));
      return Number.isInteger(days) && days > 0;
    }, "Informe o prazo em dias."),
  budgetRange: z.string().min(1, "Escolha uma faixa de investimento.")
});

export type BriefingFormValues = z.infer<typeof briefingSchema>;
