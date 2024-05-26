import { RouteBySlugDocument } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import RouteHeader from "./components/route-header";
import RouteSection from "./components/route-section";
import RouteInfo from "./components/route-info";
import RouteAscents from "./components/route-ascents";
import authStatus from "@/utils/auth/auth-status";
import DifficultyVotes from "@/components/difficulty-votes";

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
  });

  return (
    <>
      <RouteHeader route={route} />
      <div className="mx-auto px-4 2xl:container xs:px-8">
        <RouteSection label="Osnovni podatki">
          <RouteInfo route={route} />
        </RouteSection>
        <RouteSection label="Opis">{route.description}</RouteSection>
        <RouteSection label="Javni vzponi">
          <RouteAscents
            routeId={route.id}
            activityRoutes={route.activityRoutes.items}
          />
        </RouteSection>
        {user && (
          <RouteSection label="Moji vzponi">
            <RouteAscents
              routeId={route.id}
              activityRoutes={route.myAscents.items}
              myAscents
            />
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
          pageSize: 10
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
          pageSize: 10
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
      }
    }
  }
`;

export default RoutePage;
