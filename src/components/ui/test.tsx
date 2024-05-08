// TODO: temp debug
"use client";

import { Fragment } from "react";
import Button from "./button";
import IconCalendar from "./icons/calendar";
import IconCheck from "./icons/check";
import IconLeft from "./icons/left";
import IconRight from "./icons/right";
import dayjs from "dayjs";
import "dayjs/locale/sl"; // import locale

function test() {
  return (
    <div className="mx-auto mt-8 w-80 ">
      {/* input */}
      <div
        className={`relative flex w-full cursor-pointer justify-between gap-2 rounded-lg border border-neutral-400 py-2 pl-4 pr-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 `}
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-400">
          dd.mm.lll
        </span>

        <div>
          <IconCalendar />
        </div>
      </div>

      {/* input pane (opened) */}
      <div className="mt-2 w-[296px] rounded-lg border border-neutral-400 px-2 py-3">
        <div className="flex justify-between">
          {/* month choice */}
          <div className="flex items-center">
            <Button variant="quaternary">
              <IconLeft />
            </Button>
            <Button variant="quaternary">
              <span className="px-1">Mar</span>
            </Button>
            <Button variant="quaternary">
              <IconRight />
            </Button>
          </div>

          {/* year choice */}
          <div className="flex items-center">
            <Button variant="quaternary">
              <IconLeft />
            </Button>
            <Button variant="quaternary">
              <span className="px-1">2024</span>
            </Button>
            <Button variant="quaternary">
              <IconRight />
            </Button>
          </div>
        </div>

        {/* days */}
        <div className="mt-2">
          {/* days names */}
          <div className="flex">
            {["P", "T", "S", "Č", "P", "S", "N"].map((dayName, i) => (
              <Fragment key={i}>
                <DayName name={dayName} />
              </Fragment>
            ))}
          </div>
          {/* days numbers */}
          <MonthDays month={4} year={2024} />
        </div>
      </div>
    </div>
  );
}

function MonthDays({ month, year }: { month: number; year: number }) {
  dayjs.locale("sl"); // use locale
  const date = dayjs(`${year}-${month}`);
  const firstDay = date.day();
  const daysInMonth = date.daysInMonth();
  const today = dayjs();

  const days = [new Array(firstDay - 1).fill({ date: null, state: "empty" })];
  let week = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    if (days[week].length >= 7) {
      // create new week
      days.push([]);
      week++;
    }

    const dayState =
      today.year() == year && today.month() + 1 == month && today.date() == d
        ? "today"
        : "default";

    // add day to week
    days[week].push({ date: d, state: dayState });
  }

  // pad last week with empty days
  days[days.length - 1] = [
    ...days[days.length - 1],
    ...new Array(7 - days[days.length - 1].length).fill({
      date: null,
      state: "empty",
    }),
  ];

  return (
    <div>
      {days.map((week, w) => (
        <div key={w} className="flex">
          {week.map((day, d) => (
            <Fragment key={d}>
              <Day number={day.date} state={day.state} />
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

function DayName({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center">{name}</div>
  );
}

function Day({
  number,
  state,
}: {
  number: number;
  state: "default" | "today" | "selected" | "empty";
}) {
  return (
    <>
      {state == "empty" ? (
        <div className="h-10 w-10"></div>
      ) : (
        <div className="h-10 w-10 cursor-pointer p-1">
          <div
            className={`flex h-full w-full items-center justify-center rounded-full text-center align-middle ${
              state == "selected" ? "bg-blue-500 text-white" : ""
            } ${
              state == "today" ? "border border-blue-500 text-blue-500" : ""
            }`}
          >
            {number}
          </div>
        </div>
      )}
    </>
  );
}

// TODO: dd. mm. lll should be clickable, tabable and arrowable. first arrow press starts with today. delete deletes but if deletes last turns to placeholder again

// TODO: click on icon should open pane

// TODO: focus should be trapped inside the opened pane

export default test;
