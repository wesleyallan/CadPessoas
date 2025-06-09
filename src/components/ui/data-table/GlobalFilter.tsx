"use client";

import { useCallback, useEffect, useRef } from "react";
import { Table } from "@tanstack/react-table";
import { debounce } from "lodash";
import { X } from "lucide-react";
import { useQueryState } from "nuqs";

import { cx } from "@/lib/utils";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const searchParamKey = "search";
export interface Props<TData extends Record<string, unknown>> extends React.ComponentPropsWithoutRef<typeof Input> {
  table: Table<TData>;
  wrapper?: string;
}

export const GlobalFilter = <TData extends Record<string, unknown>>({
  table,
  wrapper,
  className,
  ...props
}: Props<TData>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [search, setQuerySearch] = useQueryState(searchParamKey, {
    defaultValue: "",
    clearOnDefault: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    table.setGlobalFilter(search);
  }, [table]);

  const onChange = useCallback(
    debounce((ev: React.ChangeEvent<HTMLInputElement>) => {
      const value = ev.target.value;
      setQuerySearch(value);
      table.setGlobalFilter(value);
    }, 300),
    [table],
  );

  return (
    <div className={cx("relative w-full sm:max-w-sm", wrapper)}>
      <Input
        placeholder="Pesquisar"
        className={cx("w-full pr-8", className)}
        {...props}
        defaultValue={search}
        onChange={onChange}
        ref={inputRef}
      />
      {search ? (
        <Button
          intent="ghost"
          size="none"
          className="absolute right-1 top-1 size-6 !ring-0 !ring-offset-0 active:scale-[.95]"
          onClick={() => {
            const value = "";
            setQuerySearch(value);
            table.setGlobalFilter(value);
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
