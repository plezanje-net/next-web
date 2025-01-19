"use client";

import Button from "@/components/ui/button";
import IconAutumn from "@/components/ui/icons/autumn";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconOverhang from "@/components/ui/icons/overhang";
import IconRoof from "@/components/ui/icons/roof";
import IconSlab from "@/components/ui/icons/slab";
import IconSpring from "@/components/ui/icons/spring";
import IconSummer from "@/components/ui/icons/summer";
import IconVertical from "@/components/ui/icons/vertical";
import IconWinter from "@/components/ui/icons/winter";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Select, Option } from "@/components/ui/select";
import { Selector, SelectorOption } from "@/components/ui/selector";
import TextArea from "@/components/ui/text-area";
import TextField from "@/components/ui/text-field";
import {
  Country,
  Crag,
  Orientation,
  Season,
  WallAngle,
} from "@/graphql/generated";
import { useRef, useState } from "react";
import { gradingSystems } from "../../../../../lib/grading-systems";
import CoordinatesInput, {
  formatCoordinates,
  validateCoordinates,
} from "@/components/ui/coordinates-input";
import Checkbox from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import createCragAction from "../new-crag/server-actions/create-crag-action";
import updateCragAction from "../[cragSlug]/server-actions/update-crag-action";

type TCragFormProps = {
  formType: "edit" | "new";
  countriesWithAreas: Country[];
  crag?: Crag;
};

