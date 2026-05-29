import { onlyDigits } from "@/lib/formatters";

function allSameDigits(value: string) {
  return /^(\d)\1+$/.test(value);
}

export function isValidCpf(value: string) {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || allSameDigits(digits)) return false;

  const calcDigit = (factor: number) => {
    const total = digits
      .slice(0, factor - 1)
      .split("")
      .reduce((sum, digit, index) => sum + Number(digit) * (factor - index), 0);
    const rest = (total * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return calcDigit(10) === Number(digits[9]) && calcDigit(11) === Number(digits[10]);
}

export function isValidCnpj(value: string) {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || allSameDigits(digits)) return false;

  const calcDigit = (base: string) => {
    const weights = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const total = base.split("").reduce((sum, digit, index) => sum + Number(digit) * weights[index], 0);
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const first = calcDigit(digits.slice(0, 12));
  const second = calcDigit(`${digits.slice(0, 12)}${first}`);
  return first === Number(digits[12]) && second === Number(digits[13]);
}

export function isValidCpfCnpj(value: string) {
  const digits = onlyDigits(value);
  if (digits.length === 11) return isValidCpf(value);
  if (digits.length === 14) return isValidCnpj(value);
  return false;
}

export function isValidBrazilPhone(value: string) {
  const digits = onlyDigits(value);
  const withoutCountry = digits.startsWith("55") ? digits.slice(2) : digits;
  return withoutCountry.length === 10 || withoutCountry.length === 11;
}
