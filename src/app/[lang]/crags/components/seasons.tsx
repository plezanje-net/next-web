import IconAutumn from "@/components/ui/icons/autumn";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconSpring from "@/components/ui/icons/spring";
import IconSummer from "@/components/ui/icons/summer";
import IconWinter from "@/components/ui/icons/winter";
import { Season } from "@/graphql/generated";

type TSeasonsProps = {
  seasons: string[];
  align?: "left" | "right";
};

function Seasons({ seasons, align = "left" }: TSeasonsProps) {
  return (
    <div className={`flex gap-2 ${align == "right" ? "justify-end" : ""}`}>
      <div
        className={seasons.includes(Season.Spring) ? "" : "text-neutral-200"}
      >
        <IconSpring size={IconSize.small} />
      </div>

      <div
        className={seasons.includes(Season.Summer) ? "" : "text-neutral-200"}
      >
        <IconSummer size={IconSize.small} />
      </div>

      <div
        className={seasons.includes(Season.Autumn) ? "" : "text-neutral-200"}
      >
        <IconAutumn size={IconSize.small} />
      </div>

      <div
        className={seasons.includes(Season.Winter) ? "" : "text-neutral-200"}
      >
        <IconWinter size={IconSize.small} />
      </div>
    </div>
  );
}

export default Seasons;
