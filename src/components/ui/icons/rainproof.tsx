import { IconSize } from "./icon-size";

type IconRainproofProps = {
  size: IconSize.small | IconSize.regular | IconSize.large;
};

function IconRainproof({ size = IconSize.large }: IconRainproofProps) {
  switch (size) {
    case IconSize.small:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          className="fill-current"
        >
          <rect x="5.25" y="1" width="1.5" height="3" rx=".75" ry=".75" />
          <rect x="9.25" y="1" width="1.5" height="3" rx=".75" ry=".75" />
          <rect x="13.25" y="1" width="1.5" height="3" rx=".75" ry=".75" />
          <path d="M 3 12.5 a 7 7 0 0 1 14 0 h -6.25 v 4.5 a 2 2 0 0 1 -4 0 v -0.5 h 1.5 v 0.5 a 0.5 0.5 0 0 0 1 0 v -4.5 z M 15.5 12.5 a 5.5 5.5 0 0 0 -11 0 z" />
          <rect x="4" y="11" width="12" height="1.5" />
        </svg>
      );

    case IconSize.regular:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="fill-current"
        >
          <rect x="7" y="2" width="2" height="3.5" rx="1" ry="1" />
          <rect x="11" y="2" width="2" height="3.5" rx="1" ry="1" />
          <rect x="15" y="2" width="2" height="3.5" rx="1" ry="1" />
          <path d="M 4 15 a 8 8 0 0 1 16 0 z M 18 15 a 6 6 0 0 0 -12 0 z" />
          <rect x="5" y="13" width="14" height="2" />
          <rect x="11" y="15" width="2" height="4.5" />
          <path d="M 13 19.5 a 2.5 2.5 0 0 1 -5 0 h 2 a 0.5 0.5 0 0 0 1 0 z" />
          <rect x="8" y="19" width="2" height="0.5" />
        </svg>
      );

    case IconSize.large:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          width="40"
          height="40"
          className="fill-current"
        >
          <path d="M 11 3 a 1 1 0 0 1 2 0 v 4 a 1 1 0 0 1 -2 0 z" />
          <path d="M 19, 3 a 1 1 0 0 1 2 0 v 4 a 1 1 0 0 1 -2 0 z" />
          <path d="M 27, 3 a 1 1 0 0 1 2 0 v 4 a 1 1 0 0 1 -2 0 z" />
          <path d="M 6, 24 a 14 14 0 0 1 28 0 h -13 V 34.5 a 3.5 3.5 0 0 1 -7 0 v -1 h 2 v 1 a 1.5 1.5 0 0 0 3 0 v -10.5 z M 32, 24 a 12 12 0 0 0 -24 0 z M 8,24 v -2 h 24 v 2 z" />
        </svg>
      );
  }
}

export default IconRainproof;
