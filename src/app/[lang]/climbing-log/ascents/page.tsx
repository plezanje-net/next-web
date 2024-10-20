import {
  FindActivityRoutesInput,
  MyActivityRoutesDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import AscentList from "./components/acent-list/ascent-list";
import { AscentsProvider } from "./components/ascents-context";
import ActionsRow from "./components/actions-row/actions-row";

type TSearchParams = {
  page: string;
};

type TClimbingLogPageProps = {
  searchParams: TSearchParams;
};

async function ClimbingLogPage({ searchParams }: TClimbingLogPageProps) {
  const pageNumber = parseInt(searchParams.page) || 1;

  const {
    data: { myActivityRoutes },
  } = await urqlServer().query(MyActivityRoutesDocument, {
    input: {
      pageSize: 8,
      pageNumber,
      orderBy: {
        field: "date",
        direction: "DESC",
      },
    },
  });

  return (
    <AscentsProvider>
      <ActionsRow />
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
