import Button from "@/components/ui/button";
import IconDelete from "@/components/ui/icons/delete";
import IconDrag from "@/components/ui/icons/drag";
import IconEdit from "@/components/ui/icons/edit";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";
import IconPlus from "@/components/ui/icons/plus";
import IconRoutes from "@/components/ui/icons/routes";
import { Sector } from "@/graphql/generated";
import { genderizeVerb } from "@/utils/text-helpers";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePathname, useRouter } from "next/navigation";
import PublishStatusActions from "../../../components/publish-status-actions";
import { labelAndNameToString } from "@/utils/sector-helpers";
import { useAuthContext } from "../../../../../../components/auth-context";
import { canEdit, getBgStyle } from "@/utils/contributables-helpers";

type TSectorCardProps = {
  sector: Sector;
  disabled?: boolean;
  onAddClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

function SectorCard({
  sector,
  disabled,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: TSectorCardProps) {
  const { currentUser } = useAuthContext();

  const router = useRouter();
  const pathname = usePathname();

  const moreAction = (
    <Button variant="quaternary" disabled={disabled} onClick={() => {}}>
      <IconMore size={IconSize.regular} />
    </Button>
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sector.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    // {/* sector card */}
    <div
      ref={setNodeRef}
      style={style}
      className={`@container rounded-lg mt-2 ${getBgStyle(sector.publishStatus)} ${isDragging ? "z-50 relative shadow-lg" : ""}`}
    >
      {/* drag, name, actions */}
      <div className="flex justify-between flex-col @2xl:flex-row @2xl:items-center">
        {/* drag, name, (more) */}
        <div className="flex justify-between items-center px-4 py-5">
          <div className="flex items-center">
            <div
              {...(disabled || !canEdit(currentUser, sector) ? {} : attributes)}
              {...(disabled || !canEdit(currentUser, sector) ? {} : listeners)}
              tabIndex={-1}
              className="outline-none"
            >
              <Button
                disabled={disabled || !canEdit(currentUser, sector)}
                variant="quaternary"
                onClick={() => {}}
              >
                <IconDrag />
              </Button>
            </div>
            <h4 className="ml-4">
              {labelAndNameToString(sector.label, sector.name)}
            </h4>
          </div>
          <div className="@2xl:hidden">{moreAction}</div>
        </div>

        {/* actions */}
        <div className="border-t border-neutral-200 @2xl:border-none px-4 py-2">
          <div className="flex justify-end items-center">
            {/* edit routes */}
            <Button
              variant="quaternary"
              disabled={disabled}
              onClick={() => {
                router.push(`${pathname}/${sector.id}/smeri`);
              }}
            >
              <IconRoutes />
            </Button>

            {/* divider */}
            <div className="hidden @2xl:block ml-3 h-6 border-l border-neutral-300 pr-3"></div>

            <div className="hidden @2xl:block">{moreAction}</div>

            {/* divider */}
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

            {/* edit */}
            <Button
              variant="quaternary"
              disabled={disabled || !canEdit(currentUser, sector)}
              onClick={onEditClick}
            >
              <IconEdit />
            </Button>

            {/* divider */}
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

            {/* delete */}
            <Button
              variant="quaternary"
              disabled={disabled || !canEdit(currentUser, sector)}
              onClick={onDeleteClick}
            >
              <IconDelete />
            </Button>

            {/* divider */}
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

            {/* add sector */}
            <Button
              variant="quaternary"
              disabled={disabled}
              onClick={onAddClick}
            >
              <IconPlus />
            </Button>
          </div>
        </div>
      </div>

      {/* contributor, publish actions */}
      {sector.publishStatus !== "published" && (
        <div className="flex justify-between items-center border-t border-neutral-200 px-4 py-2">
          {/* contributor */}
          <div className="flex text-neutral-500 @md:ml-12 py-1">
            {currentUser && currentUser.id === sector.user?.id ? (
              "Tvoj prispevek"
            ) : (
              <>
                <span className="hidden @md:block">
                  {genderizeVerb("Prispeval", "M")}:&nbsp;
                </span>
                {sector.user?.fullName}
              </>
            )}
          </div>

          {/* publish status actions */}
          <PublishStatusActions
            contributable={sector}
            disabled={disabled || false}
          />
        </div>
      )}
    </div>
  );
}

export default SectorCard;
