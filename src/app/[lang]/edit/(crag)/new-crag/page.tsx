import { Country, NewCragPageCountriesDocument } from "@/graphql/generated";
import NewCragForm from "./components/new-crag-form";
import TabMenu, { TTabMenuItem } from "@/components/ui/tab-menu";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import ContentHeader from "@/components/content-header";
import Breadcrumbs from "@/components/breadcrumbs";
import { gqlRequest } from "@/lib/graphql-client";

async function NewCragPage() {
  const { countries } = await gqlRequest(NewCragPageCountriesDocument, {});

  const tabMenuItems: TTabMenuItem[] = [
    {
      label: "Osnovni podatki",
      link: "/edit/new-crag",
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
  ];

  return (
    <>
      <ContentHeader
        heading="Dodajanje plezališča"
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: "Novo plezališče", link: null },
            ]}
          />
        }
        tabMenu={<TabMenu items={tabMenuItems} />}
      />
      <NewCragForm countriesWithAreas={countries as Country[]} />
    </>
  );
}

export default NewCragPage;
