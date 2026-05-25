import { IconSize } from "@/components/ui/icons/icon-size";
import { readdirSync } from "fs";
import { readFileSync } from "fs";
import { lazy } from "react";

function IconsPage() {
  const files = readdirSync("./src/components/ui/icons");
  if (!files) {
    return <></>;
  }

  const iconComponents = files
    .filter((file) => file != "icon-size.tsx")
    .map((file) => ({
      component: lazy(
        () => import(`../../../components/ui/icons/${file.replace(".tsx", "")}`)
      ),
      name: file.replace(".tsx", ""),
      sizes: {
        small: readFileSync(`./src/components/ui/icons/${file}`)
          .toString()
          .includes("IconSize.small"),
        regular: readFileSync(`./src/components/ui/icons/${file}`)
          .toString()
          .includes("IconSize.regular"),
        large: readFileSync(`./src/components/ui/icons/${file}`)
          .toString()
          .includes("IconSize.large"),
        xl: readFileSync(`./src/components/ui/icons/${file}`)
          .toString()
          .includes("IconSize.xl"),
      },
    }));

  return (
    <div className="m-8">
      <h3>Icons list</h3>

      <div className="mt-14 grid grid-cols-4 gap-4">
        {iconComponents.map((Icon, index) => (
          <>
            {!Icon.sizes.small &&
            !Icon.sizes.regular &&
            !Icon.sizes.large &&
            !Icon.sizes.xl ? (
              <>
                <div></div>
                <div
                  key={index}
                  className="flex w-32 flex-col items-center pb-6 text-center"
                >
                  <div className="inline-block">
                    <Icon.component />
                  </div>
                  <div>{Icon.name}</div>
                </div>
                <div></div>
                <div></div>
              </>
            ) : (
              <>
                {Icon.sizes.small ? (
                  <div
                    key={`${index}-small`}
                    className="flex w-32 flex-col items-center pb-6 text-center"
                  >
                    <div className="inline-block">
                      <Icon.component size={IconSize.small} />
                    </div>
                    <div>{Icon.name}, small</div>
                  </div>
                ) : (
                  <div></div>
                )}

                {Icon.sizes.regular ? (
                  <div
                    key={`${index}-regular`}
                    className="flex w-32 flex-col items-center pb-6 text-center"
                  >
                    <div className="inline-block">
                      <Icon.component size={IconSize.regular} />
                    </div>
                    <div>{Icon.name}, regular</div>
                  </div>
                ) : (
                  <div></div>
                )}

                {Icon.sizes.large ? (
                  <div
                    key={`${index}-large`}
                    className="flex w-32 flex-col items-center pb-6 text-center"
                  >
                    <div className="inline-block">
                      <Icon.component size={IconSize.large} />
                    </div>
                    <div>{Icon.name}, large</div>
                  </div>
                ) : (
                  <div></div>
                )}

                {Icon.sizes.xl ? (
                  <div
                    key={`${index}-xl`}
                    className="flex w-32 flex-col items-center pb-6 text-center"
                  >
                    <div className="inline-block">
                      <Icon.component size={IconSize.xl} />
                    </div>
                    <div>{Icon.name}, xl</div>
                  </div>
                ) : (
                  <div></div>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default IconsPage;
