import { Crag, Route } from "../graphql/generated";
import Link from "./ui/link";

type Props = {
  route: Route;
  crag?: Crag;
};

function RouteLink({ route, crag }: Props) {
  const routeCrag = crag ?? route.crag;
  return (
    <Link
      href={`/plezalisce/${routeCrag.slug}/smer/${route.slug}`}
      variant="secondary"
    >
      {route.name}
    </Link>
  );
}

export default RouteLink;
