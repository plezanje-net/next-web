import LatestAscents from "../components/home/latest-ascents";
import LatestDifficultyVotes from "../components/home/latest-difficulty-votes";

function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex">
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
