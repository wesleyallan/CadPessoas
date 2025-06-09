"use client";

import * as React from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { VariantProps } from "cva";
import { AnimatePresence, motion } from "framer-motion";

import { cva, cx } from "@/lib/utils";

const sizes = {
  none: null,
  sm: "size-4",
  md: "size-[1.125rem]",
  lg: "size-5",
};

type InputVariantsProps = VariantProps<typeof inputVariants>;
const inputVariants = cva({
  base: "peer absolute inset-0 size-full appearance-none rounded transition-all duration-100 !outline-none disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    intent: {
      none: null,
      primary: [
        "bg-gray-300 hover:bg-gray-400 active:bg-gray-500 checked:bg-primary hover:checked:bg-primary-hover border border-gray-400/10 hover:border-gray-500/10 checked:border-primary-hover/10 checked:hover:border-transparent",
        "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      ],
      outline: [
        "bg-transparent checked:bg-gray-800 [&:not(:checked)]:hover:bg-gray-200 border border-border checked:border-gray-800 [&:not(:checked)]:hover:border-gray-400",
        "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      ],
      opaque: [
        "bg-gray-300 hover:bg-gray-400 active:bg-gray-500 checked:bg-gray-800 hover:checked:bg-gray-700 border border-gray-400/10 hover:border-gray-500/10 checked:border-gray-400/10 checked:hover:border-gray-400/20",
        "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      ],
    },
    size: sizes,
  },
  defaultVariants: {
    intent: "outline",
  },
});

const svgVariants = cva({
  base: "pointer-events-none relative z-[1] shrink-0 transition-colors",
  variants: {
    intent: {
      none: null,
      primary: "text-background",
      outline: "text-foreground peer-checked:text-background",
      opaque: "text-foreground peer-checked:text-background",
    } satisfies Record<NonNullable<InputVariantsProps["intent"]>, unknown>,
    size: {
      none: null,
      sm: "size-3",
      md: "size-3",
      lg: "size-3.5",
    } satisfies Record<NonNullable<keyof typeof sizes>, unknown>,
  },
  defaultVariants: {
    intent: "outline",
  },
});

export interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputVariantsProps>,
    InputVariantsProps {
  wrapperClassName?: string;
  onCheckedChange?: (checked: boolean) => unknown;
  d?: string;
}
export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      defaultChecked,
      checked: propChecked,
      onCheckedChange,
      className,
      wrapperClassName,
      intent,
      size = "md",
      d = "M4 12 L9 17 L20 6",
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = useControllableState({
      defaultProp: defaultChecked ?? false,
      prop: propChecked,
      onChange: onCheckedChange,
    });

    return (
      <div
        className={cx(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          size ? sizes[size] : null,
          wrapperClassName,
        )}>
        <input
          aria-checked={checked ? true : false}
          ref={ref}
          type="checkbox"
          className={cx(
            // "outline-no peer absolute inset-0 size-full appearance-none rounded border bg-transparent transition-colors duration-100 focus-visible:outline-0 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            // "border-border checked:border-transparent focus-visible:ring-gray-500 checked:focus-visible:border-foreground checked:focus-visible:ring-foreground",
            // "checked:bg-gray-800 [&:not(:checked)]:hover:border-gray-400 [&:not(:checked)]:hover:bg-gray-200 [&:not(:checked)]:focus-visible:border-gray-400",
            inputVariants({ intent, size: "none", className }),
          )}
          {...props}
          checked={checked ? true : false}
          onChange={(ev) => {
            if (props.readOnly || props.disabled) {
              ev.preventDefault();
              return;
            }
            const c = ev.currentTarget.checked;
            setChecked(c);
            if (props?.onChange) props?.onChange?.(ev);
          }}
        />
        <AnimatePresence>
          {checked ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
                className={cx(
                  svgVariants({ intent, size }),
                  // "pointer-events-none relative z-[1] shrink-0 text-foreground transition-colors peer-checked:text-background",
                  // svgSizes[size],
                )}>
                <motion.path
                  d={d}
                  initial={{
                    opacity: 0,
                    pathLength: 0,
                    strokeLinecap: "butt",
                  }}
                  animate={{
                    opacity: 1,
                    pathLength: 1,
                    strokeLinecap: "round",
                    transition: {
                      ease: "easeInOut",
                      delay: 0.05,
                      duration: 0.05,
                      opacity: { duration: 0.05, delay: 0 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    pathLength: 0,
                    strokeLinecap: "butt",
                    transition: {
                      ease: "easeIn",
                      duration: 0.15,
                      strokeLinecap: { delay: 0.15 },
                      opacity: { duration: 0.2 },
                    },
                  }}
                />
              </svg>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
