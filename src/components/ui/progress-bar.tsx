type TProgressBarProps = {
  progress: number;
};

function ProgressBar({ progress }: TProgressBarProps) {
  return (
    <div className="flex items-center gap-4">
      {/* frame */}
      <div className="w-full h-2 rounded-full bg-neutral-200">
        {/* bar */}
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* percentage */}
      <div className="text-sm whitespace-nowrap">{progress} %</div>
    </div>
  );
}

export default ProgressBar;
