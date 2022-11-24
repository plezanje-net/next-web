import IconClose from "../../components/ui/icons/close";
import IconSearch from "../../components/ui/icons/search";
import TextInput from "../../components/ui/text-input";

function TextInputPage() {
  return (
    <div className="m-8">
      <h1 className="text-xl">Text input demo</h1>

      <div className="mt-10 w-80">
        <TextInput label="Name" placeholder="What is your name" />
      </div>

      <div className="mt-8 w-80">
        <TextInput
          label="Name"
          placeholder="What is your name"
          description="Enter your real name."
        />
      </div>

      <div className="mt-8 w-80">
        <TextInput
          label="Name"
          placeholder="What is your name"
          description="Enter your real name."
          defaultValue="Slavko Majonezič"
        />
      </div>

      <div className="mt-8 w-80">
        <TextInput
          label="Name"
          placeholder="What is your name"
          description="Enter your real name."
          defaultValue="50cent"
          errorMessage="Your name must start with a letter."
        />
      </div>

      <div className="mt-8 w-80">
        <TextInput
          label="Name"
          defaultValue="Aliba Gundič"
          isDisabled
          description="This is your immutable name."
        />
      </div>

      <div className="mt-8 w-80">
        <TextInput
          label="Name"
          placeholder="What is your name"
          description="Search for your name."
          prefix={<IconSearch />}
        />
      </div>

      <div className="mt-8 w-80">
        <TextInput
          label="Name"
          defaultValue="Aliba"
          description="Search for your name."
          prefix={<IconSearch />}
          suffix={<IconClose />}
        />
      </div>
    </div>
  );
}

export default TextInputPage;
