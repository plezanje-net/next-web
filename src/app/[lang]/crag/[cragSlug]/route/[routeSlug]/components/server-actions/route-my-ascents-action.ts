"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { RouteMyAscentsDocument } from "@/graphql/generated";

async function routeMyAscentsAction(
  routeId: string,
  userId: string,
  pageNumber: number,
  allTypes: boolean = false
) {
  const result = await gqlRequest(RouteMyAscentsDocument, {
    routeId,
    pageNumber,
    pageSize: 10,
    userId,
    ascentTypes: allTypes ? null : ["onsight", "flash", "redpoint"],
  });

  if (result.error) {
    return Promise.reject(result.error);
  }

  return result.data.route.myAscents;
}

export default routeMyAscentsAction;

gql`
  query RouteMyAscents(
    $routeId: String!
    $userId: String!
    $ascentTypes: [String!]
    $pageSize: Int
    $pageNumber: Int
  ) {
    route(id: $routeId) {
      id
      myAscents: activityRoutes(
        input: {
          userId: $userId
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
        }
        meta {
          pageCount
        }
      }
    }
  }
`;
