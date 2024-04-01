type TRouteTypesProps = {
  hasSport: boolean;
  hasBoulder: boolean;
  hasMultipitch: boolean;
};

function routeTypes({ hasSport, hasBoulder, hasMultipitch }: TRouteTypesProps) {
  const routeTypes = [];
  hasSport && routeTypes.push("športno plezanje");
  hasBoulder && routeTypes.push("balvani");
  hasMultipitch && routeTypes.push("večraztežajne");

  return routeTypes.join(" in ");
}

export default routeTypes;
