import { Crag, CragHeaderDocument } from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";
import { Breadcrumbs, Breadcrumb } from "@/components/breadcrumbs";
import ClimbingLogTabMenu from "./components/climbing-log-tab-menu";

interface Params {
  cragSlug: string;
}

interface Props {
  children: React.ReactNode;
  params: Params;
}

async function CragLayout({ children, params: { cragSlug } }: Props) {

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "Plezanje.net",
      link: "/",
    },
    {
      label: "Plezalni dnevnik",
      link: `/plezalni dnevnik`,
    },
  ];
  return (
    <>
      <div className="bg-neutral-100">
        <div className="mx-auto px-4 2xl:container xs:px-8">
          <div className="pt-4">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="pb-8 pt-12 text-3xl">Plezalni dnevnik</h1>
          </div>
        </div>
        <ClimbingLogTabMenu />
      </div>
      <div>{children}</div>
    </>
  );
}

export default CragLayout;