import { Crag } from "@/graphql/generated";
import CragCard from "./crag-card";
import { TCragListColumn } from "./filtered-crags";
import { Fragment } from "react";

type TCragListCardsProps = {
  crags: Crag[];
  columns: TCragListColumn[];
};

function CragListCards({ crags, columns }: TCragListCardsProps) {
  return (
    <div>
      {crags.map((crag) => (
        <Fragment key={crag.id}>
          <CragCard crag={crag} columns={columns} />
        </Fragment>
      ))}
    </div>
  );
}

export default CragListCards;
