import {
  AscentListFiltersCragDocument,
  FindActivityRoutesInput,
  MyActivityRoutesDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import AscentList from "./components/acent-list/ascent-list";
import { AscentsProvider } from "./components/ascents-context";
import ActionsRow from "./components/actions-row/actions-row";
import { TAscentListFilter } from "./components/actions-row/filter";

type TSearchParams = {
  page: string;
  crag: string;
  dateFrom?: string;
  dateTo?: string;
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
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateFrom,
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

  if (searchParams.dateFrom) {
    const [yearFrom, monthFrom, dayFrom] = searchParams.dateFrom.split("-");
    filterValues.dateFrom = {
      day: parseInt(dayFrom),
      month: parseInt(monthFrom),
      year: parseInt(yearFrom),
    };
  }

  if (searchParams.dateTo) {
    const [yearTo, monthTo, dayTo] = searchParams.dateTo.split("-");
    filterValues.dateTo = {
      day: parseInt(dayTo),
      month: parseInt(monthTo),
      year: parseInt(yearTo),
    };
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

export default ClimbingLogPage;
