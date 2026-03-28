import {
  ActivityRoute,
  CragSectorsDocument,
  CragSectorsQuery,
  MyCragSummaryDocument,
  User,
} from "@/graphql/generated";
import CragRoutes from "./components/crag-routes";
import tickAscentTypes from "@/lib/constants/tick-ascent-types";
import trTickAscentTypes from "@/lib/constants/tr-tick-ascent-types";
import getCurrentUser from "@/lib/auth/get-current-user";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

type Params = {
  cragSlug: string;
};

type Props = {
  params: Params;
};

async function getCragBySlug(
  crag: string,
  currentUser: User | null
): Promise<CragSectorsQuery["cragBySlug"]> {
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
  } = await gqlRequest(CragSectorsDocument, {
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
  cragId: string,
  currentUser: User | null
): Promise<ActivityRoute[]> {
  const loggedIn = !!currentUser;

  if (!loggedIn) {
    return [];
  }

  const {
    data: { myCragSummary },
  } = await gqlRequest(MyCragSummaryDocument, {
    input: {
      cragId,
    },
  });

  return myCragSummary as ActivityRoute[];
}

async function CragPage(props: Props) {
  const params = await props.params;

  const { cragSlug } = params;

  const currentUser = await getCurrentUser();

  const cragBySlug = await getCragBySlug(cragSlug, currentUser);
  const myCragSummary = await getMySummary(cragBySlug.id, currentUser);

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
          crag {
            slug
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
