import { difficultyToGrade } from "@/utils/grade-helpers";

type TGradeFromToProps = {
  minDifficulty: number;
  maxDifficulty: number;
};

function GradeFromTo({ minDifficulty, maxDifficulty }: TGradeFromToProps) {
  return (
    <>{`od ${difficultyToGrade(minDifficulty, "french")?.name} do ${
      difficultyToGrade(maxDifficulty, "french")?.name
    }`}</>
  );
}

export default GradeFromTo;
