import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import TabMenu from "@/components/ui/tab-menu";
import { EditRoutesPageSectorDocument, Route } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import EditRoutes from "./components/edit-routes";

type TEditRoutesPageProps = {
  params: { sectorId: string };
};

// TODO: rework be to enable getting sector by slug?
async function EditRoutesPage({ params: { sectorId } }: TEditRoutesPageProps) {
  const sectorDataPromise = urqlServer().query(EditRoutesPageSectorDocument, {
    id: sectorId,
  });
  const { data: sectorData } = await sectorDataPromise;
  const sector = sectorData.sector;

  // Dep.: sector label is deprecated. remove it after it is migrated into name on be.
  return (
    <>
      <ContentHeader
        heading={`Urejanje smeri v sektorju ${sector.label} - ${sector.name}`}
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
              { label: `${sector.label} - ${sector.name}`, link: null },
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
        sectorId={sector.id}
        cragSlug={sector.crag.slug}
        sectors={sector.crag.sectors}
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
        #   country {
        #     name
        #     id
        #     slug
        #   }
        #   defaultGradingSystem {
        #     id
        #   }
        sectors {
          id
          label
          name
          #     routes {
          #       id
          #       name
          #       difficulty
          #       defaultGradingSystem {
          #         id
          #         name
          #       }
          #       publishStatus
          #       pitches {
          #         id
          #       }
          #     }
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
        # author
        # slug
        # publishStatus
        # isProject
        # created
        # sector {
        #   id
        #   publishStatus
        # }
        # difficulty
        # difficultyVotes {
        #   difficulty
        #   isBase
        # }
        # pitches {
        #   difficulty
        #   height
        #   id
        #   number
        # }
        # user {
        #   id
        # }
        # nrTries
      }
    }
  }
`;
