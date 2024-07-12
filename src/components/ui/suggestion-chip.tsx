type TSuggestionChipProps = {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: string;
};

function SuggestionChip({
  active,
  onClick,
  disabled = false,
  children,
}: TSuggestionChipProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border px-3 py-1 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 ${
        active
          ? disabled
            ? "bg-neutral-100 border-neutral-100 text-neutral-400"
            : "bg-blue-50 border-blue-50"
          : disabled
            ? "bg-white border-neutral-200 text-neutral-400"
            : "border-neutral-400"
      }`}
    >
      {children}
    </button>
  );
}

export default SuggestionChip;
