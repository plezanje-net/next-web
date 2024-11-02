"use client";

import {
  Area,
  Country,
  Crag,
  Orientation,
  Season,
  WallAngle,
} from "@/graphql/generated";
import { gradingSystems } from "@/utils/grading-systems";
import { filterEntitiesBySearchTerm } from "@/utils/search-helpers";
import { pluralizeNoun } from "@/utils/text-helpers";
import {
  UseQueryStateReturn,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "next-usequerystate";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TFilter = {
  type: string;
  label: string;
  isActive: boolean;
  stringValue: string;
  onReset: () => void;
};

type TMultiFilter = TFilter & {
  state: string[];
  options: Record<string, string>;
  nrShown: number | "all";
  onChange: (checked: boolean, option: string) => void;
};

type TDifficultyFilter = TFilter & {
  state: number[];
  difficultyGradeMap: Record<string, string>;
  onChange: (nr: number, from: number, to: number) => void;
};

type TBooleanFilter = TFilter & {
  state: boolean;
  onChange: (checked: boolean) => void;
};

type TApproachTimeFilter = TFilter & {
  state: number[];
  minApproachTime: number;
  maxApproachTime: number;
  onChange: (from: number, to: number) => void;
};

type TCragListColumn = {
  name: string;
  label: string;
  width: number;
  isOptional: boolean;
};

type TCragsContext = {
  crags: Crag[];
  filters: { filters: TFilter[]; resetAll: () => void };
  filtersPane: {
    open: boolean;
    toggleOpen: () => void;
  };
  columns: {
    all: TCragListColumn[];
    shown: TCragListColumn[];
    selectedState: string[];
    setSelectedState: (columns: string[]) => void;
  };
  sort: {
    sort: string;
    setSort: UseQueryStateReturn<string, string>[1];
  };
  search: {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
  };
};
const CragsContext = createContext<TCragsContext | undefined>(undefined);

type TCragsProviderProps = {
  allCrags: Crag[];
  allCountries: Country[];
  children: ReactNode;
};

function CragsProvider({
  allCrags,
  allCountries,
  children,
}: TCragsProviderProps) {
  //
  // ---------------- Filters ----------------
  //

  const [countryFilterState, setCountryFilterState] = useQueryState(
    "country",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [areaFilterState, setAreaFilterState] = useQueryState(
    "area",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [onMapOnlyFilterState, setOnMapOnlyFilterState] = useQueryState(
    "onMapOnly",
    parseAsBoolean.withDefault(false)
  );

  const [routeTypeFilterState, setRouteTypeFilterState] = useQueryState(
    "routeType",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [orientationFilterState, setOrientationFilterState] = useQueryState(
    "orientation",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const { minDifficulty, maxDifficulty } = getMinMaxDifficulty();
  const [difficultyFilterState, setDifficultyFilterState] = useQueryState(
    "difficulty",
    parseAsArrayOf(parseAsInteger).withDefault([
      0,
      minDifficulty,
      maxDifficulty,
    ])
  );

  const [seasonFilterState, setSeasonFilterState] = useQueryState(
    "season",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [rainproofFilterState, setRainproofFilterState] = useQueryState(
    "rainproof",
    parseAsBoolean.withDefault(false)
  );

  const [wallAngleFilterState, setWallAngleFilterState] = useQueryState(
    "wallAngle",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const { minApproachTime, maxApproachTime } = getMinMaxApproachTime(allCrags);
  const [approachTimeFilterState, setApproachTimeFilterState] = useQueryState(
    "approachTime",
    parseAsArrayOf(parseAsInteger).withDefault([
      minApproachTime,
      maxApproachTime,
    ])
  );

  const [showUnknownFilterState, setShowUnknownFilterState] = useQueryState(
    "showUnknown",
    parseAsBoolean.withDefault(false)
  );

  // Filter crags based on filters states
  let crags = allCrags.filter(
    (crag: Crag) =>
      //
      // country
      (countryFilterState.includes(crag.country.slug) ||
        countryFilterState.length == 0) &&
      //
      // area
      ((crag.area && areaFilterState.includes(crag.area.slug)) ||
        areaFilterState.length == 0) &&
      //
      // route types
      ((crag.hasSport && routeTypeFilterState.includes("sport")) ||
        (crag.hasBoulder && routeTypeFilterState.includes("boulder")) ||
        (crag.hasMultipitch && routeTypeFilterState.includes("multipitch")) ||
        routeTypeFilterState.length == 0) &&
      //
      // orientations
      ((crag.orientations &&
        crag.orientations.some((orientation) =>
          orientationFilterState.includes(orientation)
        )) ||
        (!crag.orientations && showUnknownFilterState) ||
        orientationFilterState.length == 0) &&
      //
      // difficulty
      ((difficultyFilterState[0] > 0 &&
        Object.entries(crag.nrRoutesByGrade.french).reduce(
          (sum, [diff, nrRoutes]) =>
            +diff >= difficultyFilterState[1] &&
            +diff <= difficultyFilterState[2]
              ? sum + (nrRoutes as number)
              : sum,
          0
        ) >= difficultyFilterState[0]) ||
        difficultyFilterState[0] == 0) &&
      //
      // seasons
      ((crag.seasons &&
        crag.seasons.some((season) => seasonFilterState.includes(season))) ||
        (!crag.seasons && showUnknownFilterState) ||
        seasonFilterState.length == 0) &&
      //
      // rainproof
      ((rainproofFilterState && crag.rainproof) ||
        !rainproofFilterState ||
        (crag.rainproof == null && showUnknownFilterState)) &&
      //
      // wall angles
      ((crag.wallAngles &&
        crag.wallAngles.some((wallAngle) =>
          wallAngleFilterState.includes(wallAngle)
        )) ||
        (!crag.wallAngles && showUnknownFilterState) ||
        wallAngleFilterState.length == 0) &&
      //
      // approach time
      ((crag.approachTime &&
        approachTimeFilterState[0] <= crag.approachTime &&
        approachTimeFilterState[1] >= crag.approachTime) ||
        (!crag.approachTime && showUnknownFilterState) ||
        (approachTimeFilterState[0] == minApproachTime &&
          approachTimeFilterState[1] == maxApproachTime))
  );

  // construct filter objects used to pass relevant data down to child components via context
  const shownCountries = getShownCountries(allCountries);
  const shownCountriesMap = getSlugToNameMap(shownCountries);
  const selectedCountries = allCountries.filter((c) =>
    countryFilterState.includes(c.slug)
  );
  const countryFilter = {
    type: "multi",
    label: "Država",
    isActive: countryFilterState.length > 0,
    options: shownCountriesMap,
    nrShown: 5,
    stringValue: countryFilterState
      .map((cKey) => shownCountriesMap[cKey])
      .join(", "),
    state: countryFilterState,
    onReset: () => {
      setCountryFilterState(null);
      setAreaFilterState(null);
    },
    onChange: (checked: boolean, countryOption: string) => {
      handleMultiFilterChange(checked, countryOption, setCountryFilterState);
      if (!checked) {
        // when a country is deselected, we should also deselect all (possibly selected) areas of this country
        const deselectedCountry = shownCountries.find(
          (c) => c.slug == countryOption
        );
        if (!deselectedCountry) {
          return;
        }
        const areasToDeselect = deselectedCountry.areas.map((a) => a.slug);
        setAreaFilterState((afs) =>
          afs.filter((a) => !areasToDeselect.includes(a))
        );
      }
    },
  };

  const shownAreas = getShownAreas(selectedCountries);
  const shownAreasMap = getSlugToNameMap(shownAreas);
  const areaFilter = constructMultiFilter(
    "Območje",
    areaFilterState,
    shownAreasMap,
    5,
    setAreaFilterState
  );

  const onMapOnlyFilter = constructBooleanFilter(
    "Prikaži samo vidna na zemljevidu",
    onMapOnlyFilterState,
    setOnMapOnlyFilterState
  );

  const routeTypeFilter = constructMultiFilter(
    "Tip smeri",
    routeTypeFilterState,
    {
      sport: "športne",
      boulder: "balvani",
      multipitch: "večraztežajne",
    },
    "all",
    setRouteTypeFilterState
  );

  const orientationFilter = constructMultiFilter(
    "Orientacija",
    orientationFilterState,
    {
      [Orientation.North]: "sever",
      [Orientation.Northeast]: "severovzhod",
      [Orientation.East]: "vzhod",
      [Orientation.Southeast]: "jugovzhod",
      [Orientation.South]: "jug",
      [Orientation.Southwest]: "jugozahod",
      [Orientation.West]: "zahod",
      [Orientation.Northwest]: "severozahod",
    },
    "all",
    setOrientationFilterState
  );

  const difficultyGradeMap = getDifficultyGradeMap();
  const difficultyFilter = {
    type: "difficulty",
    label: "Težavnost",
    isActive: difficultyFilterState[0] != 0,
    stringValue: `vsaj ${pluralizeNoun("smer", difficultyFilterState[0])} med ${
      difficultyGradeMap[difficultyFilterState[1]]
    } in ${difficultyGradeMap[difficultyFilterState[2]]}`,
    state: difficultyFilterState,
    difficultyGradeMap,
    onReset: () => setDifficultyFilterState(null),
    onChange: (nr: number, from: number, to: number) => {
      setDifficultyFilterState([nr, from, to]);
    },
  };

  const seasonFilter = constructMultiFilter(
    "Sezona",
    seasonFilterState,
    {
      [Season.Spring]: "pomlad",
      [Season.Summer]: "poletje",
      [Season.Autumn]: "jesen",
      [Season.Winter]: "zima",
    },
    "all",
    setSeasonFilterState
  );

  const rainproofFilter = constructBooleanFilter(
    "Možno plezanje v dežju",
    rainproofFilterState,
    setRainproofFilterState
  );

  const wallAngleFilter = constructMultiFilter(
    "Naklon stene",
    wallAngleFilterState,
    {
      [WallAngle.Slab]: "plošče",
      [WallAngle.Vertical]: "vertikale",
      [WallAngle.Overhang]: "previsi",
      [WallAngle.Roof]: "strehe",
    },
    "all",
    setWallAngleFilterState
  );

  const approachTimeFilter = {
    type: "approachTime",
    label: "Čas dostopa",
    isActive:
      approachTimeFilterState[0] != minApproachTime ||
      approachTimeFilterState[1] != maxApproachTime,
    stringValue: `${approachTimeFilterState[0]}-${approachTimeFilterState[1]} min`,
    state: approachTimeFilterState,
    minApproachTime: minApproachTime,
    maxApproachTime: maxApproachTime,
    onReset: () => setApproachTimeFilterState(null),
    onChange: (from: number, to: number) => {
      if (from == minApproachTime && to == maxApproachTime) {
        setApproachTimeFilterState(null);
      } else {
        setApproachTimeFilterState([from, to]);
      }
    },
  };

  const showUnknownFilter = constructBooleanFilter(
    "Prikaži tudi plezališča kjer so podatki neznani",
    showUnknownFilterState,
    setShowUnknownFilterState
  );

  const filters = [
    countryFilter,
    areaFilter,
    onMapOnlyFilter,
    routeTypeFilter,
    orientationFilter,
    difficultyFilter,
    seasonFilter,
    rainproofFilter,
    wallAngleFilter,
    approachTimeFilter,
    showUnknownFilter,
  ];

  const handleResetAllFilters = () => {
    filters.forEach((filter) => filter.onReset());
  };

  //
  // ---------------- Filters pane ----------------
  //

  // On smaller screens filters pane can be collapsed
  const [filtersPaneOpened, setFiltersPaneOpened] = useState(false);
  const handleToggleFiltersPane = () => {
    setFiltersPaneOpened(!filtersPaneOpened);
  };

  //
  // ---------------- Columns ----------------
  //

  const allColumns = [
    { name: "name", label: "Ime", width: 200, isOptional: false },
    { name: "difficulty", label: "Težavnost", width: 152, isOptional: true },
    {
      name: "nrRoutes",
      label: "Št. smeri",
      width: 100,
      isOptional: true,
    },
    {
      name: "orientations",
      label: "Orientacija",
      width: 120,
      isOptional: true,
    },
    {
      name: "approachTime",
      label: "Čas dostopa",
      width: 136,
      isOptional: true,
    },
    { name: "seasons", label: "Sezona", width: 136, isOptional: true },
    { name: "wallAngles", label: "Naklon stene", width: 136, isOptional: true },
    {
      name: "rainproof",
      label: "Možno plezanje v dežju",
      width: 216,
      isOptional: true,
    },
    { name: "routeTypes", label: "Tip smeri", width: 168, isOptional: true },
    { name: "country", label: "Država", width: 120, isOptional: true },
    { name: "area", label: "Območje", width: 136, isOptional: true },
  ];

  const [columnsState, setSelectedColumnsState] = useState([
    "name",
    "difficulty",
    "nrRoutes",
    "orientations",
    "approachTime",
    "seasons",
    "wallAngles",
    "rainproof",
  ]);

  useEffect(() => {
    const columns = localStorage.getItem("crags-columns");
    if (columns) {
      setSelectedColumnsState(JSON.parse(columns));
    }
  }, []);

  function handleSelectedColumnsChange(columns: string[]) {
    setSelectedColumnsState(columns);
    localStorage.setItem("crags-columns", JSON.stringify(columns));
  }

  const shownColumns = allColumns.filter((c) => columnsState.includes(c.name));

  //
  // ---------------- Sort ----------------
  //

  // Sort crags based on sort state
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("name,asc")
  );
  const [sortField, sortDir] = sort.split(",");
  const numericalDirection = sortDir === "asc" ? 1 : -1;
  const collator = new Intl.Collator("sl");

  crags.sort((c1, c2) => {
    switch (sortField) {
      case "name":
        return collator.compare(c1.name, c2.name) * numericalDirection;

      case "nrRoutes":
        return (c1.nrRoutes - c2.nrRoutes) * numericalDirection;

      case "maxDifficulty":
        return (
          ((c1.maxDifficulty || 0) - (c2.maxDifficulty || 0)) *
          numericalDirection
        );

      case "minDifficulty":
        return (
          ((c1.minDifficulty || 0) - (c2.minDifficulty || 0)) *
          numericalDirection
        );

      case "approachTime":
        return (
          ((c1.approachTime || 0) - (c2.approachTime || 0)) * numericalDirection
        );
    }
    return 0;
  });

  //
  // ---------------- Search ----------------
  //

  // Filter crags based on search query
  const [searchQuery, setSearchQuery] = useState("");
  if (searchQuery) {
    crags = filterEntitiesBySearchTerm(crags, searchQuery);
  }

  return (
    <CragsContext.Provider
      value={{
        crags: crags,
        filters: {
          filters: filters,
          resetAll: handleResetAllFilters,
        },
        filtersPane: {
          open: filtersPaneOpened,
          toggleOpen: handleToggleFiltersPane,
        },
        columns: {
          all: allColumns,
          shown: shownColumns,
          selectedState: columnsState,
          setSelectedState: handleSelectedColumnsChange,
        },
        sort: {
          sort: sort,
          setSort: setSort,
        },
        search: {
          query: searchQuery,
          setQuery: setSearchQuery,
        },
      }}
    >
      {children}
    </CragsContext.Provider>
  );
}

function useCragsContext() {
  const cragsContext = useContext(CragsContext);
  if (cragsContext === undefined) {
    throw new Error("useCragsContext must be used within a CragsProvider");
  }
  return cragsContext;
}

export { CragsProvider, useCragsContext };
export type {
  TMultiFilter,
  TBooleanFilter,
  TDifficultyFilter,
  TApproachTimeFilter,
};

//
// ---------------- Helpers ----------------
//

// A list of countries with at least 1 crag, sorted
const getShownCountries = (allCountries: Country[]) => {
  return allCountries
    .filter((c) => c.nrCrags > 0)
    .sort((c1, c2) => c1.name.localeCompare(c2.name));
};

// A list of areas belonging to any of the passed in countries with at least 1 crag, sorted
const getShownAreas = (selectedCountries: Country[]) => {
  return selectedCountries
    .flatMap((c) => c.areas)
    .filter((a) => a.nrCrags > 0)
    .sort((a1, a2) => a1.name.localeCompare(a2.name));
};

// From an array of 'full' entities construct a slug:name map object
const getSlugToNameMap = <T extends Area | Country>(entities: T[]) => {
  return entities.reduce((acc: Record<string, string>, obj: Area | Country) => {
    acc[obj.slug] = obj.name;
    return acc;
  }, {});
};

const getMinMaxDifficulty = () => {
  // For now we can only filter by french grades. Should add other grading systems in a future task?
  const frenchGrades = gradingSystems["french"].grades;

  return {
    minDifficulty: frenchGrades[0].difficulty,
    maxDifficulty: frenchGrades.slice(-1)[0].difficulty,
  };
};

const getDifficultyGradeMap = () => {
  const frenchGrades = gradingSystems["french"].grades;

  return frenchGrades.reduce((prev: Record<string, string>, cur) => {
    prev[cur.difficulty] = cur.name;
    return prev;
  }, {});
};

const getMinMaxApproachTime = (crags: Crag[]) => {
  const maxApproachTime = crags.reduce(
    (max, crag) =>
      crag.approachTime && crag.approachTime > max ? crag.approachTime : max,
    0
  );
  const minApproachTime = crags.reduce(
    (min, crag) =>
      crag.approachTime && crag.approachTime < min ? crag.approachTime : min,
    maxApproachTime
  );

  return { minApproachTime, maxApproachTime };
};

const constructBooleanFilter = (
  label: string,
  filterState: boolean,
  setFilterState: UseQueryStateReturn<boolean, boolean>[1]
) => {
  return {
    type: "boolean",
    label,
    isActive: filterState === true,
    stringValue: filterState ? "da" : "ne",
    state: filterState,
    onReset: () => setFilterState(null),
    onChange: (checked: boolean) => setFilterState(checked || null),
  };
};

const constructMultiFilter = (
  label: string,
  filterState: string[],
  options: Record<string, string>,
  nrShown: number | "all",
  setFilterState: UseQueryStateReturn<string[], []>[1]
) => {
  return {
    type: "multi",
    label,
    isActive: filterState.length > 0,
    options,
    nrShown,
    stringValue: filterState.map((key) => options[key]).join(", "),
    state: filterState,
    onReset: () => setFilterState(null),
    onChange: (checked: boolean, option: string) =>
      handleMultiFilterChange(checked, option, setFilterState),
  };
};

const handleMultiFilterChange = (
  checked: boolean,
  option: string,
  setFilter: UseQueryStateReturn<string[], []>[1]
) => {
  if (checked) {
    setFilter((filterState) => [...filterState, option]);
  } else {
    setFilter((filterState) => {
      const newFilterState = filterState.filter((o) => o != option);
      return newFilterState.length > 0 ? newFilterState : null;
    });
  }
};
