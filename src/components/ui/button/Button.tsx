import { forwardRef } from "react";
import { VariantProps } from "cva";

import { cva, cx } from "@/lib/utils";

export const variants = cva({
  base: "inline-flex items-center justify-center rounded text-sm font-medium !outline-none duration-100 disabled:pointer-events-none select-none disabled:opacity-50",
  variants: {
    intent: {
      "none": null,
      "primary":
        "bg-primary hover:bg-primary-hover text-zinc-50 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "ghost-primary": [
        "bg-transparent text-primary",
        "hover:bg-red-100 focus-visible:bg-red-100 active:bg-rose-200 hover:text-rose-700 focus-visible:text-rose-700 active:text-rose-800",
        "dark:hover:bg-red-900 dark:focus-visible:bg-red-900 dark:active:bg-red-800 dark:hover:text-gray-800 dark:focus-visible:text-gray-800 dark:active:text-foreground",
      ],
      "outline": [
        "bg-background border border-gray-300 text-gray-500 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 focus-visible:bg-gray-200 focus-visible:border-gray-400 active:border-gray-500 focus-visible:text-gray-700",
      ],
      "foreground": "bg-gray-800 hover:bg-700 text-foreground",
      "ghost": [
        "bg-transparent text-gray-500 hover:bg-gray-200 active:bg-gray-300 hover:text-gray-700 focus-visible:bg-gray-200 focus-visible:text-gray-700 active:text-foreground",
      ],
      "danger":
        "bg-danger text-zinc-50 border border-danger-hover/50 hover:bg-danger-hover hover:border-danger-outline/50 focus-visible:bg-danger-hover focus-visible:border-danger-outline/50",
      "light-danger": [
        "bg-red-200 hover:bg-rose-300 text-rose-600 hover:text-rose-800 dark:bg-red-900 dark:hover:bg-rose-800 dark:text-rose-300 dark:hover:text-rose-200",
      ],
      "ghost-danger": [
        "bg-transparent text-rgb-red",
        "hover:bg-red-100 focus-visible:bg-red-100 active:bg-rose-200 hover:text-rose-700 focus-visible:text-rose-700 active:text-rose-800",
        "dark:hover:bg-red-900 dark:focus-visible:bg-red-900 dark:active:bg-red-800 dark:hover:text-gray-800 dark:focus-visible:text-gray-800 dark:active:text-foreground",
      ],
      "outline-danger": [
        "border bg-red-50 hover:bg-red-100 border-red-300 text-rgb-red hover:border-rose-400",
        "dark:bg-red-950/50 dark:hover:bg-red-950 dark:border-red-700 dark:hover:border-rose-600",
      ],
      "success":
        "bg-emerald-500 hover:bg-emerald-500 border border-teal-700/50 dark:bg-emerald-600 dark:border-green-500/50 text-background",
      "ghost-success": [
        "bg-transparent text-rgb-green",
        "hover:bg-emerald-100 focus-visible:bg-emerald-100 active:bg-emerald-200 hover:text-emerald-700 focus-visible:text-emerald-700 active:text-emerald-800",
        "dark:hover:bg-green-900 dark:focus-visible:bg-green-900 dark:active:bg-emerald-800 dark:hover:text-gray-800 dark:focus-visible:text-gray-800 dark:active:text-foreground",
      ],
      "blue": "bg-blue-600 hover:bg-blue-500 border border-cyan-700/50 dark:border-sky-500/50 text-background",
      "ghost-blue": [
        "bg-transparent text-rgb-blue",
        "hover:bg-blue-100 focus-visible:bg-blue-100 active:bg-blue-200 hover:text-blue-700 focus-visible:text-blue-700 active:text-blue-800",
        "dark:hover:bg-sky-950 dark:focus-visible:bg-sky-950 dark:active:bg-sky-900 dark:hover:text-blue-400 dark:focus-visible:text-blue-400 dark:active:text-blue-300",
      ],
    },
    size: {
      none: null,
      xs: "px-2 h-6",
      sm: "px-3 h-7",
      md: "px-3 h-8",
      lg: "px-4 h-9",
      xl: "px-5 h-10",
      icon: "shrink-0 size-8",
    },
  },
  defaultVariants: {
    intent: "outline",
    size: "md",
  },
});

export type ButtonVariantProps = VariantProps<typeof variants>;
export interface Props extends React.ComponentPropsWithoutRef<"button">, ButtonVariantProps {}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ intent, size, className, type = "button", ...props }, ref) => (
    <button
      type={type}
      aria-disabled={props?.disabled || undefined}
      className={cx(variants({ intent, size, className }))}
      {...props}
      ref={ref}
    />
  ),
);
Button.displayName = "Button";
