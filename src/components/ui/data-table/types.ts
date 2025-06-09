import { DateRange } from "react-day-picker";
import { LucideIcon } from "lucide-react";

type BaseFilter = {
  id?: string;
  label: string;
  enable?: boolean | undefined;
};
export type ManualFilter = BaseFilter & { type: "manual" };
export type TextFilter = BaseFilter & {
  type: "text";
  default?: { method?: "starts-with" | "includes" | "equal"; value?: string };
  tags?: { method: string; value: string } | undefined;
};
export type DateFilter = BaseFilter & {
  type: "date";
  default?: DateRange | undefined;
  tag?: string | undefined;
};
export type DateRangeFilter = BaseFilter & {
  type: "date-range";
  default?: DateRange | undefined;
  tags?: { from: string; to: string } | undefined;
};
export type FacetedFilter = BaseFilter & {
  type: "faceted";
  default?: string | number;
  options?: { label: string; value: string | number; icon?: LucideIcon }[];
};

export type Filter = ManualFilter | TextFilter | DateFilter | DateRangeFilter | FacetedFilter;
export type Filters = Filter[];
