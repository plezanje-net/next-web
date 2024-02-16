"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import IconClose from "@/components/ui/icons/close";
import IconCollapse from "@/components/ui/icons/collapse";
import IconColumns from "@/components/ui/icons/columns";
import IconExpand from "@/components/ui/icons/expand";
import IconFilter from "@/components/ui/icons/filter";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMap from "@/components/ui/icons/map";
import IconMore from "@/components/ui/icons/more";
import IconReset from "@/components/ui/icons/reset";
import IconSearch from "@/components/ui/icons/search";
import IconSort from "@/components/ui/icons/sort";
import Link from "@/components/ui/link";
import RangeSlider from "@/components/ui/range-slider";
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
  useQueryStates,
} from "next-usequerystate";
import { useState } from "react";

type TFilteredCragsProps = {
  crags: Crag[];
  countries: Country[];
};

function FilteredCrags({ crags, countries }: TFilteredCragsProps) {
  // For now we can only filter by french grades. Will add other grading systems in a future task
  const difficultyFilterDefault = [
    0,
    gradingSystems.find((gs) => (gs.id = "french"))?.grades[0].difficulty ||
      100,
    gradingSystems.find((gs) => (gs.id = "french"))?.grades.slice(-1)[0]
      .difficulty || 2100,
  ];

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

  const [filters, setFilters] = useQueryStates({
    countries: parseAsArrayOf(parseAsString).withDefault([]),
    areas: parseAsArrayOf(parseAsString).withDefault([]),
    onMapOnly: parseAsBoolean.withDefault(false),
    orientations: parseAsArrayOf(parseAsString).withDefault([]),
    difficulty: parseAsArrayOf(parseAsInteger).withDefault(
      difficultyFilterDefault
    ),
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
  const filteredCrags = crags.filter(
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
    .forEach((country) => (shownCountries[country.slug] = country.name));

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

  // TODO: dummy, until we determine how to handle this (divide crags or not)
  const routeTypes = {
    sport: "športne",
    boulder: "balvani",
    multipitch: "večraztežajne",
  };

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

  function handleAreaFilterChange(checked: boolean, area: string) {
    setFilters((filters) => {
      if (checked) {
        // add area
        return defaultToNull({ ...filters, areas: [...filters.areas, area] });
      } else {
        // remove area
        return defaultToNull({
          ...filters,
          areas: filters.areas.filter((a) => a != area),
        });
      }
    });
  }

  function handleOnMapOnlyFilterChange(checked: boolean) {
    setFilters((filters) => {
      return defaultToNull({ ...filters, onMapOnly: checked });
    });
  }

  function handleOrientationFilterChange(
    checked: boolean,
    orientation: string
  ) {
    setFilters((filters) => {
      if (checked) {
        // add orientation
        return defaultToNull({
          ...filters,
          orientations: [...filters.orientations, orientation],
        });
      } else {
        // remove orientation
        return defaultToNull({
          ...filters,
          orientations: filters.orientations.filter((a) => a != orientation),
        });
      }
    });
  }

  function handleDifficultyFilterChange(
    select: "minNrRoutes" | "minDifficulty" | "maxDifficulty",
    value: string
  ) {
    // update state
    setFilters((filters) => {
      const difficultyFilter = filters.difficulty;
      switch (select) {
        case "minNrRoutes":
          difficultyFilter[0] = +value;
          break;
        case "minDifficulty":
          difficultyFilter[1] = +value;
          break;
        case "maxDifficulty":
          difficultyFilter[2] = +value;
          break;
      }
      return defaultToNull({ ...filters, difficulty: difficultyFilter });
    });
  }

  function handleSeasonFilterChange(checked: boolean, season: string) {
    setFilters((filters) => {
      if (checked) {
        // add season
        return defaultToNull({
          ...filters,
          seasons: [...filters.seasons, season],
        });
      } else {
        // remove season
        return defaultToNull({
          ...filters,
          seasons: filters.seasons.filter((a) => a != season),
        });
      }
    });
  }

  function handleRainproofFilterChange(checked: boolean) {
    setFilters((filters) => {
      return defaultToNull({ ...filters, rainproof: checked });
    });
  }

  function handleWallAngleFilterChange(checked: boolean, wallAngle: string) {
    setFilters((filters) => {
      if (checked) {
        // add wall angle
        return defaultToNull({
          ...filters,
          wallAngles: [...filters.wallAngles, wallAngle],
        });
      } else {
        // remove wall angle
        return defaultToNull({
          ...filters,
          wallAngles: filters.wallAngles.filter((a) => a != wallAngle),
        });
      }
    });
  }

  function handleApproachTimeFilterChange(value: [number, number]) {
    setFilters((filters) => {
      return defaultToNull({
        ...filters,
        approachTime: value,
      });
    });
  }

  function handleShowUnknownFilterChange(checked: boolean) {
    setFilters((filters) => {
      return defaultToNull({ ...filters, showUnknown: checked });
    });
  }

  function handleResetFilters() {
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
      <div className="mx-auto flex items-center justify-center px-4 py-4 2xl:container xs:px-8 sm:justify-between">
        <div className="flex items-center justify-center">
          <Button variant="quaternary">
            <IconMap />
          </Button>

          <div className="flex items-center md:hidden">
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
            <Button variant="quaternary" onClick={handleToggleFilterPane}>
              <IconFilter />
            </Button>
          </div>

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Button variant="quaternary">
            <IconColumns />
          </Button>

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <Button variant="quaternary">
            <IconSort />
          </Button>

          <div className="flex items-center sm:hidden">
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
            <Button variant="quaternary">
              <IconSearch />
            </Button>
          </div>

          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>
          <Button variant="quaternary">
            <IconMore />
          </Button>
        </div>

        <div className="hidden min-w-0 xs:ml-8 xs:w-80 xs:border-none sm:block">
          <TextField
            prefix={<IconSearch />}
            placeholder="Poišči po imenu"
            aria-label="Poišči po imenu"
            suffix={
              <Button variant="quaternary">
                <IconClose />
              </Button>
            }
          />
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto flex items-start px-4 2xl:container xs:px-8">
        {/* Filters pane */}
        {/* on >=md pane is always visible and is displayed as a card
            on <md pane slides in from the side when filters are being changed */}
        <div
          className={`absolute left-0 w-80 shrink-0 rounded-r-lg bg-neutral-100 transition-transform md:relative md:block md:rounded-lg ${
            filtersPaneOpened
              ? "translate-x-0"
              : "-translate-x-80 md:translate-x-0"
          }`}
        >
          <div className="flex px-8 pb-1 pt-6">
            <div>
              <IconFilter />
            </div>
            <div className="ml-4">Filtriraj</div>
          </div>

          <CheckboxesFilterGroup
            title="Država"
            options={shownCountries}
            nrShown={5}
            checkedOptions={filters.countries}
            onChange={handleCountryFilterChange}
          />

          {Object.keys(shownAreas).length > 0 && (
            <CheckboxesFilterGroup
              title="Območje"
              options={shownAreas}
              nrShown={5}
              checkedOptions={filters.areas}
              onChange={(checked, area) => {
                handleAreaFilterChange(checked, area);
              }}
            />
          )}

          <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
            <Checkbox
              label="Prikaži samo vidna na zemljevidu"
              checked={filters.onMapOnly}
              onChange={handleOnMapOnlyFilterChange}
            />
          </div>

          <CheckboxesFilterGroup
            title="Tip smeri"
            options={routeTypes}
            nrShown="all"
            checkedOptions={[]}
            onChange={() => {
              console.log("dummy");
            }}
          />

          <CheckboxesFilterGroup
            title="Orientacija"
            options={{
              [Orientation.North.toLowerCase()]: "sever",
              [Orientation.Northeast.toLowerCase()]: "severovzhod",
              [Orientation.East.toLowerCase()]: "vzhod",
              [Orientation.Southeast.toLowerCase()]: "jugovzhod",
              [Orientation.South.toLowerCase()]: "jug",
              [Orientation.Southwest.toLowerCase()]: "jugozahod",
              [Orientation.West.toLowerCase()]: "zahod",
              [Orientation.Northwest.toLowerCase()]: "severozahod",
            }}
            nrShown="all"
            checkedOptions={filters.orientations}
            onChange={(checked, orientation) => {
              handleOrientationFilterChange(checked, orientation);
            }}
          />

          <DifficultyRangeFilterGroup
            filterState={filters.difficulty as [number, number, number]}
            onChange={handleDifficultyFilterChange}
          />

          <CheckboxesFilterGroup
            title="Sezona"
            options={{
              [Season.Spring.toLowerCase()]: "pomlad",
              [Season.Summer.toLowerCase()]: "poletje",
              [Season.Autumn.toLowerCase()]: "jesen",
              [Season.Winter.toLowerCase()]: "zima",
            }}
            nrShown="all"
            checkedOptions={filters.seasons}
            onChange={(checked, season) => {
              handleSeasonFilterChange(checked, season);
            }}
          />

          <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
            <Checkbox
              label="Možno plezanje v dežju"
              checked={filters.rainproof}
              onChange={handleRainproofFilterChange}
            />
          </div>

          <CheckboxesFilterGroup
            title="Naklon stene"
            options={{
              [WallAngle.Slab.toLowerCase()]: "plošče",
              [WallAngle.Vertical.toLowerCase()]: "vertikale",
              [WallAngle.Overhang.toLowerCase()]: "previsi",
              [WallAngle.Roof.toLowerCase()]: "strehe",
            }}
            nrShown="all"
            checkedOptions={filters.wallAngles}
            onChange={(checked, wallAngle) => {
              handleWallAngleFilterChange(checked, wallAngle);
            }}
          />

          {/* do not show the slider if min and max are the same as it makes no sense then */}
          {minApproachTime != maxApproachTime && (
            <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
              <RangeSlider
                label="Čas dostopa"
                value={filters.approachTime}
                minValue={minApproachTime}
                maxValue={maxApproachTime}
                step={1}
                valueToLabelMap={
                  new Map(
                    Array(maxApproachTime - minApproachTime + 1)
                      .fill(0)
                      .map((_v, i) => [
                        i + minApproachTime,
                        `${i + minApproachTime} min`,
                      ])
                  )
                }
                onChange={(value) =>
                  handleApproachTimeFilterChange(value as [number, number])
                }
              />
            </div>
          )}

          <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
            <Checkbox
              label="Prikaži tudi plezališča kjer so podatki neznani"
              checked={filters.showUnknown}
              onChange={handleShowUnknownFilterChange}
            />
          </div>

          <div className="mt-5 border-t border-neutral-200 px-8 pb-5 pt-4">
            <Button variant="tertiary" onClick={handleResetFilters}>
              <span className="flex gap-2">
                <IconReset size={IconSize.regular} />
                Ponastavi vse
              </span>
            </Button>
          </div>
        </div>

        {/* List of crags */}
        <div className="md:ml-5">
          {filteredCrags.map((crag: Crag) => (
            <div key={crag.id}>{crag.name}</div>
          ))}
        </div>
      </div>
    </>
  );
}

type TCheckboxesFilterGroupProps = {
  title: string;
  nrShown: number | "all";
  options: Record<string, string>;
  checkedOptions: string[];
  onChange: (checked: boolean, optionValue: string) => void;
};

function CheckboxesFilterGroup({
  title,
  options,
  nrShown,
  checkedOptions,
  onChange,
}: TCheckboxesFilterGroupProps) {
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  function handleToggleExpanded() {
    setExpanded(!expanded);
  }

  function handleToggleShowAll() {
    setShowAll(!showAll);
  }

  if (nrShown != "all" && Object.keys(options).length <= nrShown) {
    nrShown = "all";
  }

  return (
    <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
      {/* Header that can collapse the filter group */}
      <div className="-mx-1">
        <button
          className="w-full rounded px-1 outline-none ring-blue-100 focus-visible:ring"
          onClick={handleToggleExpanded}
        >
          <div className="flex items-start justify-between">
            <div>{title}</div>
            {expanded ? <IconCollapse /> : <IconExpand />}
          </div>
        </button>
      </div>

      {/* Filter group content/options(checkboxes) */}
      {expanded && (
        <div className="mt-2">
          {Object.entries(options)
            .slice(
              0,
              showAll || nrShown === "all"
                ? Object.keys(options).length
                : nrShown
            )
            .map(([optionValue, optionLabel], index) => (
              <div key={optionValue} className={`${index > 0 ? "mt-1" : ""}`}>
                <Checkbox
                  label={optionLabel}
                  onChange={(checked) => {
                    onChange(checked, optionValue);
                  }}
                  checked={checkedOptions.includes(optionValue)}
                />
              </div>
            ))}
          {nrShown !== "all" && (
            <div className="mt-1">
              <Link onPress={handleToggleShowAll}>
                {showAll ? "Prikaži manj" : "Prikaži vse"}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type TDifficultyRangeFilterGroup = {
  filterState: [number, number, number];
  onChange: (
    select: "minNrRoutes" | "minDifficulty" | "maxDifficulty",
    value: string
  ) => void;
};

function DifficultyRangeFilterGroup({
  filterState,
  onChange,
}: TDifficultyRangeFilterGroup) {
  const [expanded, setExpanded] = useState(true);

  function handleToggleExpanded() {
    setExpanded(!expanded);
  }

  // For now only french grading system is used for filtering by grade. Other systems will be added in a future task
  const grades = gradingSystems.find((gs) => gs.id === "french")?.grades;

  return (
    <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
      {/* Header that can collapse the filter group */}
      <div className="-mx-1">
        <button
          className="w-full rounded px-1 outline-none ring-blue-100 focus-visible:ring"
          onClick={handleToggleExpanded}
        >
          <div className="flex items-start justify-between">
            <div>Težavnost</div>
            {expanded ? <IconCollapse /> : <IconExpand />}
          </div>
        </button>
      </div>

      {/* Filter group content */}
      {expanded &&
        (grades === undefined ? (
          <div className="mt-2">Napaka pri nalaganju ocen.</div>
        ) : (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              vsaj
              <div className="w-30">
                <Select
                  value={`${filterState[0]}`}
                  onChange={(value: string) => onChange("minNrRoutes", value)}
                >
                  {Array(11)
                    .fill(0)
                    .map((_, i) => (
                      <Option key={i} value={`${i}`}>
                        {`${i}`}
                      </Option>
                    ))}
                </Select>
              </div>
              smeri
            </div>
            <div className="mt-2 flex items-center gap-2">
              med
              <div className="w-30 shrink-0">
                <Select
                  disabled={filterState[0] == 0}
                  value={`${filterState[1]}`}
                  onChange={(value: string) => onChange("minDifficulty", value)}
                >
                  {grades.map((grade) => (
                    <Option key={grade.id} value={`${grade.difficulty}`}>
                      {grade.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              in
              <div className="w-30 shrink-0">
                <Select
                  disabled={filterState[0] == 0}
                  value={`${filterState[2]}`}
                  onChange={(value: string) => onChange("maxDifficulty", value)}
                >
                  {grades.map((grade) => (
                    <Option key={grade.id} value={`${grade.difficulty}`}>
                      {grade.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FilteredCrags;