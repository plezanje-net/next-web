import { NextRouter } from "next/router";

interface Options {
  shallow?: boolean;
  scroll?: boolean;
}

// TODO: move somewhere else
function toggleQueryParam(
  router: NextRouter,
  routeParam: string,
  newValue: string | string[] | undefined | null,
  options?: Options
) {
  let { pathname, asPath, query } = router;
  const newQuery: Record<string, string | string[] | undefined> = {};

  Object.entries(query).forEach(([param, value]) => {
    if (pathname.includes(`[${param}]`)) {
      return;
    }
    if (param != routeParam) {
      newQuery[param] = value;
      return;
    }
    if (newValue != null && newValue != undefined) {
      newQuery[param] = `${newValue}`;
    }
  });

  if (newValue != null) {
    newQuery[routeParam] = newValue;
  }

  router.push(
    {
      pathname: asPath.split("?")[0],
      query: newQuery,
    },
    undefined,
    options
  );
}

export { toggleQueryParam };
