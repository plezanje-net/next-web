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
          viewBox="0 0 40 40"
          width="40"
          height="40"
          className="fill-current"
        >
          <path d="M18.953 36.25V28.1645L12.7307 34.3483L11.2393 32.8739L18.953 25.1603V21.047H14.8397L7.20508 28.6816L5.69658 27.2244L11.8355 21.047H3.75V18.9531H11.8355L5.63462 12.7137L7.12604 11.2223L14.8397 18.9531H18.953V14.8226L11.3184 7.18806L12.7927 5.67956L18.953 11.8078V3.75006H21.0469V11.8078L27.2863 5.6176L28.7606 7.10898L21.0469 14.8226V18.9531H25.1773L32.829 11.3014L34.3204 12.7756L28.1922 18.9531H36.2499V21.047H28.1922L34.3482 27.2693L32.891 28.7606L25.1773 21.047H21.0469V25.1603L28.7606 32.8911L27.3034 34.3824L21.0469 28.1645V36.25L18.953 36.25Z" />
        </svg>
      );
  }
}

export default IconWinter;
