import { Activity, HomeLatestAscentsDocument } from "@/graphql/generated";
import LatestAscentsActivity from "./latest-ascents/latest-ascents-activity";
import LatestAscentsActivitySkeleton from "./latest-ascents/latest-ascents-activity-skeleton";
import { gqlRequest } from "@/lib/graphql-client";

async function LatestAscents() {

  const { activities } = await gqlRequest(HomeLatestAscentsDocument, {
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

  return (
    <>
      <h2>Zadnji vzponi</h2>
      <ul>
        {activities?.items.map((activity, index) =>
          activity ? (
            <LatestAscentsActivity key={activity.id} activity={activity as Activity} />
          ) : (
            <LatestAscentsActivitySkeleton key={index} />
          )
        )}
      </ul>
    </>
  );
}

export default LatestAscents;
