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
import RouteMyAscents from "./components/route-my-ascents";
import StarRatingDistribution from "@/components/star-rating-distribution";
import Comments from "@/components/comments/comments";

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
        <RouteSection label="Moji vzponi">
          {user ? (
            <RouteMyAscents
              routeId={route.id}
              userId={user.id}
              activityRoutes={route.myAscents.items}
              pageCount={route.myAscents.meta.pageCount}
            ></RouteMyAscents>
          ) : (
            "Za ogled svojih vzponov se prijavi."
          )}
        </RouteSection>
        <RouteSection label="Težavnost">
          <DifficultyVotes
            route={route}
            difficultyVotes={route.difficultyVotes}
          />
        </RouteSection>
        <RouteSection label="Glasovi o lepoti">
          <StarRatingDistribution
            route={route}
            starRatingVotes={route.starRatingVotes}
          />
        </RouteSection>
        <RouteSection label="Galerija">
          <span className="flex">
            <div className="min-w-4">
              <IconMissing />
            </div>
            <span className="ml-2">
              Smer še nima fotografij. <Link href="">Dodaj fotografijo.</Link>
            </span>
          </span>
        </RouteSection>
        <RouteSection label="Komentarji">
          <Comments comments={route.comments} route={route} />
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
        meta {
          pageCount
        }
      }
      activityRoutes(
        input: {
          pageSize: $pageSize
          orderBy: { field: "date", direction: "DESC" }
          ascentType: ["onsight", "flash", "redpoint"]
          publish: ["public", "club"]
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
      starRatingVotes {
        id
        stars
        created
        user {
          id
          fullName
        }
      }
      comments {
        id
        content
        type
        created
        updated
        user {
          id
          fullName
        }
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
