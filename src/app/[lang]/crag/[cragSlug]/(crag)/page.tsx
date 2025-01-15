import { gql } from "@urql/core";
import {
  ActivityRoute,
  Crag,
  CragSectorsDocument,
  MyCragSummaryDocument,
  User,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import CragRoutes from "./components/crag-routes";
import tickAscentTypes from "@/utils/constants/tick-ascent-types";
import trTickAscentTypes from "@/utils/constants/tr-tick-ascent-types";
import getCurrentUser from "@/utils/auth/get-current-user";

type Params = {
  cragSlug: string;
};

type Props = {
  params: Params;
};

async function getCragBySlug(
  crag: string,
  currentUser: User | null
): Promise<Crag> {
  const firstTryArInput = !!currentUser
    ? {
        pageSize: 1,
        pageNumber: 1,
        orderBy: {
          field: "date",
          direction: "ASC",
        },
        userId: currentUser.id,
      }
    : null;

  const firstTickArInput = !!currentUser
    ? {
        ascentType: tickAscentTypes,
        pageSize: 1,
        pageNumber: 1,
        orderBy: {
          field: "date",
          direction: "ASC",
        },
        userId: currentUser.id,
      }
    : null;

  const firstTrTickArInput = !!currentUser
    ? {
        ascentType: trTickAscentTypes,
        pageSize: 1,
        pageNumber: 1,
        orderBy: {
          field: "date",
          direction: "ASC",
        },
        userId: currentUser.id,
      }
    : null;

  const difficultyVotesInput = !!currentUser
    ? { userId: currentUser.id }
    : null;

  const starRatingVotesInput = !!currentUser
    ? { userId: currentUser.id }
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
    loggedIn: !!currentUser,
  });

  return cragBySlug;
}

async function getMySummary(
  crag: string,
  currentUser: User | null
): Promise<ActivityRoute[]> {
  const loggedIn = !!currentUser;

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
  const currentUser = await getCurrentUser();

  const [cragBySlug, myCragSummary] = await Promise.all([
    getCragBySlug(cragSlug, currentUser),
    getMySummary(cragSlug, currentUser),
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
