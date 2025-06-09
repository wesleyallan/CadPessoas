import { forwardRef } from "react";

import { cx } from "@/lib/utils";

export type TableWrapperProps = React.HTMLAttributes<HTMLDivElement>;
export const TableWrapper = forwardRef<HTMLDivElement, TableWrapperProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cx("scroll scroll-horizontal overflow-x-auto rounded border border-border", className)}
      {...props}
      ref={ref}
    />
  );
});
TableWrapper.displayName = "TableWrapper";

export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => {
  return <table className={cx("table-auto border-collapse text-sm", className)} {...props} ref={ref} />;
});
Table.displayName = "Table";

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
  <thead className={cx("bg-gray-100 [&_tr]:border-b", className)} {...props} ref={ref} />
));
TableHeader.displayName = "TableHeader";

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody className={cx("bg-background [&_tr:last-child]:border-0", className)} {...props} ref={ref} />
));
TableBody.displayName = "TableBody";

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;
export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className, ...props }, ref) => (
  <tfoot
    className={cx("border-t border-t-border bg-gray-100 font-medium [&_tr:last-child]:border-0", className)}
    {...props}
    ref={ref}
  />
));
TableFooter.displayName = "TableFooter";

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr
    className={cx(
      "min-h-9 border-b border-b-border text-gray-700 transition-colors hover:bg-gray-100 hover:text-foreground",
      className,
    )}
    {...props}
    ref={ref}
  />
));
TableRow.displayName = "TableRow";

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => (
  <th
    className={cx(
      "h-9 border-r-border px-2 text-left align-middle font-normal text-gray-700 first:pl-4 [&:has([role=checkbox])]:pr-0 [&:not(:last-child)]:border-r [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
    ref={ref}
  />
));
TableHead.displayName = "TableHead";

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td
    className={cx(
      "border-r-gray-200 p-2 pr-4 align-middle first:pl-4 [&:has([role=checkbox])]:pr-0 [&:not(:last-child)]:border-r [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
    ref={ref}
  />
));
TableCell.displayName = "TableCell";

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;
export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cx("mt-4 text-sm text-gray-500", className)} {...props} />
));
TableCaption.displayName = "TableCaption";
