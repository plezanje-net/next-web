import { IconSize } from "./icon-size";

type TIconSummerProps = {
  size: IconSize.small | IconSize.large;
};

function IconSummer({ size }: TIconSummerProps) {
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
          <path d="M444-768v-144h72v144h-72Zm265 112-54-52 104-102 52 50-102 104Zm59 212v-72h144v72H768ZM444-48v-144h72v144h-72ZM251-658 147-760l54-50 101 101-51 51Zm509 511L659-252l50-50 104 100-53 55ZM48-444v-72h144v72H48Zm152 297-51-53 102-100 25 24 24 25-100 104Zm280-93q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-72q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-168Z" />
        </svg>
      );

    case IconSize.large:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          className="fill-current"
        >
          <path d="M454.87-756.41v-142.82h50.26v142.82h-50.26Zm238.05 98.87-34.79-34.79 100.18-102.75 35.77 36.39-101.16 101.15Zm63.49 202.67v-50.26h142.82v50.26H756.41ZM454.87-60.77v-142.44h50.26v142.44h-50.26ZM267.44-658.74l-102.11-99.57 36.36-35.38 101.16 100.77-35.41 34.18Zm491.33 493.41L658.13-267.67l34.18-33.79 101.79 98.95-35.33 37.18Zm-698-289.54v-50.26h142.82v50.26H60.77Zm140.95 289.54-35.41-36.36 99.77-99.77 18.31 17.05 18.69 17.72-101.36 101.36ZM480.09-260q-91.63 0-155.86-64.14Q260-388.28 260-479.91q0-91.63 64.14-155.86Q388.28-700 479.91-700q91.63 0 155.86 64.14Q700-571.72 700-480.09q0 91.63-64.14 155.86Q571.72-260 480.09-260Zm-.13-50.26q70.5 0 120.14-49.6t49.64-120.1q0-70.5-49.6-120.14t-120.1-49.64q-70.5 0-120.14 49.6t-49.64 120.1q0 70.5 49.6 120.14t120.1 49.64ZM480-480Z" />
        </svg>
      );
  }
}

export default IconSummer;
