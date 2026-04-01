import Dialog from "@/components/ui/dialog";
import TextField from "@/components/ui/text-field";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Option, Select } from "@/components/ui/select";
import { TGradingSystemId, gradingSystems } from "@/lib/grading-systems";
import Checkbox from "@/components/ui/checkbox";
import TextArea from "@/components/ui/text-area";
import createRouteAction from "../../lib/create-route-action";
import { EditRoutesPageSectorQuery } from "@/graphql/generated";
import updateRouteAction from "../../lib/update-route-action";
import { diffToGrade } from "@/components/grade";

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
  route: EditRoutesPageSectorQuery["sector"]["routes"][number];

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
    baseDifficulty: string;
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
        baseDifficulty: "",
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
        baseDifficulty:
          route?.difficultyVotes
            .find((vote) => vote.isBase)
            ?.difficulty?.toString() ?? "",
        isProject: route.isProject,
        length: `${route.length}`,
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
  const [baseDifficulty, setBaseDifficulty] = useState(
    defaultValues.baseDifficulty
  );
  const [isProject, setIsProject] = useState(defaultValues.isProject);
  const [length, setLength] = useState(defaultValues.length);
  const [author, setAuthor] = useState(defaultValues.author);
  const [description, setDescription] = useState(defaultValues.description);
  const [addAnother, setAddAnother] = useState(false);

  const [nameError, setNameError] = useState("");
  const nameRef = useRef<HTMLDivElement>(null);
  const [baseDifficultyError, setBaseDifficultyError] = useState("");
  const difficultyRef = useRef<HTMLDivElement>(null);

  const handleNameChange = (name: string) => {
    setNameError("");
    setName(name);
  };

  const handleTypeChange = (type: string) => {
    // when type changes set grading system to first possible with the new type
    setGradingSystemId(getPossibleGradingSystems(type)[0].id);
    setBaseDifficulty("");
    setType(type);
  };

  const handleGradingSystemIdChange = (gradingSystemId: string) => {
    setBaseDifficulty("");
    setGradingSystemId(gradingSystemId);
  };

  const handleBaseDifficultyChange = (difficulty: string) => {
    setBaseDifficultyError("");
    setBaseDifficulty(difficulty);
  };

  const handleIsProjectChange = (isProject: boolean) => {
    if (isProject) {
      setBaseDifficultyError("");
      setBaseDifficulty("");
    }
    setIsProject(isProject);
  };

  const possibleGradingSystems = getPossibleGradingSystems(type);

  let possibleGrades = gradingSystemId
    ? gradingSystems[gradingSystemId as TGradingSystemId].grades
    : [];

  // If base difficulty for the route is an 'inbetween' grade (legacy), we should extend the possible grades with that inbetween grade, so that it can be properly displayed inside the grade select input
  // for now this is only done for french grades (since now we are also displaying inbetween grades only for french grading system)
  // TODO: extend this logic for all grading systems where inbetween legacy grades exist
  if (
    gradingSystemId == "french" &&
    defaultValues.baseDifficulty &&
    +defaultValues.baseDifficulty % 50 != 0
  ) {
    const indexOfFirstHigherGrade = possibleGrades.findIndex(
      (grade) => grade.difficulty > +defaultValues.baseDifficulty
    );

    // TODO: DRY diffToGrade and use the one from gradeHelpers
    possibleGrades = [
      ...possibleGrades.slice(0, indexOfFirstHigherGrade),
      {
        id: "inbetween",
        name: diffToGrade(+defaultValues.baseDifficulty, gradingSystemId, true)
          .name,
        difficulty: +defaultValues.baseDifficulty,
        __typename: "Grade",
      },
      ...possibleGrades.slice(indexOfFirstHigherGrade),
    ];
  }

  const resetForm = () => {
    // reset fields
    setName(defaultValues.name);
    setType(defaultValues.type);
    setGradingSystemId(defaultValues.gradingSystemId);
    setBaseDifficulty(defaultValues.baseDifficulty);
    setIsProject(defaultValues.isProject);
    setLength(defaultValues.length);
    setAuthor(defaultValues.author);
    setDescription(defaultValues.description);

    // clear errors
    setNameError("");
    setBaseDifficultyError("");
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
    if (!isProject && !baseDifficulty) {
      setBaseDifficultyError("Težavnost smeri je obvezen podatek.");
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
      baseDifficulty: +baseDifficulty || null,
      isProject: isProject,
      length: +length || null,
      author: author || null,
      description: description || null,
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
            value={`${baseDifficulty}`}
            onChange={handleBaseDifficultyChange}
            label="Bazna ocena"
            disabled={
              !possibleGrades.length ||
              isProject ||
              loading ||
              route?.difficultyVotes?.some((vote) => !vote.isBase)
            }
            errorMessage={baseDifficultyError}
            description={
              route?.difficultyVotes?.some((vote) => !vote.isBase)
                ? "Smer že ima glasove o težavnosti, zato bazne ocene ni mogoče spremeniti."
                : undefined
            }
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
            disabled={loading}
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
