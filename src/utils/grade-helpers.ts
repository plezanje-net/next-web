import { TGradingSystemId, gradingSystems } from "./grading-systems";

function difficultyToGrade(difficulty: number, gradingSystemId: string) {
  const grades = gradingSystems[gradingSystemId as TGradingSystemId].grades;

  if (!grades) return null;

  // assuming grades are ordered by difficulty low to high
  for (let i = 1; i < grades.length; i++) {
    const prevGrade = grades[i - 1];
    const currGrade = grades[i];

    if (currGrade.difficulty >= difficulty) {
      // are we closer to left or right 'whole' grade
      if (
        difficulty - prevGrade.difficulty <=
        currGrade.difficulty - difficulty
      ) {
        return prevGrade;
      } else {
        return currGrade;
      }
    }
  }
}

export { difficultyToGrade };
