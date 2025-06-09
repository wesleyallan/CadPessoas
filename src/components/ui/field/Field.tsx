import { forwardRef } from "react";
import type { VariantProps } from "cva";

import { cva } from "@/lib/utils";

export const variants = cva({
  base: "flex gap-1",
  variants: {
    orientation: {
      none: "",
      vertical: "flex-col",
      horizontal: "flex-row",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type FieldVariantProps = VariantProps<typeof variants>;
export interface Props extends React.ComponentPropsWithoutRef<"div">, FieldVariantProps {}

export const Field = forwardRef<HTMLDivElement, Props>(({ orientation, className, ...props }, ref) => {
  return (
    <div
      aria-orientation={orientation === "none" ? undefined : orientation || "vertical"}
      className={variants({ orientation, className })}
      {...props}
      ref={ref}
    />
  );
});
Field.displayName = "Field";
