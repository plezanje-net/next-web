"use client";

import Map from "@/components/map/map";
import MapEventDemo from "./map-event-demo";
import MapMarker from "@/components/map/map-marker";

function MapPage() {
  return (
    <div className="mx-auto mt-8 px-8">
      <Map
        className="rounded-lg"
        center={[45.567706816120364, 13.863458632993037]}
        zoom={17}
        markersData={[
          {
            type: "parking",
            position: [45.567196, 13.862597],
            popupContent: "Parkirišče Mišja peč",
          },
          {
            type: "wall",
            position: [45.568112, 13.863984],
            popupContent: "Plezališče Mišja peč",
          },
        ]}
      >
        <MapEventDemo />
      </Map>
      <div className="mb-16 mt-16">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>Clicking on a marker displays a popup with some extra info</li>
            <li>
              Clicking anywhere else on the map places another marker on to the
              map and displays its coordinates in the console.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
