import { VariantProps } from "cva";

import { cva } from "@/lib/utils";

export type IconVariantProps = VariantProps<typeof variants>;
const variants = cva({
  variants: {
    intent: {
      opaque: "text-gray-400 hocus:text-gray-500",
      primary: "text-blue-500 hover:text-blue-600 dark:text-blue-600 dark:hover:text-blue-500",
      success: "text-emerald-400 hover:text-teal-500 dark:text-green-600 dark:hover:text-teal-600",
      blue: "text-blue-400 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400",
      warning: "text-yellow-500 hover:text-amber-500 dark:text-yellow-600 dark:hover:text-amber-600",
      attention: "text-orange-500 hover:text-amber-500 dark:text-orange-600 dark:hover:text-amber-600",
      danger: ["text-red-500 hover:text-rose-600", "dark:text-red-600 dark:hover:text-rose-600"],
    },
  },
  defaultVariants: {
    intent: "opaque",
  },
});

export { variants, variants as iconVariants };
