"use client";

import { Activity } from "@/graphql/generated";
import CalendarActivity from "./calendar-activity";
import { useRouter } from "next/navigation";

export type TCalendarDay = {
  date: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  activities: Activity[];
};

export type TCalendarDayProps = {
  day: TCalendarDay;
};

function CalendarDay({ day }: TCalendarDayProps) {

  const router = useRouter();

  function handleClick () {
    if (!day.isCurrentMonth) return;

    router.push(`/plezalni-dnevnik/koledar/${day.date}`);
    
  }

  return (
    <div onClick={handleClick} className={`bg-white p-2 lg:p-4 min-h-[calc((100vw-32px)/7*1.5)] lg:min-h-[calc((100vw-32px)/7)] flex flex-col lg:gap-4${day.isCurrentMonth ? " cursor-pointer" : ""}`}>
      <div
        className={`text-center lg:text-right${!day.isCurrentMonth ? " text-neutral-400" : ""}${day.isToday ? " text-blue-400" : ""}`}
      >
        {day.dayNumber}
      </div>
      <div className="flex flex-wrap grow items-center justify-center lg:items-start lg:justify-start lg:gap-4">
        {day.activities.map((activity, i) => (
          <CalendarActivity key={i} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default CalendarDay;
