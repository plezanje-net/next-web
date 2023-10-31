import { IconSize } from "./icon-size";

type TIconStarEmptyProps = {
  size: IconSize.small | IconSize.regular;
};

function IconStarEmpty({ size }: TIconStarEmptyProps) {
  switch (size) {
    case IconSize.small:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="20"
          height="20"
          className="fill-current"
        >
          <path d="m352-245 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144ZM243-96l63-266L96-541l276-24 108-251 108 252 276 23-210 179 63 266-237-141L243-96Zm237-333Z" />
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
          <path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z" />
        </svg>
      );
  }
}
export default IconStarEmpty;
