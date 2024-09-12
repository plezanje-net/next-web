import { IconSize } from "./icon-size";

type TIconWinterProps = {
  size: IconSize.small | IconSize.large;
};

function IconWinter({ size }: TIconWinterProps) {
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
          <path d="M444-96v-165L316-133l-51-51 179-178v-82h-82L183-265l-51-51 129-128H96v-72h165L133-644l51-51 178 179h82v-82L265-776l51-51 128 128v-165h72v165l128-129 51 51-179 179v82h82l178-179 51 51-128 128h165v72H699l129 128-51 51-179-179h-82v82l179 179-51 51-128-129v165h-72Z" />
        </svg>
      );

    case IconSize.large:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="40px"
          height="40px"
          className="fill-current"
        >
          <path d="M454.87-90v-194.05L305.54-135.64l-35.8-35.39 185.13-185.12v-98.72h-98.72L172.92-271.64l-36.2-34.98 147.33-148.25H90v-50.26h194.05L135.23-654.87l35.8-35.8 185.12 185.54h98.72v-99.13L271.64-787.49l35.39-36.2 147.84 147.08V-870h50.26v193.39l149.74-148.57 35.39 35.8-185.13 185.12v99.13h99.13L787.9-688.77l35.79 35.39-147.08 148.25H870v50.26H676.61l147.75 149.33-34.98 35.8-185.12-185.13h-99.13v98.72l185.13 185.53-34.98 35.8-150.15-149.23V-90h-50.26Z" />
        </svg>
      );
  }
}

export default IconWinter;
