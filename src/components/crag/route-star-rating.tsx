import { Route } from "../../graphql/generated";
import IconStarEmpty from "../ui/icons/star-empty";
import IconStarFull from "../ui/icons/star-full";

interface Props {
  route: Route;
}

function RouteStarRating({ route }: Props) {
  return (
    <>
      {route.starRating == 2 && <IconStarFull />}
      {route.starRating == 1 && <IconStarEmpty />}
    </>
  );
}

export default RouteStarRating;