function CragForm({ formType, countriesWithAreas, crag }: TCragFormProps) {
  // Determine default/initial values for all form fields
  let defaultValues;
  if (formType == "edit" && crag) {
    defaultValues = {
      name: crag.name,
      country: crag.country.id,
      area: crag.area ? crag.area.id : "",
      cragType: crag.type,
      gradingSystem: crag.defaultGradingSystem
        ? crag.defaultGradingSystem.id
        : "",
      cragCoordinates:
        crag.lat && crag.lon ? formatCoordinates(crag.lat, crag.lon) : "",
      cragDescription: crag.description || "",
      wallAngles: crag.wallAngles || [],
      rainproof: crag.rainproof !== null ? (crag.rainproof ? "yes" : "no") : "",
      orientations: crag.orientations || [],
      seasons: crag.seasons || [],
      parkingCoordinates: "", // TODO
      approachTime: crag.approachTime !== null ? `${crag.approachTime}` : "",
      approachDescription: crag.access || "",
      isHidden: crag.isHidden || false,
    };
  } else {
    defaultValues = {
      name: "",
      country: countriesWithAreas.find((c) => c.slug == "slovenija")?.id || "",
      area: "",
      cragType: "sport",
      gradingSystem: "french",
      cragCoordinates: "",
      cragDescription: "",
      wallAngles: [],
      rainproof: "",
      orientations: [],
      seasons: [],
      parkingCoordinates: "",
      approachTime: "",
      approachDescription: "",
      isHidden: false,
    };
  }

  const [name, setName] = useState(defaultValues.name);
  const [nameError, setNameError] = useState("");
  const nameRef = useRef<HTMLDivElement>(null);

  const [country, setCountry] = useState(defaultValues.country);
  const [area, setArea] = useState(defaultValues.area);
  const [cragType, setCragType] = useState(defaultValues.cragType);
  const [gradingSystem, setGradingSystem] = useState(
    defaultValues.gradingSystem
  );

  const [cragCoordinates, setCragCoordinates] = useState(
    defaultValues.cragCoordinates
  );
  const [cragCoordinatesError, setCragCoordinatesError] = useState("");
  const cragCoordinatesRef = useRef<HTMLDivElement>(null);

  const [cragDescription, setCragDescription] = useState(
    defaultValues.cragDescription
  );
  const [wallAngles, setWallAngles] = useState<string[]>(
    defaultValues.wallAngles
  );
  const [rainproof, setRainproof] = useState<string | undefined>(
    defaultValues.rainproof
  );
  const [orientations, setOrientations] = useState<string[]>(
    defaultValues.orientations
  );
  const [seasons, setSeasons] = useState<string[]>(defaultValues.seasons);

  const [parkingCoordinates, setParkingCoordinates] = useState(
    defaultValues.parkingCoordinates
  );
  const [parkingCoordinatesError, setParkingCoordinatesError] = useState("");
  const parkingCoordinatesRef = useRef<HTMLDivElement>(null);

  const [approachTime, setApproachTime] = useState(defaultValues.approachTime);
  const [approachDescription, setApproachDescription] = useState(
    defaultValues.approachDescription
  );
  const [isHidden, setIsHidden] = useState(defaultValues.isHidden);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNameChange = (name: string) => {
    setName(name);
    setNameError("");
  };

  const handleCountryChange = (country: string) => {
    setCountry(country);
    setArea("");
  };

  const areas = countriesWithAreas.find((c) => c.id === country)?.areas;

  const availableGradingSystems = Object.values(gradingSystems).filter((gs) => {
    // crag type sport
    if (cragType == "sport") {
      return gs.routeTypes.some((rt) =>
        ["sport", "multipitch", "boulder"].includes(rt.id)
      );
    }
    //  crag type alpine
    else {
      return gs.routeTypes.some((rt) => rt.id == "alpine");
    }
  });

  const handleCragTypeChange = (cragType: string) => {
    setGradingSystem("");
    setCragType(cragType);
  };

  const handleCragCoordinatesChange = (coordinates: string) => {
    setCragCoordinates(coordinates);
    setCragCoordinatesError("");
  };

  const handleFormAction = async () => {
    setLoading(true);

    // Validate form
    const errorRefs = []; // to determine if any errors and where to scroll to
    //    - name is required
    if (!name) {
      setNameError("Ime plezališča je obvezen podatek.");
      errorRefs.push(nameRef);
    }

    //    - value of coordinates field needs to be two numbers separated by comma, dot or space
    let cragLat, cragLon;
    if (cragCoordinates) {
      const validatedCragCoordinates = validateCoordinates(cragCoordinates);
      if (validatedCragCoordinates) {
        [cragLat, cragLon] = validatedCragCoordinates.value;
      } else {
        setCragCoordinatesError(
          "Nepravilna oblika. Koordinate vnesi v obliki: 45,56801, 13,86413"
        );
        errorRefs.push(cragCoordinatesRef);
      }
    }

    let parkingLat, parkingLon; // TODO: save these where?
    if (parkingCoordinates) {
      const validatedParkingCoordinates =
        validateCoordinates(parkingCoordinates);
      if (validatedParkingCoordinates) {
        [parkingLat, parkingLon] = validatedParkingCoordinates.value;
      } else {
        setParkingCoordinatesError(
          "Nepravilna oblika. Koordinate vnesi v obliki: 45,56719, 13,86265"
        );
        errorRefs.push(parkingCoordinatesRef);
      }
    }

    if (errorRefs.length > 0) {
      setLoading(false);
      errorRefs.shift()?.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const cragData = {
      name: name,
      countryId: country,
      areaId: area || null,
      type: cragType,
      defaultGradingSystemId: gradingSystem,
      lat: cragLat || null,
      lon: cragLon || null,
      description: cragDescription || null,
      wallAngles: wallAngles.length ? (wallAngles as WallAngle[]) : null,
      rainproof: rainproof == "yes" ? true : rainproof == "no" ? false : null,
      orientations: orientations.length
        ? (orientations as Orientation[])
        : null,
      seasons: seasons.length ? (seasons as Season[]) : null,
      // parkingLat, parkingLon // TODO:
      approachTime: +approachTime || null,
      access: approachDescription || null,
      // coverImageId: null, //TODO:
      isHidden: isHidden,
    };

    let savedCrag;
    switch (formType) {
      case "new":
        const newCragData = {
          ...cragData,
          publishStatus: "draft", // a new crag is initially always a draft
        };

        savedCrag = await createCragAction(newCragData);
        break;
      case "edit":
        const updateCragData = {
          ...cragData,
          id: crag!.id,
        };

        savedCrag = await updateCragAction(updateCragData);
    }

    router.push(savedCrag.slug);
    setLoading(false);
  };

  return (
    <div className="flex justify-center px-4 xs:px-8 mt-7">
      <div className="w-full max-w-2xl">
        <form action={handleFormAction}>
          {/* Main grid for inputs layout */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {/* Crag name */}
            <div className="col-span-2 sm:col-span-1" ref={nameRef}>
              <TextField
                value={name}
                onChange={handleNameChange}
                label="Ime plezališča&nbsp;*"
                errorMessage={nameError ? nameError : undefined}
                disabled={loading}
              />
            </div>

            {/* Country */}
            <div className="col-span-2 sm:col-span-1 sm:col-start-1">
              <Select
                label="Država&nbsp;*"
                value={country}
                onChange={handleCountryChange}
                disabled={loading}
              >
                {countriesWithAreas.map((country) => (
                  <Option key={country.slug} value={country.id}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            </div>
            {/* Area */}
            <div className="col-span-2 sm:col-span-1">
              <Select
                label="Področje"
                value={area}
                onChange={setArea}
                disabled={!areas?.length || loading}
                description={
                  !areas?.length
                    ? "V izbrani državi še ni odprtih področij."
                    : undefined
                }
              >
                {areas?.length
                  ? areas.map((area) => (
                      <Option key={area.slug} value={area.id}>
                        {area.name}
                      </Option>
                    ))
                  : [1, 2].map((_) => (
                      <Option key={1} value="">
                        {" "}
                      </Option>
                    ))}
              </Select>
            </div>

            {/* Crag type */}
            <div className="col-span-2 sm:col-span-1">
              <Select
                label="Vrsta plezanja&nbsp;*"
                value={cragType}
                onChange={handleCragTypeChange}
                disabled={loading}
              >
                <Option value="sport">športno / balvani / dolge športne</Option>
                <Option value="alpine">alpinizem</Option>
              </Select>
            </div>
            {/* Default grading system */}
            <div className="col-span-2 sm:col-span-1">
              <Select
                label="Privzeti sistem ocenjevanja&nbsp;*"
                value={gradingSystem}
                onChange={setGradingSystem}
                disabled={loading}
              >
                {availableGradingSystems.map((gs) => (
                  <Option key={gs.id} value={gs.id}>
                    {gs.name}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Crag coordinates */}
            <div className="col-span-2 sm:col-span-1" ref={cragCoordinatesRef}>
              <CoordinatesInput
                label="Koordinate plezališča"
                value={cragCoordinates}
                onChange={handleCragCoordinatesChange}
                placeholder="45,56801, 13,86413"
                errorMessage={cragCoordinatesError}
                dialogTitle="Lokacija plezališča"
                dialogDescription="Označi lokacijo plezališča na zemljevidu."
                disabled={loading}
                // TODO: make default center, center of the country/area selected if available, or if parking already placed, make that the default center
                mapDefaultCenter={[46.119944, 14.815333]}
                mapZoom={8}
                markerType="wall"
              />
            </div>

            {/* Horizontal divider */}
            <div className="h-px bg-neutral-200 col-span-2"></div>

            {/* Crag description */}
            <div className="col-span-2">
              <TextArea
                label="Opis plezališča"
                value={cragDescription}
                onChange={setCragDescription}
                disabled={loading}
              />
            </div>

            {/* Wall angles */}
            <div className="col-span-2">
              <Selector
                label="Naklon stene"
                value={wallAngles}
                onChange={setWallAngles}
                // disabled={loading}
              >
                <SelectorOption value={WallAngle.Slab}>
                  <div className="flex flex-col items-center">
                    <IconSlab size={IconSize.large} />
                    <span>plošče</span>
                  </div>
                </SelectorOption>
                <SelectorOption value={WallAngle.Vertical}>
                  <div className="flex flex-col items-center">
                    <IconVertical size={IconSize.large} />
                    <span>vertikale</span>
                  </div>
                </SelectorOption>
                <SelectorOption value={WallAngle.Overhang}>
                  <div className="flex flex-col items-center">
                    <IconOverhang size={IconSize.large} />
                    <span>previsi</span>
                  </div>
                </SelectorOption>
                <SelectorOption value={WallAngle.Roof}>
                  <div className="flex flex-col items-center">
                    <IconRoof size={IconSize.large} />
                    <span>strehe</span>
                  </div>
                </SelectorOption>
              </Selector>
            </div>

            {/* Rainproof */}
            <div className="col-span-2">
              <RadioGroup
                label="Plezanje v dežju"
                value={rainproof}
                onChange={setRainproof}
                disabled={loading}
              >
                <Radio value={"yes"}>je možno</Radio>
                <Radio value={"no"}>ni možno</Radio>
                <Radio value={"unknown"}>ni znano</Radio>
              </RadioGroup>
            </div>

            {/* Horizontal divider */}
            <div className="h-px bg-neutral-200 col-span-2"></div>

            {/* Orientations */}
            <div className="col-span-2 sm:col-span-1">
              <Select
                multi
                value={orientations}
                onChange={setOrientations}
                label="Usmerjenost"
                disabled={loading}
              >
                <Option value={Orientation.North}>sever</Option>
                <Option value={Orientation.Northeast}>severovzhod</Option>
                <Option value={Orientation.East}>vzhod</Option>
                <Option value={Orientation.Southeast}>jugovzhod</Option>
                <Option value={Orientation.South}>jug</Option>
                <Option value={Orientation.Southwest}>jugozahod</Option>
                <Option value={Orientation.West}>zahod</Option>
                <Option value={Orientation.Northwest}>severozahod</Option>
              </Select>
            </div>

            {/* Seasons */}
            <div className="col-span-2">
              <Selector
                label="Sezona"
                value={seasons}
                onChange={setSeasons}
                // disabled={loading}
              >
                <SelectorOption value={Season.Spring}>
                  <div className="flex flex-col items-center">
                    <IconSpring size={IconSize.large} />
                    <span>pomlad</span>
                  </div>
                </SelectorOption>
                <SelectorOption value={Season.Summer}>
                  <div className="flex flex-col items-center">
                    <IconSummer size={IconSize.large} />
                    <span>poletje</span>
                  </div>
                </SelectorOption>
                <SelectorOption value={Season.Autumn}>
                  <div className="flex flex-col items-center">
                    <IconAutumn size={IconSize.large} />
                    <span>jesen</span>
                  </div>
                </SelectorOption>
                <SelectorOption value={Season.Winter}>
                  <div className="flex flex-col items-center">
                    <IconWinter size={IconSize.large} />
                    <span>zima</span>
                  </div>
                </SelectorOption>
              </Selector>
            </div>

            {/* Parking coordinates */}
            <div
              className="col-span-2 sm:col-span-1"
              ref={parkingCoordinatesRef}
            >
              <CoordinatesInput
                label="Koordinate parkirišča"
                value={parkingCoordinates}
                onChange={setParkingCoordinates}
                placeholder="45,56719, 13,86265"
                errorMessage={parkingCoordinatesError}
                dialogTitle="Lokacija parkirišča"
                dialogDescription="Označi lokacijo parkirišča na zemljevidu."
                disabled={loading}
                // TODO: make default center, center of the country/area selected if available, or if crag coords already set, make that the default center
                mapDefaultCenter={[46.119944, 14.815333]}
                mapZoom={8}
                markerType="wall"
              />
            </div>
            {/* Approach time */}
            <div className="col-span-2 sm:col-span-1">
              <TextField
                type="natural"
                label="Čas dostopa"
                value={approachTime}
                onChange={setApproachTime}
                suffix={<span>min</span>}
                disabled={loading}
              />
            </div>

            {/* Approach description */}
            <div className="col-span-2">
              <TextArea
                label="Opis dostopa"
                value={approachDescription}
                onChange={setApproachDescription}
                disabled={loading}
              />
            </div>

            {/* Horizontal divider */}
            <div className="h-px bg-neutral-200 col-span-2"></div>

            {/* Cover image */}
            <div className="col-span-2">
              <div>Naslovna fotografija</div>
              <div className="mt-2 h-[68px] w-[52px] border border-neutral-300 rounded-lg"></div>
            </div>
            {/* Visibility */}
            <div className="col-span-2">
              <div className="mb-2">Vidnost</div>
              <Checkbox
                label="Prikaži samo prijavljenim uporabnikom"
                checked={isHidden}
                onChange={setIsHidden}
                disabled={loading}
              />
            </div>

            {/* Horizontal divider */}
            <div className="h-px bg-neutral-200 col-span-2"></div>

            <div className="col-span-2 text-right flex flex-wrap justify-end gap-4">
              <Button variant="secondary" disabled={loading}>
                Prekliči
              </Button>
              <Button type="submit" loading={loading}>
                Shrani
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CragForm;
