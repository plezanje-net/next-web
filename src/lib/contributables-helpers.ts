import { User } from "@/graphql/generated";

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

export { canEdit, getBgStyle };
