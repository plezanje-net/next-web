import LogRoute from "./log-route";
import { TLogRoute, useLogRoutesContext } from "./log-routes-context";

function LogRoutes() {
  const { logRoutes, setLogRoutes } = useLogRoutesContext();

  const handleRepositionRoute = (routeIndex: number, direction: number) => {
    if (
      (direction == -1 && routeIndex == 0) ||
      (direction == 1 && routeIndex == logRoutes.length - 1)
    ) {
      return;
    }

    setLogRoutes((lrs) => {
      const newLogRoutes = [...lrs];
      newLogRoutes[routeIndex] = lrs[routeIndex + direction];
      newLogRoutes[routeIndex + direction] = lrs[routeIndex];
      return newLogRoutes;
    });
  };

  const handleDeleteRoute = (routeIndex: number) => {
    setLogRoutes((lrs) => {
      const newLogRoutes = [...lrs];
      newLogRoutes.splice(routeIndex, 1);
      return newLogRoutes;
    });
  };

  const handleDuplicateRoute = (routeIndex: number) => {
    setLogRoutes((lrs) => {
      const newLogRoutes = [...lrs];
      const routeClone = {
        ...lrs[routeIndex],
        logFormData: {
          ...lrs[routeIndex].logFormData,
        },
      };

      routeClone.key = generateUniqueKey(routeClone.id, lrs);
      newLogRoutes.splice(routeIndex + 1, 0, routeClone);

      return newLogRoutes;
    });
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
