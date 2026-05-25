"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { RouteAscentsDocument } from "@/graphql/generated";

async function routeAscentsAction(
  routeId: string,
  pageNumber: number,
  allTypes: boolean = false
) {
  const result = await gqlRequest(RouteAscentsDocument, {
    routeId,
    pageNumber,
    pageSize: 10,
    ascentTypes: allTypes ? null : ["onsight", "flash", "redpoint"],
  });

  if (result.error) {
    return Promise.reject(result.error);
  }

  return result.data.route.activityRoutes;
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
          publish: ["public", "club"]
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
        meta {
          pageCount
        }
      }
    }
  }
`;
