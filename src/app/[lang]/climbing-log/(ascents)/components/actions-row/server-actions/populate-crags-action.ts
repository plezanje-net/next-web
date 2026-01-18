"use server";

import { gql } from "urql/core";
import { ComboboxPopulateCragsDocument, Crag } from "@/graphql/generated";
import { gqlRequest } from "@/lib/gql-request";

async function populateCragsAction(query: string) {
  const result = await gqlRequest(ComboboxPopulateCragsDocument, {
    input: {
      query,
      pageSize: 10,
      orderBy: { field: "popularity", direction: "DESC" },
    },
  });

  if (result.error) {
    return Promise.reject(result.error);
  }

  return result.data.searchCrags.items;
}

export default populateCragsAction;

gql`
  query ComboboxPopulateCrags($input: SearchCragsInput!) {
    searchCrags(input: $input) {
      items {
        __typename
        id
        name
        slug
      }
    }
  }
`;
