"use server";

import { gql } from "urql/core";
import { ComboboxPopulateCragsDocument, Crag } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";

async function populateCragsAction(query: string): Promise<Crag[]> {
  const result = await urqlServer().query(ComboboxPopulateCragsDocument, {
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
