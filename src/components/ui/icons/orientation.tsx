import { Orientation } from "@/graphql/generated";
import { IconSize } from "./icon-size";

type IconOrientationProps = {
  size: IconSize.small | IconSize.large;
  orientations?: Orientation[];
};

function IconOrientation({ size, orientations }: IconOrientationProps) {
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
          <path
            d="M 2.75 10 a 6.5 6.5 0 0 1 14.5 0 h -1.5 a 5.75 5.75 0 0 0 -11.5 0 
                h -1.5
                a 6.5 6.5 0 0 0 14.5 0
                h -1.5
                a 5.75 5.75 0 0 1 -11.5 0 "
          />

          <rect x="9.25" y="1.5" width="1.5" height="1.5" />
          <rect x="9.25" y="9.25" width="1.5" height="1.5" />
          <rect x="9.25" y="3.25" width="1.5" height="1.5" />
          <rect x="9.25" y="6.25" width="1.5" height="1.5" />
          <rect x="12.25" y="9.25" width="1.5" height="1.5" />
          <rect x="3.25" y="9.25" width="1.5" height="1.5" />
          <rect x="15.25" y="9.25" width="1.5" height="1.5" />
          <rect x="9.25" y="12.25" width="1.5" height="1.5" />
          <rect x="9.25" y="15.25" width="1.5" height="1.5" />
          <rect x="6.25" y="9.25" width="1.5" height="1.5" />
          <rect x="9.25" y="17" width="1.5" height="1.5" />
          <rect x="16.875" y="9.25" width="1.5" height="1.5" />
          <rect x="1.5" y="9.25" width="1.5" height="1.5" />
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
          <g className="text-blue-500">
            {/* <!-- north --> */}
            {orientations && orientations.includes(Orientation.North) && (
              <path
                d="M 20 20 
                  l -9.89949493661166 -9.89949493661166
                  a 14 14 0 0 1 19.7989898732233 0 
                  z"
              />
            )}

            {/* <!-- northeast --> */}
            {orientations && orientations.includes(Orientation.Northeast) && (
              <path
                d="M 20 20 
                  l 0 -14
                  a 14 14 0 0 1 14 14 
                  z"
              />
            )}

            {/* <!-- east --> */}
            {orientations && orientations.includes(Orientation.East) && (
              <path
                d="M 20 20 
                  l 9.89949493661166 -9.89949493661166
                  a 14 14 0 0 1 0 19.7989898732233 
                  z"
              />
            )}

            {/* <!-- southeast --> */}
            {orientations && orientations.includes(Orientation.Southeast) && (
              <path
                d="M 20 20 
                  l 14 0
                  a 14 14 0 0 1 -14 14 
                  z"
              />
            )}

            {/* <!-- south --> */}
            {orientations && orientations.includes(Orientation.South) && (
              <path
                d="M 20 20 
                  l 9.89949493661166 9.89949493661166
                  a 14 14 0 0 1 -19.7989898732233 0
                  z"
              />
            )}

            {/* <!-- southwest --> */}
            {orientations && orientations.includes(Orientation.Southwest) && (
              <path
                d="M 20 20 
                  l 0 14
                  a 14 14 0 0 1 -14 -14 
                  z"
              />
            )}

            {/* <!-- west --> */}
            {orientations && orientations.includes(Orientation.West) && (
              <path
                d="M 20 20 
                    l -9.8994949366116 9.8994949366116
                    a 14 14 0 0 1 0 -19.7989898732233
                    z"
              />
            )}

            {/* <!-- northwest --> */}
            {orientations && orientations.includes(Orientation.Northwest) && (
              <path
                d="M 20 20 
                    l -14 0
                    a 14 14 0 0 1 14 -14 
                    z"
              />
            )}
          </g>

          {/* <!-- circle --> */}
          <path
            d="M5 20 
              a 15 15 0 0 1 30 0 
              h -2
              a 13 13 0 0 0 -26 0
              h -2
              a 15 15 0 0 0 30 0 
              h -2
              a 13 13 0 0 1 -26 0"
          />

          {/* <!-- tips --> */}
          <path d="M 19 2 h2 v4 h-2 z" />
          <path d="M 19 34 h2 v4 h-2 z" />
          <path d="M 2 19 h4 v2 h-4 z" />
          <path d="M 34 19 h4 v2 h-4 z" />
        </svg>
      );
  }
}

export default IconOrientation;
