import { IconSize } from "./icon-size";

type TIconAidProps = {
  size: IconSize.small | IconSize.regular;
  inline?: boolean;
};

function IconAid({ size, inline = false }: TIconAidProps) {
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
          <path d="M238-120q-19 0-30-15.5t-6-33.5l178-643q4-13 14-20.5t23-7.5q20 0 31 15.5t6 33.5l-20 71h225l25-92q4-13 14.5-20.5T722-840q19 0 30 15.5t6 33.5L580-148q-4 13-14 20.5t-23 7.5q-20 0-31-15.5t-6-33.5l20-71H301l-25 92q-4 13-14.5 20.5T238-120Zm141-400h224l33-120H412l-33 120Zm-55 200h224l33-120H357l-33 120Z" />
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
          <path d="M249-144q-17 0-27-14.5t-5-31.5l168-600q3-12 13.5-19t23.5-7q17 0 27.5 14.5T455-770l-21 74h213l26-94q4-12 14-19t23-7q17 0 27.5 14.5T743-770L575-170q-4 12-14.5 19t-23.5 7q-17 0-27-14.5t-5-31.5l21-74H313l-26 94q-3 12-14 19t-24 7Zm135-372h213l30-108H414l-30 108Zm-51 180h213l30-108H363l-30 108Z" />
        </svg>
      );
  }
}
export default IconAid;
