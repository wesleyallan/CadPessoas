"use client";

import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { DateRange, DayPickerRangeProps } from "react-day-picker";
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";
import { useQueryStates } from "nuqs";

import { cx } from "@/lib/utils";
import Button, { buttonVariants } from "@/components/ui/button";
import { ButtonVariantProps } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Separator from "@/components/ui/separator";

import { Calendar } from "./Calendar";

interface StoreOnURL {
  from?: string;
  to?: string;
  range?: string;
}

export type Props = {
  className?: string;
  readOnly?: boolean;
  storeOnURL?: StoreOnURL | boolean | undefined;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
} & Omit<DayPickerRangeProps, "mode"> &
  ButtonVariantProps & {
    wrapperClassName?: string;
  };

export const DatePickerRange = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      readOnly,
      selected: defaultSelected,
      intent = "outline",
      size,
      wrapperClassName,
      storeOnURL = false,
      minDate,
      maxDate,
      ...props
    },
    ref,
  ) => {
    const fromRef = useRef<HTMLInputElement | null>(null);
    const toRef = useRef<HTMLInputElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const urlKeys = useMemo(() => {
      if (!storeOnURL || storeOnURL === true) return { from: "from", to: "to", range: "range" };
      return { from: storeOnURL.from ?? "from", to: storeOnURL.to ?? "to", range: storeOnURL.range ?? "range" };
    }, [storeOnURL]);

    const [queryValues, setQueryValues] = useQueryStates({
      [urlKeys.from]: {
        defaultValue: defaultSelected?.from?.getTime() ?? 0,
        clearOnDefault: true,
        parse: (value) => (value ? +value?.replace(/\D/g, "") || 0 : 0),
      },
      // [urlKeys.from]: parseAsInteger.withDefault(0).withOptions({
      //   clearOnDefault: true,
      // }),
      [urlKeys.to]: {
        defaultValue: defaultSelected?.to?.getTime() ?? 0,
        clearOnDefault: true,
        parse: (value) => (value ? +value?.replace(/\D/g, "") || 0 : 0),
      },
      [urlKeys.range]: {
        defaultValue: "",
        clearOnDefault: true,
        parse: (value) => (!value ? "" : value),
      },
    });

    const [values, setValues] = useState<{ range?: string | undefined; from: DateRange["from"]; to: DateRange["to"] }>({
      from: queryValues?.[urlKeys.from] ? new Date(+queryValues[urlKeys.from]) : defaultSelected?.from,
      to: queryValues?.[urlKeys.to] ? new Date(+queryValues[urlKeys.to]) : defaultSelected?.to,
      range: (queryValues?.[urlKeys.range] as string | undefined) || undefined,
    });

    const update = useCallback(
      ({ from, to }: DateRange) => {
        if (from && !isNaN(from?.getTime())) from = new Date(from?.setHours(0, 0, 0, 0));
        if (to && !isNaN(to?.getTime())) to = new Date(to?.setHours(23, 59, 59, 0));

        const timezoneOffset = ((from ?? to)?.getTimezoneOffset() ?? 0) * 1000 * 60;
        if (fromRef.current && from) {
          const isoString = new Date(from.getTime() - timezoneOffset)?.toISOString();
          fromRef.current.value = isoString.split("T")[0];
        }
        if (toRef.current && to) {
          const isoString = new Date(to.getTime() - timezoneOffset)?.toISOString();
          toRef.current.value = isoString.split("T")[0];
        }

        if (!from || !to) {
          setValues({ from, to, range: undefined });
          return;
        }

        const day = 1000 * 60 * 60 * 24;
        let range: string | undefined = undefined;

        const today = new Date();
        today.setHours(23, 59, 59, 0);

        if (to.getTime() === today.getTime() && today.getTime() > from.getTime()) {
          const todayToFrom = new Date(today.getTime() - 1000 * 60 * 60 * 24 + 1000);
          const diffInDays = (todayToFrom.getTime() - from.getTime()) / day;
          if (diffInDays <= 30) {
            if (diffInDays === 7) range = "last-7-days";
            if (diffInDays === 14) range = "last-14-days";
            if (diffInDays === 30) range = "last-30-days";
          } else {
            const isEqual = new Date(from.getFullYear(), from.getMonth(), todayToFrom.getDate(), 0, 0, 0, 0);
            const diffInMonths =
              isEqual.getTime() === from.getTime()
                ? today.getMonth() - from.getMonth() + (today.getFullYear() - from.getFullYear()) * 12
                : undefined;
            if (diffInMonths === 3) range = "last-3-months";
            if (diffInMonths === 12) range = "last-12-months";
          }
        }

        setValues({ from, to, range: range });
        if (!storeOnURL) return;
        setQueryValues({
          [urlKeys.from]: from.getTime(),
          [urlKeys.to]: to.getTime(),
          [urlKeys.range]: range === undefined ? "" : range,
        });
      },
      [storeOnURL],
    );

    const reset = () => {
      setValues({ from: undefined, to: undefined, range: undefined });
      setQueryValues({ [urlKeys.from]: 0, [urlKeys.to]: 0, [urlKeys.range]: "" });
      if (fromRef.current) fromRef.current.value = "";
      if (toRef.current) toRef.current.value = "";
    };

    return (
      <div className={cx("grid gap-2", wrapperClassName)}>
        <Popover
          open={open}
          onOpenChange={(value) => {
            if (!values.from || !values?.to) reset();
            setOpen(readOnly ? false : value);
          }}>
          <PopoverTrigger
            className={buttonVariants({ intent, size, className: cx("justify-start", className) })}
            ref={ref}>
            <CalendarIcon className="mr-2 size-4" />
            {values?.from ? (
              values.to ? (
                <span className="text-gray-700">
                  {values.from?.toLocaleDateString("pt-BR", { dateStyle: "short" })} -{" "}
                  {values?.to?.toLocaleDateString("pt-BR", { dateStyle: "short" })}
                </span>
              ) : (
                <span className="text-gray-700">{values.from?.toLocaleDateString("pt-BR", { dateStyle: "short" })}</span>
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
              defaultMonth={values?.to ?? values?.from}
              selected={{ from: values.from, to: values?.to }}
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
                  key={values.range}
                  value={!values.range || values.range === "" ? undefined : values.range}
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
                    values?.from
                      ? new Date(values?.from.getTime() - 1000 * 60 * values?.from.getTimezoneOffset())
                          .toISOString()
                          .split("T")[0]
                      : undefined
                  }
                  onBlur={(ev) => {
                    const value = ev.target.value;
                    const from = new Date(value + "T00:00:00.000");

                    if (!value || (maxDate && from.getTime() > maxDate.getTime())) {
                      ev.currentTarget.value = values?.from?.toLocaleDateString("pt-BR", { dateStyle: "short" }) ?? "";
                      return;
                    }

                    if (isNaN(from.getTime())) return;
                    update({ from, to: values.to });
                  }}
                />
                <Input
                  ref={toRef}
                  type="date"
                  defaultValue={
                    values?.to
                      ? new Date(values?.to.getTime() - 1000 * 60 * values?.to.getTimezoneOffset())
                          .toISOString()
                          .split("T")[0]
                      : undefined
                  }
                  onBlur={(ev) => {
                    const value = ev.target.value;
                    const to = new Date(value + "T00:00:00.000");

                    if (!value || (maxDate && to.getTime() > maxDate.getTime())) {
                      ev.currentTarget.value = values?.to?.toLocaleDateString("pt-BR", { dateStyle: "short" }) ?? "";
                      return;
                    }

                    if (isNaN(to.getTime())) return;
                    update({ from: values.from, to });
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
DatePickerRange.displayName = "DatePickerRange";
