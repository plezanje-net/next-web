"use client";
import { use } from "react";

import TabMenu, { TTabMenuItem } from "@/components/ui/tab-menu";

type TTabMenuPageParams = {
  params: Promise<{ selectedTab?: string }>;
};

function TabMenuPage(props: TTabMenuPageParams) {
  const params = use(props.params);
  const menuItems: TTabMenuItem[] = [
    {
      label: "Informacije",
      link: "/sandbox/tab-menu/info",
      isActive: params.selectedTab === "info",
    },
    {
      label: "Smeri",
      link: "/sandbox/tab-menu/smeri",
      isActive: params.selectedTab === "smeri",
    },
    {
      label: "Komentarji",
      link: "/sandbox/tab-menu/komentarji",
      isActive: params.selectedTab === "komentarji",
    },
    {
      label: "Galerija",
      link: "/sandbox/tab-menu/galerija",
      isActive: false,
      isDisabled: true,
    },
  ];

  return (
    <div className="m-8">
      <h1 className="text-xl">Tab menu demo</h1>
      <div className="mt-8">
        <TabMenu items={menuItems}></TabMenu>
      </div>
    </div>
  );
}

export default TabMenuPage;
