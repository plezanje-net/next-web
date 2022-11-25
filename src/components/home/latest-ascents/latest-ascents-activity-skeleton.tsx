function LatestAscentsActivitySkeleton() {
  return (
    <li className="flex items-center border-b border-b-neutral-200 py-3">
      <div className="w-6"></div>
      <div className="flex-grow">
        <div>---</div>
        <div>---, ---</div>
        <div className="flex justify-between">
          <div>---</div>
          <div>---</div>
        </div>
      </div>
    </li>
  );
}

export default LatestAscentsActivitySkeleton;
