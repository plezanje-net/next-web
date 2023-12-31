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
import IconMap from "@/components/ui/icons/map";
import IconMore from "@/components/ui/icons/more";
import IconSearch from "@/components/ui/icons/search";
import IconSort from "@/components/ui/icons/sort";
import Link from "@/components/ui/link";
import TextField from "@/components/ui/text-field";
import { Country, Crag } from "@/graphql/generated";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryStates,
} from "next-usequerystate";
import { useState } from "react";

type TFilteredCragsProps = {
  crags: Crag[];
  countries: Country[];
};

// TODO:
/**
 * what should happen when none in the filter group is selected??
 * - show all, or show none?
 * - could be show none and default to all selected, but then we will get giant urls imediately...
 */

function FilteredCragsNEW({ crags, countries }: TFilteredCragsProps) {
  const [filters, setFilters] = useQueryStates({
    countries: parseAsArrayOf(parseAsString),
    areas: parseAsArrayOf(parseAsString),
  });

  // const [filters, setFilters] = useState<{
  //   countries: string[];
  //   areas: string[];
  // }>({
  //   countries: [],
  //   areas: [],
  // });

  // null in useQueryState value means no value, but we need empty array
  function nullToEmpty(filters: Record<string, string[] | null>) {
    const eFilters: Record<string, string[]> = {};
    Object.entries(filters).forEach(([key, value]) => {
      eFilters[key] = value || [];
    });
    return eFilters;
  }

  // We need null in useQueryState value instead of empty array
  function emptyToNull(filters: Record<string, string[]>) {
    const nFilters: Record<string, string[] | null> = {};
    Object.entries(filters).forEach(([key, value]) => {
      nFilters[key] = value.length ? value : null;
    });
    return nFilters;
  }

  // Filter crags based on filters state
  const eFilters = nullToEmpty(filters);
  const filteredCrags = crags.filter(
    (crag: Crag) =>
      eFilters.countries.includes(crag.country.slug) &&
      crag.area &&
      eFilters.areas.includes(crag.area.slug)
  );

  // A list of countries to choose from in the filter pane (all countries)
  const shownCountries: Record<string, string> = {};
  crags.forEach(
    (crag) => (shownCountries[crag.country.slug] = crag.country.name)
  );

  // A list of areas to choose from in the filter pane (only areas of countries currently visible)
  const shownAreas: Record<string, string> = {};
  filters.countries?.forEach((country) => {
    countries
      .find((c) => c.slug === country)
      ?.areas.forEach((area) => {
        shownAreas[area.slug] = area.name;
      });
  });

  // TODO: dummy, until we determine how to handle this (divide crags or not)
  const routeTypes = {
    sport: "športne",
    boulder: "balvani",
    multipitch: "večraztežajne",
  };

  function handleCountryFilterChange(checked: boolean, country: string) {
    setFilters((filters) => {
      const eFilters = nullToEmpty(filters);

      if (checked) {
        // add country
        return emptyToNull({
          ...eFilters,
          countries: [...eFilters.countries, country],
        });
      } else {
        // remove country
        return emptyToNull({
          ...eFilters,
          countries: eFilters.countries.filter((c) => c != country),

          // when a country is removed, we should also remove all (possibly selected) areas of this country
          areas: eFilters.areas.filter(
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
      const eFilters = nullToEmpty(filters);
      if (checked) {
        // add area
        return emptyToNull({ ...eFilters, areas: [...eFilters.areas, area] });
      } else {
        // remove area
        return emptyToNull({
          ...eFilters,
          areas: eFilters.areas.filter((a) => a != area),
        });
      }
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
        <div className="flex justify-center">
          <div className="">
            <IconMap />
          </div>
          <div className="ml-4 border-l border-neutral-300 pl-4 md:hidden">
            <Button renderStyle="icon" onClick={handleToggleFilterPane}>
              <IconFilter />
            </Button>
          </div>
          <div className="ml-4 border-l border-neutral-300 pl-4">
            <IconColumns />
          </div>
          <div className="ml-4 border-l border-neutral-300 pl-4">
            <IconSort />
          </div>
          <div className="ml-4 border-l border-neutral-300 pl-4 sm:hidden">
            <IconSearch />
          </div>
          <div className="ml-4 border-l border-neutral-300 pl-4">
            <IconMore />
          </div>
        </div>

        <div className="hidden min-w-0 xs:ml-8 xs:w-80 xs:border-none sm:block">
          <TextField
            // ref={searchFieldRef}
            prefix={<IconSearch />}
            placeholder="Poišči po imenu"
            aria-label="Poišči po imenu"
            // onChange={handleSearchFieldChange}
            // value={}
            suffix={
              <span className="flex">
                <Button renderStyle="icon" onClick={() => {}}>
                  <IconClose />
                </Button>
              </span>
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

          <FilterGroup
            title="Država"
            options={shownCountries}
            // TODO: tweak this
            nrShown={3}
            checkedOptions={filters.countries || []}
            onChange={handleCountryFilterChange}
          />
          <FilterGroup
            title="Območje"
            options={shownAreas}
            // TODO: tweak this
            nrShown={3}
            checkedOptions={filters.areas || []}
            onChange={(checked, area) => {
              handleAreaFilterChange(checked, area);
            }}
          />

          <div className="mt-5 border-t border-neutral-200 px-8 pt-5">
            <Checkbox label="Prikaži samo vidna na zemljevidu" />
          </div>

          <FilterGroup
            title="Tip smeri"
            options={routeTypes}
            // TODO: tweak this
            nrShown={2}
            checkedOptions={[]}
            onChange={() => {
              console.log("dummy");
            }}
          />
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

// TODO: export component to own file?
type TFilterGroupProps = {
  title: string;
  nrShown: number;
  options: Record<string, string>;
  checkedOptions: string[];
  onChange: (checked: boolean, optionValue: string) => void;
};

function FilterGroup({
  title,
  options,
  nrShown,
  checkedOptions,
  onChange,
}: TFilterGroupProps) {
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  function handleToggleExpanded() {
    setExpanded(!expanded);
  }

  function handleToggleShowAll() {
    setShowAll(!showAll);
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
            .slice(0, showAll ? Object.keys(options).length : nrShown)
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
          <div className="mt-1">
            <Link onPress={handleToggleShowAll}>
              {showAll ? "Prikaži manj" : "Prikaži vse"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilteredCragsNEW;
