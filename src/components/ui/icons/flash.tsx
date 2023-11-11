import { IconSize } from "./icon-size";

type TIconFlashProps = {
  size: IconSize.small | IconSize.regular;
};

function IconFlash({ size }: TIconFlashProps) {
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
          <path d="m480-334 130-194H506l72-264H360v312h120v146ZM408-96v-312H288v-456h384l-72 264h144L408-96Zm72-384H360h120Z" />
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
          <path d="m480-336 128-184H494l80-280H360v320h120v144ZM400-80v-320H280v-480h400l-80 280h160L400-80Zm80-400H360h120Z" />
        </svg>
      );
  }
}
export default IconFlash;
