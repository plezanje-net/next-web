import { Crag, Route, Sector, User } from "@/graphql/generated";

function canEdit(user: User | null, contributable: Route | Sector | Crag) {
  if (user?.roles?.includes("admin")) return true; // An editor has all permissions
  if (contributable.publishStatus === "draft") {
    return true;
  }
  return false;
}

export { canEdit };
