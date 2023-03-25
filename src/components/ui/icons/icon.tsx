import { ReactNode } from "react";

type IconSize = "small" | "medium";
interface IconProps {
  className?: string;
  size?: IconSize;
  children?: ReactNode;
}

function Icon({ className, size, children }: IconProps) {
  const classes = className ? `${className} fill-current` : "fill-current";
  const sizePx = size === "small" ? 16 : 24;

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      {children}
    </svg>
  );
}

export type { IconProps, IconSize };
export default Icon;
