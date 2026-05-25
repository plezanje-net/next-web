"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import { useI18nPathname } from "@/hooks/use-i18n-pathname";
import { capitalizeFirstLetter } from "@/lib/text-helpers";
import dayjs from "dayjs";
import locale from "dayjs/locale/sl";

function ClimbingLogBreadcrumbs() {
  const i18nPathname = useI18nPathname();
  const crumbs = [
    {
      label: "Plezanje.net",
      link: "/",
    },
    {
      label: "Plezalni dnevnik",
      link: `/plezalni-dnevnik`,
    },
  ];

  if (i18nPathname.test(["/{climbing-log}/{calendar}*"])) {
    crumbs.push({
      label: "Koledar",
      link: `/plezalni-dnevnik/koledar`,
    });
  }

  dayjs.locale(locale);

  if (i18nPathname.test(["/{climbing-log}/{calendar}/*"])) {
    const date = i18nPathname.pathname.split("/").pop();

    const dateString =
      capitalizeFirstLetter(dayjs(date).format("dddd, D. ")) +
      capitalizeFirstLetter(dayjs(date).format("MMMM YYYY"));

    crumbs.push({
      label: dateString,
      link: `/plezalni-dnevnik/koledar/${date}`,
    });
  }

  return <Breadcrumbs crumbs={crumbs} />;
}

export default ClimbingLogBreadcrumbs;
