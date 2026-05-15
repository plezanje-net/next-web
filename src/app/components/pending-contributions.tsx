import IconReview from "@/components/ui/icons/review";
import Link from "@/components/ui/link";
import { PendingContributionsDocument } from "@/graphql/generated";
import getCurrentUser from "@/lib/auth/get-current-user";
import { getBgStyle } from "@/lib/contributables-helpers";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

async function PendingContributions() {
  const { data } = await gqlRequest(PendingContributionsDocument, {});
  const contributions = data.contributions;

  const currentUser = await getCurrentUser();

  const pendingDrafts = contributions.filter(
    (contribution) => contribution.publishStatus === "draft"
  );

  const pendingInReviews = contributions.filter(
    (contribution) => contribution.publishStatus === "in_review"
  );

  return (
    <div className="mt-7">
      {pendingDrafts.length > 0 && (
        <>
          {currentUser?.roles.includes("admin") ? (
            <Card
              text={message("draft-admin", pendingDrafts.length)}
              publishStatus="draft"
            />
          ) : (
            <Card
              text={message("draft-user", pendingDrafts.length)}
              publishStatus="draft"
            />
          )}
        </>
      )}

      {pendingInReviews.length > 0 && currentUser?.roles.includes("admin") && (
        <Card
          text={message("in_review-admin", pendingInReviews.length)}
          publishStatus="in_review"
        />
      )}
    </div>
  );
}

function Card({
  text,
  publishStatus,
}: {
  text: string;
  publishStatus: string;
}) {
  const bgStyle = getBgStyle(publishStatus);

  return (
    <div className={`rounded-lg my-4 ${bgStyle}`}>
      <div className="px-4 py-3 ">{text}</div>
      <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-end">
        <Link
          href="/urejanje/prispevki"
          variant="secondary"
          className="flex gap-2 items-center justify-end"
        >
          <IconReview />
          Preglej
        </Link>
      </div>
    </div>
  );
}

const message = (key: string, count: number) => {
  switch (key) {
    case "draft-user":
      switch (count) {
        case 1:
          return `Dodal si ${count} nov prispevek. Pošlji ga uredništvu v pregled in potrditev.`;
        case 2:
          return `Dodal si ${count} nova prispevka. Pošlji ju uredništvu v pregled in potrditev.`;
        case 3:
        case 4:
          return `Dodal si ${count} nove prispevke. Pošlji jih uredništvu v pregled in potrditev.`;
        default:
          return `Dodal si ${count} novih prispevkov. Pošlji jih uredništvu v pregled in potrditev.`;
      }
    case "draft-admin":
      switch (count) {
        case 1:
          return `Dodal si ${count} nov prispevek. Preglej in objavi ga.`;
        case 2:
          return `Dodal si ${count} nova prispevka. Preglej in objavi ju.`;
        case 3:
        case 4:
          return `Dodal si ${count} nove prispevke. Preglej in objavi jih.`;
        default:
          return `Dodal si ${count} novih prispevkov. Preglej in objavi jih.`;
      }
    case "in_review-admin":
      switch (count) {
        case 1:
          return `${count} uporabniški prispevek čaka na objavo.
            Preglej ga in ga potrdi ali zavrni.`;
        case 2:
          return `${count} uporabniška prispevka čakata na objavo.
            Preglej ju in ju potrdi ali zavrni.`;
        case 3:
        case 4:
          return `${count} uporabniški prispevki čakajo na objavo.
            Preglej jih in jih potrdi ali zavrni.`;
        default:
          return `${count} uporabniških prispevkov čaka na objavo.
            Preglej jih in jih potrdi ali zavrni.`;
      }
    default:
      return "";
  }
};

gql`
  query PendingContributions {
    contributions {
      id
      entity
      publishStatus
      created
    }
  }
`;

export default PendingContributions;
