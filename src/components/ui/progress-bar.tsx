import { CSSProperties, forwardRef } from "react";

interface ProgressBarProps {
  value: number;
  size?: "small" | "default" | "large" | "extra-large";
  withLabelInside?: boolean;
}

function ProgressBar({
  value,
  size = "default",
  withLabelInside = false,
}: ProgressBarProps) {
  let barStyles =
    "bg-blue-500 rounded-full text-blue-100 text-center leading-none";
  let frameStyles = "bg-neutral-100 rounded-full w-full mt-2";
  const percentage = Math.round(value * 100);
  switch (size) {
    case "small":
      barStyles += " h-1.5";
      frameStyles += " h-1.5";
      break;
    case "large":
      barStyles += " h-4";
      frameStyles += " h-4";
      break;
    case "extra-large":
      barStyles += " h-6";
      frameStyles += " h-6";
      break;
    default:
      barStyles += " h-2.5";
      frameStyles += " h-2.5";
      break;
  }
  if (withLabelInside) {
    if (size !== "extra-large") {
      //reduce font size for inside label
      barStyles += " text-sm p-0.5";
    } else {
      barStyles += " text-m p-1";
    }
  }

  const cssProperty: CSSProperties = {
    width: `${value * 100}%`,
  };

  return (
    <>
      {withLabelInside ? (
        <div className="flex">
          <div className={frameStyles}>
            <div className={barStyles} style={cssProperty}>
              {withLabelInside ? `${percentage}%` : ""}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className={frameStyles}>
            <div className={barStyles} style={cssProperty}></div>
          </div>
          <div
            className={`text-sm ml-4 ${size === "extra-large" ? "pt-2" : "pt-1"}`}
          >{`${percentage}%`}</div>
        </div>
      )}
    </>
  );
}
export default ProgressBar;
