"use client";
import { gql, useQuery } from "urql";
import { Crag, CragHeaderDocument } from "../../graphql/generated";
import { Breadcrumb, Breadcrumbs } from "../layout/breadcrumbs";
import IconComment from "../ui/icons/comment";
import IconGallery from "../ui/icons/gallery";
import IconInfo from "../ui/icons/info";
import IconRoutes from "../ui/icons/routes";
import Spinner from "../ui/spinner";
import TabMenu, { TabMenuItem } from "../ui/tab-menu";
import { useParams } from "next/navigation";
import { useI18nPathname } from "../../utils/hooks/use-i18n-pathname";

interface Props {
  cragSlug: string;
  activeTab: string;
}

function CragHeader() {
  const { cragSlug } = useParams();

  const i18nPathname = useI18nPathname();
  const [result] = useQuery({
    query: CragHeaderDocument,
    variables: {
      crag: cragSlug,
    },
  });

  const { data, fetching, error } = result;

  if (fetching)
    return (
      <div className="bg-neutral-100">
        <div className="container mx-auto px-8">
          <Spinner />
        </div>
      </div>
    );

  if (!data || error) {
    return <>Error</>;
  }

  const crag = data.cragBySlug as Crag;

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "Plezanje.net",
      link: "/",
    },
    {
      label: "Plezališča",
      link: `/plezalisca/${crag.country.slug}`,
    },
    {
      label: crag.name,
      link: `/plezalisce/${crag.slug}`,
    },
  ];

  const menuItems: TabMenuItem[] = [
    {
      label: "Info",
      link: `/plezalisce/${crag.slug}/info`,
      isActive: i18nPathname.test([`/{crag}/${cragSlug}/{info}`]),
      icon: <IconInfo />,
    },
    {
      label: "Smeri",
      link: `/plezalisce/${crag.slug}`,
      isActive: i18nPathname.test([`/{crag}/${cragSlug}`]),
      icon: <IconRoutes />,
    },
    {
      label: "Komentarji",
      link: `/plezalisce/${crag.slug}/komentarji`,
      isActive: i18nPathname.test([`/{crag}/${cragSlug}/{comments}`]),
      icon: <IconComment />,
    },
    {
      label: "Galerija",
      link: `/plezalisce/${crag.slug}/galerija`,
      isActive: i18nPathname.test([`/{crag}/${cragSlug}/{gallery}`]),
      icon: <IconGallery />,
    },
  ];

  return (
    <div className="bg-neutral-100">
      <div className="container mx-auto px-8">
        <div className="pt-4">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="pb-8 pt-12 text-3xl">{crag.name}</h1>
        </div>
      </div>
      <TabMenu items={menuItems}></TabMenu>
    </div>
  );
}

gql`
  query CragHeader($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      status
      name
      publishStatus
      country {
        id
        name
        slug
      }
      user {
        id
      }
    }
  }
`;

export default CragHeader;
