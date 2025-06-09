"use client";

import * as React from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import type { Column } from "@tanstack/react-table";

import { cx } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface Props<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: readonly {
    label: string;
    value: string | number;
    icon?: React.ComponentType<{ className?: string }>;
    colorClassName?: string;
  }[];
  originalQuantity?: boolean;
  disableQuantity?: boolean;
}

export const FacetedFilter = <TData, TValue>({
  column,
  title,
  options,
  originalQuantity,
  disableQuantity,
}: Props<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as (string | number)[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          intent="outline"
          size="sm"
          className="data-[state=open]:border-border-bold h-8 shrink-0 gap-2 border-dashed data-[state=open]:bg-gray-200 data-[state=open]:text-text">
          <PlusCircledIcon className="size-4 shrink-0" />
          {title}
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
      <PopoverContent className="w-[202px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Pesquisar" />
          <div className="flex items-center gap-2 border-b border-b-border bg-background px-3 py-2 text-sm text-gray-600">
            <Checkbox
              intent="opaque"
              checked={selectedValues.size > 0}
              onChange={(ev) =>
                ev.currentTarget.checked
                  ? column?.setFilterValue(options.map((x) => x.value))
                  : column?.setFilterValue(undefined)
              }
              d={selectedValues.size < options.length ? "M6 18 L18 6" : undefined}
            />
            {selectedValues?.size > 0 ? "Desselecionar todos" : "Selecionar todos"}
          </div>
          <CommandList>
            <CommandEmpty>Nenhum dado encontrado</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    className="group/check z-10 w-[192px] overflow-hidden"
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}>
                    <div className="mr-2">
                      <Checkbox
                        intent="opaque"
                        checked={isSelected}
                        className="[&:not(:checked):not(:active)]:group-hover/check:bg-gray-400"
                      />
                    </div>
                    {option?.icon && <option.icon className={cx("mr-2 size-4 text-gray-500", option.colorClassName)} />}
                    <span className="truncate">{option.label}</span>
                    {!disableQuantity && (
                      <span className="text-text-thin ml-auto flex size-4 items-center justify-center text-xs">
                        {originalQuantity
                          ? column
                              ?.getFacetedRowModel()
                              .rows.reduce(
                                (acc, cur) => acc + +((cur.original as Record<string, number>)[option.value] ?? 0),
                                0,
                              )
                          : (facets?.get(option.value) ?? 0)}
                      </span>
                    )}
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
