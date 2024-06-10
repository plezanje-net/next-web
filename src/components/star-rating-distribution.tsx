import { Route, StarRatingVote } from "@/graphql/generated";
import displayDate from "@/utils/display-date";
import RouteStarRating from "./route-star-rating";
import { IconSize } from "./ui/icons/icon-size";
import StarRating from "./star-rating";
import IconStarFull from "./ui/icons/star-full";
import IconStarEmpty from "./ui/icons/star-empty";

type TStarRatingDistributionProps = {
  route: Route;
  starRatingVotes: StarRatingVote[];
};

function StarRatingDistribution({
  route,
  starRatingVotes,
}: TStarRatingDistributionProps) {
  if (route.starRating == null) {
    return <>Smer še nima glasov o lepoti.</>;
  }

  const nrVotesPerRating = starRatingVotes.reduce(
    (acc, vote) => ({
      ...acc,
      [vote.stars]: (acc[vote.stars] || 0) + 1,
    }),
    {} as Record<number, number>
  );

  return (
    <>
      <div>
        <div className="flex w-full">
          {nrVotesPerRating[2] && (
            <div
              style={{
                width: `${
                  (nrVotesPerRating[2] / starRatingVotes.length) * 100
                }%`,
              }}
            >
              <IconStarFull size={IconSize.regular} />
            </div>
          )}
          {nrVotesPerRating[1] && (
            <div
              style={{
                width: `${
                  (nrVotesPerRating[1] / starRatingVotes.length) * 100
                }%`,
              }}
            >
              <IconStarEmpty size={IconSize.regular} />
            </div>
          )}
          {nrVotesPerRating[0] && (
            <div
              style={{
                width: `${
                  (nrVotesPerRating[0] / starRatingVotes.length) * 100
                }%`,
              }}
            >
              n.p.
            </div>
          )}
        </div>
        <div className="mt-1 flex h-5 overflow-hidden rounded">
          <div
            style={{
              width: `${(nrVotesPerRating[2] / starRatingVotes.length) * 100}%`,
            }}
            className="h-full bg-blue-500"
          ></div>
          <div
            style={{
              width: `${(nrVotesPerRating[1] / starRatingVotes.length) * 100}%`,
            }}
            className="h-full bg-blue-200"
          ></div>
          <div
            style={{
              width: `${(nrVotesPerRating[0] / starRatingVotes.length) * 100}%`,
            }}
            className="h-full bg-neutral-300"
          ></div>
        </div>
      </div>
      <table className="mt-3">
        <tbody>
          {starRatingVotes.map((vote) => (
            <tr
              key={vote.id}
              className={
                vote.stars == route.starRating
                  ? "text-neutral-900"
                  : "text-neutral-500"
              }
            >
              <td className="pr-4">
                {vote.stars == 2 && (
                  <div className="flex">
                    <IconStarFull size={IconSize.regular} />
                    <span className="ml-1 hidden xs:inline">čudovita</span>
                  </div>
                )}
                {vote.stars == 1 && (
                  <div className="flex">
                    <IconStarEmpty size={IconSize.regular} />
                    <span className="ml-1 hidden xs:inline">lepa</span>
                  </div>
                )}
                {vote.stars == 0 && (
                  <>
                    <span className="ml-1 xs:hidden">n.p.</span>
                    <span className="ml-1 hidden xs:inline">nič posebnega</span>
                  </>
                )}
              </td>
              <td className="pr-4">{vote.user?.fullName}</td>
              <td>{displayDate(vote.created)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StarRatingDistribution;
