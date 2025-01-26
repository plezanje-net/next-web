import { usePathname, useParams } from "next/navigation";
import * as rewrites from "../rewrites.json";

interface I18nPathname {
  test: (urlPart: string[]) => boolean;
}

interface Rewrites {
  routes: string[];
  translations: { [key: string]: { [key: string]: string } };
  defaultLanguage: string;
}

export function useI18nPathname(): I18nPathname {
  const pathname = usePathname();
  const params = useParams();
  const rewritesData: Rewrites = rewrites;
  const locale = (params?.lang as string) ?? "sl";

  const test = (urls: string[]): boolean => {
    return urls.some((url) => {
      const startsWith = url.endsWith("*");

      if (startsWith) {
        url = url.slice(0, -1);
      }

      if (locale !== rewritesData.defaultLanguage) {
        url = `/${locale}${url}`;
      }

      Object.entries(rewritesData.translations[locale]).forEach(
        ([from, to]) => {
          url = url.replace(`{${from}}`, to);
        }
      );

      return startsWith ? !!pathname?.startsWith(url) : pathname === url;
    });
  };

  return {
    test,
  };
}
