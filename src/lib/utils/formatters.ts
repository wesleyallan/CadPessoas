export const toNumber = (value: unknown): number => {
  if (typeof value === "string") return Number(value.replace(/,/g, ".").replace(/[^\d.]/g, "")) || 0;
  return Number(value) || 0;
};
export const numbersToString = (value: number | string): string => {
  return value?.toString()?.replace(/\D/g, "") ?? "";
};
export const toLetters = (value: number | string): string => {
  return value?.toString()?.replace(/[0-9]/g, "") ?? "";
};

export const toCep = (value: number | string): string | undefined => {
  if (!`${value}`) return undefined;
  const numbers = numbersToString(value);
  if (numbers.length < 1) return numbers;
  if (numbers.length > 5) return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  return numbers;
};

export const toCNPJ = (value: number | string): string | undefined => {
  const numbers = numbersToString(value);
  let res = numbers.slice(0, 2);
  if (numbers.length > 2) res += `.${numbers.slice(2, 5)}`;
  if (numbers.length > 5) res += `.${numbers.slice(5, 8)}`;
  if (numbers.length > 8) res += `/${numbers.slice(8, 12)}`;
  if (numbers.length > 12) res += `-${numbers.slice(12, 14)}`;
  return res;
};

export const toCPF = (value: number | string): string | undefined => {
  if (!`${value}`) return undefined;
  const numbers = numbersToString(value);
  let res = numbers.slice(0, 3);
  if (numbers.length > 3) res += `.${numbers.slice(3, 6)}`;
  if (numbers.length > 6) res += `.${numbers.slice(6, 9)}`;
  if (numbers.length > 9) res += `-${numbers.slice(9, 11)}`;
  return res;
};

export const toCPForCNPJ = (value: number | string): string | undefined => {
  const numbers = numbersToString(value);
  if (numbers.length < 1) return numbers;
  if (numbers.length <= 11) return toCPF(numbers);
  return toCNPJ(numbers);
};

interface toCurrencyOptionsProps {
  minDigits?: number;
  maxDigits?: number;
}
export const toCurrency = (
  value: number | string,
  currency: string = "BRL",
  options?: toCurrencyOptionsProps,
): string | undefined => {
  if (!`${value}`) return undefined;
  const numbers = toNumber(typeof value == "number" ? value.toFixed(options?.minDigits ?? 2) : value);
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: options?.minDigits ?? 2,
    maximumFractionDigits: Math.max(options?.maxDigits ?? 2),
  });
  return formatter.format(numbers);
};

interface ToDecimalOptions {
  separator?: string;
}
export const toDecimal = (value: number | string, options?: ToDecimalOptions | undefined): string | undefined => {
  if (!value) return "";
  if (typeof value === "number") return String(value)?.replace(".", options?.separator ?? ",");
  return String(value).replace(".", options?.separator ?? ",");
};

interface FromConverterOptions {
  fallback?: number;
}

export const fromDecimal = (value?: string | number | undefined | null, options?: FromConverterOptions | undefined) => {
  if (!value) return options?.fallback ?? 0;
  if (typeof value == "number") return value;
  return Number(value?.replace(/,/g, ".").replace(/[^\d.]/g, "")) || (options?.fallback ?? 0);
};

export const toPhone = (value: number | string): string | undefined => {
  const numbers = numbersToString(value);
  if (!numbers) return "";
  if (numbers.length > 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  if (numbers.length > 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  if (numbers.length > 2) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return numbers;
};

export const toRG = (value: number | string): string | undefined => {
  const numbers = numbersToString(value);
  if (!numbers) return "";
  let res = numbers.slice(0, 2);
  if (numbers.length > 2) res += `.${numbers.slice(2, 5)}`;
  if (numbers.length > 5) res += `.${numbers.slice(5, 8)}`;
  if (numbers.length > 8) res += `-${numbers.slice(8, 9)}`;
  return res;
};

export const toLifetimeString = (date: Date): string => {
  const seconds = (Date.now() - date.valueOf()) / 1000;
  if (seconds <= 10) return "agora mesmo";
  if (seconds < 60) return "menos de 1 minuto";

  const minutes = seconds / 60;
  if (minutes < 60) return Math.floor(minutes) == 1 ? "1 minuto" : `${Math.floor(minutes)} minutos`;

  const hours = minutes / 60;
  if (hours < 24) return Math.floor(hours) == 1 ? "1 hora" : `${Math.floor(hours)} horas`;

  const days = hours / 24;
  if (days < 30) return Math.floor(days) == 1 ? "1 dia" : `${Math.floor(days)} dias`;

  const months = days / 30;
  if (months < 12) return Math.floor(months) == 1 ? "1 mês" : `${Math.floor(months)} meses`;

  const years = months / 12.25;
  return Math.floor(years) == 1 ? "1 ano" : `${Math.floor(years)} anos`;
};

export const normalizeStr = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};
