"use client";
import Button from "@/components/ui/button";
import IconLeft from "@/components/ui/icons/left";
import IconRight from "@/components/ui/icons/right";
import IconCalendar from "@/components/ui/icons/calendar";
import dayjs from "dayjs";
import DatePicker, { TDateString } from "@/components/ui/date-picker";
import locale from "dayjs/locale/sl";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

type TActionsRowProps = {
  date: string;
};

function ActionsRow({ date }: TActionsRowProps) {
  const router = useRouter();

  function handleDateChange(value: TDateString) {
    router.push(`/plezalni-dnevnik/koledar/${value}`);
  }

  function handleNextDay() {
    const nextDay = dayjs(date).add(1, "day").format("YYYY-MM-DD");
    router.push(`/plezalni-dnevnik/koledar/${nextDay}`);
  }

  function handlePrevDay() {
    const prevDay = dayjs(date).subtract(1, "day").format("YYYY-MM-DD");
    router.push(`/plezalni-dnevnik/koledar/${prevDay}`);
  }

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  dayjs.locale(locale);


  const displayValue = useMemo(
    () =>
      capitalizeFirstLetter(dayjs(date).format("dddd, D. ")) +
      capitalizeFirstLetter(dayjs(date).format("MMMM YYYY")),
    [date]
  );

  const displayValueMobile = useMemo(
    () =>
      capitalizeFirstLetter(dayjs(date).format("ddd, D. ")) +
      capitalizeFirstLetter(dayjs(date).format("MMM YYYY")),
    [date]
  );

  return (
    <>
      <div className="x-auto mx-auto rotate-0 items-center p-4 2xl:container xs:px-8 justify-between flex gap-3 flex-wrap sm:py-5">
        <div className="flex items-center justify-center gap-2">
          <div className="w-80 hidden sm:block">
            <DatePicker
              value={date}
              onChange={handleDateChange}
              displayValue={displayValue}
            />
          </div>
          <div className="w-48 sm:hidden">
            <DatePicker
              value={date}
              onChange={handleDateChange}
              displayValue={displayValueMobile}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="quaternary" onClick={handlePrevDay}>
            <IconLeft />
          </Button>
          <IconCalendar />
          <Button variant="quaternary" onClick={handleNextDay}>
            <IconRight />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ActionsRow;
