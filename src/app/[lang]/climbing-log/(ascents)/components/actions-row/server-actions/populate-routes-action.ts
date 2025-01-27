"use server";

import { gql } from "urql/core";
import { ComboboxPopulateRoutesDocument, Route } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";

async function populateRoutesAction(
  query: string,
  cragId?: string
): Promise<Route[]> {
  const result = await urqlServer().query(ComboboxPopulateRoutesDocument, {
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
