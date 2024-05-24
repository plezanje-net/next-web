type TSuggestionChip = {
  active: boolean;
  onClick: () => void;
  children: string;
};
function SuggestionChip({ active, onClick, children }: TSuggestionChip) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg  border px-3 py-1 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100 ${
        active ? "border-blue-50 bg-blue-50" : "border-neutral-400"
      }`}
    >
      {children}
    </button>
  );
}

export default SuggestionChip;
