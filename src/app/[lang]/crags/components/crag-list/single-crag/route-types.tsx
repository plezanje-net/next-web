type TRouteTypesProps = {
  hasSport: boolean;
  hasBoulder: boolean;
  hasMultipitch: boolean;
};

function RouteTypes({ hasSport, hasBoulder, hasMultipitch }: TRouteTypesProps) {
  const routeTypes = [];
  hasSport && routeTypes.push("športno plezanje");
  hasBoulder && routeTypes.push("balvani");
  hasMultipitch && routeTypes.push("večraztežajne");

  return routeTypes.join(" in ");
}

export default RouteTypes;
