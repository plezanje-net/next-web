import RangeSlider from "./range-slider";
import { gradingSystems } from "@/utils/grading-systems";

// TODO: french is hardcoded for now. where/how to get the chosen system? majority of routes in this crag? user choice? majority of currently filtered routes?
const gradingSystem = gradingSystems.find(
  (gradingSystem) => gradingSystem.id === "french"
);
const sliderValueToDifficultyMap = new Map(
  gradingSystem?.grades.map((grade, index) => [index, grade.difficulty])
);
const difficultyToSliderValueMap = new Map(
  gradingSystem?.grades.map((grade, index) => [grade.difficulty, index])
);
const minSliderValue = 0; // always 0
const maxSliderValue = sliderValueToDifficultyMap.size - 1;

const sliderValueToGradeMap = new Map(
  gradingSystem?.grades.map((grade, index) => [index, grade.name])
);

interface GradeRangeSliderProps {
  onChangeEnd: (value: number[]) => void;
  label: string;
  defaultValue: [number, number];
}

function GradeRangeSlider({
  onChangeEnd,
  label,
  defaultValue,
}: GradeRangeSliderProps) {
  return (
    <RangeSlider
      label={label}
      defaultValue={defaultValue}
      minValue={minSliderValue}
      maxValue={maxSliderValue}
      valueToLabelMap={sliderValueToGradeMap}
      onChangeEnd={(value) => onChangeEnd(value as number[])}
    />
  );
}

export default GradeRangeSlider;
export {
  sliderValueToDifficultyMap,
  difficultyToSliderValueMap,
  minSliderValue,
  maxSliderValue,
};
