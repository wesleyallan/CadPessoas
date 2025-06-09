"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ClassValue } from "clsx";

import { cx } from "@/lib/utils";

interface ScrollAreaExtraProps {
  className?: string | ClassValue[];
  scrollbarClassName?: string;
  viewportRef?: React.RefObject<HTMLDivElement>;
  viewportClassName?: string;
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  Omit<React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>, "className"> & ScrollAreaExtraProps
>(({ className, scrollbarClassName, viewportRef, viewportClassName, children, ...props }, ref) => {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cx("relative overflow-hidden", className)}
      scrollHideDelay={100}
      {...props}>
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={cx(
          "-m-1 h-[calc(100%+0.5rem)] max-h-[inherit] w-[calc(100%-.125rem)] rounded-[inherit] p-1 transition-[width] duration-75 last:w-[calc(100%+0.5rem)]",
          viewportClassName,
        )}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar className={scrollbarClassName} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cx(
      "flex touch-none select-none rounded-full bg-gray-50 transition-colors",
      orientation === "vertical" && "h-full w-1.5",
      orientation === "horizontal" && "h-1.5",
      className,
    )}
    {...props}>
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-400" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
