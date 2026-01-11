"use client";

import Button from "@/components/ui/button";
import IconClose from "@/components/ui/icons/close";
import IconSearch from "@/components/ui/icons/search";
import TextField from "@/components/ui/text-field";
import { useRef, useState } from "react";

function TextFieldPage() {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const [v4, setV4] = useState("Aliba Gundič");
  const [v5, setV5] = useState("");
  const [v6, setV6] = useState("");
  const [v7, setV7] = useState("");
  const [v8, setV8] = useState("50cent");
  const [v9, setV9] = useState("");
  const [v10, setV10] = useState("");
  const [v11, setV11] = useState("");
  const [v12, setV12] = useState("");
  const [v13, setV13] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="m-8">
      <h3>Text field demo</h3>

      <div className="mt-14 w-80">
        <h5>A simple text field</h5>
        <div className="mt-4">
          <TextField value={v1} onChange={setV1} />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A text field with label</h5>
        <div className="mt-4">
          <TextField value={v2} onChange={setV2} label="Name" />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A text field with placeholder text</h5>
        <div className="mt-4">
          <TextField
            value={v3}
            onChange={setV3}
            label="Name"
            placeholder="What is your name"
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A disabled text field</h5>
        <div className="mt-4">
          <TextField
            value={v4}
            onChange={setV4}
            label="Name"
            placeholder="What is your name"
            disabled
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A text field with prefix icon</h5>
        <div className="mt-4">
          <TextField
            value={v5}
            onChange={setV5}
            label="Name"
            placeholder="What is your name"
            description="Search for your name."
            prefix={<IconSearch />}
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A text field with suffix icon</h5>
        <div className="mt-4">
          <TextField
            value={v6}
            onChange={setV6}
            label="Name"
            description="Search for your name."
            prefix={<IconSearch />}
            suffix={<IconClose />}
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A text field with description</h5>
        <div className="mt-4">
          <TextField
            value={v7}
            onChange={setV7}
            label="Name"
            placeholder="What is your name"
            description="Enter your real name."
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A text field with error message</h5>
        <div className="mt-4">
          <TextField
            value={v8}
            onChange={setV8}
            label="Name"
            placeholder="What is your name"
            description="Enter your real name."
            errorMessage="Your name must start with a letter."
          />
        </div>
      </div>

      <div className="mt-14">
        <h5>A fullwidth text field</h5>
        <div className="mt-4">
          <TextField
            label="Name"
            value={v9}
            onChange={setV9}
            description="Search for your name."
            prefix={<IconSearch />}
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Control focus of a text field</h5>
        <div className="mt-4">
          <TextField
            ref={inputRef}
            value={v10}
            onChange={setV10}
            label="Name"
            placeholder="What is your name"
            description="Enter your real name."
          />
        </div>
        <div className="mt-2">
          <Button
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            Focus
          </Button>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Detect blur of a text field</h5>
        <div className="mt-4">
          <TextField
            value={v11}
            onChange={setV11}
            label="Name"
            placeholder="What is your name"
            description="Enter your real name."
            prefix={<IconSearch />}
            onBlur={() => alert("blrrr")}
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A text field with icon button prefix</h5>
        <div className="mt-4">
          <TextField
            value={v12}
            onChange={setV12}
            label="Name"
            placeholder="What is your name"
            description="Enter your real name."
            prefix={
              <Button variant="quaternary">
                <IconSearch />
              </Button>
            }
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A text field with icon button suffix</h5>
        <div className="mt-4">
          <TextField
            value={v13}
            onChange={setV13}
            label="Name"
            placeholder="What is your name"
            description="Enter your real name."
            prefix={
              <Button
                variant="quaternary"
                onClick={() => {
                  console.log("btn clckd");
                }}
              >
                <IconSearch />
              </Button>
            }
            suffix={
              <Button variant="quaternary">
                <IconClose />
              </Button>
            }
            onBlur={() => {
              console.log("blr");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TextFieldPage;
