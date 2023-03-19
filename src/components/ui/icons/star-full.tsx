interface IconProps {
  className?: string;
  size?: "small" | "normal";
}

function IconStarFull(props: IconProps) {
  const classes = props?.className
    ? props.className + " fill-current"
    : "fill-current";

  const size = props?.size === "small" ? 18 : 24;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" />
    </svg>
  );
}

export default IconStarFull;
