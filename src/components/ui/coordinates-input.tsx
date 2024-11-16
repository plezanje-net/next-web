/**
 * a text field for inputing coordinates
 * opens a dialog to let user place a pin instead of entering coordinates manually.
 * if coordinates entered manually, decimal point/comma is properly replaced (accepting both)
 **/

import Map from "../map/map";
import Button from "./button";
import Dialog, { DialogSize, DialogTitleSize } from "./dialog";
import TextField, { TTextFieldProps } from "./text-field";
import { Dispatch, SetStateAction, useState } from "react";
import IconMarker from "./icons/marker";
import dynamic from "next/dynamic";
// import PlacedMarker from "./placed-marker";
import { useMapEvent } from "react-leaflet";
import MapMarker from "../map/map-marker";

type TCoordinatesInputProps = TTextFieldProps & {
  dialogTitle: string;
  dialogDescription?: string;
  mapDefaultCenter: [number, number];
  mapZoom?: number;
  markerType: "wall" | "parking";
};

function CoordinatesInput({
  value: coordinates,
  onChange: setCoordinates,
  dialogTitle,
  dialogDescription,
  mapDefaultCenter,
  mapZoom = 17,
  markerType,
  ...rest
}: TCoordinatesInputProps) {
  const [mapDialogIsOpen, setMapDialogIsOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<[number, number]>();

  /**
   * if current value of the text input can be parsed into valid coordinates, get these coordinates, 'normalize'/reformat the value in the input, and set marker position to these coordinates so that it is shown on the map
   */
  const handleMarkerIconClick = () => {
    const validCoordinates = validateCoordinates(coordinates);
    if (validCoordinates) {
      const { value: coordinatesValue, text: coordinatesText } =
        validCoordinates;

      setMarkerPosition(coordinatesValue);
      setCoordinates(coordinatesText);
    }

    setMapDialogIsOpen(true);
  };

  const handleMapDialogConfirm = () => {
    if (markerPosition) {
      const latNum = markerPosition[0];
      const lonNum = markerPosition[1];

      setCoordinates(formatCoordinates(latNum, lonNum));
    }
  };

  const handleCoordinatesChange = (coords: string) => {
    setCoordinates(coords);
  };

  return (
    <>
      <TextField
        {...rest}
        value={coordinates}
        onChange={handleCoordinatesChange}
        suffix={
          <Button variant="quaternary" onClick={handleMarkerIconClick}>
            <IconMarker />
          </Button>
        }
      />

      <Dialog
        title={dialogTitle}
        dialogSize={DialogSize.large}
        isOpen={mapDialogIsOpen}
        setIsOpen={setMapDialogIsOpen}
        confirm={{ label: "Shrani", callback: handleMapDialogConfirm }}
        cancel={{ label: "Prekliči" }}
        titleSize={DialogTitleSize.large}
      >
        <div className="-mx-8">
          {dialogDescription && <div className="px-8">{dialogDescription}</div>}
          <Map
            className="mt-4"
            center={markerPosition ? markerPosition : mapDefaultCenter}
            zoom={mapZoom}
            scrollWheelZoom={true}
          >
            <PlacedMarker
              position={markerPosition}
              setPosition={setMarkerPosition}
              markerType={markerType}
            />
          </Map>
        </div>
      </Dialog>
    </>
  );
}

type TPlacedMarkerProps = {
  position: [number, number] | undefined;
  setPosition: Dispatch<SetStateAction<[number, number] | undefined>>;
  markerType: "wall" | "parking";
};

function PlacedMarker({
  position,
  setPosition,
  markerType,
}: TPlacedMarkerProps) {
  useMapEvent("click", (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  });

  return (
    position && (
      <MapMarker type={markerType} position={position} interactive={false} />
    )
  );
}

// export const LazyPlacedMarker = dynamic(() => import("./placed-marker"), {
//   ssr: false,
// });

/**
 * Receives a string representation of coordinates
 * and returns false if cannot be parsed into valid coordinates
 * otherwise returns an object consisting of coordinates value tuple [lat, lon] and a 'normalized' string representation of the coordinates
 */
const validateCoordinates = (
  coordinates: string
):
  | {
      value: [number, number];
      text: string;
    }
  | false => {
  // we should accept decimal comma or decimal point in lat and lon
  // we should accept lat and lon separated by space, comma or space+comma
  const parsed = coordinates.match(
    /^(-?\d+(?:[.,]\d+)?)\s*[,\s]\s*(-?\d+(?:[.,]\d+)?)$/
  );

  const lat = parsed ? parsed[1] : null;
  const lon = parsed ? parsed[2] : null;

  if (lat && lon) {
    // get numbers from parsed lat and lon
    const latNum = +lat.replace(",", ".");
    const lonNum = +lon.replace(",", ".");

    // check that the range of lat and lon is valid
    if (latNum >= -90 && latNum <= 90 && lonNum >= -180 && lonNum <= 180) {
      return {
        value: [latNum, lonNum],
        text: `${latNum.toString().replace(".", ",")}, ${lonNum.toString().replace(".", ",")}`,
      };
    }
  }
  return false;
};

const formatCoordinates = (lat: number, lon: number) =>
  `${lat.toFixed(5).toString().replace(".", ",")}, ${lon.toFixed(5).toString().replace(".", ",")}`;

export default CoordinatesInput;
export { validateCoordinates, formatCoordinates };
