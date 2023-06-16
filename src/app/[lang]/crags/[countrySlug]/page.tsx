import {
  Country,
  CountryBySlugWithCragsDocument,
} from "../../../../graphql/generated";
import {
  Breadcrumbs,
  BreadcrumbsProps,
} from "../../../../components/layout/breadcrumbs";
import CragLink from "../../../../components/crag-link";

import { gql } from "@urql/core";
import urqlServer from "../../../../graphql/urql-server";

type Params = {
  countrySlug: string;
};

async function CragsPage({ params }: { params: Params }) {
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
        Plezalisca - {countryBySlug.name}
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

// export default withUrqlClient(
//   (ssrExchange, ctx) => {
//     const token = "";
//     return {
//       url: `${process.env.NEXT_PUBLIC_API_URL}`,
//       fetchOptions: {
//         headers: {
//           authorization: token ? `Bearer ${token}` : "",
//         },
//       },
//       exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
//       suspense: true,
//     };
//   },
//   { ssr: true }
// )(CragsPage);
