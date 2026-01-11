import Breadcrumbs from "@/components/breadcrumbs";
import ClimbingLogTabMenu from "./components/climbing-log-tab-menu";
import ClimbingLogBreadcrumbs from "./components/climbing-log-breadcrumbs";

interface Params {
  cragSlug: string;
}

interface Props {
  children: React.ReactNode;
  params: Promise<Params>;
}

async function ClimbingLogLayout(props: Props) {
  const params = await props.params;

  const { cragSlug } = params;

  const { children } = props;

  return (
    <>
      <div className="bg-neutral-100">
        <div className="mx-auto px-4 2xl:container xs:px-8">
          <div className="pt-4">
            <ClimbingLogBreadcrumbs />
            <h1 className="pb-8 pt-12 text-3xl">Plezalni dnevnik</h1>
          </div>
        </div>
        <ClimbingLogTabMenu />
      </div>
      <div>{children}</div>
    </>
  );
}

export default ClimbingLogLayout;
