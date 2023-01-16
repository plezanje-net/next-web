import { NextRouter } from "next/router";
// TODO: move somewhere else
function toggleQueryParam(
  router: NextRouter,
  routeParam: string,
  newValue: string | null
) {
  let pathname = router.pathname;
  const newQuery: Record<string, string> = {};

  Object.entries(router.query).forEach(([param, value]) => {
    if (pathname.includes(`[${param}]`)) {
      pathname = pathname.replace(`[${param}]`, `${value}`);
      return;
    }
    if (param != routeParam) {
      newQuery[param] = `${value}`;
      return;
    }
    if (newValue != null) {
      newQuery[param] = `${newValue}`;
    }
  });

  if (newValue != null) {
    newQuery[routeParam] = `${newValue}`;
  }

  router.push({
    pathname,
    query: newQuery,
  });
}

export { toggleQueryParam };
