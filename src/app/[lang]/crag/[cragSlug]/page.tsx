import { gql } from "@urql/core";
import {
  CragSectorsDocument,
  MyCragSummaryDocument,
} from "../../../../graphql/generated";
import urqlServer from "../../../../graphql/urql-server";
import CragRoutes from "./components/crag-routes";
import authStatus from "../../../../utils/auth/auth-status";

type Params = {
  cragSlug: string;
};

type Props = {
  params: Params;
};

async function CragPage({ params }: Props) {
  const { loggedIn } = await authStatus();

  const cragPromise = urqlServer().query(CragSectorsDocument, {
    crag: params.cragSlug,
  });
  const dataList = [cragPromise];

  if (loggedIn) {
    const summaryPromise = urqlServer().query(MyCragSummaryDocument, {
      crag: params.cragSlug,
    });
    dataList.push(summaryPromise);
  }

  const [cragData, summaryData] = await Promise.all(dataList);

  const { cragBySlug } = cragData.data;
  const myCragSummary = summaryData?.data.myCragSummary ?? [];

  return (
    <>
      <CragRoutes crag={cragBySlug} mySummary={myCragSummary} />
    </>
  );
}

gql`
  query CragSectors($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      sectors {
        id
        name
        label
        publishStatus
        routes {
          id
          name
          slug
          difficulty
          defaultGradingSystem {
            id
          }
          isProject
          length
          routeType {
            id
          }
          comments {
            id
          }
          pitches {
            id
            difficulty
            isProject
            number
            height
          }
          nrTicks
          nrTries
          nrClimbers
          position
          starRating
          publishStatus
          sector {
            position
            label
            name
          }
        }
        bouldersOnly
      }
    }
  }
`;

gql`
  query MyCragSummary($input: FindActivityRoutesInput) {
    myCragSummary(input: $input) {
      ascentType
      route {
        id
        slug
      }
    }
  }
`;

export default CragPage;
