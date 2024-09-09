type Params = {
  cragSlug: string;
  routeSlug: string;
};

function RoutePage({ params }: { params: Params }) {
  console.log(params);
  return (
    <>
      Route page placeholder here only to test navigation and set up the
      structure detached from crag layout.
    </>
  );
}

export default RoutePage;
