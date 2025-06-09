"use client";

import { useCallback, useRef, useState } from "react";
import { debounce } from "lodash";
import { X } from "lucide-react";

import Button from "@/components/ui/button";
import { useDataTable } from "@/components/ui/data-table/Context";
import Input, { InputVariantProps } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { TextFilter } from "./types";

export interface Props {
  filter: TextFilter;
  size?: InputVariantProps["size"] | undefined;
}

const methods = ["starts-with", "includes", "equal"] as const;
type Method = (typeof methods)[number];

export const ColumnTextFilter = ({ filter, size = "md" }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [method, setMethod] = useState<Method>(methods[0]);

  const { table } = useDataTable();

  const column = table.getColumn("select")!;
  const id = filter?.id ?? filter?.label;

  const onChange = useCallback(
    debounce((ev: React.ChangeEvent<HTMLInputElement>) => {
      const value = ev.target.value;
      const prev = (column.getFilterValue() || {}) as Record<string, { id: string; method: string; value: string }>;
      if (!value && id in prev) {
        delete prev[id];
        column.setFilterValue(prev);
        return;
      }
      column.setFilterValue({ ...prev, [id]: { id, method, value } });
      return;
    }, 300),
    [method, column],
  );

  return (
    <div className="relative flex items-center rounded">
      <Select
        value={method}
        onValueChange={(method: Method) => {
          if (inputRef.current && inputRef.current.value) {
            column.setFilterValue({
              [id]: {
                id,
                method,
                value: inputRef.current.value,
              },
            });
          }
          setMethod(method);
        }}>
        <SelectTrigger
          intent="outline"
          size={size}
          className="-mr-px rounded-r-none border border-border bg-background pr-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {methods.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input className="w-full rounded-l-none pr-8 focus:z-[1]" size={size} onChange={onChange} ref={inputRef} />
      {column.getFilterValue() ? (
        <Button
          intent="ghost"
          size="none"
          className="absolute right-1 top-1 z-[1] size-6 active:scale-[.95]"
          onClick={() => {
            column.setFilterValue(undefined);
            if (inputRef.current) {
              inputRef.current.value = "";
              inputRef.current.focus();
            }
          }}>
          <X className="size-4 shrink-0" />
        </Button>
      ) : null}
    </div>
  );
};
