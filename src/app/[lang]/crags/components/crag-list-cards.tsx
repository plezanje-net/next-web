import { Crag } from "@/graphql/generated";
import CragCard from "./crag-card";

type TCragListCardsProps = {
  crags: Crag[];
};

function CragListCards({ crags }: TCragListCardsProps) {
  return crags.map((crag) => (
    <div key={crag.id}>
      <CragCard crag={crag} />
    </div>
  ));
}

export default CragListCards;
