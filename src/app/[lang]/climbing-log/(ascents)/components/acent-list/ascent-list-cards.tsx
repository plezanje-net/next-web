import { MyActivityRoutesQuery } from "@/graphql/generated";
import AscentCard from "./ascent-card";

type TAscentListCardsProps = {
  ascents: MyActivityRoutesQuery["myActivityRoutes"]["items"];
};

function AscentListCards({ ascents }: TAscentListCardsProps) {
  return (
    <div>
      {ascents.map((ascent) => (
        <AscentCard ascent={ascent} key={ascent.id} />
      ))}
    </div>
  );
}

export default AscentListCards;
