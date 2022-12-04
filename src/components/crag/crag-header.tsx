import { gql, useQuery } from "urql";
import { Crag, CragHeaderDocument } from "../../graphql/generated";
import { Breadcrumb, Breadcrumbs } from "../layout/breadcrumbs";
import Spinner from "../ui/spinner";
import TabMenu, { TabMenuItem } from "../ui/tab-menu";

interface Props {
  cragSlug: string;
  activeTab: string;
}

function CragHeader({ cragSlug, activeTab }: Props) {
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
      isActive: activeTab === "info",
    },
    {
      label: "Smeri",
      link: `/plezalisce/${crag.slug}`,
      isActive: activeTab === "routes",
    },
    {
      label: "Komentarji",
      link: `/plezalisce/${crag.slug}/komentarji`,
      isActive: activeTab === "comments",
    },
    {
      label: "Galerija",
      link: `/plezalisce/${crag.slug}/galerija`,
      isActive: activeTab === "gallery",
    },
  ];

  return (
    <>
      <div className="bg-neutral-100">
        <div className="container mx-auto px-8">
          <div className="pt-4">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="pt-12 pb-8 text-3xl">{crag.name}</h1>
          </div>
        </div>
        <TabMenu items={menuItems}></TabMenu>
      </div>
    </>
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
