import { IconSize } from "./icon-size";

type TIconStarFullProps = {
  size: IconSize.small | IconSize.regular;
  inline?: boolean;
};

function IconStarFull({ size, inline = false }: TIconStarFullProps) {
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
          <path d="m243-96 63-266L96-541l276-24 108-251 108 252 276 23-210 179 63 266-237-141L243-96Z" />
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
          <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
        </svg>
      );
  }
}

export default IconStarFull;
