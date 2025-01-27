import Breadcrumbs from "@/components/breadcrumbs";
import ClimbingLogTabMenu from "./components/climbing-log-tab-menu";

interface Params {
  cragSlug: string;
}

interface Props {
  children: React.ReactNode;
  params: Params;
}

async function CragLayout({ children, params: { cragSlug } }: Props) {
  const crumbs = [
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
            <Breadcrumbs crumbs={crumbs} />
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
