import { gql } from "@urql/core";
import {
  ActivityRoute,
  Crag,
  CragSectorsDocument,
  MyCragSummaryDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import CragRoutes from "./components/crag-routes";
import authStatus from "@/utils/auth/auth-status";

type Params = {
  cragSlug: string;
};

type Props = {
  params: Params;
};

async function getCragBySlug(crag: string): Promise<Crag> {
  const {
    data: { cragBySlug },
  } = await urqlServer().query(CragSectorsDocument, {
    crag,
  });
  return cragBySlug;
}

async function getMySummary(crag: string): Promise<ActivityRoute[]> {
  const { loggedIn } = await authStatus();

  if (!loggedIn) {
    return [];
  }

  const {
    data: { myCragSummary },
  } = await urqlServer().query(MyCragSummaryDocument, {
    crag,
  });

  return myCragSummary;
}

async function CragPage({ params: { cragSlug } }: Props) {
  const [cragBySlug, myCragSummary] = await Promise.all([
    getCragBySlug(cragSlug),
    getMySummary(cragSlug),
  ]);

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
