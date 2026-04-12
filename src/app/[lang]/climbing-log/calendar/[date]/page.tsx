import ActionsRow from "./components/actions-row";
import {
  CalendarDailyActivitiesDocument,
  UserCustomActivityTypesDocument,
} from "@/graphql/generated";
import AddActivity from "./components/add-activity/add-activity";
import CalendarDayActivity from "./components/calendar-day-activity";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";
import { Suspense } from "react";

type TCalendarDayPageProps = {
  params: Promise<{ date: string }>;
};

async function CalendarDayPage(props: TCalendarDayPageProps) {
  const params = await props.params;
  const {
    data: { myActivities },
  } = await gqlRequest(CalendarDailyActivitiesDocument, {
    input: {
      dateFrom: params.date,
      dateTo: params.date,
    },
  });

  const customActivityTypes = gqlRequest(UserCustomActivityTypesDocument).then(
    (res) => res.data.profile.customActivityTypes
  );

  return (
    <>
      <ActionsRow date={params.date} />
      <div className="x-auto mx-auto rotate-0 px-4 2xl:container xs:px-8">
        {myActivities.items.map((activity) => (
          <CalendarDayActivity key={activity.id} activity={activity} />
        ))}
        <div className="border-t border-neutral-200 py-5">
          <Suspense>
            <AddActivity
              date={params.date}
              customActivityTypes={customActivityTypes}
            />
          </Suspense>
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
gql`
  query UserCustomActivityTypes {
    profile {
      id
      customActivityTypes
    }
  }
`;
