import Button from "@/components/ui/button";
import IconDrag from "@/components/ui/icons/drag";
import IconEdit from "@/components/ui/icons/edit";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";
import IconPlus from "@/components/ui/icons/plus";
import IconRoutes from "@/components/ui/icons/routes";

type TSectorCardProps = {
  name: string;
};

function SectorCard({ name }: TSectorCardProps) {
  const moreAction = (
    <Button variant="quaternary" onClick={() => {}}>
      <IconMore size={IconSize.regular} />
    </Button>
  );

  return (
    <div className="w-full bg-neutral-100 rounded-lg flex flex-col md:flex-row md:items-center justify-between">
      {/* drag handle, name and menu  */}
      <div className="px-4 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="quaternary" onClick={() => {}}>
            <IconDrag />
          </Button>
          <h4 className="ml-2">{name}</h4>
        </div>
        <div className="md:hidden">{moreAction}</div>
      </div>

      {/* actions */}
      <div className="border-t border-neutral-200 px-4 py-2 md:border-none">
        <div className="flex justify-end items-center">
          {/* edit routes */}
          <Button variant="quaternary" onClick={() => {}}>
            <IconRoutes />
          </Button>

          {/* divider */}
          <div className="hidden md:block ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          <div className="hidden md:block">{moreAction}</div>

          {/* divider */}
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          {/* edit */}
          <Button variant="quaternary" onClick={() => {}}>
            <IconEdit />
          </Button>

          {/* divider */}
          <div className="ml-3 h-6 border-l border-neutral-300 pr-3"></div>

          {/* add sector */}
          <Button variant="quaternary" onClick={() => {}}>
            <IconPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SectorCard;
