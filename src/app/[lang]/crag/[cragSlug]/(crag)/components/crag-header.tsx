import { Crag } from "@/graphql/generated";
import CragTabMenu from "./crag-header/crag-tab-menu";
import ContentHeader from "@/components/content-header";
import Breadcrumbs from "@/components/breadcrumbs";

type CragHeaderProps = {
  crag: Crag;
};

function CragHeader({ crag }: CragHeaderProps) {
  const crumbs = [
    {
      label: "Plezanje.net",
      link: "/",
    },
    {
      label: "Plezališča",
      link: `/plezalisca?country=${crag.country.slug}`,
    },
    {
      label: crag.name,
      link: null,
    },
  ];

  return (
    <ContentHeader
      breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      heading={crag.name}
      tabMenu={<CragTabMenu crag={crag} />}
    />
  );
}

export default CragHeader;
