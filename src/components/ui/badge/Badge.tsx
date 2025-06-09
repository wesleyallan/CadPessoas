"use client";

import { forwardRef } from "react";
import type { VariantProps } from "cva";

import { cva } from "@/lib/utils";

export const variants = cva({
  base: "inline-flex items-center font-medium rounded-full !outline-none grow-0 transition-colors",
  variants: {
    intent: {
      none: null,
      primary:
        "bg-blue-200 hover:bg-blue-300 dark:bg-primary/50 dark:hover:bg-primary/65 text-sky-700 dark:text-cyan-200",
      outline: "bg-background border border-border hover:bg-gray-100 text-gray-500",
      opaque: "bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900 border border-gray-1000/[3%]",
      success:
        "bg-green-200 hover:bg-emerald-300 text-emerald-700 dark:bg-green-900 dark:hover:bg-emerald-800 dark:text-emerald-300",
      danger: "bg-red-200 hover:bg-rose-300 text-rose-600 dark:bg-red-900 dark:hover:bg-rose-800 dark:text-rose-300",
      warning:
        "bg-yellow-200 hover:bg-amber-300 text-amber-700 dark:bg-yellow-900 dark:hover:bg-amber-800 dark:text-amber-300",
      info: "bg-blue-200 hover:bg-sky-300 text-sky-700 dark:bg-blue-900 dark:hover:bg-sky-800 dark:text-sky-300",
      tsm: [
        "bg-blue-300/70 text-[#305496] hover:bg-indigo-300 hover:text-[#23348b]",
        "dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-indigo-900 dark:hover:text-[#23348b]",
      ],
    },
    size: {
      sm: "px-2 py-[0.0625rem] text-xs",
      md: "px-2.5 h-5 text-xs",
      lg: "px-3 py-1 text-sm",
      icon: "p-1 text-sm",
    },
  },
  defaultVariants: {
    intent: "opaque",
    size: "md",
  },
});

export type BadgeVariantProps = VariantProps<typeof variants>;
export interface Props
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, keyof BadgeVariantProps>,
    BadgeVariantProps {}

export const Badge = forwardRef<HTMLSpanElement, Props>(({ intent, size, className, ...props }, ref) => {
  return <span {...props} className={variants({ intent, size, className })} ref={ref} />;
});
Badge.displayName = "Badge";
