"use client";

import { useState } from "react";

const crags = [
  { name: "massone", country: "italy", area: "arco" },
  { name: "ceredo", country: "italy", area: "verona" },
  { name: "osp", country: "slovenia", area: "primorska" },
  { name: "bitnje", country: "slovenia", area: "gorenjska" },
];

const countries = ["italy", "slovenia"];

const countryToArea = {
  italy: ["arco", "verona"],
  slovenia: ["primorska", "gorenjska"],
};

// Some tests for dependent filter groups.
// TODO: delete this page after testing done

function NestedFilteredTestPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    countries: ["slovenia"],
    areas: ["gorenjska"],
  });

  const shownAreas = selectedFilters.countries
    .flatMap((country) => countryToArea[country as keyof typeof countryToArea])
    .sort((a1, a2) => a1.localeCompare(a2));

  const filteredCrags = crags.filter(
    (crag) =>
      selectedFilters.countries.includes(crag.country) &&
      selectedFilters.areas.includes(crag.area)
  );

  function handleCountryChange(
    e: React.ChangeEvent<HTMLInputElement>,
    country: string
  ) {
    setSelectedFilters((selectedFilters) => {
      if (e.target.checked) {
        return {
          ...selectedFilters,
          countries: [...selectedFilters.countries, country],
        };
      } else {
        // need to uncheck also all areas of the country that has been unchecked
        // TODO:
        const selectedAreas = selectedFilters.areas.filter(
          (a) =>
            !countryToArea[country as keyof typeof countryToArea].includes(a)
        );

        return {
          ...selectedFilters,
          areas: selectedAreas,
          countries: selectedFilters.countries.filter((c) => c != country),
        };
      }
    });
  }

  function handleAreaChange(
    e: React.ChangeEvent<HTMLInputElement>,
    area: string
  ) {
    setSelectedFilters((selectedFilters) => {
      if (e.target.checked) {
        return { ...selectedFilters, areas: [...selectedFilters.areas, area] };
      } else {
        return {
          ...selectedFilters,
          areas: selectedFilters.areas.filter((a) => a != area),
        };
      }
    });
  }

  return (
    <div>
      <div>Filters:</div>
      <div>Country</div>
      {countries.map((country) => (
        <div key={country}>
          <input
            type="checkbox"
            id={country}
            checked={selectedFilters.countries.includes(country)}
            onChange={(e) => handleCountryChange(e, country)}
          />
          <label htmlFor={country}>{country}</label>
        </div>
      ))}

      <br />

      <div>Area</div>
      {shownAreas.map((area) => (
        <div key={area}>
          <input
            type="checkbox"
            id={area}
            checked={selectedFilters.areas.includes(area)}
            onChange={(e) => handleAreaChange(e, area)}
          />
          <label htmlFor={area}>{area}</label>
        </div>
      ))}

      <br />

      <br />
      <br />

      <div>Filtered crags:</div>
      {filteredCrags.map((crag) => (
        <div key={crag.name}>{crag.name}</div>
      ))}
    </div>
  );
}

export default NestedFilteredTestPage;
