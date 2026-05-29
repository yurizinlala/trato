export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCpfCnpj(value: string) {
  const digits = onlyDigits(value).slice(0, 14);

  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
}

export function formatBrazilPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 13);
  const withoutCountry = digits.startsWith("55") ? digits.slice(2) : digits;
  const area = withoutCountry.slice(0, 2);
  const number = withoutCountry.slice(2);

  if (!area) return "";
  if (!number) return `+55 ${area}`;
  if (number.length <= 4) return `+55 ${area} ${number}`;
  if (number.length <= 8) return `+55 ${area} ${number.slice(0, 4)}-${number.slice(4)}`;
  return `+55 ${area} ${number.slice(0, 5)}-${number.slice(5, 9)}`;
}
