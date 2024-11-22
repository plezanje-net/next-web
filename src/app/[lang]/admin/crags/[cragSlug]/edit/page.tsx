import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import IconInfo from "@/components/ui/icons/info";
import IconRoutes from "@/components/ui/icons/routes";
import TabMenu from "@/components/ui/tab-menu";
import {
  EditCragPageCountriesDocument,
  EditCragPageCragDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { gql } from "urql";
import EditCragForm from "./components/edit-crag-form";

type TEditCragPageProps = {
  params: { cragSlug: string };
};

async function EditCragPage({ params: { cragSlug } }: TEditCragPageProps) {
  const countriesDataPromise = urqlServer().query(
    EditCragPageCountriesDocument,
    {}
  );
  const cragDataPromise = urqlServer().query(EditCragPageCragDocument, {
    cragSlug: cragSlug,
  });
  const [{ data: countriesData }, { data: cragData }] = await Promise.all([
    countriesDataPromise,
    cragDataPromise,
  ]);

  const crag = cragData.cragBySlug;

  return (
    <>
      <ContentHeader
        heading={`Urejanje plezališča ${crag.name}`}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: "Plezališča", link: null },
              { label: crag.name, link: null },
            ]}
          />
        }
        tabMenu={
          <TabMenu
            items={[
              {
                label: "Osnovni podatki",
                link: `/urejanje/plezalisca/${cragSlug}/uredi`,
                isActive: true,
                icon: <IconInfo />,
              },
              {
                label: "Sektorji in smeri",
                link: `/urejanje/plezalisca/${cragSlug}/sektorji`,
                isActive: false,
                icon: <IconRoutes />,
              },
            ]}
          />
        }
      />

      <EditCragForm countriesWithAreas={countriesData.countries} crag={crag} />
    </>
  );
}

export default EditCragPage;

gql`
  query EditCragPageCountries {
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

gql`
  query EditCragPageCrag($cragSlug: String!) {
    cragBySlug(slug: $cragSlug) {
      id
      slug
      name
      country {
        id
      }
      area {
        id
      }
      type
      defaultGradingSystem {
        id
      }
      lat
      lon
      description
      wallAngles
      rainproof
      orientations
      seasons
      approachTime
      access
      isHidden
      coverImage {
        id
        path
        extension
        maxIntrinsicWidth
        aspectRatio
      }
    }
  }
`;
