"use client";

import Combobox from "@/components/ui/combobox";
import populateCragsAction from "./server-actions/populate-crags-action";
import populateRoutesAction from "./server-actions/populate-routes-action";

function ComboboxPage() {
  async function populateCrags(text: string) {
    if (text === "") {
      return [];
    }
    const crags = await populateCragsAction(text);
    return crags.map((crag) => ({
      value: crag.id,
      name: crag.name,
    }));
  }

  async function populateRoutes(text: string) {
    if (text === "") {
      return [];
    }
    const routes = await populateRoutesAction(text);
    return routes.map((route) => ({
      value: route.id,
      name: `${route.name}, ${route.crag.name}`,
    }));
  }

  function handleChange(a: string | null) {
    console.log("handleChange", a);
  }

  return (
    <div className="m-8">
      <h3>Combobox demo</h3>

      <div className="mt-14 w-80">
        <h5>Crag finder</h5>
        <div className="mt-4">
          <Combobox
            value={{
              value: "2ab5496f-df5a-47ae-a0d4-ec53ec81c69f",
              name: "Kotečnik",
            }}
            onChange={handleChange}
            populate={populateCrags}
          />
        </div>
      </div>
      <div className="mt-14 w-80">
        <h5>Route finder</h5>
        <div className="mt-4">
          <Combobox
            value={null}
            onChange={handleChange}
            populate={populateRoutes}
          />
        </div>
      </div>
    </div>
  );
}

export default ComboboxPage;
