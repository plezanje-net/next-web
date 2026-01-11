"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import {
  MoveRoutesToSectorDocument,
  MoveRoutesToSectorInput,
} from "@/graphql/generated";

async function moveRoutesToSectorAction(routesData: MoveRoutesToSectorInput) {
  const result = await urqlServer().mutation(MoveRoutesToSectorDocument, {
    input: routesData,
  });

  if (result.error) {
    console.error(result.error);
    throw new Error("Pri premikanju smeri v drug sektor je prišlo do napake.");
  }

  return result.data.moveRoutesToSector;
}

export default moveRoutesToSectorAction;

gql`
  mutation MoveRoutesToSector($input: MoveRoutesToSectorInput!) {
    moveRoutesToSector(input: $input)
  }
`;
