"use client";

import { default as React } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { LucideIcon } from "lucide-react";

import { cx } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useDataTable } from "@/components/ui/data-table/Context";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { FacetedFilter } from "./types";

interface Facet {
  value: string | number;
  label?: React.ReactNode | string;
  icon?: LucideIcon;
}

export interface Props<TData, TValue> {
  filter: FacetedFilter;
}

export const ColumnFacetedFilter = <TData, TValue>({ filter }: Props<TData, TValue>) => {
  const id = filter?.id ?? filter?.label;
  const { table } = useDataTable();
  const column = table.getColumn("select");

  const options: Facet[] = filter.options!;
  const selectedValues = new Set(
    ((column?.getFilterValue() as Record<string, Record<string, unknown>>)?.[id]?.value as unknown[]) ?? [],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          intent="outline"
          size="sm"
          className="h-8 w-full shrink-0 gap-2 border-dashed data-[state=open]:bg-gray-200 data-[state=open]:text-gray-700">
          <PlusCircledIcon className="size-4 shrink-0" />
          {filter.label}
          {selectedValues?.size > 0 && (
            <>
              <div data-orientation="vertical" className="h-4 w-px shrink-0 bg-gray-400" />
              {selectedValues.size > 2 ? (
                <Badge
                  intent="opaque"
                  className="shrink-0 gap-[0.375ch] truncate max-lg:w-full max-lg:max-w-[1.25rem] max-lg:justify-center max-lg:px-0 max-lg:text-center">
                  {selectedValues.size}
                  <span className="max-lg:hidden">Selecionados</span>
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge intent="opaque" key={option.value} className="shrink-0 truncate">
                      {option.label}
                    </Badge>
                  ))
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popper-anchor-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Pesquisar" />
          {options.length > 0 ? (
            <div className="flex items-center gap-2 border-b border-b-border bg-background px-3 py-2 text-sm text-gray-600">
              <Checkbox
                intent="opaque"
                checked={selectedValues.size > 0}
                onChange={(ev) => {
                  const prev = (column?.getFilterValue() || {}) as Record<string, Record<string, unknown>>;
                  if (!ev.currentTarget.checked && (filter?.id ?? filter?.label) in prev) {
                    delete prev[filter?.id as keyof typeof prev];
                    column?.setFilterValue(prev);
                    return;
                  }
                  column?.setFilterValue({
                    ...prev,
                    [id]: { id: id, method: "faceted", value: options.map((x) => x.value) },
                  });
                }}
                d={selectedValues.size < options.length ? "M6 18 L18 6" : undefined}
              />
              {selectedValues?.size > 0
                ? "Desselecionar todos"
                : "Selecionar todos"}
            </div>
          ) : null}
          <CommandList>
            <CommandEmpty>Nenhum dado encontrado</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    className="group/check z-10 overflow-hidden"
                    key={option.value}
                    onSelect={(ev) => {
                      const prev = (
                        typeof (column?.getFilterValue() || {}) === "object" ? column?.getFilterValue() || {} : {}
                      ) as Record<string, Record<string, unknown>>;
                      if (id in prev && isSelected) {
                        if ((prev[id]?.value as unknown[])?.length > 1) {
                          prev[id].value = (prev[id]?.value as unknown[]).filter((x) => x !== option.value);
                          column?.setFilterValue(prev);
                          return;
                        }
                        delete prev[id];
                        column?.setFilterValue(prev);
                        return;
                      }
                      column?.setFilterValue({
                        ...prev,
                        [id]: {
                          id: id,
                          method: "faceted",
                          value: [...((prev?.[id]?.value as unknown[]) ?? []), option.value],
                        },
                      });
                    }}>
                    <div className="mr-2">
                      <Checkbox
                        intent="opaque"
                        checked={isSelected}
                        className="[&:not(:checked):not(:active)]:group-hover/check:bg-gray-400"
                      />
                    </div>
                    {option?.icon && <option.icon className={cx("mr-2 size-4 text-gray-500")} />}
                    <span className="truncate">{option.label ?? option?.value}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
