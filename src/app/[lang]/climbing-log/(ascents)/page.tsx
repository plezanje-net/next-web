import {
  AscentListFiltersCragDocument,
  AscentListFiltersRouteDocument,
  MyActivityRoutesDocument,
} from "@/graphql/generated";
import AscentList from "./components/acent-list/ascent-list";
import { AscentsProvider } from "./lib/ascents-context";
import ActionsRow from "./components/actions-row/actions-row";
import { TAscentListFilter } from "./components/actions-row/filter";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

type TSearchParams = {
  page: string;
  crag: string;
  route: string;
  dateFrom?: string;
  dateTo?: string;
  ascentType?: string | string[];
  routeType?: string | string[];
  visibility?: string | string[];
  sort?: string;
};

type TClimbingLogPageProps = {
  searchParams: Promise<TSearchParams>;
};

async function ClimbingLogPage(props: TClimbingLogPageProps) {
  const searchParams = await props.searchParams;
  const pageNumber = parseInt(searchParams.page) || 1;

  const [sortField, sortDirection] = (searchParams.sort || "date,desc").split(
    ","
  );

  const {
    data: { myActivityRoutes },
  } = await gqlRequest(MyActivityRoutesDocument, {
    input: {
      pageSize: 8,
      pageNumber,
      orderBy: {
        field: sortField,
        direction: sortDirection.toUpperCase(),
      },
      cragId: searchParams.crag,
      routeId: searchParams.route,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
      ascentType:
        typeof searchParams.ascentType === "string"
          ? [searchParams.ascentType]
          : searchParams.ascentType,
      routeTypes:
        typeof searchParams.routeType === "string"
          ? [searchParams.routeType]
          : searchParams.routeType,
      publish:
        typeof searchParams.visibility === "string"
          ? [searchParams.visibility]
          : searchParams.visibility,
    },
  });

  const filterValues: TAscentListFilter = {};

  if (searchParams.crag) {
    const {
      data: { crag },
    } = await gqlRequest(AscentListFiltersCragDocument, {
      input: searchParams.crag,
    });
    filterValues.crag = crag;
  }

  if (searchParams.route) {
    const {
      data: { route },
    } = await gqlRequest(AscentListFiltersRouteDocument, {
      input: searchParams.route,
    });
    filterValues.route = route;
  }

  if (searchParams.dateFrom) {
    filterValues.dateFrom = searchParams.dateFrom;
  }

  if (searchParams.dateTo) {
    filterValues.dateTo = searchParams.dateTo;
  }

  if (searchParams.ascentType) {
    filterValues.ascentType =
      typeof searchParams.ascentType === "string"
        ? [searchParams.ascentType]
        : searchParams.ascentType;
  }

  if (searchParams.routeType) {
    filterValues.routeType =
      typeof searchParams.routeType === "string"
        ? [searchParams.routeType]
        : searchParams.routeType;
  }

  if (searchParams.visibility) {
    filterValues.visibility =
      typeof searchParams.visibility === "string"
        ? [searchParams.visibility]
        : searchParams.visibility;
  }

  return (
    <AscentsProvider>
      <ActionsRow filterValues={filterValues} />
      <AscentList
        ascents={myActivityRoutes.items}
        paginationMeta={myActivityRoutes.meta}
      />
    </AscentsProvider>
  );
}

gql`
  query MyActivityRoutes($input: FindActivityRoutesInput) {
    myActivityRoutes(input: $input) {
      items {
        id
        date
        ascentType
        notes
        partner
        publish
        activity {
          id
        }
        route {
          crag {
            id
            name
            slug
            country {
              slug
            }
          }
          isProject
          difficulty
          defaultGradingSystem {
            id
          }
          name
          slug
          id
          publishStatus
        }
        pitch {
          number
          isProject
          difficulty
        }
      }
      meta {
        itemCount
        pageCount
        pageNumber
        pageSize
      }
    }
  }
`;

gql`
  query AscentListFiltersCrag($input: String!) {
    crag(id: $input) {
      id
      name
      slug
      country {
        slug
      }
    }
  }
`;

gql`
  query AscentListFiltersRoute($input: String!) {
    route(id: $input) {
      id
      name
      slug
      crag {
        id
        name
        slug
        country {
          slug
        }
      }
    }
  }
`;

export default ClimbingLogPage;
