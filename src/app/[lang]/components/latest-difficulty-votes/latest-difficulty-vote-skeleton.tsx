import IconRight from "@/components/ui/icons/right";

function LatestDifficultyVoteSkeleton() {
  return (
    <li className="border-b border-b-neutral-200 py-3">
      <div>---</div>
      <div>---</div>
      <div className="flex justify-between">
        <div>---, ---</div>
        <div className="flex">
          -- <IconRight /> --
        </div>
      </div>
    </li>
  );
}

export default LatestDifficultyVoteSkeleton;
