"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TAscentListColumn = {
  name: string;
  label: string;
  width: number;
  isOptional: boolean;
};

type TAscentsContext = {
  columns: {
    all: TAscentListColumn[];
    shown: TAscentListColumn[];
    selectedState: string[];
    setSelectedState: (columns: string[]) => void;
  };
};
const AscentsContext = createContext<TAscentsContext | undefined>(undefined);

type TAscentsProviderProps = {
  children: ReactNode;
};

function AscentsProvider({ children }: TAscentsProviderProps) {
  const allColumns = [
    { name: "date", label: "Datum", width: 99, isOptional: false },
    { name: "crag", label: "Plezališče", width: 100, isOptional: true },
    { name: "route", label: "Smer", width: 160, isOptional: true },
    { name: "difficulty", label: "Ocena", width: 99, isOptional: true },
    { name: "ascentType", label: "Način vzpona", width: 180, isOptional: true },
    { name: "notes", label: "Opombe", width: 150, isOptional: true },
    { name: "visibility", label: "Vidnost", width: 150, isOptional: true },
    { name: "more", label: "", width: 24, isOptional: false },
  ];

  const [columnsState, setSelectedColumnsState] = useState([
    "date",
    "name",
    "crag",
    "route",
    "difficulty",
    "ascentType",
    "notes",
    "visibility",
    "more",
  ]);

  useEffect(() => {
    const columns = localStorage.getItem("ascents-columns");
    if (columns) {
      setSelectedColumnsState(JSON.parse(columns));
    }
  }, []);

  function handleSelectedColumnsChange(columns: string[]) {
    setSelectedColumnsState(columns);
    localStorage.setItem("ascents-columns", JSON.stringify(columns));
  }

  const shownColumns = allColumns.filter((c) => columnsState.includes(c.name));

  return (
    <AscentsContext.Provider
      value={{
        columns: {
          all: allColumns,
          shown: shownColumns,
          selectedState: columnsState,
          setSelectedState: handleSelectedColumnsChange,
        },
      }}
    >
      {children}
    </AscentsContext.Provider>
  );
}

function useAscentsContext() {
  const ascentsContext = useContext(AscentsContext);
  if (ascentsContext === undefined) {
    throw new Error("useAscentsContext must be used within a AscentsProvider");
  }
  return ascentsContext;
}

export { AscentsProvider, useAscentsContext };
