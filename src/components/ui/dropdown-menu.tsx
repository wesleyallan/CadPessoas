"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { VariantProps } from "cva";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

import { cva, cx } from "@/lib/utils";
import Checkbox from "@/components/ui/checkbox";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> &
    VariantProps<typeof dropdownMenuItemVariants> & {
      chevron?: "left" | "right" | false;
    }
>(({ className, intent, size, children, chevron = "right", ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={dropdownMenuItemVariants({ intent, size, className })}
    {...props}>
    {chevron === "left" ? <ChevronLeft className="mr-2 size-4 text-gray-500" /> : null}
    {children}
    {chevron === "right" ? <ChevronRight className="ml-auto size-4 text-gray-500" /> : null}
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cx(
      "z-50 min-w-[8rem] overflow-hidden rounded border border-border bg-background p-1 text-gray-700 shadow-light-shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, collisionPadding = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cx(
        "z-50 min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-hidden rounded border border-border bg-background p-1 text-gray-700 shadow-light-shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItemVariants>;
export const dropdownMenuItemVariants = cva({
  base: "relative flex cursor-default select-none items-center rounded-sm px-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  variants: {
    intent: {
      none: null,
      default: "text-gray-700 focus:bg-gray-200 focus:text-foreground",
      danger: "text-rgb-red focus:bg-red-100 dark:focus:text-gray-800 dark:focus:bg-red-900",
    },
    size: {
      sm: "h-7",
      md: "h-8",
      lg: "h-9",
    },
  },
  defaultVariants: { intent: "default", size: "md" },
});
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & DropdownMenuItemVariants
>(({ className, intent, size, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} className={dropdownMenuItemVariants({ intent, size, className })} {...props} />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cx(
      "group/check relative flex h-[1.875rem] cursor-default select-none items-center gap-2 rounded-sm pl-1 pr-2 text-sm text-gray-700 outline-none transition-colors focus:bg-gray-200 focus:text-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}>
    <Checkbox
      intent="opaque"
      checked={(checked as boolean) || false}
      className="[&:not(:checked):not(:active)]:group-hover/check:bg-gray-400"
      onClick={(ev) => {
        ev.stopPropagation();
        if (props.onCheckedChange) {
          props.onCheckedChange(!checked);
        }
        if (props?.onSelect) {
          const event = new Event("menu.itemSelect", { bubbles: true, cancelable: true, composed: false });
          props.onSelect(event);
        }
      }}
    />
    {/* <span className="group absolute left-1.5 flex size-5 items-center justify-center rounded-sm border border-border/20 bg-gray-200 transition-all active:scale-[.95] group-hover/checked:border-gray-400/10 group-hover/check:bg-gray-300">
      <AnimatePresence>
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            className={cx("pointer-events-none size-3.5 shrink-0 text-foreground transition-colors")}>
            <motion.path
              d="M4 12 L9 17 L20 6"
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
                  duration: 0.075,
                  strokeLinecap: { delay: 0.075, duration: 0 },
                  opacity: { duration: 0.1 },
                },
              }}
            />
          </svg>
        ) : null}
      </AnimatePresence>
    </span> */}
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cx(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-200 focus:text-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuTitle = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cx("-m-1 bg-gray-100 px-3 py-2 text-sm text-gray-800", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuTitle.displayName = "DropdownMenuTitle";

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cx("px-2 py-1 text-sm text-gray-800", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cx("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cx("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuTitle,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
