import { Activity, HomeLatestAscentsDocument } from "../../graphql/generated";
import LatestAscentsActivity from "./latest-ascents/latest-ascents-activity";
import LatestAscentsActivitySkeleton from "./latest-ascents/latest-ascents-activity-skeleton";
import urqlServer from "../../graphql/urql-server";
import { gql } from "@urql/core";

async function LatestAscents() {
  const { data } = await urqlServer().query(HomeLatestAscentsDocument, {
    activitiesInput: {
      type: ["crag"],
      hasRoutesWithPublish: ["public"],
      orderBy: { field: "date", direction: "DESC" },
      pageSize: 10,
    },
    activityRoutesInput: {
      publish: ["public"],
      orderBy: { field: "orderScore", direction: "DESC" },
    },
  });

  const activities: Activity[] =
    data?.activities.items ?? Array.from(new Array(10));

  return (
    <>
      <h2>Zadnji vzponi</h2>
      <ul>
        {activities.map((activity, index) =>
          activity ? (
            <LatestAscentsActivity key={activity.id} activity={activity} />
          ) : (
            <LatestAscentsActivitySkeleton key={index} />
          )
        )}
      </ul>
    </>
  );
}

gql`
  query HomeLatestAscents(
    $activitiesInput: FindActivitiesInput
    $activityRoutesInput: FindActivityRoutesInput
  ) {
    activities(input: $activitiesInput) {
      items {
        id
        name
        date
        user {
          id
          fullName
        }
        routes(input: $activityRoutesInput) {
          route {
            id
            name
            slug
            difficulty
            defaultGradingSystem {
              id
            }
            crag {
              id
              name
              slug
            }
          }
          id
          ascentType
        }
      }
      meta {
        itemCount
        pageCount
        pageNumber
        pageSize
      }
    }
  }
`;

export default LatestAscents;
