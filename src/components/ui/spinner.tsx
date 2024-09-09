function Spinner() {
  return (
    <svg
      className="animate-spin"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      role="status"
    >
      <circle
        className="animate-dash stroke-current"
        cx="12"
        cy="12"
        r="8"
        fill="none"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeDasharray="0 80"
        strokeDashoffset="0"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Spinner;
