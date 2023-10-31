import { IconSize } from "./icon-size";

type TIconRoofProps = {
  size: IconSize.small | IconSize.large;
};

function IconRoof({ size }: TIconRoofProps) {
  const sizePx = size === IconSize.small ? "20" : "40";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width={sizePx}
      height={sizePx}
      className="fill-current"
    >
      <path d="M2 2V15H16L33 38H38V2H2Z" />
      <path d="M3.20833 38L5.14583 28.0833L3.5 28.7917V31H2V27.7917L5.85417 26.1667C5.99306 26.1111 6.12847 26.0694 6.26042 26.0417C6.39236 26.0139 6.52083 26 6.64583 26C7.00694 26 7.32639 26.0799 7.60417 26.2396C7.88194 26.3993 8.11806 26.6181 8.3125 26.8958L8.5 27.1667C8.81944 27.6528 9.17708 28.1632 9.57292 28.6979C9.96875 29.2326 10.7778 29.5 12 29.5V31C11.0972 31 10.2951 30.8333 9.59375 30.5C8.89236 30.1667 8.35417 29.7083 7.97917 29.125L7.54167 31.5L9 32.9583V38H7.5V33.5208L5.97917 32.3542L4.6875 38H3.20833ZM8 25.5C7.51389 25.5 7.10069 25.3299 6.76042 24.9896C6.42014 24.6493 6.25 24.2361 6.25 23.75C6.25 23.2639 6.42014 22.8507 6.76042 22.5104C7.10069 22.1701 7.51389 22 8 22C8.48611 22 8.89931 22.1701 9.23958 22.5104C9.57986 22.8507 9.75 23.2639 9.75 23.75C9.75 24.2361 9.57986 24.6493 9.23958 24.9896C8.89931 25.3299 8.48611 25.5 8 25.5Z" />
    </svg>
  );
}

export default IconRoof;
