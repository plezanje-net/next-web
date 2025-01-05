"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import IconDelete from "@/components/ui/icons/delete";
import IconDrag from "@/components/ui/icons/drag";
import IconEdit from "@/components/ui/icons/edit";
import IconPlus from "@/components/ui/icons/plus";
import { Route, User } from "@/graphql/generated";
import { difficultyToGrade } from "@/utils/grade-helpers";
import { useState } from "react";
import RouteDialog from "./route-dialog";
import DeleteRouteDialog from "./delete-route-dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { genderizeVerb } from "@/utils/text-helpers";
import PublishStatusActions from "../../../../../../components/publish-status-actions";

type TRouteCardProps = {
  route: Route;
  sectorId: string;
  checked: boolean;
  onCheckedChange: (checked: boolean, routeId: string) => void;
  disabled: boolean;
  loggedInUserIsEditor: boolean;
  loggedInUser: User | undefined;
};

function RouteCard({
  route,
  sectorId,
  checked,
  onCheckedChange,
  disabled,
  loggedInUserIsEditor,
  loggedInUser,
}: TRouteCardProps) {
  const grade = difficultyToGrade(
    route.difficulty || null,
    route.defaultGradingSystem.id
  );

  const [newRouteDialogIsOpen, setNewRouteDialogIsOpen] = useState(false);
  const [editRouteDialogIsOpen, setEditRouteDialogIsOpen] = useState(false);
  const [deleteRouteDialogIsOpen, setDeleteRouteDialogIsOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: route.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  // TODO: get enums from be?
  let publishStatusBgStyle;
  switch (route.publishStatus) {
    case "draft":
      publishStatusBgStyle = "bg-red-25";
      break;
    case "in_review":
      publishStatusBgStyle = "bg-amber-25";
      break;
    case "published":
    default:
      publishStatusBgStyle = "bg-neutral-100";
  }

  return (
    <>
      {/* route card */}
      <div
        ref={setNodeRef}
        style={style}
        className={`@container rounded-lg flex flex-col mt-2 ${publishStatusBgStyle} ${isDragging ? "z-50 relative shadow-lg" : ""}`}
      >
        {/* first row: drag, check, name, grade, length, actions */}
        <div className="flex flex-col justify-between @3xl:flex-row">
          {/* drag, check, name, grade, length */}
          <div className="flex items-center flex-1 py-2 px-4">
            {/* drag handle */}
            <div
              {...(disabled ||
              !actionPermitted(loggedInUserIsEditor, route.publishStatus)
                ? {}
                : attributes)}
              {...(disabled ||
              !actionPermitted(loggedInUserIsEditor, route.publishStatus)
                ? {}
                : listeners)}
              tabIndex={-1}
            >
              <Button
                disabled={
                  disabled ||
                  !actionPermitted(loggedInUserIsEditor, route.publishStatus)
                }
                variant="quaternary"
              >
                <IconDrag />
              </Button>
            </div>
            {/* checkbox */}
            <div className="ml-4">
              <Checkbox
                label={route.name}
                hideLabel
                checked={checked}
                onChange={(checked) => onCheckedChange(checked, route.id)}
                disabled={
                  disabled ||
                  !actionPermitted(loggedInUserIsEditor, route.publishStatus)
                }
              />
            </div>
            {/* route name */}
            <div className="ml-4 w-0 flex-1 truncate @3xl:w-80 @3xl:flex-none">
              {route.name}
            </div>
            <div className="w-10 ml-4">{grade?.name}</div>
            <div className="w-12 text-right">
              {route.length !== null && <span>{route.length} m</span>}
            </div>
          </div>

          {/* actions */}
          <div className="flex justify-end items-center py-2 px-4 border-t border-neutral-200 @3xl:border-none">
            {/* edit */}
            <Button
              variant="quaternary"
              disabled={
                disabled ||
                !actionPermitted(loggedInUserIsEditor, route.publishStatus)
              }
              onClick={() => setEditRouteDialogIsOpen(true)}
            >
              <IconEdit />
            </Button>

            {/* divider */}
            <div className="ml-3 h-6 border-l border-neutral-200 pr-3"></div>

            {/* delete */}
            <Button
              variant="quaternary"
              disabled={
                disabled ||
                !actionPermitted(loggedInUserIsEditor, route.publishStatus)
              }
              onClick={() => {
                setDeleteRouteDialogIsOpen(true);
              }}
            >
              <IconDelete />
            </Button>

            {/* divider */}
            <div className="ml-3 h-6 border-l border-neutral-200 pr-3"></div>

            {/* add route */}
            <Button
              variant="quaternary"
              disabled={disabled}
              onClick={() => {
                setNewRouteDialogIsOpen(true);
              }}
            >
              <IconPlus />
            </Button>
          </div>
        </div>

        {/* last row (if not published) */}
        {route.publishStatus !== "published" && (
          <div className="flex justify-between border-t border-neutral-200 px-4 py-2 items-center h-12">
            <div className="flex text-neutral-500 @lg:ml-20">
              {loggedInUser && loggedInUser.id === route.user?.id ? (
                "Tvoj prispevek"
              ) : (
                <>
                  <span className="hidden @lg:block">
                    {genderizeVerb("Prispeval", "M")}:&nbsp;
                  </span>
                  {route.user?.fullName}
                </>
              )}
            </div>

            {/* publish status actions */}
            <PublishStatusActions
              contributable={route}
              loggedInUserIsEditor={loggedInUserIsEditor}
              disabled={disabled}
            />
          </div>
        )}
      </div>

      <RouteDialog
        formType="new"
        isOpen={newRouteDialogIsOpen}
        setIsOpen={setNewRouteDialogIsOpen}
        position={route.position}
        sectorId={sectorId}
      />

      <RouteDialog
        formType="edit"
        isOpen={editRouteDialogIsOpen}
        setIsOpen={setEditRouteDialogIsOpen}
        route={route}
      />

      <DeleteRouteDialog
        isOpen={deleteRouteDialogIsOpen}
        setIsOpen={setDeleteRouteDialogIsOpen}
        route={route}
      />
    </>
  );
}

export default RouteCard;

function actionPermitted(
  loggedInUserIsEditor: boolean,
  routePublishStatus: string
) {
  return loggedInUserIsEditor || routePublishStatus === "draft";
}
