import { Crag, Route } from "@/graphql/generated";
import Link from "./ui/link";

type TCrag = Pick<Crag, "slug">;
type TRoute = Pick<Route, "slug" | "name" | "publishStatus"> & { crag: TCrag };

type TRouteLinkProps = {
  route: TRoute;
  crag?: TCrag;
  className?: string;
};

function RouteLink({ route, crag, className }: TRouteLinkProps) {
  const routeCrag = crag ?? route.crag;

  const linkStatus =
    route.publishStatus === "draft"
      ? "draft"
      : route.publishStatus === "in_review"
        ? "in_review"
        : "default";

  return (
    <Link
      className={className}
      status={linkStatus}
      variant="secondary"
      href={`/plezalisce/${routeCrag.slug}/smer/${route.slug}`}
    >
      {route.name}
    </Link>
  );
}

export default RouteLink;
