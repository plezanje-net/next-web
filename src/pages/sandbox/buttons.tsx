import Button from "../../components/ui/button";

export default function Buttons() {
  return (
    <>
      <h1>Our buttons</h1>
      <div className="flex flex-col items-start p-3">
        <Button variant="primary" className="mb-2">
          Button primary
        </Button>
        <Button variant="secondary" className="mb-2">
          Button secondary
        </Button>
        <Button loading>Button 3</Button>
      </div>
    </>
  );
}
