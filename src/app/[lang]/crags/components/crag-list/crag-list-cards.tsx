import { Crag } from "@/graphql/generated";
import CragCard from "./single-crag/crag-card";
import { useCragsContext } from "../crags-context";

function CragListCards() {
  const { crags } = useCragsContext();

  return (
    <div>
      {crags.map((crag: Crag) => (
        <CragCard key={crag.id} crag={crag} />
      ))}
    </div>
  );
}

export default CragListCards;
