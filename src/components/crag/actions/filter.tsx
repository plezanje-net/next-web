import { useContext, useState } from "react";
import Button from "../../ui/button";
import IconFilter from "../../ui/icons/filter";
import Dialog, { DialogSize } from "../../ui/dialog";
import { CragTableContext, FilterOptions } from "../crag-table";
import GradeRangeSlider, {
  difficultyToSliderValueMap,
  maxSliderValue,
  minSliderValue,
  sliderValueToDifficultyMap,
} from "../../ui/grade-range-slider";
import { Radio, RadioGroup } from "../../ui/radio-group";
import Checkbox from "../../ui/checkbox";

// TODO: naming??? discus and set systematically
function Filter() {
  // TODO: could we rename the content of the context to sthg more specific?
  const { state, setState } = useContext(CragTableContext);

  const [routesTouchesFilterValue, setRoutesTouchesFilterValue] =
    useState("all");
  const [nrFiltersActive, setNrFiltersActive] = useState(0);
  const [difficultyFilterValue, setDifficultyFilterValue] = useState({
    from: minSliderValue,
    to: maxSliderValue,
  });
  const [marvelousFilterValue, setMarvelousFilterValue] = useState(true);
  const [beautifulFilterValue, setBeautifulFilterValue] = useState(true);
  const [unremarkableFilterValue, setUnremarkableFilterValue] = useState(true);

  const handleApplyFilter = () => {
    let nrFiltersActiveCount = 0;
    const filter: FilterOptions = {};

    if (
      routesTouchesFilterValue === "ticked" ||
      routesTouchesFilterValue === "tried" ||
      routesTouchesFilterValue === "unticked" ||
      routesTouchesFilterValue === "untried"
    ) {
      filter.routesTouches = routesTouchesFilterValue;
      nrFiltersActiveCount++;
    }

    if (
      difficultyFilterValue.from != minSliderValue ||
      difficultyFilterValue.to != maxSliderValue
    ) {
      filter.difficulty = {
        from: sliderValueToDifficultyMap.get(difficultyFilterValue.from)!,
        to: sliderValueToDifficultyMap.get(difficultyFilterValue.to)!,
      };
      nrFiltersActiveCount++;
    }

    // it never made sense to me, but probably what a user would expect. that is if all or none are checked, all are shown
    const allStarRatings =
      (marvelousFilterValue &&
        beautifulFilterValue &&
        unremarkableFilterValue) ||
      (!marvelousFilterValue &&
        !beautifulFilterValue &&
        !unremarkableFilterValue);

    if (!allStarRatings) {
      filter.starRating = {
        marvelous: marvelousFilterValue,
        beautiful: beautifulFilterValue,
        unremarkable: unremarkableFilterValue,
      };
      nrFiltersActiveCount++;
    }

    setState({ ...state, filter });
    setNrFiltersActive(nrFiltersActiveCount);
  };

  const handleFilterClose = () => {
    // if the dialog was closed without confirming the changed filter choice, the previous filters state needs to be restored. take it either from context or set back defaults if not in context
    setRoutesTouchesFilterValue(state.filter?.routesTouches || "all");

    if (state.filter?.difficulty) {
      setDifficultyFilterValue({
        from: difficultyToSliderValueMap.get(state.filter.difficulty.from)!,
        to: difficultyToSliderValueMap.get(state.filter.difficulty.to)!,
      });
    } else {
      setDifficultyFilterValue({ from: minSliderValue, to: maxSliderValue });
    }

    if (state.filter?.starRating) {
      setMarvelousFilterValue(state.filter.starRating.marvelous);
      setBeautifulFilterValue(state.filter.starRating.beautiful);
      setUnremarkableFilterValue(state.filter.starRating.unremarkable);
    } else {
      setMarvelousFilterValue(true);
      setBeautifulFilterValue(true);
      setUnremarkableFilterValue(true);
    }
  };

  const handleDifficultyFilterChangeEnd = (value: number[]) => {
    const [from, to] = value;
    setDifficultyFilterValue({ from, to });
  };

  return (
    <Dialog
      openTrigger={
        <Button renderStyle="icon">
          <span className="flex">
            <IconFilter />
            <span>
              <span className="ml-2 max-lg:hidden">Filtriraj</span>
              {nrFiltersActive > 0 && <>&nbsp;({nrFiltersActive})</>}
            </span>
          </span>
        </Button>
      }
      dialogSize={DialogSize.hug}
      title="Filtriraj smeri"
      confirm={{ label: "Filtriraj", callback: handleApplyFilter }}
      cancel={{ label: "Prekliči", callback: handleFilterClose }}
      closeCallback={handleFilterClose}
    >
      <div className="flex flex-col flex-wrap gap-8 md:flex-row">
        <RadioGroup
          label="Glede na moje poskuse v smeri"
          value={routesTouchesFilterValue}
          onChange={setRoutesTouchesFilterValue}
        >
          <Radio value="all">Vse</Radio>
          <Radio value="ticked">Preplezane</Radio>
          <Radio value="tried">Poskušane</Radio>
          <Radio value="unticked">Nepreplezane</Radio>
          <Radio value="untried">Neposkušane</Radio>
        </RadioGroup>

        <div className="flex flex-col">
          <div>Glede na lepoto</div>
          <div className="mt-2">
            <Checkbox
              isSelected={marvelousFilterValue}
              onChange={setMarvelousFilterValue}
            >
              Čudovita
            </Checkbox>
            <Checkbox
              isSelected={beautifulFilterValue}
              onChange={setBeautifulFilterValue}
            >
              Lepa
            </Checkbox>
            <Checkbox
              isSelected={unremarkableFilterValue}
              onChange={setUnremarkableFilterValue}
            >
              Nič posebnega
            </Checkbox>
          </div>
        </div>

        <div className="w-50 lg:w-80">
          <GradeRangeSlider
            label="Glede na težavnost"
            defaultValue={[
              difficultyFilterValue.from,
              difficultyFilterValue.to,
            ]}
            onChangeEnd={handleDifficultyFilterChangeEnd}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default Filter;
