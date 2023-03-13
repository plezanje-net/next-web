import { useState } from "react";
import RangeSlider from "../../components/ui/range-slider";

function RangeSliderPage() {
  // These two maps are hardcoded here as an example only
  const gradeToDiffMap = new Map([
    ["1", 100],
    ["2", 200],
    ["3", 300],
    ["4a", 400],
    ["4a+", 450],
    ["4b", 500],
    ["4b+", 550],
    ["4c", 600],
    ["4c+", 650],
    ["5a", 700],
    ["5a+", 750],
    ["5b", 800],
    ["5b+", 850],
    ["5c", 900],
    ["5c+", 950],
    ["6a", 1000],
    ["6a+", 1050],
    ["6b", 1100],
    ["6b+", 1150],
    ["6c", 1200],
    ["6c+", 1250],
    ["7a", 1300],
    ["7a+", 1350],
    ["7b", 1400],
    ["7b+", 1450],
    ["7c", 1500],
    ["7c+", 1550],
    ["8a", 1600],
    ["8a+", 1650],
    ["8b", 1700],
    ["8b+", 1750],
    ["8c", 1800],
    ["8c+", 1850],
    ["9a", 1900],
    ["9a+", 1950],
    ["9b", 2000],
    ["9b+", 2050],
    ["9c", 2100],
  ]);
  // note: diff to grade is not suitable here because steps are not even across the scale. Additional remapping is needed
  const tempValueToGradeMap = new Map([
    [1, "1"],
    [2, "2"],
    [3, "3"],
    [4, "4a"],
    [5, "4a+"],
    [6, "4b"],
    [7, "4b+"],
    [8, "4c"],
    [9, "4c+"],
    [10, "5a"],
    [11, "5a+"],
    [12, "5b"],
    [13, "5b+"],
    [14, "5c"],
    [15, "5c+"],
    [16, "6a"],
    [17, "6a+"],
    [18, "6b"],
    [19, "6b+"],
    [20, "6c"],
    [21, "6c+"],
    [22, "7a"],
    [23, "7a+"],
    [24, "7b"],
    [25, "7b+"],
    [26, "7c"],
    [27, "7c+"],
    [28, "8a"],
    [29, "8a+"],
    [30, "8b"],
    [31, "8b+"],
    [32, "8c"],
    [33, "8c+"],
    [34, "9a"],
    [35, "9a+"],
    [36, "9b"],
    [37, "9b+"],
    [38, "9c"],
  ]);

  let [slider1Value, setSlider1Value] = useState([13, 26]);
  let [slider2Value, setSlider2Value] = useState([18, 32]);

  return (
    <div className="m-8">
      <h3>Range slider demo</h3>

      <div className="mt-14 w-80">
        <h5>A default range slider</h5>
        <div className="mt-4">
          <RangeSlider
            label="Težavnost"
            defaultValue={[10, 90]}
            minValue={0}
            maxValue={380}
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>A disabled range slider</h5>
        <div className="mt-4">
          <RangeSlider
            label="Težavnost"
            defaultValue={[50, 290]}
            minValue={0}
            maxValue={380}
            isDisabled={true}
          />
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>Map values to grades and react to value change instantly</h5>

        <div className="mt-4">
          <RangeSlider
            label="Težavnost"
            defaultValue={slider1Value}
            minValue={1}
            maxValue={38}
            step={1}
            valueToLabelMap={tempValueToGradeMap}
            onChange={(value) => setSlider1Value(value as number[])}
          />
        </div>

        <div className="mt-4">
          <div>{`Range slider input value: ${slider1Value[0]} - ${slider1Value[1]}`}</div>
          <div>
            {`Range slider input grade: ${tempValueToGradeMap.get(
              slider1Value[0]
            )} - ${tempValueToGradeMap.get(slider1Value[1])}`}
          </div>
          <div>
            {`Range slider input difficulty: ${gradeToDiffMap.get(
              tempValueToGradeMap.get(slider1Value[0]) || ""
            )} - ${gradeToDiffMap.get(
              tempValueToGradeMap.get(slider1Value[1]) || ""
            )}`}
          </div>
        </div>
      </div>

      <div className="mt-14 w-80">
        <h5>
          Map values to grades and react to value change after dragging stops
        </h5>

        <div className="mt-4">
          <RangeSlider
            label="Težavnost"
            defaultValue={slider2Value}
            minValue={1}
            maxValue={38}
            step={1}
            valueToLabelMap={tempValueToGradeMap}
            onChangeEnd={(value) => setSlider2Value(value as number[])}
          />
        </div>

        <div className="mt-4">
          <div>
            {`Range slider input value: ${slider2Value[0]} - ${slider2Value[1]}`}
          </div>
          <div>
            {`Range slider input grade: ${tempValueToGradeMap.get(
              slider2Value[0]
            )} - ${tempValueToGradeMap.get(slider2Value[1])}`}
          </div>
          <div>
            {`Range slider input difficulty: ${gradeToDiffMap.get(
              tempValueToGradeMap.get(slider2Value[0]) || ""
            )} - ${gradeToDiffMap.get(
              tempValueToGradeMap.get(slider2Value[1]) || ""
            )}`}
          </div>
        </div>
      </div>
    </div>
  );
}
export default RangeSliderPage;
