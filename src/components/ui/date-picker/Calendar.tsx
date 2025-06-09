"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cx } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentPropsWithoutRef<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cx("p-2", className)}
      locale={ptBR}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-start pt-1 relative items-center",
        caption_label: "text-sm font-medium capitalize",
        nav: "space-x-1 flex absolute right-0 items-center",
        nav_button: cx(
          buttonVariants({ intent: "outline", size: "icon" }),
          "size-7 opacity-75 focus-visible:opacity-100 hover:opacity-100 duration-0",
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-gray-500 rounded w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cx(
          "group/cell relative p-0 w-9 last:w-[2.125rem] last:pl-0.5 first:w-[2.125rem] first:pr-0.5 text-center text-sm focus-within:relative focus-within:z-20 first:rounded-l last:rounded-r",
          props.mode === "range"
            ? "[&:has([aria-selected])]:[&:not(:has(.day-range-start.day-range-end))]:bg-primary/40 relative [&:has(.day-range-end)]:after:absolute [&:has(.day-range-end)]:after:w-1/2 [&:has(.day-range-end)]:after:h-full [&:has(.day-range-end)]:after:bg-background [&:has(.day-range-end)]:after:right-0 [&:has(.day-range-start)]:after:absolute [&:has(.day-range-start)]:after:w-1/2 [&:has(.day-range-start)]:after:h-full [&:has(.day-range-start)]:after:bg-background [&:has(.day-range-start)]:after:left-0"
            : "[&:has([aria-selected])]:rounded",
        ),
        day: cx(
          buttonVariants({ intent: "none", size: "icon" }),
          "hover:border hover:border-border font-normal aria-selected:opacity-100 duration-0",
          props.mode === "range" ? "first:rounded-l" : null,
        ),
        day_range_start:
          "day-range-start relative z-[1] bg-primary hocus:bg-primary-hover border-primary hover:border-primary-hover",
        day_range_end:
          "day-range-end relative z-[1] bg-primary hocus:bg-primary-hover border-primary hover:border-primary-hover",
        day_range_middle: "day-range-middle aria-selected:text-gray-700 hocus:border hocus:border-primary",
        day_selected:
          props.mode === "range"
            ? "aria-selected:text-background rounded"
            : "bg-primary text-background bg-primary hocus:bg-primary-focus aria-selected:text-background dark:aria-selected:text-foreground hocus:bg-primary-hover border-primary hover:border-primary-hover",
        day_today: "text-foreground",
        day_outside: "opacity-50 text-gray-500",
        day_disabled: "opacity-50 text-gray-500",
        day_hidden: "invisible",
        ...classNames,
      }}
      // components={{
      //   lefr
      //   IconLeft: (props: any) => <ChevronLeft {...props} />,
      //   IconRight: (props: any) => <ChevronRight {...props} />,
      // }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
