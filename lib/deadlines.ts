import { onlyDigits } from "@/lib/formatters";

export function parseDeadlineToDays(value: string | number | null | undefined) {
  if (typeof value === "number") return Number.isFinite(value) && value > 0 ? String(Math.round(value)) : "";
  if (!value) return "";

  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const digits = onlyDigits(normalized);
  const amount = Number(digits);

  if (!amount) return "";
  if (normalized.includes("semana")) return String(amount * 7);
  return String(amount);
}

export function formatDeadlineDays(value: string | number | null | undefined) {
  const days = Number(parseDeadlineToDays(value));
  if (!days) return "";
  return days === 1 ? "1 dia" : `${days} dias`;
}

export function deadlineDateFromDays(value: string | number, startDate = new Date()) {
  const days = Number(parseDeadlineToDays(value));
  const date = new Date(startDate);
  date.setDate(date.getDate() + (Number.isFinite(days) ? days : 0));
  return date.toISOString().slice(0, 10);
}
