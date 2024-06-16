import { PublishType } from "@/graphql/generated";
import LogRoute from "./log-route";
import { TLogRoute, useLogRoutesContext } from "./log-routes-context";

function LogRoutes() {
  const { logRoutes, setLogRoutes, setRoutePublishType } =
    useLogRoutesContext();

  const handleRepositionRoute = (routeIndex: number, direction: number) => {
    if (
      (direction == -1 && routeIndex == 0) ||
      (direction == 1 && routeIndex == logRoutes.length - 1)
    ) {
      return;
    }

    const tempRoutes = [...logRoutes];
    tempRoutes[routeIndex] = logRoutes[routeIndex + direction];
    tempRoutes[routeIndex + direction] = logRoutes[routeIndex];
    setLogRoutes(tempRoutes);
  };

  const handleDeleteRoute = (routeIndex: number) => {
    // setLogRoutes(logRoutes.toSpliced(routeIndex, 1)); // es2023
    const tempRoutes = [...logRoutes];
    tempRoutes.splice(routeIndex, 1);
    setLogRoutes(tempRoutes);
  };

  const handleDuplicateRoute = (routeIndex: number) => {
    const tempRoutes = [...logRoutes];
    const routeClone = { ...logRoutes[routeIndex] };
    routeClone.key = generateUniqueKey(routeClone.id, logRoutes);
    tempRoutes.splice(routeIndex + 1, 0, routeClone);
    setLogRoutes(tempRoutes);
    setRoutePublishType(routeClone.key, PublishType.Public);
  };

  const generateUniqueKey = (id: string, logRoutes: TLogRoute[]) => {
    let counter = 1;
    let newKey = `${id}-${counter}`;
    while (logRoutes.some((route) => route.key == newKey)) {
      counter++;
      newKey = `${id}-${counter}`;
    }
    return newKey;
  };

  return (
    <div className="-mx-4 xs:mx-0">
      {logRoutes.map((logRoute, index) => (
        <div className="mt-1 first:mt-0" key={logRoute.key}>
          <LogRoute
            first={index == 0}
            route={logRoute}
            last={index == logRoutes.length - 1}
            onUpClick={() => {
              handleRepositionRoute(index, -1);
            }}
            onDownClick={() => {
              handleRepositionRoute(index, 1);
            }}
            onDuplicateClick={() => {
              handleDuplicateRoute(index);
            }}
            onDeleteClick={() => {
              handleDeleteRoute(index);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default LogRoutes;
