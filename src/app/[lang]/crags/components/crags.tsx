"use client";

import ContentHeader from "@/components/content-header";
import FiltersPane from "./filters-pane/filters-pane";
import CragList from "./crag-list/crag-list";
import ActionsRow from "./actions-row/actions-row";
import Breadcrumbs from "@/components/breadcrumbs";

function Crags() {
  const crumbs = [
    { label: "Plezanje.net", link: "/" },
    { label: "Plezališča", link: null },
  ];

  return (
    <>
      <ContentHeader
        heading="Plezališča"
        breadcrumbs={<Breadcrumbs crumbs={crumbs} />}
      />

      <ActionsRow />

      <div className="mx-auto flex items-start 2xl:container md:px-8">
        <FiltersPane />
        <CragList />
      </div>
    </>
  );
}

export default Crags;
