import { Activity } from "@/graphql/generated";
import CalendarActivity from "./calendar-activity";
import Link from "next/link";

export type TCalendarDay = {
  date: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  activities: Activity[];
  borderClass: string;
};

export type TCalendarDayProps = {
  day: TCalendarDay;
};

function CalendarDay({ day }: TCalendarDayProps) {
  return (
    <Link
      href={`/plezalni-dnevnik/koledar/${day.date}`}
      className={`p-2 lg:p-4 min-h-[calc((100vw-32px)/7*1.5)] lg:min-h-[calc((100vw-32px)/7)] xl:min-h-[210px] flex flex-col lg:gap-4${day.isCurrentMonth ? " cursor-pointer" : ""} border-neutral-200${day.borderClass}`}
    >
      <div
        className={`text-center lg:text-right${!day.isCurrentMonth ? " text-neutral-400" : ""}${day.isToday ? " text-blue-400" : ""}`}
      >
        {day.dayNumber}
      </div>
      <div className="flex flex-wrap grow lg:grow-0 items-center justify-center lg:items-start lg:justify-start lg:gap-4">
        {day.activities.map((activity, i) => (
          <CalendarActivity key={i} activity={activity} />
        ))}
      </div>
    </Link>
  );
}

export default CalendarDay;
