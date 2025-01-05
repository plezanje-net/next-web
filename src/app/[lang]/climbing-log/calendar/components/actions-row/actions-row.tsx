"use client";
import SelectMonth from "./select-month";
import SelectYear from "./select-year";
import Button from "@/components/ui/button";
import IconLeft from "@/components/ui/icons/left";
import IconRight from "@/components/ui/icons/right";
import IconCalendar from "@/components/ui/icons/calendar";
import dayjs from "dayjs";
import useAdvancedSearchParams from "@/hooks/useSearchParamsHandler";
import Link from "next/link";

type TActionsRowProps = {
  firstEntryYear: number;
  date: string;
};

function ActionsRow({ firstEntryYear, date }: TActionsRowProps) {
  const year = dayjs(date).year();
  const month = dayjs(date).month();

  const { updateSearchParams } = useAdvancedSearchParams();

  function handleMonthChange(value: number) {
    updateSearchParams({
      date: dayjs(date).set("month", value).format("YYYY-MM-01"),
    });
  }

  function handleYearChange(value: number) {
    updateSearchParams({
      date: dayjs(date).set("year", value).format("YYYY-MM-01"),
    });
  }

  function handleNextMonth() {
    updateSearchParams({
      date: dayjs(date).add(1, "month").format("YYYY-MM-01"),
    });
  }

  function handlePrevMonth() {
    updateSearchParams({
      date: dayjs(date).subtract(1, "month").format("YYYY-MM-01"),
    });
  }

  return (
    <>
      <div className="x-auto mx-auto rotate-0 items-center p-4 2xl:container xs:px-8 sm:justify-between flex justify-center gap-3 flex-wrap sm:py-5">
        <div className="flex items-center justify-center gap-2">
          <SelectMonth value={month} onChange={handleMonthChange} />
          <SelectYear
            firstEntryYear={firstEntryYear}
            value={year}
            onChange={handleYearChange}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="quaternary"
            onClick={handlePrevMonth}
            disabled={dayjs(date).isSame(
              dayjs().set("year", firstEntryYear).set("month", 0),
              "month"
            )}
          >
            <IconLeft />
          </Button>
          <Link href="/plezalni-dnevnik/koledar" className="flex gap-2">
            <IconCalendar />
            <span>Danes</span>
          </Link>
          <Button
            variant="quaternary"
            onClick={handleNextMonth}
            disabled={dayjs(date).isSame(dayjs(), "month")}
          >
            <IconRight />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ActionsRow;
