"use server";

import { gql } from "urql/core";
import { ActivityRoute, RouteAscentsDocument } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";

async function routeAscentsAction(
  routeId: string,
  pageNumber: number,
  allTypes: boolean = false
): Promise<ActivityRoute[]> {
  const result = await urqlServer().query(RouteAscentsDocument, {
    routeId,
    pageNumber,
    pageSize: 10,
    ascentTypes: allTypes ? null : ["onsight", "flash", "redpoint"],
  });

  if (result.error) {
    return Promise.reject(result.error);
  }

  return result.data.route.activityRoutes.items;
}

export default routeAscentsAction;

gql`
  query RouteAscents(
    $routeId: String!
    $ascentTypes: [String!]
    $pageSize: Int
    $pageNumber: Int
  ) {
    route(id: $routeId) {
      id
      activityRoutes(
        input: {
          pageSize: $pageSize
          pageNumber: $pageNumber
          orderBy: { field: "date", direction: "DESC" }
          ascentType: $ascentTypes
        }
      ) {
        items {
          ascentType
          id
          date
          user {
            fullName
            id
          }
        }
      }
    }
  }
`;