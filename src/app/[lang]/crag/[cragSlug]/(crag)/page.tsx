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
  const { user: loggedInUser } = await authStatus();

  const firstTryArInput = !!loggedInUser
    ? {
        pageSize: 1,
        pageNumber: 1,
        orderBy: {
          field: "date",
          direction: "ASC",
        },
        userId: loggedInUser.id,
      }
    : null;

  const firstTickArInput = !!loggedInUser
    ? {
        ascentType: tickAscentTypes,
        pageSize: 1,
        pageNumber: 1,
        orderBy: {
          field: "date",
          direction: "ASC",
        },
        userId: loggedInUser.id,
      }
    : null;

  const firstTrTickArInput = !!loggedInUser
    ? {
        ascentType: trTickAscentTypes,
        pageSize: 1,
        pageNumber: 1,
        orderBy: {
          field: "date",
          direction: "ASC",
        },
        userId: loggedInUser.id,
      }
    : null;

  const difficultyVotesInput = !!loggedInUser
    ? { userId: loggedInUser.id }
    : null;

  const starRatingVotesInput = !!loggedInUser
    ? { userId: loggedInUser.id }
    : null;

  const {
    data: { cragBySlug },
  } = await urqlServer().query(CragSectorsDocument, {
    crag,
    firstTryArInput,
    firstTickArInput,
    firstTrTickArInput,
    difficultyVotesInput,
    starRatingVotesInput,
    loggedIn: !!loggedInUser,
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
    $firstTickArInput: FindActivityRoutesInput
    $firstTryArInput: FindActivityRoutesInput
    $firstTrTickArInput: FindActivityRoutesInput
    $difficultyVotesInput: FindDifficultyVotesInput
    $starRatingVotesInput: FindStarRatingVotesInput
    $loggedIn: Boolean!
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

          firstTry: activityRoutes(input: $firstTryArInput)
            @include(if: $loggedIn) {
            items {
              id
              date
            }
          }

          firstTick: activityRoutes(input: $firstTickArInput)
            @include(if: $loggedIn) {
            items {
              id
              date
            }
          }

          firstTrTick: activityRoutes(input: $firstTrTickArInput)
            @include(if: $loggedIn) {
            items {
              id
              date
            }
          }

          difficultyVotes(input: $difficultyVotesInput)
            @include(if: $loggedIn) {
            difficulty
            updated
          }

          starRatingVotes(input: $starRatingVotesInput)
            @include(if: $loggedIn) {
            stars
            updated
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
