import { gql } from "graphql-request";
import urqlServer from "@/graphql/urql-server";
import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import TabMenu from "@/components/ui/tab-menu";
import { Crag, EditSectorsPageCragDocument } from "@/graphql/generated";
import EditSectors from "./components/edit-sectors";
import { gqlRequest } from "@/lib/gql-request";

type TEditSectorsPageProps = {
  params: Promise<{ cragSlug: string }>;
};

async function EditSectorsPage(props: TEditSectorsPageProps) {
  const params = await props.params;

  const { cragSlug } = params;

  const cragDataPromise = gqlRequest(EditSectorsPageCragDocument, {
    cragSlug: cragSlug,
  });
  const { data: cragData } = await cragDataPromise;
  const crag = cragData.cragBySlug as Crag;

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
      publishStatus
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
