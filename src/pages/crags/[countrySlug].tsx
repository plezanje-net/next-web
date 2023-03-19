import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery } from "urql";
import CragLink from "../../components/crag-link";
import {
  Breadcrumbs,
  BreadcrumbsProps,
} from "../../components/layout/breadcrumbs";
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

  let breadcrumbsProps: BreadcrumbsProps = { items: [] };
  if (data?.countryBySlug) {
    breadcrumbsProps.items = [
      {
        label: "Plezanje.net",
        link: "/",
      },
      {
        label: "Plezališča",
        link: `/plezalisca/${query.countrySlug}`,
      },
      {
        label: data.countryBySlug.name,
        link: `/plezalisca/${query.countrySlug}`,
      },
    ];
  }

  return (
    <>
      <Breadcrumbs {...breadcrumbsProps} />
      <h1 className="text-3xl font-medium">
        Plezalisca - {data?.countryBySlug?.name}
      </h1>
      <div>
        {data?.countryBySlug.crags.map((crag: any) => (
          <div key={crag.id}>
            <CragLink crag={crag} />
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
