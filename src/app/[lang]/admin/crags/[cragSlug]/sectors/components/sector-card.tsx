import Button from "@/components/ui/button";
import IconDelete from "@/components/ui/icons/delete";
import IconDrag from "@/components/ui/icons/drag";
import IconEdit from "@/components/ui/icons/edit";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";
import IconPlus from "@/components/ui/icons/plus";
import IconRoutes from "@/components/ui/icons/routes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePathname, useRouter } from "next/navigation";

type TSectorCardProps = {
  id: string;
  name: string;
  disabled?: boolean;
  onAddClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

function SectorCard({
  id,
  name,
  disabled,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: TSectorCardProps) {
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
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mt-2 rounded-lg ${isDragging ? "z-50 relative shadow-lg" : ""}`}
    >
      <div
        className={`w-full bg-neutral-100 rounded-lg flex flex-col md:flex-row md:items-center justify-between ${disabled ? "text-neutral-400" : ""}`}
      >
        {/* drag handle, name and menu  */}
        <div className="px-4 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <div
              {...(disabled ? {} : attributes)}
              {...(disabled ? {} : listeners)}
              tabIndex={-1}
              className="outline-none"
            >
              <Button
                disabled={disabled}
                variant="quaternary"
                onClick={() => {}}
              >
                <IconDrag />
              </Button>
            </div>
            <h4 className="ml-2">{name}</h4>
          </div>
          <div className="md:hidden">{moreAction}</div>
        </div>

        {/* actions */}
        <div className="border-t border-neutral-200 px-4 py-2 md:border-none">
          <div className="flex justify-end items-center">
            {/* edit routes */}
            <Button
              variant="quaternary"
              disabled={disabled}
              onClick={() => {
                router.push(`${pathname}/${id}/smeri`); // TODO: why does router.push(`./${id}/smeri`);
              }}
            >
              <IconRoutes />
            </Button>

            {/* divider */}
            <div className="hidden md:block ml-3 h-6 border-l border-neutral-300 pr-3"></div>

            <div className="hidden md:block">{moreAction}</div>

            {/* divider */}
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

            {/* edit */}
            <Button
              variant="quaternary"
              disabled={disabled}
              onClick={onEditClick}
            >
              <IconEdit />
            </Button>

            {/* divider */}
            <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

            {/* delete */}
            <Button
              variant="quaternary"
              disabled={disabled}
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
    </div>
  );
}

export default SectorCard;
