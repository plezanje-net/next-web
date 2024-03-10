import { Crag } from "@/graphql/generated";
import CragCard from "./crag-card";
import { TCragListColumn } from "./filtered-crags";

type TCragListCardsProps = {
  crags: Crag[];
  columns: TCragListColumn[];
};

function CragListCards({ crags, columns }: TCragListCardsProps) {
  return crags.map((crag) => (
    <div key={crag.id}>
      <CragCard crag={crag} columns={columns} />
    </div>
  ));
}

export default CragListCards;
