"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import Button from "@/components/ui/button";
import IconClose from "@/components/ui/icons/close";
import IconColumns from "@/components/ui/icons/columns";
import IconFilter from "@/components/ui/icons/filter";
import IconMap from "@/components/ui/icons/map";
import IconMore from "@/components/ui/icons/more";
import IconSearch from "@/components/ui/icons/search";
import IconSort from "@/components/ui/icons/sort";
import Link from "@/components/ui/link";
import { Option, Select } from "@/components/ui/select";
import TextField from "@/components/ui/text-field";
import {
  Country,
  Crag,
  Orientation,
  Season,
  WallAngle,
} from "@/graphql/generated";
import { gradingSystems } from "@/utils/grading-systems";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "next-usequerystate";
import { useCallback, useEffect, useRef, useState } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import CragListCards from "./crag-list-cards";
import CragListTable from "./crag-list-table";
import { filterEntitiesBySearchTerm } from "@/utils/search-helpers";
import {
  BooleanFilter,
  MultiFilter,
  NrInRangeFilter,
  RangeFilter,
} from "./filtersHelp";
import ActiveFilters from "./active-filters";
import FiltersPane from "./filters-pane";

type TCragListColumn = {
  name: string;
  label: string;
  width: number;
  isOptional: boolean;
};

type TFilteredCragsProps = {
  crags: Crag[];
  countries: Country[];
};

