import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import TabMenu, { TTabMenuItem } from "@/components/ui/tab-menu";
import { EditSectorsPageCragDocument } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import EditSectors from "./components/edit-sectors";

type TEditSectorsPageProps = {
  params: { cragSlug: string };
};

async function EditSectorsPage({
  params: { cragSlug },
}: TEditSectorsPageProps) {
  const cragDataPromise = urqlServer().query(EditSectorsPageCragDocument, {
    cragSlug: cragSlug,
  });
  const { data: cragData } = await cragDataPromise;
  const crag = cragData.cragBySlug;

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

  console.log(cragSlug);

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

// Dep: crag.label is deprecated. remove it after api is updated and labels migrated into name
gql`
  query EditSectorsPageCrag($cragSlug: String!) {
    cragBySlug(slug: $cragSlug) {
      id
      slug
      name
      sectors {
        id
        name
        label
      }
    }
  }
`;
