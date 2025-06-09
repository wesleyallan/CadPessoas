import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps } from "cva";

import { cva } from "@/lib/utils";

export type Variants = VariantProps<typeof variants>;
export const variants = cva({
  base: "p-card mx-auto",
  variants: {
    intent: {
      none: null,
      default: "bg-background rounded-md ring-1 dark:ring-gray-300/70  ring-[rgba(9,9,11,.05)] shadow-light-shadow-md",
    },
    size: { full: "max-w-full w-full" },
  },
  defaultVariants: {
    intent: "default",
    size: "full",
  },
});

export interface Props extends Omit<React.ComponentPropsWithoutRef<"div">, keyof Variants>, Variants {
  asChild?: boolean;
}

export const Card = forwardRef<HTMLDivElement, Props>(({ asChild, className, intent, size, ...props }, ref) => {
  const Component: React.ElementType = asChild === true ? Slot : "div";
  return <Component className={variants({ intent, size, className })} {...props} {...{ ref }} />;
});
Card.displayName = "Card";
