"use client"; // TODO: break up page into components

import Breadcrumbs from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import Button from "@/components/ui/button";
import IconAutumn from "@/components/ui/icons/autumn";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconInfo from "@/components/ui/icons/info";
import IconOverhang from "@/components/ui/icons/overhang";
import IconRoof from "@/components/ui/icons/roof";
import IconRoutes from "@/components/ui/icons/routes";
import IconSlab from "@/components/ui/icons/slab";
import IconSpring from "@/components/ui/icons/spring";
import IconSummer from "@/components/ui/icons/summer";
import IconVertical from "@/components/ui/icons/vertical";
import IconWinter from "@/components/ui/icons/winter";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Select, Option } from "@/components/ui/select";
import { Selector, SelectorOption } from "@/components/ui/selector";
import TabMenu, { TTabMenuItem } from "@/components/ui/tab-menu";
import TextArea from "@/components/ui/text-area";
import TextField from "@/components/ui/text-field";
import { Orientation, Season, WallAngle } from "@/graphql/generated";
import { useState } from "react";

function NewCragPage() {
  // TODO: export to component?
  const tabMenuItems: TTabMenuItem[] = [
    {
      label: "Osnovni podatki",
      link: "/edit/new-crag",
      isActive: true,
      icon: <IconInfo />,
    },
    {
      label: "Sektorji in smeri",
      isDisabled: true,
      link: "",
      isActive: false,
      icon: <IconRoutes />,
    },
  ];

  const handleFormSubmit = (formData: FormData) => {
    console.log(Object.fromEntries(formData));
  };

  // TODO: get all countries.
  const [country, setCountry] = useState("slovenija");
  // TODO: when countries got, set areas
  const [area, setArea] = useState("kalymnos");
  const [type, setType] = useState("sport");
  // TODO: get gss
  const [gradingSystem, setGradingSystem] = useState("french");
  // TODO: validate input
  const [cragCoordinates, setCragCoordinates] = useState("");
  const [cragDescription, setCragDescription] = useState("");
  const [wallAngles, setWallAngles] = useState<string[]>([]);
  const [rainproof, setRainproof] = useState<string | undefined>();
  const [orientations, setOrientations] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  // TODO: validate input
  const [parkingCoordinates, setParkingCoordinates] = useState("");
  // TODO: num only
  const [approachTime, setApproachTime] = useState("");
  const [approachDescription, setApproachDescription] = useState("");

  return (
    <>
      <ContentHeader
        heading="Dodajanje plezališča"
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { label: "Plezanje.net", link: "/" },
              { label: "Urejanje", link: null },
              { label: "Novo plezališče", link: null },
            ]}
          />
        }
        tabMenu={<TabMenu items={tabMenuItems} />}
      />

      <div className="flex justify-center px-4 xs:px-8 mt-7">
        <div className="w-full max-w-2xl">
          <form action={handleFormSubmit}>
            {/* Main grid for inputs layout */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {/* Crag name */}
              <div className="col-span-2 sm:col-span-1">
                <TextField name="name" label="Ime plezališča *" isRequired />
              </div>

              {/* Country */}
              <div className="col-span-2 sm:col-span-1 sm:col-start-1">
                <Select
                  label="Država&nbsp;*"
                  value={country}
                  onChange={setCountry}
                >
                  <Option value="slovenija">Slovenija</Option>
                  <Option value="italija">Italija</Option>
                </Select>
              </div>
              {/* Area */}
              <div className="col-span-2 sm:col-span-1">
                <Select label="Področje" value={area} onChange={setArea}>
                  <Option value="primorska">Primorska</Option>
                  <Option value="kalymnos">Kalymnos</Option>
                </Select>
              </div>

              {/* Crag type */}
              <div className="col-span-2 sm:col-span-1">
                <Select
                  label="Vrsta plezanja&nbsp;*"
                  value={type}
                  onChange={setType}
                >
                  <Option value="sport">
                    športno / balvani / dolge športne
                  </Option>
                  <Option value="alpine">alpinizem</Option>
                </Select>
              </div>
              {/* Default grading system */}
              <div className="col-span-2 sm:col-span-1">
                <Select
                  label="Privzeti sistem ocenjevanja&nbsp;*"
                  value={gradingSystem}
                  onChange={setGradingSystem}
                >
                  <Option value="french">french</Option>
                  <Option value="uiaa">UIAA</Option>
                </Select>
              </div>

              {/* Crag coordinates */}
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  label="Koordinate plezališča"
                  value={cragCoordinates}
                  onChange={setCragCoordinates}
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
                />
              </div>

              {/* Wall angles */}
              <div className="col-span-2">
                <Selector
                  label="Naklon stene"
                  value={wallAngles}
                  onChange={setWallAngles}
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
                >
                  <Radio value={"yes"}>Je možno</Radio>
                  <Radio value={"no"}>Ni možno</Radio>
                  <Radio value={"unknown"}>Ni znano</Radio>
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
                <Selector label="Sezona" value={seasons} onChange={setSeasons}>
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
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  label="Koordinate parkirišča"
                  value={parkingCoordinates}
                  onChange={setParkingCoordinates}
                />
              </div>
              {/* Approach time */}
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  label="Čas dostopa"
                  value={approachTime}
                  onChange={setApproachTime}
                />
              </div>

              {/* Approach description */}
              <div className="col-span-2">
                <TextArea
                  label="Opis dostopa"
                  value={approachDescription}
                  onChange={setApproachDescription}
                />
              </div>

              {/* Horizontal divider */}
              <div className="h-px bg-neutral-200 col-span-2"></div>

              {/* Cover image */}
              <div className="col-span-2">
                <div>Naslovna fotografija</div>
                <div className="mt-2 h-[68px] w-[52px] border border-neutral-300 rounded-lg"></div>
              </div>

              {/* Horizontal divider */}
              <div className="h-px bg-neutral-200 col-span-2"></div>

              <div className="col-span-2 text-right flex flex-wrap justify-end gap-4">
                <Button variant="secondary">Prekliči</Button>
                <Button>Shrani</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewCragPage;
