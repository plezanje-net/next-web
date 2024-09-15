type TIconMarkerProps = {
  type: "parking" | "wall";
};

// TODO: why not just have multiple icons...?

function IconMarker({ type }: TIconMarkerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width="52"
      height="52"
      className="fill-current text-neutral-900"
    >
      {/* marker */}
      <path d="M26 46.6041C20.5472 41.8791 16.4584 37.4819 13.7333 33.4125C11.0084 29.3431 9.64587 25.607 9.64587 22.2042C9.64587 17.2042 11.2632 13.1564 14.498 10.0605C17.7327 6.96467 21.5667 5.41675 26 5.41675C30.4333 5.41675 34.2673 6.96467 37.502 10.0605C40.7367 13.1564 42.3541 17.2042 42.3541 22.2042C42.3541 25.607 40.9916 29.3431 38.2666 33.4125C35.5416 37.4819 31.4527 41.8791 26 46.6041Z" />

      <path
        d="M26 43.3459C30.525 39.3098 33.9722 35.4612 36.3416 31.8C38.7111 28.1389 39.8958 24.9403 39.8958 22.2042C39.8958 18.0222 38.5676 14.5851 35.9112 11.8928C33.2549 9.20038 29.9512 7.8542 26 7.8542C22.0488 7.8542 18.7451 9.20038 16.0887 11.8928C13.4324 14.5851 12.1042 18.0222 12.1042 22.2042C12.1042 24.9403 13.309 28.1389 15.7188 31.8C18.1285 35.4612 21.5556 39.3098 26 43.3459Z"
        fill="white"
      />

      {/* parking icon */}
      {type === "parking" && (
        <path d="M21.5 30.5V15.5H27.3333C28.7222 15.5 29.9028 15.9861 30.875 16.9583C31.8472 17.9306 32.3333 19.1111 32.3333 20.5C32.3333 21.8889 31.8472 23.0694 30.875 24.0417C29.9028 25.0139 28.7222 25.5 27.3333 25.5H24.8333V30.5H21.5ZM24.8333 22.1667H27.5C27.9583 22.1667 28.3507 22.0035 28.6771 21.6771C29.0035 21.3507 29.1667 20.9583 29.1667 20.5C29.1667 20.0417 29.0035 19.6493 28.6771 19.3229C28.3507 18.9965 27.9583 18.8333 27.5 18.8333H24.8333V22.1667Z" />
      )}

      {/* wall icon */}
      {type === "wall" && (
        <path d="M26.2148 12.5H31.3198L32.1712 16.757L33.7187 18.3045L34.5799 29.5H17.2192L20.6834 15.6435L24.6477 14.8507L26.2148 12.5ZM24.5418 16.9114L22.3167 17.3565L19.7808 27.5H25.597L24.9767 23.1577L25.7035 20.9773L24.5418 16.9114ZM27.6173 27.5H32.4201L31.7813 19.1955L30.3288 17.743L29.6802 14.5H27.2852L26.3386 15.9199L27.7965 21.0227L27.0233 23.3423L27.6173 27.5Z" />
      )}
    </svg>
  );
}

export default IconMarker;
