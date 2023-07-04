import {
  Country,
  CountryBySlugWithCragsDocument,
} from "../../../../graphql/generated";
import {
  Breadcrumbs,
  BreadcrumbsProps,
} from "../../../../components/breadcrumbs";
import CragLink from "../../../../components/crag-link";

import { gql } from "@urql/core";
import urqlServer from "../../../../graphql/urql-server";

type Params = {
  countrySlug: string;
};

async function CragsPage({ params }: { params: Params }) {
  console.log("rendering CragsPage");
  const { data } = await urqlServer().query(CountryBySlugWithCragsDocument, {
    country: params.countrySlug,
    input: { type: "sport" },
  });

  const countryBySlug = data.countryBySlug as Country;

  let breadcrumbsProps: BreadcrumbsProps = { items: [] };
  if (countryBySlug) {
    breadcrumbsProps.items = [
      {
        label: "Plezanje.net",
        link: "/",
      },
      {
        label: "Plezališča",
        link: `/plezalisca/slovenija`,
      },
      {
        label: countryBySlug.name,
        link: `/plezalisca/slovenija`,
      },
    ];
  }

  return (
    <>
      <Breadcrumbs {...breadcrumbsProps} />
      <h1 className="text-3xl font-medium">
        Plezalisca - {countryBySlug.name} - {countryBySlug.crags.length}
      </h1>
      <div>
        {countryBySlug.crags.map((crag: any) => (
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

export default CragsPage;