function FilteredCrags({ crags, countries }: TFilteredCragsProps) {
  // For now we can only filter by french grades. Will add other grading systems in a future task
  const frenchGrades = gradingSystems.find((gs) => gs.id === "french")?.grades!;

  const minDifficulty = frenchGrades[0].difficulty;
  const maxDifficulty = frenchGrades.slice(-1)[0].difficulty;
  const diffToGradeMap = frenchGrades.reduce((prev, cur) => {
    prev[cur.difficulty] = cur.name;
    return prev;
  }, {} as Record<string, string>);

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

  // TODO: rename this to filtersState or sthg and rename filtersData to filters...
  const [filters, setFilters] = useQueryStates({
    countries: parseAsArrayOf(parseAsString).withDefault([]),
    areas: parseAsArrayOf(parseAsString).withDefault([]),
    onMapOnly: parseAsBoolean.withDefault(false),
    routeTypes: parseAsArrayOf(parseAsString).withDefault([]),
    orientations: parseAsArrayOf(parseAsString).withDefault([]),
    difficulty: parseAsArrayOf(parseAsInteger).withDefault([
      0,
      minDifficulty,
      maxDifficulty,
    ]),
    seasons: parseAsArrayOf(parseAsString).withDefault([]),
    rainproof: parseAsBoolean.withDefault(false),
    wallAngles: parseAsArrayOf(parseAsString).withDefault([]),
    approachTime: parseAsArrayOf(parseAsInteger).withDefault([
      minApproachTime,
      maxApproachTime,
    ]),
    showUnknown: parseAsBoolean.withDefault(false),
  });

  // We need null in useQueryState value instead of default values (e.g. empty array) so that the query param dissapears from url if a certain filter not used
  type TEFilters = {
    countries: string[];
    areas: string[];
    onMapOnly: boolean;
    routeTypes: string[];
    orientations: string[];
    difficulty: number[];
    seasons: string[];
    rainproof: boolean;
    wallAngles: string[];
    approachTime: number[];
    showUnknown: boolean;
  };

  type TNFilters = {
    [P in keyof TEFilters]: TEFilters[P] | null;
  };

  /**
   * converts all values that are at their default to null, which makes the param dissapear from url
   */
  function defaultToNull(filters: TEFilters) {
    return {
      countries: filters.countries.length ? filters.countries : null,
      areas: filters.areas.length ? filters.areas : null,
      onMapOnly: filters.onMapOnly || null,
      routeTypes: filters.routeTypes.length ? filters.routeTypes : null,
      orientations: filters.orientations.length ? filters.orientations : null,
      difficulty: filters.difficulty[0] !== 0 ? filters.difficulty : null,
      seasons: filters.seasons.length ? filters.seasons : null,
      rainproof: filters.rainproof || null,
      wallAngles: filters.wallAngles.length ? filters.wallAngles : null,
      approachTime:
        filters.approachTime[0] != minApproachTime ||
        filters.approachTime[1] != maxApproachTime
          ? filters.approachTime
          : null,
      showUnknown: filters.showUnknown || null,
    };
  }

  // Filter crags based on filters state
  let filteredCrags = crags.filter(
    (crag: Crag) =>
      //
      // country
      (filters.countries.includes(crag.country.slug) ||
        filters.countries.length == 0) &&
      //
      // area
      ((crag.area && filters.areas.includes(crag.area.slug)) ||
        filters.areas.length == 0) &&
      //
      // route types
      ((crag.hasSport && filters.routeTypes.includes("sport")) ||
        (crag.hasBoulder && filters.routeTypes.includes("boulder")) ||
        (crag.hasMultipitch && filters.routeTypes.includes("multipitch")) ||
        filters.routeTypes.length == 0) &&
      //
      // orientations
      ((crag.orientations &&
        crag.orientations.some((orientation) =>
          filters.orientations.includes(orientation.toLowerCase())
        )) ||
        (!crag.orientations && filters.showUnknown) ||
        filters.orientations.length == 0) &&
      //
      // difficulty
      ((filters.difficulty[0] > 0 &&
        Object.entries(crag.nrRoutesByGrade.french).reduce(
          (sum, [diff, nrRoutes]) =>
            +diff >= filters.difficulty[1] && +diff <= filters.difficulty[2]
              ? sum + (nrRoutes as number)
              : sum,
          0
        ) >= filters.difficulty[0]) ||
        filters.difficulty[0] == 0) &&
      //
      // seasons
      ((crag.seasons &&
        crag.seasons.some((season) =>
          filters.seasons.includes(season.toLowerCase())
        )) ||
        (!crag.seasons && filters.showUnknown) ||
        filters.seasons.length == 0) &&
      //
      // rainproof
      ((filters.rainproof && crag.rainproof) ||
        !filters.rainproof ||
        (crag.rainproof == null && filters.showUnknown)) &&
      //
      // wall angles
      ((crag.wallAngles &&
        crag.wallAngles.some((wallAngle) =>
          filters.wallAngles.includes(wallAngle.toLowerCase())
        )) ||
        (!crag.wallAngles && filters.showUnknown) ||
        filters.wallAngles.length == 0) &&
      //
      // approach time
      ((crag.approachTime &&
        filters.approachTime[0] <= crag.approachTime &&
        filters.approachTime[1] >= crag.approachTime) ||
        (!crag.approachTime && filters.showUnknown) ||
        (filters.approachTime[0] == minApproachTime &&
          filters.approachTime[1] == maxApproachTime))
  );

  // A list of countries to choose from in the filter pane (all countries)
  const shownCountries: Record<string, string> = {};
  countries
    .filter((country) => country.nrCrags > 0)
    .sort((c1, c2) => c1.name.localeCompare(c2.name))
    .forEach((country) => {
      shownCountries[country.slug] = country.name;
    });

  // A list of areas to choose from in the filter pane (only areas of countries currently visible)
  let shownAreas: Record<string, string> = {};
  filters.countries?.forEach((country) => {
    countries
      .find((c) => c.slug === country)
      ?.areas.filter((area) => area.nrCrags > 0)
      .forEach((area) => {
        shownAreas[area.slug] = area.name;
      });
  });
  shownAreas = Object.fromEntries(
    Object.entries(shownAreas).sort(([aName1, _aSlug1], [aName2, _aSlug2]) =>
      aName1.localeCompare(aName2)
    )
  );

  const filtersData = {
    country: new MultiFilter(
      "Država",
      filters.countries,
      shownCountries,
      5,
      handleCountryFilterChange,
      handleCountryFilterReset
    ),

    area: new MultiFilter(
      "Območje",
      filters.areas,
      shownAreas,
      5,
      (checked, area) => {
        handleMultiFilterChange("areas", checked, area);
      },
      () => {
        handleMultiFilterReset("areas");
      }
    ),

    onMapOnly: new BooleanFilter(
      "Prikaži samo vidna na zemljevidu",
      filters.onMapOnly,
      false,
      (checked) => {
        handleBooleanFilterChange("onMapOnly", checked);
      },
      () => {
        handleBooleanFilterChange("onMapOnly", false);
      }
    ),

    routeType: new MultiFilter(
      "Tip smeri",
      filters.routeTypes,
      {
        sport: "športne",
        boulder: "balvani",
        multipitch: "večraztežajne",
      },
      "all",
      (checked, routeType) => {
        handleMultiFilterChange("routeTypes", checked, routeType);
      },
      () => {
        handleMultiFilterReset("routeTypes");
      }
    ),

    orientation: new MultiFilter(
      "Orientacija",
      filters.orientations,
      {
        [Orientation.North.toLowerCase()]: "sever",
        [Orientation.Northeast.toLowerCase()]: "severovzhod",
        [Orientation.East.toLowerCase()]: "vzhod",
        [Orientation.Southeast.toLowerCase()]: "jugovzhod",
        [Orientation.South.toLowerCase()]: "jug",
        [Orientation.Southwest.toLowerCase()]: "jugozahod",
        [Orientation.West.toLowerCase()]: "zahod",
        [Orientation.Northwest.toLowerCase()]: "severozahod",
      },
      "all",
      (checked, orientation) => {
        handleMultiFilterChange("orientations", checked, orientation);
      },
      () => {
        handleMultiFilterReset("orientations");
      }
    ),

    difficulty: new NrInRangeFilter(
      "Težavnost",
      {
        nr: filters.difficulty[0],
        from: filters.difficulty[1],
        to: filters.difficulty[2],
      },
      "smer",
      diffToGradeMap,
      handleDifficultyFilterChange,
      () => {
        handleDifficultyFilterChange(0, minDifficulty, maxDifficulty);
      }
    ),

    season: new MultiFilter(
      "Sezona",
      filters.seasons,
      {
        [Season.Spring.toLowerCase()]: "pomlad",
        [Season.Summer.toLowerCase()]: "poletje",
        [Season.Autumn.toLowerCase()]: "jesen",
        [Season.Winter.toLowerCase()]: "zima",
      },
      "all",
      (checked, season) => {
        handleMultiFilterChange("seasons", checked, season);
      },
      () => {
        handleMultiFilterReset("seasons");
      }
    ),

    rainproof: new BooleanFilter(
      "Možno plezanje v dežju",
      filters.rainproof,
      false,
      (checked) => {
        handleBooleanFilterChange("rainproof", checked);
      },
      () => {
        handleBooleanFilterChange("rainproof", false);
      }
    ),

    wallAngle: new MultiFilter(
      "Naklon stene",
      filters.wallAngles,
      {
        [WallAngle.Slab.toLowerCase()]: "plošče",
        [WallAngle.Vertical.toLowerCase()]: "vertikale",
        [WallAngle.Overhang.toLowerCase()]: "previsi",
        [WallAngle.Roof.toLowerCase()]: "strehe",
      },
      "all",
      (checked, wallAngle) =>
        handleMultiFilterChange("wallAngles", checked, wallAngle),
      () => {
        handleMultiFilterReset("wallAngles");
      }
    ),

    approachTime: new RangeFilter(
      "Čas dostopa",
      { from: filters.approachTime[0], to: filters.approachTime[1] },
      minApproachTime,
      maxApproachTime,
      "min",
      handleApproachTimeFilterChange,
      () => {
        handleApproachTimeFilterChange(minApproachTime, maxApproachTime);
      }
    ),

    showUnknown: new BooleanFilter(
      "Prikaži tudi plezališča kjer so podatki neznani",
      filters.showUnknown,
      false,
      (checked) => {
        handleBooleanFilterChange("showUnknown", checked);
      },
      () => {
        handleBooleanFilterChange("showUnknown", false);
      }
    ),
  };

  function handleCountryFilterReset() {
    setFilters((filters) => {
      // remove country
      return defaultToNull({
        ...filters,
        countries: [],
        // when a country is removed, we should also remove all (possibly selected) areas of this country
        areas: [],
      });
    });
  }

  function handleCountryFilterChange(checked: boolean, country: string) {
    setFilters((filters) => {
      if (checked) {
        // add country
        return defaultToNull({
          ...filters,
          countries: [...filters.countries, country],
        });
      } else {
        // remove country
        return defaultToNull({
          ...filters,
          countries: filters.countries.filter((c) => c != country),

          // when a country is removed, we should also remove all (possibly selected) areas of this country
          areas: filters.areas.filter(
            (area) =>
              !countries
                .filter((c) => c.slug === country)[0]
                .areas.map((a) => a.slug)
                .includes(area)
          ),
        });
      }
    });
  }

  function handleBooleanFilterChange(filterName: string, checked: boolean) {
    setFilters((filters) => {
      return defaultToNull({ ...filters, [filterName]: checked });
    });
  }

  function handleMultiFilterChange(
    filterName:
      | "countries"
      | "areas"
      | "routeTypes"
      | "orientations"
      | "seasons"
      | "wallAngles",
    checked: boolean,
    valueChanged: string
  ) {
    setFilters((filters) => {
      if (checked) {
        // add the value to the group (check it)
        return defaultToNull({
          ...filters,
          [filterName]: [...filters[filterName], valueChanged],
        });
      } else {
        // remove the changed value (uncheck) from the group
        return defaultToNull({
          ...filters,
          [filterName]: filters[filterName].filter((v) => v != valueChanged),
        });
      }
    });
  }

  function handleMultiFilterReset(filterName: string) {
    setFilters((filters) => {
      // remove all (uncheck) values from the group
      return defaultToNull({
        ...filters,
        [filterName]: [],
      });
    });
  }

  function handleDifficultyFilterChange(nr: number, from: number, to: number) {
    setFilters((filters) => {
      return defaultToNull({ ...filters, difficulty: [nr, from, to] });
    });
  }

  function handleApproachTimeFilterChange(min: number, max: number) {
    setFilters((filters) => {
      return defaultToNull({
        ...filters,
        approachTime: [min, max],
      });
    });
  }

  function handleResetAllFilters() {
    setFilters((filters) => {
      const resetFilters = {} as TNFilters;
      for (let key in filters) {
        resetFilters[key as keyof TNFilters] = null;
      }
      return resetFilters;
    });
  }

  // On smaller screens filter pane can be collapsed
  const [filtersPaneOpened, setFiltersPaneOpened] = useState(false);
  const handleToggleFilterPane = () => {
    setFiltersPaneOpened(!filtersPaneOpened);
  };

  // Do we expect routes and boulders? -> adjust column label accordingly
  let nrRoutesLabel;
  let nrRoutesWidth;

  // TODO: should we really adjust col size based on types of routes -> this causes unpredictable results, that is same column selection but different filter, could change display type between card/table...
  if (
    (filters.routeTypes.includes("boulder") &&
      (filters.routeTypes.includes("sport") ||
        filters.routeTypes.includes("multipitch"))) ||
    filters.routeTypes.length == 0
  ) {
    nrRoutesLabel = "Št. smeri/problemov";
    nrRoutesWidth = 200;
  } else if (
    filters.routeTypes.includes("boulder") &&
    !(
      filters.routeTypes.includes("sport") ||
      filters.routeTypes.includes("multipitch")
    )
  ) {
    nrRoutesLabel = "Št. problemov";
    nrRoutesWidth = 144;
  } else {
    nrRoutesLabel = "Št. smeri";
    nrRoutesWidth = 100;
  }

  const cragListColumns: TCragListColumn[] = [
    { name: "name", label: "Ime", width: 200, isOptional: false },
    { name: "difficulty", label: "Težavnost", width: 152, isOptional: true },
    {
      name: "nrRoutes",
      label: nrRoutesLabel,
      width: nrRoutesWidth,
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

  const [selectedColumns, setSelectedColumns] = useState([
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
      setSelectedColumns(JSON.parse(columns));
    }
  }, []);

  function handleSelectedColumnsChange(columns: string[]) {
    setSelectedColumns(columns);
    localStorage.setItem("crags-columns", JSON.stringify(columns));
  }

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("name,asc")
  );

  // Sort crags based on sort state
  const [sortField, sortDir] = sort.split(",");
  const numericalDirection = sortDir === "asc" ? 1 : -1;
  const collator = new Intl.Collator("sl");

  filteredCrags.sort((c1, c2) => {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  // Filter crags based on search term
  if (searchQuery) {
    filteredCrags = filterEntitiesBySearchTerm(filteredCrags, searchQuery);
  }

  const searchFieldRef = useRef<HTMLInputElement>(null);
  const handleSearchIconClick = () => {
    setSearchFocus(true);

    setTimeout(() => {
      searchFieldRef.current && searchFieldRef.current.focus();
    }, 0);
  };

  const [compact, setCompact] = useState<boolean | null>(null);

  const neededWidth = selectedColumns
    .map(
      (colName) =>
        cragListColumns.find(
          (column) => column.name == colName
        ) as TCragListColumn
    )
    .reduce((sum, { width }) => sum + width, -32);

  const onResize = useCallback(
    (target: HTMLDivElement, entry: ResizeObserverEntry) => {
      const availableWidth = entry.contentRect.width;
      setCompact(availableWidth < neededWidth);
    },
    [neededWidth]
  );
  const containerRef = useResizeObserver(onResize);

  return (
    <>
      <ContentHeader
        heading="Plezališča"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Plezanje.net", link: "/" },
              { label: "Plezališča", link: "" },
            ]}
          />
        }
      />

      {/* Actions row */}
      {/* 
        for <sm: all icons, including search are displayed centered.
        for >=sm: search icon becomes search text field and sticks right, all other icons stick left
        for <md: filter pane is triggered by filter icon
        for >=md: filter pane is always visible, filter icon dissapears
      */}

      <div
        className={`x-auto relative z-10 mx-auto rotate-0 items-center justify-center border-b border-b-neutral-200 px-4 2xl:container xs:px-8 sm:justify-between md:border-b-0 ${
          searchFocus || searchQuery ? "block sm:flex" : "flex justify-center"
        }`}
      >
        <div className="flex items-center justify-center py-4 sm:py-5">
          <Button variant="quaternary">
            <div className="flex">
              <IconMap />
              <span className="ml-2 max-lg:hidden">Pokaži zemljevid</span>
            </div>
          </Button>

          <div className="flex items-center md:hidden">
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
            <Button variant="quaternary" onClick={handleToggleFilterPane}>
              <IconFilter />
            </Button>
          </div>

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Select
            multi
            customTrigger={
              <Button variant="quaternary">
                <div className="flex">
                  <IconColumns />
                  <span className="ml-2 max-lg:hidden">Izberi stolpce</span>
                </div>
              </Button>
            }
            value={selectedColumns}
            onChange={(columns: string[]) =>
              handleSelectedColumnsChange(columns)
            }
          >
            {cragListColumns
              .filter((column) => column.isOptional)
              .map((column) => (
                <Option key={column.name} value={column.name}>
                  {column.label}
                </Option>
              ))}
          </Select>

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Select
            customTrigger={
              <Button variant="quaternary">
                <div className="flex">
                  <IconSort />
                  <span className="ml-2 max-lg:hidden">Uredi</span>
                </div>
              </Button>
            }
            value={sort}
            onChange={setSort}
          >
            <Option value="name,asc">Po abecedi, naraščajoče</Option>
            <Option value="name,desc">Po abecedi, padajoče</Option>
            <Option value="nrRoutes,asc">Po št. smeri, naraščajoče</Option>
            <Option value="nrRoutes,desc">Po št. smeri, padajoče</Option>
            <Option value="maxDifficulty,asc">
              Po najtežji smeri, naraščajoče
            </Option>
            <Option value="maxDifficulty,desc">
              Po najtežji smeri, padajoče
            </Option>
            <Option value="minDifficulty,asc">
              Po najlažji smeri, naraščajoče
            </Option>
            <Option value="minDifficulty,desc">
              Po najlažji smeri, padajoče
            </Option>
            <Option value="approachTime,asc">
              Po času dostopa, naraščajoče
            </Option>
            <Option value="approachTime,desc">Po času dostopa, padajoče</Option>
          </Select>

          <div className="flex items-center sm:hidden">
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
            <Button variant="quaternary" onClick={handleSearchIconClick}>
              <IconSearch />
            </Button>
          </div>

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
          <Button variant="quaternary">
            <IconMore />
          </Button>
        </div>

        <div
          className={`min-w-0 sm:ml-8 sm:w-80 ${
            searchFocus || searchQuery
              ? "mb-6 block sm:mb-0"
              : "hidden sm:block"
          }`}
        >
          <TextField
            ref={searchFieldRef}
            value={searchQuery}
            onChange={setSearchQuery}
            onBlur={() => setSearchFocus(false)}
            prefix={<IconSearch />}
            placeholder="Poišči po imenu"
            aria-label="Poišči po imenu"
            suffix={
              searchQuery && (
                <Button variant="quaternary" onClick={() => setSearchQuery("")}>
                  <IconClose />
                </Button>
              )
            }
          />
        </div>
      </div>

      {/* Main content */}

      <div className="mx-auto flex items-start 2xl:container md:px-8">
        <FiltersPane
          open={filtersPaneOpened}
          filtersData={filtersData}
          onResetAll={handleResetAllFilters}
        />

        {/* List of crags */}
        <div
          className={`w-full overflow-hidden md:ml-5 ${
            compact === null ? "opacity-0" : ""
          }`}
        >
          {/* Filters chips */}
          <ActiveFilters filters={filtersData} />

          <div
            ref={containerRef}
            className="px-4 xs:px-8 md:border-t md:border-t-neutral-200 md:px-0"
          >
            {compact ? (
              <CragListCards
                crags={filteredCrags}
                columns={Object.values(cragListColumns).filter((column) =>
                  selectedColumns.includes(column.name)
                )}
              />
            ) : (
              filteredCrags.length > 0 && (
                <CragListTable
                  crags={filteredCrags}
                  columns={Object.values(cragListColumns).filter((column) =>
                    selectedColumns.includes(column.name)
                  )}
                />
              )
            )}
            <div className="pt-4 text-center">
              {filteredCrags.length == 0 ? (
                <>Ni plezališč, ki bi ustrezali izbranim filtrom.</>
              ) : (
                <>
                  Plezališča, ki ga iščeš, ni na seznamu?{" "}
                  <Link href="">Dodaj plezališče.</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilteredCrags;
export type { TCragListColumn };
