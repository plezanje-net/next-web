import { IconSize } from "./icon-size";

type TIconAidProps = {
  size: IconSize.small | IconSize.regular;
};

function IconAid({ size }: TIconAidProps) {
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
          <path d="M132-192q-15.3 0-25.65-11Q96-214 96-229.111q0-8.889 3.867-16.569 3.866-7.681 11.6-12.199L444-491v-73q0-15.3 11.122-25.65Q466.244-600 482-600q20 0 33-14.442t13-34.5Q528-669 514-682.5T480-696q-20 0-34 14t-14 34h-72q0-50 35.202-85t85-35Q530-768 565-733.379t35 84.202Q600-609 577-576.5 554-544 516-533v42l332.533 234.043q7.734 4.536 11.6 12.246Q864-237 864-228q0 15.3-10.35 25.65Q843.3-192 828-192H132Zm114-72h468L480-428 246-264Z" />
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
          <path d="M120-160q-17 0-28.5-11.5T80-200q0-10 4-18.5T96-232l344-258v-70q0-17 12-28.5t29-11.5q25 0 42-18t17-43q0-25-17.5-42T480-720q-25 0-42.5 17.5T420-660h-80q0-58 41-99t99-41q58 0 99 40.5t41 98.5q0 47-27.5 84T520-526v36l344 258q8 5 12 13.5t4 18.5q0 17-11.5 28.5T840-160H120Zm120-80h480L480-420 240-240Z" />
        </svg>
      );
  }
}
export default IconAid;
