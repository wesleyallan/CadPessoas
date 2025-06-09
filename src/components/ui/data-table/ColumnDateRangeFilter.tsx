import { useRouter } from "next/navigation";
import { parseAsTimestamp, useQueryStates } from "nuqs";

import { DatePickerRange2 } from "@/components/ui/date-picker/DatePickerRange2";

import { DateRangeFilter } from "./types";

interface Props {
  filter: DateRangeFilter;
}

export const ColumnDateRangeFilter = ({ filter }: Props) => {
  const [selected, setSelected] = useQueryStates({
    [filter.tags?.from ?? "from"]: parseAsTimestamp,
    [filter.tags?.to ?? "to"]: parseAsTimestamp,
  });

  const from = selected[filter.tags?.from ?? "from"] ?? undefined;
  const to = selected[filter.tags?.to ?? "to"] ?? undefined;

  const router = useRouter();

  return (
    <>
      <DatePickerRange2
        selected={{ from, to }}
        onSelectChange={async (range) => {
          await setSelected({
            [filter.tags?.from ?? "from"]: range?.from ?? null,
            [filter.tags?.to ?? "to"]: range?.to ?? null,
          });
          router.refresh();
        }}
      />
    </>
  );
};
