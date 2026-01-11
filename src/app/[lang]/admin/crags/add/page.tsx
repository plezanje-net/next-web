import { NewCragPageCountriesDocument } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import NewCragForm from "./components/new-crag-form";
import TabMenu from "@/components/ui/tab-menu";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import ContentHeader from "@/components/content-header";
import Breadcrumbs from "@/components/breadcrumbs";

async function NewCragPage() {
  const countriesDataPromise = urqlServer().query(
    NewCragPageCountriesDocument,
    {}
  );
  const {
    data: { countries },
  } = await countriesDataPromise;

  return (
    <>
      <ContentHeader
        heading="Dodajanje plezališča"
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: "Plezališča", link: null },
              { label: "Dodajanje", link: null },
            ]}
          />
        }
        tabMenu={
          <TabMenu
            items={[
              {
                label: "Osnovni podatki",
                link: "/urejanje/plezalisca/dodaj",
                isActive: true,
                icon: <IconInfo />,
              },
              {
                label: "Sektorji in smeri",
                isDisabled: true,
                link: "",
                isActive: false,
                icon: <IconRoutes />,
              },
            ]}
          />
        }
      />
      <NewCragForm countriesWithAreas={countries} />
    </>
  );
}

export default NewCragPage;

gql`
  query NewCragPageCountries {
    countries {
      id
      name
      slug
      areas {
        id
        name
        slug
      }
    }
  }
`;
