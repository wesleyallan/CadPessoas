"use client";

import { forwardRef, useCallback, useRef } from "react";
import { DateRange, DayPickerRangeProps } from "react-day-picker";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";

import { cx } from "@/lib/utils";
import Button, { buttonVariants } from "@/components/ui/button";
import { ButtonVariantProps } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Separator from "@/components/ui/separator";

import { Calendar } from "./Calendar";

export type Props = {
  className?: string;
  readOnly?: boolean;

  defaultOpen?: boolean | undefined;
  open?: boolean | undefined;
  onOpenChange?: (value: boolean) => void;

  defaultSelected?: DateRange;
  selected?: DateRange;
  onSelectChange?: (range: DateRange) => void;

  minDate?: Date | undefined;
  maxDate?: Date | undefined;
} & Omit<DayPickerRangeProps, "mode"> &
  ButtonVariantProps;

export const DatePickerRange2 = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      readOnly,
      intent = "outline",
      size,

      defaultOpen,
      open: propOpen,
      onOpenChange,

      defaultSelected,
      selected: propSelected,
      onSelectChange,

      minDate,
      maxDate,
      ...props
    },
    ref,
  ) => {
    const fromRef = useRef<HTMLInputElement | null>(null);
    const toRef = useRef<HTMLInputElement | null>(null);
    const [open, setOpen] = useControllableState({
      defaultProp: propOpen ?? defaultOpen ?? false,
      prop: propOpen,
      onChange: onOpenChange,
    });

    const rangeRef = useRef<string | undefined>(undefined);
    const rangeValue = rangeRef.current;

    const [selected, setSelected] = useControllableState<DateRange>({
      defaultProp: defaultSelected ?? { from: new Date(), to: undefined },
      prop: propSelected,
      onChange: onSelectChange,
    });

    const update = useCallback((range: DateRange | undefined) => {
      if (!range) return;
      let { from, to } = range;

      if (from && !isNaN(from?.getTime())) from = new Date(from?.setHours(0, 0, 0, 0));
      if (to && !isNaN(to?.getTime())) to = new Date(to?.setHours(23, 59, 59, 0));

      // Update the inputs correctly calculating the timezone to dont break the input date
      const timezoneOffset = ((from ?? to)?.getTimezoneOffset() ?? 0) * 1000 * 60;
      if (fromRef.current && from) {
        const isoString = new Date(from.getTime() - timezoneOffset)?.toISOString();
        fromRef.current.value = isoString.split("T")[0];
      }
      if (toRef.current && to) {
        const isoString = new Date(to.getTime() - timezoneOffset)?.toISOString();
        toRef.current.value = isoString.split("T")[0];
      }

      setSelected({ from, to });

      const day = 1000 * 60 * 60 * 24;
      if (!from || !to || to.getTime() !== new Date().setHours(23, 59, 59, 0)) {
        rangeRef.current = undefined;
        return;
      }
      to.setHours(0, 0, 0, 0);

      const difference = (to.getTime() - from.getTime()) / day;

      if (difference <= 30 && [7, 14, 30].includes(difference)) {
        rangeRef.current = `last-${difference}-days`;
        return;
      }
      if (difference > 30 && from.getDate() === to.getDate()) {
        const months = to.getMonth() - from.getMonth() + (to.getFullYear() - from.getFullYear()) * 12;
        console.log({ diffInMonths: months });
        if ([3, 12].includes(months)) {
          rangeRef.current = `last-${months}-months`;
          return;
        }
      }

      rangeRef.current = undefined;
    }, []);

    const reset = () => {
      rangeRef.current = undefined;
      setSelected({ from: undefined, to: undefined });
      if (fromRef.current) fromRef.current.value = "";
      if (toRef.current) toRef.current.value = "";
    };

    return (
      <div className={cx("grid gap-2")}>
        <Popover
          open={open}
          onOpenChange={(value) => {
            if (!selected?.from || !selected?.to) reset();
            setOpen(readOnly ? false : value);
          }}>
          <PopoverTrigger
            className={buttonVariants({ intent, size, className: cx("justify-start", className) })}
            ref={ref}>
            <CalendarIcon className="mr-2 size-4" />
            {selected?.from ? (
              selected?.to ? (
                <span className="text-gray-700">
                  {selected?.from?.toLocaleDateString("pt-BR", { dateStyle: "short" })} -{" "}
                  {selected?.to?.toLocaleDateString("pt-BR", { dateStyle: "short" })}
                </span>
              ) : (
                <span className="text-gray-700">
                  {selected?.from?.toLocaleDateString("pt-BR", { dateStyle: "short" })}
                </span>
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              {...props}
              initialFocus
              mode="range"
              defaultMonth={selected?.to ?? selected?.from}
              selected={{ from: selected?.from, to: selected?.to }}
              toYear={maxDate ? maxDate.getFullYear() : undefined}
              toMonth={maxDate}
              disabled={
                minDate || maxDate
                  ? (date) => {
                      if (maxDate && date > maxDate) {
                        return true;
                      }
                      if (minDate && date < minDate) {
                        return true;
                      }
                      return false;
                    }
                  : undefined
              }
              onSelect={(range: Readonly<DateRange> | undefined) => {
                if (!range) return;
                update(range);
              }}
            />
            <Separator className="mx-0" />
            <div className="-mx-1 -mb-1 flex max-w-[17rem] flex-col gap-2 overflow-hidden bg-gray-100 px-3 pb-3 pt-2">
              <div className="flex items-center gap-[inherit]">
                <Select
                  key={JSON.stringify(selected)}
                  value={rangeValue}
                  onValueChange={(value) => {
                    const to = new Date();
                    to.setHours(23, 59, 59, 999);

                    const from = new Date();
                    from.setHours(0, 0, 0, 0);

                    if (value.endsWith("-days")) {
                      const days = +value.split("-")[1];
                      from.setDate(from.getDate() - days);
                    } else if (value.endsWith("-months")) {
                      const months = +value.split("-")[1];
                      from.setMonth(from.getMonth() - months);
                    }

                    update({ from, to });
                  }}>
                  <SelectTrigger className="w-full overflow-hidden pl-2">
                    <div className="mr-4 grid grid-cols-[16px_minmax(0,1fr)] items-center gap-2">
                      <Clock className="text-gray-500" />
                      <div className="truncate">
                        <SelectValue placeholder="Selecione um período" />
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem indicator={false} value="last-7-days">
                      Últimos 7 dias
                    </SelectItem>
                    <SelectItem indicator={false} value="last-14-days">
                      Últimos 14 dias
                    </SelectItem>
                    <SelectItem indicator={false} value="last-30-days">
                      Últimos 30 dias
                    </SelectItem>
                    <SelectItem indicator={false} value="last-3-months">
                      Últimos 3 meses
                    </SelectItem>
                    <SelectItem indicator={false} value="last-12-months">
                      Últimos 12 meses
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  intent="outline"
                  size="icon"
                  onClick={() => {
                    reset();
                  }}>
                  <X />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-[inherit]">
                <Input
                  ref={fromRef}
                  type="date"
                  defaultValue={
                    selected?.from
                      ? new Date(selected?.from.getTime() - 1000 * 60 * selected?.from.getTimezoneOffset())
                          .toISOString()
                          .split("T")[0]
                      : undefined
                  }
                  onBlur={(ev) => {
                    const value = ev.target.value;
                    const from = new Date(value + "T00:00:00.000");

                    if (!value || (maxDate && from.getTime() > maxDate.getTime())) {
                      ev.currentTarget.value = selected?.from?.toLocaleDateString("pt-BR", { dateStyle: "short" }) ?? "";
                      return;
                    }

                    if (isNaN(from.getTime())) return;
                    update({ from, to: selected?.to });
                  }}
                />
                <Input
                  ref={toRef}
                  type="date"
                  defaultValue={
                    selected?.to
                      ? new Date(selected?.to.getTime() - 1000 * 60 * selected?.to.getTimezoneOffset())
                          .toISOString()
                          .split("T")[0]
                      : undefined
                  }
                  onBlur={(ev) => {
                    const value = ev.target.value;
                    const to = new Date(value + "T00:00:00.000");

                    if (!value || (maxDate && to.getTime() > maxDate.getTime())) {
                      ev.currentTarget.value = selected?.to?.toLocaleDateString("pt-BR", { dateStyle: "short" }) ?? "";
                      return;
                    }

                    if (isNaN(to.getTime())) return;
                    update({ from: selected?.from, to });
                  }}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);
DatePickerRange2.displayName = "DatePickerRange";
