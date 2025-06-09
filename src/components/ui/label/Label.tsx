import * as React from "react";
import type { VariantProps } from "cva";

import { cva } from "@/lib/utils";

export const variants = cva({
  base: "text-sm text-gray-500 transition-colors truncate w-fit max-w-full",
  variants: {
    required: {
      false: null,
      true: 'after:content-["*"] after:text-red-500',
    },
  },
  defaultVariants: {
    required: false,
  },
});

export type LabelVariantProps = VariantProps<typeof variants>;
export interface Props extends React.ComponentPropsWithoutRef<"label">, LabelVariantProps {}

const Label = React.forwardRef<HTMLLabelElement, Props>(({ required, className, ...props }, ref) => (
  <label aria-required={required || undefined} className={variants({ required, className })} {...props} ref={ref} />
));
Label.displayName = "Label";

export { Label };
