"use client";

import { ListFilter, X } from "lucide-react";

import { cx } from "@/lib/utils";
import Button, { buttonVariants } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import { ColumnDateRangeFilter } from "@/components/ui/data-table/ColumnDateRangeFilter";
import { ColumnFacetedFilter } from "@/components/ui/data-table/ColumnFacetedFilter";
import { ColumnTextFilter } from "@/components/ui/data-table/ColumnTextFilter";
import { useDataTable } from "@/components/ui/data-table/Context";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTitle,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Field from "@/components/ui/field";
import Label from "@/components/ui/label";

interface Props extends React.PropsWithChildren {
  className?: string;
}

export const SheetFilters = ({ className, children }: Props) => {
  const { table, config, setConfig, tag, toggleVisible, filters } = useDataTable();

  if (!tag) throw new Error("Invalid tag on data table provider");
  const enable = config.settings;

  return (
    <div
      className={cx(
        "top-card z-[2] -my-card -ml-card shrink-0 contain-paint max-md:absolute max-md:bottom-card max-md:left-card",
      )}>
      <div
        className={cx(
          "h-full w-64 max-w-64 shrink-0 border-r border-r-border bg-gray-100 duration-200 md:w-72 md:max-w-72 lg:w-80 lg:max-w-80",
          enable ? "ml-0" : "-ml-[calc(18rem+var(--card-padding))] lg:-ml-[calc(20rem+var(--card-padding))]",
        )}>
        <div
          className={cx(
            "scroll sticky inset-0 left-0 top-[calc(var(--card-padding)*2)] flex h-fit w-full max-w-[inherit] flex-col gap-2 p-card duration-200",
            className,
          )}>
          <Button
            disabled={!enable}
            intent="ghost"
            size="icon"
            className="absolute right-2 top-2 size-7"
            onClick={() => toggleVisible()}>
            <X />
          </Button>
          <div className="flex items-center gap-2">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={buttonVariants({ intent: "outline", size: "icon", className: "size-7" })}>
                  <ListFilter className="size-4 shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuTitle className="flex items-center gap-2 pl-2">
                    <Checkbox
                      intent="opaque"
                      checked={!!config?.filters?.length}
                      onChange={() => {
                        if (config.filters?.length) {
                          setConfig((prev) => ({ ...prev, filters: [] }));
                          return;
                        }
                        setConfig((prev) => ({
                          ...prev,
                          filters: filters?.map((filter) => filter.id ?? filter.label),
                        }));
                      }}
                      d={(config?.filters?.length ?? 0) < (filters?.length ?? 0) ? "M6 18 L18 6" : undefined}
                    />
                    Filtros
                  </DropdownMenuTitle>
                  <DropdownMenuSeparator />
                  {filters?.map((filter) => (
                    <DropdownMenuCheckboxItem
                      key={filter?.id ?? filter?.label}
                      onSelect={(ev) => ev.preventDefault()}
                      checked={config.filters?.includes(filter?.id ?? filter?.label)}
                      onCheckedChange={(checked) => {
                        const id = filter?.id ?? filter?.label;
                        if (!checked) {
                          const column = table.getColumn("select");
                          const filterValue = column?.getFilterValue();
                          if (filterValue && typeof filterValue === "object" && !(id in filterValue)) {
                            delete (filterValue as Record<string, unknown>)[id];
                            column?.setFilterValue(filterValue);
                          }
                        }
                        setConfig((prev) => ({
                          ...prev,
                          filters: checked
                            ? [...(prev?.filters ?? []), filter?.id ?? filter?.label]
                            : prev?.filters?.filter((x) => x != (filter?.id ?? filter?.label)),
                        }));
                      }}>
                      <span>
                        {filter.label}
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h1 className="">Filtros</h1>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {children}
            {filters?.map((filter) => {
              const id = filter?.id ?? filter?.label;
              if (filter.type === "text" && config.filters?.includes(filter?.id ?? filter.label))
                return (
                  <Field key={id}>
                    <Label>
                      {filter.label}
                    </Label>
                    <ColumnTextFilter filter={filter} />
                  </Field>
                );
              if (filter.type === "date-range" && config.filters?.includes(filter?.id ?? filter.label))
                return (
                  <Field key={id}>
                    <Label>
                      {filter.label}
                    </Label>
                    <ColumnDateRangeFilter filter={filter} />
                  </Field>
                );
              if (filter.type === "faceted" && config.filters?.includes(filter?.id ?? filter.label))
                return <ColumnFacetedFilter key={id} filter={filter} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
