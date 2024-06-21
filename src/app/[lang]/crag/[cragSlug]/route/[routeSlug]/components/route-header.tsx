import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import { Route } from "@/graphql/generated";

type TRouteHeaderProps = {
  route: Route;
};

function RouteHeader({ route }: TRouteHeaderProps) {
  const breadcrumbs: Breadcrumb[] = [
    {
      label: "Plezanje.net",
      link: "/",
    },
    {
      label: "Plezališča",
      link: `/plezalisca?countries=${route.crag.country}&routeTypes=sport`,
    },
    {
      label: route.crag.name,
      link: `/plezalisce/${route.crag.slug}`,
    },
    {
      label: route.name,
      link: `/plezalisce/${route.crag.slug}/smer/${route.slug}`,
    },
  ];

  return (
    <div className="border-b border-b-neutral-200 bg-neutral-100">
      <div className="mx-auto px-4 2xl:container xs:px-8">
        <div className="py-4">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="pb-12 pt-12 text-3xl">{route.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default RouteHeader;
