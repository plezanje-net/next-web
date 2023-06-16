"use client";
import TextArea from "../../../components/ui/text-area";

function TextAreaPage() {
  return (
    <div className="m-8">
      <h1 className="text-xl">Text area demo</h1>

      <div className="mt-10 w-96">
        <TextArea
          label="Default"
          description="Leave a comment"
          placeholder="Your comment goes here."
        />
      </div>

      <div className="mt-10 w-96">
        <TextArea label="Prefilled" defaultValue="Raje idi spat!" />
      </div>

      <div className="mt-10 w-96">
        <TextArea
          label="Invalid"
          defaultValue="Ti bo dalo malo notranjega miru."
          errorMessage="That's nonsense"
        />
      </div>

      <div className="mt-10 w-96">
        <TextArea
          label="Disabled"
          defaultValue="Namesto da daješ svoje nebulozne predloge."
          isDisabled
        />
      </div>
    </div>
  );
}

export default TextAreaPage;
