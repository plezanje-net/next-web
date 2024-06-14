import { ReactNode, useState } from "react";
import AscentTypeSelector from "../ascent-type-selector";
import GradeSelector from "../grade-selector";
import { Radio, RadioGroup } from "../ui/radio-group";
import Button from "../ui/button";
import IconUp from "../ui/icons/up";
import IconDown from "../ui/icons/down";
import IconDuplicate from "../ui/icons/duplicate";
import IconDelete from "../ui/icons/delete";
import IconCollapse from "../ui/icons/collapse";
import IconExpand from "../ui/icons/expand";
import { difficultyToGrade } from "@/utils/grade-helpers";
import StarRating from "./star-rating";
import { TLogRoute, useLogRoutesContext } from "./log-routes-context";
import { PublishType } from "@/graphql/generated";

type TLogRouteProps = {
  first?: boolean;
  last?: boolean;
  route: TLogRoute;
  onUpClick: () => void;
  onDownClick: () => void;
  onDuplicateClick: () => void;
  onDeleteClick: () => void;
};

function LogRoute({
  first,
  last,
  route,
  onUpClick,
  onDownClick,
  onDuplicateClick,
  onDeleteClick,
}: TLogRouteProps) {
  const routeGrade = difficultyToGrade(
    route.difficulty,
    route.defaultGradingSystemId
  );

  const lastVoteGrade = route.usersLastDifficultyVote
    ? difficultyToGrade(
        route.usersLastDifficultyVote.difficulty,
        route.defaultGradingSystemId
      )
    : null;

  const {
    ascentTypes,
    setAscentType,
    difficultyVotes,
    setDifficultyVote,
    starRatingVotes,
    setStarRatingVote,
    publishTypes,
    setPublishType,
  } = useLogRoutesContext();
  const ascentType = ascentTypes[route.key] || null;
  const difficultyVote = difficultyVotes[route.key] || null;
  const starRatingVote = starRatingVotes[route.key] ?? null;
  const publishType = publishTypes[route.key] || null;

  return (
    <LogAccordion
      label={`${route.name} ${routeGrade?.name}`}
      first={first}
      last={last}
    >
      <div className="px-4 py-6">
        Način vzpona
        <div className="mt-2">
          <AscentTypeSelector
            value={ascentType}
            onChange={(at) => setAscentType(route.key, at)}
          />
        </div>
        <div className="pt-6 mt-6 border-t border-neutral-200"></div>
        <span>Ocena težavnosti</span>
        <div className="mt-2">
          <div className="text-center ">
            <GradeSelector
              difficulty={difficultyVote}
              setDifficulty={(dv) => {
                setDifficultyVote(route.key, dv);
              }}
              gradingSystemId="french"
            />
          </div>
          {lastVoteGrade && (
            <div className="text-sm mt-1">{`Tvoj glas z dne ${route.usersLastDifficultyVote?.date}: ${lastVoteGrade.name}`}</div>
          )}
        </div>
        <div className="pt-6 mt-6 border-t border-neutral-200"></div>
        <div>
          <RadioGroup
            label="Lepota smeri"
            value={`${starRatingVote}`}
            onChange={(srv) => {
              setStarRatingVote(route.key, +srv);
            }}
          >
            <Radio value={"2"}>
              <StarRating rating={2} size="regular" />
            </Radio>
            <Radio value={"1"}>
              <StarRating rating={1} size="regular" />
            </Radio>
            <Radio value={"0"}>
              <StarRating rating={0} size="regular" />
            </Radio>
          </RadioGroup>
          {route.usersLastStarRatingVote && (
            <div className="text-sm mt-1 inline-flex">
              Tvoj glas z dne {route.usersLastStarRatingVote.date}:&nbsp;
              <StarRating
                size="small"
                rating={route.usersLastStarRatingVote.starRating}
              />
            </div>
          )}
        </div>
        <div className="pt-6 mt-6 border-t border-neutral-200"></div>
        <div>
          <RadioGroup
            label="Vidnost"
            value={publishType}
            onChange={(pt) => {
              setPublishType(route.key, pt as PublishType);
            }}
          >
            <Radio value={PublishType.Public}>javno</Radio>
            <Radio value={PublishType.Club}>samo za prijatelje</Radio>
            <Radio value={PublishType.Private}>samo zame</Radio>
          </RadioGroup>
        </div>
        <div className="pt-6 mt-6 border-t border-neutral-200"></div>
        {/* Actions */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="quaternary" disabled={first} onClick={onUpClick}>
              <IconUp />
            </Button>
            <div className="my-1 pl-4 ml-4 border-l border-neutral-200"></div>
            <Button variant="quaternary" disabled={last} onClick={onDownClick}>
              <IconDown />
            </Button>
          </div>
          <div>
            <div className="flex gap-2">
              <Button variant="quaternary" onClick={onDuplicateClick}>
                <IconDuplicate />
              </Button>
              <div className="my-1 pl-4 ml-4 border-l border-neutral-200"></div>
              <Button
                variant="quaternary"
                disabled={first && last}
                onClick={onDeleteClick}
              >
                <IconDelete />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LogAccordion>
  );
}

export default LogRoute;

type TLogAccordionProps = {
  label: string;
  children: ReactNode;
  first?: boolean;
  last?: boolean;
};

function LogAccordion({ label, children, first, last }: TLogAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`overflow-hidden ${first ? "xs:rounded-t-lg" : ""}
      ${last ? "xs:rounded-b-lg" : ""}`}
    >
      <button
        className="flex w-full items-center justify-between bg-neutral-100 px-4 py-5 text-left hover:bg-neutral-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{label}</span>
        {isOpen ? <IconCollapse /> : <IconExpand />}
      </button>
      {isOpen && (
        <div className="border-b border-t border-b-neutral-200 border-t-neutral-200">
          {children}
        </div>
      )}
    </div>
  );
}
