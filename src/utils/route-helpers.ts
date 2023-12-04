import {
  AppRouterInstance,
  NavigateOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { NextRouter } from "next/router";

interface Options {
  shallow?: boolean;
  scroll?: boolean;
}

// TODO: move somewhere else
function toggleQueryParam(
  router: AppRouterInstance,
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  routeParam: string,
  newValue: string | string[] | undefined | null,
  options?: NavigateOptions
) {
  const newQuery: Record<string, string | string[] | undefined> = {};

  searchParams.forEach((value, param) => {
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

  const newParams: string[] = [];

  Object.entries(newQuery).forEach(([param, values]) => {
    if (typeof values == "string") {
      newParams.push(`${param}=${values}`);
    } else {
      values?.forEach((value) => {
        newParams.push(`${param}=${value}`);
      });
    }
  });
  router.push(`${pathname}?${newParams.join("&")}`, options);
}

export { toggleQueryParam };
