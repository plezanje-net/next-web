import { Description, Field, Label, Textarea } from "@headlessui/react";

type TTextAreaProps = {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  disabled?: boolean;
  rows?: number;
  readOnly?: boolean;
};

function TextArea({
  name,
  value,
  onChange,
  onFocus,
  label,
  placeholder,
  description,
  errorMessage,
  disabled,
  rows = 6,
  readOnly = false,
}: TTextAreaProps) {
  return (
    <Field disabled={disabled}>
      {label && <Label className="mb-2 block">{label}</Label>}

      <Textarea
        readOnly={readOnly}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        rows={rows}
        placeholder={placeholder}
        className={`block w-full py-2 px-4 rounded-lg border outline-none focus:ring placeholder:text-neutral-400
          ${disabled ? "border-neutral-300 bg-neutral-100 text-neutral-400" : "border-neutral-400"}
          ${errorMessage ? "focus:ring-red-100 border-red-500" : "focus:ring-blue-100"}`}
      />

      {description && !errorMessage && (
        <Description className="text-sm mt-1">{description}</Description>
      )}

      {errorMessage && (
        <div className="text-sm mt-1 text-red-500">{errorMessage}</div>
      )}
    </Field>
  );
}

export default TextArea;
