import { useRouter } from "next/router";
import TabMenu, { TabMenuItem } from "../../../components/ui/tab-menu";

interface Params {
  selectedTab?: string;
}

function TabMenuPage() {
  const router = useRouter();
  const query = router.query as Params;
  const menuItems: TabMenuItem[] = [
    {
      label: "Informacije",
      link: "/sandbox/tab-menu/info",
      isActive: query.selectedTab === "info",
    },
    {
      label: "Smeri",
      link: "/sandbox/tab-menu/smeri",
      isActive: query.selectedTab === "smeri",
    },
    {
      label: "Komentarji",
      link: "/sandbox/tab-menu/komentarji",
      isActive: query.selectedTab === "komentarji",
    },
    {
      label: "Galerija",
      link: "/sandbox/tab-menu/galerija",
      isActive: query.selectedTab === "galerija",
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
