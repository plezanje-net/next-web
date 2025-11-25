import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import TabMenu, { TTabMenuItem } from "@/components/ui/tab-menu";
import { Crag, EditSectorsPageCragDocument } from "@/graphql/generated";
import EditSectors from "./components/edit-sectors";
import { gqlRequest } from "@/lib/graphql-client";

type TEditSectorsPageProps = {
  params: Promise<{ cragSlug: string }>;
};

async function EditSectorsPage({ params }: TEditSectorsPageProps) {
  const { cragSlug } = await params;
  const { cragBySlug } = await gqlRequest(EditSectorsPageCragDocument, {
    cragSlug,
  });
  const crag = cragBySlug as Crag;

  const tabMenuItems: TTabMenuItem[] = [
    {
      label: "Osnovni podatki",
      link: `/edit/${cragSlug}`,
      isActive: false,
      icon: <IconInfo />,
    },
    {
      label: "Sektorji in smeri",
      link: `/edit/${cragSlug}/sectors`,
      isActive: true,
      icon: <IconRoutes />,
    },
  ];

  return (
    <>
      <ContentHeader
        heading={`Urejanje sektorjev v plezališču ${crag.name}`}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: crag.name, link: `/edit/${cragSlug}` },
              { label: "Sektorji", link: null },
            ]}
          />
        }
        tabMenu={<TabMenu items={tabMenuItems} />}
      />

      <EditSectors crag={crag} />
    </>
  );
}

export default EditSectorsPage;
