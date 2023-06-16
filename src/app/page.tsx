import Client from "../components/client";
import LatestAscents from "../components/home/latest-ascents";
import LatestDifficultyVotes from "../components/home/latest-difficulty-votes";

function Home() {
  return (
    <Client>
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
    </Client>
  );
}
export default Home;
