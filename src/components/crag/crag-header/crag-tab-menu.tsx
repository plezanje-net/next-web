"use client";

import { Crag } from "../../../graphql/generated";
import { useI18nPathname } from "../../../utils/hooks/use-i18n-pathname";
import IconComment from "../../ui/icons/comment";
import IconGallery from "../../ui/icons/gallery";
import IconInfo from "../../ui/icons/info";
import IconRoutes from "../../ui/icons/routes";
import TabMenu, { TabMenuItem } from "../../ui/tab-menu";

interface Props {
  crag: Crag;
}

function CragTabMenu({ crag }: Props) {
  const i18nPathname = useI18nPathname();

  const menuItems: TabMenuItem[] = [
    {
      label: "Info",
      link: `/plezalisce/${crag.slug}/info`,
      isActive: i18nPathname.test([`/{crag}/${crag.slug}/{info}`]),
      icon: <IconInfo />,
    },
    {
      label: "Smeri",
      link: `/plezalisce/${crag.slug}`,
      isActive: i18nPathname.test([`/{crag}/${crag.slug}`]),
      icon: <IconRoutes />,
    },
    {
      label: "Komentarji",
      link: `/plezalisce/${crag.slug}/komentarji`,
      isActive: i18nPathname.test([`/{crag}/${crag.slug}/{comments}`]),
      icon: <IconComment />,
    },
    {
      label: "Galerija",
      link: `/plezalisce/${crag.slug}/galerija`,
      isActive: i18nPathname.test([`/{crag}/${crag.slug}/{gallery}`]),
      icon: <IconGallery />,
    },
  ];

  return <TabMenu items={menuItems}></TabMenu>;
}

export default CragTabMenu;
