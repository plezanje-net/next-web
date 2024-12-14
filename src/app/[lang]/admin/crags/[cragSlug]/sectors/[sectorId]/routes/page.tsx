import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import TabMenu from "@/components/ui/tab-menu";
import { EditRoutesPageSectorDocument } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import EditRoutes from "./components/edit-routes";
import { labelAndNameToString } from "@/utils/sector-helpers";
import authStatus from "@/utils/auth/auth-status";

type TEditRoutesPageProps = {
  params: { sectorId: string };
};

async function EditRoutesPage({ params: { sectorId } }: TEditRoutesPageProps) {
  const { user: loggedInUser } = await authStatus();
  const loggedInUserIsEditor = !!loggedInUser?.roles.includes("admin");

  const sectorDataPromise = urqlServer().query(EditRoutesPageSectorDocument, {
    id: sectorId,
  });
  const { data: sectorData } = await sectorDataPromise;
  const sector = sectorData.sector;

  const noSectorsCrag =
    sector.crag.sectors.length === 1 &&
    sector.name === "" &&
    sector.label === "";

  // Dep: sector label is deprecated. remove it after it is migrated into name on be.
  return (
    <>
      <ContentHeader
        heading={`Urejanje smeri v ${noSectorsCrag ? `plezališču ${sector.crag.name}` : `sektorju ${labelAndNameToString(sector.label, sector.name)}`}`}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: "Plezališča", link: null },
              {
                label: sector.crag.name,
                link: `/urejanje/plezalisca/${sector.crag.slug}/uredi`,
              },
              {
                label: "Sektorji",
                link: `/urejanje/plezalisca/${sector.crag.slug}/sektorji`,
              },
              ...(noSectorsCrag
                ? []
                : [
                    {
                      label: labelAndNameToString(sector.label, sector.name),
                      link: null,
                    },
                  ]),
              { label: "Smeri", link: null },
            ]}
          />
        }
        tabMenu={
          <TabMenu
            items={[
              {
                label: "Osnovni podatki",
                link: `/urejanje/plezalisca/${sector.crag.slug}/uredi`,
                isActive: false,
                icon: <IconInfo />,
              },
              {
                label: "Sektorji in smeri",
                link: `/urejanje/plezalisca/${sector.crag.slug}/sektorji/${sector.id}/smeri`,
                isActive: true,
                icon: <IconRoutes />,
              },
            ]}
          />
        }
      />

      <EditRoutes
        routes={sector.routes}
        sector={sector}
        cragSlug={sector.crag.slug}
        allSectors={sector.crag.sectors}
        loggedInUserIsEditor={loggedInUserIsEditor}
      />
    </>
  );
}

export default EditRoutesPage;

gql`
  query EditRoutesPageSector($id: String!) {
    sector(id: $id) {
      id
      label
      name
      crag {
        id
        slug
        name
        sectors {
          id
          label
          name
        }
      }
      routes {
        id
        name
        routeType {
          id
        }
        difficulty
        defaultGradingSystem {
          id
        }
        length
        position
        created
        publishStatus
        user {
          fullName
        }
      }
    }
  }
`;
