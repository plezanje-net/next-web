import Spinner from "@/components/ui/spinner";
import Button from "@/components/ui/button";

function SpinnerPage() {
  return (
    <div className="m-8">
      <h3>Spinner demo</h3>

      <div className="mt-14">
        <h5>Spinner only</h5>
        <div className="mt-4">
          <Spinner />
        </div>
      </div>

      <div className="mt-14">
        <h5>Spinner in button</h5>
        <div className="mt-4">
          <Button variant="primary" loading disabled>
            Button
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SpinnerPage;
