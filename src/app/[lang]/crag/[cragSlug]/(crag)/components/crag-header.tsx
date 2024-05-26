import { Crag } from "@/graphql/generated";
import {
  Breadcrumb,
  Breadcrumbs,
} from "../../../../../../components/breadcrumbs";
import CragTabMenu from "./crag-header/crag-tab-menu";

interface Props {
  crag: Crag;
}

function CragHeader({ crag }: Props) {
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

  return (
    <>
      <div className="bg-neutral-100">
        <div className="mx-auto px-4 2xl:container xs:px-8">
          <div className="pt-4">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="pb-8 pt-12 text-3xl">{crag.name}</h1>
          </div>
        </div>
        <CragTabMenu crag={crag} />
      </div>
    </>
  );
}

export default CragHeader;
