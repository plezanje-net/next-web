import { Orientation } from "@/graphql/generated";

type TOrientationsProps = {
  orientations: Orientation[];
};

function Orientations({ orientations }: TOrientationsProps) {
  const orientationsAbbreviations = {
    [Orientation.North]: "S",
    [Orientation.Northeast]: "SV",
    [Orientation.East]: "V",
    [Orientation.Southeast]: "JV",
    [Orientation.South]: "J",
    [Orientation.Southwest]: "JZ",
    [Orientation.West]: "Z",
    [Orientation.Northwest]: "SZ",
  };

  return orientations
    .map((orientation) => orientationsAbbreviations[orientation])
    .join(", ");
}

export default Orientations;
