enum Orientation {
  NORTH = "north",
  NORTHEAST = "northeast",
  EAST = "east",
  SOUTHEAST = "southeast",
  SOUTH = "south",
  SOUTHWEST = "southwest",
  WEST = "west",
  NORTHWEST = "northwest",
}

interface IconOrientationProps {
  orientations: Orientation[];
}

function IconOrientation({ orientations }: IconOrientationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={40}
      height={40}
      className="fill-current text-blue-500"
    >
      {orientations.includes(Orientation.NORTH) && (
        <path d="M 12,12 l -5.65685424949238 -5.65685424949238 a 8 8 0 0 1 11.3137084989848 0 z" />
      )}

      {orientations.includes(Orientation.NORTHEAST) && (
        <path d="M 12,12 l 0 -8 a 8 8 0 0 1 8 8 z" />
      )}

      {orientations.includes(Orientation.EAST) && (
        <path d="M 12,12 l 5.65685424949238 -5.65685424949238 a 8 8 0 0 1 0 11.3137084989848 z" />
      )}

      {orientations.includes(Orientation.SOUTHEAST) && (
        <path d="M 12,12 l 8 0 a 8 8 0 0 1 -8 8 z" />
      )}

      {orientations.includes(Orientation.SOUTH) && (
        <path d="M 12,12 l 5.65685424949238 5.65685424949238 a 8 8 0 0 1 -11.3137084989848 0 z" />
      )}

      {orientations.includes(Orientation.SOUTHWEST) && (
        <path d="M 12,12 l 0 8 a 8 8 0 0 1 -8 -8 z" />
      )}

      {orientations.includes(Orientation.WEST) && (
        <path d="M 12,12 l -5.65685424949238 5.65685424949238 a 8 8  0 0 1 0 -11.3137084989848 0 z" />
      )}

      {orientations.includes(Orientation.NORTHWEST) && (
        <path d="M 12,12 l -8 0 a 8 8 0 0 1 8 -8 z" />
      )}

      <circle
        cx="12"
        cy="12"
        r="8.5"
        className="stroke-neutral-900"
        strokeWidth="1.2"
        fill="none"
      />
      <line
        x1="12"
        y1="4"
        x2="12"
        y2="1"
        className="stroke-neutral-900"
        strokeWidth="1.2"
      />
      <line
        x1="12"
        y1="20"
        x2="12"
        y2="23"
        className="stroke-neutral-900"
        strokeWidth="1.2"
      />
      <line
        x1="4"
        y1="12"
        x2="1"
        y2="12"
        className="stroke-neutral-900"
        strokeWidth="1.2"
      />
      <line
        x1="20"
        y1="12"
        x2="23"
        y2="12"
        className="stroke-neutral-900"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default IconOrientation;
export { Orientation };
