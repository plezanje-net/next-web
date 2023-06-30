import LatestAscents from "./[lang]/components/latest-ascents";
import LatestDifficultyVotes from "./[lang]/components/latest-difficulty-votes";

function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex gap-6">
        <div className="w-1/2">
          <LatestAscents />
        </div>
        <div className="w-1/2">
          <LatestDifficultyVotes />
        </div>
      </div>
    </div>
  );
}
export default Home;
