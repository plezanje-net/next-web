import { gql } from "@urql/core";
import { Crag, CragSectorsDocument } from "../../../../graphql/generated";
import urqlServer from "../../../../graphql/urql-server";
import CragRoutes from "../../../../components/crag/crag-routes";

type Params = {
  cragSlug: string;
};

type Props = {
  params: Params;
};

async function CragPage({ params }: Props) {
  const { data } = await urqlServer().query(CragSectorsDocument, {
    crag: params.cragSlug,
  });

  const crag = data.cragBySlug as Crag;
  return (
    <>
      <CragRoutes crag={crag} />
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
          sector {
            position
            label
            name
          }
        }
        bouldersOnly
      }
    }
  }
`;

export default CragPage;
