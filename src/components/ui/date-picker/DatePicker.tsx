"use client";

import * as React from "react";
import { DayPickerSingleProps } from "react-day-picker";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Calendar as CalendarIcon } from "lucide-react";

import { cx } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Calendar } from "./Calendar";

export type DatePickerProps = {
  readOnly?: boolean;
} & Omit<React.ComponentProps<typeof Calendar>, keyof DayPickerSingleProps> &
  Omit<DayPickerSingleProps, "mode"> &
  Pick<React.ComponentPropsWithoutRef<typeof Input>, "intent" | "size"> & {
    id?: string | undefined;
    name?: string | undefined;
    tabIndex?: number | undefined;
    wrapperClassName?: string;
  };

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ id, name, className, readOnly, selected, intent, size, wrapperClassName, tabIndex, ...props }, ref) => {
    const [open, setOpen] = React.useState<boolean>(false);
    // const [date, setDate] = React.useState<Date | undefined>(() => (selected instanceof Date ? selected : undefined));
    const [date, setDate] = useControllableState<Date | undefined>({
      defaultProp: selected instanceof Date ? selected : undefined,
      prop: selected instanceof Date ? selected : undefined,
      onChange: props.onSelect as (value: Date | undefined) => void,
    });

    return (
      <Popover
        open={open}
        onOpenChange={(value) => {
          setOpen(readOnly ? false : value);
        }}>
        <div className={cx("relative w-full", wrapperClassName)}>
          <Input
            tabIndex={tabIndex}
            intent={intent}
            size={size}
            id={id}
            name={name}
            className={cx("w-full pr-8", className)}
            type="date"
            value={date?.toJSON()?.slice(0, 10)}
            onChange={(ev) => {
              const { value } = ev.currentTarget;
              if (!value) return;
              const date = new Date(`${value}T12:00`);
              setDate(date);
              if (props.onSelect)
                props.onSelect(
                  new Date(`${value}T12:00`),
                  new Date(`${value}T12:00`),
                  {},
                  undefined as unknown as React.MouseEvent,
                );
            }}
            readOnly={readOnly}
            ref={ref}
          />
          <PopoverTrigger asChild>
            <Button
              tabIndex={tabIndex}
              type="button"
              disabled={readOnly}
              size="icon"
              intent="ghost"
              className="absolute inset-y-0.5 right-0.5 aspect-square h-[calc(100%-.25rem)] w-auto rounded-[5px] text-gray-500">
              <CalendarIcon className="size-4" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="-mr-[9px] w-auto p-0" align="end" sideOffset={8}>
          <Calendar
            initialFocus
            mode="single"
            selected={date}
            onSelect={(day, ...onSelectProps) => {
              if (day) setDate(day);
              if (props.onSelect) props.onSelect(day, ...onSelectProps);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
