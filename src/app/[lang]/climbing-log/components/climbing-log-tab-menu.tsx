"use client";

import { Crag } from "@/graphql/generated";
import { useI18nPathname } from "@/hooks/use-i18n-pathname";
import TabMenu, { TTabMenuItem } from "@/components/ui/tab-menu";
import IconCalendar from "@/components/ui/icons/calendar";
import IconAscents from "@/components/ui/icons/ascents";
import IconStatistics from "@/components/ui/icons/statistics";

function ClimbingLogTabMenu() {
  const i18nPathname = useI18nPathname();

  const menuItems: TTabMenuItem[] = [
    {
      label: "Koledar",
      link: `/plezalni-dnevnik/koledar`,
      isActive: i18nPathname.test(['/{climbing-log}/{calendar}']),
      icon: <IconCalendar />,
    },
    {
      label: "Vzponi",
      link: `/plezalni-dnevnik/vzponi`,
      isActive: i18nPathname.test(['/{climbing-log}/{ascents}']),
      icon: <IconAscents />,
    },
    {
      label: "Statistika",
      link: `/plezalni-dnevnik/statistika`,
      isActive: i18nPathname.test(['/{climbing-log}/{statistics}']),
      icon: <IconStatistics />,
    },
  ];

  return <TabMenu items={menuItems}></TabMenu>;
}

export default ClimbingLogTabMenu;
