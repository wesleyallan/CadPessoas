"use client";

import { Table } from "@tanstack/react-table";
import { motion, Reorder } from "framer-motion";

import { cx } from "@/lib/utils";

export interface Props<TData extends Record<string, unknown>>
  extends React.ComponentPropsWithoutRef<typeof motion.div> {
  table: Table<TData>;
}

export const GroupPlanner = <TData extends Record<string, unknown>>({ table, className }: Props<TData>) => {
  const groups = table.getState().grouping;
  return (
    <>
      <Reorder.Group
        axis="x"
        dragElastic={0.1}
        values={groups}
        onReorder={table.setGrouping}
        className={cx("flex items-center gap-1", className)}>
        {groups.map((group) => {
          const column = table.getColumn(group);
          const meta = column?.columnDef?.meta;
          return (
            <Reorder.Item
              key={group}
              value={group}
              dragElastic={0.1}
              onDoubleClick={() => {
                table.setGrouping((prev) => prev.filter((g) => g !== group));
              }}
              className="grid h-7 place-items-center rounded-sm border border-border bg-gray-100 px-2 text-xs text-gray-500 hover:bg-gray-200 hover:text-gray-700">
              {(meta?.name ?? column?.id ?? "")}
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </>
  );
};
GroupPlanner.displayName = "GroupPlanner";
