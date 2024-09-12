import { pluralizeNoun } from "@/utils/text-helpers";

type TNrRoutesProps = {
  nrRoutes: number;
  hasSport: boolean;
  hasBoulder: boolean;
  hasMultipitch: boolean;
};

function NrRoutes({
  nrRoutes,
  hasSport,
  hasBoulder,
  hasMultipitch,
}: TNrRoutesProps) {
  if (hasBoulder && (hasSport || hasMultipitch)) {
    return pluralizeNoun("smer/problem", nrRoutes);
  } else if (hasBoulder && !(hasSport || hasMultipitch)) {
    return pluralizeNoun("problem", nrRoutes);
  } else {
    return pluralizeNoun("smer", nrRoutes);
  }
}

export default NrRoutes;
