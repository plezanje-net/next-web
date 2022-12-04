import { useRouter } from "next/router";
import { gql, useQuery } from "urql";
import CragHeader from "../../components/crag/crag-header";
import Accordion from "../../components/ui/accordion";
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
      <div className="container mx-auto mt-4 px-8">
        {data.cragBySlug.sectors.map((sector, index) => (
          <div
            key={sector.id}
            className={`${index > 0 && "border-t border-t-neutral-200"}`}
          >
            <Accordion
              label={[sector.label, sector.name]
                .filter((part) => part != "")
                .join(" - ")}
              isOpen={false}
            >
              rutas
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
}

gql`
  query CragSectors($crag: String!) {
    cragBySlug(slug: $crag) {
      id
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
