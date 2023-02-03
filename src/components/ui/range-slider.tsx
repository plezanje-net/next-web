import { RefObject, useRef } from "react";
import { SliderState, useSliderState } from "@react-stately/slider";

import {
  mergeProps,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
  AriaSliderProps,
} from "react-aria";

interface SliderProps extends AriaSliderProps {
  formatOptions?: Intl.NumberFormatOptions;
  valueToLabelMap?: Map<number, string>;
}

function RangeSlider(props: SliderProps) {
  let trackRef = useRef(null);

  let numberFormatter = useNumberFormatter(props.formatOptions);
  let state = useSliderState({ ...props, numberFormatter });
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );

  return (
    <div {...groupProps} className="flex w-full flex-col">
      {/* Label */}
      {props.label && (
        <div className="flex justify-between">
          <label {...labelProps}>{props.label}</label>
        </div>
      )}

      {/* Track and thumbs */}
      <div {...trackProps} ref={trackRef} className="mt-2 h-4 w-full">
        {/* Track's background */}
        <div
          className={`absolute top-1/2 block h-0.5 w-full translate-y--2/4 
                      ${
                        state.isDisabled ? "bg-neutral-200" : "bg-neutral-400"
                      }`}
        ></div>

        {/* 'Active' part of the track */}
        <div
          style={{
            left: `${state.getThumbPercent(0) * 100}%`,
            width: `${
              (state.getThumbPercent(1) - state.getThumbPercent(0)) * 100
            }%`,
          }}
          className={`absolute top-1/2 block h-0.5 translate-y--2/4 
                      ${state.isDisabled ? "bg-neutral-300" : "bg-blue-500"}`}
        ></div>

        {/* Thumbs */}
        <Thumb index={0} state={state} trackRef={trackRef} />
        <Thumb index={1} state={state} trackRef={trackRef} />
      </div>

      {/* Outputs (selected values or their labels) */}
      <output {...outputProps} className="mt-1 flex w-full justify-between">
        <span>
          {props.valueToLabelMap
            ? props.valueToLabelMap.get(state.getThumbValue(0))
            : state.getThumbValue(0)}
        </span>
        <span>
          {props.valueToLabelMap
            ? props.valueToLabelMap.get(state.getThumbValue(1))
            : state.getThumbValue(1)}
        </span>
      </output>
    </div>
  );
}

interface SliderThumbProps {
  state: SliderState;
  trackRef: RefObject<Element>;
  index: number;
}

function Thumb(props: SliderThumbProps) {
  let { state, trackRef, index } = props;
  let inputRef = useRef(null);
  let { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state
  );

  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      {...thumbProps}
      className={`top-1/2 h-4 w-4 rounded-lg 
                  ${isFocusVisible && "ring ring-blue-100"}
                  ${!state.isDisabled && "cursor-pointer"}
                  ${
                    state.isDisabled
                      ? "bg-neutral-300"
                      : isDragging
                      ? "bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
}

export default RangeSlider;
