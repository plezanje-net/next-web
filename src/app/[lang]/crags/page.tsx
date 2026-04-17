import { AllCountriesDocument, AllCragsDocument } from "@/graphql/generated";
import { CragsProvider } from "./lib/crags-context";
import Crags from "./components/crags";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

async function CragsPage() {
  const cragsDataPromise = gqlRequest(AllCragsDocument, {});
  const countriesDataPromise = gqlRequest(AllCountriesDocument, {});
  const [{ data: cragsData }, { data: countriesData }] = await Promise.all([
    cragsDataPromise,
    countriesDataPromise,
  ]);

  return (
    <CragsProvider
      allCrags={cragsData.crags}
      allCountries={countriesData.countries}
    >
      <Crags />
    </CragsProvider>
  );
}

export default CragsPage;

gql`
  query AllCrags {
    crags(input: { type: "sport" }) {
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
      publishStatus
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
