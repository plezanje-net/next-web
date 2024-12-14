"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import IconDelete from "@/components/ui/icons/delete";
import IconDrag from "@/components/ui/icons/drag";
import IconEdit from "@/components/ui/icons/edit";
import IconPlus from "@/components/ui/icons/plus";
import { Route } from "@/graphql/generated";
import { difficultyToGrade } from "@/utils/grade-helpers";
import { useState } from "react";
import RouteDialog from "./route-dialog";
import DeleteRouteDialog from "./delete-route-dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PublishStatusActions from "./publish-status-actions";

type TRouteCardProps = {
  route: Route;
  sectorId: string;
  checked: boolean;
  onCheckedChange: (checked: boolean, routeId: string) => void;
  disabled: boolean;
  loggedInUserIsEditor: boolean;
};

function RouteCard({
  route,
  sectorId,
  checked,
  onCheckedChange,
  disabled,
  loggedInUserIsEditor,
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
    transform: CSS.Transform.toString(transform),
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
      <div
        ref={setNodeRef}
        style={style}
        className={`${publishStatusBgStyle} rounded-lg flex mt-2 md:gap-2 md:items-center flex-col md:flex-row ${isDragging ? "z-50 relative shadow-lg" : ""}`}
      >
        {/* drag handle, checkbox, name, grade, length and other info if space allows */}
        <div className="flex flex-1 items-center px-4 py-2">
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

          <div className="ml-4 flex-1 md:max-w-80 truncate">{route.name}</div>
          <div className="ml-4 min-w-10 lg:min-w-30">{grade?.name}</div>
          <div className="ml-4 min-w-12 text-right md:text-left">
            {route.length !== null && <span>{route.length} m</span>}
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center justify-end border-t border-neutral-200 md:border-none px-4 py-2">
          <PublishStatusActions
            route={route}
            loggedInUserIsEditor={loggedInUserIsEditor}
            disabled={disabled}
          />

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
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

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
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

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
