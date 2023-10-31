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
import Map from "@/components/map/map";
import Button from "@/components/ui/button";
import IconMissing from "@/components/ui/icons/missing";
import Link from "@/components/ui/link";
import { TMarker } from "@/components/map/lazy-map";
import { IconSize } from "@/components/ui/icons/icon-size";

type TCragInfoPageParams = {
  cragSlug: string;
};

/*
TODO:
-- fill with real data:  

-- enable button
-- enable links
-- make coordinates links
-- many parkings, many walls -> numbers next to icons?...

-- what if cover image to small? test, but maybe no need to resolve as cover images will have to be manually chosen by editors
*/

type TCragInfo = Crag & {
  minRouteLength: number | null;
  maxRouteLength: number | null;
};

type TSector = {
  id: string;
  label: string;
  name: string;
};

type TParkings = {
  [key: string]: { lat: number; lon: number; sectors: TSector[] };
};

// TODO: after this page's layout is tested remove this dummy filler
const DUMMY_DATA = true;
// const DUMMY_DATA = false;

async function CragInfoPage({ params }: { params: TCragInfoPageParams }) {
  const response = await urqlServer().query(CragInfoDocument, {
    crag: params.cragSlug,
  });
  const data = response.data;
  const crag: TCragInfo = data.cragBySlug;

  // Find lenghts of shortest and longest route.
  const routeLengths = crag.sectors
    .flatMap((sector) => sector.routes)
    .map((route) => route.length || 0)
    .filter((length) => !!length);
  [crag.minRouteLength, crag.maxRouteLength] = [
    routeLengths.length ? Math.min(...routeLengths) : null,
    routeLengths.length ? Math.max(...routeLengths) : null,
  ];

  const imagesBaseUrl = `${process.env.IMAGES_PROTOCOL}://${process.env.IMAGES_HOSTNAME}${process.env.IMAGES_PATHNAME}`;

  // TODO: remove dummy logic after tested
  if (DUMMY_DATA) {
    crag.orientations = [Orientation.North];
    crag.approachTime = 10;
    crag.minRouteLength = 10;
    crag.maxRouteLength = 15;
    crag.wallAngles = [WallAngle.Slab, WallAngle.Overhang];
    crag.seasons = [Season.Summer, Season.Spring];
    crag.rainProof = true;

    crag.coverImage = {
      id: "",
      path: "1040/crags/mislinja",
      extension: "jpg",
      maxIntrinsicWidth: 1200,
      aspectRatio: 0.75,
    };

    crag.description =
      "Plezališče je oktobra 2015 opremila skupina 9 francoskih plezalcev (http://www.ffcam.fr/croatie-excellence-equipement.html) na pobudo domačina z Brača Iva Ljubetića-Šteke, vse težje smeri (do 8c) je prvi preplezal Mathieu Bouyoud. Smeri so večinoma dolge (do 50 m) in navpične do zmerno previsne. <br /> Levo od glavnega sektorja je 5 nekoliko krajših smeri neznanega avtorja (ocene srednjih treh so zelo približne). Prva (Shiva) in zadnja (San) imata ime napisano na vstopu. Skala še ni očiščena, čelada zelo priporočljiva. Stena je obrnjena na SZ. Plezanje je možno celo leto, tudi ob toplih, suhih zimah, čeprav je stena cel dan v senci.";

    crag.activityByMonth = [0, 2, 3, 4, 6, 3, 2, 0, 1, 0, 0, 1];

    crag.access =
      "Plezališče se nahaja v Kamniški Bistrici: Parkiraš na parkirišču za slap Orglice, po potki hodiš do reke. Nadaljuješ po gozdni cesti ob reki 5 min. Nato boš na levi videl velik možic, tam zaviješ in slediš poti do plezališča. Pot gre mimo velikih balvanov. Od parkirišča do plezališča 10 min.";

    crag.sectors[0].parkings = [
      {
        id: "a1",
        lat: 45.567241935747305,
        lon: 13.862603368337682,
      },
    ];
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
    iconDataMissingActionLinkMsg = "Dodaj manjkajoče podatke.";
  } else {
    iconDataMissingMsg = `Plezališče nima podatka o ${
      iconDataMissing[iconDataMissing.length - 1]
    }.`;
    iconDataMissingActionLinkMsg = `Dodaj podatek o ${
      iconDataMissing[iconDataMissing.length - 1]
    }.`;
  }

  const nrAllVisits = crag.activityByMonth.reduce((acc, curr) => acc + curr, 0);

  // Generate parkings markers data
  const parkings: TParkings = {};
  for (const sector of crag.sectors) {
    for (const parking of sector.parkings) {
      if (typeof parkings[parking.id] !== "undefined") {
        parkings[parking.id].sectors.push({
          id: sector.id,
          label: sector.label,
          name: sector.name,
        });
      } else {
        parkings[parking.id] = {
          lat: parking.lat,
          lon: parking.lon,
          sectors: [
            {
              id: sector.id,
              label: sector.label,
              name: sector.name,
            },
          ],
        };
      }
    }
  }

  const coordsFormatter = new Intl.NumberFormat("sl-SI", {
    minimumFractionDigits: 5,
  });

  // Construct array of all parkings and walls markers
  const markers: TMarker[] = Object.entries(parkings).map(
    ([_id, { lat, lon, sectors }]) => ({
      type: "parking",
      position: [lat, lon],
      popupContent: <ParkingMarkerPopupContent sectors={sectors} />,
    })
  );
  if (crag.lat && crag.lon) {
    markers.push({
      type: "wall",
      position: [crag.lat, crag.lon],
      popupContent: <div>{`Plezališče ${crag.name}`}</div>,
    });
  }

  return (
    <>
      {/* Icons and edit button */}
      <div className="mx-auto px-4 2xl:container xs:px-8">
        {/* Row 1: some icons (based on screen size) and button. */}
        <div className="mt-7 flex justify-between">
          <div className="flex">
            {crag.orientations && (
              <IconOrientation
                orientations={crag.orientations}
                size={IconSize.large}
              />
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
            <div>
              <IconMissing />
            </div>
            <div className="ml-2">
              {iconDataMissingMsg}{" "}
              <Link href="">{iconDataMissingActionLinkMsg}</Link>
            </div>
          </div>
        )}
      </div>

      {/* Cover image and description. */}
      <div className="mx-auto mt-7 grid grid-cols-1 gap-x-7 gap-y-10 2xl:container xs:px-8 md:grid-cols-2">
        {crag.coverImage ? (
          <Image
            src={`${imagesBaseUrl}/${crag.coverImage.path}.${crag.coverImage.extension}`}
            width={crag.coverImage.maxIntrinsicWidth}
            height={
              crag.coverImage.maxIntrinsicWidth / crag.coverImage.aspectRatio
            }
            sizes="(max-width: 512px) 100vw, (max-width: 768px) calc(100vw - 64px), (max-width: 1536px) calc(50vw - 64px - 28px), 722px"
            alt={crag.name}
            className="xs:rounded-lg"
            quality={100}
            priority
          />
        ) : (
          <div className="mx-4 xs:mx-0">
            <div className="flex">
              <div>
                <IconMissing />
              </div>
              <div className="ml-2">
                Plezališče nima naslovne fotografije.{" "}
                <Link href="">Dodaj naslovno fotografijo.</Link>
              </div>
            </div>
          </div>
        )}
        <div className="mx-4 xs:mx-0">
          <h4>Opis plezališča</h4>
          <div className="mt-4">
            {crag.description || (
              <div className="flex">
                <IconMissing />
                <div className="ml-2">
                  Plezališče nima opisa.{" "}
                  <Link href="">Dodaj opis plezališča.</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grade distro, visits distro, access, map. */}
      <div className="mx-auto mt-10 grid grid-cols-1 gap-x-7 gap-y-10 2xl:container xs:px-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Grade distro */}
        <div className="md:col-span-2">
          <h4 className="mx-4 xs:mx-0">Distribucija težavnosti</h4>
          <div className="mt-4">
            <GradeDistribution crag={crag} />
          </div>
        </div>

        {/* Visits distro */}
        <div>
          <h4 className="mx-4 xs:mx-0">Obiskanost po mesecih</h4>
          {nrAllVisits > 0 ? (
            <div className="mt-4">
              <VisitsDistribution crag={crag} />
            </div>
          ) : (
            <div className="mx-4 mt-4 xs:mx-0">
              Plezališče še nima zabeleženih obiskov.
            </div>
          )}
        </div>

        <div className="mx-4 xs:mx-0">
          <h4>Dostop</h4>
          {/* Approach description */}
          <div className="mt-4">
            {crag.access || (
              <span className="flex">
                <div className="min-w-4">
                  <IconMissing />
                </div>
                <span className="ml-2">
                  Plezališče nima opisa dostopa.{" "}
                  <Link href="">Dodaj opis dostopa.</Link>
                </span>
              </span>
            )}
          </div>

          {/* GPS coordinates of parkings and walls */}
          <div className="mt-8 flex flex-col gap-2">
            {Object.keys(parkings).length > 0 ? (
              Object.entries(parkings).map(([id, { lat, lon, ...rest }]) => (
                <div key={id} className="flex">
                  <IconParking />
                  <span className="ml-2">
                    {coordsFormatter.format(lat)}, {coordsFormatter.format(lon)}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex">
                <div>
                  <IconMissing />
                </div>
                <div className="ml-2">
                  Plezališče nima podatka o koordinatah parkirišča.{" "}
                  <Link href="">Dodaj koordinate parkirišča.</Link>
                </div>
              </div>
            )}
            {crag.lat && crag.lon ? (
              <div className="flex">
                <IconWall />
                <span className="ml-2">
                  {coordsFormatter.format(crag.lat)},{" "}
                  {coordsFormatter.format(crag.lon)}
                </span>
              </div>
            ) : (
              <div className="flex">
                <div>
                  <IconMissing />
                </div>
                <div className="ml-2">
                  Plezališče nima podatka o koordinatah stene.{" "}
                  <Link href="">Dodaj koordinate stene.</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="md:col-span-2">
          {markers.length > 0 && <Map autoBounds markers={markers} />}
        </div>
      </div>
    </>
  );
}

function ParkingMarkerPopupContent({ sectors }: { sectors: TSector[] }) {
  if (sectors.length > 1) {
    return (
      <div>
        Parkirišče za sektorje:
        <ul className="list-inside list-disc">
          {sectors.map((sector) => (
            <li key={sector.id}>
              {generateSectorLabelName(sector.label, sector.name)}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return `Parkirišče za sektor ${generateSectorLabelName(
      sectors[0].label,
      sectors[0].name
    )}`;
  }
}

function generateSectorLabelName(label: string, name: string) {
  return `${label}${label && name && " - "}${name}`;
}

function ApproachTimeAndHeight({ crag }: { crag: TCragInfo }) {
  return (
    <>
      {crag.approachTime && (
        <div className="flex items-end">
          <IconGroupDivider
            className={`hidden ${crag.orientations ? "sm:block" : ""}`}
          />
          <IconWalk size={IconSize.large} />
          <span className="-ml-0.5 font-medium">{crag.approachTime} min</span>
        </div>
      )}

      {crag.minRouteLength && (
        <div className="flex items-end">
          <IconGroupDivider
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
  crag: TCragInfo;
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
            <IconGroupDivider
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
              <IconSlab size={IconSize.large} />
            </div>
            <div
              className={`ml-4 ${
                crag.wallAngles.includes(WallAngle.Vertical)
                  ? ""
                  : "text-neutral-300"
              }`}
            >
              <IconVertical size={IconSize.large} />
            </div>
            <div
              className={`ml-4 ${
                crag.wallAngles.includes(WallAngle.Overhang)
                  ? ""
                  : "text-neutral-300"
              }`}
            >
              <IconOverhang size={IconSize.large} />
            </div>
            <div
              className={`ml-4 ${
                crag.wallAngles.includes(WallAngle.Roof)
                  ? ""
                  : "text-neutral-300"
              }`}
            >
              <IconRoof size={IconSize.large} />
            </div>
          </div>
        )}
      </div>

      {/* Best seasons and rainproof. */}
      <div className={`mt-4 flex sm:mt-0`}>
        {crag.seasons && (
          <>
            <IconGroupDivider
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
                <IconSpring size={IconSize.large} />
              </div>
              <div
                className={`${
                  crag.seasons.includes(Season.Summer) ? "" : "text-neutral-300"
                }`}
              >
                <IconSummer size={IconSize.large} />
              </div>
              <div
                className={`${
                  crag.seasons.includes(Season.Autumn) ? "" : "text-neutral-300"
                }`}
              >
                <IconAutumn size={IconSize.large} />
              </div>
              <div
                className={`${
                  crag.seasons.includes(Season.Winter) ? "" : "text-neutral-300"
                }`}
              >
                <IconWinter size={IconSize.large} />
              </div>
            </div>
          </>
        )}

        {crag.rainProof !== null && (
          <>
            <IconGroupDivider
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
              <IconRainproof size={IconSize.large} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

// Vertical divider between icon groups.
function IconGroupDivider({ className }: { className?: string }) {
  let dividerClasses = "ml-4 h-10 border-l border-neutral-200 pl-4";
  if (className) {
    dividerClasses += ` ${className}`;
  }

  return <div className={dividerClasses}></div>;
}

gql`
  query CragInfo($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      name
      sectors {
        id
        label
        name
        routes {
          id
          difficulty
          length
        }
        parkings {
          id
          lat
          lon
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
      coverImage {
        id
        path
        extension
        maxIntrinsicWidth
        aspectRatio
      }
      lat
      lon
    }
  }
`;

export default CragInfoPage;
