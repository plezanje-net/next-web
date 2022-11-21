import Link from "next/link";
import { Crag } from "../graphql/generated";

type Props = {
  crag: Crag;
};

function CragLink({ crag }: Props) {
  return <Link href={`/plezalisce/${crag.slug}`}>{crag.name}</Link>;
}

export default CragLink;
