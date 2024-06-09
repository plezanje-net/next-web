"use client";
import TabMenu, { TabMenuItem } from "@/components/ui/tab-menu";

interface Params {
  params: { selectedTab?: string };
}

function TabMenuPage({ params }: Params) {
  const menuItems: TabMenuItem[] = [
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
      isActive: params.selectedTab === "galerija",
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
