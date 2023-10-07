import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { Crag, CragInfoDocument } from "@/graphql/generated";
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
import IconOrientation, {
  Orientation,
} from "@/components/ui/icons/orientation";
import GradeDistribution from "@/components/grade-distribution";
import VisitsDistribution from "@/components/visits-distribution";
import sampleImage from "@/public/sample-cover.jpeg";
import Map from "@/components/map/map";
import Button from "@/components/ui/button";

interface Params {
  cragSlug: string;
}

/*
TODO:
-- fill with real data:
  - orientations
  - walk time
  - route heights
  - wall angles
  - best seasons
  - rainproof
  - cover photo
  - description
  - access
  - gps coords
  - map

-- connect button

*/

async function CragInfoPage({ params }: { params: Params }) {
  const { data } = await urqlServer().query(CragInfoDocument, {
    crag: params.cragSlug,
  });

  const crag = data.cragBySlug as Crag;

  return (
    <>
      {/* icons and actions */}
      <div className="mx-auto px-4 2xl:container xs:px-8">
        {/* row 1: some icons (based on screen size) and actions */}
        <div className="mt-7 flex justify-between">
          <div className="flex">
            <IconOrientation
              orientations={[Orientation.NORTH, Orientation.SOUTH]}
            />

            <div className="ml-4 hidden border-l border-neutral-200 pl-4 sm:flex">
              <ApproachTimeAndHeight />
            </div>
          </div>

          <div>
            <Button variant="secondary">Uredi plezališče</Button>
          </div>
        </div>

        {/* row 2: some icons (based on screen size) and all other icons. Wrapping in 'groups' */}
        <div className="mt-4 block sm:flex">
          <div className="">
            <div className="flex sm:hidden">
              <ApproachTimeAndHeight />
            </div>

            {/* wall angles */}
            <div className="mt-4 flex gap-5 sm:mt-0">
              <div className="text-neutral-300">
                <IconSlab />
              </div>
              <div className="text-neutral-300">
                <IconVertical />
              </div>
              <div>
                <IconOverhang />
              </div>
              <div>
                <IconRoof />
              </div>
            </div>
          </div>

          {/* best seasons and rainproof */}
          <div className="mt-4 flex gap-5 sm:ml-4 sm:mt-0 sm:border-l sm:border-neutral-200 sm:pl-4">
            <div>
              <IconSpring />
            </div>
            <div className="text-neutral-300">
              <IconSummer />
            </div>
            <div>
              <IconAutumn />
            </div>
            <div className="text-neutral-300">
              <IconWinter />
            </div>
            <div className="ml-4 border-l border-neutral-200 pl-4">
              <IconRainproof />
            </div>
          </div>
        </div>
      </div>

      {/* cover image and description */}
      <div className="mx-auto mt-7 grid grid-cols-1 gap-x-7 gap-y-10 2xl:container xs:px-8 lg:grid-cols-2">
        <Image
          src={sampleImage}
          alt="Sample Cover Image"
          className="xs:rounded-lg"
        />

        <div className="mx-4 xs:mx-0">
          <h4>Opis plezališča</h4>
          <p className="mt-4">
            Plezališče je oktobra 2015 opremila skupina 9 francoskih plezalcev
            (http://www.ffcam.fr/croatie-excellence-equipement.html) na pobudo
            domačina z Brača Iva Ljubetića-Šteke, vse težje smeri (do 8c) je
            prvi preplezal Mathieu Bouyoud. Smeri so večinoma dolge (do 50 m) in
            navpične do zmerno previsne.
            <br />
            Levo od glavnega sektorja je 5 nekoliko krajših smeri neznanega
            avtorja (ocene srednjih treh so zelo približne). Prva (Shiva) in
            zadnja (San) imata ime napisano na vstopu. Skala še ni očiščena,
            čelada zelo priporočljiva. Stena je obrnjena na SZ. Plezanje je
            možno celo leto, tudi ob toplih, suhih zimah, čeprav je stena cel
            dan v senci.
          </p>
        </div>
      </div>

      {/* grade distro, visits distro, access, map */}
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

function ApproachTimeAndHeight() {
  return (
    <>
      <div className="flex items-end">
        <IconWalk />
        <span className="-ml-0.5 font-medium">20 min</span>
      </div>
      <div className="ml-4 flex items-end border-l border-neutral-200 pl-4">
        <IconHeight />
        <span className="-ml-1.5 font-medium">10-40 m</span>
      </div>
    </>
  );
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
        }
      }
      defaultGradingSystem {
        id
      }
      activityByMonth
    }
  }
`;

export default CragInfoPage;
