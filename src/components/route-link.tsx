import { Crag, Route } from "@/graphql/generated";
import Link from "./ui/link";

type Props = {
  route: Route;
  crag?: Crag;
  className?: string;
};

function RouteLink({ route, crag, className }: Props) {
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
