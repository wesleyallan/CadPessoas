"use client";

import { flexRender } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

import { cx } from "@/lib/utils";
import Button from "@/components/ui/button";
import { useDataTable } from "@/components/ui/data-table/Context";
import { Pagination } from "@/components/ui/data-table/Pagination";
import { TableWrapper } from "@/components/ui/table";

interface Props {
  className?: string;
  hideSelectedRows?: boolean;
}

const columnResizeMode: "onChange" | "onEnd" = "onChange";
const DataTable = ({ hideSelectedRows }: Props) => {
  const dataTableHandler = useDataTable();

  if (!dataTableHandler) return null;
  const { table, pagination } = dataTableHandler;

  if (!table) return null;
  const rows = table.getRowModel?.()?.rows;

  return (
    <>
      <TableWrapper>
        <table role="table" className="text-sm" style={{ width: `max(100%, ${table.getCenterTotalSize()}px)` }}>
          <thead role="tableheader" className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                role="rowheader"
                className="flex items-center border-b border-b-border bg-[inherit] text-gray-700 transition-colors hover:bg-gray-100 hover:text-foreground"
                key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      role="columnheader"
                      className="relative flex h-9 shrink grow items-center border-r-border bg-[inherit] px-2 py-0 text-left align-middle font-normal text-gray-700 [&:has([role=checkbox])]:pr-0 [&:not(:last-child)]:border-r [&>[role=checkbox]]:translate-y-[2px]"
                      key={header.id}
                      style={{
                        width: `${header.column.getSize()}px`,
                        flexBasis: `${header.column.getSize()}px`,
                        maxWidth: header.column.columnDef?.maxSize,
                        ...(header.column.columnDef?.meta as { style?: React.CSSProperties })?.style,
                        ...(header.column.columnDef?.meta as { headStyle?: React.CSSProperties })?.headStyle,
                      }}>
                      {!header.isPlaceholder ? flexRender(header.column.columnDef.header, header.getContext()) : null}
                      {header.column.getCanResize() ? (
                        <div
                          data-resizing={header.column.getIsResizing() || undefined}
                          onDoubleClick={() => header.column.resetSize()}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          style={{
                            transform:
                              // @ts-expect-error - TS doesn't know about columnSizingInfo
                              columnResizeMode === "onEnd" && header.column.getIsResizing()
                                ? `translateX(${(table.options.columnResizeDirection === "rtl" ? -1 : 1) * (table.getState().columnSizingInfo.deltaOffset ?? 0)}px)`
                                : "",
                          }}
                          className={cx(
                            "absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none bg-primary opacity-0 hover:opacity-100",
                          )}
                        />
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody role="tablebody" className="bg-background">
            {rows.map((row) => (
              <tr
                role="row"
                key={row.id}
                className={cx(
                  "relative flex min-h-9 border-b border-b-border bg-background text-gray-700 transition-all last:border-b-0 hover:bg-gray-100 hover:text-foreground",
                  row.getIsSelected() || row.getIsGrouped() ? "z-[2]" : null,
                )}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      role="cell"
                      key={cell.id}
                      className={cx(
                        "relative flex h-full min-h-[inherit] shrink grow items-center overflow-hidden border-r-gray-200 bg-inherit p-0 [&:not(:last-child)]:border-r",
                        cell.column.getIsGrouped() ? "border-r border-border" : null,
                        cell.getIsPlaceholder() && !cell.getIsAggregated() ? "bg-gray-50" : null,
                      )}
                      style={{
                        width: `${cell.column.getSize()}px`,
                        flexBasis: `${cell.column.getSize()}px`,
                        maxWidth: cell.column.columnDef?.maxSize,
                        ...(cell.column.columnDef?.meta as { style?: React.CSSProperties })?.style,
                        ...(cell.column.columnDef?.meta as { cellStyle?: React.CSSProperties })?.cellStyle,
                      }}>
                      <div
                        className={
                          "block w-full grow truncate px-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                        }>
                        {cell.getIsAggregated()
                          ? flexRender(
                              cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          : cell.getIsPlaceholder()
                            ? null
                            : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                      {cell.getIsGrouped() ? (
                        <Button
                          size="icon"
                          className="mr-1 h-7 w-7 shrink-0"
                          intent="ghost"
                          onClick={row.getToggleExpandedHandler()}>
                          <ChevronRight
                            className={cx(
                              "aspect-square size-4 shrink-0 transition-transform will-change-transform",
                              row.getIsExpanded() ? "rotate-90" : null,
                            )}
                          />
                        </Button>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    table.getHeaderGroups().reduce((acc, headerGroup) => acc + headerGroup.headers.length - 1, 0) ?? 0
                  }>
                  <span className="sticky left-1/2 grid h-[4.5rem] w-fit -translate-x-1/2 place-items-center text-center text-sm text-gray-500">
                    Nenhum dado encontrado
                  </span>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </TableWrapper>
      <div className="flex shrink flex-col-reverse items-center empty:hidden max-md:gap-2 md:flex-row md:justify-between">
        {!hideSelectedRows && (
          <span className="text-sm text-gray-500 [&:not(:last-child)]:max-md:hidden">
            {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linhas
            selecionadas
          </span>
        )}
        {pagination ? <Pagination /> : null}
      </div>
    </>
  );
};

export { DataTable as default, DataTable };
