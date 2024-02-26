import { IconSize } from "./icon-size";

type TIconRepeatProps = {
  size: IconSize.small | IconSize.regular;
  inline?: boolean;
};

function IconRepeat({ size, inline = false }: TIconRepeatProps) {
  switch (size) {
    case IconSize.small:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="20"
          height="20"
          className={`fill-current ${
            inline ? "relative bottom-[1px] inline" : ""
          }`}
        >
          <path d="M192-336q-60 0-102-42T48-480q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42Zm480 96q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-72q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
        </svg>
      );

    case IconSize.regular:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="24"
          height="24"
          className="fill-current"
        >
          <path d="M200-320q-66 0-113-47T40-480q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm480 80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
        </svg>
      );
  }
}
export default IconRepeat;
