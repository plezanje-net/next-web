import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery } from "urql";
import { CountryBySlugWithCragsDocument } from "../../graphql/generated";

type Params = {
  countrySlug: string;
};

function Crags() {
  const { query } = useRouter();
  const [result] = useQuery({
    query: CountryBySlugWithCragsDocument,
    variables: {
      country: (query as Params).countrySlug,
      input: { type: "sport" },
    },
  });
  const { data, fetching, error } = result;

  if (error) {
    return <>Error</>;
  }

  if (fetching) return <>Loading</>;

  return (
    <>
      <h1 className="text-3xl font-bold">
        Plezalisca - {data?.countryBySlug?.name}
      </h1>
      <div>
        {data?.countryBySlug.crags.map((crag: any) => (
          <div key={crag.id}>
            <Link href={`/plezalisce/${crag.slug}`}>{crag.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
}

gql`
  query CountryBySlugWithCrags($country: String!, $input: FindCragsInput) {
    countryBySlug(slug: $country) {
      id
      name
      slug
      code
      crags(input: $input) {
        id
        slug
        name
        nrRoutes
        orientation
        lon
        lat
        minDifficulty
        maxDifficulty
        defaultGradingSystem {
          id
        }
      }
      areas(hasCrags: true) {
        id
        name
        slug
      }
    }
  }
`;

export default Crags;
