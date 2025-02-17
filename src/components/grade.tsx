import { gradingSystems, TGradingSystemId } from "../lib/grading-systems";

type Props = {
  difficulty: number;
  gradingSystemId?: string;
  displayModifier?: boolean;
  displayIntermediate?: boolean;
  disabled?: boolean;
};

type GradeDisplay = {
  name: string;
  difficulty?: number;
  modifier: -1 | 0 | 1;
};

function Grade({
  difficulty,
  gradingSystemId = "french",
  displayModifier = true,
  displayIntermediate = false,
  disabled = false,
}: Props) {
  const gradeDisplay = diffToGrade(
    difficulty,
    gradingSystemId,
    displayIntermediate
  );
  return <>{gradeDisplay.name}</>;
}

export function diffToGrade(
  difficulty: number,
  gradingSystemId: string,
  legacy: boolean = false
): GradeDisplay {
  const grades = gradingSystems[gradingSystemId as TGradingSystemId].grades;

  if (!grades) return { name: "", modifier: 0 };
  // legacy grades should always be accurate and can only be found as grade suggestions
  // for example in the case of french grades, legacy grades should always have remainder 0 when dividing by 25
  // only french grades can be displayed in legacy mode.
  // TODO: how to display nonlegacy votes that fall inbetween because of different grading system (voted in one system, display in another system). should discuss...
  if (legacy && gradingSystemId === "french") {
    for (let i = 1; i < grades.length; i++) {
      const prev = grades[i - 1];
      const curr = grades[i];
      if ((prev.difficulty + curr.difficulty) / 2 === difficulty) {
        return {
          name: parseLegacyFrenchInBetweenName(prev.name, curr.name),
          modifier: 0,
        };
      }
    }
  }

  // if lowest possible or highest possible grade, simply resolve without modifiers
  if (difficulty <= grades[0].difficulty) {
    return {
      name: grades[0].name,
      difficulty: grades[0].difficulty,
      modifier: 0,
    };
  } else if (difficulty >= grades[grades.length - 1].difficulty) {
    return {
      name: grades[grades.length - 1].name,
      difficulty: grades[grades.length - 1].difficulty,
      modifier: 0,
    };
  }

  // skip checks for lowest and highest possible grade
  for (let i = 1; i < grades.length - 1; i++) {
    const prev = grades[i - 1];
    const curr = grades[i];
    const next = grades[i + 1];

    // loop until curr is the closest grade to the searched grade
    if (
      Math.abs(curr.difficulty - difficulty) <=
      Math.abs(next.difficulty - difficulty)
    ) {
      if (difficulty < curr.difficulty) {
        const gradesMiddlemark = (curr.difficulty + prev.difficulty) / 2;

        if (
          Math.abs(curr.difficulty - difficulty) <
          Math.abs(gradesMiddlemark - difficulty)
        ) {
          return {
            name: curr.name,
            difficulty: curr.difficulty,
            modifier: 0,
          };
        } else {
          return {
            name: curr.name,
            difficulty: curr.difficulty,
            modifier: -1,
          };
        }
      } else if (difficulty > curr.difficulty) {
        const gradesMiddlemark = (curr.difficulty + next.difficulty) / 2;

        if (
          Math.abs(curr.difficulty - difficulty) <=
          Math.abs(gradesMiddlemark - difficulty)
        ) {
          return {
            name: curr.name,
            difficulty: curr.difficulty,
            modifier: 0,
          };
        } else {
          return {
            name: curr.name,
            difficulty: curr.difficulty,
            modifier: +1,
          };
        }
      } else {
        return {
          name: curr.name,
          difficulty: curr.difficulty,
          modifier: 0,
        };
      }
    }
  }

  return { name: "", modifier: 0 };
}

function parseLegacyFrenchInBetweenName(lowName: string, highName: string) {
  // this would break when 10a is climbed, but since we do not allow legacy style votes, no such grade will ever be displayed in legacy mode
  const lowNum = lowName.charAt(0);
  const highNum = highName.charAt(0);
  if (lowNum === highNum) {
    return lowName + "/" + highName.substring(1);
  } else {
    return lowName + "/" + highName;
  }
}

export default Grade;
