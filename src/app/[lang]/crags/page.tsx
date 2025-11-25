import {
  AllCountriesDocument,
  AllCragsDocument,
  Country,
  Crag,
} from "@/graphql/generated";
import { CragsProvider } from "./lib/crags-context";
import Crags from "./components/crags";
import { gqlRequest } from "@/lib/graphql-client";

async function CragsPage() {
  const cragsDataPromise = gqlRequest(AllCragsDocument, {});
  const countriesDataPromise = gqlRequest(AllCountriesDocument, {});
  const [{ crags }, { countries }] = await Promise.all([
    cragsDataPromise,
    countriesDataPromise,
  ]);

  return (
    <CragsProvider
      allCrags={crags as Crag[]}
      allCountries={countries as Country[]}
    >
      <Crags />
    </CragsProvider>
  );
}

export default CragsPage;
