// @typescript-eslint/no-unused-vars: off
import { RowData } from "@tanstack/react-table";
import Decimal from "decimal.js";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> extends Record<string, unknown> {
    name?: string | undefined;
    style?: React.CSSProperties | undefined;
    headStyle?: React.CSSProperties | undefined;
    cellStyle?: React.CSSProperties | undefined;
    type?: "currency" | "date" | "faceted" | undefined;
    translation?: string | undefined;
  }
}

declare global {
  type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  type Writeable<T> = { -readonly [P in keyof T]: T[P] };
  type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

  type RewriteDecimals<T> = {
    [K in keyof T]: T[K] extends Decimal
      ? number
      : T[K] extends Record<string | number | symbol, unknown>
        ? RewriteDecimals<T[K]>
        : T[K] extends Array<Record<string | number | symbol, unknown>>
          ? RewriteDecimals<T[K][number]>[]
          : T[K];
  };

  type FormMode = "read" | "create" | "update";
  type FormProps<TOutput extends Record<string, unknown>, TResponse = TOutput> =
    | {
        defaultData?: Partial<TOutput>;
        onSubmit: (data: TOutput) => Promise<[TResponse, null] | [null, Error]>;
        mode: "create" | "update";
        afterSubmit?: (data: TOutput) => Promise<boolean> | boolean;
      }
    | {
        defaultData?: Partial<TOutput>;
        onSubmit?: never;
        mode: "read";
        afterSubmit?: never;
      };
}
