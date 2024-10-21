import { Crag } from "@/graphql/generated";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import CragTabMenu from "./crag-header/crag-tab-menu";
import ContentHeader from "@/components/content-header";

type CragHeaderProps = {
  crag: Crag;
};

function CragHeader({ crag }: CragHeaderProps) {
  const breadcrumbs: Breadcrumb[] = [
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
      link: `/plezalisce/${crag.slug}`,
    },
  ];

  return (
    <ContentHeader
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      heading={crag.name}
      tabMenu={<CragTabMenu crag={crag} />}
    />
  );
}

export default CragHeader;
