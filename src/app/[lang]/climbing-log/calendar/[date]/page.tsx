import ActionsRow from "./components/actions-row";
import { gql } from "urql";
import urqlServer from "@/graphql/urql-server";
import { Activity, CalendarDailyActivitiesDocument } from "@/graphql/generated";
import AddActivity from "./components/add-activity/add-activity";
import CalendarDayActivity from "./components/calendar-day-activity";

type TCalendarDayPageProps = {
  params: { date: string };
};

async function CalendarDayPage({ params }: TCalendarDayPageProps) {
  const {
    data: { myActivities },
  } = await urqlServer().query(CalendarDailyActivitiesDocument, {
    input: {
      dateFrom: params.date,
      dateTo: params.date,
    },
  });

  return (
    <>
      <ActionsRow date={params.date} />
      <div className="x-auto mx-auto rotate-0 px-4 2xl:container xs:px-8">
        {myActivities.items.map((activity: Activity) => (
          <CalendarDayActivity key={activity.id} activity={activity} />
        ))}
        <div className="border-t border-neutral-200 py-5">
          <AddActivity date={params.date} />
        </div>
      </div>
    </>
  );
}

export default CalendarDayPage;

gql`
  query CalendarDailyActivities($input: FindActivitiesInput) {
    myActivities(input: $input) {
      items {
        id
        name
        date
        type
        customType
        notes
        partners
        duration
        routes {
          id
          date
          ascentType
          notes
          partner
          publish
          activity {
            id
          }
          route {
            defaultGradingSystem {
              id
            }
            difficulty
            crag {
              id
              name
              slug
              country {
                slug
              }
            }
            name
            id
            slug
            length
          }
          pitch {
            number
            difficulty
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
