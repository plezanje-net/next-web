import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import {
  Crag,
  CragInfoDocument,
  Orientation,
  Season,
  WallAngle,
} from "@/graphql/generated";
import Image from "next/image";
import IconWalk from "@/components/ui/icons/walk";
import IconHeight from "@/components/ui/icons/height";
import IconRoof from "@/components/ui/icons/roof";
import IconSlab from "@/components/ui/icons/slab";
import IconVertical from "@/components/ui/icons/vertical";
import IconOverhang from "@/components/ui/icons/overhang";
import IconSpring from "@/components/ui/icons/spring";
import IconSummer from "@/components/ui/icons/summer";
import IconAutumn from "@/components/ui/icons/autumn";
import IconWinter from "@/components/ui/icons/winter";
import IconRainproof from "@/components/ui/icons/rainproof";
import IconParking from "@/components/ui/icons/parking";
import IconWall from "@/components/ui/icons/wall";
import IconOrientation from "@/components/ui/icons/orientation";
import GradeDistribution from "@/components/grade-distribution";
import VisitsDistribution from "@/components/visits-distribution";
import sampleImage from "@/public/sample-cover.jpeg";
import Map from "@/components/map/map";
import Button from "@/components/ui/button";
import IconMissing from "@/components/ui/icons/missing";
import Link from "@/components/ui/link";

interface Params {
  cragSlug: string;
}

/*
TODO:
-- fill with real data:  
  - cover photo
  - access
  - gps coords
  - map

-- enable button
-- enable links
*/

interface CragInfo extends Crag {
  minRouteLength: number | null;
  maxRouteLength: number | null;
}

// TODO: after this page's layout is tested remove this dummy filler
const DUMMY_DATA = true;
// const DUMMY_DATA = false;

