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
import RouteImage from "./components/route-image";
import ImageList from "@/components/image-list/image-list";

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

  const mainImage = route.images[0];
  // TODO: Move this to a shared location
  const imagesBaseUrl = `${process.env.IMAGES_PROTOCOL}://${process.env.IMAGES_HOSTNAME}${process.env.IMAGES_PATHNAME}`;

  return (
    <>
      <RouteHeader route={route} />
      <RouteToolbar route={route} />
      <div className="mx-auto flex flex-wrap px-4 2xl:container xs:px-8">
        <RouteSection
          label="Osnovni podatki"
          className={`${
            mainImage ? "md:w-2/3 md:pr-3 lg:w-1/2 xl:w-1/3" : "xl:w-1/2"
          }   xl:pr-3`}
        >
          <RouteInfo route={route} />
        </RouteSection>
        {mainImage && (
          <RouteImage
            image={mainImage}
            className="mt-7 hidden pl-3 md:block md:w-1/3 lg:w-1/2 xl:hidden"
          />
        )}
        <RouteSection
          label="Opis"
          className={`${
            mainImage ? "sm:w-1/2 sm:pr-3" : ""
          } md:w-full md:pr-0 lg:w-1/3 lg:pr-3 xl:w-1/3 xl:pl-3`}
        >
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

        {mainImage && (
          <RouteImage
            image={mainImage}
            className="mt-7 sm:w-1/2 sm:pl-3 md:hidden xl:block xl:w-1/3"
          />
        )}
        <RouteSection
          label="Javni vzponi"
          className="md:w-1/2 md:pr-3 lg:w-1/3 lg:pl-3 xl:w-1/2"
        >
          <RouteAscents
            routeId={route.id}
            activityRoutes={route.activityRoutes.items}
            pageCount={route.activityRoutes.meta.pageCount}
          />
        </RouteSection>
        <RouteSection
          label="Moji vzponi"
          className="md:w-1/2 md:pl-3 lg:w-1/3 xl:w-1/2"
        >
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
        <RouteSection label="Težavnost" className="lg:w-1/2 lg:pr-3">
          <DifficultyVotes
            route={route}
            difficultyVotes={route.difficultyVotes}
          />
        </RouteSection>
        <RouteSection label="Glasovi o lepoti" className="lg:w-1/2 lg:pl-3">
          <StarRatingDistribution
            route={route}
            starRatingVotes={route.starRatingVotes}
          />
        </RouteSection>
        <RouteSection label="Galerija">
          {route.images.length == 0 ? (
            <span className="flex">
              <div className="min-w-4">
                <IconMissing />
              </div>
              <span className="ml-2">
                Smer še nima fotografij. <Link href="">Dodaj fotografijo.</Link>
              </span>
            </span>
          ) : (
            <ImageList images={route.images} baseUrl={imagesBaseUrl} />
          )}
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
      images {
        id
        title
        path
        extension
        aspectRatio
        maxIntrinsicWidth
        author
        user {
          id
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
