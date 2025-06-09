"use client";

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

import { cx } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/components/ui/data-table/Context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTablePaginationProps {
  values?: number[];
}

export const Pagination = ({ values = [10, 20, 30, 40, 50, 75, 100] }: DataTablePaginationProps) => {
  const dataTableHandler = useDataTable();
  if (!dataTableHandler) return null;

  const { table } = dataTableHandler;
  if (!table) return null;

  return (
    <div className="flex items-center gap-2 last:pr-0 max-md:w-full max-md:justify-between">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500 max-sm:hidden">Linhas por página</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value: string) => {
            table.setPageSize(Number(value));
          }}>
          <SelectTrigger className="h-8 w-[70px] text-gray-700">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {values.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="block w-[100px] text-center text-sm text-gray-500">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </p>
      </div>
      <div className="flex items-center gap-2 max-md:-order-1">
        <Button
          intent="outline"
          size="icon"
          className="size-8"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}>
          <span className="sr-only">Primeira página</span>
          <DoubleArrowLeftIcon className="size-4" />
        </Button>
        <Button
          intent="outline"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <span className="sr-only">Página anterior</span>
          <ChevronLeftIcon className="size-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          intent="outline"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          <span className="sr-only">Próxima página</span>
          <ChevronRightIcon className="size-4" />
        </Button>
        <Button
          intent="outline"
          size="icon"
          className="size-8"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}>
          <span className="sr-only">Última página</span>
          <DoubleArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

interface DataTablePaginationWrapperProps {
  children: React.ReactNode;
  className?: string;
}
export const DataTablePaginationWrapper = ({ children, className }: DataTablePaginationWrapperProps) => {
  return <div className={cx("flex items-center justify-between pl-1 pt-2", className)}>{children}</div>;
};
