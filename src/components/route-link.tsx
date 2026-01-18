import { Crag, Route } from "@/graphql/generated";
import Link from "./ui/link";

type TCrag = Pick<Crag, "slug">;
type TRoute = Pick<Route, "slug" | "name"> & { crag: TCrag };

type TRouteLinkProps = {
  route: TRoute;
  crag?: TCrag;
  className?: string;
};

function RouteLink({ route, crag, className }: TRouteLinkProps) {
  const routeCrag = crag ?? route.crag;
  return (
    <Link
      className={className}
      href={`/plezalisce/${routeCrag.slug}/smer/${route.slug}`}
      variant="secondary"
    >
      {route.name}
    </Link>
  );
}

export default RouteLink;
