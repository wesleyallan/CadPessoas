"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cva, cx } from "@/lib/utils";

import { InputVariantProps } from "./input";

export const variants = cva({
  base: "relative inline-flex items-center rounded text-sm disabled:cursor-not-allowed disabled:opacity-50 !outline-none duration-100",
  variants: {
    intent: {
      none: "",
      outline:
        "text-foreground bg-gray-100 border border-border hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary aria-expanded:border-primary aria-expanded:ring-1 aria-expanded:ring-primary",
      opaque: "bg-gray-200 hover:bg-gray-300 text-foreground",
      ghost:
        "bg-transparent hover:bg-gray-200 focus-visible:bg-gray-200 text-gray-500 focus:text-foreground aria-expanded:bg-gray-200",
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

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

// const SelectValue = SelectPrimitive.Value;
const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ ...props }, ref) => (
  <span className="[&>span]:block [&>span]:truncate">
    <SelectPrimitive.Value ref={ref} {...props} />
  </span>
));
SelectValue.displayName = "SelectValue";

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, keyof InputVariantProps> &
    InputVariantProps & { disableIcon?: boolean | undefined }
>(({ intent = "outline", disableIcon, size, className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={variants({
      intent,
      size,
      className: cx(
        "justify-between text-start text-gray-900 duration-100 [&>span]:line-clamp-1 [&[aria-expanded='true']>svg]:rotate-180",
        disableIcon ? null : "pr-6",
        className,
      ),
    })}
    {...props}>
    {children}
    {disableIcon ? null : (
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="absolute right-2 top-1/2 size-4 -translate-y-1/2 opacity-50 transition-transform will-change-transform" />
      </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cx("flex cursor-default items-center justify-center py-1", className)}
    {...props}>
    <ChevronUp className="size-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cx("flex cursor-default items-center justify-center py-1", className)}
    {...props}>
    <ChevronDown className="size-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { classNameViewport?: string }
>(({ className, classNameViewport, children, position = "popper", collisionPadding = 8, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      collisionPadding={collisionPadding}
      className={cx(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded border border-border bg-background text-gray-700 shadow-light-shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}>
      {/* <SelectScrollUpButton /> */}
      <SelectPrimitive.Viewport
        className={cx(
          "p-1",
          position === "popper" &&
            "grid h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          classNameViewport,
        )}>
        {children}
      </SelectPrimitive.Viewport>
      {/* <SelectScrollDownButton /> */}
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cx("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { indicator?: boolean | undefined }
>(({ className, children, indicator = true, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cx(
      "relative flex h-8 w-full cursor-default select-none items-center rounded-sm px-2 text-sm outline-none focus:bg-gray-200 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      indicator ? "pl-8" : null,
      className,
    )}
    {...props}>
    {indicator ? (
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    ) : null}

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cx("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
