import { gql } from "urql/core";
import {
  Crag,
  CragActivitiesByMonthDocument,
} from "../../../graphql/generated";
import urqlServer from "../../../graphql/urql-server";
import VisitsByMonth from "../../../components/visits-distribution";

async function getCragBySlug(crag: string): Promise<Crag> {
  const {
    data: { cragBySlug },
  } = await urqlServer().query(CragActivitiesByMonthDocument, {
    crag,
  });
  return cragBySlug;
}

async function VisitsDistributionPage() {
  // const cragSlug = "schaffelberg";
  const cragSlug = "misja-pec";
  // const cragSlug = "frankenjura";
  // const cragSlug = "chulilla";
  // const cragSlug = "boc";
  // const cragSlug = "kotecnik";
  // const cragSlug = "armesko";

  const crag = await getCragBySlug(cragSlug);
  console.log(crag);

  return (
    <div className="mb-20">
      <div className="mt-20 grid grid-cols-1 gap-7 xs:mx-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="">
          <VisitsByMonth crag={crag} />
        </div>
        <div className="lg:col-span-2">
          <h4 className="mx-4 xs:mx-0">Lorem Ipsum</h4>
          <div className="mt-4 h-96 bg-neutral-100 xs:rounded-lg"></div>
        </div>
      </div>

      <div className="mx-4 mt-16 xs:mx-8">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>
              You can see other crag visits distros by changing crag slug in
              code
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

gql`
  query CragActivitiesByMonth($crag: String!) {
    cragBySlug(slug: $crag) {
      id
      slug
      activityByMonth
    }
  }
`;

export default VisitsDistributionPage;
