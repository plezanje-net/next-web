import { Checkbox } from "@headlessui/react";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
} from "react";

type TSelectorContext = {
  checkedOptions: string[];
  setCheckedOptions: (checked: boolean, value: string) => void;
};

const SelectorContext = createContext<TSelectorContext | undefined>(undefined);

function useSelectorContext() {
  const selectorContext = useContext(SelectorContext);
  if (selectorContext === undefined) {
    throw new Error("useSelectorContext must be used within a Selector");
  }
  return selectorContext;
}

type TSelectorProps = {
  label?: string;
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  children: ReactElement<TSelectorOptionProps>[];
};

function Selector({
  label,
  value,
  onChange: onCheckedOptionsChange,
  children,
}: TSelectorProps) {
  const setCheckedOptions = (checked: boolean, optionValue: string) => {
    if (checked) {
      onCheckedOptionsChange((checkedOptions) => [
        ...checkedOptions,
        optionValue,
      ]);
    } else {
      onCheckedOptionsChange((checkedOptions) => {
        const newCheckedOptions = checkedOptions.filter(
          (co) => co != optionValue
        );
        return newCheckedOptions;
      });
    }
  };

  return (
    <SelectorContext.Provider
      value={{
        checkedOptions: value,
        setCheckedOptions,
      }}
    >
      <div>{label}</div>
      <div className="mt-2 flex flex-wrap justify-center gap-2">{children}</div>
    </SelectorContext.Provider>
  );
}

type TSelectorOptionProps = {
  value: string;
  children: ReactElement | string;
};

function SelectorOption({
  value: optionValue,
  children,
}: TSelectorOptionProps) {
  const { checkedOptions, setCheckedOptions } = useSelectorContext();

  return (
    <Checkbox
      checked={checkedOptions.includes(optionValue)}
      onChange={(checked) => setCheckedOptions(checked, optionValue)}
      className="flex flex-col items-center rounded-lg border px-5 py-3 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-100
    cursor-pointer border-white data-[checked]:text-blue-500 data-[checked]:border-neutral-400"
    >
      {children}
    </Checkbox>
  );
}

export { Selector, SelectorOption };
