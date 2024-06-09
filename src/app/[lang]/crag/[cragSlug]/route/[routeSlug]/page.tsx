import { RouteBySlugDocument } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import RouteSection from "./components/route-section";
import RouteInfo from "./components/route-info";
import RouteAscents from "./components/route-ascents";
import authStatus from "@/utils/auth/auth-status";
import DifficultyVotes from "@/components/difficulty-votes";
import IconMissing from "@/components/ui/icons/missing";
import Link from "@/components/ui/link";
import RouteToolbar from "./components/route-toolbar";
import RouteHeader from "./components/route-header";

type Params = {
  cragSlug: string;
  routeSlug: string;
};

async function RoutePage({ params }: { params: Params }) {
  const { user } = await authStatus();
  const { cragSlug, routeSlug } = params;
  const {
    data: { routeBySlug: route },
  } = await urqlServer().query(RouteBySlugDocument, {
    cragSlug,
    routeSlug,
    includeMyAscents: !!user,
    userId: user?.id,
    pageSize: 10,
  });

  return (
    <>
      <RouteHeader route={route} />
      <RouteToolbar route={route} />
      <div className="mx-auto px-4 2xl:container xs:px-8">
        <RouteSection label="Osnovni podatki">
          <RouteInfo route={route} />
        </RouteSection>
        <RouteSection label="Opis">
          {route.description || (
            <span className="flex">
              <div className="min-w-4">
                <IconMissing />
              </div>
              <span className="ml-2">
                Smer nima opisa. <Link href="">Dodaj opis.</Link>
              </span>
            </span>
          )}
        </RouteSection>
        <RouteSection label="Javni vzponi">
          <RouteAscents
            routeId={route.id}
            activityRoutes={route.activityRoutes.items}
            pageCount={route.activityRoutes.meta.pageCount}
          />
        </RouteSection>
        {user && (
          <RouteSection label="Moji vzponi">
            {/* <RouteAscents
              routeId={route.id}
              activityRoutes={route.myAscents.items}
              myAscents
            /> */}
          </RouteSection>
        )}
        <RouteSection label="Težavnost">
          <DifficultyVotes
            route={route}
            difficultyVotes={route.difficultyVotes}
          />
        </RouteSection>
      </div>
    </>
  );
}

gql`
  query RouteBySlug(
    $cragSlug: String!
    $routeSlug: String!
    $includeMyAscents: Boolean!
    $userId: String
    $pageSize: Int
  ) {
    routeBySlug(cragSlug: $cragSlug, routeSlug: $routeSlug) {
      id
      name
      slug
      length
      difficulty
      starRating
      description
      nrTries
      nrTicks
      nrClimbers
      myAscents: activityRoutes(
        input: {
          userId: $userId
          pageSize: $pageSize
          orderBy: { field: "date", direction: "DESC" }
        }
      ) @include(if: $includeMyAscents) {
        items {
          ascentType
          id
          date
          user {
            fullName
            id
          }
        }
      }
      activityRoutes(
        input: {
          pageSize: $pageSize
          orderBy: { field: "date", direction: "DESC" }
          ascentType: ["onsight", "flash", "redpoint"]
        }
      ) {
        items {
          ascentType
          id
          date
          user {
            fullName
            id
          }
        }
        meta {
          pageCount
        }
      }
      difficultyVotes {
        user {
          id
          fullName
          firstname
          lastname
        }
        id
        difficulty
        created
        updated
        isBase
        includedInCalculation
      }
      properties {
        stringValue
        textValue
        numValue
        propertyType {
          id
          name
          valueType
        }
      }
      crag {
        id
        name
        slug
        country {
          id
          name
          slug
        }
      }
      sector {
        id
        name
        label
        routes {
          id
          name
          slug
        }
      }
    }
  }
`;

export default RoutePage;
