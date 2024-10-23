import { CSSProperties } from "react";

interface ProgressBarProps {
  value: number;
}

function ProgressBar(props: ProgressBarProps) {
  const cssProperty: CSSProperties = {
    width: `${props.value}%`
  }
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className="bg-blue-500 h-2.5 rounded-full" style={cssProperty}></div>
    </div>
  );
}
export default ProgressBar;
