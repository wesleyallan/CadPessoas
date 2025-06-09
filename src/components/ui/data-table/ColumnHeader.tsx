"use client";

import { default as React, useCallback, useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { CommandInput } from "cmdk";
import { debounce } from "lodash";
import { ArrowDown, ArrowUp, EyeOff, Filter, Group, LucideIcon, Search, Ungroup, X } from "lucide-react";

import { cx } from "@/lib/utils";
import { normalize } from "@/lib/utils/normalize";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input, inputVariants } from "@/components/ui/input";

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../command";
import { ScrollArea } from "../scroll-area";

interface Facet {
  value: string | number;
  label?: React.ReactNode | string;
  icon?: LucideIcon;
  quantity?: number | undefined;
  keywords?: string[];
}

export interface Props<TData, TValue> extends React.ComponentPropsWithoutRef<typeof Button> {
  column: Column<TData, TValue>;
  facets?: Facet[] | boolean | undefined;
}

export const ColumnHeader = <TData extends Record<string, unknown>, TValue>({
  children,
  column,
  className,
  facets = true,
  ...props
}: Props<TData, TValue>) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const onChange = useCallback(
    debounce((ev: React.ChangeEvent<HTMLInputElement>) => {
      column.setFilterValue(ev.target.value);
    }, 300),
    [column],
  );

  const meta = column.columnDef.meta;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          intent="ghost"
          size="sm"
          className={cx(
            "group -mx-2 h-full grow justify-start truncate rounded-none pl-2 pr-7 text-left font-normal !ring-0 !ring-offset-0 aria-expanded:bg-gray-200 aria-expanded:text-gray-700",
            className,
          )}
          {...props}>
          {children ? children : (meta?.name ?? column.id ?? "")}
          <div className="absolute right-1.5 flex size-5 items-center justify-end gap-1 rounded-sm ring-border duration-100 group-hover:text-gray-700 group-aria-expanded:text-gray-700">
            {column.getCanFilter() && !!column.getFilterValue() ? (
              <Filter className="aspect-square size-[1.375rem] shrink-0 rounded bg-primary/30 p-[0.1875rem] text-gray-800 transition-colors animate-in fade-in slide-in-from-right-2 hover:bg-primary-hover/40 hover:text-foreground active:scale-[.98]" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="aspect-square size-[1.375rem] shrink-0 rounded bg-primary/30 p-[0.1875rem] text-gray-800 transition-colors animate-in fade-in slide-in-from-right-2 hover:bg-primary-hover/40 hover:text-foreground active:scale-[.98]" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="aspect-square size-[1.375rem] shrink-0 rounded bg-primary/30 p-[0.1875rem] text-gray-800 transition-colors animate-in fade-in slide-in-from-right-2 hover:bg-primary-hover/40 hover:text-foreground active:scale-[.98]" />
            ) : (
              <CaretSortIcon className="aspect-square size-[1.25rem] shrink-0 p-[0.1875rem]" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {column.getCanFilter() ? (
          <>
            {!facets ? (
              <div className="relative -m-1 flex items-center bg-gray-100">
                <Input
                  intent="none"
                  size="sm"
                  className="h-9 w-52 max-w-sm shrink bg-transparent px-8"
                  placeholder="Pesquisar"
                  defaultValue={typeof column?.getFilterValue() === "string" ? (column.getFilterValue() as string) : ""}
                  onKeyDown={(ev) => ev.stopPropagation()}
                  onChange={onChange}
                  ref={inputRef}
                />

                <Search className="pointer-events-none absolute left-2.5 top-2.5 aspect-square size-4 shrink-0 select-none text-gray-500" />

                {column.getFilterValue() ? (
                  <Button
                    intent="ghost"
                    size="none"
                    className="absolute right-2 top-1 size-6 active:scale-[.95]"
                    onClick={() => {
                      column.setFilterValue("");
                      if (inputRef.current) {
                        inputRef.current.value = "";
                        inputRef.current.focus();
                      }
                    }}>
                    <X className="size-4 shrink-0" />
                  </Button>
                ) : null}
              </div>
            ) : (
              <FacetsContent column={column} facets={facets} />
            )}
            <DropdownMenuSeparator className="first:hidden" />
          </>
        ) : null}
        {column.getCanSort() && (
          <>
            <DropdownMenuItem disabled={column.getIsSorted() == "asc"} onClick={() => column.toggleSorting(false)}>
              <ArrowUp className="mr-2 size-4 opacity-70" />
              Ascendente
            </DropdownMenuItem>
            <DropdownMenuItem disabled={column.getIsSorted() == "desc"} onClick={() => column.toggleSorting(true)}>
              <ArrowDown className="mr-2 size-4 opacity-70" />
              Descendente
            </DropdownMenuItem>
            <DropdownMenuItem disabled={!column.getIsSorted()} onClick={() => column.clearSorting()}>
              <X className="mr-2 size-4 opacity-70" />
              Limpar ordenação
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={!column.getCanGroup()}
          onClick={() => {
            setOpen(false);
            column.getToggleGroupingHandler()();
          }}>
          {column.getIsGrouped() ? (
            <>
              <Ungroup className="mr-2 size-4 opacity-70" />
              Desagrupar
            </>
          ) : (
            <>
              <Group className="mr-2 size-4 opacity-70" />
              Agrupar
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!column.getCanHide()} onClick={() => column.toggleVisibility(false)}>
          <EyeOff className="mr-2 size-4 opacity-70" />
          Ocultar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FacetsContent = <TData extends Record<string, unknown>, TValue>({ column, facets }: Props<TData, TValue>) => {
  const [search, setSearch] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const facetedUniqueValues = Array.from<[string | number, number]>(column.getFacetedUniqueValues());
  const columnType = column.columnDef.meta?.type;

  const rows: Facet[] = Array.isArray(facets)
    ? facets.reduce<typeof facets>((acc, cur) => {
        return [
          ...acc,
          {
            ...cur,
            quantity: facetedUniqueValues?.find((x) => x.at(0) === cur?.value)?.[1] || (cur?.quantity ?? 0),
          },
        ];
      }, [])
    : facets === true
      ? facetedUniqueValues.reduce<Facet[]>(
          (acc, cur) =>
            cur[0]
              ? [
                  ...acc,
                  {
                    label:
                      columnType === "date"
                        ? new Date(cur[0]).toLocaleDateString("pt-BR", { dateStyle: "short" })
                        : undefined,
                    value: cur[0],
                    quantity: cur[1],
                  },
                ]
              : acc,
          [],
        )
      : [];

  const selectedValues =
    column.getCanFilter() && Array.isArray(column.getFilterValue()) && !!rows?.length
      ? new Set<string | number>(column?.getFilterValue() as (string | number)[])
      : new Set<string | number>();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If the key pressed is a one letter/number, then, search
    if ((e.key.length === 1 && e.key.replace(/[^a-zA-Z0-9]/g, "") === e.key) || ["Backspace"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      switch (e.key) {
        case "Backspace": {
          if (search) {
            setSearch((x) => x?.slice(0, -1));
            setTimeout(() => inputRef.current?.focus(), 1);
            // If is an uncontrolled component, then, update the input value then focus
          } else if (inputRef.current) {
            inputRef.current.value = inputRef.current?.value?.slice(0, -1);
            inputRef.current?.focus();
          }
          break;
        }
        default: {
          if (search) {
            setSearch((x) => x + e.key);
            setTimeout(() => inputRef.current?.focus(), 1);
            // If is an uncontrolled component, then, update the input value then focus
          } else if (inputRef.current) {
            inputRef.current.value = inputRef.current?.value + e.key;
            inputRef.current?.focus();
          }
        }
      }
    }
  };

  if (!search && !rows.length) return;

  return (
    <>
      <Command className="-m-1 w-auto">
        <div cmdk-input-wrapper className="relative flex items-center border-b bg-gray-100">
          <Checkbox
            intent="opaque"
            wrapperClassName="absolute left-3 top-[0.5625rem]"
            checked={selectedValues.size > 0}
            d={selectedValues?.size < rows?.length ? "M6 18 L18 6" : undefined}
            onCheckedChange={(checked) => {
              if (!checked) {
                column.setFilterValue(undefined);
                return;
              }
              column.setFilterValue(rows.map((x) => x.value));
            }}
          />
          <CommandInput
            className={inputVariants({
              intent: "none",
              className: "h-9 w-full bg-transparent px-9",
            })}
            value={search}
            onValueChange={(v) => {
              setSearch(v);
            }}
            onKeyDown={(e) => {
              if (e.key.startsWith("Arrow") || e.key === "Enter") return;
              e.stopPropagation();
            }}
            placeholder="Pesquisar"
            ref={inputRef}
          />
          {search?.length > 1 && (
            <Button
              intent="ghost"
              size="icon"
              className="absolute right-1 top-1 size-7"
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              onClick={() => {
                setSearch("");
                inputRef.current?.focus();
              }}>
              <X className="size-4 shrink-0" />
            </Button>
          )}
        </div>
        <CommandList onKeyDown={handleKeyDown}>
          <CommandEmpty>Nenhum dado encontrado</CommandEmpty>
          <CommandGroup hidden={false} value={normalize(search)}>
            <ScrollArea className="max-h-[232px]">
              {rows.map((facet) => {
                const isChecked = selectedValues.has(facet.value);
                return (
                  <CommandItem
                    key={facet.value}
                    keywords={[
                      typeof facet?.label === "string"
                        ? normalize(facet?.label ?? facet?.value?.toString())
                        : normalize(facet?.value?.toString()),
                    ]}
                    className="group w-full gap-2"
                    onSelect={() => {
                      if (isChecked) selectedValues.delete(facet.value);
                      else selectedValues.add(facet.value);
                      const filterValue = Array.from(selectedValues);

                      column?.setFilterValue(filterValue.length ? filterValue : undefined);
                    }}>
                    <Checkbox checked={isChecked} className="group-aria-selected:[&:not(:checked)]:border-gray-400" />
                    {/* {facet?.icon ? <facet.icon className="size-4 shrink-0 text-gray-500" /> : null} */}
                    <p className="w-full overflow-hidden truncate">
                      {facet?.label?.toString() ?? facet?.value?.toString() ?? "Nenhum dado encontrado"}
                    </p>
                    <span className="text-text-thin ml-auto text-xs">{facet.quantity ?? 0}</span>
                  </CommandItem>
                );
              })}
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};
