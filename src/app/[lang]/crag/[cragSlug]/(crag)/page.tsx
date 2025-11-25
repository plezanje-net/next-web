import tickAscentTypes from "@/lib/constants/tick-ascent-types";
import trTickAscentTypes from "@/lib/constants/tr-tick-ascent-types";
import getCurrentUser from "@/lib/auth/get-current-user";
import {
  ActivityRoute,
  Crag,
  CragSectorsDocument,
  MyCragSummaryDocument,
  User,
} from "@/graphql/generated";
import { gqlRequest } from "@/lib/graphql-client";
import CragRoutes from "./components/crag-routes";

type Params = {
  cragSlug: string;
};

type Props = {
  params: Promise<Params>;
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

  const { cragBySlug } = await gqlRequest(CragSectorsDocument, {
    crag,
    firstTryArInput,
    firstTickArInput,
    firstTrTickArInput,
    difficultyVotesInput,
    starRatingVotesInput,
    loggedIn: !!currentUser,
  });

  return cragBySlug as Crag;
}

async function getMySummary(
  cragId: string,
  currentUser: User | null
): Promise<ActivityRoute[]> {
  const loggedIn = !!currentUser;

  if (!loggedIn) {
    return [];
  }

  const { myCragSummary } = await gqlRequest(MyCragSummaryDocument, {
      input: {
        cragId,
      },
    });

  return myCragSummary as ActivityRoute[];
}

async function CragPage({ params }: Props) {
  const currentUser = await getCurrentUser();
  const { cragSlug } = await params;

  const cragBySlug = await getCragBySlug(cragSlug, currentUser as User);
  const myCragSummary = await getMySummary(cragBySlug.id, currentUser as User);

  return (
    <>
      <CragRoutes crag={cragBySlug} mySummary={myCragSummary} />
    </>
  );
}

export default CragPage;
