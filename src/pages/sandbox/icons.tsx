import { readdirSync } from "fs";
import { lazy } from "react";

interface Props {
  files?: string[];
}

function IconsPage({ files }: Props) {
  if (!files) {
    return <></>;
  }

  const iconComponents = files
    .filter((file) => file !== "icon.tsx")
    .map((file) => ({
      component: lazy(
        () => import(`../../components/ui/icons/${file.replace(".tsx", "")}`)
      ),
      name: file.replace(".tsx", ""),
    }));

  return (
    <div className="m-8">
      <h3>Icons list</h3>

      <div className="mt-14 flex flex-wrap">
        {iconComponents.map((Icon, index) => (
          <div
            key={index}
            className="flex w-32 flex-col items-center pb-6 text-center"
          >
            <div className="inline-block">
              <Icon.component />
            </div>
            <div>{Icon.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getServerSideProps() {
  const files = readdirSync("./src/components/ui/icons");
  return {
    props: { files },
  };
}

export default IconsPage;
