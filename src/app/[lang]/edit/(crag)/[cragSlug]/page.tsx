import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import TabMenu, { TTabMenuItem } from "@/components/ui/tab-menu";
import {
  Country,
  Crag,
  EditCragPageCountriesDocument,
  EditCragPageCragDocument,
} from "@/graphql/generated";
import EditCragForm from "./components/edit-crag-form";
import { gqlRequest } from "@/lib/graphql-client";

type TEditCragPageProps = {
  params: Promise<{ cragSlug: string }>;
};

async function EditCragPage({ params }: TEditCragPageProps) {
  const { cragSlug } = await params;
  const countriesDataPromise = gqlRequest(EditCragPageCountriesDocument, {});
  const cragDataPromise = gqlRequest(EditCragPageCragDocument, {
    cragSlug: cragSlug,
  });
  const [{ countries }, { cragBySlug }] = await Promise.all([
    countriesDataPromise,
    cragDataPromise,
  ]);

  const crag = cragBySlug as Crag;

  const tabMenuItems: TTabMenuItem[] = [
    {
      label: "Osnovni podatki",
      link: `/edit/${cragSlug}`,
      isActive: true,
      icon: <IconInfo />,
    },
    {
      label: "Sektorji in smeri",
      link: `/edit/${cragSlug}/sectors`,
      isActive: false,
      icon: <IconRoutes />,
    },
  ];

  return (
    <>
      <ContentHeader
        heading={`Urejanje plezališča ${crag.name}`}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: crag.name, link: null },
            ]}
          />
        }
        tabMenu={<TabMenu items={tabMenuItems} />}
      />

      <EditCragForm countriesWithAreas={countries as Country[]} crag={crag} />
    </>
  );
}

export default EditCragPage;
