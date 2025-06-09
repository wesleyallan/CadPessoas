"use client";

import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnSizingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  InitialTableState,
  SortingState,
  Table,
  TableOptions,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { normalize } from "@/lib/utils/normalize";

import isNullish from "@/helpers/is-nullish";

import { Filters } from "./types";

interface Config {
  settings?: boolean;
  filters?: string[];
  table?: {
    grouping?: GroupingState | undefined;
    sorting?: SortingState | undefined;
    sizing?: ColumnSizingState | undefined;
    visibility?: VisibilityState | undefined;
  };
}

interface DataTableContextProps<
  TData = Record<string, unknown>,
  TMeta extends Record<string, unknown> = Record<string, unknown>,
> {
  filters?: Filters;
  table: Table<TData>;
  meta: TMeta;
  setMeta: Dispatch<SetStateAction<TMeta>>;
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
  pagination?: boolean;
  toggleVisible: () => void;
  tag?: string;
}

export const DataTableContext = createContext<DataTableContextProps>({} as DataTableContextProps);

export interface Props<TData, TValue> {
  children?: React.ReactNode;
  data: TData[];
  columns: ColumnDef<TData, TValue>[] | Readonly<ColumnDef<TData, TValue>>;
  debug?: boolean;
  pagination?: boolean | { pageIndex: number; pageSize: number };
  extraTableOptions?: TableOptions<TData>;
  filters?: Filters;

  tag?: string;

  initialConfig?: Config;
  initialState?: InitialTableState | undefined;
}

const columnResizeMode: "onChange" | "onEnd" = "onChange";
export const DataTableProvider = <TData extends Record<string, unknown>, TValue>({
  children,
  data,
  columns,
  debug,
  pagination = true,
  extraTableOptions,
  filters,
  tag,
  initialConfig,
  initialState,
}: Props<TData, TValue>) => {
  const defaultFilters = useMemo(() => {
    return initialConfig?.filters ?? filters?.filter((x) => x.enable === true).map((x) => x.id ?? x.label);
  }, [initialConfig, filters]);

  const [config, setConfig] = useState<Config>({
    settings: false,
    ...initialConfig,
    filters: defaultFilters,
  });

  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const options: Partial<TableOptions<TData>> = {
    enableColumnResizing: true,
    columnResizeMode,
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    ...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : undefined),
    initialState: {
      ...(pagination
        ? {
            ...initialState,
            pagination: {
              pageIndex: typeof pagination === "object" ? pagination?.pageIndex : 0,
              pageSize: typeof pagination === "object" ? pagination?.pageSize : 20,
            },
          }
        : initialState),
      grouping: config?.table?.grouping ?? [],
      sorting: config?.table?.sorting ?? [],
      columnVisibility: config?.table?.visibility ?? {},
      columnSizing: config?.table?.sizing ?? {},
    },
    defaultColumn: {
      filterFn: (row, columnId, filter) => {
        const value = row.getValue(columnId);
        if (isNullish(value)) return true;

        switch (typeof filter) {
          case "string":
            return normalize((value as string)?.toString()).includes(normalize(filter));
          case "number":
            return normalize((value as number)?.toString()).includes(normalize(filter?.toString()));
          case "bigint":
            return normalize((value as bigint)?.toString()).includes(normalize(filter?.toString()));
          case "object": {
            console.log("looking for the columnId value", { columnId, filter });
            if (Array.isArray(filter)) return filter.includes(value);
            if (filter instanceof Date) {
              if (isNaN(new Date((value as object)?.toString()).getTime())) return false;
              return new Date((value as object)?.toString()) == value;
            }
            break;
          }
          case "undefined":
            return true;
          case "boolean":
            return filter == value;
        }
        return true;
      },
    },
    debugTable: debug,
  };

  const table = useReactTable<TData>(Object.assign(options, extraTableOptions, { data, columns }));
  const toggleVisible = () => setConfig((x) => ({ ...x, settings: !x.settings }));

  return (
    <DataTableContext.Provider
      value={{
        table: table as Table<Record<string, unknown>>,
        filters,
        meta,
        setMeta,
        config,
        setConfig,
        toggleVisible,
        tag,
        pagination: !!pagination,
      }}>
      {children ?? null}
    </DataTableContext.Provider>
  );
};

export const useDataTable = <TMeta extends Record<string, unknown>>(): DataTableContextProps<
  Record<string, unknown>,
  TMeta
> => useContext(DataTableContext) as unknown as DataTableContextProps<Record<string, unknown>, TMeta>;

const DataTableCtx = {
  Context: DataTableContext,
  Provider: DataTableProvider,
  useDataTable,
};

export default DataTableCtx;
