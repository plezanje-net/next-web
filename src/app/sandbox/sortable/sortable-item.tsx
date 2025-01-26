import Button from "@/components/ui/button";
import IconDrag from "@/components/ui/icons/drag";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TSortabItemProps = {
  id: string;
};

export function SortableItem({ id }: TSortabItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mx-auto flex items-center px-4 rounded-lg bg-neutral-100 h-20 w-80 m-2 ${isDragging ? "z-50 relative shadow-lg" : ""}`}
    >
      <div {...attributes} {...listeners} className="inline-block">
        <Button variant="quaternary" onClick={() => {}}>
          <IconDrag />
        </Button>
      </div>
      Sortable item {id}
    </div>
  );
}

export default SortableItem;