async function CragInfoPage({ params }: { params: Params }) {
  const { data } = await urqlServer().query(CragInfoDocument, {
    crag: params.cragSlug,
  });

  const crag: CragInfo = data.cragBySlug;

  // Find lenghts of shortest and longest route.
  const routeLengths = crag.sectors
    .flatMap((sector) => sector.routes)
    .map((route) => route.length || 0)
    .filter((length) => !!length);

  [crag.minRouteLength, crag.maxRouteLength] = [
    routeLengths.length ? Math.max(...routeLengths) : null,
    routeLengths.length ? Math.min(...routeLengths) : null,
  ];

  // TODO: remove dummy logic after tested
  if (DUMMY_DATA) {
    crag.orientations = [Orientation.North];
    crag.approachTime = 10;
    crag.minRouteLength = 10;
    crag.maxRouteLength = 15;
    crag.wallAngles = [WallAngle.Slab, WallAngle.Overhang];
    crag.seasons = [Season.Summer, Season.Spring];
    crag.rainProof = true;

    crag.description =
      "Plezališče je oktobra 2015 opremila skupina 9 francoskih plezalcev (http://www.ffcam.fr/croatie-excellence-equipement.html) na pobudo domačina z Brača Iva Ljubetića-Šteke, vse težje smeri (do 8c) je prvi preplezal Mathieu Bouyoud. Smeri so večinoma dolge (do 50 m) in navpične do zmerno previsne. <br /> Levo od glavnega sektorja je 5 nekoliko krajših smeri neznanega avtorja (ocene srednjih treh so zelo približne). Prva (Shiva) in zadnja (San) imata ime napisano na vstopu. Skala še ni očiščena, čelada zelo priporočljiva. Stena je obrnjena na SZ. Plezanje je možno celo leto, tudi ob toplih, suhih zimah, čeprav je stena cel dan v senci.";
  }

  // Find out if any data depicted with icons is missing and if so, construct appropriate messages.
  const iconDataMissing: string[] = [];

  !crag.orientations && iconDataMissing.push("orientaciji");
  !crag.approachTime && iconDataMissing.push("času dostopa");
  !crag.minRouteLength &&
    !crag.maxRouteLength &&
    iconDataMissing.push("dolžinah smeri");
  !crag.wallAngles && iconDataMissing.push("naklonu stene");
  !crag.seasons && iconDataMissing.push("sezoni");
  crag.rainProof === null && iconDataMissing.push("odpornosti na dež");

  let iconDataMissingMsg;
  let iconDataMissingActionLinkMsg;

  if (iconDataMissing.length > 1) {
    iconDataMissingMsg = `Plezališče nima podatkov o ${iconDataMissing
      .slice(0, -1)
      .join(", ")} in ${iconDataMissing[iconDataMissing.length - 1]}.`;
    iconDataMissingActionLinkMsg = "Dodaj manjkajoče podatke";
  } else {
    iconDataMissingMsg = `Plezališče nima podatka o ${
      iconDataMissing[iconDataMissing.length - 1]
    }.`;
    iconDataMissingActionLinkMsg = `Dodaj podatek o ${
      iconDataMissing[iconDataMissing.length - 1]
    }`;
  }

  return (
    <>
      {/* Icons and edit button */}
      <div className="mx-auto px-4 2xl:container xs:px-8">
        {/* Row 1: some icons (based on screen size) and button. */}
        <div className="mt-7 flex justify-between">
          <div className="flex">
            {crag.orientations && (
              <IconOrientation orientations={crag.orientations} />
            )}

            <div className="hidden sm:flex">
              <ApproachTimeAndHeight crag={crag} />
            </div>

            <div className="hidden xl:flex">
              <ApproachTimeHeightAnglesSeasonsAndRainproof crag={crag} />
            </div>
          </div>

          <div>
            <Button variant="secondary">Uredi plezališče</Button>
          </div>
        </div>

        {/* Row 2 or row 2 and 3 and 4: some icons and all other icons (based on screen size). */}
        <div className="mt-4 block sm:flex xl:hidden">
          <ApproachTimeHeightAnglesSeasonsAndRainproof crag={crag} />
        </div>

        {/* If any data depicted with icons is missing invite user to fill it out. */}
        {iconDataMissing.length > 0 && (
          <div className="mt-4 flex">
            <IconMissing />
            <div className="ml-2">
              {iconDataMissingMsg}{" "}
              <Link href="">{iconDataMissingActionLinkMsg}</Link>.
            </div>
          </div>
        )}
      </div>

      {/* Cover image and description. */}
      <div className="mx-auto mt-7 grid grid-cols-1 gap-x-7 gap-y-10 2xl:container xs:px-8 lg:grid-cols-2">
        <Image
          src={sampleImage}
          alt="Sample Cover Image"
          className="xs:rounded-lg"
        />

        <div className="mx-4 xs:mx-0">
          <h4>Opis plezališča</h4>
          <p className="mt-4">
            {crag.description || (
              <span className="flex">
                <IconMissing />
                <span className="ml-2">
                  Plezališče nima opisa.{" "}
                  <Link href="">Dodaj opis plezališča</Link>.
                </span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Grade distro, visits distro, access, map. */}
      <div className="mx-auto mt-10 grid grid-cols-1 gap-x-7 gap-y-10 2xl:container xs:px-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <GradeDistribution crag={crag} />
        </div>

        <VisitsDistribution crag={crag} />

        <div className="mx-4 xs:mx-0">
          <h4>Dostop</h4>
          <p className="mt-4">
            Plezališče se nahaja v Kamniški Bistrici: Parkiraš na parkirišču za
            slap Orglice, po potki hodiš do reke. Nadaljuješ po gozdni cesti ob
            reki 5 min. Nato boš na levi videl velik možic, tam zaviješ in
            slediš poti do plezališča. Pot gre mimo velikih balvanov. Od
            parkirišča do plezališča 10 min.
          </p>
          <div className="mt-8">
            <div className="flex">
              <IconParking />
              <span className="ml-2">45,56794, 13,86269</span>
            </div>
            <div className="mt-2 flex">
              <IconWall />
              <span className="ml-2">45,56794, 13,86269</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Map
            center={[45.567706816120364, 13.863458632993037]}
            zoom={17}
            markers={[
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
          />
        </div>
      </div>
    </>
  );
}

function ApproachTimeAndHeight({ crag }: { crag: CragInfo }) {
  return (
    <>
      {crag.approachTime && (
        <div className="flex items-end">
          <Spacer className={`hidden ${crag.orientations ? "sm:block" : ""}`} />
          <IconWalk />
          <span className="-ml-0.5 font-medium">{crag.approachTime} min</span>
        </div>
      )}

      {crag.minRouteLength && (
        <div className="flex items-end">
          <Spacer
            className={`
              ${crag.approachTime ? "block" : "hidden"}
              ${crag.orientations || crag.approachTime ? "sm:block" : ""}
              `}
          />
          <IconHeight />
          <span className="-ml-1.5 font-medium">
            {`${crag.minRouteLength}${
              crag.minRouteLength !== crag.maxRouteLength
                ? `-${crag.maxRouteLength}`
                : ""
            } m`}
          </span>
        </div>
      )}
    </>
  );
}

function ApproachTimeHeightAnglesSeasonsAndRainproof({
  crag,
}: {
  crag: CragInfo;
}) {
  return (
    <>
      <div>
        {/* Approach time and height. */}
        <div className="flex sm:hidden">
          <ApproachTimeAndHeight crag={crag} />
        </div>

        {/* Wall angles. */}
        {crag.wallAngles && (
          <div className="mt-4 flex sm:mt-0">
            <Spacer
              className={`
                hidden
                ${
                  crag.orientations || crag.approachTime || crag.minRouteLength
                    ? "xl:block"
                    : ""
                }`}
            />
            <div
              className={`${
                crag.wallAngles.includes(WallAngle.Slab)
                  ? ""
                  : "text-neutral-300"
              }`}
            >
              <IconSlab />
            </div>
            <div
              className={`ml-4 ${
                crag.wallAngles.includes(WallAngle.Vertical)
                  ? ""
                  : "text-neutral-300"
              }`}
            >
              <IconVertical />
            </div>
            <div
              className={`ml-4 ${
                crag.wallAngles.includes(WallAngle.Overhang)
                  ? ""
                  : "text-neutral-300"
              }`}
            >
              <IconOverhang />
            </div>
            <div
              className={`ml-4 ${
                crag.wallAngles.includes(WallAngle.Roof)
                  ? ""
                  : "text-neutral-300"
              }`}
            >
              <IconRoof />
            </div>
          </div>
        )}
      </div>

      {/* Best seasons and rainproof. */}
      <div className={`mt-4 flex sm:mt-0`}>
        {crag.seasons && (
          <>
            <Spacer
              className={`
               hidden
               ${crag.wallAngles ? "sm:block" : ""}
               ${
                 crag.orientations ||
                 crag.approachTime ||
                 crag.minRouteLength ||
                 crag.wallAngles ||
                 crag.seasons
                   ? "xl:block"
                   : ""
               }`}
            />
            <div className="flex gap-5">
              <div
                className={`${
                  crag.seasons.includes(Season.Spring) ? "" : "text-neutral-300"
                }`}
              >
                <IconSpring />
              </div>
              <div
                className={`${
                  crag.seasons.includes(Season.Summer) ? "" : "text-neutral-300"
                }`}
              >
                <IconSummer />
              </div>
              <div
                className={`${
                  crag.seasons.includes(Season.Autumn) ? "" : "text-neutral-300"
                }`}
              >
                <IconAutumn />
              </div>
              <div
                className={`${
                  crag.seasons.includes(Season.Winter) ? "" : "text-neutral-300"
                }`}
              >
                <IconWinter />
              </div>
            </div>
          </>
        )}

        {crag.rainProof !== null && (
          <>
            <Spacer
              className={`
                ${crag.seasons ? "block" : "hidden"}
                ${crag.seasons || crag.wallAngles ? "sm:block" : ""}
                ${
                  crag.orientations ||
                  crag.approachTime ||
                  crag.minRouteLength ||
                  crag.wallAngles ||
                  crag.seasons
                    ? "xl:block"
                    : ""
                }
                `}
            />
            <div className={`${!!crag.rainProof ? "" : "text-neutral-300"}`}>
              <IconRainproof />
            </div>
          </>
        )}
      </div>
    </>
  );
}

// Vertical divider between icon groups.
function Spacer({ className }: { className?: string }) {
  let spacerClasses = "ml-4 h-10 border-l border-neutral-200 pl-4";
  if (className) {
    spacerClasses += ` ${className}`;
  }

  return <div className={spacerClasses}></div>;
}

gql`
  query CragInfo($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      sectors {
        id
        routes {
          id
          difficulty
          length
        }
      }
      defaultGradingSystem {
        id
      }
      activityByMonth
      orientations
      approachTime
      wallAngles
      seasons
      rainProof
    }
  }
`;

export default CragInfoPage;
