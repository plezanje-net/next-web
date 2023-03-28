import TextArea from "../../components/ui/text-area";

function TextInputPage() {
  return (
    <div className="m-8">
      <h1 className="text-xl">Text area demo</h1>

      <div className="mt-10 w-96">
        <TextArea label="Default" description="Leave a comment" placeholder="Your comment goes here." />
      </div>

      <div className="mt-10 w-96">
        <TextArea label="Prefilled" value="Raje idi spat!"  />
      </div>

      <div className="mt-10 w-96">
        <TextArea label="Invalid" isInvalid value="Ti bo dalo malo notranjega miru." errorMessage="That's nonsense" />
      </div>

      <div className="mt-10 w-96">
        <TextArea label="Disabled" value="Namesto da daješ svoje nebulozne predloge." isDisabled />
      </div>
    </div>
  );
}

export default TextInputPage;
