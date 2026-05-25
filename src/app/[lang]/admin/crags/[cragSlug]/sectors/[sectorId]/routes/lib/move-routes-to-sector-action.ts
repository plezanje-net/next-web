"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import {
  MoveRoutesToSectorDocument,
  MoveRoutesToSectorInput,
} from "@/graphql/generated";

async function moveRoutesToSectorAction(routesData: MoveRoutesToSectorInput) {
  const result = await gqlRequest(MoveRoutesToSectorDocument, {
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
