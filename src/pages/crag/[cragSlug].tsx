import { useRouter } from "next/router";
import { gql, useQuery } from "urql";
import CragHeader from "../../components/crag/crag-header";
import CragTable from "../../components/crag/crag-table";
import Spinner from "../../components/ui/spinner";
import { Crag, CragSectorsDocument } from "../../graphql/generated";

type Params = {
  cragSlug: string;
};

function CragRoutes() {
  const { query } = useRouter();
  const cragSlug = (query as Params).cragSlug;

  const header = <CragHeader cragSlug={cragSlug} activeTab="routes" />;

  const [result] = useQuery({
    query: CragSectorsDocument,
    variables: {
      crag: cragSlug,
    },
  });

  const { data, fetching, error } = result;

  if (fetching)
    return (
      <>
        {header}
        <Spinner />
      </>
    );

  if (!data || error) {
    return <>Error</>;
  }

  return (
    <>
      {header}
      <CragTable crag={data.cragBySlug as Crag} />
    </>
  );
}

gql`
  query CragSectors($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      sectors {
        id
        name
        label
        publishStatus
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
        }
        bouldersOnly
      }
    }
  }
`;

export default CragRoutes;