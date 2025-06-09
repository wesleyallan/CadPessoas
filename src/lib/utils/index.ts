import { type ClassValue, clsx } from "clsx";
import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";

export const { cva, cx } = defineConfig({
  hooks: { onComplete: (className) => twMerge(className) },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toTitleCase = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
