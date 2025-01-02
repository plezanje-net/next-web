import { gql } from "urql";
import {
  Activity,
  CalendarFirstEntryDocument,
  CalendarMonthlyActivitiesDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import dayjs from "dayjs";
import locale from "dayjs/locale/sl";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import CalendarActivity from "./components/calendar-activity";
import ActionsRow from "./components/actions-row/actions-row";

type TSearchParams = {
  date: string;
};

type TCalendarPageProps = {
  searchParams: TSearchParams;
};

type TCalendarDay = {
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  activities: Activity[];
};

async function CalendarPage({ searchParams }: TCalendarPageProps) {
  const {
    data: { myActivities: myFirstActivities },
  } = await urqlServer().query(CalendarFirstEntryDocument, {
    input: {
      pageSize: 1,
      orderBy: {
        field: "date",
        direction: "ASC",
      },
    },
  });

  if (myFirstActivities.items.length === 0) {
    return <>Tvoj dnevnik je prazen</>;
  }

  const firstEntryYear = parseInt(
    myFirstActivities.items[0].date.split("-")[0]
  );

  const date = searchParams.date ?? dayjs().format("YYYY-MM-01");

  const {
    data: { myActivities },
  } = await urqlServer().query(CalendarMonthlyActivitiesDocument, {
    input: {
      dateFrom: date,
      dateTo: dayjs(date).endOf("month").format("YYYY-MM-DD"),
    },
  });


  dayjs.extend(weekday);
  dayjs.locale(locale);
  dayjs.extend(localeData);

  const firstDay = dayjs(date).weekday(0);

  const days: TCalendarDay[] = [];

  let currentDay = firstDay.clone();
  while (
    currentDay.format('YYYY-MM') <= dayjs(date).format('YYYY-MM') ||
    currentDay.weekday() !== 0
  ) {
    days.push({
      dayNumber: currentDay.date(),
      isCurrentMonth: currentDay.month() === dayjs(date).month(),
      isToday: currentDay.isSame(dayjs(), "day"),
      activities: myActivities.items.filter((activity: Activity) => dayjs(activity.date).isSame(currentDay, "day")),
    });
    currentDay = currentDay.add(1, "day");
  }

  return (
    <>
      <ActionsRow firstEntryYear={firstEntryYear} date={date} />
      <div className="x-auto mx-auto rotate-0 px-4 2xl:container xs:px-8">
        <div className="flex">
          {Array.from({ length: 7 }, (_, i) => (
            <div className="flex-1 text-center text-neutral-500" key={i}>
              <span className="hidden lg:inline">{firstDay.weekday(i).format("ddd").substring(0, 3)}</span>
              <span className="lg:hidden uppercase">{firstDay.weekday(i).format("ddd").substring(0, 1)}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[1px] bg-neutral-200 border border-neutral-200 mt-2">
          {days.map((day, i) => (
            <div key={i} className="bg-white p-2 lg:p-4 min-h-[calc((100vw-32px)/7*1.5)] lg:min-h-[calc((100vw-32px)/7)] flex flex-col lg:gap-4">
              <div
                className={`text-center lg:text-right${!day.isCurrentMonth ? " text-neutral-400" : ""}${day.isToday ? " text-blue-400" : ""}`}
              >
                {day.dayNumber}
              </div>
              <div className="flex flex-wrap grow items-center justify-center lg:items-start lg:justify-start lg:gap-4">
                {day.activities.map((activity, i) => <CalendarActivity key={i} activity={activity} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CalendarPage;

gql`
  query CalendarFirstEntry($input: FindActivitiesInput) {
    myActivities(input: $input) {
      items {
        id
        date
      }
    }
  }
`;

gql`
  query CalendarMonthlyActivities($input: FindActivitiesInput) {
    myActivities(input: $input) {
      items {
        id
        name
        date
        type
        duration
        routes {
          ascentType
          route {
            difficulty
            length
            defaultGradingSystem {
              id
            }
          }
        }
        crag {
          id
          name
          slug
          country {
            slug
          }
        }
      }
    }
  }
`;
