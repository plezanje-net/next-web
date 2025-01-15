import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import TabMenu from "@/components/ui/tab-menu";
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

  return (
    <>
      <ContentHeader
        heading={`Urejanje sektorjev v plezališču ${crag.name}`}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: "Plezališča", link: null },
              {
                label: crag.name,
                link: `/urejanje/plezalisca/${cragSlug}/uredi`,
              },
              { label: "Sektorji", link: null },
            ]}
          />
        }
        tabMenu={
          <TabMenu
            items={[
              {
                label: "Osnovni podatki",
                link: `/urejanje/plezalisca/${cragSlug}/uredi`,
                isActive: false,
                icon: <IconInfo />,
              },
              {
                label: "Sektorji in smeri",
                link: `/urejanje/plezalisca/${cragSlug}/sektorji`,
                isActive: true,
                icon: <IconRoutes />,
              },
            ]}
          />
        }
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
        __typename
        id
        name
        label
        position
        publishStatus
        user {
          id
          fullName
        }
        routes {
          id
        }
        crag {
          id
          publishStatus
        }
      }
    }
  }
`;
