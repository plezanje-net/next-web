"use server";

import { ComboboxPopulateRoutesDocument, Route } from "@/graphql/generated";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

async function populateRoutesAction(query: string, cragId?: string) {
  const result = await gqlRequest(ComboboxPopulateRoutesDocument, {
    input: {
      query,
      cragId,
      pageSize: 10,
      orderBy: { field: "popularity", direction: "DESC" },
    },
  });

  if (result.error) {
    return Promise.reject(result.error);
  }

  return result.data.searchRoutes.items;
}

export default populateRoutesAction;

gql`
  query ComboboxPopulateRoutes($input: SearchRoutesInput!) {
    searchRoutes(input: $input) {
      items {
        __typename
        id
        name
        slug
        crag {
          id
          name
        }
      }
    }
  }
`;
