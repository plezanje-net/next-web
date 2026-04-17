import { difficultyToGrade } from "@/lib/grade-helpers";

type TGradeProps = {
  difficulty: number;
  gradingSystemId?: string;
  displayIntermediate?: boolean;
  disabled?: boolean;
};

function Grade({
  difficulty,
  gradingSystemId = "french",
  displayIntermediate = false,
}: TGradeProps) {
  const gradeDisplay = difficultyToGrade(
    difficulty,
    gradingSystemId,
    displayIntermediate
  );

  return <>{gradeDisplay?.name}</>;
}

export default Grade;
