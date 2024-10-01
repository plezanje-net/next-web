"use client";

import Pagination from "@/components/ui/pagination";

function ClimbingLogPage() {

  function handlePageChange () {
    console.log('page changed');
  }

  return (
    <>
      Ascents
      <Pagination currentPage={1} totalPages={100} onPageChange={handlePageChange} />
    </>
  );
}

export default ClimbingLogPage;
