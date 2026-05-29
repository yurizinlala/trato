import { z } from "zod";
import { projectTypes } from "@/lib/constants";
import { onlyDigits } from "@/lib/formatters";

export const projectSchema = z.object({
  clientId: z.string().min(1, "Selecione um cliente."),
  name: z.string().min(3, "Informe o nome do projeto."),
  type: z.enum(projectTypes as [string, ...string[]]),
  description: z.string().min(10, "Descreva o projeto."),
  desiredDeadline: z
    .string()
    .refine((value) => {
      const days = Number(onlyDigits(value));
      return Number.isInteger(days) && days > 0;
    }, "Informe o prazo em dias."),
  notes: z.string().optional()
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
