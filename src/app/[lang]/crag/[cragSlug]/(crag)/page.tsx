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
import tickAscentTypes from "@/utils/constants/tick-ascent-types";
import trTickAscentTypes from "@/utils/constants/tr-tick-ascent-types";

type Params = {
  cragSlug: string;
};

type Props = {
  params: Params;
};

async function getCragBySlug(crag: string): Promise<Crag> {
  const lastTryArInput = {
    pageSize: 1,
    pageNumber: 1,
    orderBy: {
      field: "date",
      direction: "DESC",
    },
  };

  const lastTickArInput = {
    ascentType: tickAscentTypes.map((at) => at.toLowerCase()),
    pageSize: 1,
    pageNumber: 1,
    orderBy: {
      field: "date",
      direction: "DESC",
    },
  };

  const lastTrTickArInput = {
    ascentType: trTickAscentTypes.map((at) => at.toLowerCase()),
    pageSize: 1,
    pageNumber: 1,
    orderBy: {
      field: "date",
      direction: "DESC",
    },
  };

  const {
    data: { cragBySlug },
  } = await urqlServer().query(CragSectorsDocument, {
    crag,
    lastTryArInput,
    lastTickArInput,
    lastTrTickArInput,
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
  query CragSectors(
    $crag: String!
    $lastTryArInput: FindActivityRoutesInput
    $lastTickArInput: FindActivityRoutesInput
    $lastTrTickArInput: FindActivityRoutesInput
  ) {
    cragBySlug(slug: $crag) {
      id
      slug
      name
      sectors {
        id
        name
        label
        publishStatus
        bouldersOnly
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

          lastTry: activityRoutes(input: $lastTryArInput) {
            items {
              id
              ascentType
              date
            }
            meta {
              itemCount
            }
          }
          lastTick: activityRoutes(input: $lastTickArInput) {
            items {
              id
              ascentType
              date
            }
            meta {
              itemCount
            }
          }
          lastTrTick: activityRoutes(input: $lastTrTickArInput) {
            items {
              id
              ascentType
              date
            }
            meta {
              itemCount
            }
          }
        }
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
