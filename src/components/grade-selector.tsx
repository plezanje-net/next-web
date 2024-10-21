import { Select, Option } from "./ui/select";
import { TGradingSystemId, gradingSystems } from "@/utils/grading-systems";
import IconPlus from "./ui/icons/plus";
import Button from "./ui/button";
import IconMinus from "./ui/icons/minus";

type TGradeSelectorProps = {
  difficulty: number | null;
  setDifficulty: (v: number | null) => void;
  gradingSystemId: "french" | "yds" | "uiaa"; // TODO: ... add others... ? adjust when gradingSystem object generation is merged
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
  const grades = getGrades(gradingSystemId, true);
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
      <div className="w-42">
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
              <Option key={grade.difficulty} value={`${grade.difficulty}`}>
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

// Helpers

const getGrades = (gradingSystemId: string, halfGrades: boolean = false) => {
  const fullGrades = gradingSystems[gradingSystemId as TGradingSystemId].grades;

  let grades = [];

  if (halfGrades) {
    grades.push({
      difficulty: fullGrades[0].difficulty,
      name: fullGrades[0].name,
    });
    for (let i = 1; i < fullGrades.length; i++) {
      const prevGrade = fullGrades[i - 1];
      const currGrade = fullGrades[i];

      let halfGradeName;
      if (gradingSystemId == "french") {
        let prevGradeNum, currGradeNum, currGradeLetterAndPlus;
        const prevGradeMatch = prevGrade.name.match(/^(\d+)(.*)$/);
        const currGradeMatch = currGrade.name.match(/^(\d+)(.*)$/);

        if (prevGradeMatch) {
          prevGradeNum = prevGradeMatch[1]; // The number part
        }

        if (currGradeMatch) {
          currGradeNum = currGradeMatch[1]; // The number part
          currGradeLetterAndPlus = currGradeMatch[2]; // The rest of the string
        }

        if (prevGradeNum == currGradeNum) {
          halfGradeName = `${prevGrade.name}/${currGradeLetterAndPlus}`;
        } else {
          halfGradeName = `${prevGrade.name}/${currGrade.name}`;
        }
      } else {
        halfGradeName = `${prevGrade.name}/${currGrade.name}`;
      }

      grades.push({
        difficulty: (prevGrade.difficulty + currGrade.difficulty) / 2,
        name: halfGradeName,
      });
      grades.push({
        difficulty: currGrade.difficulty,
        name: currGrade.name,
      });
    }
  } else {
    grades = fullGrades;
  }

  return grades;
};
