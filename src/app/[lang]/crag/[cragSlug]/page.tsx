import { gql } from "@urql/core";
import Link from "../../../../components/ui/link";
import { Crag, CragSectorsDocument } from "../../../../graphql/generated";
import urqlServer from "../../../../graphql/urql-server";
import CragRoutes from "../../../../components/crag/crag-routes";
import Client from "../../../../components/client";

type Params = {
  cragSlug: string;
};

async function CragPage({ params }: { params: Params }) {
  const { data } = await urqlServer().query(CragSectorsDocument, {
    crag: params.cragSlug,
  });

  const crag = data.cragBySlug as Crag;

  return (
    <>
      <Client>
        <CragRoutes crag={crag} />
      </Client>
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
          }
        }
        bouldersOnly
      }
    }
  }
`;

export default CragPage;
