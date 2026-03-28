import GradeDistribution from "@/components/grade-distribution";
import { CragInfoDocument, CragInfoQuery } from "@/graphql/generated";
import { gqlRequest } from "@/lib/gql-request";

async function getCragBySlug(
  crag: string
): Promise<CragInfoQuery["cragBySlug"]> {
  const {
    data: { cragBySlug },
  } = await gqlRequest(CragInfoDocument, {
    crag,
  });
  return cragBySlug;
}

async function GradeDistributionPage() {
  // const cragSlug = "schaffelberg";
  const cragSlug = "misja-pec";
  // const cragSlug = "frankenjura";
  // const cragSlug = "chulilla";
  // const cragSlug = "boc";
  // const cragSlug = "kotecnik";
  // const cragSlug = "armesko";

  const crag = await getCragBySlug(cragSlug);

  return (
    <div className="mb-20">
      <div className="mt-20 grid grid-cols-1 gap-7 xs:mx-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h4 className="mx-4 xs:mx-0">Distribucija težavnosti</h4>
          <div className="mt-4">
            <GradeDistribution crag={crag} />
          </div>
        </div>
        <div>
          <h4 className="mx-4 xs:mx-0">Lorem Ipsum</h4>
          <div className="mt-4 h-96 bg-neutral-100 xs:rounded-lg"></div>
        </div>
      </div>

      <div className="mx-4 mt-16 xs:mx-8">
        <h3 className="text-lg">Notes</h3>
        <div className="pl-4">
          <ul className="mt-2 list-outside list-disc">
            <li>
              Might tweak heights when full info page is tested on real data
            </li>
            <li>
              You can see other crag distros by changing crag slug in code
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GradeDistributionPage;
