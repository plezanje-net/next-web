import { TGrade, TGradingSystemId, gradingSystems } from "./grading-systems";

type TProject = {
  id: "P";
  name: "P";
  difficulty: null;
};

function difficultyToGrade(
  difficulty: number | null,
  gradingSystemId: string,
  displayIntermediate = false
): TGrade | TProject | null {
  const grades = gradingSystems[gradingSystemId as TGradingSystemId].grades;

  if (!grades) return null;

  if (difficulty == null)
    return {
      id: "P",
      name: "P",
      difficulty: null,
    };

  // assuming grades are ordered by difficulty low to high
  for (let i = 1; i < grades.length; i++) {
    const prevGrade = grades[i - 1];
    const currGrade = grades[i];

    if (currGrade.difficulty >= difficulty) {
      // the difficulty of the grade we are looking for is between prevGrade and currGrade (inclusive)

      // a difficulty has an intermediate grade representation if it falls exactly inbetween the difficulties of adjacent two grades
      if (
        difficulty - prevGrade.difficulty ===
          currGrade.difficulty - difficulty &&
        displayIntermediate
      ) {
        const gradeName = parseLegacyIntermediateGradeName(
          gradingSystemId,
          prevGrade.name,
          currGrade.name
        );

        return {
          id: `${gradingSystemId}-${gradeName}`,
          name: gradeName,
          difficulty,
        };
      }

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
  return null;
}

function parseLegacyIntermediateGradeName(
  gradingSystemId: string,
  lowGradeName: string,
  highGradeName: string
) {
  switch (gradingSystemId) {
    case "french":
    case "font":
      return parseFrenchOrFontInBetweenName(lowGradeName, highGradeName);
    case "yds":
      return parseYdsInBetweenName(lowGradeName, highGradeName);
    case "hueco":
      return parseHuecoInBetweenName(lowGradeName, highGradeName);
    default:
      return `${lowGradeName}/${highGradeName}`;
  }
}

function parseFrenchOrFontInBetweenName(
  lowGradeName: string,
  highGradeName: string
) {
  const lowBase = lowGradeName.match(/^\d+/)?.[0] ?? "";
  const highBase = highGradeName.match(/^\d+/)?.[0] ?? "";

  if (lowBase === highBase) {
    return `${lowGradeName}/${highGradeName.slice(highBase.length)}`;
  }

  return `${lowGradeName}/${highGradeName}`;
}

function parseYdsInBetweenName(lowGradeName: string, highGradeName: string) {
  const low = lowGradeName.slice(2); // remove "5."
  const high = highGradeName.slice(2);

  const lowNum = low.match(/^\d+/)?.[0]; // extract number part (e.g., "10" from "10a")
  const highNum = high.match(/^\d+/)?.[0];
  console.log(lowNum, highNum);

  if (lowNum === highNum) {
    return `5.${low}/${high.slice(lowNum!.length)}`;
  }

  return `5.${low}/${high}`;
}

function parseHuecoInBetweenName(lowGradeName: string, highGradeName: string) {
  return `${lowGradeName}/${highGradeName.slice(1)}`;
}

export { difficultyToGrade };
