"use server";

import { gql } from "urql/core";
import {
  PaginatedActivityRoutes,
  RouteMyAscentsDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";

async function routeMyAscentsAction(
  routeId: string,
  userId: string,
  pageNumber: number,
  allTypes: boolean = false
): Promise<PaginatedActivityRoutes> {
  const result = await urqlServer().query(RouteMyAscentsDocument, {
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
