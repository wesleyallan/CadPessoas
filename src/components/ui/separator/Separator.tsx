"use client";

import * as React from "react";
import { VariantProps } from "cva";

import { cva } from "@/lib/utils";

export type Variants = VariantProps<typeof variants>;
export const variants = cva({
  base: "shrink-0 bg-border border-0",
  variants: {
    orientation: {
      horizontal: "h-px max-h-px",
      vertical: "w-px max-w-px",
    },
  },
});

export type Props = React.ComponentPropsWithoutRef<"hr"> & Variants;
export const Separator = React.forwardRef<React.ElementRef<"hr">, Props>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <hr aria-orientation={orientation} className={variants({ orientation, className })} {...props} ref={ref} />
  ),
);
Separator.displayName = "Separator";
