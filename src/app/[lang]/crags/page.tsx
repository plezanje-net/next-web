import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import { AllCountriesDocument, AllCragsDocument } from "@/graphql/generated";
import FilteredCrags from "./components/filtered-crags";

async function CragsPage() {
  const cragsDataPromise = urqlServer().query(AllCragsDocument, {});
  const countriesDataPromise = urqlServer().query(AllCountriesDocument, {});
  const [{ data: cragsData }, { data: countriesData }] = await Promise.all([
    cragsDataPromise,
    countriesDataPromise,
  ]);

  return (
    <FilteredCrags
      crags={cragsData.crags}
      countries={countriesData.countries}
    />
  );
}

export default CragsPage;

gql`
  query AllCrags {
    crags {
      id
      slug
      name
      country {
        id
        name
        slug
      }
      area {
        id
        name
        slug
        country {
          slug
        }
      }
      orientations
      minDifficulty
      maxDifficulty
      seasons
      rainproof
      wallAngles
      approachTime
      nrRoutesByGrade
      hasSport
      hasBoulder
      hasMultipitch
      nrRoutes
    }
  }
`;

gql`
  query AllCountries {
    countries {
      name
      slug
      nrCrags
      areas {
        name
        slug
        nrCrags
      }
    }
  }
`;
