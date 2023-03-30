import { ReactNode } from "react";

interface IconProps {
  className?: string;
  size?: "small" | "normal";
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

export type { IconProps };
export default Icon;
