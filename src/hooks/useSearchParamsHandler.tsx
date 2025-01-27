import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TSearchParams = Record<string, string | string[] | null | undefined>;

type TAdvancedSearchParams = {
  updateSearchParams: (updateParams: TSearchParams) => void;
};

function useSearchParamsHandler(): TAdvancedSearchParams {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function updateSearchParams(updateParams: TSearchParams) {
    const newQuery: Record<string, string | string[] | undefined> = {};

    searchParams.forEach((value, param) => {
      if (updateParams[param] === undefined || updateParams[param] !== null) {
        newQuery[param] = value;
        return;
      }
    });

    Object.entries(updateParams).forEach(([param, value]) => {
      if (value !== null) {
        newQuery[param] = value;
      }
    });

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
    router.push(`${pathname}?${newParams.join("&")}`);
  }

  return {
    updateSearchParams,
  };
}

export default useSearchParamsHandler;
