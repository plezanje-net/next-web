import Link from "next/link";
import { Crag, Route } from "../graphql/generated";

type Props = {
  route: Route;
  crag?: Crag;
};

function RouteLink({ route, crag }: Props) {
  const routeCrag = crag ?? route.crag;
  return (
    <Link
      href={`/plezalisce/${routeCrag.slug}/smer/${route.slug}`}
      onClick={(e) => e.stopPropagation()}
    >
      {route.name}
    </Link>
  );
}

export default RouteLink;
