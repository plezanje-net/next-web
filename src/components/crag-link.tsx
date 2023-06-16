"use client";
import { Crag } from "../graphql/generated";
import Link from "./ui/link";

type Props = {
  crag: Crag;
};

function CragLink({ crag }: Props) {
  return (
    <Link href={`/plezalisce/${crag.slug}`} variant="secondary">
      {crag.name}
    </Link>
  );
}

export default CragLink;
