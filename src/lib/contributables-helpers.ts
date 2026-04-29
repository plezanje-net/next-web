import { Crag, Route, Sector, User } from "@/graphql/generated";

function canEdit(user: User | null, contributable: { publishStatus: string }) {
  if (user?.roles?.includes("admin")) return true; // An editor has all permissions
  if (contributable.publishStatus === "draft") {
    return true;
  }
  return false;
}

function getBgStyle(publishStatus: string) {
  switch (publishStatus) {
    case "draft":
      return "bg-red-25";
    case "in_review":
      return "bg-amber-25";
    case "published":
    default:
      return "bg-neutral-100";
  }
}

type TContributableCrag = {
  __typename: Crag["__typename"];
  id: Crag["id"];
  name: Crag["name"];
  publishStatus: Crag["publishStatus"];
  user?: {
    id: User["id"];
    fullName: User["fullName"];
  } | null;
  sectors: {
    id: Sector["id"];
    name: Sector["name"];
    label: Sector["label"];
    routes: {}[];
  }[];
};

type TContributableRoute = {
  __typename: Route["__typename"];
  id: Route["id"];
  name: Route["name"];
  publishStatus: Route["publishStatus"];
  user?: {
    id: User["id"];
    fullName: User["fullName"];
  } | null;
  sector: {
    id: Sector["id"];
    publishStatus: Sector["publishStatus"];
  };
};

type TContributable = TContributableCrag | TContributableRoute | Sector;

export { canEdit, getBgStyle };
export type { TContributable };
