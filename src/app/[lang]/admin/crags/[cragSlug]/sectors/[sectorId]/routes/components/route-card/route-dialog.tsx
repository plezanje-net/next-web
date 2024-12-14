import Dialog from "@/components/ui/dialog";
import TextField from "@/components/ui/text-field";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Option, Select } from "@/components/ui/select";
import { TGradingSystemId, gradingSystems } from "@/utils/grading-systems";
import Checkbox from "@/components/ui/checkbox";
import TextArea from "@/components/ui/text-area";
import createRouteAction from "../../server-actions/create-route-action";
import { Route } from "@/graphql/generated";
import updateRouteAction from "../../server-actions/update-route-action";

type TRouteDialogBaseProps = {
  formType: "new" | "edit";
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type TNewRouteDialogProps = TRouteDialogBaseProps & {
  formType: "new";
  position: number;
  sectorId: string;

  route?: never;
};

type TEditRouteDialogProps = TRouteDialogBaseProps & {
  formType: "edit";
  route: Route;

  position?: never;
  sectorId?: never;
};

type TRouteDialogProps = TNewRouteDialogProps | TEditRouteDialogProps;

function RouteDialog({
  formType,
  isOpen,
  setIsOpen,
  position,
  sectorId,
  route,
}: TRouteDialogProps) {
  // Determine default/initial values for all form fields
  let defaultValues: {
    name: string;
    type: string;
    gradingSystemId: string;
    difficulty: string;
    isProject: boolean;
    length: string;
    author: string;
    description: string;
  };

  switch (formType) {
    case "new":
      defaultValues = {
        name: "",
        type: "sport",
        gradingSystemId: getPossibleGradingSystems("sport")[0].id,
        difficulty: "",
        isProject: false,
        length: "",
        author: "",
        description: "",
      };
      break;
    case "edit":
      defaultValues = {
        name: route.name,
        type: route.routeType.id,
        gradingSystemId: route.defaultGradingSystem.id,
        difficulty: `${route.difficulty}` || "",
        isProject: route.isProject,
        length: `${route.length}` || "",
        author: route.author || "",
        description: route.description || "",
      };
      break;
  }

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(defaultValues.name);
  const [type, setType] = useState(defaultValues.type);
  const [gradingSystemId, setGradingSystemId] = useState(
    defaultValues.gradingSystemId
  );
  const [difficulty, setDifficulty] = useState(defaultValues.difficulty);
  const [isProject, setIsProject] = useState(defaultValues.isProject);
  const [length, setLength] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [addAnother, setAddAnother] = useState(false);

  const [nameError, setNameError] = useState("");
  const nameRef = useRef<HTMLDivElement>(null);
  const [difficultyError, setDifficultyError] = useState("");
  const difficultyRef = useRef<HTMLDivElement>(null);

  const handleNameChange = (name: string) => {
    setNameError("");
    setName(name);
  };

  const handleTypeChange = (type: string) => {
    // when type changes set grading system to first possible with the new type
    setGradingSystemId(getPossibleGradingSystems(type)[0].id);
    setDifficulty("");
    setType(type);
  };

  const handleGradingSystemIdChange = (gradingSystemId: string) => {
    setDifficulty("");
    setGradingSystemId(gradingSystemId);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setDifficultyError("");
    setDifficulty(difficulty);
  };

  const handleIsProjectChange = (isProject: boolean) => {
    if (isProject) {
      setDifficultyError("");
      setDifficulty("");
    }
    setIsProject(isProject);
  };

  const possibleGradingSystems = getPossibleGradingSystems(type);

  const possibleGrades = gradingSystemId
    ? gradingSystems[gradingSystemId as TGradingSystemId].grades
    : [];

  const resetForm = () => {
    // reset fields
    setName(defaultValues.name);
    setType(defaultValues.type);
    setGradingSystemId(defaultValues.gradingSystemId);
    setDifficulty(defaultValues.difficulty);
    setIsProject(defaultValues.isProject);
    setLength(defaultValues.length);
    setAuthor(defaultValues.author);
    setDescription(defaultValues.description);

    // clear errors
    setNameError("");
    setDifficultyError("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleConfirm = async () => {
    formRef.current?.requestSubmit();
  };

  const handleFormAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    const errorRefs = []; // to determine if any errors and where to scroll to
    //    - name is required
    if (!name) {
      setNameError("Ime smeri je obvezen podatek.");
      errorRefs.push(nameRef);
    }

    //    - difficulty is required if not a project
    if (!isProject && !difficulty) {
      setDifficultyError("Težavnost smeri je obvezen podatek.");
      errorRefs.push(difficultyRef);
    }

    if (errorRefs.length > 0) {
      setLoading(false);
      errorRefs.shift()?.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const routeData = {
      name: name,
      routeTypeId: type,
      defaultGradingSystemId: gradingSystemId,
      baseDifficulty: +difficulty || null,
      isProject: isProject,
      length: +length || null,
      author: author || null,
      // description: description || null,  // TODO: be support needed
    };

    switch (formType) {
      case "new":
        const newRouteData = {
          ...routeData,
          position: position + 1,
          sectorId: sectorId,
          publishStatus: "draft",
        };

        await createRouteAction(newRouteData);
        resetForm();
        break;

      case "edit":
        const updateRouteData = {
          ...routeData,
          id: route.id,
        };
        await updateRouteAction(updateRouteData);
        break;
    }

    // TODO: check for errors

    setIsOpen(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <Dialog
      title={formType === "new" ? "Dodajanje smeri" : "Urejanje smeri"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cancel={{
        label: "Prekliči",
        callback: handleCancel,
        disabled: loading,
      }}
      confirm={{
        label: "Shrani",
        callback: handleConfirm,
        loading: loading,
        disabled: loading,
        dontCloseOnConfirm: true,
      }}
    >
      <form onSubmit={handleFormAction} ref={formRef}>
        <div ref={nameRef}>
          <TextField
            label="Ime smeri"
            value={name}
            onChange={handleNameChange}
            autoFocus
            disabled={loading}
            errorMessage={nameError}
          />
        </div>

        <div className="mt-6">
          {/* TODO: should we restrict based on crag type? toDiscuss */}
          <Select
            value={type}
            onChange={handleTypeChange}
            label="Tip smeri"
            disabled={loading}
          >
            <Option value="sport">Športna</Option>
            <Option value="boulder">Balvan</Option>
            <Option value="multipitch">Večraztežajna</Option>
            <Option value="combined">Kombinirana</Option>
            <Option value="alpine">Alpinistična</Option>
          </Select>
        </div>

        <div className="mt-6">
          <Select
            value={gradingSystemId}
            onChange={handleGradingSystemIdChange}
            label="Sistem ocenjevanja"
            disabled={loading}
          >
            {possibleGradingSystems.map((gradingSystem) => (
              <Option key={gradingSystem.id} value={gradingSystem.id}>
                {gradingSystem.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-6" ref={difficultyRef}>
          <Select
            value={difficulty}
            onChange={handleDifficultyChange}
            label="Bazna ocena"
            disabled={!possibleGrades.length || isProject || loading}
            errorMessage={difficultyError}
          >
            {possibleGrades.map((grade) => (
              <Option key={grade.id} value={`${grade.difficulty}`}>
                {grade.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-6">
          <Checkbox
            checked={isProject}
            onChange={handleIsProjectChange}
            label="Smer je projekt"
            disabled={loading}
          />
        </div>

        <div className="mt-6">
          <TextField
            type="natural"
            label="Dolžina"
            value={length}
            onChange={setLength}
            disabled={loading}
            suffix={<span>m</span>}
          />
        </div>

        <div className="mt-6">
          <TextField
            label="Avtor/ica"
            value={author}
            onChange={setAuthor}
            disabled={loading}
          />
        </div>

        <div className="mt-6">
          <TextArea
            label="Opis smeri"
            value={description}
            onChange={setDescription}
            isDisabled={loading}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Checkbox
            checked={addAnother}
            onChange={setAddAnother}
            label="Dodaj še eno"
            disabled={loading}
          />
        </div>

        <button type="submit" hidden />
      </form>
    </Dialog>
  );
}

export default RouteDialog;

const getPossibleGradingSystems = (routeType: string) => {
  return Object.values(gradingSystems).filter((gradingSystem) =>
    gradingSystem.routeTypes.some((rt) => rt.id === routeType)
  );
};
