import { IconSize } from "./icon-size";

type TIconDotProps = {
  size: IconSize.small | IconSize.regular;
  inline?: boolean;
};

function IconDot({ size, inline = false }: TIconDotProps) {
  switch (size) {
    case IconSize.small:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          className={`fill-current ${
            inline ? "relative bottom-[1px] inline" : ""
          }`}
        >
          <circle cx="10" cy="10" r="5" />
        </svg>
      );

    case IconSize.regular:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="7" />
        </svg>
      );
  }
}

export default IconDot;
