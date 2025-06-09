import { forwardRef } from "react";
import type { VariantProps } from "cva";

import { cva } from "@/lib/utils";

export const variants = cva({
  base: "inline-flex items-center w-full min-w-0 rounded text-sm disabled:cursor-not-allowed placeholder-gray-400 disabled:opacity-50 !outline-none duration-base",
  variants: {
    intent: {
      none: "",
      outline:
        "text-gray-900 bg-gray-100 border border-border hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary",
      opaque: "bg-gray-200 hover:bg-gray-300 text-gray-900",
      ghost: "hover:bg-gray-200 focus:bg-gray-200 text-gray-500 focus:text-gray-900",
    },
    size: {
      none: "",
      xs: "px-2 h-6",
      sm: "px-2.5 h-7",
      md: "px-3 h-8",
      lg: "px-3 h-9",
      xl: "px-4 h-10",
    },
  },
  defaultVariants: {
    intent: "outline",
    size: "md",
  },
});

export type InputVariantProps = VariantProps<typeof variants>;
export interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputVariantProps>,
    InputVariantProps {}

export const Input = forwardRef<HTMLInputElement, Props>(({ intent, size, className, ...props }, ref) => {
  return (
    <input
      aria-disabled={props?.disabled || undefined}
      aria-readonly={props?.readOnly || undefined}
      className={variants({ intent, size, className })}
      {...props}
      ref={ref}
    />
  );
});
Input.displayName = "Input";
