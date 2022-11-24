import { gql, useQuery } from "urql";
import { Activity, HomeLatestAscentsDocument } from "../../graphql/generated";
import LatestAscentsActivity from "./latest-ascents/latest-ascents-activity";
import LatestAscentsActivitySkeleton from "./latest-ascents/latest-ascents-activity-skeleton";

function LatestAscents() {
  const [result] = useQuery({
    query: HomeLatestAscentsDocument,
    variables: {
      activitiesInput: {
        type: ["crag"],
        hasRoutesWithPublish: ["public"],
        orderBy: { field: "date", direction: "DESC" },
        pageSize: 10,
      },
      activityRoutesInput: {
        publish: ["public"],
        orderBy: { field: "score", direction: "DESC" },
      },
    },
  });

  const { data, fetching, error } = result;

  if (error) {
    return <div className="text-red-500">Napaka</div>;
  }

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
          score
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
