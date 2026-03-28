"use client";
import { Crag } from "@/graphql/generated";
import Link from "./ui/link";

type TCragLinkProps = {
  crag: Pick<Crag, "slug" | "name">;
};

function CragLink({ crag }: TCragLinkProps) {
  return (
    <Link href={`/plezalisce/${crag.slug}`} variant="secondary">
      {crag.name}
    </Link>
  );
}

export default CragLink;
