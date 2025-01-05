import { gql } from "urql";
import {
  Activity,
  CalendarFirstEntryDocument,
  CalendarMonthlyActivitiesDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import locale from "dayjs/locale/sl";
import localeData from "dayjs/plugin/localeData";
import ActionsRow from "./components/actions-row/actions-row";
import CalendarDay, { TCalendarDay } from "./components/calendar-day";

type TSearchParams = {
  date: string;
};

type TCalendarPageProps = {
  searchParams: TSearchParams;
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
  let firstWeek = true;
  while (
    currentDay.format("YYYY-MM") <= dayjs(date).format("YYYY-MM") ||
    currentDay.weekday() !== 0
  ) {
    days.push({
      date: currentDay.format("YYYY-MM-DD"),
      dayNumber: currentDay.date(),
      isCurrentMonth: currentDay.month() === dayjs(date).month(),
      isToday: currentDay.isSame(dayjs(), "day"),
      activities: myActivities.items.filter((activity: Activity) =>
        dayjs(activity.date).isSame(currentDay, "day")
      ),
      borderClass: `${currentDay.weekday() > 0 ? " border-l" : ""}${!firstWeek ? " border-t" : ""}`,
    });
    currentDay = currentDay.add(1, "day");
    if (currentDay.weekday() == 6 && firstWeek) {
      firstWeek = false;
    }
  }

  return (
    <>
      <ActionsRow firstEntryYear={firstEntryYear} date={date} />
      <div className="x-auto mx-auto rotate-0 px-4 2xl:container xs:px-8 pb-8">
        <div className="flex">
          {Array.from({ length: 7 }, (_, i) => (
            <div className="flex-1 text-center text-neutral-500" key={i}>
              <span className="hidden lg:inline">
                {firstDay.weekday(i).format("ddd").substring(0, 3)}
              </span>
              <span className="lg:hidden uppercase">
                {firstDay.weekday(i).format("ddd").substring(0, 1)}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 border border-neutral-200 mt-2 rounded-lg">
          {days.map((day, i) => (
            <CalendarDay key={i} day={day} />
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
