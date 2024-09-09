"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import ContentHeader from "@/components/content-header";
import FiltersPane from "./filters-pane/filters-pane";
import CragList from "./crag-list/crag-list";
import ActionsRow from "./actions-row/actions-row";

function Crags() {
  return (
    <>
      <ContentHeader
        heading="Plezališča"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Plezanje.net", link: "/" },
              { label: "Plezališča", link: "" },
            ]}
          />
        }
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
