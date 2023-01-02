import { Route } from "../../graphql/generated";
import Grade from "../grade";
import IconStarEmpty from "../ui/icons/star-empty";
import IconStarFull from "../ui/icons/star-full";

interface Props {
  route: Route;
}

function RouteDifficulty({ route }: Props) {
  return (
    <>
      {route.isProject && "P"}
      {route.difficulty && <Grade difficulty={route.difficulty} />}
    </>
  );
}

export default RouteDifficulty;
