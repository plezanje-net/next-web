import { ReactNode } from "react";

type ContentHeaderProps = {
  heading: string;
  breadcrumbs: ReactNode;
  tabMenu?: ReactNode;
};

function ContentHeader({ heading, breadcrumbs, tabMenu }: ContentHeaderProps) {
  return (
    <>
      <div className="bg-neutral-100">
        <div className="mx-auto px-4 2xl:container xs:px-8">
          <div className="pt-4">
            {breadcrumbs}
            <h1 className="pb-8 pt-12 text-3xl">{heading}</h1>
          </div>
        </div>
        {tabMenu ? (
          tabMenu
        ) : (
          <div className="h-10 box-content border-b border-b-neutral-200 border-t border-t-transparent"></div>
        )}
      </div>
    </>
  );
}

export default ContentHeader;
