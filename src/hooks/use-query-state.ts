"use client";

import { useState, useCallback, Dispatch, SetStateAction } from "react";

// Type definitions to match next-usequerystate API
export type UseQueryStateReturn<T, Default = T> = [
  T,
  (value: T | null | ((prev: T) => T | null)) => void
];

// Parser interface
interface Parser<T> {
  parse: (value: string) => T;
  serialize: (value: T) => string;
  withDefault: (defaultValue: T) => Parser<T> & { defaultValue: T };
  defaultValue?: T;
}

// String parser
export const parseAsString: Parser<string> = {
  parse: (value: string) => value,
  serialize: (value: string) => value,
  withDefault: (defaultValue: string) => ({
    ...parseAsString,
    defaultValue,
  }),
};

// Integer parser
export const parseAsInteger: Parser<number> = {
  parse: (value: string) => parseInt(value, 10),
  serialize: (value: number) => value.toString(),
  withDefault: (defaultValue: number) => ({
    ...parseAsInteger,
    defaultValue,
  }),
};

// Boolean parser
export const parseAsBoolean: Parser<boolean> = {
  parse: (value: string) => value === "true",
  serialize: (value: boolean) => value.toString(),
  withDefault: (defaultValue: boolean) => ({
    ...parseAsBoolean,
    defaultValue,
  }),
};

// Array parser
export const parseAsArrayOf = <T,>(
  itemParser: Parser<T>
): Parser<T[]> & {
  withDefault: (defaultValue: T[]) => Parser<T[]> & { defaultValue: T[] };
} => ({
  parse: (value: string) => {
    if (!value) return [];
    return value.split(",").map((item) => itemParser.parse(item));
  },
  serialize: (value: T[]) => {
    return value.map((item) => itemParser.serialize(item)).join(",");
  },
  withDefault: (defaultValue: T[]) => ({
    parse: (value: string) => {
      if (!value) return defaultValue;
      return value.split(",").map((item) => itemParser.parse(item));
    },
    serialize: (value: T[]) => {
      return value.map((item) => itemParser.serialize(item)).join(",");
    },
    withDefault: (newDefault: T[]) => parseAsArrayOf(itemParser).withDefault(newDefault),
    defaultValue,
  }),
});

// Main hook - minimal implementation using useState
export function useQueryState<T>(
  _key: string,
  parser: Parser<T> & { defaultValue?: T }
): UseQueryStateReturn<T> {
  const defaultValue = parser.defaultValue as T;
  const [state, setState] = useState<T>(defaultValue);

  const setStateWrapper = useCallback(
    (value: T | null | ((prev: T) => T | null)) => {
      if (typeof value === "function") {
        setState((prev) => {
          const newValue = (value as (prev: T) => T | null)(prev);
          return newValue === null ? defaultValue : newValue;
        });
      } else {
        setState(value === null ? defaultValue : value);
      }
    },
    [defaultValue]
  );

  return [state, setStateWrapper];
}
