import React from "react";
import { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

import { cx } from "@/lib/utils";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTitle,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface Props<TData extends Record<string, unknown>>
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> {
  table: Table<TData>;
}

export const SettingsHeader = <TData extends Record<string, unknown>>({
  table,
  children,
  className,
  ...props
}: Props<TData>) => {
  const columns = table.getAllColumns().filter((column) => column.getCanHide());
  const visibleColumns = columns.filter((column) => column.getIsVisible());

  const groups = table.getState().grouping;

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                intent="ghost"
                size="icon"
                {...props}
                className={cx("h-full grow rounded-none !ring-0 !ring-offset-0", className)}>
                {children ? children : <Settings2 className="size-4 shrink-0" />}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Configurações da tabela</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end">
        <DropdownMenuTitle>Configurações</DropdownMenuTitle>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Colunas</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuTitle className="flex items-center gap-2 pl-2 pr-3">
              <Checkbox
                intent="opaque"
                checked={visibleColumns?.length > 0}
                d={table.getIsSomeColumnsVisible() && !table.getIsAllColumnsVisible() ? "M6 18 L18 6" : undefined}
                onCheckedChange={(checked) => {
                  if (!checked) {
                    table.toggleAllColumnsVisible(false);
                    return;
                  }
                  table.toggleAllColumnsVisible(true);
                }}
              />
              Colunas
              <span className="ml-auto text-xs text-gray-500">
                {columns.filter((col) => col.getIsVisible())?.length}
              </span>
            </DropdownMenuTitle>
            <DropdownMenuSeparator />
            {columns.map((column) => {
              const meta = column.columnDef.meta;
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onSelect={(ev) => {
                    ev.preventDefault();
                  }}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                  {meta?.translation ? meta.translation : (meta?.name ?? column?.id ?? "")}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub open={groups?.length > 0 ? undefined : false}>
          <DropdownMenuSubTrigger disabled={groups.length === 0}>
            Grupos
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuTitle className="flex items-center gap-2 pl-2 pr-3">
              Grupos
              <span className="ml-auto text-xs text-gray-500">{groups.filter((group) => group)?.length}</span>
            </DropdownMenuTitle>
            <DropdownMenuSeparator />
            {groups.map((group) => {
              const column = table.getColumn(group);
              const meta = column?.columnDef.meta;
              return (
                <DropdownMenuItem
                  key={group}
                  className="capitalize"
                  onSelect={(ev) => {
                    ev.preventDefault();
                    table.getColumn(group)?.toggleGrouping();
                  }}>
                  {meta?.translation ? meta.translation : (meta?.name ?? column?.id ?? "")}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
