import {
  AscentListFiltersCragDocument,
  AscentListFiltersRouteDocument,
  MyActivityRoutesDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import AscentList from "./components/acent-list/ascent-list";
import { AscentsProvider } from "./lib/ascents-context";
import ActionsRow from "./components/actions-row/actions-row";
import { TAscentListFilter } from "./components/actions-row/filter";

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
  searchParams: TSearchParams;
};

async function ClimbingLogPage({ searchParams }: TClimbingLogPageProps) {
  const pageNumber = parseInt(searchParams.page) || 1;

  const [sortField, sortDirection] = (searchParams.sort || "date,desc").split(
    ","
  );

  const {
    data: { myActivityRoutes },
  } = await urqlServer().query(MyActivityRoutesDocument, {
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
      ascentType: searchParams.ascentType,
      routeTypes: searchParams.routeType,
      publish: searchParams.visibility,
    },
  });

  const filterValues: TAscentListFilter = {};

  if (searchParams.crag) {
    const {
      data: { crag },
    } = await urqlServer().query(AscentListFiltersCragDocument, {
      input: searchParams.crag,
    });
    filterValues.crag = crag;
  }

  if (searchParams.route) {
    const {
      data: { route },
    } = await urqlServer().query(AscentListFiltersRouteDocument, {
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
