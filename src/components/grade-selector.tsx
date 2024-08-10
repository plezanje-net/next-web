import { Select, Option } from "./ui/select";
import { gradingSystems } from "@/utils/grading-systems";
import IconPlus from "./ui/icons/plus";
import Button from "./ui/button";
import IconMinus from "./ui/icons/minus";

type TGradeSelectorProps = {
  difficulty: number | null;
  setDifficulty: (v: number | null) => void;
  gradingSystemId: "french" | "yds"; // TODO: ... add others... ? adjust when gradingSystem object generation is merged
  disabled?: boolean;
  initialScrollTo?: number | null;
};

function GradeSelector({
  difficulty,
  setDifficulty,
  gradingSystemId,
  disabled = false,
  initialScrollTo = null,
}: TGradeSelectorProps) {
  // TODO: we need half grades as well. we need to either update db table, or temporarily add them manualy somehow
  const grades =
    gradingSystems.find((gs) => gs.id === gradingSystemId)?.grades || [];

  const firstGrade = grades[0];
  const lastGrade = grades[grades.length - 1];

  const handleMinusClick = () => {
    const currentGradeIndex = grades.findIndex(
      (g) => g.difficulty == difficulty
    );
    const prevGrade =
      currentGradeIndex > 0 ? grades[currentGradeIndex - 1] : grades[0];
    setDifficulty(prevGrade.difficulty);
  };

  const handlePlusClick = () => {
    const currentGradeIndex = grades.findIndex(
      (g) => g.difficulty == difficulty
    );
    const nextGrade =
      currentGradeIndex < grades.length - 1
        ? grades[currentGradeIndex + 1]
        : grades[grades.length - 1];
    setDifficulty(nextGrade.difficulty);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Button
        variant="quaternary"
        disabled={
          !difficulty || firstGrade.difficulty == difficulty || disabled
        }
        onClick={handleMinusClick}
      >
        <IconMinus />
      </Button>
      <div className="w-31">
        <Select
          value={difficulty ? `${difficulty}` : ""}
          onChange={(d: string) => {
            d == "-1" ? setDifficulty(null) : setDifficulty(+d);
          }}
          disabled={disabled}
          initialScrollToValue={
            initialScrollTo ? `${initialScrollTo}` : undefined
          }
        >
          {[
            <Option key={"no-diff-vote"} value={"-1"}>
              ---
            </Option>,
            ...grades.map((grade) => (
              <Option key={grade.id} value={`${grade.difficulty}`}>
                {grade.name}
              </Option>
            )),
          ]}
        </Select>
      </div>
      <Button
        variant="quaternary"
        disabled={!difficulty || lastGrade.difficulty == difficulty || disabled}
        onClick={handlePlusClick}
      >
        <IconPlus />
      </Button>
    </div>
  );
}

export default GradeSelector;
