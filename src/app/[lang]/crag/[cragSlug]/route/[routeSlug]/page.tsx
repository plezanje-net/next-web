type Params = {
  cragSlug: string;
  routeSlug: string;
};

function RoutePage({ params }: { params: Params }) {
  return (
    <>
      Route page placeholder here only to test returning to crag page with
      browsser navigation
    </>
  );
}

export default RoutePage;
